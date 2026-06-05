export function TechnicalSolution() {
  return (
    <div className="overview">
      {/* Architecture Banner */}
      <div className="overview-banner">
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Solution Score</span>
            <span className="overview-stat-value overview-stat-score--ok">3 phases · 28 weeks</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Stack</span>
            <span className="overview-stat-value">Cloud-native · Microservices · API-first</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Deployment</span>
            <span className="overview-stat-value">Kubernetes · AWS / GCP / Azure</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Region</span>
            <span className="overview-stat-value">EU or US (at award)</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Open Actions</span>
            <span className="overview-stat-value overview-val--warn">5</span>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        {/* System Components & Interactions — Architecture Diagram */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">⬡</span>
            System Components &amp; Interactions
          </div>
          <svg viewBox="0 0 600 320" style={{ width: '100%', height: 'auto' }} aria-label="Architecture component diagram">
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#9CA3AF" />
              </marker>
            </defs>

            {/* Connections */}
            {/* React SPA → FastAPI Gateway (horizontal right) */}
            <line x1="140" y1="50" x2="240" y2="50" stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#arrow)" />
            {/* FastAPI Gateway → Auth Service (horizontal right) */}
            <line x1="360" y1="50" x2="460" y2="50" stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#arrow)" />
            {/* FastAPI Gateway → Document Service (diagonal down-left) */}
            <line x1="270" y1="70" x2="100" y2="130" stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#arrow)" />
            {/* FastAPI Gateway → AI Pipeline (vertical down) */}
            <line x1="300" y1="70" x2="300" y2="130" stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#arrow)" />
            {/* AI Pipeline → Qdrant Vector DB (vertical down) */}
            <line x1="300" y1="170" x2="300" y2="230" stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#arrow)" />
            {/* Document Service → PostgreSQL (vertical down) */}
            <line x1="80" y1="170" x2="80" y2="230" stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#arrow)" />
            {/* Document Service → S3 Storage (diagonal down-right, long) */}
            <line x1="140" y1="160" x2="470" y2="230" stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#arrow)" />
            {/* AI Pipeline → Notification Svc (horizontal right) */}
            <line x1="360" y1="150" x2="460" y2="150" stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#arrow)" />

            {/* Row 1 */}
            {/* React SPA */}
            <rect x="20" y="30" width="120" height="40" rx="6" fill="#DBEAFE" stroke="#93C5FD" />
            <text x="80" y="55" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1E40AF">React SPA</text>

            {/* FastAPI Gateway */}
            <rect x="240" y="30" width="120" height="40" rx="6" fill="#F3E8FF" stroke="#C4B5FD" />
            <text x="300" y="55" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5B21B6">FastAPI Gateway</text>

            {/* Auth Service */}
            <rect x="460" y="30" width="120" height="40" rx="6" fill="#D1FAE5" stroke="#6EE7B7" />
            <text x="520" y="55" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065F46">Auth Service</text>

            {/* Row 2 */}
            {/* Document Service */}
            <rect x="20" y="130" width="120" height="40" rx="6" fill="#FEF3C7" stroke="#FCD34D" />
            <text x="80" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400E">Document Service</text>

            {/* AI Pipeline */}
            <rect x="240" y="130" width="120" height="40" rx="6" fill="#FEE2E2" stroke="#FCA5A5" />
            <text x="300" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991B1B">AI Pipeline</text>

            {/* Notification Svc */}
            <rect x="460" y="130" width="120" height="40" rx="6" fill="#F3F4F6" stroke="#D1D5DB" />
            <text x="520" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="#374151">Notification Svc</text>

            {/* Row 3 */}
            {/* PostgreSQL */}
            <rect x="20" y="230" width="120" height="40" rx="6" fill="#E5E7EB" stroke="#9CA3AF" />
            <text x="80" y="255" textAnchor="middle" fontSize="11" fontWeight="600" fill="#374151">PostgreSQL</text>

            {/* Qdrant Vector DB */}
            <rect x="240" y="230" width="120" height="40" rx="6" fill="#E5E7EB" stroke="#9CA3AF" />
            <text x="300" y="255" textAnchor="middle" fontSize="11" fontWeight="600" fill="#374151">Qdrant Vector DB</text>

            {/* S3 Storage */}
            <rect x="460" y="230" width="120" height="40" rx="6" fill="#E5E7EB" stroke="#9CA3AF" />
            <text x="520" y="255" textAnchor="middle" fontSize="11" fontWeight="600" fill="#374151">S3 Storage</text>
          </svg>
        </div>

        {/* Proposed Architecture */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">⬡</span>
            Proposed Architecture
            <span className="overview-badge overview-badge--ok">Approved</span>
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Architecture Style</td>
                <td className="overview-table-value overview-val--strong">Microservices + Event-driven</td>
              </tr>
              <tr>
                <td className="overview-table-label">Frontend</td>
                <td className="overview-table-value">React 18+ or Next.js 14+ · TypeScript · strict mode</td>
              </tr>
              <tr>
                <td className="overview-table-label">Backend API</td>
                <td className="overview-table-value">Python FastAPI · REST / OpenAPI 3.1</td>
              </tr>
              <tr>
                <td className="overview-table-label">Data Layer</td>
                <td className="overview-table-value">PostgreSQL 15+ · Redis · S3-compatible object store</td>
              </tr>
              <tr>
                <td className="overview-table-label">Messaging</td>
                <td className="overview-table-value">Apache Kafka · Schema Registry</td>
              </tr>
              <tr>
                <td className="overview-table-label">Orchestration</td>
                <td className="overview-table-value">Kubernetes 1.30 · Helm · ArgoCD</td>
              </tr>
              <tr>
                <td className="overview-table-label">Observability</td>
                <td className="overview-table-value">OpenTelemetry · Prometheus · Grafana · Loki</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* RFP Requirement Coverage */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✓</span>
            RFP Technical Requirement Coverage
          </div>
          <ul className="overview-checklist">
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <span>High Availability — Portal uptime 99.9%/month, AI pipeline 99.5%. RTO: 1 hour, RPO: 15 minutes (RFP §4.4). Graceful degradation within 30 s if AI service fails.</span>
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <span>Scalability — Handles ≥ 20 concurrent analysis jobs and ~100 concurrent users. AI workers scale horizontally when queue depth &gt; 5. System handles 2× users within SLA without reconfiguration (RFP §4.4).</span>
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <span>Data encryption — AES-256 at rest, TLS 1.3 in transit. Key management via AWS KMS.</span>
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <span>Audit logging — Immutable audit log: all logins, uploads, edits, exports, approvals, deletions. Queryable by user, event type, project, date range. Exportable for compliance (RFP §4.3).</span>
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <span>PII anonymisation — Dedicated worker replaces PII with typed placeholders before any content reaches external LLM. Reversible mapping never leaves company infrastructure (RFP §4.5).</span>
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <span>RAG pipeline — 512-token chunks (10% overlap), embedded into Qdrant, retrieved at analysis time (RFP §4.5). All LLM outputs validated against JSON schemas.</span>
            </li>
            <li className="overview-check overview-check--warn">
              <span className="overview-check-icon" />
              <span>SSO / SAML 2.0 — Scoped for Phase 3. OAuth 2.0 (Google Workspace, Azure AD, Okta) and SAML 2.0 supported via abstraction layer (RFP §4.5).</span>
            </li>
          </ul>
        </div>

        {/* Security & Compliance */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🔒</span>
            Security &amp; Compliance Posture
            <span className="overview-badge overview-badge--warn">Review Required</span>
          </div>
          <ul className="overview-risk-list">
            <li className="overview-risk overview-risk--ok">
              <span className="overview-risk-level">MET</span>
              <div>
                <strong>SOC 2 Type II certified</strong> — The RFP targets SOC 2 Type II (not ISO 27001). Certificate available. GDPR compliance implemented: right to erasure, data portability, consent management, DPAs (RFP §4.4).
              </div>
            </li>
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">RISK</span>
              <div>
                <strong>Dependency scanning active in CI</strong> — Hard block on critical CVEs in every pipeline run (RFP §4.4). Medium CVEs reviewed per release; none block deployment unless escalated to critical.
              </div>
            </li>
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">RISK</span>
              <div>
                <strong>Pre-go-live penetration test</strong> — Full-scope pen test by accredited third party before Phase 1 go-live. OWASP ZAP DAST runs every sprint throughout delivery (RFP §4.4).
              </div>
            </li>
            <li className="overview-risk overview-risk--low">
              <span className="overview-risk-level">NOTE</span>
              <div>
                GDPR data residency controls implemented. Data processing agreement template ready for client legal review.
              </div>
            </li>
          </ul>
        </div>

        {/* Delivery Plan */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">⏱</span>
            Delivery Plan
          </div>
          <ul className="overview-timeline">
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Weeks 1–12 · 2026-08-04 → 2026-10-27</span>
                <span className="overview-tl-event"><strong>Phase 1 — MVP:</strong> User management, document ingestion + OCR, PII anonymisation worker, AI analysis (RAG/Qdrant), feature list + estimates, C4 Context &amp; Application views, Risk Register, Go/No-Go Advisor, RFP Health Score, basic client portal, PDF/DOCX export, MS Teams notifications.</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Weeks 13–20 · 2026-10-28 → 2026-12-22</span>
                <span className="overview-tl-event"><strong>Phase 2 — Enhanced Analytics:</strong> Real-time collaboration (WebSockets), approval workflow engine, C4 Level 3 views, Confluence export, email notifications, full audit trail UI.</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Weeks 21–28 · 2026-12-23 → 2027-02-16</span>
                <span className="overview-tl-event"><strong>Phase 3 — Platform &amp; Ecosystem:</strong> SSO (SAML), Salesforce CRM webhooks, analytics dashboard, LLM provider switching + prompt A/B testing, Ollama self-hosted LLM, API key management.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Team */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">👤</span>
            Proposed Delivery Team
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Name / Status</th>
                <th>FTE</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Engagement Manager</td>
                <td>Sarah Chen</td>
                <td>0.5</td>
                <td className="overview-val--ok">Confirmed</td>
              </tr>
              <tr>
                <td className="overview-table-label">Solution Architect</td>
                <td>Mark Okonkwo</td>
                <td>1.0</td>
                <td className="overview-val--ok">Confirmed — meets RFP min. threshold</td>
              </tr>
              <tr>
                <td className="overview-table-label">Senior Frontend Engineer</td>
                <td>Priya Ramaswamy</td>
                <td>1.0</td>
                <td className="overview-val--ok">Confirmed — meets RFP min. threshold</td>
              </tr>
              <tr>
                <td className="overview-table-label">AI/ML Engineer</td>
                <td>Named in Annex D</td>
                <td>1.0</td>
                <td className="overview-val--ok">Confirmed — RAG, Qdrant, LLM abstraction</td>
              </tr>
              <tr>
                <td className="overview-table-label">Senior Backend Engineers (×2)</td>
                <td>Named in Annex D</td>
                <td>1.0</td>
                <td className="overview-val--ok">Confirmed</td>
              </tr>
              <tr>
                <td className="overview-table-label">QA Lead</td>
                <td>James Obi</td>
                <td>1.0</td>
                <td className="overview-val--ok">Confirmed</td>
              </tr>
              <tr>
                <td className="overview-table-label">DevOps / Cloud Engineer</td>
                <td>Named in Annex D</td>
                <td>1.0</td>
                <td className="overview-val--ok">Confirmed</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Open Technical Actions */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">→</span>
            Open Technical Actions
            <span className="overview-badge overview-badge--danger">3 Blocking</span>
          </div>
          <ul className="overview-actions">
            <li className="overview-action overview-action--urgent">
              <span className="overview-action-tag">BLOCKING</span>
              <div>
                <strong>Confirm LLM provider with Meridian</strong> — Proposal assumes Anthropic Claude Sonnet + GPT-4o via abstraction layer. Confirm preference before kick-off so prompt tuning begins on the right provider (RFP §4.5 allows OpenAI, Anthropic, or Azure OpenAI).
              </div>
            </li>
            <li className="overview-action overview-action--urgent">
              <span className="overview-action-tag">BLOCKING</span>
              <div>
                <strong>Confirm cloud region (EU or US)</strong> — Infrastructure provisioning and GDPR DPA drafting cannot start until the single data region is chosen (RFP §4.4, §9). Confirmed at contract award.
              </div>
            </li>
            <li className="overview-action overview-action--urgent">
              <span className="overview-action-tag">BLOCKING</span>
              <div>
                <strong>Validate PII anonymisation accuracy before Phase 1 UAT</strong> — NER model must achieve ≥ 99% recall on standard PII classes. Test against a representative sample of Meridian RFP documents before any client data enters the pipeline.
              </div>
            </li>
            <li className="overview-action overview-action--high">
              <span className="overview-action-tag">HIGH</span>
              <div>
                <strong>Qdrant vector DB sizing</strong> — RFP targets up to 5,000 projects and 500,000 artifacts (§4.4). Size Qdrant cluster and define index strategy (512-token chunks, 10% overlap) before Phase 1 infrastructure provisioning.
              </div>
            </li>
            <li className="overview-action overview-action--high">
              <span className="overview-action-tag">HIGH</span>
              <div>
                <strong>SSO provider sandbox credentials</strong> — Needed from Meridian by Phase 1 week 4 to start OAuth 2.0 / SAML 2.0 integration work (Phase 3 deliverable, but integration design starts Phase 1).
              </div>
            </li>
          </ul>
        </div>

        {/* Action Priority Matrix */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">⊞</span>
            Action Priority Matrix
          </div>
          <svg viewBox="0 0 340 280" style={{ width: '100%', height: 'auto' }} aria-label="Action priority matrix">
            {/* Quadrant backgrounds */}
            {/* Top-left: Plan */}
            <rect x="20" y="0" width="150" height="140" fill="#F3F4F6" opacity="0.6" />
            {/* Top-right: Do First */}
            <rect x="170" y="0" width="170" height="140" fill="#FEF2F2" opacity="0.4" />
            {/* Bottom-left: Monitor */}
            <rect x="20" y="140" width="150" height="120" fill="#F3F4F6" opacity="0.4" />
            {/* Bottom-right: Schedule */}
            <rect x="170" y="140" width="170" height="120" fill="#FFFBEB" opacity="0.4" />

            {/* Quadrant divider lines */}
            <line x1="170" y1="0" x2="170" y2="260" stroke="#D1D5DB" strokeWidth="1" />
            <line x1="20" y1="140" x2="340" y2="140" stroke="#D1D5DB" strokeWidth="1" />

            {/* Axis border */}
            <rect x="20" y="0" width="320" height="260" fill="none" stroke="#E5E7EB" strokeWidth="1" />

            {/* Quadrant labels */}
            <text x="85" y="50" textAnchor="middle" fontSize="11" fill="#9CA3AF" fontWeight="500">Plan</text>
            <text x="255" y="50" textAnchor="middle" fontSize="11" fill="#EF4444" fontWeight="700">Do First</text>
            <text x="85" y="230" textAnchor="middle" fontSize="11" fill="#9CA3AF" fontWeight="500">Monitor</text>
            <text x="255" y="230" textAnchor="middle" fontSize="11" fill="#D97706" fontWeight="500">Schedule</text>

            {/* Axis labels */}
            <text x="20" y="275" textAnchor="start" fontSize="9" fill="#9CA3AF">Lower Urgency</text>
            <text x="340" y="275" textAnchor="end" fontSize="9" fill="#9CA3AF">Higher Urgency</text>
            {/* Y-axis labels — rotated */}
            <text x="10" y="260" textAnchor="middle" fontSize="9" fill="#9CA3AF" transform="rotate(-90, 10, 140)">Higher Impact</text>

            {/* Action dots
                urgency 0→1 maps to x: 20→320
                impact 0→1 maps to y: 260→0  (inverted)
            */}

            {/* 1. Pen Test Schedule (urgency=0.8, impact=0.9, BLOCKING=#EF4444) */}
            {/* x = 20 + 0.8*300 = 260, y = 260 - 0.9*260 = 26 */}
            <circle cx="260" cy="26" r="6" fill="#EF4444" />
            <text x="268" y="30" fontSize="9" fill="#374151">Pen Test Schedule</text>

            {/* 2. LLM Provider Decision (urgency=0.85, impact=0.85, BLOCKING=#EF4444) */}
            {/* x = 20 + 0.85*300 = 275, y = 260 - 0.85*260 = 39 */}
            <circle cx="275" cy="50" r="6" fill="#EF4444" />
            <text x="215" y="62" fontSize="9" fill="#374151">LLM Provider Decision</text>

            {/* 3. SSO Sandbox Access (urgency=0.7, impact=0.75, HIGH=#F59E0B) */}
            {/* x = 20 + 0.7*300 = 230, y = 260 - 0.75*260 = 65 */}
            <circle cx="230" cy="65" r="6" fill="#F59E0B" />
            <text x="238" y="69" fontSize="9" fill="#374151">SSO Sandbox Access</text>

            {/* 4. Cloud Region Confirm (urgency=0.55, impact=0.7, HIGH=#F59E0B) */}
            {/* x = 20 + 0.55*300 = 185, y = 260 - 0.7*260 = 78 */}
            <circle cx="185" cy="78" r="6" fill="#F59E0B" />
            <text x="193" y="82" fontSize="9" fill="#374151">Cloud Region Confirm</text>

            {/* 5. Rate Card Approval (urgency=0.4, impact=0.5, MED=#3B82F6) */}
            {/* x = 20 + 0.4*300 = 140, y = 260 - 0.5*260 = 130 */}
            <circle cx="140" cy="130" r="6" fill="#3B82F6" />
            <text x="80" y="124" fontSize="9" fill="#374151">Rate Card Approval</text>

            {/* 6. Monitoring Tool Choice (urgency=0.3, impact=0.3, MED=#3B82F6) */}
            {/* x = 20 + 0.3*300 = 110, y = 260 - 0.3*260 = 182 */}
            <circle cx="110" cy="182" r="6" fill="#3B82F6" />
            <text x="118" y="186" fontSize="9" fill="#374151">Monitoring Tool Choice</text>
          </svg>
        </div>
      </div>
    </div>
  )
}
