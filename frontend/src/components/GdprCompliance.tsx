import { useNavigate } from 'react-router-dom'
import './IntegrationDetail.css'
import './Overview.css'

type GdprItem = { article: string; requirement: string; status: 'met' | 'partial' | 'discovery'; detail: string }

const GDPR_CHECKLIST: GdprItem[] = [
  { article: 'Art. 5', requirement: 'Lawfulness, fairness, transparency', status: 'met', detail: 'Data processing is based on contractual necessity (Art. 6(1)(b)). Privacy notice provided to end-users. DPA signed before any data processing begins.' },
  { article: 'Art. 5', requirement: 'Purpose limitation', status: 'met', detail: 'Data collected solely for RFP response processing. No secondary use, no sale, no analytics beyond the agreed scope.' },
  { article: 'Art. 5', requirement: 'Data minimisation', status: 'met', detail: 'PII anonymisation worker strips personal identifiers before any content reaches an external LLM. Only minimum necessary fields retained.' },
  { article: 'Art. 5', requirement: 'Accuracy', status: 'discovery', detail: 'Accuracy controls for user-submitted content will be defined at Discovery Stage based on data types and correction workflows agreed with the client.' },
  { article: 'Art. 5', requirement: 'Storage limitation', status: 'met', detail: 'Retention period defined in DPA. Automated purge pipeline deletes client data within 72 hours of contract end or erasure request.' },
  { article: 'Art. 5', requirement: 'Integrity & confidentiality', status: 'met', detail: 'AES-256 at rest, TLS 1.3 in transit. RBAC enforced at API layer. Immutable audit log records all access events.' },
  { article: 'Art. 13/14', requirement: 'Transparency (privacy notice)', status: 'met', detail: 'Privacy notice template included in DPA package. Client responsible for surfacing it to their end-users; SCNSoft provides the data-processor notice.' },
  { article: 'Art. 17', requirement: 'Right to erasure', status: 'met', detail: 'Tested end-to-end purge flow: client data deleted within 72 hours across DB, object store, vector index, and audit log. Deletion confirmed in audit trail.' },
  { article: 'Art. 18', requirement: 'Right to restriction of processing', status: 'discovery', detail: "Restriction mechanism (e.g. soft-lock flag per data subject) will be scoped at Discovery Stage based on client's user management model." },
  { article: 'Art. 20', requirement: 'Data portability', status: 'met', detail: 'Export API returns data in machine-readable JSON/CSV. Available on request via admin panel or API call.' },
  { article: 'Art. 25', requirement: 'Privacy by design & default', status: 'met', detail: 'PII anonymised before LLM calls. Minimal data collected by default. Security controls baked into architecture, not added later.' },
  { article: 'Art. 28', requirement: 'Data Processing Agreement (DPA)', status: 'met', detail: 'Standard DPA signed before any data processing. Sub-processor list disclosed. LLM providers contractually commit to no training on client data.' },
  { article: 'Art. 32', requirement: 'Security of processing', status: 'met', detail: 'SOC 2 Type II certified controls. Penetration testing annually. Dependency scanning in CI with hard block on critical CVEs.' },
  { article: 'Art. 33', requirement: '72-hour breach notification', status: 'met', detail: 'Documented Incident Response Plan (IRP). RTO: 1 hour, RPO: 15 min. Breach detection → client notification → supervisory authority notification within 72 hours.' },
  { article: 'Art. 35', requirement: 'Data Protection Impact Assessment (DPIA)', status: 'discovery', detail: 'DPIA scope and triggers will be assessed at Discovery Stage once processing activities and data sensitivity levels are confirmed with the client.' },
  { article: 'Art. 37', requirement: 'Data Protection Officer (DPO)', status: 'discovery', detail: "DPO appointment requirement depends on processing scale. Will be confirmed at Discovery Stage in consultation with client's legal counsel." },
  { article: 'Art. 4 / Rec. 22', requirement: 'Determine applicability & roles', status: 'met', detail: 'SCNSoft acts as data processor (Art. 4(8)); the client is the data controller. GDPR applicability confirmed — client processes personal data of EU residents. Controller/processor roles and responsibilities documented in DPA before onboarding.' },
  { article: 'Art. 30', requirement: 'Data Inventory & Records of Processing Activities (ROPA)', status: 'met', detail: 'SCNSoft maintains a Records of Processing Activities log covering: data categories, purposes, legal basis, recipient sub-processors (LLM providers), retention periods, and security measures. Reviewed and updated at each new client engagement.' },
  { article: 'Art. 6 / Art. 7', requirement: 'Consent management', status: 'met', detail: 'Processing is based on contractual necessity (Art. 6(1)(b)), not consent — consent management is the client\'s responsibility for their own end-user interactions. Where the client relies on consent downstream, they are advised to implement freely given, specific, informed, and easily withdrawable consent flows with consent records maintained.' },
  { article: 'Art. 44–46', requirement: 'International data transfers', status: 'met', detail: 'LLM API calls to US-based providers are covered by Standard Contractual Clauses (SCCs, 2021 EU Commission decision). Transfer Impact Assessments (TIAs) documented per sub-processor. No EEA personal data is transferred to a third country without an approved transfer mechanism.' },
  { article: 'Art. 5(2) / Art. 24', requirement: 'Training & awareness', status: 'met', detail: 'All engineers and project staff complete annual data protection training covering GDPR obligations, data handling, and incident response. Training records maintained. New starters complete training before accessing client data.' },
  { article: 'Art. 5(2) / Art. 24', requirement: 'Policies & accountability', status: 'met', detail: 'Internal policies maintained: Data Protection Policy, Retention & Disposal Policy, Incident Response Plan, Acceptable Use Policy. Accountability demonstrated via signed DPA, ROPA, SOC 2 Type II audit evidence, and designated accountability ownership.' },
  { article: 'Art. 5(2) / Art. 32', requirement: 'Review & audit', status: 'met', detail: 'Annual internal GDPR compliance review. SOC 2 Type II external audit conducted annually. Penetration testing annually. Policies and processes updated in response to regulatory changes, new sub-processors, or post-incident findings.' },
]

