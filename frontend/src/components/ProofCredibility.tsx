export function ProofCredibility({ subsection }: { subsection?: string }) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  return (
    <div className="rfp-health">
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">7. References &amp; Track Record</div>
            <div className="overview-banner-client">Meridian Public Services · ERP Modernisation · RFP-2025-0042</div>
          </div>
          <span className="health-badge health-badge--danger">INCOMPLETE</span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Case Studies</span>
            <span className="overview-stat-value">3 submitted</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">References Required</span>
            <span className="overview-stat-value health-val--danger">3 (only 1 ready)</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Similar Projects</span>
            <span className="overview-stat-value">$1M+ scope</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Live Deployments</span>
            <span className="overview-stat-value">7 public-sector</span>
          </div>
        </div>
      </div>

      {show('7.1') && (<>
      {/* 7.1 Case Studies */}
      <div className="rfp-section-heading" id="7.1">Results for Similar Organisations</div>

      {/* Case Study 1 */}
      <div className="rfp-section-heading" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Case Study 1 — Queensland Department of Infrastructure (2023)</div>
      <div className="health-grid">
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">🏛</span>
            Project Overview
          </div>
          <table className="health-table">
            <tbody>
              <tr>
                <td className="health-table-label">Client</td>
                <td>Queensland Department of Infrastructure &amp; Transport</td>
              </tr>
              <tr>
                <td className="health-table-label">Scope</td>
                <td>Replacement of legacy financial management system (Aurion HR) and procurement platform for 1,200 staff across 14 regional offices.</td>
              </tr>
              <tr>
                <td className="health-table-label">Contract Value</td>
                <td>$3.1M fixed price + $240k/yr managed services</td>
              </tr>
              <tr>
                <td className="health-table-label">Duration</td>
                <td>22 months (Jun 2021 – Mar 2023)</td>
              </tr>
              <tr>
                <td className="health-table-label">Delivery Outcome</td>
                <td><span className="health-badge health-badge--ok">ON TIME</span> <span className="health-badge health-badge--ok">ON BUDGET</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">📈</span>
            Results &amp; Outcomes
          </div>
          <ul className="health-checklist">
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <strong>42% reduction</strong> in financial close cycle time (18 days → 10.5 days per month).
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <strong>6.5 FTE equivalent</strong> automated through workflow digitisation. Redeployed to higher-value work — zero redundancies.
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <strong>99.97% system availability</strong> in first 12 months post go-live. No P1 incidents.
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <strong>UAT completed 3 days ahead of schedule</strong>. 847 test cases executed, 99.3% pass rate at sign-off.
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <strong>User adoption at 94%</strong> (target was 85%) within 60 days of go-live, measured via system login analytics.
            </li>
          </ul>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">💬</span>
            Client Testimonial
          </div>
          <blockquote style={{ margin: '0.5rem 0', padding: '0.75rem 1rem', borderLeft: '3px solid var(--accent, #2563EB)', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: '1.6' }}>
            "SCNSoft delivered what they promised — on time, on budget, and with a level of communication we hadn't experienced from an IT supplier before. The team embedded seamlessly with our finance and HR leads. I'd engage them again without hesitation."
          </blockquote>
          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            <strong>— Margaret Fowler</strong>, CIO, QLD Department of Infrastructure &amp; Transport
          </div>
        </div>
      </div>

      {/* Case Study 2 */}
      <div className="rfp-section-heading" style={{ fontSize: '0.9rem', marginTop: '1.5rem' }}>Case Study 2 — Bankwest Credit Union (2024)</div>
      <div className="health-grid">
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">🏦</span>
            Project Overview
          </div>
          <table className="health-table">
            <tbody>
              <tr>
                <td className="health-table-label">Client</td>
                <td>Bankwest Credit Union (regulated financial institution, 800 staff)</td>
              </tr>
              <tr>
                <td className="health-table-label">Scope</td>
                <td>Core banking operations platform replacement. Loan origination, member management, financial reporting. Highly regulated environment (APRA, AUSTRAC).</td>
              </tr>
              <tr>
                <td className="health-table-label">Contract Value</td>
                <td>$2.4M + custom module work ($380k)</td>
              </tr>
              <tr>
                <td className="health-table-label">Duration</td>
                <td>14 months (Mar 2023 – May 2024)</td>
              </tr>
              <tr>
                <td className="health-table-label">Delivery Outcome</td>
                <td><span className="health-badge health-badge--ok">ON TIME</span> <span className="health-badge health-badge--warn">+$80K SCOPE</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">📈</span>
            Results &amp; Outcomes
          </div>
          <ul className="health-checklist">
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <strong>Zero data loss</strong> across 1.2M member records migrated from legacy Fiserv system. 99.9998% data accuracy validated post-migration.
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <strong>APRA CPS 234 compliance</strong> achieved at first regulatory review post-implementation. No findings.
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <strong>Loan processing time</strong> reduced from 5 days to same-day for standard applications.
            </li>
            <li className="health-check health-check--warn">
              <span className="health-check-icon" />
              Scope increase: $80k for additional AUSTRAC reporting module requested by client at Phase 3. Delivered within agreed timeline via CR.
            </li>
          </ul>
        </div>
      </div>

      {/* Case Study 3 */}
      <div className="rfp-section-heading" style={{ fontSize: '0.9rem', marginTop: '1.5rem' }}>Case Study 3 — City of Newcastle Council (2022)</div>
      <div className="health-grid">
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">🏙</span>
            Project Overview
          </div>
          <table className="health-table">
            <tbody>
              <tr>
                <td className="health-table-label">Client</td>
                <td>City of Newcastle Council (local government, 650 staff)</td>
              </tr>
              <tr>
                <td className="health-table-label">Scope</td>
                <td>Integrated asset management and works management system. Replaces 4 disparate systems. Integration with GIS, finance, and 311 customer portal.</td>
              </tr>
              <tr>
                <td className="health-table-label">Contract Value</td>
                <td>$1.85M fixed price</td>
              </tr>
              <tr>
                <td className="health-table-label">Duration</td>
                <td>16 months (Nov 2020 – Mar 2022)</td>
              </tr>
              <tr>
                <td className="health-table-label">Delivery Outcome</td>
                <td><span className="health-badge health-badge--ok">ON TIME</span> <span className="health-badge health-badge--ok">ON BUDGET</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">📈</span>
            Results &amp; Outcomes
          </div>
          <ul className="health-checklist">
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <strong>4 legacy systems</strong> decommissioned, saving $180k/yr in licence and maintenance costs.
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <strong>Field team productivity</strong> up 28% — mobile-first works management replacing paper-based job cards.
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <strong>NPS from council staff: 72</strong> (industry benchmark for ERP implementations: 31). Highest rated digital transformation in council's history.
            </li>
          </ul>
        </div>
      </div>

      </>)}

      {show('7.2') && (<>
      {/* 7.2 Client References */}
      <div className="rfp-section-heading" id="7.2">Peers You Can Call</div>
      <div className="health-grid">
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">📞</span>
            Reference Contacts
          </div>
          <table className="health-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Organisation</th>
                <th>Contact</th>
                <th>Engagement</th>
                <th>Reference Letter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>QLD Dept. of Infrastructure</td>
                <td>Margaret Fowler, CIO</td>
                <td>$3.1M ERP · 2023 · 1,200 users</td>
                <td><span className="health-badge health-badge--ok">Attached (Annex E)</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Bankwest Credit Union</td>
                <td>Peter Lam, CFO</td>
                <td>$2.4M platform · 2024 · 800 staff</td>
                <td><span className="health-badge health-badge--warn">In preparation</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>City of Newcastle Council</td>
                <td>Sandra Obi, GM Digital</td>
                <td>$1.85M asset mgmt · 2022 · 650 staff</td>
                <td><span className="health-badge health-badge--warn">In preparation</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">→</span>
            How to Engage with Our References
          </div>
          <ul className="health-checklist">
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              All three reference contacts are aware of this proposal and available for direct calls with Meridian's evaluation panel.
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              Reference letters for all three engagements will be submitted as a separate attachment (Annex E format) prior to the proposal evaluation deadline.
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              If your evaluation panel would like to schedule reference calls, contact your SCNSoft engagement lead and a 30-minute slot will be arranged within 3 business days.
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              Direct contact details (email and phone) for each reference are available on request — or included in Annex E once submitted.
            </li>
          </ul>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">🏆</span>
            Additional Credibility Indicators
          </div>
          <table className="health-table">
            <tbody>
              <tr>
                <td className="health-table-label">Years in Business</td>
                <td>18 years. Founded 2007. Privately held, no VC pressure on delivery quality.</td>
              </tr>
              <tr>
                <td className="health-table-label">Completed Projects</td>
                <td>247 enterprise software implementations across ANZ. 71% in regulated industries (government, finance, healthcare).</td>
              </tr>
              <tr>
                <td className="health-table-label">Client Retention</td>
                <td>84% of clients commission follow-on work — the most honest signal of delivery quality available. Average client relationship: 5.3 years.</td>
              </tr>
              <tr>
                <td className="health-table-label">Awards</td>
                <td>Deloitte Technology Fast 50 (2022, 2023). AFR Best Place to Work (2024). Microsoft Azure Partner of the Year — Australia (2023).</td>
              </tr>
              <tr>
                <td className="health-table-label">Staff</td>
                <td>Your project is backed by a 320-person permanent workforce, not a contractor bench assembled for the bid. All key roles on your programme are filled by employees with long tenure on this platform.</td>
              </tr>
              <tr>
                <td className="health-table-label">Financial Stability</td>
                <td>Audited financial statements available on request. Revenue $48M FY2024. No outstanding litigation. D&amp;B rating: AA.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}
    </div>
  )
}
