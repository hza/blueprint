export function UXDesign() {
  return (
    <div className="overview">
      {/* Banner */}
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">UI/UX Design</div>
            <div className="overview-banner-client">
              Design system coverage: 84% — 2 user flows pending wireframe sign-off
            </div>
          </div>
          <span className="overview-badge overview-badge--warn overview-banner-status">IN REVIEW</span>
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
            <span className="overview-stat-value overview-val--warn">2</span>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        {/* Design System */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">◈</span>
            Design System
            <span className="overview-badge overview-badge--ok">Published</span>
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Component Library</td>
                <td className="overview-table-value overview-val--strong">72 components · Storybook v7</td>
              </tr>
              <tr>
                <td className="overview-table-label">Token Set</td>
                <td className="overview-table-value">Color · Spacing · Typography · Motion</td>
              </tr>
              <tr>
                <td className="overview-table-label">Primary Font</td>
                <td className="overview-table-value">Inter · 14/16/20/24 px scale</td>
              </tr>
              <tr>
                <td className="overview-table-label">Color Palette</td>
                <td className="overview-table-value">Brand Blue #0969DA · Neutral Gray · Status ×4</td>
              </tr>
              <tr>
                <td className="overview-table-label">Icon Set</td>
                <td className="overview-table-value">Phosphor Icons — 1 840 glyphs · SVG sprite</td>
              </tr>
              <tr>
                <td className="overview-table-label">Grid</td>
                <td className="overview-table-value">12-col · 24 px gutter · 1440 / 1280 / 768 breakpoints</td>
              </tr>
              <tr>
                <td className="overview-table-label">Dark Mode</td>
                <td className="overview-table-value">Planned — Phase 2</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* User Flows */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">⤳</span>
            Key User Flows
            <span className="overview-badge overview-badge--warn">2 Pending</span>
          </div>
          <ul className="overview-checklist">
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <span>User onboarding &amp; account activation — 5-step wizard, email verification, role assignment</span>
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <span>Dashboard &amp; KPI overview — real-time data widgets, drill-down charts, export to PDF/XLSX</span>
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <span>Document upload &amp; classification — drag-and-drop, auto-tag, version history panel</span>
            </li>
            <li className="overview-check overview-check--ok">
              <span className="overview-check-icon" />
              <span>Search &amp; filter — faceted search, saved filters, keyboard-navigable result list</span>
            </li>
            <li className="overview-check overview-check--warn">
              <span className="overview-check-icon" />
              <span>Approval workflow — wireframes drafted but stakeholder sign-off outstanding (due 2026-06-04)</span>
            </li>
            <li className="overview-check overview-check--fail">
              <span className="overview-check-icon" />
              <span>Offline / field mode UI — <strong>NOT designed</strong>. Sync indicators and conflict resolution screens required by Section 8.1</span>
            </li>
          </ul>
        </div>

        {/* Accessibility */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">⬡</span>
            Accessibility &amp; Usability
            <span className="overview-badge overview-badge--ok">AA Compliant</span>
          </div>
          <ul className="overview-risk-list">
            <li className="overview-risk overview-risk--low">
              <span className="overview-risk-level">OK</span>
              <div>
                <strong>Contrast ratios</strong> — All text/bg pairs pass 4.5 : 1 minimum. Large headings pass 3 : 1. Verified with Figma A11y plugin.
              </div>
            </li>
            <li className="overview-risk overview-risk--low">
              <span className="overview-risk-level">OK</span>
              <div>
                <strong>Keyboard navigation</strong> — Full tab-order mapped; focus rings visible at 2 px offset; skip-to-content link on all pages.
              </div>
            </li>
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">RISK</span>
              <div>
                <strong>Chart accessibility</strong> — Data tables as fallback not yet designed for all 8 dashboard widgets. Screen-reader labels pending.
              </div>
            </li>
            <li className="overview-risk overview-risk--high">
              <span className="overview-risk-level">GAP</span>
              <div>
                <strong>Mobile responsive</strong> — 768 px breakpoint designed; below 480 px (phone) not in scope but RFP Section 7.3 implies mobile field use.
              </div>
            </li>
          </ul>
        </div>

        {/* Usability Testing */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">◎</span>
            Usability Testing Plan
          </div>
          <ul className="overview-timeline">
            <li className="overview-tl-item overview-tl--done">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Week 1–2</span>
                <span className="overview-tl-event">Heuristic evaluation — 3 UX leads reviewed 47 screens against Nielsen's 10 heuristics. 14 issues filed.</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--done">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Week 3</span>
                <span className="overview-tl-event">Cognitive walkthrough — 5 participants completed core task scenarios. SUS score: 78 (Good).</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Week 5–6</span>
                <span className="overview-tl-event">Moderated prototype sessions — 8 client users on interactive Figma prototype. Task completion &amp; time-on-task metrics.</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Week 7</span>
                <span className="overview-tl-event">Iteration round — address critical findings before dev handoff. Target SUS ≥ 85.</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Post-pilot</span>
                <span className="overview-tl-event">A/B test dashboard layout variants with 50-user pilot group. Measure task efficiency and error rate.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Screen Inventory */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">▦</span>
            Screen Inventory
          </div>
          <table className="overview-table">
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
                <td className="overview-table-label">Auth &amp; Onboarding</td>
                <td>6</td>
                <td className="overview-val--ok">Approved</td>
                <td>J. Park</td>
              </tr>
              <tr>
                <td className="overview-table-label">Dashboard</td>
                <td>8</td>
                <td className="overview-val--ok">Approved</td>
                <td>J. Park</td>
              </tr>
              <tr>
                <td className="overview-table-label">Document Management</td>
                <td>10</td>
                <td className="overview-val--ok">Approved</td>
                <td>R. Torres</td>
              </tr>
              <tr>
                <td className="overview-table-label">Search &amp; Filter</td>
                <td>5</td>
                <td className="overview-val--ok">Approved</td>
                <td>R. Torres</td>
              </tr>
              <tr>
                <td className="overview-table-label">Approval Workflow</td>
                <td>7</td>
                <td className="overview-val--warn">In Review</td>
                <td>J. Park</td>
              </tr>
              <tr>
                <td className="overview-table-label">Admin &amp; Settings</td>
                <td>6</td>
                <td className="overview-val--ok">Approved</td>
                <td>R. Torres</td>
              </tr>
              <tr>
                <td className="overview-table-label">Offline / Field Mode</td>
                <td>5</td>
                <td className="overview-val--fail">Not Started</td>
                <td>TBD</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Open Design Actions */}
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">→</span>
            Open Design Actions
            <span className="overview-badge overview-badge--danger">2 Blocking</span>
          </div>
          <ul className="overview-actions">
            <li className="overview-action overview-action--urgent">
              <span className="overview-action-tag">BLOCKING</span>
              <div>
                <strong>Design offline / field mode screens</strong> — 5 screens required covering sync status, conflict resolution, and degraded-mode indicators. Assign R. Torres by 2026-06-06.
              </div>
            </li>
            <li className="overview-action overview-action--urgent">
              <span className="overview-action-tag">BLOCKING</span>
              <div>
                <strong>Stakeholder sign-off on approval workflow</strong> — 3 review rounds completed; final approval from your Product Owner pending since 2026-05-20.
              </div>
            </li>
            <li className="overview-action overview-action--high">
              <span className="overview-action-tag">HIGH</span>
              <div>
                <strong>Chart accessibility fallback tables</strong> — Design data-table counterparts for all 8 dashboard widgets. Required for WCAG 2.1 AA compliance audit.
              </div>
            </li>
            <li className="overview-action overview-action--high">
              <span className="overview-action-tag">HIGH</span>
              <div>
                <strong>Mobile (&lt;480 px) layout pass</strong> — Validate field-use screens at phone viewport. Offline sync UX to be confirmed before dev handoff.
              </div>
            </li>
            <li className="overview-action overview-action--med">
              <span className="overview-action-tag">MED</span>
              <div>
                Moderated prototype sessions with 8 Meridian users scheduled for Week 5–6. Participant list and dates to be confirmed with your programme team.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
