import { useNavigate } from 'react-router-dom'
import './IntegrationDetail.css'
import './Overview.css'

type Soc2Item = { category: string; criterion: string; status: 'met' | 'partial' | 'discovery'; detail: string }

const SOC2_CHECKLIST: Soc2Item[] = [
  // CC1 — Control Environment
  { category: 'CC1.1', criterion: 'Commitment to competence and ethical values', status: 'met', detail: 'Code of Conduct signed by all staff. Annual ethics training completed. HR background checks on all engineers with access to client environments.' },
  { category: 'CC1.2', criterion: 'Board oversight of internal controls', status: 'met', detail: 'Leadership accountability for security posture documented. Security governance reviewed quarterly. CISO-equivalent role designated with authority to enforce controls.' },
  { category: 'CC1.3', criterion: 'Organisational structure and assignment of authority', status: 'met', detail: 'RACI matrix published for security controls. Roles and responsibilities documented in Security Policy. No shared privileged accounts.' },
  { category: 'CC1.4', criterion: 'Commitment to attract, develop, and retain competent individuals', status: 'met', detail: 'Annual security training mandatory for all staff. Role-specific training for engineers. Training completion tracked and evidenced for audit.' },
  { category: 'CC1.5', criterion: 'Accountability for internal control responsibilities', status: 'met', detail: 'Control owners assigned per control. Remediation SLAs enforced. Non-compliance escalated to senior management.' },

  // CC2 — Communication and Information
  { category: 'CC2.1', criterion: 'Relevant, quality information to support internal control', status: 'met', detail: 'Centralised SIEM (Microsoft Sentinel) aggregates logs from all systems. Dashboards available for real-time control monitoring. Alerts reviewed daily.' },
  { category: 'CC2.2', criterion: 'Internal communication of control information', status: 'met', detail: 'Security policies published on internal wiki. Change to policies communicated to all staff within 5 business days. Attestation required on policy updates.' },
  { category: 'CC2.3', criterion: 'External communication with relevant parties', status: 'met', detail: 'Security posture summary included in client onboarding pack. Clients notified of material security changes. SOC 2 Type II report shared under NDA on request.' },

  // CC3 — Risk Assessment
  { category: 'CC3.1', criterion: 'Specify suitable objectives', status: 'met', detail: 'Security objectives defined in Security Policy. Aligned to SOC 2 Trust Service Criteria. Reviewed annually or on material change.' },
  { category: 'CC3.2', criterion: 'Identify and analyse risk', status: 'met', detail: 'Annual risk assessment conducted. Threat modelling per project at Discovery Stage. Risk register maintained with likelihood and impact ratings.' },
  { category: 'CC3.3', criterion: 'Assess fraud risk', status: 'met', detail: 'Fraud scenarios included in annual risk assessment. Segregation of duties enforced for financial and production access. Anomaly detection active in SIEM.' },
  { category: 'CC3.4', criterion: 'Identify and assess changes that could significantly impact internal controls', status: 'met', detail: 'Change management process requires security review for infrastructure changes. New third-party services assessed via vendor risk process before adoption.' },

  // CC4 — Monitoring
  { category: 'CC4.1', criterion: 'Select, develop, and perform ongoing evaluations', status: 'met', detail: 'Continuous control monitoring via SIEM and vulnerability scanning. Monthly access reviews. Automated alerts for control deviations.' },
  { category: 'CC4.2', criterion: 'Evaluate and communicate deficiencies', status: 'met', detail: 'Control deficiencies tracked in risk register. Remediation owners assigned. Critical deficiencies escalated to management within 24 hours.' },

  // CC5 — Control Activities
  { category: 'CC5.1', criterion: 'Select and develop control activities', status: 'met', detail: 'Controls mapped to SOC 2 Trust Service Criteria. Preventive, detective, and corrective controls in place for each risk area. Controls documented in Control Matrix.' },
  { category: 'CC5.2', criterion: 'Select and develop general controls over technology', status: 'met', detail: 'Change management, access control, and backup procedures enforced. Infrastructure-as-code enforced — no manual production changes. CI/CD pipeline with automated security gates.' },
  { category: 'CC5.3', criterion: 'Deploy control activities through policies and procedures', status: 'met', detail: 'All controls backed by documented policies. Policies reviewed annually. Exceptions require formal sign-off and are tracked to closure.' },

  // CC6 — Logical and Physical Access
  { category: 'CC6.1', criterion: 'Logical access security software', status: 'met', detail: 'MFA enforced on all systems. Zero-trust access model. Privileged access managed via PAM tool with session recording. Access reviews quarterly.' },
  { category: 'CC6.2', criterion: 'Prior to issuing credentials, register and authorise users', status: 'met', detail: 'Provisioning requires manager approval and HR confirmation. Joiners-movers-leavers (JML) process automated via HRIS integration. Offboarding revokes access within 4 hours.' },
  { category: 'CC6.3', criterion: 'Role-based access based on least privilege', status: 'met', detail: 'RBAC enforced at API and infrastructure layer. Least privilege applied by default. Access rights reviewed and recertified quarterly.' },
  { category: 'CC6.6', criterion: 'Logical access security measures against threats from outside', status: 'met', detail: 'WAF, DDoS protection, and intrusion detection in place. External penetration testing annually. Critical CVEs remediated within 24 hours.' },
  { category: 'CC6.7', criterion: 'Transmission of data restricted to authorised users', status: 'met', detail: 'TLS 1.3 enforced for all data in transit. Client data isolated per tenant. DLP controls alert on anomalous data exfiltration patterns.' },
  { category: 'CC6.8', criterion: 'Controls to prevent or detect and act on unauthorised or malicious software', status: 'met', detail: 'Endpoint detection and response (EDR) on all endpoints. Dependency scanning in CI pipeline with hard block on critical CVEs. Container images scanned before deployment.' },

  // CC7 — System Operations
  { category: 'CC7.1', criterion: 'Detect and monitor for new vulnerabilities', status: 'met', detail: 'Continuous vulnerability scanning via Tenable. SIEM threat intelligence feeds updated daily. Critical vulnerabilities escalated within 1 hour.' },
  { category: 'CC7.2', criterion: 'Monitor system components for anomalous behaviour', status: 'met', detail: '24/7 SOC monitoring via Microsoft Sentinel. Baseline behaviour modelling with ML-based anomaly detection. Alert SLA: Critical ≤ 15 min, High ≤ 1 hr.' },
  { category: 'CC7.3', criterion: 'Evaluate security events to determine if they constitute incidents', status: 'met', detail: 'Documented triage process for security alerts. Severity classification matrix applied. All P1/P2 events trigger incident response workflow.' },
  { category: 'CC7.4', criterion: 'Respond to identified security incidents', status: 'met', detail: 'Documented Incident Response Plan (IRP). RTO: 1 hour, RPO: 15 min. Post-incident reviews conducted and findings fed back into control improvements.' },
  { category: 'CC7.5', criterion: 'Identify and develop recovery activities', status: 'met', detail: 'Business continuity and disaster recovery plans tested annually. Failover tested in staging environment quarterly. Recovery documentation maintained and versioned.' },

  // CC8 — Change Management
  { category: 'CC8.1', criterion: 'Authorise, design, develop, configure, document, test, approve, and implement changes', status: 'met', detail: 'All changes go through PR review, automated tests, and staging deploy before production. Infrastructure changes require peer review and security sign-off. Rollback procedures documented.' },

  // CC9 — Risk Mitigation
  { category: 'CC9.1', criterion: 'Identify, select, and develop risk mitigation activities', status: 'met', detail: 'Risk treatment decisions (accept, mitigate, transfer, avoid) documented per risk. Cyber insurance in place. Security controls reviewed for effectiveness annually.' },
  { category: 'CC9.2', criterion: 'Assess and manage risks from vendors and business partners', status: 'met', detail: 'Vendor risk assessments completed before onboarding. Sub-processors listed and assessed annually. Vendor access controlled via least privilege and reviewed quarterly.' },

  // Availability (A)
  { category: 'A1.1', criterion: 'Current processing capacity and usage', status: 'met', detail: 'Auto-scaling configured for all services. Capacity planning reviewed monthly. SLA uptime: 99.9% with contractual SLAs and credits defined.' },
  { category: 'A1.2', criterion: 'Environmental protections, software, data backup processes, and recovery infrastructure', status: 'met', detail: 'Automated daily backups with 30-day retention. Backup integrity verified weekly. Multi-AZ deployment for high-availability components. RPO: 15 min, RTO: 1 hr.' },
  { category: 'A1.3', criterion: 'Recovery plan procedures', status: 'met', detail: 'DR plan documented and tested annually. Runbooks published for all critical system recovery scenarios. Results of DR tests evidenced for audit.' },

  // Confidentiality (C)
  { category: 'C1.1', criterion: 'Identify and maintain confidential information', status: 'met', detail: 'Data classification policy defines Confidential, Internal, and Public tiers. Client data automatically classified as Confidential. Handling rules enforced by DLP and access controls.' },
  { category: 'C1.2', criterion: 'Dispose of confidential information to meet objectives', status: 'met', detail: 'Automated purge pipeline deletes client data within 72 hours of contract end or erasure request. Deletion confirmed in immutable audit log. Media disposal follows NIST 800-88.' },

  // Processing Integrity (PI)
  { category: 'PI1.1', criterion: 'Obtain information to meet specifications', status: 'discovery', detail: 'Input validation and integrity controls will be scoped at Discovery Stage based on agreed data types and processing workflows.' },

  // Privacy (P)
  { category: 'P1–P8', criterion: 'Privacy criteria (collection, use, retention, disposal, access, disclosure)', status: 'met', detail: 'Privacy requirements addressed via GDPR-aligned controls: purpose limitation, data minimisation, retention policies, erasure workflow, and privacy notice. See GDPR Compliance page for full article-level coverage.' },
]

