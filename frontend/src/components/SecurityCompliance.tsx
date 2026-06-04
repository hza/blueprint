export function SecurityCompliance({ subsection }: { subsection?: string }) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">4. Security &amp; Compliance</div>
            <div className="overview-banner-client">Meridian Software · Customer Facing Portal — RFP</div>
          </div>
          <span className="overview-badge overview-badge--warn">IN REVIEW</span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Security Tier</span>
            <span className="overview-stat-value overview-stat-score--ok">Enterprise</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">ISO 27001</span>
            <span className="overview-stat-value overview-val--danger">Pending</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">SOC 2 Type II</span>
            <span className="overview-stat-value overview-stat-score--ok">Certified</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Pen Test</span>
            <span className="overview-stat-value">Annual</span>
          </div>
        </div>
      </div>

      {show('4.1') && (<>
      {/* 4.1 Security Model */}
      <div className="rfp-section-heading" id="4.1">Security Model</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🔐</span>
            Identity &amp; Access Management
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Authentication</td>
                <td>Multi-Factor Authentication (MFA) enforced for all users. SAML 2.0 / OIDC SSO integration with Meridian's Azure AD.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Authorisation</td>
                <td>Role-Based Access Control (RBAC) with least-privilege principle. Attribute-Based Access Control (ABAC) for data-row filtering.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Privileged Access</td>
                <td>PAM solution (CyberArk) for admin accounts. Just-in-time access provisioning. All sessions recorded and auditable.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Session Management</td>
                <td>30-minute idle timeout. Concurrent session limits per role. Device trust enforcement via Conditional Access policies.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🔒</span>
            Data Protection
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Encryption at Rest</td>
                <td>AES-256 encryption for all stored data. Database Transparent Data Encryption (TDE). Encrypted backups with customer-managed keys (CMK).</td>
              </tr>
              <tr>
                <td className="overview-table-label">Encryption in Transit</td>
                <td>TLS 1.3 enforced. HSTS headers. Certificate pinning for mobile clients. Internal service-to-service mTLS.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Data Classification</td>
                <td>Four-tier scheme: Public / Internal / Confidential / Restricted. Automated classification via Microsoft Purview labels applied at ingestion.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Data Residency</td>
                <td>All Meridian data stored within Australian data centres (Sydney + Melbourne). No cross-border transfers without explicit written consent.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Key Management</td>
                <td>Azure Key Vault with FIPS 140-2 Level 2 HSM. Annual key rotation. Separate key escrow for disaster recovery.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🛡</span>
            Infrastructure &amp; Network Security
          </div>
          <ul className="overview-checklist">
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              Web Application Firewall (WAF) — Azure Front Door WAF with OWASP Top 10 ruleset and custom Meridian rules.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              DDoS Protection — Azure DDoS Protection Standard with automatic attack mitigation and $1M SLA-backed availability guarantee.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              Network Segmentation — Private subnets per tier (web / app / data). No direct public internet access to database layer. NSGs with allowlist-only rules.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              Intrusion Detection — Microsoft Sentinel SIEM with 24/7 SOC monitoring. Alert SLA: Critical ≤ 15 min, High ≤ 1 hr.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              Vulnerability Management — Weekly automated scans (Qualys). Critical CVEs patched within 24 hours, High within 72 hours.
            </li>
            <li className="overview-check overview-check--warn">
              <span className="overview-check-icon" />
              Container Security — Trivy image scanning integrated in CI/CD. Runtime protection via Defender for Containers (pilot in progress).
            </li>
          </ul>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🔍</span>
            Audit &amp; Monitoring
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Audit Logging</td>
                <td>All user actions, data access, and admin changes logged with immutable timestamps. Retention: 12 months hot, 7 years cold (Azure Archive).</td>
              </tr>
              <tr>
                <td className="overview-table-label">SIEM Integration</td>
                <td>Log streams to Meridian's existing Splunk instance via syslog-ng. Custom dashboards for compliance officer review.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Incident Response</td>
                <td>Documented IRP with RTO/RPO commitments. 72-hour breach notification to Meridian CISO per ASD Essential Eight mandate.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Penetration Testing</td>
                <td>Annual full-scope pen test by CREST-accredited third party (last: Feb 2025, 0 critical findings). Meridian may commission targeted tests anytime with 5-day notice.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}

      {show('4.2') && (<>
      {/* 4.2 Certifications & Standards */}
      <div className="rfp-section-heading" id="4.2">Certifications &amp; Standards</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✓</span>
            Certification Status
            <span className="overview-badge overview-badge--warn">1 Gap</span>
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Standard</th>
                <th>Status</th>
                <th>Expiry / Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">SOC 2 Type II</td>
                <td><span className="overview-badge overview-badge--ok">Certified</span></td>
                <td>Audit period: Jan–Dec 2024. Certificate available for download. Next audit: Jan 2026.</td>
              </tr>
              <tr>
                <td className="overview-table-label">ISO 27001:2022</td>
                <td><span className="overview-badge overview-badge--danger">Pending</span></td>
                <td>Stage 2 audit scheduled Mar 28, 2025. Expected certification: Apr 30, 2025. Interim controls letter available.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Essential Eight (ASD)</td>
                <td><span className="overview-badge overview-badge--ok">Maturity Level 2</span></td>
                <td>Self-assessed Jan 2025. Independent validation scoped for Q3 2025.</td>
              </tr>
              <tr>
                <td className="overview-table-label">IRAP Assessment</td>
                <td><span className="overview-badge overview-badge--ok">PROTECTED</span></td>
                <td>Assessed by IRAP assessor Feb 2025 against ISM controls. Report available under NDA.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Privacy Act 1988</td>
                <td><span className="overview-badge overview-badge--ok">Compliant</span></td>
                <td>Privacy Impact Assessment completed. DPA template drafted. Annual review cycle.</td>
              </tr>
              <tr>
                <td className="overview-table-label">GDPR (if applicable)</td>
                <td><span className="overview-badge">N/A</span></td>
                <td>No EU data subjects in scope for this engagement. Can be activated if scope changes.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">!</span>
            ISO 27001 Gap — Mitigation Plan
          </div>
          <ul className="overview-risk-list">
            <li className="overview-risk overview-risk--high">
              <span className="overview-risk-level">RISK</span>
              <div>
                Your RFP mandates ISO 27001 at contract execution. Certification is expected April 30 — 30 days into the programme and before any Meridian data enters the production environment.
              </div>
            </li>
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">MITIG</span>
              <div>
                <strong>Interim Controls Letter</strong> — Signed by CISO, reviewed by external auditor, covering the 114 Annex A controls with current implementation evidence.
              </div>
            </li>
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">MITIG</span>
              <div>
                <strong>Contractual Condition</strong> — Proposing an ISO 27001 condition precedent: certification to be achieved within 60 days of contract execution or an agreed penalty credit applies.
              </div>
            </li>
            <li className="overview-risk overview-risk--low">
              <span className="overview-risk-level">ALTERN</span>
              <div>
                SOC 2 Type II + IRAP PROTECTED together provide equivalent or stronger assurance for this engagement. You can verify this directly: your CISO is invited to review the full controls mapping document before contract execution.
              </div>
            </li>
          </ul>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📋</span>
            Security Governance
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">CISO</td>
                <td>Dedicated CISO with 15+ years enterprise security experience. Direct reporting line to CEO.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Security Review Cadence</td>
                <td>Monthly security steering committee. Quarterly board-level risk reporting. Annual third-party security audit.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Supplier Security</td>
                <td>Third-party security assessments for all Tier 1 vendors. Contractual security clauses in all subcontracts. Annual vendor review.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Staff Security Clearance</td>
                <td>All staff with Meridian data access hold minimum NV1 clearance (or NV2 as required). Background checks re-run every 3 years.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Security Training</td>
                <td>Mandatory annual awareness training. Phishing simulation quarterly. Role-specific training for developers (OWASP, secure SDLC).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}
    </div>
  )
}
