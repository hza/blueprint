#!/usr/bin/env python3
"""
Validate and fix line numbers in FL.md by searching for the Original Text
in the referenced RFP source file. Fixes line numbers in place.

Usage:
    python scripts/fix_fl_line_numbers.py [--fl output/FL.md] [--dry-run]
"""

import argparse
import re
import sys
from collections import defaultdict
from pathlib import Path


def load_rfp(rfp_path: Path) -> tuple[list[str], str]:
    """Return (1-indexed lines list, full text). Index 0 is empty so line numbers match directly."""
    text = rfp_path.read_text(encoding="utf-8")
    return [""] + text.splitlines(), text  # index 0 unused; line 1 = index 1


def normalize(s: str) -> str:
    """Collapse whitespace and normalize unicode dashes/quotes for fuzzy matching."""
    s = re.sub(r"[–—]", "-", s)  # em/en dash → hyphen
    s = re.sub(r"[‘’“”]", "'", s)  # smart quotes → apostrophe
    return re.sub(r"\s+", " ", s).strip()


def find_line(rfp_lines: list[str], _rfp_text: str, original_text: str) -> int | None:
    """Return the 1-based line number where original_text appears.

    Tries exact substring match first, then normalized match.
    When text spans multiple lines in the RFP, returns the first line of the match.
    """
    # Unescape markdown-escaped pipes (stored as \| in FL.md, literal | in RFP)
    needle = original_text.strip().replace(r"\|", "|")
    norm_needle = normalize(needle)

    # 1. Exact single-line match
    for i, line in enumerate(rfp_lines):
        if needle in line:
            return i

    # 2. Normalized single-line match
    for i, line in enumerate(rfp_lines):
        if norm_needle in normalize(line):
            return i

    # 3. Multi-line sliding-window match.
    #    For each candidate window [i, j), join the lines and test.
    #    When a match is found, narrow i forward until removing the first line
    #    would break the match — that gives the true start line.
    n = len(rfp_lines)
    for i in range(1, n):
        for j in range(i + 1, min(i + 12, n + 1)):
            joined = normalize(" ".join(rfp_lines[i:j]))
            if norm_needle in joined:
                k = i
                while k + 1 < j and norm_needle in normalize(" ".join(rfp_lines[k + 1:j])):
                    k += 1
                return k

    # 4. Partial match: use first 60 chars of needle
    short = norm_needle[:60]
    for i, line in enumerate(rfp_lines):
        if short in normalize(line):
            return i

    return None


def find_all_occurrences(rfp_lines: list[str], original_text: str) -> list[int]:
    """Return all 1-based line numbers that are the TRUE START of a match.

    A line is the true start when joining it with subsequent lines contains the
    needle, but joining from the NEXT line does not (i.e., the line is necessary).
    """
    needle = original_text.strip().replace(r"\|", "|")
    norm_needle = normalize(needle)
    n = len(rfp_lines)
    result = []

    for i in range(1, n):
        for j in range(i + 1, min(i + 12, n + 1)):
            joined = normalize(" ".join(rfp_lines[i:j]))
            if norm_needle in joined:
                without_first = normalize(" ".join(rfp_lines[i + 1:j])) if i + 1 < j else ""
                if norm_needle not in without_first:
                    result.append(i)
                break

    return result


def parse_fl_table(fl_path: Path) -> tuple[list[str], list[int]]:
    """
    Parse FL.md and return:
      - lines: all raw lines of the file
      - data_row_indices: indices (into lines) of data rows (not header/separator)
    """
    lines = fl_path.read_text(encoding="utf-8").splitlines(keepends=True)
    data_row_indices = []
    for i, line in enumerate(lines):
        stripped = line.strip()
        # Skip header and separator rows
        if stripped.startswith("|") and not stripped.startswith("| ID") and not re.match(r"^\|[-| ]+\|$", stripped):
            data_row_indices.append(i)
    return lines, data_row_indices


_PLACEHOLDER = "\x00PIPE\x00"


