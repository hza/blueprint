"""
Extract requirements from an RFP markdown file and write them to output/FL.md.

Requirement types extracted:
  FR  - Functional Requirements
  NFR - Non-Functional Requirements
  BR  - Business Requirements
  TC  - Technical Constraints
  CR  - Compliance/Regulatory Requirements

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

Extract every requirement from this section. A requirement is a concrete, testable statement of what the system must do, how it must behave, or a constraint it must satisfy. Skip narrative context, background paragraphs, and general goals that are not testable requirements.

Classify each requirement as one of:
- "FR"  — Functional Requirement: a specific feature or behavior the system must perform
- "NFR" — Non-Functional Requirement: quality attributes (performance, scalability, reliability, usability)
- "BR"  — Business Requirement: a business rule, process, or goal the solution must satisfy
- "TC"  — Technical Constraint: a mandated technology, platform, integration, or architectural constraint
- "CR"  — Compliance/Regulatory Requirement: a legal, regulatory, security standard, or audit obligation

For each requirement return:
- "type": one of "FR", "NFR", "BR", "TC", "CR"
- "requirement": concise one-line label, 12 words or fewer
- "category": the feature domain (e.g. "Document Ingestion", "AI Analysis", "Security", "Performance", "User Management", "Portal & Collaboration", "GDPR", "Accessibility")
- "original_text": the verbatim sentence(s) from the RFP that express this requirement (exact wording, no paraphrase)

Return a JSON object with a single key "requirements" containing an array of the above objects. If there are no requirements in this section, return {"requirements": []}.
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

VALID_TYPES = {"FR", "NFR", "BR", "TC", "CR"}

def write_fl_md(items: list[dict], rfp_path: str, output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    counters: dict[str, int] = {t: 0 for t in VALID_TYPES}
    rows: list[str] = []

    for item in items:
        req_type = item.get("type", "FR").upper()
        if req_type not in VALID_TYPES:
            req_type = "FR"
        counters[req_type] += 1
        req_id = f"{req_type}-{counters[req_type]:03d}"

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
    summary = "  " + "  ".join(f"{t}: {counters[t]}" for t in VALID_TYPES if counters[t])
    print(summary)



def main() -> None:
    parser = argparse.ArgumentParser(description="Extract FR/NFR/BR/TC/CR requirements from an RFP markdown file.")
    parser.add_argument("--rfp", default="RFP/Customer Portal - RFP.md", help="Path to RFP markdown file")
    parser.add_argument("--output", default="output/FL.md", help="Path to output FL.md")
    parser.add_argument("--model", default="claude-haiku-4-5-20251001", help="Claude model to use")
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

    file_lines = content.splitlines()
    lines = read_lines(content)
    print(f"  {len(lines)} non-empty lines")

    sections = chunk_by_heading(lines)
    print(f"  {len(sections)} sections")

    all_requirements: list[dict] = []

    for idx, (start_line, numbered_lines) in enumerate(sections, start=1):
        heading = numbered_lines[0][1] if numbered_lines else "(empty)"
        print(f"[{idx}/{len(sections)}] line {start_line}: {heading[:60]}", flush=True)
        chunk_text = format_chunk(numbered_lines)
        requirements = extract_from_chunk(args.model, chunk_text)
        print(f"  → {len(requirements)} requirements found", flush=True)
        for req in requirements:
            req["line_number"] = find_line_number(file_lines, req.get("original_text", ""))
        all_requirements.extend(requirements)
        write_fl_md(all_requirements, rfp_relative, output_path)

    all_requirements.sort(key=lambda r: r.get("line_number", 0))
    write_fl_md(all_requirements, rfp_relative, output_path)


if __name__ == "__main__":
    main()
