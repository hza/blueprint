import csv
import mimetypes
import re
from pathlib import Path

from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse, PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="RFP Viewer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173"],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).parent

# Serve static files from backend/webroot at /webroot
WEBROOT_DIR = BASE_DIR / "webroot"
if WEBROOT_DIR.exists():
    app.mount("/webroot", StaticFiles(directory=str(WEBROOT_DIR)), name="webroot")
    # Mount subdirectories and register routes for root-level files
    for p in WEBROOT_DIR.iterdir():
        if p.is_dir():
            try:
                app.mount(f"/{p.name}", StaticFiles(directory=str(p)), name=p.name)
            except Exception:
                pass
        elif p.is_file() and p.name != "index.html":
            def _make_file_route(fp=p, fn=p.name):
                media_type = mimetypes.guess_type(fn)[0] or "application/octet-stream"
                @app.get(f"/{fn}", include_in_schema=False)
                def _serve():
                    return FileResponse(path=str(fp), media_type=media_type, content_disposition_type="inline")
            _make_file_route()
    # optional: serve index at root of mounted path
    @app.get("/", response_class=HTMLResponse)
    def root_index():
        index = WEBROOT_DIR / "index.html"
        if index.exists():
            return HTMLResponse(index.read_text(encoding="utf-8"))
        return JSONResponse({"status": "ok"})


RFP_DIR = (Path(__file__).parent.parent / "RFP").resolve()
FL_FILE = (Path(__file__).parent.parent / "output" / "FL.md").resolve()
REQ_STATUS_FILE = (Path(__file__).parent.parent / "output" / "req-status.csv").resolve()


def _parse_fr_row(line: str):
    """Parse one markdown table row into FR fields. Returns None for non-FR rows."""
    line = line.strip()
    if not line.startswith("|") or not line.endswith("|"):
        return None
    tokens = [t.strip() for t in line[1:-1].split("|")]
    if not tokens[0] or set(tokens[0]) <= {"-", ":"}:
        return None
    fr_id = tokens[0]
    requirement = tokens[1]
    category = tokens[2]
    # tokens[3] through tokens[-3] = original text (may contain escaped pipes)
    original_text = " | ".join(tokens[3:-2])
    references = tokens[-2]
    line_num_str = tokens[-1]
    return fr_id, requirement, category, original_text, references, line_num_str


def _parse_line_numbers(s: str) -> list[int]:
    """Parse '101', '101-103', '101, 102' into a list of ints."""
    nums: list[int] = []
    for part in re.split(r"[,\s]+", s.strip()):
        if "-" in part:
            bounds = part.split("-", 1)
            try:
                start, end = int(bounds[0]), int(bounds[1])
                nums.extend(range(start, end + 1))
            except ValueError:
                pass
        else:
            try:
                nums.append(int(part))
            except ValueError:
                pass
    return nums


