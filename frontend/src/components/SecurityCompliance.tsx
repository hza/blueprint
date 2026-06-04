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
            <span className="overview-stat-value">In Progress</span>
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
                <td>Auth tokens expire after 8 hours of inactivity; refresh tokens after 30 days (RFP §4.4). IP allowlisting configurable by Admin. Rate limiting: 100 req/min per session, 20 uploads/hour per user.</td>
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
                <td>Single data region chosen at installation time (EU or US, confirmed at contract award per RFP §9). No cross-border transfers. GDPR-compliant data processing agreement (DPA) signed before any data is processed.</td>
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
                <td>Documented IRP. RTO: 1 hour, RPO: 15 minutes (RFP §4.4). GDPR 72-hour breach notification to supervisory authority where required. Client data deletion purged within 72 hours across all artifacts and audit log on erasure request.</td>
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
                <td className="overview-table-label">GDPR</td>
                <td><span className="overview-badge overview-badge--ok">Required &amp; Met</span></td>
                <td>Right to erasure, data portability, consent management, DPAs — all implemented per RFP §4.4. Purge tested end-to-end: client data deleted within 72 hours across all artifacts and audit log.</td>
              </tr>
              <tr>
                <td className="overview-table-label">PII Anonymisation</td>
                <td><span className="overview-badge overview-badge--ok">Implemented</span></td>
                <td>Dedicated anonymisation worker (NER model) replaces PII with typed placeholders before any content reaches an external LLM. Placeholder → original mapping stored encrypted, never sent to LLM. Placeholder count logged per document version. LLM providers contractually commit to not training on client content (RFP §4.5).</td>
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
            <li className="overview-risk overview-risk--ok">
              <span className="overview-risk-level">MET</span>
              <div>
                <strong>SOC 2 Type II</strong> — The RFP targets SOC 2 Type II (not ISO 27001). SCNSoft holds SOC 2 Type II certification (audit period Jan–Dec 2024). Certificate available for download. Next audit: Jan 2026.
              </div>
            </li>
            <li className="overview-risk overview-risk--ok">
              <span className="overview-risk-level">MET</span>
              <div>
                <strong>GDPR</strong> — Right to erasure, data portability, consent management, and DPAs are all implemented. Purge flow is a deliberate, tested path — not a manual operation. Purge completion recorded in the immutable audit log.
              </div>
            </li>
            <li className="overview-risk overview-risk--ok">
              <span className="overview-risk-level">MET</span>
              <div>
                <strong>Dependency scanning in CI</strong> — Hard block on critical CVEs in every pipeline run (RFP §4.4). Trivy container scanning. Open CVEs resolved before each deployment gate.
              </div>
            </li>
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">NOTE</span>
              <div>
                <strong>ISO 27001</strong> — The RFP does not mandate ISO 27001; it mandates SOC 2 Type II. ISO 27001 is in progress (Stage 2 audit scheduled) and will be available as an additional assurance layer once certified.
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
                <td className="overview-table-label">Password Hashing</td>
                <td>bcrypt (cost ≥ 12) or Argon2id. CSP headers prevent XSS. All inputs validated server-side against SQL injection, SSRF, and path traversal (RFP §4.4).</td>
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
