import { useNavigate } from 'react-router-dom'
import './IntegrationDetail.css'
import './Overview.css'

type AiActItem = { article: string; requirement: string; status: 'met' | 'partial' | 'discovery'; detail: string }

const EUAI_CHECKLIST: AiActItem[] = [
  { article: 'Art. 6 / Annex III', requirement: 'High-risk AI system classification', status: 'discovery', detail: 'Classification as high-risk depends on the deployment context and use case confirmed at Discovery Stage. RFP response automation is not listed in Annex III by default, but final classification will be validated with the client\'s legal counsel before development begins.' },
  { article: 'Art. 9', requirement: 'Risk management system', status: 'met', detail: 'A documented AI risk management process is in place, covering identification, estimation, and mitigation of foreseeable risks throughout the AI system lifecycle. Risk register maintained and reviewed at each project milestone.' },
  { article: 'Art. 10', requirement: 'Data governance & training data quality', status: 'met', detail: 'Training and fine-tuning data is subject to quality checks: relevance assessment, bias screening, and documented provenance. Client data is never used for model training without explicit written consent.' },
  { article: 'Art. 11', requirement: 'Technical documentation', status: 'met', detail: 'Technical documentation maintained per Annex IV: system description, design logic, development process, training methodology, performance metrics, and known limitations. Updated at each release.' },
  { article: 'Art. 12', requirement: 'Record-keeping & logging', status: 'met', detail: 'Automatic logging of AI system operation is implemented with tamper-evident audit trails. Logs capture input/output events, model version, user identity, and timestamps. Retained for the period required by applicable law.' },
  { article: 'Art. 13', requirement: 'Transparency & provision of information', status: 'met', detail: 'Users are informed they are interacting with an AI system. System capabilities and limitations are documented and disclosed. Output confidence levels and uncertainty indicators are surfaced where technically feasible.' },
  { article: 'Art. 14', requirement: 'Human oversight', status: 'met', detail: 'Human-in-the-loop controls are built into consequential AI outputs. Users can override, reject, or escalate AI decisions. Override events are logged. Kill-switch mechanisms enable disabling the AI system without data loss.' },
  { article: 'Art. 15', requirement: 'Accuracy, robustness & cybersecurity', status: 'met', detail: 'AI components are tested for accuracy, consistency under adversarial inputs, and resilience to data poisoning. Cybersecurity controls (see Security Model) protect against model extraction and prompt injection attacks.' },
  { article: 'Art. 16', requirement: 'Obligations of providers of high-risk AI systems', status: 'discovery', detail: 'Full provider obligations (CE marking, conformity assessment, registration in EU database) apply only if the system is classified as high-risk. Scope will be confirmed at Discovery Stage. SCNSoft will support the client in meeting all applicable obligations.' },
  { article: 'Art. 17', requirement: 'Quality management system (QMS)', status: 'met', detail: 'A quality management system covering design, development, testing, change management, and post-market monitoring is in place and aligned with ISO 9001 principles. QMS documentation available for client review on request.' },
  { article: 'Art. 26', requirement: 'Obligations of deployers', status: 'met', detail: 'Deployer responsibilities (use only as intended, monitor performance, report incidents, store logs) are documented in the Deployment Responsibility Matrix. Client training is provided before go-live.' },
  { article: 'Art. 50', requirement: 'Transparency for general-purpose AI interactions', status: 'met', detail: 'AI-generated content is clearly labelled. Users are informed when content is produced by an AI system. No synthetic media is generated without disclosure. Applicable to chatbot, summarisation, and draft-generation features.' },
  { article: 'Art. 53', requirement: 'Obligations for general-purpose AI model providers', status: 'partial', detail: 'Where third-party GPAI models (e.g. LLM APIs) are integrated, SCNSoft ensures sub-processor DPAs and model usage policies prohibit training on client data. Full compliance with Art. 53 technical documentation requirements is contingent on the upstream provider\'s disclosures.' },
  { article: 'Art. 55', requirement: 'Systemic risk assessment (GPAI)', status: 'discovery', detail: 'Systemic risk obligations apply only to models above the 10^25 FLOP training threshold. Third-party foundation models used are assessed against this threshold at integration time. Discovery Stage will confirm applicability.' },
  { article: 'Art. 62', requirement: 'Incident reporting to authorities', status: 'met', detail: 'Serious incident reporting procedure documented in the Incident Response Plan. Market surveillance authority notification within 15 days of a serious incident or safety risk. Client notified immediately upon incident detection.' },
  { article: 'Art. 9 / Art. 72', requirement: 'Post-market monitoring', status: 'met', detail: 'Post-market monitoring plan defined before go-live: performance KPIs, drift detection, user feedback collection, and periodic re-evaluation schedule. Findings reported to client quarterly.' },
  { article: 'Recital 47 / Art. 5', requirement: 'Prohibited AI practices', status: 'met', detail: 'The system does not implement subliminal manipulation, exploitation of vulnerabilities, social scoring, real-time biometric surveillance, or emotion recognition in prohibited contexts. Prohibited practice screening is part of the requirements review at project inception.' },
  { article: 'Art. 13 / Recital 48', requirement: 'Explainability & interpretability', status: 'partial', detail: 'Explanations for AI outputs are provided in plain language where technically feasible. Full mathematical explainability (e.g. SHAP values) is available for structured ML models. Large language model outputs are accompanied by source citations and confidence levels rather than black-box explanations.' },
]