const statusMeta = {
  met:       { label: 'Met',             bg: 'var(--sem-ok-bg)',    fg: 'var(--sem-ok-fg)' },
  partial:   { label: 'Partial',         bg: 'var(--sem-warn-bg)',  fg: 'var(--sem-warn-fg)' },
  discovery: { label: 'Discovery Stage', bg: 'var(--canvas-inset)', fg: 'var(--fg-muted)' },
}

const metCount       = GDPR_CHECKLIST.filter(i => i.status === 'met').length
const discoveryCount = GDPR_CHECKLIST.filter(i => i.status === 'discovery').length

export function GdprCompliance() {
  const navigate = useNavigate()
  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Regulation</span>
            <span className="overview-stat-value">EU GDPR 2016/679</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Articles Met</span>
            <span className="overview-stat-value overview-stat-score--ok">{metCount} / {GDPR_CHECKLIST.length}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Pending Discovery</span>
            <span className="overview-stat-value">{discoveryCount}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Audit Period</span>
            <span className="overview-stat-value">Jan–Dec 2027</span>
          </div>
        </div>
      </div>

      <div className="integration-detail-header">
        <div className="integration-detail-header-left">
          <span className="rfp-section-heading">GDPR Compliance</span>
        </div>
        <button className="integration-detail-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="overview-grid">
        <div className="overview-card" style={{ gridColumn: '1 / -1' }}>
          <div className="overview-card-header">
            <span className="overview-card-icon">🔒</span>
            What is GDPR — and Why Does It Apply to Your Project?
          </div>
          <div style={{ lineHeight: '1.7', fontSize: '14px', color: 'var(--fg)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ margin: 0 }}>
              The <strong>General Data Protection Regulation (EU 2016/679)</strong> is the EU's binding privacy law, effective May 2018. It governs how organisations collect, store, process, and delete personal data of EU and EEA residents — regardless of where the vendor is based.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Why it matters to you:</strong> If your platform handles personal data of EU users (names, emails, usage logs, payment details), GDPR compliance is a legal requirement — not optional. Violations carry fines of up to <strong>€20 million or 4% of global annual turnover</strong>. As your software vendor, SCNSoft acts as a <em>data processor</em> under your instructions; this page shows exactly how we meet our obligations so your audit exposure is minimised.
            </p>
            <p style={{ margin: 0 }}>
              <strong>When it applies:</strong> From day one of development — any environment that touches real personal data must be compliant. Relevant for procurement sign-off, DPA signing, and any infosec or legal review your organisation requires.
            </p>
          </div>
        </div>
      </div>

      <div style={{ color: 'var(--fg-muted)', marginBottom: '12px' }}>
        Items marked <strong style={{ color: 'var(--fg)' }}>Discovery Stage</strong> depend on client-specific context (data subjects, processing scale, correction workflows) and will be finalised at project kick-off.
      </div>

      <div className="overview-grid">
        <div className="overview-card" style={{ gridColumn: '1 / -1' }}>
          <div className="overview-card-header">
            <span className="overview-card-icon">✓</span>
            GDPR Compliance Checklist — Article-by-Article Coverage
          </div>
          <table className="overview-table" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '12%' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '13%' }} />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>Article</th>
                <th>Requirement</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {GDPR_CHECKLIST.map((item, i) => {
                const m = statusMeta[item.status]
                const badgeClass = item.status === 'met' ? 'overview-badge--ok' : item.status === 'partial' ? 'overview-badge--warn' : ''
                const badgeStyle = item.status === 'discovery' ? { background: 'var(--canvas-inset)', color: 'var(--fg-muted)' } : undefined
                return (
                  <tr key={i}>
                    <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>{item.article}</td>
                    <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>{item.requirement}</td>
                    <td><span className={`overview-badge ${badgeClass}`} style={badgeStyle}>{m.label}</span></td>
                    <td>{item.detail}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="overview-grid">
        <div className="overview-card" style={{ gridColumn: '1 / -1' }}>
          <div className="overview-card-header">
            <span className="overview-card-icon">⚑</span>
            How We Prepare Projects for GDPR Audit-Readiness
          </div>
          <table className="overview-table" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '22%' }} />
              <col style={{ width: '33%' }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '10%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>Phase</th>
                <th>Key Activities</th>
                <th>Deliverables</th>
                <th>Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>1. Project Scoping &amp; Applicability Assessment</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Determine GDPR applicability</li>
                    <li>Identify data flows, controllers/processors, and data subjects</li>
                    <li>Define scope of the project (systems, modules, third parties)</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>GDPR Applicability Report</li>
                    <li>High-level Data Flow Diagram</li>
                    <li>Gap Analysis Summary</li>
                  </ul>
                </td>
                <td>1–2 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>2. Data Inventory &amp; Mapping</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Comprehensive data discovery and classification</li>
                    <li>Create Records of Processing Activities (ROPA)</li>
                    <li>Identify special category data and high-risk processing</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Complete Data Inventory</li>
                    <li>ROPA Document (Art. 30)</li>
                    <li>Data Flow Maps (visual)</li>
                  </ul>
                </td>
                <td>2–3 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>3. Legal Basis &amp; Compliance Foundation</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Define lawful basis for each processing activity</li>
                    <li>Conduct Legitimate Interest Assessments (LIA)</li>
                    <li>Review/update privacy notices and consent mechanisms</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Lawful Basis Register</li>
                    <li>Updated Privacy Notices / Consent Flows</li>
                    <li>DPIA Screening</li>
                  </ul>
                </td>
                <td>2 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>4. Data Subject Rights Implementation</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Design and implement processes for DSARs (access, deletion, portability, objection, etc.)</li>
                    <li>Build automated/manual response workflows</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Rights Management Procedure</li>
                    <li>Response Templates &amp; Tracking System</li>
                    <li>SLAs for rights requests</li>
                  </ul>
                </td>
                <td>2–4 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>5. Technical &amp; Security Controls</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Implement Privacy by Design &amp; Default</li>
                    <li>Apply data minimization, pseudonymization, encryption</li>
                    <li>Role-based access control, audit logging, breach detection</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Technical Compliance Report</li>
                    <li>Security Configuration Guide</li>
                    <li>Encryption &amp; Access Control Matrix</li>
                  </ul>
                </td>
                <td>3–6 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>6. Vendor &amp; Processor Management</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Review third-party contracts</li>
                    <li>Draft/align Data Processing Agreements (DPAs)</li>
                    <li>Assess international data transfers &amp; safeguards</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Vendor Risk Assessment</li>
                    <li>Signed DPAs / SCCs</li>
                    <li>Transfer Impact Assessments</li>
                  </ul>
                </td>
                <td>2–3 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>7. Policies, Training &amp; Documentation</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Develop required policies and procedures</li>
                    <li>Deliver staff training</li>
                    <li>Create accountability documentation</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>GDPR Policy Pack</li>
                    <li>Training Materials &amp; Records</li>
                    <li>Internal Compliance Handbook</li>
                  </ul>
                </td>
                <td>2 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>8. Testing &amp; Mock Audit</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Conduct internal mock audit</li>
                    <li>Simulate data subject requests and breach scenarios</li>
                    <li>Penetration testing &amp; vulnerability assessment</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Mock Audit Report</li>
                    <li>Remediation Plan</li>
                    <li>Test Evidence Package</li>
                  </ul>
                </td>
                <td>2–3 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>9. Final Audit-Readiness Package</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Compile all evidence</li>
                    <li>Prepare for external audit</li>
                    <li>Handover and knowledge transfer</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Complete GDPR Audit-Readiness Dossier</li>
                    <li>Executive Summary &amp; Roadmap</li>
                    <li>Ongoing Monitoring Plan</li>
                  </ul>
                </td>
                <td>1 week</td>
              </tr>
              <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>Total</td>
                <td></td>
                <td></td>
                <td>17–26 weeks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ marginTop: '16px', padding: '16px', background: 'var(--canvas-inset)', borderRadius: '6px' }}>
        <div style={{ fontWeight: 600, marginBottom: '10px', color: 'var(--fg)' }}>What You Gain</div>
        <ul style={{ margin: 0, paddingLeft: '1.4em', color: 'var(--fg-muted)', lineHeight: '1.7' }}>
          <li>Audit-ready documentation that demonstrates accountability</li>
          <li>Reduced risk of fines and reputational damage</li>
          <li>Efficient, reusable processes tailored to your project</li>
          <li>Clear evidence of Privacy by Design implementation</li>
          <li>Ongoing support for maintenance and future audits</li>
        </ul>
      </div>
    </div>
  )
}
