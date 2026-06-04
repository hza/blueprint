# RFP: AI-Powered Customer Portal

*CONFIDENTIAL — For authorized recipients only. NDA required before access.*

**Version:** 1.0 · **Date:** 2026-05-31 · **Status:** Draft · **Prepared by:** [Company Name]

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Background & Context](#2-project-background--context)
3. [Scope of Work](#3-scope-of-work)
4. [Requirements](#4-requirements)
   - 4.1 [Document Ingestion](#41-document-ingestion)
   - 4.2 [AI Analysis](#42-ai-analysis)
   - 4.3 [Portal, Collaboration, and Workflow](#43-portal-collaboration-and-workflow)
   - 4.4 [Performance, Reliability, and Security](#44-performance-reliability-and-security)
   - 4.5 [Technical Stack and Infrastructure](#45-technical-stack-and-infrastructure)
5. [User Roles & Permissions](#5-user-roles--permissions)
6. [UX/UI Requirements](#6-uxui-requirements)
7. [Estimation & Delivery Requirements](#7-estimation--delivery-requirements)
8. [Submission Timeline](#8-submission-timeline)
9. [Evaluation Criteria](#9-evaluation-criteria)

---

## 1. Executive Summary

This document defines requirements for an **AI-powered Customer Portal** built for internal use by a single outsourcing software company. The portal enables company employees — Business Analysts, Solution Architects, Sales Managers, and Account Managers — to upload client RFP documents and receive automated, AI-generated deliverables including business model analysis, feature breakdowns with effort estimates, and strategic canvases. External clients receive a dedicated, access-controlled view to review and comment on the deliverables prepared for them.

The system reduces time-to-proposal from days to hours, standardizes analysis quality across the team, and gives clients a professional workspace for reviewing pre-sales artifacts.

### Business Goals

- Reduce manual pre-sales effort by **≥ 70%** through AI automation.
- Standardize proposal quality across all internal teams.
- Shorten average proposal turnaround from **5–7 business days to < 24 hours**.
- Increase proposal win rate by improving depth and accuracy of requirement analysis.
- Provide clients with a clean, professional view of the deliverables prepared for them.

---

## 2. Project Background & Context

### Problem Statement

| Problem | Impact |
| --- | --- |
| Manual RFP parsing takes 8–40 hours per document | High cost, slow response |
| Analysis quality varies by analyst experience | Inconsistent proposals |
| No centralized client workspace | Poor client experience |
| No structured way for clients to comment and review deliverables | Feedback scattered across emails and calls |
| No automated estimation framework | Proposals lack credibility |
| Risk and architecture concerns missed | Project failures post-sale |

---

## 3. Scope of Work

### In Scope

- Web-based internal portal (single-company deployment)
- RFP document ingestion pipeline (PDF, DOCX, MD, TXT, email body)
- AI analysis engine (parsing, extraction, generation)
- Deal Go/No-Go AI Advisor
- Feature list extractor with basic effort estimation
- Risk Register generator with heatmap visualization
- RFP Health Score / maturity indicator per project
- C4 architecture views generator (Context, Application)
- Technology stack recommendation based on requirements
- Client-facing project view with role-based access control
- Collaboration tools (comments, annotations, approvals)
- Export to PDF, DOCX, Confluence
- Admin panel for user and system management
- Analytics dashboard for management

### Out of Scope

- Automated proposal writing (Phase 2)
- Contract generation (Phase 2)
- In-app persistent chat (Phase 2)
- Audio/video calling integration (Phase 2)
- Project management after deal close (Phase 3)

---

## 4. Requirements

### 4.1 Document Ingestion

#### Supported Formats
- PDF (up to 200 MB), DOCX, XLSX, PPTX, TXT, HTML, Markdown; up to 10 files per project
- Upload via drag-and-drop or public URL paste

#### Pre-processing
- Integrity check on arrival; corrupted files rejected with a clear error
- OCR on scanned PDFs / image pages (≥ 95% accuracy, standard English)
- Table extraction with structure intact
- Semantic segmentation into sections: executive summary, requirements, technical specs, budget, timeline, appendices
- Language detection: English, German, French, Spanish, Ukrainian
- Metadata extracted: author, creation date, page count, word count

#### Preview & Versioning
- Paginated in-browser preview (no plugin required)
- New upload creates a new document version; prior version and its analysis are preserved
- Upload history shows who uploaded what and when

#### Processing Pipeline
- Stages shown in real time: Uploaded → Queued → OCR → Segmentation → Anonymisation → AI Analysis → Complete / Failed
- Jobs cancellable before AI Analysis stage
- In-app + email notification when processing finishes or fails

#### Error Handling
- Auto-retry up to 3 times with exponential backoff
- Persistent failure alerts the ops team

---

### 4.2 AI Analysis

#### Requirement and Entity Extraction

- Classifies every requirement into: Functional (FR), Non-Functional (NFR), Business (BR), Technical Constraints (TC), Compliance/Regulatory (CR)
- Each item includes: confidence score (0–100%), source reference (page + section), MoSCoW priority
- Surfaces implicit requirements (e.g., "mobile-friendly" → responsive design, accessibility, potential offline support)
- Flags ambiguous, conflicting, or contradictory requirements with explanations
- Completeness check raises gap alerts for missing critical areas (e.g., no security section, no SLA)
- Extracts named entities: company names, products, technologies, regulatory frameworks, budgets, dates
- Builds a project-level glossary with auto-generated definitions
- Stores integration points and quantitative constraints as structured data
- Reviewers can accept, reject, edit, split, or merge any extracted requirement in the UI

#### Feature List and Estimation

- Features structured as: Epic → Feature → User Story → Acceptance Criteria
- Each feature tagged with: domain module, user role, MoSCoW priority, complexity (XS/S/M/L/XL), type (UI, API, integration, infrastructure)
- User stories in "As a / I want / so that" format; acceptance criteria in Given/When/Then (Gherkin)
- Identifies MVP scope by clustering Must Have items; flags overlapping features for consolidation
- Analysts can add custom features
- Effort estimates per feature, broken down by: Frontend, Backend, QA/Testing, UX/UI, DevOps, BA, PM
- Total estimate includes a confidence interval (e.g., 1,200 hrs ± 20%) derived from complexity signals
- Adjusting any estimate recalculates totals in real time; Admin can configure risk/management/QA buffers
- Visualization: summary table + discipline breakdown chart
- Technology stack recommendation (frontend, backend, DB, cloud, message broker, CI/CD) with rationale, maturity, license, TCO implications; analysts can override and lock items; conflicts with stated constraints are flagged

#### Architecture Views

Both views delivered as rendered diagrams and editable PlantUML/Mermaid source; exportable as PNG, SVG, or Confluence page.

- **Context View (C4 L1):** system as a black box + users and external systems; generated from integration points, user roles, and named external dependencies
- **Application View (C4 L2 Container):** deployable containers (web app, API, workers, DB, queue) and their communication; inferred from tech stack, pipeline shape, and NFRs
- Both views editable inline by a Solution Architect and versioned

#### Risk Register

- Auto-generated from the analysed document; categories: Technical, Financial, Timeline, Scope, Compliance, People
- Each entry: description, likelihood (1–5), impact (1–5), risk score (likelihood × impact), mitigation strategy, RFP source reference
- Rendered as an editable table and a colour-coded heatmap (green / amber / red)
- Analysts can add custom risks, edit AI entries, assign owner and due date per mitigation
- Versioned alongside all other artifacts; included in full-project export
- Visible to all internal roles; hidden from Customer view by default

#### Deal Go/No-Go AI Advisor & RFP Health Score

- **Go/No-Go Advisor:** evaluates the RFP against the company's ICP, technical capability matrix, and strategic alignment; first output is a clear recommendation with a match percentage (e.g., *"85% match — Proceed"* or *"High-compliance trap — Decline to bid"*)
- **RFP Health Score (0–100):** displayed prominently on the project Overview tab

| Sub-score | Weight | What is assessed |
| --- | --- | --- |
| Business Clarity | 30% | Executive summary, stated goals, success metrics, budget signals |
| Requirements Completeness | 35% | Coverage of functional, non-functional, compliance, and integration requirements |
| Technical Specificity | 20% | Stack constraints, integration endpoints, performance targets, deployment model |
| Commercial Terms | 15% | Budget range, timeline, evaluation criteria, submission instructions |

- Each sub-score includes actionable recommendations (e.g., "No budget range detected — clarify before estimating")
- Recalculated automatically on new document version upload or manual section correction
- Analysts can dismiss individual recommendations with a note (logged in audit trail)
- Aggregate Health Score visible on project list for at-a-glance triage

---

### 4.3 Portal, Collaboration, and Workflow

#### Application and Project Management

- Company branding (logo, colors) configured by Admin
- No hard cap on number of projects; Admin configures data retention, estimation buffers, notification preferences, export templates
- Project access enforced at the data layer: employees see only assigned projects; Sales Managers and Admins see all
- Main project dashboard columns: name, client, submission date, processing status, assigned analyst, deliverable completion %, last activity
- Filterable and sortable by: status, client, date, industry, estimated value, analyst
- Summary KPIs at top: active projects, average time-to-analysis, pipeline hours, win rate
- Projects can be archived and restored

#### Client View

- Clients see only deliverables explicitly shared by an Account Manager or Sales Manager — no internal notes, pricing, or estimation details
- Accessible via a unique project URL with optional PIN or SSO login
- Clients can leave threaded comments on any visible section
- Clients can formally approve a deliverable or request revision (notifies internal team)
- Internal team can see which deliverables the client has viewed, time spent, and downloads

#### Collaboration

- Any artifact supports threaded inline comments with @mention support
- Canvases and feature lists support real-time collaborative editing (last-write-wins with conflict indicators)
- Per-project live activity feed: all changes, comments, and status transitions
- Team members can assign review tasks with due dates and priority levels
- Artifacts can be tagged with custom labels
- Approval workflow: Draft → In Review → Approved → Sent to Client; each stage configurable to require one or all approvers from a specified group
- Automated reminders for overdue approvals; all decisions recorded in audit log with timestamp and approver identity
- Workflow templates saveable and reusable per project type or client tier

#### Export and Reporting

- Individual or full-project bundle export
- Formats: PDF (branded, print-ready), DOCX (editable), XLSX (estimation data), Markdown, JSON
- Single-click ZIP export for full project bundle
- Direct push to Confluence (create or update page tree)
- Analytics dashboard (Admins and Sales Managers): proposals per period, average processing time, feature count distributions, industry verticals, analyst productivity

#### Notifications and Audit

- Delivery channels: in-app, email, Slack or Microsoft Teams (webhook); users configure events and frequency (immediate / hourly / daily digest)
- Events covered: processing complete/failed, approval required, comment @mention, client viewed deliverable, SLA breach warning, export complete
- Immutable audit log: all logins, uploads, edits, exports, approvals, deletions — queryable by user, event type, project, date range; exportable for compliance
- Full version history for every artifact with diff view between any two versions and one-click rollback

---

### 4.4 Performance, Reliability, and Security

#### Performance Targets
- File uploads ≤ 10 MB: processing initiated within 3 s
- Standard 30-page RFP analysis: complete within 120 s
- UI pages: Time to Interactive < 2 s (10 Mbps connection)
- API reads: < 300 ms at p95
- Canvas rendering: < 500 ms; full project bundle export: < 30 s
- Real-time collaboration updates: propagate within 500 ms

#### Scalability
- Handle ≥ 20 concurrent analysis jobs and ~100 concurrent users without degradation
- Job queue absorbs bursts; clears all queued jobs within 5 min at peak; no dropped jobs or silent timeouts
- AI workers scale horizontally (new instances when queue depth > 5), independently of the web tier
- System handles 2× active users/projects without infrastructure reconfiguration, within SLA
- Data layer: 1,000 read queries/s, 200 writes/s; up to 5,000 projects and 500,000 artifacts

#### Uptime & Recovery
- Portal uptime: 99.9%/month; AI pipeline: 99.5%
- RTO: 1 hour; RPO: 15 minutes
- `/healthz` endpoint exposes structured status for all subsystems
- Failed jobs auto-retried ×3; persistent failures alert ops team within 5 min
- Graceful degradation: if AI service goes down, upload and manual editing remain functional; degraded mode activates automatically within 30 s with a visible user banner

#### Security
- All data in transit: TLS 1.3; all data at rest: AES-256
- GDPR-compliant (right to erasure, data portability, consent management, DPAs); targets SOC 2 Type II
- Client data deletion purged within 72 hours across all artifacts and audit log; purge completion recorded; must be a tested, deliberate flow
- Employee accounts: optional MFA, enforceable company-wide by Admin
- Project-level access control enforced at the data layer
- IP allowlisting configurable by Admin
- Auth tokens expire after 8 hours of inactivity; refresh tokens after 30 days
- Rate limiting: 100 req/min per session; 20 uploads/hour per user
- Passwords hashed with bcrypt (cost ≥ 12) or Argon2id
- CSP headers prevent XSS; all inputs validated server-side against SQL injection, SSRF, path traversal
- Dependency scanning in CI with hard block on critical CVEs
- PII anonymised before dispatch to any external LLM (reversible mapping never leaves company infrastructure); LLM providers must contractually commit to not training on client content
- Single data region chosen at installation time

#### Accessibility & i18n
- UI meets WCAG 2.1 Level AA; full keyboard navigation including canvas interactions
- Dark and light mode (follows system preference); optimised for 1280–2560 px desktop widths
- Destructive actions require confirmation dialog; error messages human-readable, never expose internals
- New employees: in-app guided tour and contextual tooltips; all forms auto-save with visible status indicator
- UI supports English, German, French, Spanish, Ukrainian; all strings externalised to locale files; date/time/number/currency formatted per locale in UI and exported documents

---

### 4.5 Technical Stack and Infrastructure

#### Platform

| Concern | Requirement |
| --- | --- |
| Deployment targets | AWS, GCP, or Azure (cloud-native, containerised) |
| Processing pipeline | Event-driven; each stage (OCR, segmentation, anonymisation, extraction) runs as an independent worker via RabbitMQ, Kafka, or SQS |
| Architecture patterns | CQRS (read/write separation), Outbox Pattern (reliable event publishing), BFF layer |
| Caching | CDN for static assets · Redis for sessions and API responses · application-level cache for AI results |

#### PII Anonymisation

Before any content reaches an external LLM, a dedicated anonymisation worker replaces PII (names, emails, phone numbers, financial figures) with typed placeholders (e.g. `[PERSON_1]`, `[EMAIL_1]`). The placeholder → original mapping is stored encrypted and never sent to the LLM; outputs are re-hydrated before display or export. The placeholder count is recorded in the audit log per document version.

#### AI / LLM

| Concern | Requirement |
| --- | --- |
| Providers | OpenAI GPT-4-class, Anthropic Claude Sonnet/Opus, or Azure OpenAI — swappable via abstraction layer |
| Self-hosted option | Ollama or vLLM for on-premise deployments (graceful feature degradation) |
| Document handling | RAG pipeline: 512-token chunks (10% overlap), embedded into Qdrant, retrieved at analysis time |
| Output parsing | All LLM outputs validated against JSON schemas |
| Observability | Costs tracked per project; inputs/outputs logged with PII redacted; thumbs up/down feedback from analysts |
| Prompt management | Versioned config (not code) — prompt tuning requires no deployment |

#### Frontend

| Concern | Requirement |
| --- | --- |
| Framework | React 18+ or Next.js 14+, strict TypeScript |
| Diagramming | React Flow or Konva.js (drag-and-drop, zoom, pan) |
| Real-time | WebSockets |
| Performance | Bundle < 500 KB gzipped · LCP < 2.5s · FID < 100ms · CLS < 0.1 |

#### Backend

| Concern | Requirement |
| --- | --- |
| Framework | Node.js (NestJS) or Python (FastAPI), OpenAPI 3.1 |
| Validation | Zod, Joi, or Pydantic |
| Background jobs | BullMQ or Celery; job status persisted |
| Observability | Structured JSON logs with trace IDs; distributed tracing via OpenTelemetry |

#### Data

| Store | Purpose |
| --- | --- |
| PostgreSQL 15+ | Primary relational data; versioned migrations; column-level encryption for sensitive fields |
| S3-compatible object storage | Raw document files (server-side encryption, versioning) |
| Redis | Sessions and short-lived cache |
| Qdrant | Vector embeddings |

Backups run daily with 30-day retention and point-in-time recovery enabled.

#### Integrations

| System | Integration method |
| --- | --- |
| Salesforce | REST API, API key auth; CRM webhooks create/update projects within 60 s |
| SSO | OAuth 2.0 — Google Workspace, Azure AD, Okta, SAML 2.0 |
| Confluence | REST API (page publishing) |
| Slack / Teams | Incoming webhooks |
| No-code automation | Webhook endpoint or Zapier/Make app |

#### DevOps & Infrastructure

| Concern | Requirement |
| --- | --- |
| Containers | Docker multi-stage builds; single `docker compose up` for local dev |
| Orchestration | Kubernetes with Helm charts |
| CI/CD | GitHub Actions or GitLab CI (lint, test, build, security scan, deploy) |
| Infrastructure as code | Terraform or Pulumi |
| Logging / metrics | ELK stack or cloud-equivalent; Prometheus + Grafana or cloud-equivalent |
| Deployments | Blue/green or canary with automatic rollback on failed health checks |
| Test coverage | ≥ 80% unit test coverage for business logic |
| Feature flags | Gradual rollout for new AI models and analysis capabilities |

---

## 5. User Roles & Permissions

The system defines two top-level categories: **Employees** (internal staff) and **Customers** (external clients).

### Employee Roles

| Role | Description | Key Permissions |
| --- | --- | --- |
| **Admin** | Manages the application: users, system settings, branding, LLM configuration, audit log | All system permissions; user management; system configuration; view all projects and analytics |
| **Sales Manager** | Owns the pre-sales pipeline; assigns projects to team members | View all projects; create/archive projects; assign employees; access management analytics; send deliverables to client |
| **Solution Architect (SA)** | Leads architectural analysis; owns architecture views and tech stack recommendation | Edit all artifacts on assigned projects; approve architectural deliverables |
| **Business Analyst (BA)** | Primary analyst; drives requirement extraction and canvas review | Full edit on requirements, canvases, feature list, risk register on assigned projects; submit deliverables for review |
| **Estimator** | Owns effort estimation for features | Edit feature list estimates on assigned projects; read-only access to all other artifacts |
| **Account Manager** | Client relationship owner; coordinates review and approval flow | Read/comment on all artifacts on assigned projects; invite and manage Customer access; send deliverables to client |

### Customer Role

| Role | Description | Key Permissions |
| --- | --- | --- |
| **Customer** | External client invited to review deliverables for their project | View shared deliverables; add threaded comments; approve or request revision; download exports granted by Account Manager; no access to internal notes, pricing, or estimation details |

### Permission Matrix Summary

| Action | Admin | Sales Manager | SA | BA | Estimator | Account Manager | Customer |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Create / archive project | ✓ | ✓ | — | — | — | — | — |
| Assign employees to project | ✓ | ✓ | — | — | — | — | — |
| Upload RFP document | ✓ | ✓ | ✓ | ✓ | — | — | — |
| Edit requirements & canvases | ✓ | — | ✓ | ✓ | — | — | — |
| Edit feature estimations | ✓ | — | ✓ | ✓ | ✓ | — | — |
| Raise / resolve Clarification Request | ✓ | — | ✓ | ✓ | — | — | — |
| Escalate CR to client | ✓ | ✓ | — | ✓ | — | ✓ | — |
| Sign off Requirements (BA gate) | ✓ | — | — | ✓ | — | — | — |
| Submit deliverable for review | ✓ | ✓ | ✓ | ✓ | — | ✓ | — |
| Approve deliverable (internal) | ✓ | ✓ | ✓ (arch) | ✓ (BA) | — | ✓ | — |
| Send deliverable to Customer | ✓ | ✓ | — | — | — | ✓ | — |
| View & comment (Customer) | — | — | — | — | — | — | ✓ |
| Approve / request revision (Customer) | — | — | — | — | — | — | ✓ |
| Manage users | ✓ | — | — | — | — | — | — |
| Configure system settings | ✓ | — | — | — | — | — | — |
| View analytics dashboard | ✓ | ✓ | — | — | — | — | — |

---

## 6. UX/UI Requirements

- Primary navigation: persistent left sidebar with project list + top header with user menu and global search.
- Project view: tab-based layout — Overview | Requirements | Features & Estimates | Architecture | Risk Register | Export.
- Canvas views: toggle between visual canvas mode and structured table/list mode.
- AI-generated content visually distinguished from user-edited content (e.g., sparkle icon or dashed border).
- Confidence score visible by default as a colored indicator: green ≥ 80%, yellow 50–79%, red < 50%.
- Feature estimation view: summary bar showing total hours, by-role breakdown, and selected scenario.
- Consistent design system (e.g., shadcn/ui or Ant Design).
- Loading states use skeleton screens, not spinners.
- All forms auto-save with visible status indicator (Saving… | Saved | Error).
- Onboarding checklist for new employees: first upload, team invite, first export.

---

## 7. Estimation & Delivery Requirements

### Delivery Phases

#### Phase 1 — MVP (Target: 12 weeks)

- User management (all roles)
- Document upload (PDF, DOCX, MD) and OCR pipeline
- Anonymisation worker for PII redaction
- Deal Go/No-Go AI Advisor
- Requirement extraction (FR, NFR, BR)
- Feature list extraction with basic effort estimation
- C4 Context and Application views
- Risk Register generation (AI-extracted, editable heatmap)
- RFP Health Score with actionable recommendations
- PDF and DOCX export
- Basic client portal (view-only)
- MS Teams notifications

#### Phase 2 — Enhanced Analytics (Target: +8 weeks)

- C4 Component View (Level 3) for Paid Discovery
- Real-time collaboration (WebSockets)
- Approval workflow engine
- In-app persistent chat
- Audio/video calling integration
- Confluence export
- Email notifications
- Full audit trail UI

#### Phase 3 — Platform & Ecosystem (Target: +8 weeks)

- SSO (SAML)
- CRM webhook integration (Salesforce)
- Analytics dashboard for management
- Custom canvas configuration via Admin panel
- LLM provider switching and prompt A/B testing
- Self-hosted LLM support (Ollama)
- API key management for external integrations

### Estimation Guidelines for Vendor Response

Vendors must provide estimates broken down by:

| Category | Estimate (hours) |
| --- | --- |
| Frontend Development | |
| Backend Development | |
| AI/ML Integration & Prompt Engineering | |
| DevOps & Infrastructure | |
| UX/UI Design | |
| QA & Testing | |
| Business Analysis & Requirements | |
| Project Management | |
| **Total** | |

---

## 8. Submission Timeline

| Milestone | Target Date |
| --- | --- |
| RFP published to shortlisted vendors | 2026-05-28 |
| Vendor questions deadline | 2026-05-29 |
| Q&A responses published (shared with all vendors) | 2026-06-05 |
| Proposal submission deadline | 2026-06-20 |
| Evaluation and scoring period | 2026-06-23 – 2026-07-04 |
| Shortlisted vendor presentations / demos | 2026-07-07 – 2026-07-11 |
| Award notification | 2026-07-18 |
| Contract signing target | 2026-07-25 |
| Kick-off / project start | 2026-08-04 |

**Submission instructions:** Submit as a single PDF (max 80 pages, excluding appendices) + XLSX covering the effort breakdown table from Section 8. Send to `rfp@[company].com` with subject line `Proposal — AI-Powered Customer Portal — [Vendor Name]`. Questions must be submitted in writing before the questions deadline; verbal questions will not be accepted. All questions and anonymised answers are shared with all participating vendors simultaneously.

NDA must be on file before accessing this document.

---

## 9. Evaluation Criteria

Proposals scored on a 100-point scale across five dimensions. Scoring panel: Sales Manager, Solution Architect, senior Business Analyst.

| Dimension | Weight | What is assessed |
| --- | --- | --- |
| **Technical Approach & Architecture** | 30 pts | Architecture quality, technology choices, AI integration strategy, scalability, security posture |
| **Functional Coverage** | 25 pts | Completeness against Section 4; identification of gaps or risks |
| **Team & Experience** | 20 pts | Relevant portfolio (AI-powered SaaS, B2B web apps), team seniority, comparable references |
| **Commercial Terms** | 15 pts | Price competitiveness, payment milestones, value for money |
| **Delivery Plan & Risk Management** | 10 pts | Realism of phased timeline, risk identification and mitigation, contingency approach |

Vendors scoring below 50 total points will not be invited to the presentation round. The company reserves the right to negotiate scope and price with the top-ranked vendor. Price alone will not be the deciding factor.

**Minimum qualification thresholds** (disqualifying if not met):
- At least one delivered AI-powered web application with a live reference customer.
- Demonstrated experience with LLM integration (OpenAI, Anthropic, or equivalent) in production.
- Team must include at least one dedicated Solution Architect and one senior Frontend engineer for Phase 1.
- Willingness to work within the client's preferred cloud region (EU or US, confirmed at award).
