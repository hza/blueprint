export function CostOfOwnership() {
  return (
    <div className="overview">
      {/* Summary Banner */}
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">Your Investment &amp; Return</div>
            <div className="overview-banner-client">Projected ROI break-even at Month 28 · 5-year net benefit $4.6M</div>
          </div>
          <span className="health-badge health-badge--ok overview-banner-status">WITHIN BUDGET</span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">5-Year TCO</span>
            <span className="overview-stat-value overview-stat-score--warn">$4.1M</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Engagement Model</span>
            <span className="overview-stat-value">Fixed-price build · T&amp;M support</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Year 1</span>
            <span className="overview-stat-value">Implementation</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Year 2–5</span>
            <span className="overview-stat-value">Operations</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">ROI Break-even</span>
            <span className="overview-stat-value">Month 28</span>
          </div>
        </div>
      </div>

      <div className="health-grid">
        {/* Cost Breakdown */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">$</span>
            5-Year Cost Breakdown
          </div>
          <table className="health-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Year 1</th>
                <th>Year 2–5 (each)</th>
                <th>5-yr Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="health-table-label">Implementation (fixed)</td>
                <td className="health-table-value health-val--strong">$1 200 000</td>
                <td className="health-table-value">—</td>
                <td className="health-table-value health-val--strong">$1 200 000</td>
              </tr>
              <tr>
                <td className="health-table-label">Cloud infrastructure</td>
                <td className="health-table-value">$140 000</td>
                <td className="health-table-value">$155 000</td>
                <td className="health-table-value">$760 000</td>
              </tr>
              <tr>
                <td className="health-table-label">Licences &amp; SaaS tools</td>
                <td className="health-table-value">$65 000</td>
                <td className="health-table-value">$70 000</td>
                <td className="health-table-value">$345 000</td>
              </tr>
              <tr>
                <td className="health-table-label">Managed support (T&amp;M)</td>
                <td className="health-table-value">$80 000</td>
                <td className="health-table-value">$180 000</td>
                <td className="health-table-value">$800 000</td>
              </tr>
              <tr>
                <td className="health-table-label">Training &amp; onboarding</td>
                <td className="health-table-value">$45 000</td>
                <td className="health-table-value">$10 000</td>
                <td className="health-table-value">$85 000</td>
              </tr>
              <tr>
                <td className="health-table-label">Contingency (10%)</td>
                <td className="health-table-value health-val--warn">$153 000</td>
                <td className="health-table-value health-val--warn">$41 500</td>
                <td className="health-table-value health-val--warn">$319 000</td>
              </tr>
              <tr>
                <td className="health-table-label health-val--strong">Total</td>
                <td className="health-table-value health-val--strong">$1 683 000</td>
                <td className="health-table-value health-val--strong">$456 500</td>
                <td className="health-table-value health-val--strong">$4 109 000</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ROI & Value */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">↑</span>
            ROI &amp; Business Value
            <span className="health-badge health-badge--ok">Positive</span>
          </div>
          <table className="health-table">
            <tbody>
              <tr>
                <td className="health-table-label">Projected Annual Savings</td>
                <td className="health-table-value health-val--strong">$1 750 000 / yr</td>
              </tr>
              <tr>
                <td className="health-table-label">Break-even Point</td>
                <td className="health-table-value health-val--ok">Month 28 (~2.3 years)</td>
              </tr>
              <tr>
                <td className="health-table-label">5-Year Net Benefit</td>
                <td className="health-table-value health-val--strong">$4 641 000</td>
              </tr>
              <tr>
                <td className="health-table-label">5-Year ROI</td>
                <td className="health-table-value health-val--ok">113%</td>
              </tr>
              <tr>
                <td className="health-table-label">Manual process hours saved</td>
                <td className="health-table-value">~18 000 hrs / yr (45 FTE-days)</td>
              </tr>
              <tr>
                <td className="health-table-label">Error reduction (estimated)</td>
                <td className="health-table-value health-val--ok">↓ 70% incident rate</td>
              </tr>
              <tr>
                <td className="health-table-label">Compliance fine avoidance</td>
                <td className="health-table-value health-val--ok">$600 000 risk eliminated</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cost Risk Flags */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">!</span>
            Cost Risk Flags
            <span className="health-badge health-badge--warn">2 Medium Risks</span>
          </div>
          <ul className="health-risk-list">
            <li className="health-risk health-risk--med">
              <span className="health-risk-level">MED</span>
              <div>
                <strong>Cloud cost variability</strong> — Infrastructure estimates assume steady-state load. Burst traffic events (e.g. month-end batch) could add 15–25% to Year 1 cloud spend. Reserved instance pre-buy recommended.
              </div>
            </li>
            <li className="health-risk health-risk--med">
              <span className="health-risk-level">MED</span>
              <div>
                <strong>Scope creep exposure</strong> — Fixed-price model absorbs overrun in Year 1. Change-request clause needed for additions beyond the signed SOW. Without it, margin erosion risk is significant.
              </div>
            </li>
            <li className="health-risk health-risk--low">
              <span className="health-risk-level">LOW</span>
              <div>
                <strong>Licence escalation</strong> — Two SaaS tools have CPI-linked annual price increases (avg 6%). Modelled at 5% in projections; monitor at each renewal.
              </div>
            </li>
            <li className="health-risk health-risk--low">
              <span className="health-risk-level">LOW</span>
              <div>
                FX exposure on cloud invoicing (USD) is minimal at current volumes. No hedging required at this contract size.
              </div>
            </li>
          </ul>
        </div>

        {/* Payment Milestones */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">⏱</span>
            Payment Milestone Schedule
          </div>
          <ul className="health-timeline">
            <li className="health-tl-item health-tl--done">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Contract signature</span>
                <span className="health-tl-event">20% mobilisation payment — $240 000</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Month 3 — Environment Ready</span>
                <span className="health-tl-event">15% milestone — $180 000</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Month 6 — Core Platform Delivered</span>
                <span className="health-tl-event">25% milestone — $300 000</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Month 9 — UAT Sign-off</span>
                <span className="health-tl-event">25% milestone — $300 000</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Month 12 — Go-live</span>
                <span className="health-tl-event">15% milestone — $180 000</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Month 13 — Hypercare Close</span>
                <span className="health-tl-event">Final 0% retention release — held 30 days post go-live</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Pricing Assumptions */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">≡</span>
            Pricing Assumptions
          </div>
          <table className="health-table">
            <tbody>
              <tr>
                <td className="health-table-label">Rate card basis</td>
                <td className="health-table-value">Blended team rate $185/hr (T&amp;M phases)</td>
              </tr>
              <tr>
                <td className="health-table-label">Cloud provider</td>
                <td className="health-table-value">AWS · us-east-1 on-demand + 1-yr reserved mix</td>
              </tr>
              <tr>
                <td className="health-table-label">User base modelled</td>
                <td className="health-table-value">500 named users · peak 200 concurrent</td>
              </tr>
              <tr>
                <td className="health-table-label">Data volume</td>
                <td className="health-table-value">2 TB Year 1 · 15% annual growth</td>
              </tr>
              <tr>
                <td className="health-table-label">Support tier</td>
                <td className="health-table-value">Business hours SLA (P1: 4 hr, P2: 8 hr)</td>
              </tr>
              <tr>
                <td className="health-table-label">Inflation / escalation</td>
                <td className="health-table-value health-val--warn">5% YoY applied to T&amp;M rates from Year 2</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cost Optimisation Actions */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">→</span>
            Cost Optimisation Opportunities
            <span className="health-badge health-badge--ok">Est. $310k savings</span>
          </div>
          <ul className="health-actions">
            <li className="health-action health-action--high">
              <span className="health-action-tag">HIGH</span>
              <div>
                <strong>Pre-buy 1-year reserved instances</strong> — You save ~$85,000 over Years 2–5 by switching 60% of compute to reserved pricing instead of on-demand.
              </div>
            </li>
            <li className="health-action health-action--high">
              <span className="health-action-tag">HIGH</span>
              <div>
                <strong>Negotiate multi-year SaaS contracts</strong> — Consolidating two monitoring tools into a single vendor with a 3-year commit saves you ~$60,000.
              </div>
            </li>
            <li className="health-action health-action--med">
              <span className="health-action-tag">MED</span>
              <div>
                <strong>Right-size dev/staging environments</strong> — Auto-scaling down non-prod clusters outside business hours saves you ~$40,000/yr.
              </div>
            </li>
            <li className="health-action health-action--med">
              <span className="health-action-tag">MED</span>
              <div>
                <strong>Implement S3 lifecycle policies</strong> — Move objects older than 90 days to Glacier. Estimated saving: $25 000 / yr on storage costs.
              </div>
            </li>
            <li className="health-action health-action--med">
              <span className="health-action-tag">LOW</span>
              <div>
                Explore spot instances for batch/ETL workloads. Up to 70% cost reduction on non-critical async processing. Requires fault-tolerant job design.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