@app.get("/api/req-status")
def get_req_status():
    """Return requirement statuses from req-status.csv keyed by requirement ID."""
    statuses: dict[str, dict] = {}
    if not REQ_STATUS_FILE.exists():
        return {"statuses": statuses}
    with REQ_STATUS_FILE.open(encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            req_id = row.get("id", "").strip()
            status = row.get("status", "").strip()
            description = row.get("description", "").strip()
            if req_id and status:
                statuses[req_id] = {"status": status, "description": description}
    return {"statuses": statuses}


@app.get("/api/requirements-summary")
def get_requirements_summary():
    """Return aggregated requirements summary: domain breakdown + gap/risky lists."""
    statuses: dict[str, dict] = {}
    if REQ_STATUS_FILE.exists():
        with REQ_STATUS_FILE.open(encoding="utf-8", newline="") as f:
            for row in csv.DictReader(f):
                req_id = row.get("id", "").strip()
                status = row.get("status", "").strip()
                description = row.get("description", "").strip()
                if req_id and status:
                    statuses[req_id] = {"status": status, "description": description}

    domain_map: dict[str, dict] = {}
    gaps: list[dict] = []
    risky_items: list[dict] = []

    if FL_FILE.exists():
        for row in FL_FILE.read_text(encoding="utf-8").splitlines():
            parsed = _parse_fr_row(row)
            if parsed is None:
                continue
            fr_id, requirement, category, _, _, _ = parsed
            s = statuses.get(fr_id)
            domain = category or "Uncategorized"
            if domain not in domain_map:
                domain_map[domain] = {"domain": domain, "total": 0, "met": 0, "risky": 0, "gap": 0}
            domain_map[domain]["total"] += 1
            if s and s["status"] == "gap":
                domain_map[domain]["gap"] += 1
                gaps.append({"id": fr_id, "requirement": requirement, "domain": domain, "description": s["description"]})
            elif s and s["status"] == "risky":
                domain_map[domain]["risky"] += 1
                risky_items.append({"id": fr_id, "requirement": requirement, "domain": domain, "description": s["description"]})
            else:
                domain_map[domain]["met"] += 1

    domains = sorted(domain_map.values(), key=lambda d: d["total"], reverse=True)
    total = sum(d["total"] for d in domains)
    gap_count = len(gaps)
    risky_count = len(risky_items)
    met_count = total - gap_count - risky_count
    coverage_pct = round((met_count / total * 100), 1) if total > 0 else 0.0

    return {
        "total": total,
        "met": met_count,
        "risky": risky_count,
        "gaps": gap_count,
        "coverage_pct": coverage_pct,
        "domains": domains,
        "gap_items": gaps,
        "risky_items": risky_items,
    }


@app.get("/api/fl")
def get_all_fr():
    """Return all FR rows from FL.md as a flat list."""
    items: list[dict] = []
    if not FL_FILE.exists():
        return {"items": items}

    for row in FL_FILE.read_text(encoding="utf-8").splitlines():
        parsed = _parse_fr_row(row)
        if parsed is None:
            continue
        fr_id, requirement, category, original_text, references, line_num_str = parsed
        items.append({
            "id": fr_id,
            "requirement": requirement,
            "domain": category,
            "original_text": original_text,
            "references": references,
            "line": line_num_str,
        })
    return {"items": items}


@app.get("/api/fr/{filename}")
def get_fr_for_file(filename: str):
    """Return FR annotations for the given RFP file, keyed by line number (string)."""
    safe_name = Path(filename).name
    if safe_name != filename or "/" in filename or "\\" in filename or ".." in filename:
        raise HTTPException(status_code=400, detail="Invalid filename")

    annotations: dict[str, list[dict]] = {}
    if not FL_FILE.exists():
        return {"annotations": annotations}

    for row in FL_FILE.read_text(encoding="utf-8").splitlines():
        parsed = _parse_fr_row(row)
        if parsed is None:
            continue
        fr_id, requirement, category, original_text, references, line_num_str = parsed
        ref_files = [f.strip() for f in references.split(";")]
        ref_lines = [s.strip() for s in line_num_str.split(";")]
        for i, ref_file in enumerate(ref_files):
            if Path(ref_file).name != safe_name:
                continue
            segment = ref_lines[i] if i < len(ref_lines) else ""
            for ln in _parse_line_numbers(segment):
                key = str(ln)
                if key not in annotations:
                    annotations[key] = []
                annotations[key].append({"id": fr_id, "requirement": requirement, "domain": category, "original_text": original_text})

    return {"annotations": annotations}


def format_size(size_bytes: int) -> str:
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} KB"
    else:
        return f"{size_bytes / (1024 * 1024):.1f} MB"


@app.get("/api/files")
def list_files():
    files = []
    for f in sorted(RFP_DIR.glob("*.md")):
        if f.is_file():
            stat = f.stat()
            files.append(
                {
                    "name": f.name,
                    "size": stat.st_size,
                    "size_formatted": format_size(stat.st_size),
                }
            )
    return {"files": files, "folder": "RFP"}


@app.get("/api/files/{filename}")
def get_file(filename: str, raw: bool = Query(False)):
    # Security: reject path traversal attempts
    safe_name = Path(filename).name
    if safe_name != filename or "/" in filename or "\\" in filename or ".." in filename:
        raise HTTPException(status_code=400, detail="Invalid filename")

    file_path = (RFP_DIR / safe_name).resolve()

    # Ensure resolved path is within RFP_DIR
    if not str(file_path).startswith(str(RFP_DIR) + "/") and file_path != RFP_DIR:
        raise HTTPException(status_code=403, detail="Access denied")

    if not file_path.exists() or not file_path.is_file():
        raise HTTPException(status_code=404, detail="File not found")

    content = file_path.read_text(encoding="utf-8")

    if raw:
        return PlainTextResponse(content, media_type="text/plain; charset=utf-8")

    lines = content.splitlines()
    stat = file_path.stat()
    loc = sum(1 for line in lines if line.strip())

    return {
        "name": safe_name,
        "content": content,
        "lines": lines,
        "line_count": len(lines),
        "loc": loc,
        "size": stat.st_size,
        "size_formatted": format_size(stat.st_size),
    }



# Catch-all: serve index.html for any unmatched route so React Router handles client-side navigation.
# Must be registered last so it doesn't shadow API routes.
@app.get("/{full_path:path}", response_class=HTMLResponse, include_in_schema=False)
def spa_fallback(full_path: str):
    index = WEBROOT_DIR / "index.html"
    if index.exists():
        return HTMLResponse(index.read_text(encoding="utf-8"))
    raise HTTPException(status_code=404, detail="Not found")
