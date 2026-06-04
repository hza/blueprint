---
**CONFIDENTIAL — FOR AUTHORIZED RECIPIENTS ONLY**

This document contains sensitive information about the company's internal
processes and client interactions. It is intended solely for the use of
authorized vendors and partners who have signed a non-disclosure agreement (NDA)
with the company. Unauthorized access, distribution, or disclosure of this
document is strictly prohibited and may result in legal action.
---

# RFP: AI-Powered Customer Portal

**Document Version:** 1.0
**Date:** 2026-05-31
**Status:** Draft
**Classification:** Confidential — Internal / Client-Facing
**Prepared by:** [Company Name]
**Intended Recipients:** Authorized Vendors and Partners Only
**Distribution:** Restricted

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Background & Context](#2-project-background--context)
3. [Scope of Work](#3-scope-of-work)
4. [Requirements](#4-requirements)
   - 4.1 [Document Ingestion](#41-document-ingestion)
   - 4.2 [AI Analysis](#42-ai-analysis)
   - 4.3 [Portal, Collaboration, and Workflow](#43-portal-collaboration-and-
     workflow)
     - 4.3.1 [Requirements Review Workflow](#requirements-review-workflow)
   - 4.4 [Performance, Reliability, and Security](#44-performance-reliability-
     and-security)
   - 4.5 [Technical Stack and Infrastructure](#45-technical-stack-and-
     infrastructure)
5. [User Roles & Permissions](#5-user-roles--permissions)
6. [User Stories & Acceptance Criteria](#6-user-stories--acceptance-criteria)
7. [UX/UI Requirements](#7-uxui-requirements)
8. [Estimation & Delivery Requirements](#8-estimation--delivery-requirements)
9. [Submission Timeline](#9-submission-timeline)
10. [Evaluation Criteria](#10-evaluation-criteria)

---

## 1. Executive Summary

This document defines requirements for an **AI-powered Customer Portal** built
for internal use by a single outsourcing software company. The portal enables
company employees — Business Analysts, Solution Architects, Sales Managers, and
Account Managers — to upload client RFP (Request for Proposal) documents and
receive automated, AI-generated deliverables including business model analysis,
feature breakdowns with effort estimates, and strategic canvases. External clients receive a dedicated, access-controlled
view to review and comment on the deliverables prepared for them.

The system reduces time-to-proposal from days to hours, standardizes analysis
quality across the team, and gives clients a professional workspace for
reviewing pre-sales artifacts.

### Business Goals

- Reduce manual pre-sales effort by **≥ 70%** through AI automation.
- Standardize proposal quality across all internal teams.
- Shorten average proposal turnaround from **5–7 business days to < 24 hours**.
- Increase proposal win rate by improving depth and accuracy of requirement
  analysis.
- Provide clients with a clean, professional view of the deliverables prepared
  for them.

---

## 2. Project Background & Context

The company receives dozens of RFP documents annually. Each document requires:

- Domain comprehension and decomposition
- Business model analysis
- Functional and non-functional requirement extraction
- Architecture assessment
- Effort estimation across disciplines (frontend, backend, QA, DevOps, design)
- Risk identification
- Proposal writing

Today, this work is done manually by senior staff, creating bottlenecks,
inconsistency, and high cost. An AI-powered internal portal can automate 70–80%
of this work, allowing the team to focus on review, refinement, and client
engagement.

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

Analysts upload RFP documents through a drag-and-drop interface or by pasting a
public URL. Supported formats include PDF (up to 200 MB), Word documents, Excel
spreadsheets, PowerPoint files, plain text, HTML, and Markdown. Up to 10 files
can be attached to a single project to accommodate annexes and supporting
materials.

Every upload is integrity-checked on arrival and rejected with a clear error if
the file is corrupted. Document metadata — author, creation date, page count,
word count — is extracted and preserved. Upload history is visible per project,
showing who uploaded what and when.

Before any AI work begins, the document goes through pre-processing: OCR is
applied to scanned PDFs and image-based pages (targeting ≥ 95% accuracy for
standard English text), tables are extracted with their structure intact, and
the document is segmented into logical sections — executive summary,
requirements, technical specs, budget, timeline, appendices — using a
combination of heading detection and semantic similarity. The system detects the
document language and handles English, German, French, Spanish, and Ukrainian.

A paginated in-browser preview is generated without any plugin requirement. When
a revised version of an RFP is uploaded, a new document version is created and
the previous version with all its analysis is preserved.

Processing status is shown in real-time as a stage pipeline: Uploaded → Queued →
OCR → Segmentation → Anonymisation → AI Analysis → Complete / Failed. The
uploader receives an in-app notification and email when processing finishes or
fails. Jobs can be cancelled before the AI
analysis stage starts. If a job fails, it is retried up to three times with
exponential backoff; if it keeps failing, the ops team is alerted.

### 4.2 AI Analysis

#### Requirement and Entity Extraction

The AI engine reads the pre-processed document and classifies every requirement
it finds into one of five categories: Functional (FR), Non-Functional (NFR),
Business (BR), Technical Constraints (TC), or Compliance/Regulatory (CR). Each
extracted item gets a confidence score from 0 to 100%, a source reference
pointing to the page and section it came from, and a MoSCoW priority (Must Have
/ Should Have / Could Have / Won't Have). The system also looks for implicit
requirements — for example, a phrase like "mobile-friendly" implies responsive
design, accessibility considerations, and potential offline support — and
surfaces those separately.

If the AI spots ambiguous, conflicting, or contradictory requirements, it flags
them with an explanation. It also runs a completeness check and raises gap alerts
when critical areas appear to be missing from the RFP entirely, such as no
mention of security requirements or no SLA defined.

Beyond requirements, the engine extracts named entities — company names,
products, technologies, regulatory frameworks, geographic regions, budget
figures, and timeline dates — and builds a project-level glossary of domain-
specific terms with auto-generated definitions drawn from context. Integration
points with external systems and quantitative constraints (response time
targets, load numbers, uptime requirements) are extracted and stored as
structured data.

Reviewers can accept, reject, edit, split, or merge any extracted requirement
directly in the UI.

#### Feature List and Estimation

Features are extracted as a four-level hierarchy: Epic → Feature → User Story →
Acceptance Criteria. Each feature is tagged with its domain module (auth,
payments, notifications, etc.), the user role it serves, MoSCoW priority,
complexity sizing (XS/S/M/L/XL), and type (UI, API, integration,
infrastructure). User stories follow the standard "As a [role], I want
[feature], so that [benefit]" format, and acceptance criteria are written in
Given/When/Then (Gherkin) style.

It identifies the MVP scope by clustering Must Have items and flags overlapping
features suggesting consolidation. Analysts can add custom features that weren't
extracted from the document.

Effort estimates are produced in hours per feature, broken down by discipline:
Frontend, Backend, QA/Testing, UX/UI Design, DevOps/Infrastructure, Business
Analysis, and Project Management. Estimates use T-shirt sizing (XS/S/M/L/XL)
converted to hours. The total project estimate comes with a confidence interval
(e.g., 1,200 hours ± 20%) derived from complexity signals. Adjusting any
individual estimate immediately recalculates the totals. Estimation buffers for
risk, management overhead, and QA can be configured by the Admin.

Estimates are visualized as a summary table and a discipline breakdown chart.

The AI also recommends a technology stack — frontend framework, backend language
and framework, database, cloud provider, message broker, CI/CD tooling — based
on the extracted requirements. Each recommendation includes rationale, maturity
level, license model, and typical TCO implications. Analysts can override and
lock any stack item; locked items are not touched by subsequent AI re-analysis.
The system flags conflicts where a recommended technology clashes with a stated
constraint (e.g., cloud-native stack recommended but the RFP requires on-premise
deployment).

#### Architecture Views

The system generates pre-sales architecture views from the C4 Model, intended
to show technical competence without giving away deep consulting for free:

The **Context View** (C4 Level 1) shows the system in its environment — the
target application as a black box surrounded by the users and external systems
it interacts with. It is generated from integration points, user roles, and
named external dependencies extracted from the RFP. Delivered as a rendered
diagram and editable PlantUML/Mermaid source.

The **Application View** (C4 Level 2 Container Diagram) breaks the system down
into its deployable containers — web app, API, background workers, databases,
message queue — and shows how they communicate. It is inferred from the
extracted technology stack, processing pipeline shape, and non-functional
requirements. Delivered as a rendered diagram and editable PlantUML/Mermaid
source.

*(Note: The **Component View** (C4 Level 3) and Infrastructure View are
deliberately excluded from the pre-sales scope and reserved for the Paid
Discovery Phase.)*

Both views are editable inline by a Solution Architect, versioned, and
exportable as PNG, SVG, or embedded Confluence page.

#### Risk Register

The AI engine auto-generates a Risk Register from the analysed document. Risks
are classified into six categories: Technical, Financial, Timeline, Scope,
Compliance, and People. Each entry carries a short description, likelihood score
(1–5), impact score (1–5), a computed risk score (likelihood × impact), a
recommended mitigation strategy, and a source reference in the RFP. The register
is rendered as both an editable table and a colour-coded heatmap (green / amber
/ red quadrants). Analysts can add custom risks, edit AI-generated entries, and
assign an owner and due date for each mitigation action. Risks are versioned
alongside all other project artifacts and included in the full-project export
bundle. The Risk Register tab is visible to all internal roles assigned to the
project; it is not exposed to the Customer view by default.

#### Deal Go/No-Go AI Advisor & RFP Health Score

Before any significant processing time is spent, the system runs a fast **Deal
Go/No-Go AI Advisor**. It evaluates the RFP against the company's Ideal Customer
Profile (ICP), technical capability matrix, and strategic alignment criteria.
The first output the Sales Manager sees is a clear recommendation, e.g., *"This
RFP has an 85% match with our core competencies. Proceed."* or *"High-compliance
trap with ambiguous scope and low technical alignment. Decline to bid."*

Following the Go/No-Go decision, the system computes an **RFP Health Score**
(0–100) and displays it prominently on the project Overview tab. The score is
broken into four weighted sub-scores:

| Sub-score | Weight | What is assessed |
| --- | --- | --- |
| Business Clarity | 30% | Presence of executive summary, stated goals, success metrics, budget signals |
| Requirements Completeness | 35% | Coverage of functional, non-functional, compliance, and integration requirements |
| Technical Specificity | 20% | Stack constraints, integration endpoints, performance targets, deployment model |
| Commercial Terms | 15% | Budget range, timeline, evaluation criteria, submission instructions |

Each sub-score is accompanied by a short list of actionable recommendations —
for example, "No budget range detected — clarify with the client before
estimating" or "Security requirements section is absent — consider requesting a
compliance annex." The Health Score is recalculated automatically whenever a new
document version is uploaded or a manual section correction is submitted.
Analysts can dismiss individual recommendations with a note, and the dismissed
recommendations are logged in the audit trail. The aggregate Health Score is
shown on the project list so Sales Managers can triage documents at a glance.

### 4.3 Portal, Collaboration, and Workflow

#### Application and Project Management

The portal displays the company's branding — logo and colors — configured by the
Admin. Projects are created one per RFP and there is no hard cap on the number
of projects. The Admin configures system-wide settings including data retention
policy (auto-archiving after configurable inactivity), default estimation
buffers, notification preferences, and export templates. Project access is
enforced at the data layer: employees can only see projects they're assigned to,
while Sales Managers and Admins see everything.

The main project dashboard shows name, client, submission date, processing
status, assigned analyst, deliverable completion percentage, and last activity.
It can be filtered and sorted by status, client, date, industry, estimated
value, and analyst. Summary KPIs — active projects, average time-to-analysis,
pipeline hours, win rate — are shown at the top. Projects can be archived and
restored.

#### Client View

Customers receive a dedicated portal view where only the deliverables explicitly
shared with them by an Account Manager or Sales Manager are visible — no
internal notes, pricing, or estimation details. The client portal is accessible
via a unique project URL with optional PIN or SSO login. Clients can leave
threaded comments on any visible section and can formally approve a deliverable
or request a revision, both of which send a notification to the internal team.
The internal team can see which deliverables the client has viewed, how long
they spent on each, and whether they downloaded anything.

#### Collaboration

Any artifact — a requirement, a feature, a canvas cell — supports
threaded inline comments with @mention support. Canvases and feature lists
support real-time collaborative editing (last-write-wins with conflict
indicators). Each project has a live activity feed showing all changes,
comments, and status transitions. Team members can assign review tasks to each
other with due dates and priority levels. Artifacts can be tagged with custom
labels.

The approval workflow moves deliverables through configurable stages: Draft → In
Review → Approved → Sent to Client. Each stage can require sign-off from any one
of, or all of, a specified user group. Automated reminders go out for approvals
that are overdue past a configured SLA. All approval decisions are recorded in
the audit log with timestamps and approver identity. Workflow templates can be
saved and applied per project type or client tier.

#### Requirements Review Workflow

The Requirements deliverable follows a structured BA-led review process before
it can advance past Draft.

**BA review gate** — The Requirements deliverable is locked in Draft until the
assigned BA has explicitly signed it off as Reviewed. This gate is enforced at
the data layer; no other role can advance the deliverable past Draft on the BA's
behalf. If no BA is assigned, the Sales Manager is notified to assign one before
the gate can be cleared.

**Clarification Requests (CRs)** — The BA can raise a formal Clarification
Request against any extracted requirement or document section, tagging it as one
of: Ambiguous, Conflicting, or Incomplete. An open CR is visible directly on the
requirement item and blocks that item from being marked Ready. The total count
of open CRs is shown on the project Overview tab so Sales Managers can track BA
progress at a glance.

**CR resolution flow** — CRs can be resolved in three ways: by the BA themselves
after editing the requirement text; by the assigned SA if the clarification is a
technical constraint; or escalated to the Account Manager or Sales Manager to
request clarification from the client. Escalated CRs appear in the client portal
as a structured question thread if the Account Manager chooses to surface them.
Every resolution records the resolver's identity, the resolution note, and a
timestamp in the audit log.

**Requirements sign-off** — Once all CRs are resolved, the BA marks the full
Requirements set as Reviewed. This action triggers an in-app notification and
email to the SA and Sales Manager, and unlocks downstream deliverables — canvas
generation, feature estimation — for editing by other assigned roles. The sign-
off is recorded in the audit log and shown on the project timeline.

**Audit trail** — All CR raises, edits, escalations, resolutions, and BA sign-
offs are written to the immutable audit log with user identity, timestamp, and
before/after content where applicable.

#### Export and Reporting

Any deliverable can be exported individually or as a full project bundle.
Supported formats are PDF (branded, print-ready), DOCX (editable), XLSX (for
estimation data), Markdown, and JSON. A single-click ZIP export packages all
deliverables together. The system can push content directly to Confluence
(creating or updating a page tree). Exported PDFs use the company's brand
template — logo, fonts, colors, cover page, and footer.

Admins and Sales Managers have access to an analytics dashboard covering
proposals created per period, average processing time, feature count
distributions, common industry verticals, and analyst productivity.

#### Notifications and Audit

Notifications are delivered in-app, by email, and optionally to Slack or
Microsoft Teams via webhook. Users configure which events they want to hear
about and whether they prefer immediate delivery or a digest rollup (hourly or
daily). Events covered include: processing complete or failed, approval
required, comment @mention, client viewed a deliverable, SLA breach warning, and
export complete.

All user actions are stored in an immutable audit log — logins, uploads, edits,
exports, approvals, deletions — queryable and filterable by user, event type,
project, and date range. The full version history of every artifact is
preserved, with diff views between any two versions and one-click rollback to
any prior version. The audit log is exportable for compliance purposes.

### 4.4 Performance, Reliability, and Security

The portal is expected to be responsive and reliable under normal company usage.
File uploads up to 10 MB should initiate processing within 3 seconds. A standard
30-page RFP analysis should complete within 120 seconds. All UI pages should
reach Time to Interactive under 2 seconds on a decent connection (10 Mbps). API
reads should respond in under 300 ms at the 95th percentile. Canvas rendering
should complete in under 500 ms and a full project bundle export in under 30
seconds. Real-time collaboration updates should propagate to all active viewers
within 500 ms.

The system should handle up to 20 concurrent analysis jobs and around 100
concurrent users without degrading. The job queue must absorb bursts gracefully
and clear all queued jobs within 5 minutes at peak load — no job dropped, no
silent timeout. AI processing workers scale horizontally, independently of the
web tier — new worker instances spin up automatically when the job queue depth
exceeds 5. The system must handle a doubling of active users and projects
without infrastructure reconfiguration; response times must stay within SLA
throughout. The database should comfortably handle 1,000 read queries per second
and 200 writes. The data layer should sustain up to 5,000 projects and 500,000
artifacts without performance issues.

Uptime target for the portal is 99.9% per month. The AI pipeline targets 99.5%.
Recovery Time Objective is 1 hour; Recovery Point Objective is 15 minutes. A
`/healthz` endpoint exposes structured status for all subsystems. Failed jobs
are auto-retried up to three times; persistent failures alert the ops team
within 5 minutes. If the AI service goes down entirely, document upload and
manual editing remain functional — the portal degrades gracefully rather than
going dark. The switch to degraded mode must happen automatically within 30
seconds of detecting the provider is unreachable, with a visible banner
informing users exactly what is unavailable.

All data in transit is encrypted with TLS 1.3 and all data at rest with AES-256.
The system is GDPR-compliant (right to erasure, data portability, consent
management, DPAs) and targets SOC 2 Type II for Security, Availability, and
Confidentiality. When a client requests deletion of their data, all associated
documents, extracted artifacts, analysis results, and audit log entries must be
purged within 72 hours; the audit log must record when the purge completed. This
must be a deliberate, tested flow — not handled ad hoc. Employee accounts
support optional MFA, enforceable company-wide by the Admin. Project-level
access control is enforced at the data layer, not just the UI. IP allowlisting
is configurable by the Admin. Auth tokens expire after 8 hours of inactivity,
refresh tokens after 30 days. Rate limiting is applied per session (100 req/min)
and per user for uploads (20/hour). Passwords are hashed with bcrypt (cost
factor ≥ 12) or Argon2id. CSP headers prevent XSS. All inputs are validated
server-side against SQL injection, SSRF, and path traversal. Dependency scanning
runs in CI with a hard block on critical CVEs. Client documents are anonymised
before dispatch to any external LLM provider (see Section 4.5); the reversible
placeholder mapping never leaves the company's infrastructure. AI providers must
contractually commit to not training on client document content. The system is
deployed in a single data region chosen at installation time.

The UI meets WCAG 2.1 Level AA, supports keyboard navigation for all canvas
interactions, dark and light mode (following system preference), and is
optimised for desktop widths from 1280 to 2560 px. Destructive actions require a
confirmation dialog. Error messages are human-readable and never expose internal
details. New employees get an in-app guided tour and contextual help tooltips.
All forms auto-save with a visible status indicator.

The portal UI supports English, German, French, Spanish, and Ukrainian, with all
strings externalised to locale files. Date, time, number, and currency
formatting follows the configured locale across both the UI and generated export
documents.

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

The system defines two top-level categories of users: **Employees** (internal
company staff) and **Customers** (external clients). Employees are subdivided
into functional roles.

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
| **Customer** | External client invited to review deliverables for their project | View deliverables explicitly shared with them; add threaded comments; approve or request revision on shared deliverables; download exports granted by the Account Manager; no access to internal notes, pricing, or estimation details |

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

## 6. User Stories & Acceptance Criteria

### US-001: Upload and Analyze RFP

**As a** Business Analyst,  
**I want to** upload an RFP document and receive an automated analysis,  
**so that** I can review structured requirements within minutes instead of
hours.

**Acceptance Criteria:**
- **Given** I am logged in as a Business Analyst, **When** I drag and drop a
  valid PDF file, **Then** the file uploads with a progress bar and enters the
  processing queue.
- **Given** a document is in the processing queue, **When** processing
  completes, **Then** I receive an in-app notification and email.
- **Given** processing completes, **When** I open the project, **Then** I see
  all deliverables (requirements, feature list, architecture views) populated
  with confidence scores.
- **Given** processing fails, **When** the system retries 3 times and fails,
  **Then** I receive an error notification with a support reference ID.

### US-002: Review Feature Estimations

**As a** Solution Architect,  
**I want to** adjust individual feature estimates and see the total update in real time,  
**so that** I can produce an accurate proposal before submitting to the client.

**Acceptance Criteria:**
- **Given** a feature list is generated, **When** I change an estimate value,
  **Then** the total project estimate recalculates within 500ms.
- **Given** I adjust estimates, **When** I export to XLSX, **Then** the export
  reflects my changes, not the original AI estimates.

### US-003: Client Reviews Deliverables

**As a** Client (Guest User),  
**I want to** review the generated deliverables and leave comments,  
**so that** I can provide feedback without needing access to the full portal.

**Acceptance Criteria:**
- **Given** my account manager shares a client portal link, **When** I visit the
  link, **Then** I can view deliverables without creating an account (PIN auth).
- **Given** I am viewing a shared deliverable, **When** I click a section,
  **Then** I can add a comment that notifies my account manager.
- **Given** I review a deliverable, **When** I click "Approve", **Then** the
  status updates and the internal team is notified.

---

## 7. UX/UI Requirements

- The primary navigation must be a persistent left sidebar with project list,
  plus a top header with user menu and global search.
- The project view must use a tab-based layout: Overview | Requirements |
  Features & Estimates | Architecture | Risk Register | Export.
- Canvas views must offer both a visual canvas mode and a structured table/list
  mode, toggled by the user.
- All AI-generated content must be visually distinguished from user-edited
  content with a subtle indicator (e.g., sparkle icon or dashed border).
- The confidence score for each AI-generated item must be visible by default as
  a colored indicator (green ≥ 80%, yellow 50–79%, red < 50%).
- The feature estimation view must include a summary bar at the top showing
  total hours, by-role breakdown, and selected scenario.
- The system must use a consistent, documented design system (e.g., based on
  shadcn/ui or Ant Design) for visual consistency.
- Loading states must use skeleton screens rather than spinners for content
  areas.
- All forms must implement auto-save with a visible save status indicator
  (Saving… | Saved | Error).
- The portal must include an onboarding checklist for new employees guiding them
  through first upload, team invite, and first export.

---

## 8. Estimation & Delivery Requirements

### Delivery Phases

#### Phase 1 — MVP (Target: 12 weeks)

- User management (Admin, Sales Manager, SA, BA, Estimator, Account Manager,
  Customer roles)
- Document upload (PDF, DOCX, MD) and OCR pipeline
- Anonymisation worker for PII redaction
- Deal Go/No-Go AI Advisor (ICP & Capability alignment)
- Requirement extraction (FR, NFR, BR)
- Feature list extraction with basic effort estimation
- C4 Context and Application views
- Risk Register generation (AI-extracted, editable heatmap)
- RFP Health Score with actionable recommendations
- PDF and DOCX export
- Basic client portal (view-only)
- MS Teams notifications

#### Phase 2 — Enhanced Analytics (Target: +8 weeks)

- C4 Component View (Level 3) generation for Paid Discovery
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
- Self-hosted LLM support (Ollama) for data-sensitive clients
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

## 9. Submission Timeline

Vendors are expected to adhere to the following schedule. All deadlines are end-
of-business in the timezone specified at contract award.

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

**Submission instructions:** Proposals must be submitted as a single PDF (max 80
pages, excluding appendices) and an accompanying XLSX covering the effort
breakdown table from Section 8. Both files must be sent to `rfp@[company].com`
with the subject line `Proposal — AI-Powered Customer Portal — [Vendor Name]`.
Questions must be submitted in writing to the same address before the questions
deadline; verbal questions will not be accepted. All questions and anonymised
answers will be shared with all participating vendors simultaneously.

NDA: Vendors must have a signed NDA on file before accessing this document.
Contact the named procurement representative if an NDA has not yet been
executed.

---

## 10. Evaluation Criteria

Proposals will be scored on a 100-point scale across five dimensions. The
scoring panel consists of the Sales Manager, a Solution Architect, and a senior
Business Analyst.

| Dimension | Weight | What is assessed |
| --- | --- | --- |
| **Technical Approach & Architecture** | 30 pts | Quality of proposed architecture, technology choices, AI integration strategy, scalability approach, security posture |
| **Functional Coverage** | 25 pts | Completeness of scope coverage against Section 4; identification of gaps or risks in requirements |
| **Team & Experience** | 20 pts | Relevant portfolio (AI-powered SaaS portals, B2B web apps), team composition and seniority, references from comparable engagements |
| **Commercial Terms** | 15 pts | Price competitiveness, payment milestone structure, value for money relative to proposed scope |
| **Delivery Plan & Risk Management** | 10 pts | Realism of the phased timeline, quality of risk identification and mitigation plan, contingency approach |

Vendors scoring below 50 total points will not be invited to the presentation
round. The company reserves the right to negotiate final scope and price with
the top-ranked vendor before award. Price alone will not be the deciding factor
— a vendor with a superior technical approach and team may be preferred over the
lowest-cost bid.

**Minimum qualification thresholds** (disqualifying if not met):
- At least one delivered AI-powered web application with a live reference
  customer.
- Demonstrated experience with LLM integration (OpenAI, Anthropic, or
  equivalent) in a production environment.
- Team must include at least one dedicated Solution Architect and one senior
  Frontend engineer for the duration of Phase 1.
- Willingness to work within the client's preferred cloud region (EU or US, to
  be confirmed at award).
