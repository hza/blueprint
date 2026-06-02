# Blueprint — RFP Response App

## Project purpose

Blueprint is an RFP response application for a **custom software development company**. Its output is consumed by **buyers** — prospects evaluating vendors — not by the internal sales or delivery team.

Every page, section heading, label, and piece of copy must be written from the **buyer's perspective**: what does the buyer need to understand, decide, or trust at this point in their evaluation? Avoid inside-out framing (e.g. "our delivery process") in favor of buyer-outcome framing (e.g. "how your project will be delivered on time").

## Sidebar menu pages (buyer-centric audit checklist)

Each page in the sidebar should answer a specific buyer question:

| Page | Buyer question it must answer |
|---|---|
| Executive Overview | "Is this vendor the right strategic fit for us?" |
| Requirements Coverage | "Will they actually build what we need?" |
| Solution Architecture | "Is their technical approach sound and low-risk?" |
| Technical Solution | "Do they have the depth to execute this?" |
| Cost of Ownership | "What will this truly cost us, total?" |
| Pricing & Commercials | "Are the commercial terms fair and clear?" |
| Delivery & Governance | "Will this project stay on track?" |
| Security & Compliance | "Are they trustworthy with our data?" |
| Team | "Who will actually do the work?" |
| Proof & Credibility | "Have they done this before successfully?" |
| Value Proposition | "Why them over alternatives?" |
| Timeline | "When will we see results?" |

## Key editorial rules

- **Buyer-first language**: write section titles, labels, and descriptions as if addressing the buyer directly.
- **No internal jargon**: avoid terms that only make sense to the vendor's own team.
- **Outcome over activity**: focus on what the buyer gains, not what the vendor does.
- **Specificity over generality**: concrete numbers, names, and dates beat vague claims.

## Architecture

```text
blueprint/
├── frontend/          # React SPA (Vite + TypeScript)
│   └── src/
│       ├── App.tsx            # Root: data fetching, routing, state orchestration
│       ├── api.ts             # All fetch calls (fetchFiles, fetchFile, fetchFL, fetchFR)
│       ├── types.ts           # Shared types: FileInfo, FileContent, ViewTab, FRItem, etc.
│       └── components/        # One file per sidebar page + shared UI components
├── backend/
│   └── main.py        # FastAPI server, port 8000
└── RFP/               # Source RFP documents (read by backend)
```

## Frontend stack

| Concern | Tool |
|---|---|
| Framework | React 18, TypeScript (strict, ES2020) |
| Build | Vite 5 — `npm run dev` starts on port 5173 |
| Routing | react-router-dom 7 — `useNavigate` / `useLocation` |
| State | `useState` only — no Redux/Zustand |
| Styling | Plain CSS modules (`.css` file per component) |
| Markdown | `marked` library for rendering |
| E2E tests | Playwright |

**Dev commands** (run from `frontend/`):
- `npm run dev` — start dev server (port 5173)
- `npm run build` — typecheck + build
- `npm run preview` — preview production build

## Backend

FastAPI (`backend/main.py`) on port 8000. Vite proxies `/api` → `http://localhost:8000`.

| Endpoint | Purpose |
|---|---|
| `GET /api/files` | List RFP source files |
| `GET /api/files/{filename}` | Read a file |
| `GET /api/fl` | Fetch feature list (parsed FL.md) |
| `GET /api/fr/{filename}` | Fetch requirements annotations |

## Data flow

1. `App.tsx` is the single orchestrator — fetches on mount, passes data down as props.
2. All API calls are in `frontend/src/api.ts` — edit there to change backend calls.
3. Components are mostly presentational; avoid adding `fetch` calls directly in component files.

## Navigation / Sidebar

`Sidebar.tsx` contains a hardcoded `NAV_SECTIONS` array — add/rename/reorder pages there. Each entry has `id`, `title`, `path`, and optional `subsections`. The sidebar also has a theme switcher (6 themes: day, fantasy, night, confluence, notion, gray).

`ViewTab` union type in `types.ts` defines the 18+ valid view states — add a new value there when adding a page.

## Adding a new page (checklist)

1. Create `frontend/src/components/MyPage.tsx`
2. Add a `ViewTab` value to `types.ts`
3. Add a nav entry to `NAV_SECTIONS` in `Sidebar.tsx`
4. Wire the route/render in `App.tsx`

## Key editorial rules

- **Buyer-first language**: write section titles, labels, and descriptions as if addressing the buyer directly.
- **No internal jargon**: avoid terms that only make sense to the vendor's own team.
- **Outcome over activity**: focus on what the buyer gains, not what the vendor does.
- **Specificity over generality**: concrete numbers, names, and dates beat vague claims.
