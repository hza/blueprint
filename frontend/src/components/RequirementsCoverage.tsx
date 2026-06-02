export function RequirementsCoverage({ subsection }: { subsection?: string }) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  return (
    <div className="rfp-health">
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">2. Requirements Coverage</div>
            <div className="overview-banner-client">Meridian Public Services · ERP Modernisation · RFP-2025-0042</div>
          </div>
          <span className="health-badge health-badge--warn">2 GAPS</span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Total Requirements</span>
            <span className="overview-stat-value">87</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Fully Met</span>
            <span className="overview-stat-value overview-stat-score--ok">79</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Partially Met</span>
            <span className="overview-stat-value overview-stat-score--warn">6</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Not Met</span>
            <span className="overview-stat-value health-val--danger">2</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Coverage</span>
            <span className="overview-stat-value overview-stat-score--ok">97.7%</span>
          </div>
        </div>
      </div>

      {show('2.1') && (<>
      {/* 2.1 Requirements Summary */}
      <div className="rfp-section-heading" id="2.1">Requirements Summary</div>
      <div className="health-grid">
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">📋</span>
            Requirements by Domain
          </div>
          <table className="health-table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Total</th>
                <th>Mandatory</th>
                <th>Fully Met</th>
                <th>Partial</th>
                <th>Gap</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="health-table-label">Finance &amp; Accounting</td>
                <td>22</td>
                <td>18</td>
                <td><span className="health-badge health-badge--ok">22</span></td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td className="health-table-label">Human Resources</td>
                <td>18</td>
                <td>14</td>
                <td><span className="health-badge health-badge--ok">16</span></td>
                <td>2</td>
                <td>0</td>
              </tr>
              <tr>
                <td className="health-table-label">Procurement</td>
                <td>15</td>
                <td>12</td>
                <td><span className="health-badge health-badge--ok">14</span></td>
                <td>1</td>
                <td>0</td>
              </tr>
              <tr>
                <td className="health-table-label">Asset Management</td>
                <td>12</td>
                <td>9</td>
                <td><span className="health-badge health-badge--ok">11</span></td>
                <td>1</td>
                <td>0</td>
              </tr>
              <tr>
                <td className="health-table-label">Reporting &amp; Analytics</td>
                <td>10</td>
                <td>8</td>
                <td><span className="health-badge health-badge--ok">9</span></td>
                <td>1</td>
                <td>0</td>
              </tr>
              <tr>
                <td className="health-table-label">Security &amp; Compliance</td>
                <td>6</td>
                <td>6</td>
                <td><span className="health-badge health-badge--warn">4</span></td>
                <td>1</td>
                <td className="health-val--danger">1</td>
              </tr>
              <tr>
                <td className="health-table-label">Integration &amp; Interoperability</td>
                <td>4</td>
                <td>4</td>
                <td><span className="health-badge health-badge--warn">3</span></td>
                <td>0</td>
                <td className="health-val--danger">1</td>
              </tr>
              <tr>
                <td className="health-table-label health-val--strong">Total</td>
                <td><strong>87</strong></td>
                <td><strong>71</strong></td>
                <td className="health-val--strong">79</td>
                <td><strong>6</strong></td>
                <td className="health-val--danger"><strong>2</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">!</span>
            Requirement Gaps — Action Required
          </div>
          <ul className="health-risk-list">
            <li className="health-risk health-risk--high">
              <span className="health-risk-level">GAP</span>
              <div>
                <strong>REQ-SEC-04 — ISO 27001 at contract execution.</strong> Section 4.3 mandates certification at contract signature. SCNSoft certification expected April 30 — 30 days post contract start. <em>Mitigation: interim controls letter + contractual condition precedent. See Section 4.2.</em>
              </div>
            </li>
            <li className="health-risk health-risk--high">
              <span className="health-risk-level">GAP</span>
              <div>
                <strong>REQ-INT-03 — Pre-built TechCore v4 connector.</strong> RFP requires a pre-built connector for "TechCore v4 framework." SCNSoft does not have a pre-built connector; a custom adapter will be built in Phase 3. <em>Estimated effort: 3 weeks, included in fixed price. No additional cost to Meridian.</em>
              </div>
            </li>
            <li className="health-risk health-risk--med">
              <span className="health-risk-level">PARTIAL</span>
              <div>
                <strong>REQ-HR-11 — Union collective agreement rules engine.</strong> Standard SCNCore HR module handles 14 of 17 collective agreement rule types. The remaining 3 (penalty rate escalation, rostering overrides, shift-swap arbitration) require configuration. Fully addressed by end of Phase 2.
              </div>
            </li>
            <li className="health-risk health-risk--med">
              <span className="health-risk-level">PARTIAL</span>
              <div>
                <strong>REQ-HR-14 — Mobile timesheet approval for field supervisors.</strong> Desktop and responsive web fully supported. Native mobile app approval push notifications require iOS/Android release (scheduled Phase 4). Interim browser-based mobile workflow available from Phase 2.
              </div>
            </li>
          </ul>
        </div>
      </div>

      </>)}

      {show('2.2') && (<>
      {/* 2.2 Coverage & Compliance Matrix */}
      <div className="rfp-section-heading" id="2.2">Coverage &amp; Compliance Matrix</div>
      <div className="health-grid">
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">✓</span>
            Mandatory Requirements Compliance (Selected)
          </div>
          <table className="health-table">
            <thead>
              <tr>
                <th>Req ID</th>
                <th>Requirement (Summary)</th>
                <th>Status</th>
                <th>How We Meet It</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>REQ-FIN-01</td>
                <td>General Ledger with AASB-compliant chart of accounts</td>
                <td><span className="health-badge health-badge--ok">Met</span></td>
                <td>SCNCore Finance GL module ships with pre-configured AASB chart. Fully customisable.</td>
              </tr>
              <tr>
                <td>REQ-FIN-05</td>
                <td>Automated bank reconciliation (ANZ, NAB, WBC feeds)</td>
                <td><span className="health-badge health-badge--ok">Met</span></td>
                <td>Native bank feed connectors for all 3 banks via Basiq API. Daily automated reconciliation with exception dashboard.</td>
              </tr>
              <tr>
                <td>REQ-FIN-09</td>
                <td>Budget vs. actuals reporting with drill-down</td>
                <td><span className="health-badge health-badge--ok">Met</span></td>
                <td>Power BI embedded dashboards. Real-time budget tracking by cost centre, project, and fund. Export to Excel/PDF.</td>
              </tr>
              <tr>
                <td>REQ-HR-01</td>
                <td>Employee lifecycle management (hire to retire)</td>
                <td><span className="health-badge health-badge--ok">Met</span></td>
                <td>Full HRIS including onboarding workflows, role changes, performance, and offboarding checklists.</td>
              </tr>
              <tr>
                <td>REQ-HR-03</td>
                <td>Payroll integration with ADP</td>
                <td><span className="health-badge health-badge--ok">Met</span></td>
                <td>Pre-built ADP WorkforceNow connector. Bi-directional sync. Tested in 3 prior engagements.</td>
              </tr>
              <tr>
                <td>REQ-PRO-02</td>
                <td>Purchase order workflow with configurable approval tiers</td>
                <td><span className="health-badge health-badge--ok">Met</span></td>
                <td>Configurable approval matrices by value, category, and cost centre. Delegation of authority rules engine. Full audit trail.</td>
              </tr>
              <tr>
                <td>REQ-PRO-07</td>
                <td>Supplier portal for invoice submission</td>
                <td><span className="health-badge health-badge--ok">Met</span></td>
                <td>Self-service supplier portal. E-invoicing via PEPPOL/ATO eInvoicing standard. Automated 3-way match.</td>
              </tr>
              <tr>
                <td>REQ-SEC-01</td>
                <td>Multi-Factor Authentication for all users</td>
                <td><span className="health-badge health-badge--ok">Met</span></td>
                <td>MFA enforced by default. Azure AD Conditional Access integration. Hardware token support for privileged accounts.</td>
              </tr>
              <tr>
                <td>REQ-SEC-02</td>
                <td>Data encrypted at rest and in transit (AES-256 / TLS 1.3)</td>
                <td><span className="health-badge health-badge--ok">Met</span></td>
                <td>TDE on all databases. TLS 1.3 enforced. Customer-managed keys in Azure Key Vault.</td>
              </tr>
              <tr>
                <td>REQ-SEC-04</td>
                <td>ISO 27001 certification at contract execution</td>
                <td><span className="health-badge health-badge--danger">Gap</span></td>
                <td>Certification pending (Stage 2 audit Mar 28). Interim controls letter provided. See Section 4.2.</td>
              </tr>
              <tr>
                <td>REQ-INT-01</td>
                <td>REST API for all core modules with OpenAPI 3.0 specification</td>
                <td><span className="health-badge health-badge--ok">Met</span></td>
                <td>All modules expose fully documented REST APIs. OpenAPI 3.0 spec published to Meridian Confluence on contract execution.</td>
              </tr>
              <tr>
                <td>REQ-INT-03</td>
                <td>Pre-built TechCore v4 framework connector</td>
                <td><span className="health-badge health-badge--danger">Gap</span></td>
                <td>Custom adapter built in Phase 3. 3 weeks effort, no additional cost. Go-live not impacted.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('2.3') && (<>
      {/* 2.3 Gaps & Questions */}
      <div className="rfp-section-heading" id="2.3">Gaps &amp; Questions</div>
      <div className="health-grid">
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">❓</span>
            Outstanding Questions to Meridian
          </div>
          <table className="health-table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Question</th>
                <th>Section</th>
                <th>Urgency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OQ-01</td>
                <td>Will an interim controls letter from our CISO (with SOC 2 + IRAP evidence) satisfy the ISO 27001 mandatory requirement (REQ-SEC-04) pending certification?</td>
                <td>4.3</td>
                <td><span className="health-badge health-badge--danger">Critical</span></td>
              </tr>
              <tr>
                <td>OQ-02</td>
                <td>How many concurrent users should the performance test target? RFP §6.2 cites "500 users" but the user register provided indicates 380 active users.</td>
                <td>6.2</td>
                <td><span className="health-badge health-badge--warn">High</span></td>
              </tr>
              <tr>
                <td>OQ-03</td>
                <td>Is the TechCore v4 framework connector requirement (REQ-INT-03) driven by an existing system integration, or is it an evaluation differentiator? A custom adapter delivers the same outcome — is this acceptable?</td>
                <td>5.4</td>
                <td><span className="health-badge health-badge--warn">High</span></td>
              </tr>
              <tr>
                <td>OQ-04</td>
                <td>Does Meridian have an existing data classification scheme we should adopt, or should we propose our own four-tier framework?</td>
                <td>4.1</td>
                <td><span className="health-badge">Medium</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">→</span>
            Partial Requirements — Resolution Plan
          </div>
          <table className="health-table">
            <thead>
              <tr>
                <th>Req ID</th>
                <th>Issue</th>
                <th>Resolution</th>
                <th>Target Phase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>REQ-HR-11</td>
                <td>3 of 17 union collective agreement rule types not pre-built</td>
                <td>Configuration sprint in Phase 2, sprint 7–8. Rules validated with Meridian HR lead.</td>
                <td>Phase 2 (Sprint 8)</td>
              </tr>
              <tr>
                <td>REQ-HR-14</td>
                <td>Native mobile push notifications for timesheet approval not in base release</td>
                <td>Interim: browser-based mobile workflow Phase 2. Native app: Phase 4.</td>
                <td>Phase 4 (full)</td>
              </tr>
              <tr>
                <td>REQ-PRO-11</td>
                <td>Punch-out catalogue integration (Ariba) not in base module</td>
                <td>Ariba Punch-out connector available as licensed add-on ($18k/yr). Included in managed services proposal.</td>
                <td>Phase 3</td>
              </tr>
              <tr>
                <td>REQ-AST-09</td>
                <td>GIS map layer integration requires Esri ArcGIS licence not held by SCNSoft</td>
                <td>Open-source MapLibre used for map visualisation. ArcGIS REST service calls supported. Meridian to provide ArcGIS API key.</td>
                <td>Phase 3</td>
              </tr>
              <tr>
                <td>REQ-RPT-08</td>
                <td>Crystal Reports migration — legacy reports in Crystal format</td>
                <td>Top 20 legacy reports migrated to Power BI by SCNSoft (Phase 2). Remaining reports: self-service migration toolkit + 2-day training session provided.</td>
                <td>Phase 2 / Phase 4</td>
              </tr>
              <tr>
                <td>REQ-SEC-05</td>
                <td>Privileged Access Management (PAM) — Meridian requires CyberArk integration</td>
                <td>CyberArk API integration for privileged session recording. Meridian to provide CyberArk instance access. Effort: 5 days, included in Phase 1.</td>
                <td>Phase 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}
    </div>
  )
}