const statusMeta = {
  met:       { label: 'Met',             bg: 'var(--sem-ok-bg)',    fg: 'var(--sem-ok-fg)' },
  partial:   { label: 'Partial',         bg: 'var(--sem-warn-bg)',  fg: 'var(--sem-warn-fg)' },
  discovery: { label: 'Discovery Stage', bg: 'var(--canvas-inset)', fg: 'var(--fg-muted)' },
}

const metCount       = EUAI_CHECKLIST.filter(i => i.status === 'met').length
const partialCount   = EUAI_CHECKLIST.filter(i => i.status === 'partial').length
const discoveryCount = EUAI_CHECKLIST.filter(i => i.status === 'discovery').length

export function EuAiActCompliance() {
  const navigate = useNavigate()
  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Regulation</span>
            <span className="overview-stat-value">EU AI Act 2024/1689</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Articles Met</span>
            <span className="overview-stat-value overview-stat-score--ok">{metCount} / {EUAI_CHECKLIST.length}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Partial</span>
            <span className="overview-stat-value">{partialCount}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Pending Discovery</span>
            <span className="overview-stat-value">{discoveryCount}</span>
          </div>
        </div>
      </div>

      <div className="integration-detail-header">
        <div className="integration-detail-header-left">
          <span className="rfp-section-heading">EU AI Act Compliance</span>
        </div>
        <button className="integration-detail-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="overview-grid">
        <div className="overview-card" style={{ gridColumn: '1 / -1' }}>
          <div className="overview-card-header">
            <span className="overview-card-icon">🤖</span>
            What is the EU AI Act — and Why Does It Apply to Your Project?
          </div>
          <div style={{ lineHeight: '1.7', fontSize: '14px', color: 'var(--fg)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ margin: 0 }}>
              The <strong>EU AI Act (Regulation (EU) 2024/1689)</strong> is the world's first comprehensive legal framework for artificial intelligence, entering force in August 2024 with a phased compliance timeline through 2027. It applies to any AI system placed on the EU market or used by EU-based operators — regardless of where the developer is headquartered.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Why it matters to you:</strong> If your project incorporates AI components (LLM-powered features, automated decision support, document analysis), the EU AI Act imposes obligations on both the provider (SCNSoft, as developer) and the deployer (your organisation). Non-compliance with high-risk AI provisions carries fines of up to <strong>€30 million or 6% of global annual turnover</strong>. This page shows how SCNSoft addresses each applicable obligation so your procurement and legal teams have the evidence they need.
            </p>
            <p style={{ margin: 0 }}>
              <strong>When it applies:</strong> Prohibited practice obligations applied from February 2025. General-purpose AI model obligations apply from August 2025. High-risk AI system obligations apply from August 2026. SCNSoft monitors this timeline and ensures compliance gates are met before each milestone.
            </p>
          </div>
        </div>
      </div>

      <div style={{ color: 'var(--fg-muted)', marginBottom: '12px' }}>
        Items marked <strong style={{ color: 'var(--fg)' }}>Discovery Stage</strong> depend on final system classification and client deployment context, confirmed at project kick-off.
      </div>

      <div className="overview-grid">
        <div className="overview-card" style={{ gridColumn: '1 / -1' }}>
          <div className="overview-card-header">
            <span className="overview-card-icon">✓</span>
            EU AI Act Compliance Checklist — Article-by-Article Coverage
          </div>
          <table className="overview-table" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '14%' }} />
              <col style={{ width: '24%' }} />
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
              {EUAI_CHECKLIST.map((item, i) => {
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
            How We Prepare Projects for EU AI Act Readiness
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
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>1. AI System Inventory &amp; Classification</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Identify all AI components in scope</li>
                    <li>Classify each against Annex I, II, III risk tiers</li>
                    <li>Confirm prohibited practice screening</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>AI System Inventory Register</li>
                    <li>Risk Classification Report</li>
                    <li>Prohibited Practice Sign-off</li>
                  </ul>
                </td>
                <td>1–2 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>2. Risk Management &amp; Technical Documentation</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Establish AI risk management system (Art. 9)</li>
                    <li>Produce Annex IV technical documentation</li>
                    <li>Define accuracy, robustness, and cybersecurity metrics</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>AI Risk Register</li>
                    <li>Annex IV Technical Documentation Pack</li>
                    <li>Performance &amp; Robustness Baseline</li>
                  </ul>
                </td>
                <td>2–3 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>3. Data Governance &amp; Training Data Audit</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Audit training and fine-tuning datasets</li>
                    <li>Assess bias, representativeness, and data quality</li>
                    <li>Document data provenance and access controls</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Data Governance Report (Art. 10)</li>
                    <li>Bias Assessment</li>
                    <li>Data Provenance Map</li>
                  </ul>
                </td>
                <td>2–3 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>4. Human Oversight &amp; Transparency Controls</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Implement human-in-the-loop and override mechanisms</li>
                    <li>Build AI disclosure and labelling features</li>
                    <li>Define and test kill-switch procedures</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Human Oversight Design Document</li>
                    <li>Transparency &amp; Disclosure Checklist</li>
                    <li>Kill-Switch Test Evidence</li>
                  </ul>
                </td>
                <td>2–4 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>5. Logging, Monitoring &amp; Incident Response</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Configure tamper-evident AI operation logs</li>
                    <li>Establish post-market monitoring plan</li>
                    <li>Document incident reporting procedures (Art. 62)</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>AI Logging Architecture</li>
                    <li>Post-Market Monitoring Plan</li>
                    <li>Incident Reporting Runbook</li>
                  </ul>
                </td>
                <td>2–3 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>6. Conformity Assessment &amp; Registration (if high-risk)</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Conduct or support third-party conformity assessment</li>
                    <li>Register system in EU AI database (Art. 49)</li>
                    <li>Affix CE marking where required</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Conformity Assessment Report</li>
                    <li>EU Database Registration Record</li>
                    <li>Declaration of Conformity</li>
                  </ul>
                </td>
                <td>3–6 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>7. Training, Policies &amp; Accountability</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Deliver AI Act awareness training for project staff</li>
                    <li>Establish AI governance policies and roles</li>
                    <li>Create accountability documentation</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>AI Governance Policy</li>
                    <li>Training Records</li>
                    <li>Accountability Register</li>
                  </ul>
                </td>
                <td>1–2 weeks</td>
              </tr>
              <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>Total</td>
                <td></td>
                <td></td>
                <td>13–23 weeks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="overview-card" style={{ marginTop: '16px' }}>
        <div className="overview-card-header">
          <span className="overview-card-icon">◎</span>
          What You Gain
        </div>
        <ul style={{ margin: 0, padding: '14px 14px 14px 2em', color: 'var(--fg)', fontSize: '14px', lineHeight: '1.7' }}>
          <li>Documented compliance evidence ready for regulatory or procurement review</li>
          <li>Reduced risk of enforcement action and reputational exposure</li>
          <li>Clear AI risk classification that narrows scope and cost of conformity obligations</li>
          <li>Human oversight and transparency controls that build end-user trust</li>
          <li>Ongoing post-market monitoring to catch drift and incidents early</li>
        </ul>
      </div>
    </div>
  )
}
