export function ExecutiveOverview({ subsection }: { subsection?: string }) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">1. Executive Overview</div>
            <div className="overview-banner-client">Meridian Software · AI-Powered Customer Facing Portal — RFP</div>
          </div>
          <span className="overview-badge overview-badge--ok">SUBMITTED</span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Delivery Partner</span>
            <span className="overview-stat-value">SCNSoft</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Phase 1 MVP</span>
            <span className="overview-stat-value overview-stat-score--warn">12 weeks</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Full Delivery</span>
            <span className="overview-stat-value">28 weeks</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Kick-off</span>
            <span className="overview-stat-value">2026-08-04</span>
          </div>
        </div>
      </div>

      {show('1.1') && (<>
      {/* 1.1 Proposal Summary */}
      <div className="rfp-section-heading" id="1.1">Proposal Summary</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">◎</span>
            Executive Statement
          </div>
          <div style={{ lineHeight: '1.7', fontSize: '14px', color: 'var(--fg)', padding: '14px' }}>
            <p style={{ marginBottom: '0.85rem' }}>
              Your pre-sales team currently spends <strong>8–40 hours parsing each RFP manually</strong>, analysis quality varies by analyst experience, and clients have no professional workspace to review deliverables. SCNSoft proposes an <strong>AI-Powered Customer Facing Portal</strong> that reduces proposal turnaround from 5–7 business days to under 24 hours, standardises output quality across your team, and gives every client a dedicated, access-controlled view of the deliverables prepared for them.
            </p>
            <p style={{ marginBottom: '0.85rem' }}>
              The portal ingests RFP documents (PDF, DOCX, MD, TXT), runs them through a multi-stage AI pipeline — OCR, semantic segmentation, PII anonymisation, LLM analysis — and produces a full suite of pre-sales artefacts: classified requirement lists, feature estimates, C4 architecture views, risk registers, a Go/No-Go recommendation, and an RFP Health Score. Clients review and approve deliverables through a branded portal with threaded comments and formal approval workflows.
            </p>
            <p style={{ marginBottom: 0 }}>
              SCNSoft has delivered AI-powered SaaS applications with LLM integration in production. Our proposed stack (React 18, FastAPI, PostgreSQL, Qdrant, Kafka, Kubernetes) maps directly to your technical requirements. We commit to the <strong>3-phase delivery schedule</strong>: Phase 1 MVP in 12 weeks, Enhanced Analytics in a further 8 weeks, and Platform &amp; Ecosystem in the final 8 weeks — 28 weeks total from kick-off on 2026-08-04.
            </p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✓</span>
            Proposal at a Glance
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Vendor</td>
                <td>SCNSoft</td>
              </tr>
              <tr>
                <td className="overview-table-label">Solution</td>
                <td>AI-Powered Customer Facing Portal (greenfield build)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Deployment Model</td>
                <td>Cloud-native, containerised — AWS, GCP, or Azure (region confirmed at award)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Implementation Model</td>
                <td>Fixed-price, 3-phase delivery · 28 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label">Submission Deadline</td>
                <td>2026-06-20</td>
              </tr>
              <tr>
                <td className="overview-table-label">Contract Signing Target</td>
                <td>2026-07-25</td>
              </tr>
              <tr>
                <td className="overview-table-label">Kick-off / Project Start</td>
                <td>2026-08-04</td>
              </tr>
              <tr>
                <td className="overview-table-label">Phase 1 MVP Go-Live</td>
                <td>~2026-10-27 (12 weeks from kick-off)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🏆</span>
            Why This Proposal Delivers for You
          </div>
          <ul className="overview-risk-list">
            <li className="overview-risk" style={{ borderLeft: '3px solid var(--accent, #2563EB)' }}>
              <span className="overview-risk-level" style={{ background: 'var(--accent, #2563EB)' }}>1</span>
              <div>
                <strong>AI automation reduces pre-sales effort by ≥ 70%</strong> — The portal's LLM pipeline (OpenAI GPT-4-class or Anthropic Claude, swappable via abstraction layer) turns an 8–40 hour manual RFP parse into an automated analysis completing in under 2 minutes for a standard 30-page document.
              </div>
            </li>
            <li className="overview-risk" style={{ borderLeft: '3px solid var(--accent, #2563EB)' }}>
              <span className="overview-risk-level" style={{ background: 'var(--accent, #2563EB)' }}>2</span>
              <div>
                <strong>Proposal turnaround: 5–7 days → &lt; 24 hours</strong> — Standardised AI analysis, editable feature estimates with real-time recalculation, and a one-click export to PDF/DOCX/Confluence mean your team can respond to RFPs the same day they arrive.
              </div>
            </li>
            <li className="overview-risk" style={{ borderLeft: '3px solid var(--accent, #2563EB)' }}>
              <span className="overview-risk-level" style={{ background: 'var(--accent, #2563EB)' }}>3</span>
              <div>
                <strong>PII-safe LLM pipeline</strong> — A dedicated anonymisation worker replaces PII with typed placeholders before any content reaches an external LLM. The mapping is stored encrypted and never leaves your infrastructure, satisfying GDPR requirements and LLM provider data-use restrictions.
              </div>
            </li>
            <li className="overview-risk" style={{ borderLeft: '3px solid var(--accent, #2563EB)' }}>
              <span className="overview-risk-level" style={{ background: 'var(--accent, #2563EB)' }}>4</span>
              <div>
                <strong>Production LLM experience</strong> — SCNSoft meets both mandatory qualification thresholds: at least one delivered AI-powered web application with a live reference customer, and demonstrated LLM integration (OpenAI / Anthropic) in production.
              </div>
            </li>
          </ul>
        </div>
      </div>

      </>)}


      {show('1.3') && (<>
      {/* 1.3 Key Assumptions */}
      <div className="rfp-section-heading" id="1.3">Key Assumptions</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📋</span>
            Proposal Assumptions
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Assumption</th>
                <th>Impact if Wrong</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A1</td>
                <td>Cloud data region (EU or US) is confirmed at contract award. Infrastructure design and GDPR DPA drafting begin immediately after.</td>
                <td>Region choice affects infrastructure cost estimates by up to 15%. Pricing assumes a standard cloud region; sovereign or restricted regions may carry a surcharge.</td>
              </tr>
              <tr>
                <td>A2</td>
                <td>LLM provider (OpenAI, Anthropic, or Azure OpenAI) is agreed before Phase 1 kick-off. The abstraction layer supports swapping providers post-launch with no code changes.</td>
                <td>Provider-specific prompt tuning is scoped per the agreed provider. Switching providers post-launch requires a regression test cycle (estimated 1 sprint).</td>
              </tr>
              <tr>
                <td>A3</td>
                <td>Meridian nominates a Product Owner with authority to accept deliverables and raise change requests within 2 business days of submission.</td>
                <td>Delayed sign-offs push UAT gates and can cascade into Phase 2 and 3 start dates.</td>
              </tr>
              <tr>
                <td>A4</td>
                <td>SSO provider (Google Workspace, Azure AD, Okta, or SAML 2.0) and Salesforce sandbox credentials are available for integration testing from Phase 1 week 4.</td>
                <td>Integration testing deferred to Phase 3 if credentials are not available, potentially delaying CRM webhook and SSO delivery.</td>
              </tr>
              <tr>
                <td>A5</td>
                <td>All change requests will receive written approval or rejection within 5 business days of submission.</td>
                <td>Pending CRs not actioned within this window will be treated as approved for planning purposes, per standard contract terms.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}

      {show('1.4') && (<>
      {/* 1.4 Clarifications */}
      <div className="rfp-section-heading" id="1.4">Clarifications</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">❓</span>
            Clarifications Raised with Meridian
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Question</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Q1</td>
                <td>Which cloud region (EU or US) does Meridian prefer for the single data region at installation? Are there any data-residency constraints beyond the stated GDPR requirement?</td>
                <td><span className="overview-badge overview-badge--warn">Unanswered</span></td>
                <td>RFP Section 4.4 states "Single data region chosen at installation time." Region confirmed at award per Section 9. Pricing is region-neutral; finalised at contract.</td>
              </tr>
              <tr>
                <td>Q2</td>
                <td>Which SSO provider(s) does Meridian currently use — Google Workspace, Azure AD, Okta, or SAML 2.0? Will sandbox credentials be available before Phase 1 week 4?</td>
                <td><span className="overview-badge overview-badge--warn">Unanswered</span></td>
                <td>All four providers are supported via OAuth 2.0. Answer determines which integration is tested first in Phase 1 vs deferred to Phase 3.</td>
              </tr>
              <tr>
                <td>Q3</td>
                <td>Is there a preferred LLM provider (OpenAI, Anthropic Claude, Azure OpenAI), or should we propose based on cost/performance optimisation?</td>
                <td><span className="overview-badge overview-badge--warn">Unanswered</span></td>
                <td>The abstraction layer (Section 4.5) allows switching providers post-launch. Our default recommendation is Anthropic Claude Sonnet for analysis and GPT-4o for structured extraction, subject to Meridian preference.</td>
              </tr>
              <tr>
                <td>Q4</td>
                <td>Does Meridian have an existing Salesforce instance with a CRM webhook target, or is the Salesforce integration a future-state requirement?</td>
                <td><span className="overview-badge overview-badge--warn">Unanswered</span></td>
                <td>RFP Section 4.5 specifies Salesforce REST API integration in Phase 3. Scoped as CRM webhook creating/updating projects within 60 s.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}
    </div>
  )
}
