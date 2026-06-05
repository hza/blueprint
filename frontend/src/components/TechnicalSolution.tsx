export function TechnicalSolution() {
  return (
    <div className="overview">
      {/* Architecture Banner */}
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">Technical Solution</div>
          </div>
          <span className="overview-badge overview-badge--ok overview-banner-status">SOLUTION READY</span>
        </div>
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
      </div>
    </div>
  )
}
