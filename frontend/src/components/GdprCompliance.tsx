import { useNavigate } from 'react-router-dom'
import './IntegrationDetail.css'

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
    </div>
  )
}