def split_row(line: str) -> list[str]:
    """Split a markdown table row, respecting escaped pipes \\|."""
    # Temporarily replace escaped pipes so they don't split cells
    inner = line.strip().lstrip("|")
    inner = inner.replace(r"\|", _PLACEHOLDER)
    cells = [c.strip().replace(_PLACEHOLDER, r"\|") for c in inner.split("|")]
    # Drop the trailing empty cell from the closing pipe
    if cells and cells[-1] == "":
        cells = cells[:-1]
    return cells


def rebuild_row(cells: list[str]) -> str:
    """Reconstruct a markdown table row from cells."""
    return "| " + " | ".join(cells) + " |\n"


def main():
    parser = argparse.ArgumentParser(description="Fix line numbers in FL.md")
    parser.add_argument("--fl", default="output/FL.md", help="Path to FL.md")
    parser.add_argument("--dry-run", action="store_true", help="Report issues without writing")
    args = parser.parse_args()

    root = Path(__file__).parent.parent
    fl_path = root / args.fl

    if not fl_path.exists():
        print(f"ERROR: FL.md not found at {fl_path}", file=sys.stderr)
        sys.exit(1)

    lines, data_row_indices = parse_fl_table(fl_path)

    # Cache loaded RFP files to avoid re-reading
    rfp_cache: dict[str, tuple[list[str], str]] = {}

    # Pre-compute: rows that share the same (original_text, file_name) must be
    # assigned to successive occurrences in document order, not all to the first.
    group_by_text: dict[tuple[str, str], list[int]] = defaultdict(list)
    for row_idx in data_row_indices:
        cells = split_row(lines[row_idx])
        if len(cells) >= 6:
            key = (normalize(cells[3]), cells[4].strip())
            group_by_text[key].append(row_idx)

    occurrence_override: dict[int, int] = {}  # row_idx → correct line number
    for (_, fname), row_indices in group_by_text.items():
        if len(row_indices) < 2:
            continue
        rfp_path = root / fname
        if not rfp_path.exists():
            continue
        if fname not in rfp_cache:
            rfp_cache[fname] = load_rfp(rfp_path)
        rfp_lines, _ = rfp_cache[fname]
        original_text = split_row(lines[row_indices[0]])[3]
        all_occs = find_all_occurrences(rfp_lines, original_text)
        for i, row_idx in enumerate(row_indices):
            if i < len(all_occs):
                occurrence_override[row_idx] = all_occs[i]

    fixes = 0
    not_found = 0

    for row_idx in data_row_indices:
        raw = lines[row_idx]
        cells = split_row(raw)

        # Expected columns: ID, Requirement, Category, Original Text, File Name, Sentence
        if len(cells) < 6:
            continue

        original_text = cells[3]
        file_name = cells[4]
        stated_line = cells[5]

        rfp_path = root / file_name
        if not rfp_path.exists():
            print(f"  REMOVE  [{cells[0]}] — source file not found, removing row")
            lines[row_idx] = None
            not_found += 1
            continue

        if file_name not in rfp_cache:
            rfp_cache[file_name] = load_rfp(rfp_path)
        rfp_lines, rfp_text = rfp_cache[file_name]

        if row_idx in occurrence_override:
            actual_line = occurrence_override[row_idx]
        else:
            actual_line = find_line(rfp_lines, rfp_text, original_text)

        if actual_line is None:
            print(f"  REMOVE  [{cells[0]}] line not determinable — removing row")
            lines[row_idx] = None  # mark for removal
            not_found += 1
            continue

        if str(actual_line) != stated_line.strip():
            print(f"  FIX  [{cells[0]}] line {stated_line.strip()} → {actual_line}")
            cells[5] = str(actual_line)
            lines[row_idx] = rebuild_row(cells)
            fixes += 1

    removed = sum(1 for i in data_row_indices if lines[i] is None)
    print(f"\nResult: {fixes} fixed, {removed} removed, {len(data_row_indices) - fixes - removed} already correct")

    if (fixes > 0 or removed > 0) and not args.dry_run:
        output = "".join(line for line in lines if line is not None)
        fl_path.write_text(output, encoding="utf-8")
        print(f"Written: {fl_path}")
    elif fixes > 0 or removed > 0:
        print("Dry run — no changes written.")


if __name__ == "__main__":
    main()
