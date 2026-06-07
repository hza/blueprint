import React from 'react'
import { useNavigate } from 'react-router-dom'

export function SecurityCompliance({ subsection }: { subsection?: string }) {
  const navigate = useNavigate()
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id

  // Compliance coverage data
  type Coverage = 'covered' | 'partial' | 'na'
  const certRows: { cert: string; cells: Coverage[] }[] = [
    { cert: 'SOC 2 Type II', cells: ['covered', 'covered', 'covered', 'covered', 'covered'] },
    { cert: 'ISO 27001', cells: ['covered', 'covered', 'covered', 'covered', 'covered'] },
    { cert: 'GDPR', cells: ['covered', 'covered', 'covered', 'covered', 'covered'] },
    { cert: 'EU AI Act', cells: ['covered', 'covered', 'covered', 'covered', 'na'] },
  ]
  const colHeaders = ['Access Control', 'Encryption', 'Incident Resp.', 'Audit Logs', 'Data Residency']

  const coverageStyle = (c: Coverage): React.CSSProperties => {
    if (c === 'covered') return { background: 'var(--sem-ok-bg)', color: 'var(--sem-ok-fg)' }
    if (c === 'partial') return { background: 'var(--sem-warn-bg)', color: 'var(--sem-warn-fg)' }
    return { background: 'var(--canvas-inset)', color: 'var(--fg-muted)' }
  }
  const coverageLabel = (c: Coverage) => c === 'covered' ? '✓' : c === 'partial' ? 'Partial' : 'N/A'

  // Threat model data
  const tmAssets = ['RFP Documents', 'User PII', 'LLM Prompts', 'API Credentials', 'Vector Embeddings']
  const tmThreats = ['Document exfiltration', 'PII exposure', 'Prompt injection', 'Credential theft', 'Model poisoning']
  const tmMitigations = ['AES-256 + RBAC', 'Anon. before LLM', 'Schema validation', 'Vault + rotation', 'Signed embeddings']
  const tmYs = [60, 110, 160, 210, 260]
  const boxH = 30, boxW = 130

  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Security Posture</span>
            <span className="overview-stat-value">Enterprise-Grade</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Data Encryption</span>
            <span className="overview-stat-value">AES-256 at Rest &amp; Transit</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Access Control</span>
            <span className="overview-stat-value">Role-Based (RBAC)</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Audit Logging</span>
            <span className="overview-stat-value">Full Event Trail</span>
          </div>
        </div>
      </div>

      {show('4.1') && (<>
      {/* 4.1 Security Model */}
      <div className="rfp-section-heading" id="4.1">Security Model</div>

      {/* Defense-in-Depth layered diagram */}
      <div className="overview-grid">
      <div className="overview-card">
        <div className="overview-card-header">
          <span className="overview-card-icon">🛡</span>
          Defense-in-Depth — Five Security Layers
        </div>
        <svg viewBox="0 0 560 178" style={{ width: '100%', display: 'block', margin: '12px auto 0' }}>
          {/* Circles: cx=200 cy=89, radii ~0.8× previous */}
          {[
            { label: 'Perimeter',   fill: '#FEF2F2', stroke: '#FCA5A5', text: '#991B1B', r: 83 },
            { label: 'Network',     fill: '#FFF7ED', stroke: '#FCD34D', text: '#92400E', r: 66 },
            { label: 'Application', fill: '#EFF6FF', stroke: '#93C5FD', text: '#1E40AF', r: 49 },
            { label: 'Data',        fill: '#F0FDF4', stroke: '#86EFAC', text: '#065F46', r: 32 },
            { label: 'Monitoring',  fill: '#F5F3FF', stroke: '#C4B5FD', text: '#5B21B6', r: 15 },
          ].map(layer => (
            <circle key={layer.label} cx={200} cy={89} r={layer.r} fill={layer.fill} stroke={layer.stroke} strokeWidth="0.75" />
          ))}

          {/* Ring labels at −30° */}
          {[
            { label: 'Perimeter',   text: '#991B1B', r: 83 },
            { label: 'Network',     text: '#92400E', r: 66 },
            { label: 'Application', text: '#1E40AF', r: 49 },
            { label: 'Data',        text: '#065F46', r: 32 },
          ].map(layer => {
            const rad = (-30 * Math.PI) / 180
            const lx = 200 + layer.r * Math.cos(rad)
            const ly = 89  + layer.r * Math.sin(rad)
            return (
              <text key={layer.label} x={lx} y={ly} textAnchor="middle" fontSize="4.5" fontWeight="700" fill={layer.text}>
                {layer.label}
              </text>
            )
          })}

          {/* Centre label */}
          <text x={200} y={86} textAnchor="middle" fontSize="4" fontWeight="700" fill="#5B21B6">Monitoring</text>
          <text x={200} y={93} textAnchor="middle" fontSize="4" fill="#5B21B6">SOC 24/7</text>

          {/* Legend — 5 rows, step 26px, rect height 21px */}
          {[
            { label: 'Perimeter',   sub: 'WAF · DDoS · Front Door',           fill: '#FEF2F2', stroke: '#FCA5A5', text: '#991B1B' },
            { label: 'Network',     sub: 'Private Subnets · NSGs · IDS',       fill: '#FFF7ED', stroke: '#FCD34D', text: '#92400E' },
            { label: 'Application', sub: 'MFA · RBAC · Input Validation',      fill: '#EFF6FF', stroke: '#93C5FD', text: '#1E40AF' },
            { label: 'Data',        sub: 'AES-256 · TLS 1.3 · Field Encryption', fill: '#F0FDF4', stroke: '#86EFAC', text: '#065F46' },
            { label: 'Monitoring',  sub: 'SIEM · Audit Logs · SOC 24/7',       fill: '#F5F3FF', stroke: '#C4B5FD', text: '#5B21B6' },
          ].map((item, i) => {
            const lx = 360, ly = 21 + i * 26
            return (
              <g key={item.label}>
                <rect x={lx} y={ly} width={84} height={21} rx="4" fill={item.fill} stroke={item.stroke} strokeWidth="0.75" />
                <text x={lx + 8} y={ly + 9}  fontSize="5.5" fontWeight="700" fill={item.text}>{item.label}</text>
                <text x={lx + 8} y={ly + 17} fontSize="4.5" fill={item.text} opacity="0.85">{item.sub}</text>
              </g>
            )
          })}

          {/* Connecting lines */}
          {[83, 66, 49, 32, 15].map((r, i) => (
            <line
              key={i}
              x1={360}     y1={21 + i * 26 + 10}
              x2={200 + r} y2={89}
              stroke="#D1D5DB" strokeWidth="0.5" strokeDasharray="3 3"
            />
          ))}
        </svg>
        <div style={{ fontSize: '11px', color: 'var(--text-muted, #6B7280)', textAlign: 'center', marginTop: '4px', marginBottom: '8px' }}>
          Every layer is independently verified — outer breach does not compromise inner assets.
        </div>
      </div>
      </div>

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
          <table className="overview-table">
            <thead>
              <tr>
                <th>Control</th>
                <th>Implementation</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Web Application Firewall</td>
                <td>Azure Front Door WAF with OWASP Top 10 ruleset and custom Meridian rules.</td>
                <td><span className="overview-badge overview-badge--ok">Active</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">DDoS Protection</td>
                <td>Azure DDoS Protection Standard — automatic attack mitigation, $1M SLA-backed availability guarantee.</td>
                <td><span className="overview-badge overview-badge--ok">Active</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Network Segmentation</td>
                <td>Private subnets per tier (web / app / data). No public internet access to database layer. NSGs with allowlist-only rules.</td>
                <td><span className="overview-badge overview-badge--ok">Active</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Intrusion Detection</td>
                <td>Microsoft Sentinel SIEM with 24/7 SOC monitoring. Alert SLA: Critical ≤ 15 min, High ≤ 1 hr.</td>
                <td><span className="overview-badge overview-badge--ok">Active</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Vulnerability Management</td>
                <td>Weekly automated scans (Qualys). Critical CVEs patched within 24 hours, High within 72 hours.</td>
                <td><span className="overview-badge overview-badge--ok">Active</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Container Security</td>
                <td>Trivy image scanning in CI/CD. Runtime protection via Defender for Containers.</td>
                <td><span className="overview-badge overview-badge--warn">Pilot</span></td>
              </tr>
            </tbody>
          </table>
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

        {/* Compliance Coverage Matrix — first card */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✓</span>
            Compliance Coverage Matrix
          </div>
          <table className="compliance-matrix" style={{ width: '100%', fontSize: 'var(--font-size-sm)', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '6px', border: '1px solid var(--border)', textAlign: 'left', background: 'var(--canvas-subtle)', color: 'var(--fg)', fontSize: 'var(--font-size-sm)' }}></th>
                {colHeaders.map((h) => (
                  <th key={h} style={{ padding: '6px', border: '1px solid var(--border)', textAlign: 'center', background: 'var(--canvas-subtle)', color: 'var(--fg)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {certRows.map((row, ri) => {
                const isLast = ri === certRows.length - 1
                const cellBorder = isLast
                  ? { borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }
                  : { border: '1px solid var(--border)' }
                return (
                <tr key={row.cert}>
                  <td style={{ padding: '6px', ...cellBorder, fontWeight: 600, whiteSpace: 'nowrap', fontSize: 'var(--font-size-sm)', color: (row.cert === 'GDPR' || row.cert === 'SOC 2 Type II' || row.cert === 'ISO 27001' || row.cert === 'EU AI Act') ? 'var(--accent, #0969da)' : 'var(--fg)', cursor: (row.cert === 'GDPR' || row.cert === 'SOC 2 Type II' || row.cert === 'ISO 27001' || row.cert === 'EU AI Act') ? 'pointer' : undefined, textDecoration: (row.cert === 'GDPR' || row.cert === 'SOC 2 Type II' || row.cert === 'ISO 27001' || row.cert === 'EU AI Act') ? 'underline' : undefined }} onClick={row.cert === 'GDPR' ? () => navigate('/security-compliance/certifications-standards/gdpr') : row.cert === 'SOC 2 Type II' ? () => navigate('/security-compliance/certifications-standards/soc2') : row.cert === 'ISO 27001' ? () => navigate('/security-compliance/certifications-standards/iso27001') : row.cert === 'EU AI Act' ? () => navigate('/security-compliance/certifications-standards/euai') : undefined}>{row.cert}</td>
                  {row.cells.map((c, ci) => (
                    <td key={ci} style={{ padding: '6px', ...cellBorder, textAlign: 'center', ...coverageStyle(c) }}>
                      {coverageLabel(c)}
                    </td>
                  ))}
                </tr>
                )
              })}
            </tbody>
          </table>
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
              <tr style={{ borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                <td className="overview-table-label">Security Training</td>
                <td>Mandatory annual awareness training. Phishing simulation quarterly. Role-specific training for developers (OWASP, secure SDLC).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}

      {show('4.3') && (<>
      {/* 4.3 Threat Model Overview */}
      <div className="rfp-section-heading" id="4.3">Threat Model Overview</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">⚠</span>
            Assets → Threats → Mitigations
          </div>
          <svg viewBox="0 0 600 320" style={{ width: '100%', display: 'block' }}>
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#9CA3AF" />
              </marker>
            </defs>

            {/* Column headers */}
            {[
              { x: 60, label: 'Assets' },
              { x: 280, label: 'Threats' },
              { x: 500, label: 'Mitigations' },
            ].map(col => (
              <g key={col.label}>
                <rect
                  x={col.x - 65}
                  y={10}
                  width={boxW}
                  height={30}
                  rx={4}
                  fill="#F3F4F6"
                  stroke="#D1D5DB"
                  strokeWidth="1"
                />
                <text
                  x={col.x}
                  y={30}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#374151"
                >
                  {col.label}
                </text>
              </g>
            ))}

            {/* Rows */}
            {tmYs.map((y, i) => {
              const midY = y + boxH / 2
              return (
                <g key={i}>
                  {/* Asset box */}
                  <rect x={60 - 65} y={y} width={boxW} height={boxH} rx={4} fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1" />
                  <text x={60} y={y + 19} textAnchor="middle" fontSize="11" fill="#1E40AF">{tmAssets[i]}</text>

                  {/* Threat box */}
                  <rect x={280 - 65} y={y} width={boxW} height={boxH} rx={4} fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1" />
                  <text x={280} y={y + 19} textAnchor="middle" fontSize="11" fill="#991B1B">{tmThreats[i]}</text>

                  {/* Mitigation box */}
                  <rect x={500 - 65} y={y} width={boxW} height={boxH} rx={4} fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
                  <text x={500} y={y + 19} textAnchor="middle" fontSize="11" fill="#065F46">{tmMitigations[i]}</text>

                  {/* Asset → Threat arrow */}
                  <line
                    x1={60 - 65 + boxW}
                    y1={midY}
                    x2={280 - 65 - 4}
                    y2={midY}
                    stroke="#9CA3AF"
                    strokeWidth="1"
                    markerEnd="url(#arrowhead)"
                  />

                  {/* Threat → Mitigation arrow */}
                  <line
                    x1={280 - 65 + boxW}
                    y1={midY}
                    x2={500 - 65 - 4}
                    y2={midY}
                    stroke="#9CA3AF"
                    strokeWidth="1"
                    markerEnd="url(#arrowhead)"
                  />
                </g>
              )
            })}
          </svg>
        </div>
      </div>
      </>)}
    </div>
  )
}
