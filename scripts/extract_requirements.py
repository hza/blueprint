"""
Extract functional (FR) and non-functional (NFR) requirements from an RFP markdown file
and write them to output/FL.md in the format expected by the backend.

Usage:
    python scripts/extract_requirements.py
    python scripts/extract_requirements.py --rfp "RFP/Customer Portal - RFP.md" --output output/FL.md
"""

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

SYSTEM_PROMPT = """You are an expert business analyst. You will receive a section of an RFP document.

Extract every functional requirement (FR) and non-functional requirement (NFR) from this section. A requirement is a concrete, testable statement of what the system must do or how it must behave. Skip narrative context, background paragraphs, and general goals that are not testable requirements.

For each requirement return:
- "type": "FR" (functional) or "NFR" (non-functional)
- "requirement": concise one-line label, 12 words or fewer
- "category": the feature domain (e.g. "Document Ingestion", "AI Analysis", "Security", "Performance", "User Management", "Portal & Collaboration")
- "original_text": the verbatim sentence(s) from the RFP that express this requirement (exact wording, no paraphrase)

Return a JSON object with a single key "requirements" containing an array of the above objects. If there are no requirements in this section, return {"requirements": []}.
"""

GAP_PROMPT = """You are an expert business analyst. The lines below are from an RFP document that were NOT captured as requirements in a previous extraction pass.

Check whether any of these lines contain concrete, testable functional (FR) or non-functional (NFR) requirements that were missed. Skip narrative context, background paragraphs, and general goals that are not testable requirements.

For each missed requirement return:
- "type": "FR" (functional) or "NFR" (non-functional)
- "requirement": concise one-line label, 12 words or fewer
- "category": the feature domain (e.g. "Document Ingestion", "AI Analysis", "Security", "Performance", "User Management", "Portal & Collaboration")
- "original_text": the verbatim text from these lines expressing the requirement (exact wording, no paraphrase)

Return a JSON object {"requirements": [...]}. Return {"requirements": []} if nothing was missed.
"""


def read_lines(content: str) -> list[tuple[int, str]]:
    """Return (1-based file line number, text) for every non-empty line."""
    result = []
    for i, line in enumerate(content.splitlines(), start=1):
        stripped = line.rstrip()
        if stripped:
            result.append((i, stripped))
    return result


def chunk_by_heading(lines: list[tuple[int, str]]) -> list[tuple[int, list[tuple[int, str]]]]:
    """
    Split the line list into sections at markdown headings.
    Returns list of (start_line_no, [(line_no, text), ...]).
    """
    sections: list[tuple[int, list[tuple[int, str]]]] = []
    current: list[tuple[int, str]] = []
    current_start = 1

    for line_no, text in lines:
        if re.match(r"^#{1,3} ", text) and current:
            sections.append((current_start, current))
            current = [(line_no, text)]
            current_start = line_no
        else:
            current.append((line_no, text))

    if current:
        sections.append((current_start, current))

    return sections


def format_chunk(numbered_lines: list[tuple[int, str]]) -> str:
    return "\n".join(text for _, text in numbered_lines)


def find_line_number(file_lines: list[str], original_text: str) -> int:
    """Return the 1-based line number where original_text begins in the file."""
    if not original_text:
        return 0
    # Try progressively shorter prefixes to handle multi-line or trimmed text
    for length in (80, 40, 20):
        key = original_text[:length].strip()
        if not key:
            continue
        for i, line in enumerate(file_lines, start=1):
            if key in line:
                return i
    return 0


def extract_from_chunk(model: str, chunk_text: str, system_prompt: str = SYSTEM_PROMPT) -> list[dict]:
    prompt = f"{system_prompt}\n\n{chunk_text}"
    result = subprocess.run(
        ["claude", "-p", prompt, "--model", model],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"  WARNING: claude CLI error: {result.stderr[:200]}", file=sys.stderr)
        return []
    raw = result.stdout.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    try:
        data = json.loads(raw)
        return data.get("requirements", [])
    except json.JSONDecodeError as e:
        print(f"  WARNING: JSON parse error: {e}", file=sys.stderr)
        print(f"  Raw response: {raw[:200]}", file=sys.stderr)
        return []


def escape_pipes(text: str) -> str:
    return text.replace("|", "\\|")


