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
            <p className="nabc-desc">Nexora (incumbent) failed 3 upgrade cycles and uses T&M with 15–22% historical overrun. Vantrix is ISO-certified but $300K higher and 6 weeks slower. PinPoint is cheapest but has no TechCore v4 capability.</p>
            <ul className="nabc-list">
              <li>Only fixed-price bid with native TechCore v4 delivery</li>
              <li>Fastest delivery: 14 wks vs. 18–22 wk competitor range</li>
              <li>3 public Nexora SLA breaches in 2024 (FOI-available)</li>
              <li>Our TCO beats incumbent by $340K over 2 years</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
