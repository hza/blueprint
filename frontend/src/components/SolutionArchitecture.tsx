import { useState } from 'react'

export function SolutionArchitecture({ subsection }: { subsection?: string }) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  const [diagramScale, setDiagramScale] = useState(70)
  const scaleStep = 10
  const scaleMin = 30
  const scaleMax = 100
  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">3. Solution Architecture</div>
            <div className="overview-banner-client">Meridian Software · Customer Facing Portal — RFP</div>
          </div>
          <span className="overview-badge overview-badge--ok">REVIEWED</span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Platform</span>
            <span className="overview-stat-value">AI-Powered Portal</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Cloud</span>
            <span className="overview-stat-value">AWS / GCP / Azure</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Integrations</span>
            <span className="overview-stat-value">5 systems</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Portal Uptime SLA</span>
            <span className="overview-stat-value overview-stat-score--ok">99.9%</span>
          </div>
        </div>
      </div>

      {show('3.1') && (<>
      {/* 3.1 Architecture Overview */}
      <div className="rfp-section-heading" id="3.1">Architecture Overview</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🏗</span>
            System Architecture — Layers
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Layer</th>
                <th>Technology</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Presentation</td>
                <td>React 18 + TypeScript · shadcn/ui or Ant Design</td>
                <td>WCAG 2.1 AA. Desktop-optimised (1280–2560 px). React Flow / Konva.js for diagrams. WebSockets for real-time collaboration. Bundle &lt; 500 KB gzipped.</td>
              </tr>
              <tr>
                <td className="overview-table-label">BFF / API Gateway</td>
                <td>FastAPI (Python) — OpenAPI 3.1</td>
                <td>BFF layer per RFP §4.5. Rate limiting: 100 req/min per session, 20 uploads/hour per user. OAuth 2.0 token validation. Request logging with trace IDs.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Application Services</td>
                <td>FastAPI microservices on Kubernetes (Helm)</td>
                <td>CQRS + Outbox Pattern. Event-driven pipeline via Kafka (or RabbitMQ / SQS). Independent workers for OCR, segmentation, anonymisation, AI analysis.</td>
              </tr>
              <tr>
                <td className="overview-table-label">AI / LLM Layer</td>
                <td>OpenAI GPT-4-class · Anthropic Claude · Azure OpenAI (swappable)</td>
                <td>Abstraction layer allows provider switching with no code change. RAG pipeline: 512-token chunks (10% overlap) embedded into Qdrant. All LLM outputs validated against JSON schemas. Costs tracked per project.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Data</td>
                <td>PostgreSQL 15+ · S3-compatible storage · Redis · Qdrant</td>
                <td>Column-level encryption for sensitive fields. Versioned migrations. 1,000 read queries/s, 200 writes/s. Backups daily, 30-day retention, point-in-time recovery.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Background Jobs</td>
                <td>Celery (Python) / BullMQ · job status persisted</td>
                <td>Auto-retry ×3 with exponential backoff. Workers scale horizontally when queue depth &gt; 5. Job cancellable before AI Analysis stage.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Infrastructure</td>
                <td>Terraform or Pulumi · Docker multi-stage builds</td>
                <td>Single `docker compose up` for local dev. Blue/green deployments with automatic rollback on health check failure. GitHub Actions or GitLab CI.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Observability</td>
                <td>OpenTelemetry · ELK stack · Prometheus + Grafana</td>
                <td>Structured JSON logs with trace IDs. Distributed tracing. LLM inputs/outputs logged with PII redacted. `/healthz` endpoint for all subsystems.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">⚡</span>
            Non-Functional Targets (RFP §4.4)
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">API Read Latency</td>
                <td><span className="overview-badge overview-badge--ok">&lt; 300 ms p95</span> — RFP requirement met. Achieved via Redis caching and read-path optimisation.</td>
              </tr>
              <tr>
                <td className="overview-table-label">RFP Analysis Time</td>
                <td>Standard 30-page RFP: complete within 120 s. Stages shown in real time: Uploaded → Queued → OCR → Segmentation → Anonymisation → AI Analysis → Complete.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Concurrent Users</td>
                <td>~100 concurrent users without degradation. ≥ 20 concurrent analysis jobs. System handles 2× users/projects within SLA without infrastructure reconfiguration.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Uptime</td>
                <td>Portal: 99.9%/month. AI pipeline: 99.5%. Graceful degradation: if AI service is down, upload and manual editing remain available within 30 s.</td>
              </tr>
              <tr>
                <td className="overview-table-label">RTO / RPO</td>
                <td>RTO: 1 hour. RPO: 15 minutes. Geo-redundant within chosen data region.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Data Scale</td>
                <td>Up to 5,000 projects and 500,000 artifacts. 1,000 read/s, 200 writes/s at data layer.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🔧</span>
            DevOps &amp; CI/CD Pipeline
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Source Control</td>
                <td>GitHub / GitLab. Trunk-based development. Meridian gets read access to repository throughout.</td>
              </tr>
              <tr>
                <td className="overview-table-label">CI Pipeline</td>
                <td>Lint → Unit Tests (≥ 80% coverage gate) → Integration Tests → SAST → Dependency scan (hard block on critical CVEs) → Container scan → Staging deploy. Runs on every PR merge.</td>
              </tr>
              <tr>
                <td className="overview-table-label">CD Pipeline</td>
                <td>Blue/green deployments to production. Automatic rollback on failed health checks. Feature flags for gradual rollout of new AI models and analysis capabilities.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Environments</td>
                <td>Dev / Test / Staging / Production — all provisioned via IaC with identical configuration.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Release Cadence</td>
                <td>Production-ready build every sprint. Canary or blue/green releases. Hot-fix within 24 hours for P1 security vulnerabilities.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('3.2') && (<>
      {/* 3.2 Functional Scope */}
      <div className="rfp-section-heading" id="3.2">Functional Scope</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📦</span>
            Modules in Scope
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Module</th>
                <th>Key Features</th>
                <th>Delivery Phase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Document Ingestion</td>
                <td>PDF, DOCX, MD, TXT upload (up to 200 MB); OCR (≥ 95% accuracy); semantic segmentation; PII anonymisation worker; processing pipeline with real-time status; versioning</td>
                <td>Phase 1</td>
              </tr>
              <tr>
                <td className="overview-table-label">AI Analysis Engine</td>
                <td>Requirement extraction (FR, NFR, BR, TC, CR) with confidence scores; MoSCoW prioritisation; gap alerts; RAG pipeline (Qdrant); JSON schema validation of all LLM outputs</td>
                <td>Phase 1</td>
              </tr>
              <tr>
                <td className="overview-table-label">Feature List &amp; Estimation</td>
                <td>Epic → Feature → User Story → Acceptance Criteria (Gherkin); effort estimates by role (Frontend, Backend, QA, UX, DevOps, BA, PM); confidence interval; real-time recalculation</td>
                <td>Phase 1</td>
              </tr>
              <tr>
                <td className="overview-table-label">Architecture Views</td>
                <td>C4 Level 1 (Context) and Level 2 (Application) views; rendered diagrams + editable PlantUML/Mermaid source; exportable PNG, SVG, Confluence page</td>
                <td>Phase 1</td>
              </tr>
              <tr>
                <td className="overview-table-label">Risk Register &amp; Go/No-Go</td>
                <td>AI-generated risk register (Technical, Financial, Timeline, Scope, Compliance, People); colour-coded heatmap; Go/No-Go Advisor with match %; RFP Health Score (0–100)</td>
                <td>Phase 1</td>
              </tr>
              <tr>
                <td className="overview-table-label">Client Portal &amp; Collaboration</td>
                <td>Role-based access (Admin, Sales Manager, SA, BA, Estimator, Account Manager, Customer); threaded comments; approval workflow (Draft → In Review → Approved → Sent); PDF/DOCX/XLSX export</td>
                <td>Phase 1–2</td>
              </tr>
              <tr>
                <td className="overview-table-label">Real-Time Collaboration</td>
                <td>WebSockets; concurrent editing on canvases and feature lists; per-project live activity feed; full audit trail with diff view and one-click rollback</td>
                <td>Phase 2</td>
              </tr>
              <tr>
                <td className="overview-table-label">Platform &amp; Ecosystem</td>
                <td>SSO (SAML); Salesforce CRM webhooks; analytics dashboard; LLM provider switching; self-hosted LLM (Ollama); Confluence export; API key management</td>
                <td>Phase 3</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✗</span>
            Out of Scope
          </div>
          <ul className="overview-checklist">
            <li className="overview-check overview-check--fail">
              <span className="overview-check-icon" />
              <strong>Automated proposal writing</strong> — Deferred to Phase 2 per RFP Section 3.
            </li>
            <li className="overview-check overview-check--fail">
              <span className="overview-check-icon" />
              <strong>Contract generation</strong> — Deferred to Phase 2 per RFP Section 3.
            </li>
            <li className="overview-check overview-check--fail">
              <span className="overview-check-icon" />
              <strong>Audio/video calling integration</strong> — Deferred to Phase 2 per RFP Section 3.
            </li>
            <li className="overview-check overview-check--fail">
              <span className="overview-check-icon" />
              <strong>Post-deal project management</strong> — Deferred to Phase 3 per RFP Section 3.
            </li>
          </ul>
        </div>
      </div>

      </>)}

      {show('3.3') && (<>
      {/* 3.3 Roles & Integrations */}
      <div className="rfp-section-heading" id="3.3">Roles &amp; Integrations</div>

      {/* C4 Level 1 — Context Diagram */}
      <div className="overview-grid">
        <div className="overview-card" style={{gridColumn: '1 / -1'}}>
          <div className="overview-card-header">
            <span className="overview-card-icon">🗺</span>
            C4 Level 1 — System Context
          </div>
          <div style={{position: 'relative', overflowX: 'auto', padding: '1rem 0', display: 'flex', justifyContent: 'center'}}>
            <div style={{position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--card-bg, #fff)', border: '1px solid var(--border, #e5e7eb)', borderRadius: '6px', padding: '2px 6px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', zIndex: 1}}>
              <button onClick={() => setDiagramScale(s => Math.max(scaleMin, s - scaleStep))} style={{border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '2px 4px', color: 'var(--text, #374151)'}}>−</button>
              <span style={{fontSize: '0.75rem', minWidth: '2.5rem', textAlign: 'center', color: 'var(--text-secondary, #6b7280)'}}>{diagramScale}%</span>
              <button onClick={() => setDiagramScale(s => Math.min(scaleMax, s + scaleStep))} style={{border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '2px 4px', color: 'var(--text, #374151)'}}>+</button>
            </div>
            <svg viewBox="0 0 900 480" style={{width: `${diagramScale}%`, minWidth: 320, fontFamily: 'inherit'}} aria-label="C4 Level 1 System Context diagram for AI-Powered Customer Facing Portal">
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#6b7280"/>
                </marker>
              </defs>
              {/* Central system box */}
              <rect x="320" y="175" width="260" height="120" rx="6" fill="#1d4ed8" stroke="#1e40af" strokeWidth="2"/>
              <text x="450" y="220" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">AI-Powered Customer</text>
              <text x="450" y="236" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">Facing Portal</text>
              <text x="450" y="256" textAnchor="middle" fill="#bfdbfe" fontSize="10">[Software System]</text>
              <text x="450" y="272" textAnchor="middle" fill="#bfdbfe" fontSize="10">(React 18 · FastAPI · K8s · Qdrant)</text>

              {/* Internal users — left */}
              {/* Business Analyst */}
              <circle cx="80" cy="70" r="20" fill="none" stroke="#374151" strokeWidth="1.5"/>
              <line x1="80" y1="90" x2="80" y2="125" stroke="#374151" strokeWidth="1.5"/>
              <line x1="80" y1="105" x2="58" y2="118" stroke="#374151" strokeWidth="1.5"/>
              <line x1="80" y1="105" x2="102" y2="118" stroke="#374151" strokeWidth="1.5"/>
              <line x1="80" y1="125" x2="62" y2="148" stroke="#374151" strokeWidth="1.5"/>
              <line x1="80" y1="125" x2="98" y2="148" stroke="#374151" strokeWidth="1.5"/>
              <text x="80" y="165" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">Business Analyst</text>
              <text x="80" y="178" textAnchor="middle" fill="#6b7280" fontSize="10">[Employee]</text>
              <line x1="118" y1="115" x2="316" y2="220" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>
              <text x="195" y="158" textAnchor="middle" fill="#6b7280" fontSize="9">Upload RFP · Edit requirements</text>

              {/* Solution Architect */}
              <circle cx="80" cy="290" r="20" fill="none" stroke="#374151" strokeWidth="1.5"/>
              <line x1="80" y1="310" x2="80" y2="345" stroke="#374151" strokeWidth="1.5"/>
              <line x1="80" y1="325" x2="58" y2="338" stroke="#374151" strokeWidth="1.5"/>
              <line x1="80" y1="325" x2="102" y2="338" stroke="#374151" strokeWidth="1.5"/>
              <line x1="80" y1="345" x2="62" y2="368" stroke="#374151" strokeWidth="1.5"/>
              <line x1="80" y1="345" x2="98" y2="368" stroke="#374151" strokeWidth="1.5"/>
              <text x="80" y="385" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">Solution Architect</text>
              <text x="80" y="398" textAnchor="middle" fill="#6b7280" fontSize="10">[Employee]</text>
              <line x1="118" y1="328" x2="316" y2="268" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>
              <text x="195" y="308" textAnchor="middle" fill="#6b7280" fontSize="9">Edit architecture views</text>

              {/* Sales Manager */}
              <circle cx="80" cy="430" r="20" fill="none" stroke="#374151" strokeWidth="1.5"/>
              <line x1="80" y1="450" x2="80" y2="462" stroke="#374151" strokeWidth="1.5"/>
              <text x="80" y="475" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">Sales Manager</text>
              <text x="80" y="488" textAnchor="middle" fill="#6b7280" fontSize="10">[Employee]</text>
              <line x1="112" y1="440" x2="316" y2="288" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>

              {/* Customer — right */}
              <circle cx="820" cy="240" r="20" fill="none" stroke="#374151" strokeWidth="1.5"/>
              <line x1="820" y1="260" x2="820" y2="295" stroke="#374151" strokeWidth="1.5"/>
              <line x1="820" y1="275" x2="798" y2="288" stroke="#374151" strokeWidth="1.5"/>
              <line x1="820" y1="275" x2="842" y2="288" stroke="#374151" strokeWidth="1.5"/>
              <line x1="820" y1="295" x2="802" y2="318" stroke="#374151" strokeWidth="1.5"/>
              <line x1="820" y1="295" x2="838" y2="318" stroke="#374151" strokeWidth="1.5"/>
              <text x="820" y="335" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">Customer</text>
              <text x="820" y="348" textAnchor="middle" fill="#6b7280" fontSize="10">[External Client]</text>
              <line x1="784" y1="270" x2="584" y2="248" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>
              <text x="700" y="252" textAnchor="middle" fill="#6b7280" fontSize="9">View deliverables · Comment · Approve</text>

              {/* External systems row */}
              {/* LLM Providers */}
              <rect x="20" y="405" width="145" height="55" rx="4" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5"/>
              <text x="92" y="426" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">LLM Providers</text>
              <text x="92" y="441" textAnchor="middle" fill="#6b7280" fontSize="9">[External System]</text>
              <text x="92" y="453" textAnchor="middle" fill="#6b7280" fontSize="9">OpenAI · Anthropic · Azure OAI</text>
              <line x1="165" y1="432" x2="318" y2="295" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>

              {/* SSO */}
              <rect x="195" y="405" width="145" height="55" rx="4" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5"/>
              <text x="267" y="426" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">SSO Providers</text>
              <text x="267" y="441" textAnchor="middle" fill="#6b7280" fontSize="9">[External System]</text>
              <text x="267" y="453" textAnchor="middle" fill="#6b7280" fontSize="9">Google WS · Azure AD · Okta · SAML</text>
              <line x1="340" y1="405" x2="390" y2="295" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>

              {/* Salesforce */}
              <rect x="370" y="405" width="145" height="55" rx="4" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5"/>
              <text x="442" y="426" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">Salesforce</text>
              <text x="442" y="441" textAnchor="middle" fill="#6b7280" fontSize="9">[External System]</text>
              <text x="442" y="453" textAnchor="middle" fill="#6b7280" fontSize="9">CRM webhooks (Phase 3)</text>
              <line x1="442" y1="405" x2="445" y2="295" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>

              {/* Confluence */}
              <rect x="545" y="405" width="145" height="55" rx="4" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5"/>
              <text x="617" y="426" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">Confluence</text>
              <text x="617" y="441" textAnchor="middle" fill="#6b7280" fontSize="9">[External System]</text>
              <text x="617" y="453" textAnchor="middle" fill="#6b7280" fontSize="9">Page publishing (Phase 2)</text>
              <line x1="590" y1="405" x2="530" y2="295" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>

              {/* Slack / Teams */}
              <rect x="720" y="405" width="145" height="55" rx="4" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5"/>
              <text x="792" y="426" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">Slack / Teams</text>
              <text x="792" y="441" textAnchor="middle" fill="#6b7280" fontSize="9">[External System]</text>
              <text x="792" y="453" textAnchor="middle" fill="#6b7280" fontSize="9">Incoming webhooks</text>
              <line x1="760" y1="405" x2="582" y2="295" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>
            </svg>
          </div>
          <p style={{fontSize: '0.8rem', color: 'var(--text-secondary, #6b7280)', marginTop: '0.5rem'}}>
            C4 Model — Level 1 (System Context). Dashed lines show data flows between users, the portal, and external systems.
          </p>
        </div>
      </div>

      {/* Roles table */}
      <div className="overview-grid">
        <div className="overview-card" style={{gridColumn: '1 / -1'}}>
          <div className="overview-card-header">
            <span className="overview-card-icon">👥</span>
            User Roles &amp; Access Model (RFP §5)
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Who holds it</th>
                <th>Key permissions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Admin</td>
                <td>System administrator</td>
                <td>All system permissions; user management; LLM configuration; audit log; view all projects and analytics</td>
              </tr>
              <tr>
                <td className="overview-table-label">Sales Manager</td>
                <td>Pre-sales pipeline owner</td>
                <td>View all projects; create/archive projects; assign employees; send deliverables to client; access analytics</td>
              </tr>
              <tr>
                <td className="overview-table-label">Solution Architect</td>
                <td>Architecture analysis lead</td>
                <td>Edit all artifacts on assigned projects; approve architectural deliverables</td>
              </tr>
              <tr>
                <td className="overview-table-label">Business Analyst</td>
                <td>Primary analyst</td>
                <td>Full edit on requirements, canvases, feature list, risk register on assigned projects; submit deliverables for review</td>
              </tr>
              <tr>
                <td className="overview-table-label">Estimator</td>
                <td>Effort estimation owner</td>
                <td>Edit feature list estimates on assigned projects; read-only on all other artifacts</td>
              </tr>
              <tr>
                <td className="overview-table-label">Account Manager</td>
                <td>Client relationship owner</td>
                <td>Read/comment on all artifacts; invite and manage Customer access; send deliverables to client</td>
              </tr>
              <tr>
                <td className="overview-table-label">Customer</td>
                <td>External client</td>
                <td>View shared deliverables; threaded comments; approve or request revision; download exports granted by Account Manager</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🔗</span>
            Integration Map (RFP §4.5)
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>System</th>
                <th>Direction</th>
                <th>Method</th>
                <th>Phase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">OpenAI / Anthropic / Azure OpenAI</td>
                <td>→ Outbound</td>
                <td>REST API via LLM abstraction layer; PII anonymised before dispatch</td>
                <td><span className="overview-badge overview-badge--ok">Phase 1</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">SSO (Google WS / Azure AD / Okta / SAML)</td>
                <td>↔ Bi-directional</td>
                <td>OAuth 2.0 / SAML 2.0</td>
                <td><span className="overview-badge overview-badge--warn">Phase 3</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">MS Teams</td>
                <td>→ Outbound</td>
                <td>Incoming webhook</td>
                <td><span className="overview-badge overview-badge--ok">Phase 1</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Confluence</td>
                <td>→ Outbound</td>
                <td>REST API — page create/update</td>
                <td><span className="overview-badge overview-badge--warn">Phase 2</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Salesforce</td>
                <td>↔ Bi-directional</td>
                <td>REST API + webhooks; creates/updates projects within 60 s</td>
                <td><span className="overview-badge overview-badge--warn">Phase 3</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Slack</td>
                <td>→ Outbound</td>
                <td>Incoming webhook</td>
                <td><span className="overview-badge overview-badge--warn">Phase 2</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('3.4') && (<>
      {/* 3.4 Non-Functional Requirements */}
      <div className="rfp-section-heading" id="3.4">Non-Functional Requirements</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📊</span>
            NFR Compliance Matrix (RFP §4.4)
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>RFP Requirement</th>
                <th>What You're Guaranteed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">API Latency</td>
                <td>API reads: &lt; 300 ms at p95</td>
                <td>Redis caching on read paths. Validated by load test at Phase 1 gate.</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Analysis Time</td>
                <td>Standard 30-page RFP: complete within 120 s</td>
                <td>Parallel worker pipeline with horizontal autoscaling when queue depth &gt; 5.</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Availability</td>
                <td>Portal: 99.9%/month · AI pipeline: 99.5%</td>
                <td>Kubernetes self-healing. Blue/green deploy. Graceful degradation if AI service fails.</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Scalability</td>
                <td>~100 concurrent users; ≥ 20 concurrent analysis jobs</td>
                <td>Horizontal pod autoscaling. AI workers independent of web tier.</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Accessibility</td>
                <td>WCAG 2.1 Level AA; full keyboard navigation</td>
                <td>axe-core automated checks in CI. Manual screen-reader testing per phase.</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Security</td>
                <td>TLS 1.3 · AES-256 · GDPR · SOC 2 Type II target · PII anonymisation</td>
                <td>Dedicated anonymisation worker. CSP headers. Dependency scanning in CI (hard block on critical CVEs). Auth tokens expire after 8 h inactivity.</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">i18n</td>
                <td>English, German, French, Spanish, Ukrainian; locale-formatted dates/numbers</td>
                <td>All strings externalised to locale files. Date/time/currency formatted per locale in UI and exports.</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('3.5') && (<>
      {/* 3.5 Acceptance Criteria */}
      <div className="rfp-section-heading" id="3.5">Acceptance Criteria</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✅</span>
            Phase Acceptance Gates
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Phase</th>
                <th>Deliverables</th>
                <th>Acceptance Criterion</th>
                <th>Target Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Phase 1 — MVP (12 wks)</td>
                <td>Document ingestion, PII anonymisation, AI analysis, feature list, C4 views, risk register, Go/No-Go, RFP Health Score, basic client portal, MS Teams notifications, PDF/DOCX export</td>
                <td>≥ 95% of agreed user stories accepted in UAT; zero open P1/P2 defects; load test confirms API p95 &lt; 300 ms at 100 concurrent users</td>
                <td>~2026-10-27</td>
              </tr>
              <tr>
                <td className="overview-table-label">Phase 2 — Enhanced Analytics (+8 wks)</td>
                <td>C4 Level 3 views, real-time collaboration (WebSockets), approval workflow, Confluence export, email notifications, full audit trail UI</td>
                <td>WebSocket latency &lt; 500 ms for collaboration updates; approval workflow passes end-to-end UAT; Confluence push verified against a live instance</td>
                <td>~2026-12-22</td>
              </tr>
              <tr>
                <td className="overview-table-label">Phase 3 — Platform &amp; Ecosystem (+8 wks)</td>
                <td>SSO (SAML), Salesforce CRM webhooks, analytics dashboard, LLM provider switching, Ollama self-hosted option, API key management</td>
                <td>SSO login verified with at least one provider (Google Workspace or Azure AD); Salesforce webhook creates project within 60 s; LLM provider switch tested with no functionality regression</td>
                <td>~2027-02-16</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📋</span>
            System-Wide Acceptance Conditions
          </div>
          <ul className="overview-checklist">
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Security sign-off</strong> — OWASP Top 10 scan completed per sprint. Dependency scan with hard block on critical CVEs in CI. SOC 2 Type II certification path documented.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>GDPR compliance</strong> — Right to erasure flow tested: client data purged within 72 hours across all artifacts and audit log. Purge completion recorded. DPA signed before data processing begins.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>PII anonymisation</strong> — Verified that no PII reaches external LLM. Placeholder count recorded in audit log per document version. Reversible mapping never leaves company infrastructure.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Test coverage</strong> — ≥ 80% unit test coverage for all business logic. Integration tests green on every merge.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Documentation handover</strong> — API reference (OpenAPI 3.1), runbooks, architecture decision records, and operations manual delivered and acknowledged before each phase sign-off.
            </li>
          </ul>
        </div>
      </div>

      </>)}

    </div>
  )
}
