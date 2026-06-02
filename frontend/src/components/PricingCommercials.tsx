export function PricingCommercials({ subsection }: { subsection?: string }) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  return (
    <div className="rfp-health">
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">6. Pricing &amp; Commercials</div>
            <div className="overview-banner-client">Meridian Public Services · ERP Modernisation · RFP-2025-0042</div>
          </div>
          <span className="health-badge health-badge--warn">REVIEW REQUIRED</span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Fixed-Price Total</span>
            <span className="overview-stat-value overview-stat-score--ok">$2,680,000</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Annual SaaS / Managed</span>
            <span className="overview-stat-value">$220,000/yr</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">5-Year TCO</span>
            <span className="overview-stat-value">$3,560,000</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Price Model</span>
            <span className="overview-stat-value">Fixed + T&amp;M Change</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Payment</span>
            <span className="overview-stat-value">Milestone-based</span>
          </div>
        </div>
      </div>

      {show('6.1') && (<>
      {/* 6.1 TCO Overview */}
      <div className="rfp-section-heading" id="6.1">TCO Overview</div>
      <div className="health-grid">
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">$</span>
            5-Year Total Cost of Ownership
          </div>
          <table className="health-table">
            <thead>
              <tr>
                <th>Cost Category</th>
                <th>Year 1</th>
                <th>Year 2</th>
                <th>Year 3</th>
                <th>Year 4</th>
                <th>Year 5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="health-table-label">Implementation (Fixed)</td>
                <td className="health-val--strong">$2,680,000</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
              </tr>
              <tr>
                <td className="health-table-label">Managed Support &amp; Hosting</td>
                <td>$220,000</td>
                <td>$220,000</td>
                <td>$220,000</td>
                <td>$220,000</td>
                <td>$220,000</td>
              </tr>
              <tr>
                <td className="health-table-label">Licences (MS Azure est.)</td>
                <td>$48,000</td>
                <td>$48,000</td>
                <td>$48,000</td>
                <td>$48,000</td>
                <td>$48,000</td>
              </tr>
              <tr>
                <td className="health-table-label">Change Requests (est.)</td>
                <td>$80,000</td>
                <td>$60,000</td>
                <td>$40,000</td>
                <td>$30,000</td>
                <td>$30,000</td>
              </tr>
              <tr>
                <td className="health-table-label health-val--strong">Total (excl. GST)</td>
                <td className="health-val--strong">$3,028,000</td>
                <td className="health-val--strong">$328,000</td>
                <td className="health-val--strong">$308,000</td>
                <td className="health-val--strong">$298,000</td>
                <td className="health-val--strong">$298,000</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted, #666)' }}>
            5-Year TCO: <strong>$4,260,000</strong>. All figures AUD, exclusive of GST. Change requests estimated at market average for similar engagements; actuals billed at agreed rate card.
          </div>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">📊</span>
            Competitive Value Statement
          </div>
          <table className="health-table">
            <tbody>
              <tr>
                <td className="health-table-label">vs. SAP S/4HANA</td>
                <td className="health-val--ok">Est. 35–45% lower 5-year TCO. SAP licences alone typically exceed $800k/yr for 500-user deployment.</td>
              </tr>
              <tr>
                <td className="health-table-label">vs. Oracle ERP Cloud</td>
                <td className="health-val--ok">Est. 30–40% lower. Oracle subscription model locks in escalating costs; a fixed implementation price plus flat managed fee caps your exposure.</td>
              </tr>
              <tr>
                <td className="health-table-label">vs. Build-in-House</td>
                <td className="health-val--ok">Est. 50% lower. Internal builds historically overrun by 80% (Standish Chaos Report 2024). Your fixed price eliminates this risk.</td>
              </tr>
              <tr>
                <td className="health-table-label">ROI Projection</td>
                <td>Automation of 4 FTE manual processes + reduced reconciliation errors estimated to deliver $480k/yr operational savings. Payback period: ~5.5 years.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('6.2') && (<>
      {/* 6.2 Cost Breakdown */}
      <div className="rfp-section-heading" id="6.2">Cost Breakdown</div>
      <div className="health-grid">
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">📋</span>
            Implementation Cost by Phase
          </div>
          <table className="health-table">
            <thead>
              <tr>
                <th>Phase</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="health-table-label">Phase 1</td>
                <td>Discovery &amp; Design</td>
                <td>6 weeks</td>
                <td>$280,000</td>
              </tr>
              <tr>
                <td className="health-table-label">Phase 2</td>
                <td>Core Build (Finance, HR, Procurement)</td>
                <td>20 weeks</td>
                <td>$1,120,000</td>
              </tr>
              <tr>
                <td className="health-table-label">Phase 3</td>
                <td>Integration &amp; Data Migration</td>
                <td>14 weeks</td>
                <td>$560,000</td>
              </tr>
              <tr>
                <td className="health-table-label">Phase 4</td>
                <td>Training &amp; Pilot</td>
                <td>8 weeks</td>
                <td>$320,000</td>
              </tr>
              <tr>
                <td className="health-table-label">Phase 5</td>
                <td>Go-Live, Hypercare &amp; Handover</td>
                <td>26 weeks</td>
                <td>$400,000</td>
              </tr>
              <tr>
                <td className="health-table-label health-val--strong">Total Fixed Price</td>
                <td></td>
                <td><strong>6 months</strong></td>
                <td className="health-val--strong">$2,680,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">💳</span>
            Payment Milestones
          </div>
          <table className="health-table">
            <thead>
              <tr>
                <th>Milestone</th>
                <th>Trigger</th>
                <th>Amount</th>
                <th>% of Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="health-table-label">M1 — Contract Signed</td>
                <td>Execution of contract</td>
                <td>$268,000</td>
                <td>10%</td>
              </tr>
              <tr>
                <td className="health-table-label">M2 — Discovery Complete</td>
                <td>Approved architecture &amp; design docs</td>
                <td>$268,000</td>
                <td>10%</td>
              </tr>
              <tr>
                <td className="health-table-label">M3 — Phase 2 Mid-Point</td>
                <td>Sprint 5 demo accepted</td>
                <td>$402,000</td>
                <td>15%</td>
              </tr>
              <tr>
                <td className="health-table-label">M4 — Core Build Complete</td>
                <td>UAT sign-off Phase 2</td>
                <td>$536,000</td>
                <td>20%</td>
              </tr>
              <tr>
                <td className="health-table-label">M5 — Integration Complete</td>
                <td>Migration validation &amp; UAT Phase 3</td>
                <td>$402,000</td>
                <td>15%</td>
              </tr>
              <tr>
                <td className="health-table-label">M6 — Go-Live Wave 1</td>
                <td>First department live</td>
                <td>$402,000</td>
                <td>15%</td>
              </tr>
              <tr>
                <td className="health-table-label">M7 — Programme Close</td>
                <td>All departments live, handover complete</td>
                <td>$402,000</td>
                <td>15%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">⚡</span>
            Rate Card — Change Requests
          </div>
          <table className="health-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Day Rate (AUD)</th>
                <th>Valid Until</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="health-table-label">Programme Director</td>
                <td>$2,200</td>
                <td>Dec 31, 2026</td>
              </tr>
              <tr>
                <td className="health-table-label">Solution Architect</td>
                <td>$2,000</td>
                <td>Dec 31, 2026</td>
              </tr>
              <tr>
                <td className="health-table-label">Senior Developer</td>
                <td>$1,600</td>
                <td>Dec 31, 2026</td>
              </tr>
              <tr>
                <td className="health-table-label">Mid Developer / BA</td>
                <td>$1,300</td>
                <td>Dec 31, 2026</td>
              </tr>
              <tr>
                <td className="health-table-label">QA / Test Engineer</td>
                <td>$1,100</td>
                <td>Dec 31, 2026</td>
              </tr>
              <tr>
                <td className="health-table-label">Change Manager</td>
                <td>$1,400</td>
                <td>Dec 31, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('6.3') && (<>
      {/* 6.3 Contractual Terms */}
      <div className="rfp-section-heading" id="6.3">Contractual Terms</div>
      <div className="health-grid">
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">📝</span>
            Key Commercial Terms
          </div>
          <table className="health-table">
            <tbody>
              <tr>
                <td className="health-table-label">Contract Type</td>
                <td>Fixed-price delivery contract for Phases 1–5. Separate managed services agreement for ongoing support (optional, 12-month rolling).</td>
              </tr>
              <tr>
                <td className="health-table-label">Payment Terms</td>
                <td>Meridian's standard Net 60 terms accepted. Net 30 from milestone approval is available on request at no change to the fixed price. GST invoiced separately.</td>
              </tr>
              <tr>
                <td className="health-table-label">Delay Penalties</td>
                <td>RFP clause: 2% per week. A cap of 10% of total contract value and a 10-business-day cure period before penalties commence is proposed. Meridian delays (approvals, SME availability) pause penalty clock.</td>
              </tr>
              <tr>
                <td className="health-table-label">Liability Cap</td>
                <td>Aggregate liability capped at 100% of contract value for direct damages. Mutual exclusion of consequential and indirect damages.</td>
              </tr>
              <tr>
                <td className="health-table-label">IP Ownership</td>
                <td>Custom-developed code: Meridian owns. Pre-existing SCNSoft IP and frameworks: perpetual royalty-free licence to Meridian. Third-party components: passed-through licence terms.</td>
              </tr>
              <tr>
                <td className="health-table-label">Price Escalation</td>
                <td>Fixed price is firm for contract scope. Managed services fees indexed to CPI annually with 90-day notice. Rate card reviewed annually.</td>
              </tr>
              <tr>
                <td className="health-table-label">Termination</td>
                <td>Termination for convenience: 30-day notice, payment for work completed + 15% of remaining contract value. Termination for cause: 14-day cure period.</td>
              </tr>
              <tr>
                <td className="health-table-label">Warranty</td>
                <td>90-day defect warranty post-go-live per phase. Excludes defects caused by Meridian configuration changes or third-party API changes.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">!</span>
            Commercial Clarifications Required
          </div>
          <ul className="health-risk-list">
            <li className="health-risk health-risk--med">
              <span className="health-risk-level">NOTE</span>
              <div>
                <strong>Payment terms</strong> — Meridian's standard Net 60 terms are fully accepted. If your accounts team can accommodate Net 30 from milestone approval, the fixed price holds without adjustment. This is entirely your choice and has no effect on delivery.
              </div>
            </li>
            <li className="health-risk health-risk--med">
              <span className="health-risk-level">NOTE</span>
              <div>
                <strong>Penalty cure period</strong> — A 10-business-day window before delay penalties activate protects the project from minor administrative delays escalating into commercial disputes on either side. This is standard for engagements of this complexity.
              </div>
            </li>
            <li className="health-risk health-risk--low">
              <span className="health-risk-level">NOTE</span>
              <div>
                Schedule B pricing template has been completed. Minor formatting deviation in rows 14–17 (sub-totals split differently). Substantive numbers are identical. A reformatted version is available on request.
              </div>
            </li>
          </ul>
        </div>
      </div>
      </>)}
    </div>
  )
}
