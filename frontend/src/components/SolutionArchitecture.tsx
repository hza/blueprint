export function SolutionArchitecture({ subsection }: { subsection?: string }) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
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
      {/* 3.3 Integration & Data */}
      <div className="rfp-section-heading" id="3.3">Integration &amp; Data</div>
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
