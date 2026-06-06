const RATE_CARD_DATA = [
  { label: 'Programme Director', rate: 440, color: '#6366F1' },
  { label: 'Solution Architect',  rate: 400, color: '#8B5CF6' },
  { label: 'AI/ML Engineer',      rate: 340, color: '#3B82F6' },
  { label: 'Senior Developer',    rate: 320, color: '#10B981' },
  { label: 'Mid Dev / BA',        rate: 260, color: '#F59E0B' },
  { label: 'QA / Test Engineer',  rate: 220, color: '#EF4444' },
]

function RateCardPieChart() {
  const total = RATE_CARD_DATA.reduce((s, d) => s + d.rate, 0)
  const cx = 90, cy = 90, r = 70
  let angle = -Math.PI / 2
  const slices = RATE_CARD_DATA.map(d => {
    const sweep = (d.rate / total) * 2 * Math.PI
    const x1 = cx + r * Math.cos(angle)
    const y1 = cy + r * Math.sin(angle)
    angle += sweep
    const x2 = cx + r * Math.cos(angle)
    const y2 = cy + r * Math.sin(angle)
    const large = sweep > Math.PI ? 1 : 0
    return { ...d, path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z` }
  })
  const ir = 35
  return (
    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <svg width="180" height="180" viewBox="0 0 180 180">
        {slices.map(s => <path key={s.label} d={s.path} fill={s.color} stroke="#fff" strokeWidth="1.5" />)}
        <circle cx={cx} cy={cy} r={ir} fill="var(--card-bg, #fff)" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center', marginRight: '20px' }}>
        {RATE_CARD_DATA.map(d => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
            <span style={{ color: 'var(--text-secondary, #6B7280)' }}>{d.label}</span>
            <span style={{ fontWeight: 600, paddingLeft: 8, whiteSpace: 'nowrap' }}>${d.rate}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PricingCommercials({ subsection }: { subsection?: string }) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Fixed-Price Total</span>
            <span className="overview-stat-value overview-stat-score--ok">$456,000</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Annual SaaS / Managed</span>
            <span className="overview-stat-value">$44,000/yr</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">5-Year TCO</span>
            <span className="overview-stat-value">$922,460</span>
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
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">💳</span>
            Payment Schedule
          </div>
          <svg viewBox="0 0 600 160" style={{ width: '100%', maxWidth: '500px', height: 'auto', display: 'block', margin: '0 auto' }}>
            {/* Baseline */}
            <line x1="20" y1="90" x2="580" y2="90" stroke="#D1D5DB" strokeWidth="2" />
            {/* Cumulative bar background */}
            <rect x="20" y="135" width="560" height="6" fill="#F3F4F6" rx="3" />
            {/* Cumulative bar fill */}
            <rect x="20" y="135" width="560" height="6" fill="#DBEAFE" rx="3" />
            {/* Cumulative total label */}
            <text x="580" y="152" fontSize="10" fill="#6B7280" textAnchor="end">$456k total fixed-price build</text>

            {/* Milestone 1: Contract Signed x=0.05 */}
            {(() => {
              const x = 20 + 0.05 * 560;
              return (
                <g key="m1">
                  <text x={x} y="60" fontSize="10" textAnchor="middle" fill="#374151">Contract</text>
                  <circle cx={x} cy="90" r="8" fill="#3B82F6" stroke="white" strokeWidth="2" />
                  <text x={x} y="108" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1D4ED8">$45.6k</text>
                  <text x={x} y="122" fontSize="10" textAnchor="middle" fill="#6B7280">10%</text>
                </g>
              );
            })()}

            {/* Milestone 2: Discovery Complete x=0.22 */}
            {(() => {
              const x = 20 + 0.22 * 560;
              return (
                <g key="m2">
                  <text x={x} y="48" fontSize="10" textAnchor="middle" fill="#374151">Discovery</text>
                  <text x={x} y="62" fontSize="10" textAnchor="middle" fill="#374151">Complete</text>
                  <circle cx={x} cy="90" r="8" fill="#3B82F6" stroke="white" strokeWidth="2" />
                  <text x={x} y="108" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1D4ED8">$45.6k</text>
                  <text x={x} y="122" fontSize="10" textAnchor="middle" fill="#6B7280">10%</text>
                </g>
              );
            })()}

            {/* Milestone 3: Phase 1 UAT Oct 2026 x=0.45 */}
            {(() => {
              const x = 20 + 0.45 * 560;
              return (
                <g key="m3">
                  <text x={x} y="48" fontSize="10" textAnchor="middle" fill="#374151">Phase 1 UAT</text>
                  <text x={x} y="62" fontSize="10" textAnchor="middle" fill="#374151">Oct 2026</text>
                  <circle cx={x} cy="90" r="8" fill="#3B82F6" stroke="white" strokeWidth="2" />
                  <text x={x} y="108" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1D4ED8">$91.2k</text>
                  <text x={x} y="122" fontSize="10" textAnchor="middle" fill="#6B7280">20%</text>
                </g>
              );
            })()}

            {/* Milestone 4: Phase 2 UAT Dec 2026 x=0.65 */}
            {(() => {
              const x = 20 + 0.65 * 560;
              return (
                <g key="m4">
                  <text x={x} y="48" fontSize="10" textAnchor="middle" fill="#374151">Phase 2 UAT</text>
                  <text x={x} y="62" fontSize="10" textAnchor="middle" fill="#374151">Dec 2026</text>
                  <circle cx={x} cy="90" r="8" fill="#3B82F6" stroke="white" strokeWidth="2" />
                  <text x={x} y="108" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1D4ED8">$68.4k</text>
                  <text x={x} y="122" fontSize="10" textAnchor="middle" fill="#6B7280">15%</text>
                </g>
              );
            })()}

            {/* Milestone 5: Phase 3 UAT Feb 2027 x=0.82 */}
            {(() => {
              const x = 20 + 0.82 * 560;
              return (
                <g key="m5">
                  <text x={x} y="48" fontSize="10" textAnchor="middle" fill="#374151">Phase 3 UAT</text>
                  <text x={x} y="62" fontSize="10" textAnchor="middle" fill="#374151">Feb 2027</text>
                  <circle cx={x} cy="90" r="8" fill="#3B82F6" stroke="white" strokeWidth="2" />
                  <text x={x} y="108" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1D4ED8">$68.4k</text>
                  <text x={x} y="122" fontSize="10" textAnchor="middle" fill="#6B7280">15%</text>
                </g>
              );
            })()}

            {/* Milestone 6: Programme Close x=0.97 */}
            {(() => {
              const x = 20 + 0.97 * 560;
              return (
                <g key="m6">
                  <text x={x} y="48" fontSize="10" textAnchor="middle" fill="#374151">Programme</text>
                  <text x={x} y="62" fontSize="10" textAnchor="middle" fill="#374151">Close</text>
                  <circle cx={x} cy="90" r="8" fill="#3B82F6" stroke="white" strokeWidth="2" />
                  <text x={x} y="108" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1D4ED8">$136.8k</text>
                  <text x={x} y="122" fontSize="10" textAnchor="middle" fill="#6B7280">30%</text>
                </g>
              );
            })()}
          </svg>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">$</span>
            5-Year Total Cost of Ownership
          </div>
          <table className="overview-table">
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
                <td className="overview-table-label">Implementation (Fixed)</td>
                <td className="overview-val--strong">$456,000</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
              </tr>
              <tr>
                <td className="overview-table-label">Managed Support &amp; Hosting</td>
                <td>$44,000</td>
                <td>$44,000</td>
                <td>$44,000</td>
                <td>$44,000</td>
                <td>$44,000</td>
              </tr>
              <tr>
                <td className="overview-table-label">LLM API costs (est.)</td>
                <td>$9,600</td>
                <td>$9,600</td>
                <td>$9,600</td>
                <td>$9,600</td>
                <td>$9,600</td>
              </tr>
              <tr>
                <td className="overview-table-label">Change Requests (est.)</td>
                <td>$16,000</td>
                <td>$12,000</td>
                <td>$8,000</td>
                <td>$6,000</td>
                <td>$6,000</td>
              </tr>
              <tr>
                <td className="overview-table-label overview-val--strong">Total (excl. GST)</td>
                <td className="overview-val--strong">$605,600</td>
                <td className="overview-val--strong">$65,600</td>
                <td className="overview-val--strong">$61,600</td>
                <td className="overview-val--strong">$59,600</td>
                <td className="overview-val--strong">$59,600</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted, #666)' }}>
            5-Year TCO: <strong>$922,460</strong>. All figures USD. Change requests estimated at market average for similar engagements; actuals billed at agreed rate card.
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📊</span>
            Competitive Value Statement
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">vs. Off-the-shelf AI tools</td>
                <td className="overview-val--ok">Generic AI document tools lack the RFP-specific pipeline (Go/No-Go Advisor, RFP Health Score, C4 views, Risk Register). A custom build is tuned to your ICP and capability matrix — not a generic summariser.</td>
              </tr>
              <tr>
                <td className="overview-table-label">vs. Other custom dev agencies</td>
                <td className="overview-val--ok">SCNSoft brings two production LLM deployments as references, satisfying both RFP §9 mandatory thresholds out of the box. Most custom agencies will be building their first AI-in-production system on your contract.</td>
              </tr>
              <tr>
                <td className="overview-table-label">vs. Build-in-house</td>
                <td className="overview-val--ok">Internal builds of comparable scope historically overrun by 60–80%. A fixed-price contract with milestone-based payment eliminates that risk and gives you a committed go-live date.</td>
              </tr>
              <tr>
                <td className="overview-table-label">ROI Projection</td>
                <td>RFP §1 targets ≥ 70% reduction in pre-sales effort and turnaround from 5–7 days to &lt; 24 hours. For a team handling 20 RFPs/month at 8–40 hrs each, that frees 1,000–4,000 analyst hours/year — redeployable to higher-value work.</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      </>)}

      {show('6.2') && (<>
      {/* 6.2 Cost Breakdown */}
      <div className="rfp-section-heading" id="6.2">Cost Breakdown</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📋</span>
            Implementation Cost by Phase
          </div>
          <table className="overview-table" style={{ tableLayout: 'fixed', width: '100%' }}>
            <colgroup>
              <col style={{ width: '18%' }} />
              <col style={{ width: '60%' }} />
              <col style={{ width: '11%' }} />
              <col style={{ width: '11%' }} />
            </colgroup>
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
                <td className="overview-table-label">Phase 1 — MVP</td>
                <td>Document ingestion, PII anonymisation, AI analysis, feature list, C4 views, risk register, Go/No-Go, RFP Health Score, basic client portal, PDF/DOCX export, MS Teams notifications</td>
                <td>12 weeks</td>
                <td>$196,000</td>
              </tr>
              <tr>
                <td className="overview-table-label">Phase 2 — Enhanced Analytics</td>
                <td>Real-time collaboration (WebSockets), approval workflow, C4 Level 3 views, Confluence export, email notifications, full audit trail UI</td>
                <td>+8 weeks</td>
                <td>$144,000</td>
              </tr>
              <tr>
                <td className="overview-table-label">Phase 3 — Platform &amp; Ecosystem</td>
                <td>SSO (SAML), Salesforce CRM webhooks, analytics dashboard, LLM provider switching, Ollama self-hosted option, API key management</td>
                <td>+8 weeks</td>
                <td>$116,000</td>
              </tr>
              <tr>
                <td className="overview-table-label overview-val--strong">Total Fixed Price</td>
                <td></td>
                <td><strong>28 weeks</strong></td>
                <td className="overview-val--strong">$456,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">💳</span>
            Payment Milestones
          </div>
          <table className="overview-table" style={{ tableLayout: 'fixed', width: '100%' }}>
            <colgroup>
              <col style={{ width: '22%' }} />
              <col style={{ width: '58%' }} />
              <col style={{ width: '11%' }} />
              <col style={{ width: '9%' }} />
            </colgroup>
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
                <td className="overview-table-label">M1 — Contract Signed</td>
                <td>Execution of contract</td>
                <td>$45,600</td>
                <td>10%</td>
              </tr>
              <tr>
                <td className="overview-table-label">M2 — Discovery Complete</td>
                <td>Approved architecture &amp; design docs</td>
                <td>$45,600</td>
                <td>10%</td>
              </tr>
              <tr>
                <td className="overview-table-label">M3 — Phase 1 MVP UAT Sign-off</td>
                <td>UAT accepted: document ingestion, AI analysis, feature list, C4 views, risk register, Go/No-Go, client portal, PDF/DOCX export (~2026-10-27)</td>
                <td>$91,200</td>
                <td>20%</td>
              </tr>
              <tr>
                <td className="overview-table-label">M4 — Phase 2 UAT Sign-off</td>
                <td>UAT accepted: real-time collaboration, approval workflow, Confluence export, audit trail (~2026-12-22)</td>
                <td>$68,400</td>
                <td>15%</td>
              </tr>
              <tr>
                <td className="overview-table-label">M5 — Phase 3 UAT Sign-off</td>
                <td>UAT accepted: SSO, Salesforce webhooks, analytics dashboard, LLM switching (~2027-02-16)</td>
                <td>$68,400</td>
                <td>15%</td>
              </tr>
              <tr>
                <td className="overview-table-label">M6 — Programme Close</td>
                <td>Hypercare complete, documentation delivered, knowledge transfer sign-off</td>
                <td>$136,800</td>
                <td>30%</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
        <div className="overview-card" style={{ flex: '1 1 auto' }}>
          <div className="overview-card-header">
            <span className="overview-card-icon">⚡</span>
            Rate Card — Change Requests
          </div>
          <table className="overview-table" style={{ tableLayout: 'fixed', width: '100%' }}>
            <colgroup>
              <col style={{ width: '50%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>Role</th>
                <th>Day Rate (USD)</th>
                <th>Valid Until</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Programme Director</td>
                <td>$440</td>
                <td>Dec 31, 2026</td>
              </tr>
              <tr>
                <td className="overview-table-label">Solution Architect</td>
                <td>$400</td>
                <td>Dec 31, 2026</td>
              </tr>
              <tr>
                <td className="overview-table-label">Senior Developer</td>
                <td>$320</td>
                <td>Dec 31, 2026</td>
              </tr>
              <tr>
                <td className="overview-table-label">Mid Developer / BA</td>
                <td>$260</td>
                <td>Dec 31, 2026</td>
              </tr>
              <tr>
                <td className="overview-table-label">QA / Test Engineer</td>
                <td>$220</td>
                <td>Dec 31, 2026</td>
              </tr>
              <tr>
                <td className="overview-table-label">AI/ML Engineer</td>
                <td>$340</td>
                <td>Dec 31, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card" style={{ flexShrink: 0 }}>
          <div className="overview-card-header">
            <span className="overview-card-icon">🥧</span>
            Rate Distribution
          </div>
          <RateCardPieChart />
        </div>
      </div>

      </>)}

      {show('6.3') && (<>
      {/* 6.3 Contractual Terms */}
      <div className="rfp-section-heading" id="6.3">Contractual Terms</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📝</span>
            Key Commercial Terms
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Contract Type</td>
                <td>Fixed-price delivery contract for all 3 phases (MVP, Enhanced Analytics, Platform &amp; Ecosystem). Separate managed services agreement for ongoing support (optional, 12-month rolling).</td>
              </tr>
              <tr>
                <td className="overview-table-label">Payment Terms</td>
                <td>Meridian's standard Net 60 terms accepted. Net 30 from milestone approval is available on request at no change to the fixed price. GST invoiced separately.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Delay Penalties</td>
                <td>RFP clause: 2% per week. A cap of 10% of total contract value and a 10-business-day cure period before penalties commence is proposed. Meridian delays (approvals, SME availability) pause penalty clock.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Liability Cap</td>
                <td>Aggregate liability capped at 100% of contract value for direct damages. Mutual exclusion of consequential and indirect damages.</td>
              </tr>
              <tr>
                <td className="overview-table-label">IP Ownership</td>
                <td>Custom-developed code: Meridian owns. Pre-existing SCNSoft IP and frameworks: perpetual royalty-free licence to Meridian. Third-party components: passed-through licence terms.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Price Escalation</td>
                <td>Fixed price is firm for contract scope. Managed services fees indexed to CPI annually with 90-day notice. Rate card reviewed annually.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Termination</td>
                <td>Termination for convenience: 30-day notice, payment for work completed + 15% of remaining contract value. Termination for cause: 14-day cure period.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Warranty</td>
                <td>90-day defect warranty post-go-live per phase. Excludes defects caused by Meridian configuration changes or third-party API changes.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">!</span>
            Commercial Clarifications Required
          </div>
          <ul className="overview-risk-list">
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">NOTE</span>
              <div>
                <strong>Payment terms</strong> — Meridian's standard Net 60 terms are fully accepted. If your accounts team can accommodate Net 30 from milestone approval, the fixed price holds without adjustment. This is entirely your choice and has no effect on delivery.
              </div>
            </li>
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">NOTE</span>
              <div>
                <strong>Penalty cure period</strong> — A 10-business-day window before delay penalties activate protects the project from minor administrative delays escalating into commercial disputes on either side. This is standard for engagements of this complexity.
              </div>
            </li>
            <li className="overview-risk overview-risk--low">
              <span className="overview-risk-level">NOTE</span>
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
