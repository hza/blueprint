export function UXDesign() {
  return (
    <div className="rfp-health">
      {/* Banner */}
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">UI/UX Design</div>
            <div className="overview-banner-client">
              Design system coverage: 84% — 2 user flows pending wireframe sign-off
            </div>
          </div>
          <span className="health-badge health-badge--warn overview-banner-status">IN REVIEW</span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Design Score</span>
            <span className="overview-stat-value overview-stat-score--ok">82 / 100</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Design Tool</span>
            <span className="overview-stat-value">Figma · Design System v2.4</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Screens</span>
            <span className="overview-stat-value">47 designed · 38 approved</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Accessibility</span>
            <span className="overview-stat-value">WCAG 2.1 AA</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Open Issues</span>
            <span className="overview-stat-value health-val--warn">2</span>
          </div>
        </div>
      </div>

      <div className="health-grid">
        {/* Design System */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">◈</span>
            Design System
            <span className="health-badge health-badge--ok">Published</span>
          </div>
          <table className="health-table">
            <tbody>
              <tr>
                <td className="health-table-label">Component Library</td>
                <td className="health-table-value health-val--strong">72 components · Storybook v7</td>
              </tr>
              <tr>
                <td className="health-table-label">Token Set</td>
                <td className="health-table-value">Color · Spacing · Typography · Motion</td>
              </tr>
              <tr>
                <td className="health-table-label">Primary Font</td>
                <td className="health-table-value">Inter · 14/16/20/24 px scale</td>
              </tr>
              <tr>
                <td className="health-table-label">Color Palette</td>
                <td className="health-table-value">Brand Blue #0969DA · Neutral Gray · Status ×4</td>
              </tr>
              <tr>
                <td className="health-table-label">Icon Set</td>
                <td className="health-table-value">Phosphor Icons — 1 840 glyphs · SVG sprite</td>
              </tr>
              <tr>
                <td className="health-table-label">Grid</td>
                <td className="health-table-value">12-col · 24 px gutter · 1440 / 1280 / 768 breakpoints</td>
              </tr>
              <tr>
                <td className="health-table-label">Dark Mode</td>
                <td className="health-table-value">Planned — Phase 2</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* User Flows */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">⤳</span>
            Key User Flows
            <span className="health-badge health-badge--warn">2 Pending</span>
          </div>
          <ul className="health-checklist">
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <span>User onboarding &amp; account activation — 5-step wizard, email verification, role assignment</span>
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <span>Dashboard &amp; KPI overview — real-time data widgets, drill-down charts, export to PDF/XLSX</span>
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <span>Document upload &amp; classification — drag-and-drop, auto-tag, version history panel</span>
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              <span>Search &amp; filter — faceted search, saved filters, keyboard-navigable result list</span>
            </li>
            <li className="health-check health-check--warn">
              <span className="health-check-icon" />
              <span>Approval workflow — wireframes drafted but stakeholder sign-off outstanding (due 2026-06-04)</span>
            </li>
            <li className="health-check health-check--fail">
              <span className="health-check-icon" />
              <span>Offline / field mode UI — <strong>NOT designed</strong>. Sync indicators and conflict resolution screens required by Section 8.1</span>
            </li>
          </ul>
        </div>

        {/* Accessibility */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">⬡</span>
            Accessibility &amp; Usability
            <span className="health-badge health-badge--ok">AA Compliant</span>
          </div>
          <ul className="health-risk-list">
            <li className="health-risk health-risk--low">
              <span className="health-risk-level">OK</span>
              <div>
                <strong>Contrast ratios</strong> — All text/bg pairs pass 4.5 : 1 minimum. Large headings pass 3 : 1. Verified with Figma A11y plugin.
              </div>
            </li>
            <li className="health-risk health-risk--low">
              <span className="health-risk-level">OK</span>
              <div>
                <strong>Keyboard navigation</strong> — Full tab-order mapped; focus rings visible at 2 px offset; skip-to-content link on all pages.
              </div>
            </li>
            <li className="health-risk health-risk--med">
              <span className="health-risk-level">RISK</span>
              <div>
                <strong>Chart accessibility</strong> — Data tables as fallback not yet designed for all 8 dashboard widgets. Screen-reader labels pending.
              </div>
            </li>
            <li className="health-risk health-risk--high">
              <span className="health-risk-level">GAP</span>
              <div>
                <strong>Mobile responsive</strong> — 768 px breakpoint designed; below 480 px (phone) not in scope but RFP Section 7.3 implies mobile field use.
              </div>
            </li>
          </ul>
        </div>

        {/* Usability Testing */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">◎</span>
            Usability Testing Plan
          </div>
          <ul className="health-timeline">
            <li className="health-tl-item health-tl--done">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Week 1–2</span>
                <span className="health-tl-event">Heuristic evaluation — 3 UX leads reviewed 47 screens against Nielsen's 10 heuristics. 14 issues filed.</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--done">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Week 3</span>
                <span className="health-tl-event">Cognitive walkthrough — 5 internal participants completed core task scenarios. SUS score: 78 (Good).</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Week 5–6</span>
                <span className="health-tl-event">Moderated prototype sessions — 8 client users on interactive Figma prototype. Task completion &amp; time-on-task metrics.</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Week 7</span>
                <span className="health-tl-event">Iteration round — address critical findings before dev handoff. Target SUS ≥ 85.</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Post-pilot</span>
                <span className="health-tl-event">A/B test dashboard layout variants with 50-user pilot group. Measure task efficiency and error rate.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Screen Inventory */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">▦</span>
            Screen Inventory
          </div>
          <table className="health-table">
            <thead>
              <tr>
                <th>Module</th>
                <th>Screens</th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="health-table-label">Auth &amp; Onboarding</td>
                <td>6</td>
                <td className="health-val--ok">Approved</td>
                <td>J. Park</td>
              </tr>
              <tr>
                <td className="health-table-label">Dashboard</td>
                <td>8</td>
                <td className="health-val--ok">Approved</td>
                <td>J. Park</td>
              </tr>
              <tr>
                <td className="health-table-label">Document Management</td>
                <td>10</td>
                <td className="health-val--ok">Approved</td>
                <td>R. Torres</td>
              </tr>
              <tr>
                <td className="health-table-label">Search &amp; Filter</td>
                <td>5</td>
                <td className="health-val--ok">Approved</td>
                <td>R. Torres</td>
              </tr>
              <tr>
                <td className="health-table-label">Approval Workflow</td>
                <td>7</td>
                <td className="health-val--warn">In Review</td>
                <td>J. Park</td>
              </tr>
              <tr>
                <td className="health-table-label">Admin &amp; Settings</td>
                <td>6</td>
                <td className="health-val--ok">Approved</td>
                <td>R. Torres</td>
              </tr>
              <tr>
                <td className="health-table-label">Offline / Field Mode</td>
                <td>5</td>
                <td className="health-val--fail">Not Started</td>
                <td>TBD</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Open Design Actions */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">→</span>
            Open Design Actions
            <span className="health-badge health-badge--danger">2 Blocking</span>
          </div>
          <ul className="health-actions">
            <li className="health-action health-action--urgent">
              <span className="health-action-tag">BLOCKING</span>
              <div>
                <strong>Design offline / field mode screens</strong> — 5 screens required covering sync status, conflict resolution, and degraded-mode indicators. Assign R. Torres by 2026-06-06.
              </div>
            </li>
            <li className="health-action health-action--urgent">
              <span className="health-action-tag">BLOCKING</span>
              <div>
                <strong>Stakeholder sign-off on approval workflow</strong> — 3 review rounds completed; final approval from client Product Owner pending since 2026-05-20. Escalate to PM.
              </div>
            </li>
            <li className="health-action health-action--high">
              <span className="health-action-tag">HIGH</span>
              <div>
                <strong>Chart accessibility fallback tables</strong> — Design data-table counterparts for all 8 dashboard widgets. Required for WCAG 2.1 AA compliance audit.
              </div>
            </li>
            <li className="health-action health-action--high">
              <span className="health-action-tag">HIGH</span>
              <div>
                <strong>Mobile (&lt;480 px) layout pass</strong> — Validate field-use screens at phone viewport. Coordinate with backend team on offline sync UX before designing.
              </div>
            </li>
            <li className="health-action health-action--med">
              <span className="health-action-tag">MED</span>
              <div>
                Schedule moderated prototype sessions with 8 client users — coordinate with client PM to confirm participant list and dates for Week 5–6 window.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
