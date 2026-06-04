import { useState } from 'react'

export function SolutionArchitecture({ subsection }: { subsection?: string }) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  const [diagramScale, setDiagramScale] = useState(70)
  const scaleStep = 10
  const scaleMin = 30
  const scaleMax = 100
  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">3. Solution Architecture</div>
            <div className="overview-banner-client">Meridian Public Services · ERP Modernisation · RFP-2025-0042</div>
          </div>
          <span className="overview-badge overview-badge--ok">REVIEWED</span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Platform</span>
            <span className="overview-stat-value">Meridian ERP v5.2</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Cloud</span>
            <span className="overview-stat-value">Azure (AU East + SE)</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Integrations</span>
            <span className="overview-stat-value">11 systems</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Availability SLA</span>
            <span className="overview-stat-value overview-stat-score--ok">99.9%</span>
          </div>
        </div>
      </div>

      {show('3.1') && (<>
      {/* 3.1 Architecture Overview */}
      <div className="rfp-section-heading" id="3.1">Architecture Overview</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🏗</span>
            System Architecture — Layers
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Layer</th>
                <th>Technology</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Presentation</td>
                <td>React 18 + TypeScript · Progressive Web App</td>
                <td>WCAG 2.1 AA. Responsive. Works offline (service workers). Native mobile apps (iOS/Android) via React Native.</td>
              </tr>
              <tr>
                <td className="overview-table-label">API Gateway</td>
                <td>Azure API Management</td>
                <td>Rate limiting, OAuth 2.0 / OIDC token validation, request logging, versioning. OpenAPI 3.0 published spec.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Application Services</td>
                <td>.NET 8 microservices on AKS (Kubernetes)</td>
                <td>Domain-aligned services: Finance, HR, Procurement, Assets, Reporting. Event-driven via Azure Service Bus.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Integration Bus</td>
                <td>Azure Integration Services (Logic Apps + Service Bus)</td>
                <td>Adapter pattern for all external system connectors. Retry, dead-letter, and circuit-breaker policies.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Data</td>
                <td>Azure SQL (OLTP) + Azure Synapse (Analytics)</td>
                <td>Row-level security. TDE. Geo-redundant. Point-in-time restore. OLAP layer for reporting without impacting OLTP.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Identity</td>
                <td>Azure Active Directory B2C + Entra ID</td>
                <td>SSO with Meridian AAD. SAML 2.0 / OIDC. MFA enforced. Conditional Access policies.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Infrastructure</td>
                <td>Infrastructure-as-Code (Terraform + Azure Bicep)</td>
                <td>Full IaC. Environments (dev/staging/prod) provisioned identically. DR failover tested quarterly.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Observability</td>
                <td>Azure Monitor + Application Insights + Prometheus/Grafana</td>
                <td>Distributed tracing, real-time dashboards, automated alerting, SLA monitoring. Dashboard read-access for Meridian IT.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">⚡</span>
            Non-Functional Targets (SLA)
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Availability</td>
                <td><span className="overview-badge overview-badge--ok">99.9% / month</span> — Planned maintenance windows excluded. Maximum 43 minutes/month unplanned downtime.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Response Time</td>
                <td>p95 ≤ 2s for all read operations under peak load (500 concurrent users). p99 ≤ 5s. Batch operations excluded.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Throughput</td>
                <td>500 concurrent users sustained. Burst to 800 for up to 30 minutes (e.g., payroll run day). Auto-scaling responds within 90 seconds.</td>
              </tr>
              <tr>
                <td className="overview-table-label">RTO / RPO</td>
                <td>RTO: 4 hours (P1 outage). RPO: 1 hour (maximum data loss). Geo-redundant active-passive configuration (Sydney primary, Melbourne DR).</td>
              </tr>
              <tr>
                <td className="overview-table-label">Data Retention</td>
                <td>7 years (financial records, per FMA). Configurable per data class. Automated purge policies with approval gate.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Scalability</td>
                <td>Horizontal pod autoscaling in AKS. Database elastic pools. Designed for 3× current user load without re-architecture.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🔧</span>
            DevOps &amp; CI/CD Pipeline
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Source Control</td>
                <td>Azure DevOps Git. Trunk-based development. Feature branch model. Meridian gets read access to repository throughout.</td>
              </tr>
              <tr>
                <td className="overview-table-label">CI Pipeline</td>
                <td>Build → Unit Tests → Integration Tests → SAST (SonarQube) → DAST (OWASP ZAP) → Container scan (Trivy) → Staging deploy. Runs on every PR merge. Failure blocks deployment.</td>
              </tr>
              <tr>
                <td className="overview-table-label">CD Pipeline</td>
                <td>Blue/green deployments to production. Zero-downtime releases. Automatic rollback on overview-check failure. CAB approval gate before prod deploy.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Environments</td>
                <td>Dev / Test / UAT / Staging / Production — all provisioned via IaC with identical configuration. UAT environment handed to Meridian for independent testing.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Release Cadence</td>
                <td>Production releases quarterly (or as agreed with CAB). Hot-fix releases: emergency patch within 24 hours for P1 security vulnerabilities.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('3.2') && (<>
      {/* 3.2 Functional Scope */}
      <div className="rfp-section-heading" id="3.2">Functional Scope</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📦</span>
            Modules in Scope
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Module</th>
                <th>Key Features</th>
                <th>Delivery Phase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Finance &amp; Accounting</td>
                <td>GL, AP, AR, bank reconciliation (ANZ/NAB/WBC), budget management, AASB reporting, financial statements, cost centre allocation</td>
                <td>Phase 2</td>
              </tr>
              <tr>
                <td className="overview-table-label">Human Resources</td>
                <td>Employee lifecycle, onboarding workflows, leave management, timesheets, workforce planning, performance reviews, ADP payroll integration</td>
                <td>Phase 2</td>
              </tr>
              <tr>
                <td className="overview-table-label">Procurement</td>
                <td>Requisitions, PO workflow, supplier portal, 3-way invoice match, contract repository, PEPPOL eInvoicing, spend analytics</td>
                <td>Phase 2</td>
              </tr>
              <tr>
                <td className="overview-table-label">Asset Management</td>
                <td>Asset register, lifecycle tracking, maintenance scheduling, depreciation (AASB 116), disposal workflows, mobile field inspections, GIS map view</td>
                <td style={{whiteSpace: 'nowrap'}}>Phase 3</td>
              </tr>
              <tr>
                <td className="overview-table-label">Reporting &amp; Analytics</td>
                <td>Power BI embedded dashboards, self-service report builder, scheduled distribution, financial close pack automation, Crystal Reports migration toolkit</td>
                <td>Phase 2 + Phase 4</td>
              </tr>
              <tr>
                <td className="overview-table-label">Document Management</td>
                <td>SharePoint Online integration, document linking to transactions, e-signature (DocuSign), version control, retention tagging</td>
                <td style={{whiteSpace: 'nowrap'}}>Phase 3</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✗</span>
            Out of Scope
          </div>
          <ul className="overview-checklist">
            <li className="overview-check overview-check--fail">
              <span className="overview-check-icon" />
              <strong>CRM / Customer Management</strong> — Not included in RFP scope. Meridian's existing Salesforce instance will be retained.
            </li>
            <li className="overview-check overview-check--fail">
              <span className="overview-check-icon" />
              <strong>Project Portfolio Management (PPM)</strong> — Meridian uses MS Project Online. ERP will integrate (read financial actuals) but not replace PPM.
            </li>
            <li className="overview-check overview-check--fail">
              <span className="overview-check-icon" />
              <strong>Payroll Processing Engine</strong> — ADP retained as payroll system of record. ERP manages HR data and syncs to ADP; payroll calculations remain in ADP.
            </li>
            <li className="overview-check overview-check--fail">
              <span className="overview-check-icon" />
              <strong>Legacy Archive Migration</strong> — Historical data older than 7 years will be archived but not migrated to the active system. Read-only archive access via existing tools.
            </li>
          </ul>
        </div>
      </div>

      </>)}

      {show('3.3') && (<>
      {/* 3.3 Roles & Integrations */}
      <div className="rfp-section-heading" id="3.3">Roles &amp; Integrations</div>

      {/* C4 Level 1 — Context Diagram */}
      <div className="overview-grid">
        <div className="overview-card" style={{gridColumn: '1 / -1'}}>
          <div className="overview-card-header">
            <span className="overview-card-icon">🗺</span>
            C4 Level 1 — System Context
          </div>
          <div style={{position: 'relative', overflowX: 'auto', padding: '1rem 0', display: 'flex', justifyContent: 'center'}}>
            <div style={{position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--card-bg, #fff)', border: '1px solid var(--border, #e5e7eb)', borderRadius: '6px', padding: '2px 6px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', zIndex: 1}}>
              <button onClick={() => setDiagramScale(s => Math.max(scaleMin, s - scaleStep))} style={{border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '2px 4px', color: 'var(--text, #374151)'}}>−</button>
              <span style={{fontSize: '0.75rem', minWidth: '2.5rem', textAlign: 'center', color: 'var(--text-secondary, #6b7280)'}}>{diagramScale}%</span>
              <button onClick={() => setDiagramScale(s => Math.min(scaleMax, s + scaleStep))} style={{border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '2px 4px', color: 'var(--text, #374151)'}}>+</button>
            </div>
            <svg viewBox="0 0 900 460" style={{width: `${diagramScale}%`, minWidth: 320, fontFamily: 'inherit'}} aria-label="C4 Level 1 System Context diagram">
              {/* styles */}
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#6b7280"/>
                </marker>
              </defs>
              {/* Central system box */}
              <rect x="340" y="175" width="220" height="110" rx="6" fill="#1d4ed8" stroke="#1e40af" strokeWidth="2"/>
              <text x="450" y="220" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">Meridian ERP</text>
              <text x="450" y="238" textAnchor="middle" fill="#bfdbfe" fontSize="10">[Software System]</text>
              <text x="450" y="256" textAnchor="middle" fill="#bfdbfe" fontSize="10">Custom ERP on Azure</text>
              <text x="450" y="272" textAnchor="middle" fill="#bfdbfe" fontSize="10">(AKS · Azure SQL · Service Bus)</text>

              {/* Users */}
              {/* Finance Officer */}
              <circle cx="90" cy="80" r="22" fill="none" stroke="#374151" strokeWidth="1.5"/>
              <line x1="90" y1="102" x2="90" y2="140" stroke="#374151" strokeWidth="1.5"/>
              <line x1="90" y1="115" x2="65" y2="130" stroke="#374151" strokeWidth="1.5"/>
              <line x1="90" y1="115" x2="115" y2="130" stroke="#374151" strokeWidth="1.5"/>
              <line x1="90" y1="140" x2="70" y2="165" stroke="#374151" strokeWidth="1.5"/>
              <line x1="90" y1="140" x2="110" y2="165" stroke="#374151" strokeWidth="1.5"/>
              <text x="90" y="185" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">Finance Officer</text>
              <text x="90" y="198" textAnchor="middle" fill="#6b7280" fontSize="10">[Person]</text>
              <line x1="130" y1="130" x2="335" y2="218" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>
              <text x="215" y="162" textAnchor="middle" fill="#6b7280" fontSize="9">GL · AP · AR</text>

              {/* HR Manager */}
              <circle cx="90" cy="280" r="22" fill="none" stroke="#374151" strokeWidth="1.5"/>
              <line x1="90" y1="302" x2="90" y2="340" stroke="#374151" strokeWidth="1.5"/>
              <line x1="90" y1="315" x2="65" y2="330" stroke="#374151" strokeWidth="1.5"/>
              <line x1="90" y1="315" x2="115" y2="330" stroke="#374151" strokeWidth="1.5"/>
              <line x1="90" y1="340" x2="70" y2="365" stroke="#374151" strokeWidth="1.5"/>
              <line x1="90" y1="340" x2="110" y2="365" stroke="#374151" strokeWidth="1.5"/>
              <text x="90" y="385" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">HR Manager</text>
              <text x="90" y="398" textAnchor="middle" fill="#6b7280" fontSize="10">[Person]</text>
              <line x1="130" y1="330" x2="335" y2="265" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>
              <text x="215" y="305" textAnchor="middle" fill="#6b7280" fontSize="9">HR · Leave · Timesheets</text>

              {/* Procurement Officer */}
              <circle cx="810" cy="80" r="22" fill="none" stroke="#374151" strokeWidth="1.5"/>
              <line x1="810" y1="102" x2="810" y2="140" stroke="#374151" strokeWidth="1.5"/>
              <line x1="810" y1="115" x2="785" y2="130" stroke="#374151" strokeWidth="1.5"/>
              <line x1="810" y1="115" x2="835" y2="130" stroke="#374151" strokeWidth="1.5"/>
              <line x1="810" y1="140" x2="790" y2="165" stroke="#374151" strokeWidth="1.5"/>
              <line x1="810" y1="140" x2="830" y2="165" stroke="#374151" strokeWidth="1.5"/>
              <text x="810" y="185" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">Procurement Officer</text>
              <text x="810" y="198" textAnchor="middle" fill="#6b7280" fontSize="10">[Person]</text>
              <line x1="770" y1="130" x2="565" y2="218" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>
              <text x="685" y="162" textAnchor="middle" fill="#6b7280" fontSize="9">PO · Supplier Portal</text>

              {/* IT Admin */}
              <circle cx="810" cy="280" r="22" fill="none" stroke="#374151" strokeWidth="1.5"/>
              <line x1="810" y1="302" x2="810" y2="340" stroke="#374151" strokeWidth="1.5"/>
              <line x1="810" y1="315" x2="785" y2="330" stroke="#374151" strokeWidth="1.5"/>
              <line x1="810" y1="315" x2="835" y2="330" stroke="#374151" strokeWidth="1.5"/>
              <line x1="810" y1="340" x2="790" y2="365" stroke="#374151" strokeWidth="1.5"/>
              <line x1="810" y1="340" x2="830" y2="365" stroke="#374151" strokeWidth="1.5"/>
              <text x="810" y="385" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">IT Admin</text>
              <text x="810" y="398" textAnchor="middle" fill="#6b7280" fontSize="10">[Person]</text>
              <line x1="770" y1="330" x2="565" y2="265" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>
              <text x="685" y="305" textAnchor="middle" fill="#6b7280" fontSize="9">Config · Audit logs</text>

              {/* External systems row */}
              {/* Azure AD */}
              <rect x="20" y="390" width="130" height="52" rx="4" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5"/>
              <text x="85" y="413" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">Azure AD</text>
              <text x="85" y="428" textAnchor="middle" fill="#6b7280" fontSize="9">[External System]</text>
              <text x="85" y="440" textAnchor="middle" fill="#6b7280" fontSize="9">SSO / OIDC</text>
              <line x1="150" y1="416" x2="338" y2="285" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>

              {/* ADP */}
              <rect x="185" y="390" width="130" height="52" rx="4" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5"/>
              <text x="250" y="413" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">ADP</text>
              <text x="250" y="428" textAnchor="middle" fill="#6b7280" fontSize="9">[External System]</text>
              <text x="250" y="440" textAnchor="middle" fill="#6b7280" fontSize="9">Payroll sync</text>
              <line x1="315" y1="416" x2="380" y2="285" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>

              {/* Banking */}
              <rect x="350" y="390" width="130" height="52" rx="4" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5"/>
              <text x="415" y="413" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">Banks (Basiq)</text>
              <text x="415" y="428" textAnchor="middle" fill="#6b7280" fontSize="9">[External System]</text>
              <text x="415" y="440" textAnchor="middle" fill="#6b7280" fontSize="9">Open Banking API</text>
              <line x1="415" y1="390" x2="430" y2="285" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>

              {/* Power BI */}
              <rect x="515" y="390" width="130" height="52" rx="4" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5"/>
              <text x="580" y="413" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">Power BI</text>
              <text x="580" y="428" textAnchor="middle" fill="#6b7280" fontSize="9">[External System]</text>
              <text x="580" y="440" textAnchor="middle" fill="#6b7280" fontSize="9">Embedded reporting</text>
              <line x1="565" y1="390" x2="520" y2="285" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>

              {/* SharePoint */}
              <rect x="680" y="390" width="130" height="52" rx="4" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5"/>
              <text x="745" y="413" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">SharePoint</text>
              <text x="745" y="428" textAnchor="middle" fill="#6b7280" fontSize="9">[External System]</text>
              <text x="745" y="440" textAnchor="middle" fill="#6b7280" fontSize="9">Documents · Graph API</text>
              <line x1="745" y1="390" x2="560" y2="285" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,3"/>
            </svg>
          </div>
          <p style={{fontSize: '0.8rem', color: 'var(--text-secondary, #6b7280)', marginTop: '0.5rem'}}>
            C4 Model — Level 1 (System Context). Dashed lines show data flows between people, the ERP, and key external systems.
          </p>
        </div>
      </div>

      {/* Roles table */}
      <div className="overview-grid">
        <div className="overview-card" style={{gridColumn: '1 / -1'}}>
          <div className="overview-card-header">
            <span className="overview-card-icon">👥</span>
            User Roles &amp; Access Model
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Who holds it</th>
                <th>Modules accessed</th>
                <th>Permission level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Finance Officer</td>
                <td>Accounts payable / receivable staff</td>
                <td>GL, AP, AR, Bank Reconciliation, Reporting</td>
                <td>Create · Edit · Approve (own cost centre)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Finance Manager</td>
                <td>CFO direct reports, budget owners</td>
                <td>GL, AP, AR, Budget Management, Reporting, Audit Trail</td>
                <td>Full Finance module + cross–cost-centre approval</td>
              </tr>
              <tr>
                <td className="overview-table-label">HR Officer</td>
                <td>HR generalists, payroll coordinators</td>
                <td>Employee Lifecycle, Leave, Timesheets, ADP sync</td>
                <td>Create · Edit employee records (no salary data)</td>
              </tr>
              <tr>
                <td className="overview-table-label">HR Manager</td>
                <td>HR Director, HR BPs</td>
                <td>All HR modules including salary bands and performance</td>
                <td>Full HR module + workforce analytics read</td>
              </tr>
              <tr>
                <td className="overview-table-label">Procurement Officer</td>
                <td>Buyers, category managers</td>
                <td>Requisitions, PO Workflow, Supplier Portal, eInvoicing</td>
                <td>Create POs up to delegated authority threshold</td>
              </tr>
              <tr>
                <td className="overview-table-label">Asset Officer</td>
                <td>Infrastructure, facilities, fleet staff</td>
                <td>Asset Register, Maintenance Scheduling, GIS View</td>
                <td>Create · Edit · Close work orders</td>
              </tr>
              <tr>
                <td className="overview-table-label">Report Viewer</td>
                <td>Executive leadership, board members</td>
                <td>Power BI dashboards, Financial Close Pack</td>
                <td>Read-only — no transactional access</td>
              </tr>
              <tr>
                <td className="overview-table-label">System Administrator</td>
                <td>Meridian IT team (2–3 staff)</td>
                <td>All modules + config, audit log, user management</td>
                <td>Full admin — MFA enforced, all actions logged</td>
              </tr>
              <tr>
                <td className="overview-table-label">Read-Only Auditor</td>
                <td>Internal audit, external auditors (time-limited)</td>
                <td>GL, AP, AR, Procurement, Audit Trail</td>
                <td>Read-only — time-boxed access provisioned per engagement</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🔗</span>
            Integration Map
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>System</th>
                <th>Direction</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Azure Active Directory</td>
                <td>↔ Bi-directional</td>
                <td>SAML 2.0 / OIDC SSO</td>
                <td><span className="overview-badge overview-badge--ok">Pre-built</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">ADP WorkforceNow (Payroll)</td>
                <td>↔ Bi-directional</td>
                <td>ADP API v2.0</td>
                <td><span className="overview-badge overview-badge--ok">Pre-built</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">ANZ / NAB / WBC (Banking)</td>
                <td>← Inbound</td>
                <td>Basiq Open Banking API</td>
                <td><span className="overview-badge overview-badge--ok">Pre-built</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">ATO eInvoicing (PEPPOL)</td>
                <td>↔ Bi-directional</td>
                <td>PEPPOL Access Point</td>
                <td><span className="overview-badge overview-badge--ok">Pre-built</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">SharePoint Online</td>
                <td>↔ Bi-directional</td>
                <td>Microsoft Graph API</td>
                <td><span className="overview-badge overview-badge--ok">Pre-built</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Power BI (Reporting)</td>
                <td>→ Outbound</td>
                <td>Power BI Embedded SDK</td>
                <td><span className="overview-badge overview-badge--ok">Pre-built</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">DocuSign (eSignature)</td>
                <td>↔ Bi-directional</td>
                <td>DocuSign eSignature REST API</td>
                <td><span className="overview-badge overview-badge--ok">Pre-built</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Esri ArcGIS (GIS / Maps)</td>
                <td>← Inbound</td>
                <td>ArcGIS REST Services</td>
                <td><span className="overview-badge overview-badge--ok">Pre-built</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">MS Project Online (PPM)</td>
                <td>→ Outbound</td>
                <td>Graph API — read financial actuals</td>
                <td><span className="overview-badge overview-badge--warn">Phase 3</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Aurion HR (Legacy)</td>
                <td>← Inbound (migration only)</td>
                <td>Direct DB extract + API</td>
                <td><span className="overview-badge overview-badge--warn">Phase 1 + 3</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">TechCore v4 Framework</td>
                <td>↔ Bi-directional</td>
                <td>Custom adapter (REST)</td>
                <td><span className="overview-badge overview-badge--warn">Phase 3 (custom)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('3.4') && (<>
      {/* 3.4 Non-Functional Requirements */}
      <div className="rfp-section-heading" id="3.4">Non-Functional Requirements</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📊</span>
            NFR Compliance Matrix
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Requirement</th>
                <th>What You're Guaranteed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Performance</td>
                <td>p95 response ≤ 3 seconds at 500 concurrent users</td>
                <td>p95 ≤ 2s target (better than required). Validated by load test at Phase 2 gate.</td>
                <td><span className="overview-badge overview-badge--ok">Exceeded</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Availability</td>
                <td>99.5% monthly availability during business hours</td>
                <td>99.9% SLA (better than required). Geo-redundant failover.</td>
                <td><span className="overview-badge overview-badge--ok">Exceeded</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Scalability</td>
                <td>Support 100% user growth without re-architecture</td>
                <td>Designed for 3× current load. Kubernetes autoscaling. Elastic database pools.</td>
                <td><span className="overview-badge overview-badge--ok">Exceeded</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Maintainability</td>
                <td>System documentation must be maintained and current</td>
                <td>Automated API docs (Swagger), ADRs in Confluence, IaC in version control. All updated within 10 days of any change.</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Accessibility</td>
                <td>WCAG 2.1 AA compliance</td>
                <td>axe-core automated checks in CI. Manual screen-reader testing per phase. WCAG 2.1 AA certified before each go-live.</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Browser Support</td>
                <td>Chrome, Edge, Firefox, Safari (last 2 versions)</td>
                <td>Full support for all 4 browsers, last 2 versions. Automated cross-browser testing via Playwright.</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
              <tr>
                <td className="overview-table-label">Localisation</td>
                <td>Australian date, currency, and number formats</td>
                <td>All formatting uses Australian locale (en-AU). Configurable per user profile. GST-aware calculations throughout.</td>
                <td><span className="overview-badge overview-badge--ok">Met</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('3.5') && (<>
      {/* 3.5 Acceptance Criteria */}
      <div className="rfp-section-heading" id="3.5">Acceptance Criteria</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✅</span>
            Phase Acceptance Gates
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Phase</th>
                <th>Criterion</th>
                <th>Measurement</th>
                <th>Approver</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Phase 1 — Foundation</td>
                <td>Infrastructure provisioned and environments stable</td>
                <td>All CI pipelines green for 5 consecutive business days; dev, test, and UAT environments accessible to Meridian team</td>
                <td>Meridian IT Director</td>
              </tr>
              <tr>
                <td className="overview-table-label">Phase 2 — Core ERP</td>
                <td>All in-scope functional requirements delivered and UAT-passed</td>
                <td>≥ 95% of agreed user stories accepted in UAT; zero open P1/P2 defects; load test confirms p95 ≤ 2s at 500 concurrent users</td>
                <td>Meridian Project Sponsor</td>
              </tr>
              <tr>
                <td className="overview-table-label">Phase 3 — Extended Modules</td>
                <td>Asset Management and Document Management live with data migrated</td>
                <td>Asset register reconciled to legacy data (≤ 0.1% variance); all documents accessible; GIS map view verified by field team</td>
                <td>Meridian Operations Lead</td>
              </tr>
              <tr>
                <td className="overview-table-label">Phase 4 — Analytics</td>
                <td>All contracted Power BI dashboards delivered and signed off</td>
                <td>Each dashboard reviewed in UAT and approved by named business owner; financial close pack automation reduces manual effort by ≥ 50%</td>
                <td>Meridian CFO</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📋</span>
            System-Wide Acceptance Conditions
          </div>
          <ul className="overview-checklist">
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Security sign-off</strong> — Independent penetration test completed with no critical or high findings unresolved. IRAP assessment report provided to Meridian before go-live.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Data integrity</strong> — Migrated data reconciliation report accepted by Meridian Finance team. Row counts, totals, and spot-check samples within agreed tolerances.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Disaster recovery rehearsal</strong> — Full DR failover test executed and RTO ≤ 4 hours confirmed. Test results and sign-off documented.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Training completion</strong> — ≥ 90% of nominated end-users complete role-based training before go-live. Completion report provided to Meridian HR.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Documentation handover</strong> — System administration guide, user manuals, API documentation, and runbooks delivered and acknowledged by Meridian IT.
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <strong>Hypercare sign-off</strong> — 30-day hypercare period completed with no open P1 defects. Formal transition to BAU support acknowledged in writing by both parties.
            </li>
          </ul>
        </div>
      </div>

      </>)}

    </div>
  )
}
