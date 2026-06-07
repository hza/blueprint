import { useNavigate } from 'react-router-dom'
import './IntegrationDetail.css'
import './Overview.css'

type IsoItem = { clause: string; control: string; status: 'met' | 'partial' | 'discovery'; detail: string }

const ISO_CHECKLIST: IsoItem[] = [
  // Clause 4 — Context
  { clause: '4.1', control: 'Understanding the organisation and its context', status: 'met', detail: 'Internal and external issues relevant to information security identified and documented. Reviewed annually and on material change.' },
  { clause: '4.2', control: 'Understanding the needs and expectations of interested parties', status: 'met', detail: 'Stakeholder register maintained covering clients, regulators, sub-processors, and staff. Security requirements per stakeholder documented and reviewed annually.' },
  { clause: '4.3', control: 'Scope of the ISMS', status: 'met', detail: 'ISMS scope document covers all systems and services used to deliver client engagements. Scope boundaries clearly defined and communicated to all staff.' },
  { clause: '4.4', control: 'Information security management system', status: 'met', detail: 'ISMS established, implemented, maintained, and continually improved. Governance structure in place with designated ISMS owner.' },

  // Clause 5 — Leadership
  { clause: '5.1', control: 'Leadership and commitment', status: 'met', detail: 'Senior management demonstrates commitment to ISMS via resource allocation, policy sign-off, and participation in management reviews. Security objectives included in business objectives.' },
  { clause: '5.2', control: 'Information security policy', status: 'met', detail: 'Information Security Policy approved by management, published to all staff, and reviewed annually. Policy sets the direction for the ISMS and establishes security objectives.' },
  { clause: '5.3', control: 'Organisational roles, responsibilities and authorities', status: 'met', detail: 'ISMS roles and responsibilities assigned and communicated. RACI matrix maintained. ISMS owner has authority to enforce controls and escalate issues.' },

  // Clause 6 — Planning
  { clause: '6.1.1', control: 'Actions to address risks and opportunities', status: 'met', detail: 'Risk and opportunity register maintained. Actions to address risks integrated into ISMS processes. Residual risk tracked.' },
  { clause: '6.1.2', control: 'Information security risk assessment', status: 'met', detail: 'Annual risk assessment using ISO 27005-aligned methodology. Threat and vulnerability identification, likelihood and impact scoring. Risk owners assigned.' },
  { clause: '6.1.3', control: 'Information security risk treatment', status: 'met', detail: 'Risk treatment plan maintained with treat/transfer/accept/avoid decisions per risk. Statement of Applicability (SoA) documents control selection rationale.' },
  { clause: '6.2', control: 'Information security objectives and planning to achieve them', status: 'met', detail: 'ISMS objectives defined, measurable, and communicated. Progress reviewed quarterly in management review meetings. Objectives updated when strategy changes.' },

  // Clause 7 — Support
  { clause: '7.1', control: 'Resources', status: 'met', detail: 'Adequate resources (personnel, tools, budget) allocated to ISMS. Security tooling budget reviewed annually. Headcount for security roles maintained.' },
  { clause: '7.2', control: 'Competence', status: 'met', detail: 'Competence requirements defined per security role. Annual security training completed by all staff. Training records maintained. New starters complete training before accessing client data.' },
  { clause: '7.3', control: 'Awareness', status: 'met', detail: 'Security awareness programme in place. Phishing simulations conducted quarterly. Security bulletins issued on emerging threats. Awareness completion tracked.' },
  { clause: '7.4', control: 'Communication', status: 'met', detail: 'Internal and external security communication plan documented. Security incidents communicated to affected parties per IRP. Policy changes communicated within 5 business days.' },
  { clause: '7.5', control: 'Documented information', status: 'met', detail: 'Document control procedure in place. ISMS documentation maintained in version-controlled repository. Access controls applied to sensitive documents. Review and approval workflow enforced.' },

  // Clause 8 — Operation
  { clause: '8.1', control: 'Operational planning and control', status: 'met', detail: 'ISMS processes planned, implemented, controlled, and reviewed. Changes to processes assessed for security impact. Outsourced processes monitored via vendor risk management.' },
  { clause: '8.2', control: 'Information security risk assessment (operational)', status: 'met', detail: 'Risk assessments performed at project initiation and on significant change. Threat modelling conducted at Discovery Stage per engagement. Results feed into control selection.' },
  { clause: '8.3', control: 'Information security risk treatment (operational)', status: 'met', detail: 'Risk treatment plans implemented and monitored. Residual risks accepted by management. Treatment effectiveness reviewed at each management review.' },

  // Clause 9 — Performance Evaluation
  { clause: '9.1', control: 'Monitoring, measurement, analysis and evaluation', status: 'met', detail: 'Security KPIs measured monthly: patch compliance, access review completion, vulnerability closure rates, incident counts. Dashboard reviewed in management meetings.' },
  { clause: '9.2', control: 'Internal audit', status: 'met', detail: 'Internal ISMS audit conducted annually against ISO 27001 requirements and SoA controls. Findings tracked to closure. Audit programme planned based on risk.' },
  { clause: '9.3', control: 'Management review', status: 'met', detail: 'Management review conducted at least annually. Inputs: audit results, incidents, risk posture, KPIs, stakeholder feedback. Outputs: decisions, resource allocations, improvement actions.' },

  // Clause 10 — Improvement
  { clause: '10.1', control: 'Continual improvement', status: 'met', detail: 'Continual improvement process embedded in ISMS. Improvement actions tracked in risk register. Lessons learned from incidents, audits, and exercises feed back into controls.' },
  { clause: '10.2', control: 'Nonconformity and corrective action', status: 'met', detail: 'Nonconformity procedure in place. Root cause analysis required for all nonconformities. Corrective actions tracked to closure. Recurrence monitored.' },

  // Annex A Controls (selected key controls)
  { clause: 'A.5.1', control: 'Policies for information security', status: 'met', detail: 'Information Security Policy and supporting policies (10+ documents) approved, published, and reviewed annually. Policies cover acceptable use, access control, incident response, and data classification.' },
  { clause: 'A.6.1', control: 'Internal organisation', status: 'met', detail: 'Security roles and responsibilities defined. Segregation of duties enforced. No single person can approve and implement a production change. Security in project management enforced.' },
  { clause: 'A.6.3', control: 'Information security in project management', status: 'met', detail: 'Security requirements addressed at project initiation. Threat modelling and risk assessment embedded in Discovery Stage. Security sign-off required before project launch.' },
  { clause: 'A.7', control: 'Human resource security', status: 'met', detail: 'Background checks prior to employment. Security responsibilities included in employment contracts. Termination procedure revokes access within 4 hours. Annual security awareness training mandatory.' },
  { clause: 'A.8.1', control: 'Responsibility for assets', status: 'met', detail: 'Asset inventory maintained covering hardware, software, data assets, and cloud services. Asset owners assigned. Acceptable use rules communicated.' },
  { clause: 'A.8.2', control: 'Information classification', status: 'met', detail: 'Data classification policy defines Confidential, Internal, and Public tiers. Client data automatically classified as Confidential. Handling rules enforced via DLP and access controls.' },
  { clause: 'A.8.3', control: 'Media handling', status: 'met', detail: 'Media disposal follows NIST 800-88. Removable media restricted and monitored. Cloud storage subject to same classification and access controls as other assets.' },
  { clause: 'A.9', control: 'Access control', status: 'met', detail: 'Access control policy implemented. MFA enforced on all systems. RBAC with least privilege. Quarterly access reviews and recertification. Privileged access managed via PAM with session recording.' },
  { clause: 'A.10', control: 'Cryptography', status: 'met', detail: 'Cryptography policy in place. AES-256 at rest, TLS 1.3 in transit. Key management procedures documented. Certificate expiry monitoring automated.' },
  { clause: 'A.11', control: 'Physical and environmental security', status: 'met', detail: 'Cloud-first infrastructure with provider physical security controls (ISO 27001 certified DCs). Office physical access controlled. Clear-desk policy enforced. Screen lock policy applied.' },
  { clause: 'A.12', control: 'Operations security', status: 'met', detail: 'Change management, capacity management, malware protection, backup, logging, and vulnerability management all in place. Production changes require peer review. Backups verified weekly.' },
  { clause: 'A.13', control: 'Communications security', status: 'met', detail: 'Network security controls: WAF, DDoS protection, network segmentation, IDS. Information transfer policy covers email, file sharing, and API integrations. NDAs required before data exchange.' },
  { clause: 'A.14', control: 'System acquisition, development and maintenance', status: 'met', detail: 'Secure development lifecycle enforced: security requirements, threat modelling, code review, SAST/DAST in CI, dependency scanning. Security testing before each release.' },
  { clause: 'A.15', control: 'Supplier relationships', status: 'met', detail: 'Supplier security policy in place. Security requirements in supplier contracts. Annual vendor risk assessments. Sub-processor SOC 2 and ISO 27001 certificates reviewed.' },
  { clause: 'A.16', control: 'Information security incident management', status: 'met', detail: 'Documented IRP with severity classification, escalation paths, and communication templates. RTO: 1 hour, RPO: 15 min. Post-incident reviews conducted. Incidents logged and trended.' },
  { clause: 'A.17', control: 'Business continuity management', status: 'met', detail: 'Business continuity and disaster recovery plans documented and tested annually. Failover tested quarterly. Recovery documentation versioned and owned.' },
  { clause: 'A.18.1', control: 'Compliance with legal and contractual requirements', status: 'met', detail: 'Legal and regulatory requirements (GDPR, SOC 2, client contractual) identified and tracked. Compliance obligations reviewed annually. Legal counsel engaged for new regulatory requirements.' },
  { clause: 'A.18.2', control: 'Information security reviews', status: 'met', detail: 'Independent information security reviews conducted annually (external penetration test + internal audit). Findings remediated and tracked. Next Stage 2 ISO 27001 audit scheduled.' },
]

