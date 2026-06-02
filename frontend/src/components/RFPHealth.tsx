import './RFPHealth.css'

export function RFPHealth() {
  return (
    <div className="rfp-health">
      {/* Overview Banner */}
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">Enterprise Resource Planning Modernisation</div>
            <div className="overview-banner-client">Meridian Public Services · Project #RFP-2025-0042</div>
          </div>
          <span className="health-badge health-badge--danger overview-banner-status">AT RISK</span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Health Score</span>
            <span className="overview-stat-value overview-stat-score--warn">62 / 100</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Award Probability</span>
            <span className="overview-stat-value overview-stat-score--warn">34%</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Submission</span>
            <span className="overview-stat-value health-val--danger">Mar 15, 2025 · OVERDUE</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Award</span>
            <span className="overview-stat-value">Apr 1, 2025</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Contract Start</span>
            <span className="overview-stat-value">May 1, 2025</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Est. Value</span>
            <span className="overview-stat-value">$2.4M – $3.1M</span>
          </div>
        </div>
      </div>

      {/* RFP Team */}
      <div className="rfp-section-heading">RFP Team</div>
      <div className="health-grid health-grid--team">
        {/* Progress block */}
        <div className="health-card team-progress-card">
          <div className="health-card-header">
            <span className="health-card-icon">◎</span>
            Evaluation Progress
          </div>
          <div className="team-progress-body">
            <div className="team-progress-steps">
              <div className="team-progress-step team-progress-step--done">
                <span className="team-progress-step-dot" />
                <span className="team-progress-step-date">Mar 1, 2025</span>
                <span>RFP created</span>
              </div>
              <div className="team-progress-step team-progress-step--done">
                <span className="team-progress-step-dot" />
                <span className="team-progress-step-date">Mar 3, 2025</span>
                <span>Requirements extracted</span>
              </div>
              <div className="team-progress-step team-progress-step--done">
                <span className="team-progress-step-dot" />
                <span className="team-progress-step-date">Mar 8, 2025</span>
                <span>Q&amp;A</span>
              </div>
              <div className="team-progress-step team-progress-step--done">
                <span className="team-progress-step-dot" />
                <span className="team-progress-step-date">Mar 10, 2025</span>
                <span>Business analytics</span>
              </div>
              <div className="team-progress-step team-progress-step--done">
                <span className="team-progress-step-dot" />
                <span className="team-progress-step-date">Mar 11, 2025</span>
                <span>UI/UX Design</span>
              </div>
              <div className="team-progress-step team-progress-step--done">
                <span className="team-progress-step-dot" />
                <span className="team-progress-step-date">Mar 11, 2025</span>
                <span>Technical solution</span>
              </div>
              <div className="team-progress-step team-progress-step--done">
                <span className="team-progress-step-dot" />
                <span className="team-progress-step-date">Mar 12, 2025</span>
                <span>Timeline</span>
              </div>
              <div className="team-progress-step team-progress-step--done">
                <span className="team-progress-step-dot" />
                <span className="team-progress-step-date">Mar 13, 2025</span>
                <span>Team composition</span>
              </div>
              <div className="team-progress-step team-progress-step--done">
                <span className="team-progress-step-dot" />
                <span className="team-progress-step-date">Mar 14, 2025</span>
                <span>Cost of ownership</span>
              </div>
              <div className="team-progress-step team-progress-step--pending">
                <span className="team-progress-step-dot" />
                <span className="team-progress-step-date">Mar 15, 2025</span>
                <span>Vendor proposal reviewed</span>
              </div>
              <div className="team-progress-step team-progress-step--pending">
                <span className="team-progress-step-dot" />
                <span className="team-progress-step-date">Mar 15, 2025</span>
                <span>Evaluation complete</span>
              </div>
            </div>
            <div className="team-progress-bar-row">
              <div className="team-progress-bar-track">
                <div className="team-progress-bar-fill" style={{ width: '87%' }} />
              </div>
              <span className="team-progress-pct">87%</span>
            </div>
            <button className="team-progress-download" disabled>
              ↓ Download Vendor Proposal as PDF
            </button>
          </div>
        </div>

        {/* Team table */}
        <div className="health-card">
          <table className="health-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="health-table-label">RFP Owner</td>
                <td>—</td>
                <td><span className="health-badge health-badge--warn">Not assigned</span></td>
              </tr>
              <tr>
                <td className="health-table-label">Business Analyst (BA)</td>
                <td>—</td>
                <td><span className="health-badge health-badge--warn">Not assigned</span></td>
              </tr>
              <tr>
                <td className="health-table-label">Solution Architect (SA)</td>
                <td>—</td>
                <td><span className="health-badge health-badge--warn">Not assigned</span></td>
              </tr>
              <tr>
                <td className="health-table-label">Proposal Manager</td>
                <td>—</td>
                <td><span className="health-badge health-badge--warn">Not assigned</span></td>
              </tr>
              <tr>
                <td className="health-table-label">Legal / Compliance</td>
                <td>—</td>
                <td><span className="health-badge health-badge--warn">Not assigned</span></td>
              </tr>
              <tr>
                <td className="health-table-label">Pricing Lead</td>
                <td>—</td>
                <td><span className="health-badge health-badge--warn">Not assigned</span></td>
              </tr>
              <tr>
                <td className="health-table-label">Executive Sponsor</td>
                <td>—</td>
                <td><span className="health-badge health-badge--warn">Not assigned</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* RFP Health subsection */}
      <div className="rfp-section-heading">RFP Health</div>

      <div className="health-grid">
        {/* Budget Signals */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">$</span>
            Budget Signals
            <span className="health-badge health-badge--warn">Review Required</span>
          </div>
          <table className="health-table">
            <tbody>
              <tr>
                <td className="health-table-label">Estimated Contract Value</td>
                <td className="health-table-value health-val--strong">$2.4M – $3.1M</td>
              </tr>
              <tr>
                <td className="health-table-label">Budget Confirmed in RFP</td>
                <td className="health-table-value health-val--warn">Implied only — no hard cap stated</td>
              </tr>
              <tr>
                <td className="health-table-label">Price Weight in Evaluation</td>
                <td className="health-table-value health-val--danger">40% — Heavily price-driven</td>
              </tr>
              <tr>
                <td className="health-table-label">Payment Terms</td>
                <td className="health-table-value">Net 60 · Milestone-based</td>
              </tr>
              <tr>
                <td className="health-table-label">Penalty Clauses</td>
                <td className="health-table-value health-val--danger">Yes — 2% per week delay</td>
              </tr>
              <tr>
                <td className="health-table-label">Multi-year Option</td>
                <td className="health-table-value health-val--ok">2+1+1 renewal structure</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Compliance Checklist */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">✓</span>
            Compliance Checklist
            <span className="health-badge health-badge--danger">4 Critical Gaps</span>
          </div>
          <ul className="health-checklist">
            <li className="health-check health-check--fail">
              <span className="health-check-icon" />
              <span>Submission deadline — <strong>MISSED (Mar 15)</strong>. Request extension immediately or withdraw.</span>
            </li>
            <li className="health-check health-check--fail">
              <span className="health-check-icon" />
              <span>ISO 27001 certification — <strong>NOT provided</strong>. Section 4.3 mandates it. No waiver path stated.</span>
            </li>
            <li className="health-check health-check--fail">
              <span className="health-check-icon" />
              <span>Client references — <strong>1 of 3 required submitted</strong>. Evaluators will score zero on this criterion.</span>
            </li>
            <li className="health-check health-check--fail">
              <span className="health-check-icon" />
              <span>Conflict of interest declaration — <strong>Form missing</strong>. Mandatory per Annex C.</span>
            </li>
            <li className="health-check health-check--warn">
              <span className="health-check-icon" />
              <span>Pricing format — Provided but does not match required Schedule B template exactly.</span>
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              Technical requirements narrative — Addressed. All 23 mandatory items covered.
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              Signed executive cover letter — Present.
            </li>
            <li className="health-check health-check--ok">
              <span className="health-check-icon" />
              Subcontractor disclosure — Completed per Section 7.1.
            </li>
          </ul>
        </div>

        {/* Competitive Risk */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">!</span>
            Competitive Risk Flags
            <span className="health-badge health-badge--danger">3 High-Risk Signals</span>
          </div>
          <ul className="health-risk-list">
            <li className="health-risk health-risk--high">
              <span className="health-risk-level">HIGH</span>
              <div>
                <strong>Incumbent advantage</strong> — Existing vendor (Nexora Systems) has 3-year relationship. Switching cost language in Section 9 favors renewal.
              </div>
            </li>
            <li className="health-risk health-risk--high">
              <span className="health-risk-level">HIGH</span>
              <div>
                <strong>RFP language appears pre-written for competitor</strong> — "Must have deployed 50+ enterprise instances using the TechCore v4 framework" — very specific, non-generic requirement.
              </div>
            </li>
            <li className="health-risk health-risk--high">
              <span className="health-risk-level">HIGH</span>
              <div>
                <strong>7-day turnaround window</strong> — Insufficient time for a compliant response without pre-existing RFP preparation. Shortlisted incumbents likely had advance notice.
              </div>
            </li>
            <li className="health-risk health-risk--med">
              <span className="health-risk-level">MED</span>
              <div>
                <strong>Vague acceptance criteria</strong> — "Best overall value" defined only at evaluator discretion. Score can be manipulated post-submission.
              </div>
            </li>
            <li className="health-risk health-risk--med">
              <span className="health-risk-level">MED</span>
              <div>
                <strong>Single point of contact</strong> — All clarifications route through J. Matthews (Procurement). No technical pre-submission dialogue offered.
              </div>
            </li>
            <li className="health-risk health-risk--low">
              <span className="health-risk-level">LOW</span>
              <div>
                Geographic preference clause may disadvantage remote delivery model in scoring.
              </div>
            </li>
          </ul>
        </div>

        {/* Timeline */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">⏱</span>
            RFP Timeline
          </div>
          <ul className="health-timeline">
            <li className="health-tl-item health-tl--done">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Mar 1, 2025</span>
                <span className="health-tl-event">RFP Issued</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--done">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Mar 8, 2025</span>
                <span className="health-tl-event">Q&amp;A Deadline — <em>3 questions submitted, 1 unanswered</em></span>
              </div>
            </li>
            <li className="health-tl-item health-tl--overdue">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Mar 15, 2025</span>
                <span className="health-tl-event">Submission Due — <strong>OVERDUE</strong></span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Mar 20, 2025</span>
                <span className="health-tl-event">Shortlist Notification</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Mar 28, 2025</span>
                <span className="health-tl-event">Oral Presentations (if shortlisted)</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">Apr 1, 2025</span>
                <span className="health-tl-event">Award Announcement</span>
              </div>
            </li>
            <li className="health-tl-item health-tl--future">
              <span className="health-tl-dot" />
              <div>
                <span className="health-tl-date">May 1, 2025</span>
                <span className="health-tl-event">Contract Start</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Decision Makers */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">👤</span>
            Key Decision Makers
          </div>
          <table className="health-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Name</th>
                <th>Influence</th>
                <th>Intel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="health-table-label">Executive Sponsor</td>
                <td>C. Harrington, VP Operations</td>
                <td><span className="health-badge health-badge--danger">Decisive</span></td>
                <td className="health-val--warn">Not engaged. No meeting secured.</td>
              </tr>
              <tr>
                <td className="health-table-label">Procurement Lead</td>
                <td>J. Matthews</td>
                <td><span className="health-badge health-badge--warn">High</span></td>
                <td>Process-focused. Strict on compliance.</td>
              </tr>
              <tr>
                <td className="health-table-label">Technical Evaluator</td>
                <td>Dr. S. Park</td>
                <td><span className="health-badge health-badge--warn">High</span></td>
                <td className="health-val--ok">Responded positively to Q&amp;A. Potential champion.</td>
              </tr>
              <tr>
                <td className="health-table-label">Finance Approver</td>
                <td>Unknown</td>
                <td><span className="health-badge">Medium</span></td>
                <td className="health-val--warn">Not identified in RFP. Must uncover.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Items */}
        <div className="health-card">
          <div className="health-card-header">
            <span className="health-card-icon">→</span>
            Required Actions
            <span className="health-badge health-badge--danger">3 Urgent</span>
          </div>
          <ul className="health-actions">
            <li className="health-action health-action--urgent">
              <span className="health-action-tag">URGENT</span>
              <div>
                <strong>Request deadline extension</strong> — Contact J. Matthews today. Frame as "minor clarification required." Without this, submission is disqualified.
              </div>
            </li>
            <li className="health-action health-action--urgent">
              <span className="health-action-tag">URGENT</span>
              <div>
                <strong>Source 2 additional client references</strong> — Must match scope: enterprise software implementation, $1M+. Contact Account Management now. Do not submit without 3.
              </div>
            </li>
            <li className="health-action health-action--urgent">
              <span className="health-action-tag">URGENT</span>
              <div>
                <strong>Obtain or waive ISO 27001</strong> — Engage Legal for expedited certification path or draft a waiver letter citing equivalent controls. This is a show-stopper.
              </div>
            </li>
            <li className="health-action health-action--high">
              <span className="health-action-tag">HIGH</span>
              <div>
                <strong>Reformat pricing to Schedule B</strong> — Mismatched format will be scored down. Assign proposal manager to align layout exactly.
              </div>
            </li>
            <li className="health-action health-action--high">
              <span className="health-action-tag">HIGH</span>
              <div>
                <strong>Engage VP Operations before oral presentation</strong> — Executive-to-executive outreach required. If C. Harrington is not familiar with the vendor's capabilities, the bid will struggle in the final round.
              </div>
            </li>
            <li className="health-action health-action--med">
              <span className="health-action-tag">MED</span>
              <div>
                Sign and attach Conflict of Interest declaration (Annex C). 5-minute fix. No excuse.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