def write_fl_md(items: list[dict], rfp_path: str, output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    fr_counter = 0
    nfr_counter = 0
    rows: list[str] = []

    for item in items:
        req_type = item.get("type", "FR").upper()
        if req_type == "NFR":
            nfr_counter += 1
            req_id = f"NFR-{nfr_counter:03d}"
        else:
            fr_counter += 1
            req_id = f"FR-{fr_counter:03d}"

        requirement = escape_pipes(item.get("requirement", ""))
        category = escape_pipes(item.get("category", ""))
        original_text = escape_pipes(item.get("original_text", ""))
        line_number = str(item.get("line_number", ""))

        rows.append(f"| {req_id} | {requirement} | {category} | {original_text} | {rfp_path} | {line_number} |")

    header = "| ID | Requirement | Category | Original Text | File Name | Line Number |"
    separator = "|---|---|---|---|---|---|"
    content = "\n".join([header, separator] + rows) + "\n"
    output_path.write_text(content, encoding="utf-8")
    print(f"Wrote {len(rows)} requirements to {output_path}")
    print(f"  FR: {fr_counter}  NFR: {nfr_counter}")


def parse_fl_md(fl_path: Path) -> set[int]:
    """Return the set of line numbers already covered in FL.md."""
    covered: set[int] = set()
    if not fl_path.exists():
        return covered
    for line in fl_path.read_text(encoding="utf-8").splitlines():
        if not line.startswith("|"):
            continue
        parts = [p.strip() for p in line.split("|")]
        # | ID | Requirement | Category | Original Text | File Name | Line Number |
        #   1       2            3            4               5           6
        if len(parts) >= 7:
            try:
                covered.add(int(parts[6]))
            except (ValueError, IndexError):
                pass
    return covered


def run_gaps_check(model: str, content: str, rfp_relative: str, fl_path: Path, output_path: Path, append: bool) -> None:
    file_lines = content.splitlines()
    lines = read_lines(content)
    covered = parse_fl_md(fl_path)

    uncovered = [(ln, text) for ln, text in lines if ln not in covered]
    print(f"\nGap analysis: {len(uncovered)} uncovered lines out of {len(lines)} non-empty lines")

    if not uncovered:
        print("No gaps — all lines are already covered.")
        return

    print("\nUncovered lines:")
    for ln, text in uncovered:
        print(f"  {ln:4d}: {text[:100]}")

    sections = chunk_by_heading(lines)
    found: list[dict] = []
    print(f"\nChecking {len(sections)} sections for missed requirements...")

    for idx, (_, section_lines) in enumerate(sections, start=1):
        heading = section_lines[0][1] if section_lines else "(empty)"
        gap_lines = [(ln, text) for ln, text in section_lines if ln not in covered]
        if not gap_lines:
            continue
        print(f"[{idx}/{len(sections)}] {heading[:60]} — {len(gap_lines)} uncovered line(s)")
        chunk_text = format_chunk(gap_lines)
        reqs = extract_from_chunk(model, chunk_text, system_prompt=GAP_PROMPT)
        print(f"  → {len(reqs)} missed requirement(s) found")
        found.extend(reqs)

    for req in found:
        req["line_number"] = find_line_number(file_lines, req.get("original_text", ""))

    found.sort(key=lambda r: r.get("line_number", 0))

    print(f"\nTotal missed requirements: {len(found)}")
    for req in found:
        print(f"  [{req.get('type')}] line {req.get('line_number', '?'):>4}: {req.get('requirement')}")

    if not append or not found:
        return

    existing = output_path.read_text(encoding="utf-8") if output_path.exists() else ""
    fr_counter = sum(1 for ln in existing.splitlines() if re.match(r"\| FR-\d+", ln))
    nfr_counter = sum(1 for ln in existing.splitlines() if re.match(r"\| NFR-\d+", ln))
    rows: list[str] = []
    for item in found:
        req_type = item.get("type", "FR").upper()
        if req_type == "NFR":
            nfr_counter += 1
            req_id = f"NFR-{nfr_counter:03d}"
        else:
            fr_counter += 1
            req_id = f"FR-{fr_counter:03d}"
        requirement = escape_pipes(item.get("requirement", ""))
        category = escape_pipes(item.get("category", ""))
        original_text = escape_pipes(item.get("original_text", ""))
        line_number = str(item.get("line_number", ""))
        rows.append(f"| {req_id} | {requirement} | {category} | {original_text} | {rfp_relative} | {line_number} |")
    with output_path.open("a", encoding="utf-8") as f:
        f.write("\n".join(rows) + "\n")
    print(f"Appended {len(rows)} requirements to {output_path}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract FR/NFR requirements from an RFP markdown file.")
    parser.add_argument("--rfp", default="RFP/Customer Portal - RFP.md", help="Path to RFP markdown file")
    parser.add_argument("--output", default="output/FL.md", help="Path to output FL.md")
    parser.add_argument("--model", default="claude-haiku-4-5-20251001", help="Claude model to use")
    parser.add_argument("--gaps", action="store_true", help="Check RFP lines not yet covered in FL.md")
    parser.add_argument("--append", action="store_true", help="Append newly found requirements to FL.md (used with --gaps)")
    args = parser.parse_args()

    root = Path(__file__).parent.parent
    rfp_path = (root / args.rfp).resolve()
    output_path = (root / args.output).resolve()

    if not rfp_path.exists():
        print(f"ERROR: RFP file not found: {rfp_path}", file=sys.stderr)
        sys.exit(1)

    print(f"Reading: {rfp_path}")
    content = rfp_path.read_text(encoding="utf-8")
    rfp_relative = str(Path(args.rfp))

    if args.gaps:
        run_gaps_check(args.model, content, rfp_relative, output_path, output_path, args.append)
        return

    file_lines = content.splitlines()
    lines = read_lines(content)
    print(f"  {len(lines)} non-empty lines")

    sections = chunk_by_heading(lines)
    print(f"  {len(sections)} sections")

    all_requirements: list[dict] = []

    for idx, (start_line, numbered_lines) in enumerate(sections, start=1):
        heading = numbered_lines[0][1] if numbered_lines else "(empty)"
        print(f"[{idx}/{len(sections)}] line {start_line}: {heading[:60]}")
        chunk_text = format_chunk(numbered_lines)
        requirements = extract_from_chunk(args.model, chunk_text)
        print(f"  → {len(requirements)} requirements found")
        all_requirements.extend(requirements)

    for req in all_requirements:
        req["line_number"] = find_line_number(file_lines, req.get("original_text", ""))

    all_requirements.sort(key=lambda r: r.get("line_number", 0))

    write_fl_md(all_requirements, rfp_relative, output_path)


if __name__ == "__main__":
    main()