const statusMeta = {
  met:       { label: 'Met',             bg: 'var(--sem-ok-bg)',    fg: 'var(--sem-ok-fg)' },
  partial:   { label: 'Partial',         bg: 'var(--sem-warn-bg)',  fg: 'var(--sem-warn-fg)' },
  discovery: { label: 'Discovery Stage', bg: 'var(--canvas-inset)', fg: 'var(--fg-muted)' },
}

const metCount       = SOC2_CHECKLIST.filter(i => i.status === 'met').length
const discoveryCount = SOC2_CHECKLIST.filter(i => i.status === 'discovery').length

export function Soc2Compliance() {
  const navigate = useNavigate()
  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Standard</span>
            <span className="overview-stat-value">SOC 2 Type II (AICPA TSC 2017)</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Criteria Met</span>
            <span className="overview-stat-value overview-stat-score--ok">{metCount} / {SOC2_CHECKLIST.length}</span>
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
          <span className="rfp-section-heading">SOC 2 Type II Compliance</span>
        </div>
        <button className="integration-detail-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="overview-grid">
        <div className="overview-card" style={{ gridColumn: '1 / -1' }}>
          <div className="overview-card-header">
            <span className="overview-card-icon">✅</span>
            What is SOC 2 — and Why Does It Matter to You?
          </div>
          <div style={{ lineHeight: '1.7', fontSize: '14px', color: 'var(--fg)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ margin: 0 }}>
              <strong>SOC 2 (Service Organization Control 2)</strong> is an auditing framework developed by the American Institute of CPAs (AICPA). It evaluates how a vendor manages customer data across five Trust Service Criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy. A <strong>Type II</strong> report — the gold standard — covers actual control effectiveness over an observation period (typically 6–12 months), not just design.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Why it matters to you:</strong> SOC 2 Type II is the most widely required security assurance standard for US-listed companies and any organisation using SaaS or cloud services. It gives your security team independent evidence — from a licensed CPA firm — that your vendor's controls actually operated as designed throughout the audit period, not just on paper. It directly addresses the most common enterprise procurement and vendor risk requirements.
            </p>
            <p style={{ margin: 0 }}>
              <strong>When it applies:</strong> Typically requested during procurement, contract renewal, or annual vendor risk reviews. SCNSoft's SOC 2 Type II audit covers Jan–Dec 2027 — the report is available under NDA. This page maps every criterion so your team can review the scope before requesting the full report.
            </p>
          </div>
        </div>
      </div>
      <div style={{ color: 'var(--fg-muted)', marginBottom: '12px' }}>
        Items marked <strong style={{ color: 'var(--fg)' }}>Discovery Stage</strong> depend on client-specific context (data types, processing workflows) and will be finalised at project kick-off.
      </div>

      <div className="overview-grid">
        <div className="overview-card" style={{ gridColumn: '1 / -1' }}>
          <div className="overview-card-header">
            <span className="overview-card-icon">✓</span>
            SOC 2 Type II — Trust Service Criteria Coverage
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
                <th>Criterion</th>
                <th>Requirement</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {SOC2_CHECKLIST.map((item, i) => {
                const m = statusMeta[item.status]
                const badgeClass = item.status === 'met' ? 'overview-badge--ok' : item.status === 'partial' ? 'overview-badge--warn' : ''
                const badgeStyle = item.status === 'discovery' ? { background: 'var(--canvas-inset)', color: 'var(--fg-muted)' } : undefined
                return (
                  <tr key={i}>
                    <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>{item.category}</td>
                    <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>{item.criterion}</td>
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
            How We Prepare Projects for SOC 2 Type II Audit-Readiness
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
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>1. Scope &amp; Applicability</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Define audit scope (systems, services, Trust Service Categories)</li>
                    <li>Map data flows and system boundaries</li>
                    <li>Identify in-scope sub-processors and cloud services</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>SOC 2 Scope Document</li>
                    <li>System Description Draft</li>
                    <li>Sub-processor Inventory</li>
                  </ul>
                </td>
                <td>1–2 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>2. Gap Assessment</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Map existing controls to Trust Service Criteria</li>
                    <li>Identify control gaps and missing evidence</li>
                    <li>Prioritise remediation by risk and audit impact</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Control Gap Analysis Report</li>
                    <li>Remediation Roadmap</li>
                    <li>Evidence Collection Plan</li>
                  </ul>
                </td>
                <td>2–3 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>3. Control Design &amp; Implementation</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Design and implement missing controls (CC1–CC9, A, C, PI, P)</li>
                    <li>Formalise policies, procedures, and control descriptions</li>
                    <li>Implement monitoring and alerting for control effectiveness</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Control Matrix</li>
                    <li>Policy Pack (10–15 policies)</li>
                    <li>Monitoring &amp; Alerting Configuration</li>
                  </ul>
                </td>
                <td>4–8 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>4. Evidence Collection</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Collect and organise evidence for each control</li>
                    <li>Screenshot, log, and report artefacts per control test</li>
                    <li>Tag evidence to TSC criteria for auditor navigation</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Evidence Repository</li>
                    <li>Control-to-Evidence Mapping</li>
                    <li>Auditor Request List (PBC)</li>
                  </ul>
                </td>
                <td>2–4 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>5. Access &amp; Vendor Reviews</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Conduct quarterly access reviews and recertification</li>
                    <li>Assess vendor and sub-processor SOC 2 reports</li>
                    <li>Complete user access provisioning/deprovisioning evidence</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Access Review Records</li>
                    <li>Vendor Risk Assessments</li>
                    <li>JML Process Documentation</li>
                  </ul>
                </td>
                <td>2–3 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>6. Readiness Assessment &amp; Mock Audit</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Internal readiness walkthrough against TSC criteria</li>
                    <li>Simulate auditor testing procedures</li>
                    <li>Penetration testing and vulnerability assessment</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Readiness Assessment Report</li>
                    <li>Mock Audit Findings &amp; Remediation</li>
                    <li>Pen Test Report</li>
                  </ul>
                </td>
                <td>2–3 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>7. External Audit Support</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Coordinate with CPA auditor (Type I or Type II)</li>
                    <li>Respond to auditor requests promptly</li>
                    <li>Address management response for any exceptions noted</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>SOC 2 Report (Type I or Type II)</li>
                    <li>Management Responses</li>
                    <li>System Description (Section III)</li>
                  </ul>
                </td>
                <td>4–12 weeks</td>
              </tr>
              <tr>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>8. Ongoing Compliance</td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Maintain continuous evidence collection cadence</li>
                    <li>Quarterly control reviews and access recertification</li>
                    <li>Prepare for annual Type II audit cycle</li>
                  </ul>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    <li>Ongoing Evidence Calendar</li>
                    <li>Annual Audit Schedule</li>
                    <li>Continuous Monitoring Dashboard</li>
                  </ul>
                </td>
                <td>Ongoing</td>
              </tr>
              <tr style={{ fontWeight: 600, borderTop: '2px solid var(--border)' }}>
                <td className="overview-table-label" style={{ whiteSpace: 'normal' }}>Total (Phases 1–7)</td>
                <td></td>
                <td></td>
                <td>17–35 weeks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ marginTop: '16px', padding: '16px', background: 'var(--canvas-inset)', borderRadius: '6px' }}>
        <div style={{ fontWeight: 600, marginBottom: '10px', color: 'var(--fg)' }}>What You Gain</div>
        <ul style={{ margin: 0, paddingLeft: '1.4em', color: 'var(--fg-muted)', lineHeight: '1.7' }}>
          <li>A SOC 2 Type II report your customers and auditors can rely on</li>
          <li>Reduced security questionnaire burden — share the report instead</li>
          <li>Demonstrated continuous control effectiveness over a 12-month period</li>
          <li>Faster enterprise sales cycles where SOC 2 is a procurement requirement</li>
          <li>Reusable control evidence and processes for subsequent annual audits</li>
        </ul>
      </div>
    </div>
  )
}
