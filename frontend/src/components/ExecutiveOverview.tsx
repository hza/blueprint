export function ExecutiveOverview({ subsection }: { subsection?: string }) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">1. Executive Overview</div>
            <div className="overview-banner-client">Meridian Public Services · ERP Modernisation · RFP-2025-0042</div>
          </div>
          <span className="overview-badge overview-badge--ok">SUBMITTED</span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Delivery Partner</span>
            <span className="overview-stat-value">SCNSoft</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Your Go-Live In</span>
            <span className="overview-stat-value overview-stat-score--warn">6 months</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Fixed Price</span>
            <span className="overview-stat-value">$2.68M</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Warranty Time</span>
            <span className="overview-stat-value">12 months</span>
          </div>
        </div>
      </div>

      {show('1.1') && (<>
      {/* 1.1 Proposal Summary */}
      <div className="rfp-section-heading" id="1.1">Proposal Summary</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">◎</span>
            Executive Statement
          </div>
          <div style={{ lineHeight: '1.7', fontSize: '0.82rem', color: 'var(--fg)', padding: '14px' }}>
            <p style={{ marginBottom: '0.85rem' }}>
              Meridian's four ageing back-office platforms — spanning finance, HR, procurement, and asset management — will be replaced by a single unified, <strong>cloud-native ERP, live by April 2026</strong>. You gain real-time operational visibility, automated reporting, and complete elimination of manual inter-system reconciliation from day one of go-live.
            </p>
            <p style={{ marginBottom: '0.85rem' }}>
              <strong>Seven public-sector organisations with comparable complexity</strong> have gone live on this platform since 2018, every one on time and within budget. The most recent — Queensland Department of Infrastructure (2023, 1,200 users) — went live 3 days early with a 99.3% UAT pass rate at sign-off. Their CIO is available as a direct reference; contact details are in Section 7.
            </p>
            <p style={{ marginBottom: 0 }}>
              Your fixed price is <strong>$2,680,000</strong> for the full 6-month delivery — no budget surprises, no overrun risk. Your 5-year total cost of ownership is estimated at <strong>$4,260,000</strong> — approximately 35% lower than SAP S/4HANA at comparable scale. Legacy licence savings begin from the date your old systems are decommissioned.
            </p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✓</span>
            Proposal at a Glance
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Vendor</td>
                <td>SCNSoft Pty Ltd · ABN 42 601 882 345 · Sydney, NSW</td>
              </tr>
              <tr>
                <td className="overview-table-label">Solution Name</td>
                <td>SCNCore ERP — Public Sector Edition</td>
              </tr>
              <tr>
                <td className="overview-table-label">Deployment Model</td>
                <td>Cloud-native SaaS on Microsoft Azure (Australian regions)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Implementation Model</td>
                <td>Fixed-price, 5-phase delivery · 6 months</td>
              </tr>
              <tr>
                <td className="overview-table-label">Contract Value</td>
                <td>$2,680,000 AUD (excl. GST) + $220,000/yr managed services</td>
              </tr>
              <tr>
                <td className="overview-table-label">Programme Start</td>
                <td>May 1, 2025 (subject to contract execution)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Go-Live Target</td>
                <td>April 1, 2026 (Wave 1 — Finance &amp; Procurement)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Warranty</td>
                <td>90 days post go-live per phase</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🏆</span>
            Why This Proposal Delivers for Meridian
          </div>
          <ul className="overview-risk-list">
            <li className="overview-risk" style={{ borderLeft: '3px solid var(--accent, #2563EB)' }}>
              <span className="overview-risk-level" style={{ background: 'var(--accent, #2563EB)' }}>1</span>
              <div>
                <strong>Deep public-sector ERP track record</strong> — 7 completed government ERP engagements since 2018. Meridian's procurement requirements, governance obligations, and change-management challenges are not new to us.
              </div>
            </li>
            <li className="overview-risk" style={{ borderLeft: '3px solid var(--accent, #2563EB)' }}>
              <span className="overview-risk-level" style={{ background: 'var(--accent, #2563EB)' }}>2</span>
              <div>
                <strong>Fixed price eliminates budget risk</strong> — All 7 public-sector ERP engagements delivered within the fixed contract price. Because 60% of the build is pre-existing, battle-tested code, your schedule and quality risk is materially lower than any custom build approach.
              </div>
            </li>
            <li className="overview-risk" style={{ borderLeft: '3px solid var(--accent, #2563EB)' }}>
              <span className="overview-risk-level" style={{ background: 'var(--accent, #2563EB)' }}>3</span>
              <div>
                <strong>Azure-native, data-sovereign</strong> — System hosted exclusively in Australian Azure regions. IRAP PROTECTED assessed. All data remains within Australian jurisdiction with customer-managed encryption keys.
              </div>
            </li>
            <li className="overview-risk" style={{ borderLeft: '3px solid var(--accent, #2563EB)' }}>
              <span className="overview-risk-level" style={{ background: 'var(--accent, #2563EB)' }}>4</span>
              <div>
                <strong>Permanent staff, not contractors</strong> — The team you meet during evaluation is the team assigned to your programme — permanent employees, average 6+ years on this platform. You will not face contractor substitution mid-delivery.
              </div>
            </li>
          </ul>
        </div>
      </div>

      </>)}

      {show('1.2') && (<>
      {/* 1.2 Strategic Alignment */}
      <div className="rfp-section-heading" id="1.2">Strategic Alignment</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🎯</span>
            Alignment with Meridian's Strategic Objectives
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Meridian Strategic Objective (RFP §2.1)</th>
                <th>How SCNCore ERP Delivers It</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Digitise core back-office operations by FY2026</td>
                <td>Finance, HR, and procurement fully digital by April 2026. Paper-based workflows eliminated via configurable digital forms and automated approval chains.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Achieve a single source of truth for operational data</td>
                <td>Unified data model across all modules. Real-time Power BI dashboards. Eliminates duplicate data entry and inter-system reconciliation.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Reduce IT operating cost by 20% over 3 years</td>
                <td>Decommissioning 4 legacy systems saves ~$280k/yr in licences and support. Cloud-managed infrastructure eliminates on-premise hardware refresh cycles.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Improve audit and compliance posture</td>
                <td>Immutable audit logs, role-based access controls, automated compliance reports (AASB, FMA). Audit preparation time reduced by an estimated 60%.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Workforce mobility — support hybrid and field staff</td>
                <td>Responsive web application + native mobile apps for iOS and Android. Offline-capable field workflows. Works on any device, any location.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🏆</span>
            How Your Evaluation Criteria Are Met
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Evaluation Criterion</th>
                <th>Weight</th>
                <th>What You Receive</th>
                <th>Why It Matters to You</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Technical Solution</td>
                <td>30%</td>
                <td>Cloud-native ERP with modular architecture, open APIs, and a proven integration layer connecting Finance, HR, and Procurement in a single data model.</td>
                <td>No bespoke code. No vendor lock-in. Decommissions 4 legacy systems on day one of go-live.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Implementation Methodology</td>
                <td>15%</td>
                <td>SAFe agile delivery with fixed phase gates, fortnightly steering checkpoints, and a 90-day hypercare period post go-live.</td>
                <td>You stay in control at every stage. Go-live by April 2026 — on schedule for your FY2026 digitisation mandate.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Team Experience</td>
                <td>15%</td>
                <td>Permanent staff only — all leads and architects are SCNSoft employees with average 6+ years tenure and direct government and healthcare ERP delivery experience.</td>
                <td>The team you meet in the presentation is the team that delivers. No contractor churn mid-project.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Price &amp; Value</td>
                <td>40%</td>
                <td>Fixed-fee engagement with a transparent Total Cost of Ownership model. Year-1 licence and implementation costs fully offset within 36 months via legacy savings.</td>
                <td>~$280k/yr saved by decommissioning legacy licences and eliminating hardware refresh cycles — the investment pays for itself.</td>
              </tr>
              <tr>
                <td className="overview-table-label overview-val--strong">Overall Value Proposition</td>
                <td><strong>100%</strong></td>
                <td colSpan={2}>You achieve your FY2026 digitisation mandate at the lowest total cost and lowest delivery risk of any option available — at a fixed price, with a permanent team, and a go-live guaranteed by contract.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('1.3') && (<>
      {/* 1.3 Key Assumptions & Clarifications */}
      <div className="rfp-section-heading" id="1.3">Key Assumptions &amp; Clarifications</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📋</span>
            Proposal Assumptions
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Assumption</th>
                <th>Impact if Wrong</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A1</td>
                <td>Meridian provides named SME representatives (min. 2 per department) available ≥ 60% during discovery and UAT phases.</td>
                <td>Schedule delay of up to 4 weeks. Change Request required if availability falls below threshold.</td>
              </tr>
              <tr>
                <td>A2</td>
                <td>Existing Aurion HR and TechOne Finance systems will remain operational in read-only mode for 6 months post-migration for parallel-run validation.</td>
                <td>Data migration risk increases if legacy systems are decommissioned before parallel-run completes.</td>
              </tr>
              <tr>
                <td>A3</td>
                <td>Meridian's Azure Active Directory will be available for SSO integration and will not undergo major restructuring during the programme.</td>
                <td>IAM integration rework estimated at $40–80k and 3–5 week delay.</td>
              </tr>
              <tr>
                <td>A4</td>
                <td>Third-party payroll provider (ADP) maintains their API at the current version for the programme duration (or provides 90 days' notice of breaking changes).</td>
                <td>Adapter rework required; covered under pre-agreed rate card.</td>
              </tr>
              <tr>
                <td>A5</td>
                <td>All change requests raised by Meridian will receive written approval or rejection within 5 business days of submission.</td>
                <td>Pending CRs not approved within this window will be treated as approved for planning purposes.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">❓</span>
            Clarifications Submitted (Q&amp;A Deadline: Mar 8)
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Question</th>
                <th>Status</th>
                <th>Meridian Response</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Q1</td>
                <td>Does Section 4.3 (ISO 27001 requirement) allow an interim controls letter in lieu of full certification at contract execution?</td>
                <td><span className="overview-badge overview-badge--warn">Unanswered</span></td>
                <td>No formal response received. Treating as a risk — see Section 4.2 mitigation plan.</td>
              </tr>
              <tr>
                <td>Q2</td>
                <td>Will the existing Aurion HR API be available for integration testing in a sandbox environment from Phase 1?</td>
                <td><span className="overview-badge overview-badge--ok">Answered</span></td>
                <td>"Yes — sandbox credentials will be provided within 10 business days of contract execution." (J. Matthews, Mar 9)</td>
              </tr>
              <tr>
                <td>Q3</td>
                <td>Can the payment terms be amended to Net 30 from milestone approval rather than Net 60?</td>
                <td><span className="overview-badge overview-badge--ok">Answered</span></td>
                <td>"Net 60 is standard government policy and cannot be changed. Vendors may factor this into pricing." (J. Matthews, Mar 9)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}
    </div>
  )
}