const statusMeta = {
  met:       { label: 'Met',             bg: 'var(--sem-ok-bg)',    fg: 'var(--sem-ok-fg)' },
  partial:   { label: 'Partial',         bg: 'var(--sem-warn-bg)',  fg: 'var(--sem-warn-fg)' },
  discovery: { label: 'Discovery Stage', bg: 'var(--canvas-inset)', fg: 'var(--fg-muted)' },
}

const metCount       = ISO_CHECKLIST.filter(i => i.status === 'met').length
const discoveryCount = ISO_CHECKLIST.filter(i => i.status === 'discovery').length

export function Iso27001Compliance() {
  const navigate = useNavigate()
  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Standard</span>
            <span className="overview-stat-value">ISO/IEC 27001:2022</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Controls Met</span>
            <span className="overview-stat-value overview-stat-score--ok">{metCount} / {ISO_CHECKLIST.length}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Pending Discovery</span>
            <span className="overview-stat-value">{discoveryCount}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Stage 2 Audit</span>
            <span className="overview-stat-value">Scheduled 2026</span>
          </div>
        </div>
      </div>

      <div className="integration-detail-header">
        <div className="integration-detail-header-left">
          <span className="rfp-section-heading">ISO 27001 Compliance</span>
        </div>
        <button className="integration-detail-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="overview-grid">
        <div className="overview-card" style={{ gridColumn: '1 / -1' }}>
          <div className="overview-card-header">
            <span className="overview-card-icon">🛡️</span>
            What is ISO 27001 — and Why Does It Matter to You?
          </div>
          <div style={{ lineHeight: '1.7', fontSize: '14px', color: 'var(--fg)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ margin: 0 }}>
              <strong>ISO/IEC 27001:2022</strong> is the internationally recognised standard for Information Security Management Systems (ISMS). Issued by the International Organization for Standardization, it specifies how organisations systematically identify, manage, and reduce information security risks through a defined set of controls and a continuous improvement cycle.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Why it matters to you:</strong> ISO 27001 certification is independent, third-party verified proof that a vendor's security programme is not just claimed but audited. It covers risk assessment, access control, cryptography, incident response, supplier relationships, and more — giving your procurement and legal teams a single, globally accepted assurance benchmark. Many enterprise contracts and regulated industries (finance, healthcare, government) require it as a pre-condition for engagement.
            </p>
            <p style={{ margin: 0 }}>
              <strong>When it applies:</strong> Relevant at vendor selection, contract negotiation, and ongoing supplier risk reviews. SCNSoft's Stage 2 certification audit is scheduled for 2026 — this page documents the current state of every required control so you can assess readiness today.
            </p>
          </div>
        </div>
      </div>
      <div style={{ color: 'var(--fg-muted)', marginBottom: '12px' }}>
        Items marked <strong style={{ color: 'var(--fg)' }}>Discovery Stage</strong> depend on client-specific context and will be finalised at project kick-off. ISO 27001 Stage 2 certification audit is scheduled for 2026 — controls below reflect current implementation status.
      </div>

      <div className="overview-grid">
        <div className="overview-card" style={{ gridColumn: '1 / -1' }}>
          <div className="overview-card-header">
            <span className="overview-card-icon">✓</span>
            ISO 27001:2022 — Clause &amp; Annex A Control Coverage
          </div>
          <table className="overview-table" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '28%' }} />
              <col style={{ width: '13%' }} />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>Clause / Control</th>
                <th>Requirement</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {ISO_CHECKLIST.map((item, i) => {
                const m = statusMeta[item.status]
                const badgeClass = item.status === 'met' ? 'overview-badge--ok' : item.status === 'partial' ? 'overview-badge--warn' : ''
                const badgeStyle = item.status === 'discovery' ? { background: 'var(--canvas-inset)', color: 'var(--fg-muted)' } : undefined
                return (
                  <tr key={i}>
                    <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>{item.clause}</td>
                    <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>{item.control}</td>
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
            How We Prepare Projects for ISO 27001 Certification
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
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>1. Scope &amp; Context</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Define ISMS scope and boundaries</li>
                    <li>Identify interested parties and their requirements</li>
                    <li>Document internal and external context</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>ISMS Scope Document</li>
                    <li>Stakeholder Register</li>
                    <li>Context Analysis</li>
                  </ul>
                </td>
                <td>1–2 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>2. Risk Assessment &amp; Treatment</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Asset inventory and information classification</li>
                    <li>Threat and vulnerability identification</li>
                    <li>Risk scoring and treatment decisions</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Risk Register</li>
                    <li>Risk Treatment Plan</li>
                    <li>Statement of Applicability (SoA)</li>
                  </ul>
                </td>
                <td>3–4 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>3. Policy &amp; Control Implementation</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Draft and approve all required ISMS policies</li>
                    <li>Implement Annex A controls selected in SoA</li>
                    <li>Assign control owners and document procedures</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>ISMS Policy Pack (10–20 policies)</li>
                    <li>Control Implementation Records</li>
                    <li>Procedures &amp; Work Instructions</li>
                  </ul>
                </td>
                <td>4–8 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>4. Awareness &amp; Training</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Deliver ISO 27001 awareness training to all staff</li>
                    <li>Role-specific training for control owners</li>
                    <li>Conduct phishing simulation and test results</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Training Materials &amp; Records</li>
                    <li>Phishing Simulation Report</li>
                    <li>Awareness Programme Calendar</li>
                  </ul>
                </td>
                <td>2 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>5. Internal Audit</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Plan and conduct internal ISMS audit</li>
                    <li>Assess conformance to ISO 27001 clauses and SoA controls</li>
                    <li>Track nonconformities and corrective actions to closure</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Internal Audit Report</li>
                    <li>Nonconformity &amp; CAR Register</li>
                    <li>Evidence of Closure</li>
                  </ul>
                </td>
                <td>2–3 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>6. Management Review</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Conduct formal management review meeting</li>
                    <li>Review ISMS performance, risks, and objectives</li>
                    <li>Record decisions and improvement actions</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Management Review Minutes</li>
                    <li>Improvement Action Log</li>
                    <li>Signed Management Commitment Statement</li>
                  </ul>
                </td>
                <td>1 week</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>7. Stage 1 Audit (Documentation Review)</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Engage accredited certification body</li>
                    <li>Submit ISMS documentation for desk review</li>
                    <li>Resolve Stage 1 findings before Stage 2</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Stage 1 Audit Report</li>
                    <li>Readiness Confirmation</li>
                    <li>Stage 2 Audit Plan</li>
                  </ul>
                </td>
                <td>2–4 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>8. Stage 2 Audit (Certification)</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>On-site or remote audit of control effectiveness</li>
                    <li>Demonstrate ISMS operation over time</li>
                    <li>Address any major or minor nonconformities</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>ISO 27001 Certificate (3-year validity)</li>
                    <li>Stage 2 Audit Report</li>
                    <li>Surveillance Audit Schedule</li>
                  </ul>
                </td>
                <td>1–2 weeks</td>
              </tr>
              <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>Total</td>
                <td></td>
                <td></td>
                <td>16–26 weeks</td>
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
          <li>Internationally recognised certification that opens doors to regulated and enterprise markets</li>
          <li>A systematic, risk-based approach to protecting your information assets</li>
          <li>Reduced supplier security questionnaire burden — share the certificate instead</li>
          <li>Stronger baseline for GDPR and SOC 2 compliance (controls overlap significantly)</li>
          <li>Continuous improvement cycle built into the standard — your security posture strengthens each year</li>
        </ul>
      </div>
    </div>
  )
}
