export function CostOfOwnership() {
  // 5-Year Cost Stacked Bar Chart data ($k)
  const barData = [
    { label: 'Y1', Implementation: 2280, Cloud: 140, LLM: 48, Support: 80, Training: 45, Contingency: 259 },
    { label: 'Y2', Implementation: 0,    Cloud: 155, LLM: 55, Support: 180, Training: 10, Contingency: 40 },
    { label: 'Y3', Implementation: 0,    Cloud: 155, LLM: 55, Support: 180, Training: 10, Contingency: 40 },
    { label: 'Y4', Implementation: 0,    Cloud: 155, LLM: 55, Support: 180, Training: 10, Contingency: 40 },
    { label: 'Y5', Implementation: 0,    Cloud: 155, LLM: 55, Support: 180, Training: 10, Contingency: 40 },
  ]
  const barColors: Record<string, string> = {
    Implementation: '#3B82F6',
    Cloud: '#10B981',
    LLM: '#F59E0B',
    Support: '#8B5CF6',
    Training: '#EC4899',
    Contingency: '#EF4444',
  }
  const categories = ['Implementation', 'Cloud', 'LLM', 'Support', 'Training', 'Contingency']
  const yMax = 3000
  const chartH = 160
  const chartX = 50
  const chartY = 10
  const barWidth = 60
  const barGap = 16
  const barStartX = 70

  // ROI curve data
  const cumulativeCost   = [0, 2852, 3292, 3732, 4172, 4612]   // $k
  const cumulativeBenefit = [0, 0,   1750, 3500, 5250, 7000]    // $k
  const roiYMax = 10000
  const roiChartW = 440
  const roiChartH = 160
  const roiChartX = 50
  const roiChartY = 10
  const roiXPoints = [0, 1, 2, 3, 4, 5]

  function roiPtX(i: number) {
    return roiChartX + (i / 5) * roiChartW
  }
  function roiPtY(v: number) {
    return roiChartY + roiChartH - (v / roiYMax) * roiChartH
  }

  const costPolyline = cumulativeCost.map((v, i) => `${roiPtX(i)},${roiPtY(v)}`).join(' ')
  const benefitPolyline = cumulativeBenefit.map((v, i) => `${roiPtX(i)},${roiPtY(v)}`).join(' ')

  // Break-even at month 28 → ~2.33 years between Y2 and Y3
  const breakEvenX = roiPtX(2 + (28 - 24) / 12)

  return (
    <div className="overview">
      {/* Summary Banner */}
      <div className="overview-banner">
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">5-Year TCO</span>
            <span className="overview-stat-value overview-stat-score--warn">$4.6M</span>
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

      <div className="overview-grid">
        {/* 5-Year Cost at a Glance — Stacked Bar Chart */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📊</span>
            5-Year Cost at a Glance
          </div>
          <svg width="100%" viewBox="0 0 520 220" style={{ display: 'block', overflow: 'visible' }}>
            {/* Gridlines */}
            {[0, 1000, 2000, 3000].map(v => {
              const y = chartY + chartH - (v / yMax) * chartH
              return (
                <g key={v}>
                  <line x1={chartX} y1={y} x2={chartX + 430} y2={y} stroke="#E5E7EB" strokeWidth="1" />
                  <text x={chartX - 4} y={y + 4} textAnchor="end" fontSize="10" fill="#6B7280">
                    {v === 0 ? '0' : `${v / 1000}k`}
                  </text>
                </g>
              )
            })}

            {/* Stacked Bars */}
            {barData.map((d, i) => {
              const x = barStartX + i * (barWidth + barGap)
              let yOffset = chartY + chartH
              return (
                <g key={d.label}>
                  {categories.map(cat => {
                    const val = (d as Record<string, number | string>)[cat] as number
                    const h = (val / yMax) * chartH
                    yOffset -= h
                    return (
                      <rect
                        key={cat}
                        x={x}
                        y={yOffset}
                        width={barWidth}
                        height={h}
                        fill={barColors[cat]}
                      />
                    )
                  })}
                  <text x={x + barWidth / 2} y={chartY + chartH + 14} textAnchor="middle" fontSize="11" fill="#374151">
                    {d.label}
                  </text>
                </g>
              )
            })}

            {/* X-axis baseline */}
            <line x1={chartX} y1={chartY + chartH} x2={chartX + 430} y2={chartY + chartH} stroke="#D1D5DB" strokeWidth="1" />

            {/* Legend */}
            {categories.map((cat, i) => {
              const col = i < 3 ? 0 : 1
              const row = i % 3
              const lx = 52 + col * 220
              const ly = 185 + row * 14
              return (
                <g key={cat}>
                  <rect x={lx} y={ly - 8} width={10} height={10} fill={barColors[cat]} rx="2" />
                  <text x={lx + 14} y={ly} fontSize="10" fill="#374151">{cat}</text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Cost Breakdown */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">$</span>
            5-Year Cost Breakdown
          </div>
          <table className="overview-table">
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
                <td className="overview-table-label">Implementation (fixed — 3 phases)</td>
                <td className="overview-table-value overview-val--strong">$2 280 000</td>
                <td className="overview-table-value">—</td>
                <td className="overview-table-value overview-val--strong">$2 280 000</td>
              </tr>
              <tr>
                <td className="overview-table-label">Cloud infrastructure</td>
                <td className="overview-table-value">$140 000</td>
                <td className="overview-table-value">$155 000</td>
                <td className="overview-table-value">$760 000</td>
              </tr>
              <tr>
                <td className="overview-table-label">LLM API costs (est.)</td>
                <td className="overview-table-value">$48 000</td>
                <td className="overview-table-value">$55 000</td>
                <td className="overview-table-value">$268 000</td>
              </tr>
              <tr>
                <td className="overview-table-label">Managed support (T&amp;M)</td>
                <td className="overview-table-value">$80 000</td>
                <td className="overview-table-value">$180 000</td>
                <td className="overview-table-value">$800 000</td>
              </tr>
              <tr>
                <td className="overview-table-label">Training &amp; onboarding</td>
                <td className="overview-table-value">$45 000</td>
                <td className="overview-table-value">$10 000</td>
                <td className="overview-table-value">$85 000</td>
              </tr>
              <tr>
                <td className="overview-table-label">Contingency (10%)</td>
                <td className="overview-table-value overview-val--warn">$259 300</td>
                <td className="overview-table-value overview-val--warn">$40 000</td>
                <td className="overview-table-value overview-val--warn">$419 300</td>
              </tr>
              <tr>
                <td className="overview-table-label overview-val--strong">Total</td>
                <td className="overview-table-value overview-val--strong">$2 852 300</td>
                <td className="overview-table-value overview-val--strong">$440 000</td>
                <td className="overview-table-value overview-val--strong">$4 612 300</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ROI & Value */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">↑</span>
            ROI &amp; Business Value
            <span className="overview-badge overview-badge--ok">Positive</span>
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Projected Annual Savings</td>
                <td className="overview-table-value overview-val--strong">$1 750 000 / yr</td>
              </tr>
              <tr>
                <td className="overview-table-label">Break-even Point</td>
                <td className="overview-table-value overview-val--ok">Month 28 (~2.3 years)</td>
              </tr>
              <tr>
                <td className="overview-table-label">5-Year Net Benefit</td>
                <td className="overview-table-value overview-val--strong">$4 641 000</td>
              </tr>
              <tr>
                <td className="overview-table-label">5-Year ROI</td>
                <td className="overview-table-value overview-val--ok">113%</td>
              </tr>
              <tr>
                <td className="overview-table-label">Manual process hours saved</td>
                <td className="overview-table-value">~18 000 hrs / yr (45 FTE-days)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Error reduction (estimated)</td>
                <td className="overview-table-value overview-val--ok">↓ 70% incident rate</td>
              </tr>
              <tr>
                <td className="overview-table-label">Compliance fine avoidance</td>
                <td className="overview-table-value overview-val--ok">$600 000 risk eliminated</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cumulative Cost vs. Benefit — ROI Curve */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">↗</span>
            Cumulative Cost vs. Benefit
          </div>
          <svg width="100%" viewBox="0 0 520 220" style={{ display: 'block', overflow: 'visible' }}>
            {/* Gridlines + Y-axis labels */}
            {[0, 2000, 4000, 6000, 8000, 10000].map(v => {
              const y = roiPtY(v)
              const label = `$${v / 1000}M`
              return (
                <g key={v}>
                  <line x1={roiChartX} y1={y} x2={roiChartX + roiChartW} y2={y} stroke="#E5E7EB" strokeWidth="1" />
                  <text x={roiChartX - 4} y={y + 4} textAnchor="end" fontSize="10" fill="#6B7280">{label}</text>
                </g>
              )
            })}

            {/* X-axis baseline */}
            <line
              x1={roiChartX}
              y1={roiChartY + roiChartH}
              x2={roiChartX + roiChartW}
              y2={roiChartY + roiChartH}
              stroke="#D1D5DB"
              strokeWidth="1"
            />

            {/* X-axis labels */}
            {roiXPoints.map(i => (
              <text
                key={i}
                x={roiPtX(i)}
                y={roiChartY + roiChartH + 14}
                textAnchor="middle"
                fontSize="11"
                fill="#374151"
              >
                Y{i}
              </text>
            ))}

            {/* Break-even vertical dashed line (~month 28 = Y2 + 4/12) */}
            <line
              x1={breakEvenX}
              y1={roiChartY}
              x2={breakEvenX}
              y2={roiChartY + roiChartH}
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text
              x={breakEvenX + 4}
              y={roiChartY + 12}
              fontSize="9"
              fill="#6B7280"
            >
              Break-even ~Month 28
            </text>

            {/* Cumulative Cost line (red) */}
            <polyline
              points={costPolyline}
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {cumulativeCost.map((v, i) => (
              <circle key={i} cx={roiPtX(i)} cy={roiPtY(v)} r="3.5" fill="#EF4444" />
            ))}

            {/* Cumulative Benefit line (green) */}
            <polyline
              points={benefitPolyline}
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {cumulativeBenefit.map((v, i) => (
              <circle key={i} cx={roiPtX(i)} cy={roiPtY(v)} r="3.5" fill="#10B981" />
            ))}

            {/* Legend */}
            <line x1={52} y1={188} x2={72} y2={188} stroke="#EF4444" strokeWidth="2.5" />
            <circle cx={62} cy={188} r="3.5" fill="#EF4444" />
            <text x={76} y={192} fontSize="10" fill="#374151">Cumulative Cost</text>

            <line x1={200} y1={188} x2={220} y2={188} stroke="#10B981" strokeWidth="2.5" />
            <circle cx={210} cy={188} r="3.5" fill="#10B981" />
            <text x={224} y={192} fontSize="10" fill="#374151">Cumulative Benefit</text>
          </svg>
        </div>

        {/* Cost Risk Flags */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">!</span>
            Cost Risk Flags
            <span className="overview-badge overview-badge--warn">2 Medium Risks</span>
          </div>
          <ul className="overview-risk-list">
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">MED</span>
              <div>
                <strong>Cloud cost variability</strong> — Infrastructure estimates assume steady-state load. Burst traffic events (e.g. month-end batch) could add 15–25% to Year 1 cloud spend. Reserved instance pre-buy recommended.
              </div>
            </li>
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">MED</span>
              <div>
                <strong>Scope creep exposure</strong> — Fixed-price model absorbs overrun in Year 1. Change-request clause needed for additions beyond the signed SOW. Without it, margin erosion risk is significant.
              </div>
            </li>
            <li className="overview-risk overview-risk--low">
              <span className="overview-risk-level">LOW</span>
              <div>
                <strong>Licence escalation</strong> — Two SaaS tools have CPI-linked annual price increases (avg 6%). Modelled at 5% in projections; monitor at each renewal.
              </div>
            </li>
            <li className="overview-risk overview-risk--low">
              <span className="overview-risk-level">LOW</span>
              <div>
                FX exposure on cloud invoicing (USD) is minimal at current volumes. No hedging required at this contract size.
              </div>
            </li>
          </ul>
        </div>

        {/* Payment Milestones */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">⏱</span>
            Payment Milestone Schedule
          </div>
          <ul className="overview-timeline">
            <li className="overview-tl-item overview-tl--done">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Contract signature</span>
                <span className="overview-tl-event">10% mobilisation payment — $228,000</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Week 4 — Architecture &amp; Design Approved</span>
                <span className="overview-tl-event">10% milestone — $228,000</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Week 12 — Phase 1 MVP UAT Sign-off (~2026-10-27)</span>
                <span className="overview-tl-event">20% milestone — $456,000</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Week 20 — Phase 2 UAT Sign-off (~2026-12-22)</span>
                <span className="overview-tl-event">15% milestone — $342,000</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Week 28 — Phase 3 UAT Sign-off (~2027-02-16)</span>
                <span className="overview-tl-event">15% milestone — $342,000</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Programme Close — Hypercare &amp; Handover</span>
                <span className="overview-tl-event">30% final payment — $684,000</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Pricing Assumptions */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">≡</span>
            Pricing Assumptions
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Rate card basis</td>
                <td className="overview-table-value">Blended team rate $185/hr (T&amp;M phases)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Cloud provider</td>
                <td className="overview-table-value">AWS, GCP, or Azure — region (EU or US) confirmed at award (RFP §9)</td>
              </tr>
              <tr>
                <td className="overview-table-label">User base modelled</td>
                <td className="overview-table-value">~100 concurrent users · up to 5,000 projects · 500,000 artifacts (RFP §4.4)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Data volume</td>
                <td className="overview-table-value">Sized for 500,000 artifacts + vector embeddings in Qdrant · daily backups, 30-day retention (RFP §4.5)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Support tier</td>
                <td className="overview-table-value">Business hours SLA (P1: 30 min response / 1 hr RTO, P2: 2 hr response / 1 business day — RFP §4.4)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Inflation / escalation</td>
                <td className="overview-table-value overview-val--warn">5% YoY applied to T&amp;M rates from Year 2</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cost Optimisation Actions */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">→</span>
            Cost Optimisation Opportunities
            <span className="overview-badge overview-badge--ok">Est. $310k savings</span>
          </div>
          <ul className="overview-actions">
            <li className="overview-action overview-action--high">
              <span className="overview-action-tag">HIGH</span>
              <div>
                <strong>Pre-buy 1-year reserved instances</strong> — You save ~$85,000 over Years 2–5 by switching 60% of compute to reserved pricing instead of on-demand.
              </div>
            </li>
            <li className="overview-action overview-action--high">
              <span className="overview-action-tag">HIGH</span>
              <div>
                <strong>Negotiate multi-year SaaS contracts</strong> — Consolidating two monitoring tools into a single vendor with a 3-year commit saves you ~$60,000.
              </div>
            </li>
            <li className="overview-action overview-action--med">
              <span className="overview-action-tag">MED</span>
              <div>
                <strong>Right-size dev/staging environments</strong> — Auto-scaling down non-prod clusters outside business hours saves you ~$40,000/yr.
              </div>
            </li>
            <li className="overview-action overview-action--med">
              <span className="overview-action-tag">MED</span>
              <div>
                <strong>Implement S3 lifecycle policies</strong> — Move objects older than 90 days to Glacier. Estimated saving: $25 000 / yr on storage costs.
              </div>
            </li>
            <li className="overview-action overview-action--med">
              <span className="overview-action-tag">LOW</span>
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
