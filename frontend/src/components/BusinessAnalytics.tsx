import './BusinessAnalytics.css'

export function BusinessAnalytics() {
  return (
    <div className="biz-analytics">

      {/* ── Business Model Canvas ────────────────────────────────────────── */}
      <div className="biz-section-title">Business Model Canvas</div>
      <div className="bmc-grid">
        <div className="bmc-cell bmc-key-partners">
          <div className="bmc-cell-header">Key Partners</div>
          <ul className="bmc-list">
            <li>TechCore Ltd — platform licensing &amp; upgrade support</li>
            <li>SecureAudit Co — ISO 27001 expedited certification</li>
            <li>CloudInfra Partners — hosting &amp; SLA-backed infrastructure</li>
            <li>DataBridge — data migration sub-contractor</li>
          </ul>
        </div>
        <div className="bmc-cell bmc-key-activities">
          <div className="bmc-cell-header">Key Activities</div>
          <ul className="bmc-list">
            <li>Enterprise software implementation &amp; integration</li>
            <li>Custom module development on TechCore v4</li>
            <li>Data migration from legacy systems</li>
            <li>Staff training &amp; change management</li>
            <li>Ongoing L2/L3 support (SLA-bound)</li>
          </ul>
        </div>
        <div className="bmc-cell bmc-value-props">
          <div className="bmc-cell-header">Value Propositions</div>
          <ul className="bmc-list">
            <li><strong>Faster delivery</strong> — 14-week framework vs. 22-week average</li>
            <li><strong>Compliance-ready</strong> — ISO 27001 controls built in</li>
            <li><strong>Sector experience</strong> — 4 public-sector deployments</li>
            <li><strong>Fixed-price certainty</strong> — capped at $2.8M</li>
          </ul>
        </div>
        <div className="bmc-cell bmc-customer-rel">
          <div className="bmc-cell-header">Customer Relationships</div>
          <ul className="bmc-list">
            <li>Dedicated Engagement Lead (named resource)</li>
            <li>Bi-weekly executive steering committee</li>
            <li>24/7 incident line during go-live window</li>
            <li>Annual business review post-delivery</li>
          </ul>
        </div>
        <div className="bmc-cell bmc-key-resources">
          <div className="bmc-cell-header">Key Resources</div>
          <ul className="bmc-list">
            <li>6.75 FTE delivery team (PM, SA, devs, QA, security)</li>
            <li>TechCore v4 platform licence</li>
            <li>14-week implementation playbook (proprietary)</li>
            <li>ISO 27001-aligned security control library</li>
          </ul>
        </div>
        <div className="bmc-cell bmc-channels">
          <div className="bmc-cell-header">Channels</div>
          <ul className="bmc-list">
            <li>Direct: RFP response (this bid)</li>
            <li>Executive referral from Dr. S. Park</li>
            <li>Public sector procurement portal</li>
            <li>GovTech Summit — conference presence</li>
          </ul>
        </div>
        <div className="bmc-cell bmc-customer-segments">
          <div className="bmc-cell-header">Customer Segments</div>
          <ul className="bmc-list">
            <li><strong>Primary:</strong> Federal &amp; regional government agencies</li>
            <li><strong>Secondary:</strong> Crown corporations, regulated utilities</li>
            <li>Budget: annual appropriations, $1M–$5M range</li>
            <li>Buyer: procurement + IT + finance + legal committee</li>
          </ul>
        </div>
        <div className="bmc-cell bmc-cost-structure">
          <div className="bmc-cell-header">Cost Structure</div>
          <ul className="bmc-list">
            <li>Labour (people): <strong>$1,420,000</strong> — 68%</li>
            <li>TechCore v4 licence &amp; upgrade: <strong>$145,000</strong></li>
            <li>Infrastructure (2yr): <strong>$180,000</strong></li>
            <li>DataBridge sub-contractor: <strong>$120,000</strong></li>
            <li>ISO 27001 audit + travel: <strong>$65,000</strong></li>
            <li><strong>Total: $1,930,000</strong></li>
          </ul>
        </div>
        <div className="bmc-cell bmc-revenue-streams">
          <div className="bmc-cell-header">Revenue Streams</div>
          <ul className="bmc-list">
            <li>Year 1 implementation: <strong>$980,000</strong></li>
            <li>Year 2 support &amp; enhancements: <strong>$1,040,000</strong></li>
            <li>Year 3 option (renewal): <strong>$780,000</strong></li>
            <li>Gross margin: <strong>31% · $870K</strong></li>
          </ul>
        </div>
      </div>

      {/* ── MoSCoW Bubble Chart ─────────────────────────────────────────── */}
      <div className="overview-card">
        <div className="overview-card-header">
          <span className="overview-card-icon">⊙</span>
          Requirements Value vs. Effort
        </div>
        <svg viewBox="0 0 480 320" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Gridlines */}
          {[25, 50, 75].map(v => {
            const x = 40 + (v / 100) * 420
            const y = 10 + ((100 - v) / 100) * 270
            return (
              <g key={v}>
                <line x1={x} y1={10} x2={x} y2={280} stroke="#F3F4F6" strokeWidth={1} />
                <line x1={40} y1={y} x2={460} y2={y} stroke="#F3F4F6" strokeWidth={1} />
              </g>
            )
          })}

          {/* Axes */}
          <line x1={40} y1={280} x2={460} y2={280} stroke="#D1D5DB" strokeWidth={1} />
          <line x1={40} y1={10} x2={40} y2={280} stroke="#D1D5DB" strokeWidth={1} />

          {/* Axis labels */}
          <text x={250} y={298} fontSize={10} fill="#6B7280" textAnchor="middle">Implementation Effort (Low → High)</text>
          <text x={12} y={150} fontSize={10} fill="#6B7280" textAnchor="middle" transform="rotate(-90, 12, 150)">Business Value (Low → High)</text>

          {/* Axis tick labels */}
          <text x={40} y={293} fontSize={8} fill="#9CA3AF" textAnchor="middle">0</text>
          <text x={145} y={293} fontSize={8} fill="#9CA3AF" textAnchor="middle">25</text>
          <text x={250} y={293} fontSize={8} fill="#9CA3AF" textAnchor="middle">50</text>
          <text x={355} y={293} fontSize={8} fill="#9CA3AF" textAnchor="middle">75</text>
          <text x={460} y={293} fontSize={8} fill="#9CA3AF" textAnchor="middle">100</text>

          <text x={35} y={283} fontSize={8} fill="#9CA3AF" textAnchor="end">0</text>
          <text x={35} y={216} fontSize={8} fill="#9CA3AF" textAnchor="end">25</text>
          <text x={35} y={148} fontSize={8} fill="#9CA3AF" textAnchor="end">50</text>
          <text x={35} y={81} fontSize={8} fill="#9CA3AF" textAnchor="end">75</text>
          <text x={35} y={14} fontSize={8} fill="#9CA3AF" textAnchor="end">100</text>

          {/* Bubbles */}
          {[
            { label: 'AI RFP Analysis',     effort: 30, value: 95, r: 8,  fill: '#EF4444' },
            { label: 'PII Anonymisation',   effort: 25, value: 90, r: 8,  fill: '#EF4444' },
            { label: 'Client Portal',       effort: 45, value: 88, r: 8,  fill: '#EF4444' },
            { label: 'SSO Integration',     effort: 35, value: 82, r: 8,  fill: '#EF4444' },
            { label: 'Feature Estimation',  effort: 40, value: 78, r: 6,  fill: '#F59E0B' },
            { label: 'Analytics Dashboard', effort: 55, value: 72, r: 6,  fill: '#F59E0B' },
            { label: 'Salesforce CRM',      effort: 50, value: 65, r: 6,  fill: '#F59E0B' },
            { label: 'Collaboration Tools', effort: 60, value: 55, r: 4,  fill: '#3B82F6' },
            { label: 'White-labelling',     effort: 65, value: 45, r: 4,  fill: '#3B82F6' },
            { label: 'Marketplace API',     effort: 80, value: 30, r: 3,  fill: '#6B7280' },
          ].map(({ label, effort, value, r, fill }) => {
            const cx = 40 + (effort / 100) * 420
            const cy = 10 + ((100 - value) / 100) * 270
            const fillAlpha = fill + '30'
            return (
              <g key={label}>
                <circle cx={cx} cy={cy} r={r} fill={fillAlpha} stroke={fill} strokeWidth={1.5} />
                <text x={cx} y={cy + r + 9} fontSize={9} fill="#374151" textAnchor="middle">{label}</text>
              </g>
            )
          })}

          {/* Legend */}
          <circle cx={60}  cy={312} r={5} fill="#EF444430" stroke="#EF4444" strokeWidth={1.5} />
          <text x={68}  y={316} fontSize={9} fill="#374151">Must</text>
          <circle cx={105} cy={312} r={5} fill="#F59E0B30" stroke="#F59E0B" strokeWidth={1.5} />
          <text x={113} y={316} fontSize={9} fill="#374151">Should</text>
          <circle cx={158} cy={312} r={5} fill="#3B82F630" stroke="#3B82F6" strokeWidth={1.5} />
          <text x={166} y={316} fontSize={9} fill="#374151">Could</text>
          <circle cx={206} cy={312} r={5} fill="#6B728030" stroke="#6B7280" strokeWidth={1.5} />
          <text x={214} y={316} fontSize={9} fill="#374151">Won't</text>
          <text x={270} y={316} fontSize={8} fill="#9CA3AF">Bubble size indicates delivery priority.</text>
        </svg>
      </div>

      {/* ── MoSCoW Prioritisation ───────────────────────────────────────── */}
      <div className="biz-section-title">MoSCoW Prioritisation</div>
      <div className="moscow-grid">
        <div className="moscow-card">
          <div className="moscow-letter moscow-m">M</div>
          <div className="moscow-body">
            <div className="moscow-title">Must Have</div>
            <ul className="moscow-list">
              <li>Full legislative compliance by Jan 2026 deadline</li>
              <li>ISO 27001-certified data residency controls</li>
              <li>Core case management module go-live by week 10</li>
              <li>Data migration from legacy system with zero data loss</li>
              <li>Role-based access control (RBAC) for all user tiers</li>
              <li>SLA-backed L2/L3 support from day 1 of go-live</li>
            </ul>
          </div>
        </div>
        <div className="moscow-card">
          <div className="moscow-letter moscow-s">S</div>
          <div className="moscow-body">
            <div className="moscow-title">Should Have</div>
            <ul className="moscow-list">
              <li>Automated regulatory reporting module</li>
              <li>Staff self-service training portal</li>
              <li>Executive dashboard with live KPI feeds</li>
              <li>API gateway for 3 downstream agency systems</li>
              <li>Audit trail export in agency-preferred format</li>
            </ul>
          </div>
        </div>
        <div className="moscow-card">
          <div className="moscow-letter moscow-c">C</div>
          <div className="moscow-body">
            <div className="moscow-title">Could Have</div>
            <ul className="moscow-list">
              <li>Mobile-responsive field-worker interface</li>
              <li>AI-assisted case triage suggestions</li>
              <li>Integrated document e-signing workflow</li>
              <li>Multi-language UI (French / English toggle)</li>
              <li>Single sign-on with whole-of-government IdP</li>
            </ul>
          </div>
        </div>
        <div className="moscow-card">
          <div className="moscow-letter moscow-w">W</div>
          <div className="moscow-body">
            <div className="moscow-title">Won't Have (this release)</div>
            <ul className="moscow-list">
              <li>Public-facing citizen portal (Phase 2 scope)</li>
              <li>Real-time inter-agency data sharing hub</li>
              <li>Predictive analytics / ML forecasting engine</li>
              <li>Custom native mobile app (iOS / Android)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── NABC Business Case ───────────────────────────────────────────── */}
      <div className="biz-section-title">Business Case — NABC</div>
      <div className="nabc-grid">
        <div className="nabc-card">
          <div className="nabc-letter nabc-n">N</div>
          <div className="nabc-body">
            <div className="nabc-title">Need</div>
            <p className="nabc-desc">The agency runs a 6-year-old case management system that cannot support new legislative reporting mandates effective Jan 2026. Manual workarounds cost ~$420K/yr in staff time and create auditable compliance gaps.</p>
            <ul className="nabc-list">
              <li>3 failed internal upgrade attempts since 2022</li>
              <li>ISO 27001 audit flagged data residency violations</li>
              <li>Board mandate: modernise before next fiscal year</li>
              <li>Jan 2026 legislative deadline — non-negotiable</li>
            </ul>
          </div>
        </div>
        <div className="nabc-card">
          <div className="nabc-letter nabc-a">A</div>
          <div className="nabc-body">
            <div className="nabc-title">Approach</div>
            <p className="nabc-desc">Fixed-price TechCore v4 implementation using our proven 14-week delivery framework. Parallel data migration by specialist sub-contractor DataBridge. ISO 27001-aligned security controls built in from sprint 1.</p>
            <ul className="nabc-list">
              <li>Phased go-live: core in wk 10, full rollout wk 14</li>
              <li>Dedicated Engagement Lead — named, committed resource</li>
              <li>On-site 2 days/wk for discovery and UAT phases</li>
              <li>24/7 incident line during hypercare window</li>
            </ul>
          </div>
        </div>
        <div className="nabc-card">
          <div className="nabc-letter nabc-b">B</div>
          <div className="nabc-body">
            <div className="nabc-title">Benefit</div>
            <p className="nabc-desc">Eliminates $420K/yr in manual workarounds. Delivers full legislative compliance before the Jan 2026 deadline. Establishes a reusable data platform for 3 downstream agency initiatives already approved.</p>
            <ul className="nabc-list">
              <li>ROI-positive by month 14 · gross margin 31%</li>
              <li>NPV +$612K over 3 years at 10% discount rate</li>
              <li>Federal reference unlocks $8.2M sector pipeline</li>
              <li>TechCore v4 upgrade amortises across 3 follow-on bids</li>
            </ul>
          </div>
        </div>
        <div className="nabc-card">
          <div className="nabc-letter nabc-c">C</div>
          <div className="nabc-body">
            <div className="nabc-title">Competition</div>
            <p className="nabc-desc">Nexora (incumbent) failed 3 upgrade cycles and uses T&amp;M with 15–22% historical overrun. Vantrix is ISO-certified but $300K higher and 6 weeks slower. PinPoint is cheapest but has no TechCore v4 capability.</p>
            <ul className="nabc-list">
              <li>Only fixed-price bid with native TechCore v4 delivery</li>
              <li>Fastest delivery: 14 wks vs. 18–22 wk competitor range</li>
              <li>3 public Nexora SLA breaches in 2024 (FOI-available)</li>
              <li>Our TCO beats incumbent by $340K over 2 years</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Market Opportunity Funnel ────────────────────────────────────── */}
      <div className="overview-card">
        <div className="overview-card-header">
          <span className="overview-card-icon">▽</span>
          Market Opportunity Funnel
        </div>
        <svg viewBox="0 0 400 260" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Connecting trapezoid lines between tiers */}
          {/* Tier 1 bottom corners to Tier 2 top corners */}
          <line x1={20}  y1={80}  x2={70}  y2={95}  stroke="#D1D5DB" strokeWidth={1} />
          <line x1={380} y1={80}  x2={330} y2={95}  stroke="#D1D5DB" strokeWidth={1} />
          {/* Tier 2 bottom corners to Tier 3 top corners */}
          <line x1={70}  y1={155} x2={120} y2={170} stroke="#D1D5DB" strokeWidth={1} />
          <line x1={330} y1={155} x2={280} y2={170} stroke="#D1D5DB" strokeWidth={1} />

          {/* Tier 1: Total Addressable Market */}
          <rect x={20} y={20} width={360} height={60} fill="#3B82F620" stroke="#3B82F6" strokeWidth={1.5} rx={3} />
          <text x={200} y={46} fontSize={12} fontWeight="bold" fill="#1F2937" textAnchor="middle">Total Addressable Market</text>
          <text x={200} y={62} fontSize={10} fill="#6B7280" textAnchor="middle">$2.4B — Global AI Pre-Sales Tools</text>
          <text x={388} y={55} fontSize={9} fill="#3B82F6" textAnchor="end" fontWeight="bold">100%</text>

          {/* Tier 2: Serviceable Market */}
          <rect x={70} y={95} width={260} height={60} fill="#8B5CF620" stroke="#8B5CF6" strokeWidth={1.5} rx={3} />
          <text x={200} y={121} fontSize={12} fontWeight="bold" fill="#1F2937" textAnchor="middle">Serviceable Market</text>
          <text x={200} y={137} fontSize={10} fill="#6B7280" textAnchor="middle">$340M — Mid-Large Enterprise (500+ employees)</text>
          <text x={338} y={130} fontSize={9} fill="#8B5CF6" textAnchor="end" fontWeight="bold">14%</text>

          {/* Tier 3: Target Segment */}
          <rect x={120} y={170} width={160} height={60} fill="#10B98120" stroke="#10B981" strokeWidth={1.5} rx={3} />
          <text x={200} y={196} fontSize={12} fontWeight="bold" fill="#1F2937" textAnchor="middle">Target Segment</text>
          <text x={200} y={212} fontSize={10} fill="#6B7280" textAnchor="middle">$48M — AI-First Custom Dev Shops</text>
          <text x={288} y={205} fontSize={9} fill="#10B981" textAnchor="end" fontWeight="bold">2%</text>
        </svg>
      </div>

    </div>
  )
}
