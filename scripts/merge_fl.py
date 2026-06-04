#!/usr/bin/env python3
"""Merge FL2.md into FL.md assigning unique FR/NFR IDs.

Usage: python scripts/merge_fl.py [--apply]

By default prints merged content to stdout. Use --apply to overwrite output/FL.md.
"""
from pathlib import Path
import re
import argparse
import sys


def parse_table_rows(text):
    lines = text.splitlines()
    sep_idx = None
    for i, l in enumerate(lines):
        if l.strip().startswith('|---'):
            sep_idx = i
            break
    if sep_idx is None:
        raise ValueError('Could not find table separator in markdown')
    header = lines[:sep_idx+1]
    rows = [r for r in lines[sep_idx+1:] if r.strip().startswith('|')]
    return header, rows


def extract_id_req(row):
    parts = [p.strip() for p in row.split('|')[1:-1]]
    if len(parts) < 2:
        return None, None
    return parts[0], parts[1]


def find_max_nums(rows):
    max_nums = {}
    for r in rows:
        id_, _ = extract_id_req(r)
        if not id_:
            continue
        m = re.match(r"([A-Za-z]+)-(\d+)", id_)
        if not m:
            continue
        pfx, num = m.group(1), int(m.group(2))
        max_nums[pfx] = max(max_nums.get(pfx, 0), num)
    return max_nums


def merge(fl_text, fl2_text):
    header, fl_rows = parse_table_rows(fl_text)
    _, fl2_rows = parse_table_rows(fl2_text)

    existing_reqs = set()
    existing_ids = set()
    for r in fl_rows:
        id_, req = extract_id_req(r)
        if id_:
            existing_ids.add(id_)
        if req:
            existing_reqs.add(req)

    max_nums = find_max_nums(fl_rows)

    new_rows = []
    for r in fl2_rows:
        id_, req = extract_id_req(r)
        if not req:
            continue
        # skip duplicate requirement by exact text
        if req in existing_reqs:
            continue
        if id_ in existing_ids:
            m = re.match(r"([A-Za-z]+)-(\d+)", id_)
            pfx = m.group(1) if m else 'FR'
            max_nums.setdefault(pfx, 0)
            max_nums[pfx] += 1
            new_id = f"{pfx}-{max_nums[pfx]:03d}"
            parts = r.split('|')
            parts[1] = ' ' + new_id + ' '
            r = '|'.join(parts)
            existing_ids.add(new_id)
            existing_reqs.add(req)
            new_rows.append(r)
        else:
            new_rows.append(r)
            existing_ids.add(id_)
            existing_reqs.add(req)

    merged_lines = header + fl_rows + [''] + new_rows
    return '\n'.join(merged_lines) + '\n'


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--apply', action='store_true', help='Overwrite output/FL.md')
    args = p.parse_args()

    root = Path(__file__).resolve().parents[1]
    fl_file = root / 'output' / 'FL.md'
    fl2_file = root / 'output' / 'FL2.md'

    if not fl_file.exists() or not fl2_file.exists():
        print('Required files not found: output/FL.md and output/FL2.md', file=sys.stderr)
        sys.exit(2)

    fl_text = fl_file.read_text(encoding='utf-8')
    fl2_text = fl2_file.read_text(encoding='utf-8')

    merged = merge(fl_text, fl2_text)

    if args.apply:
        fl_file.write_text(merged, encoding='utf-8')
        print(f'Wrote merged content to {fl_file}')
    else:
        print(merged)


if __name__ == '__main__':
    main()
