export function DeliveryGovernance({ subsection }: { subsection?: string }) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">5. Delivery &amp; Governance</div>
            <div className="overview-banner-client">Meridian Public Services · ERP Modernisation · RFP-2025-0042</div>
          </div>
          <span className="overview-badge overview-badge--ok">ON TRACK</span>
        </div>
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Methodology</span>
            <span className="overview-stat-value">Scaled Agile</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Duration</span>
            <span className="overview-stat-value">6 months</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Phases</span>
            <span className="overview-stat-value">5</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Sprint Length</span>
            <span className="overview-stat-value">2 weeks</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Open Risks</span>
            <span className="overview-stat-value overview-val--warn">4</span>
          </div>
        </div>
      </div>

      {show('5.1') && (<>
      {/* 5.1 Delivery Approach & Timeline */}
      <div className="rfp-section-heading" id="5.1">Delivery Approach &amp; Timeline</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">◎</span>
            Programme Phases
          </div>
          <ul className="overview-timeline">
            <li className="overview-tl-item overview-tl--done">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">May 1 – Jun 15, 2025</span>
                <span className="overview-tl-event"><strong>Phase 1: Discovery &amp; Design</strong> — Workshops, current-state analysis, finalised architecture blueprint, confirmed data migration strategy, approved UX wireframes.</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Jun 16 – Oct 31, 2025</span>
                <span className="overview-tl-event"><strong>Phase 2: Core Build</strong> — Foundation modules: finance, HR, procurement. 10 sprints. UAT gate at sprint 8. Internal load test at sprint 10.</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Nov 1 – Jan 31, 2026</span>
                <span className="overview-tl-event"><strong>Phase 3: Integration &amp; Data Migration</strong> — Legacy system connectors, ETL pipeline execution, parallel-run validation, user acceptance sign-off.</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Feb 1 – Mar 31, 2026</span>
                <span className="overview-tl-event"><strong>Phase 4: Training &amp; Pilot</strong> — Super-user training, department pilot (Finance first), defect remediation, go/no-go review.</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">Apr 1 – Oct 31, 2026</span>
                <span className="overview-tl-event"><strong>Phase 5: Go-Live &amp; Hypercare</strong> — Phased department rollout (4 waves), hypercare support (4 weeks per wave), knowledge transfer, transition to BAU.</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">⚙</span>
            Agile Delivery Framework
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Methodology</td>
                <td>SAFe 6.0 (Scaled Agile Framework). Programme Increment (PI) planning every 10 weeks. Feature-team model with 3 squads.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Sprint Ceremonies</td>
                <td>Daily stand-up (15 min), Sprint Planning (4 hrs), Sprint Review + Demo (2 hrs), Retrospective (1.5 hrs). Meridian product owner attends Sprint Review.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Definition of Done</td>
                <td>Code reviewed, unit tests ≥ 80% coverage, integration tests green, documented in Confluence, demo'd to PO, approved security scan, deployed to staging.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Release Cadence</td>
                <td>Production-ready build every sprint. Controlled releases to production quarterly (or as agreed) with change advisory board (CAB) approval.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Tooling</td>
                <td>Jira (backlog &amp; tracking), Confluence (documentation), Azure DevOps (CI/CD pipelines), MS Teams (communication), Power BI (progress dashboards).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('5.2') && (<>
      {/* 5.2 Team & Roles */}
      <div className="rfp-section-heading" id="5.2">Team &amp; Roles</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">👥</span>
            Your Delivery Team
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Name</th>
                <th>Allocation</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Programme Director</td>
                <td>Sarah Chen</td>
                <td>50%</td>
                <td>Sydney (on-site Tues–Thurs)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Solution Architect</td>
                <td>Mark Okonkwo</td>
                <td>100%</td>
                <td>Sydney (on-site)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Tech Lead / Squad Lead</td>
                <td>Priya Ramaswamy</td>
                <td>100%</td>
                <td>Sydney</td>
              </tr>
              <tr>
                <td className="overview-table-label">Senior Developers (×3)</td>
                <td>Nominated in Annex D</td>
                <td>100%</td>
                <td>Sydney + Canberra</td>
              </tr>
              <tr>
                <td className="overview-table-label">QA Lead</td>
                <td>James Obi</td>
                <td>100%</td>
                <td>Melbourne</td>
              </tr>
              <tr>
                <td className="overview-table-label">Business Analyst (×2)</td>
                <td>Nominated in Annex D</td>
                <td>100%</td>
                <td>Canberra (on-site Mon–Wed)</td>
              </tr>
              <tr>
                <td className="overview-table-label">UX Designer</td>
                <td>Lena Vogel</td>
                <td>75%</td>
                <td>Sydney</td>
              </tr>
              <tr>
                <td className="overview-table-label">Data Migration Lead</td>
                <td>Adrian Bose</td>
                <td>100% (Phases 1 &amp; 3)</td>
                <td>Canberra</td>
              </tr>
              <tr>
                <td className="overview-table-label">Change Manager</td>
                <td>Fatima Hassan</td>
                <td>75% (Phases 4 &amp; 5)</td>
                <td>Canberra (on-site)</td>
              </tr>
              <tr>
                <td className="overview-table-label">Security Engineer</td>
                <td>Tom Vu</td>
                <td>50%</td>
                <td>Sydney</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🏛</span>
            Governance Structure
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Programme Board</td>
                <td>Monthly. Meridian VP Operations + CFO, SCNSoft Programme Director + Account Executive. Scope/budget/schedule decisions.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Delivery Steering</td>
                <td>Bi-weekly. Meridian Programme Manager + SCNSoft Programme Director. Status, risks, blockers.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Technical Review</td>
                <td>Weekly. Meridian IT Architect + SCNSoft Solution Architect. Architecture decisions, integration issues, security findings.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Change Control</td>
                <td>All scope changes &gt;8 hours assessed via formal Change Request (CR). Meridian PM approves CRs up to $25k; above to Programme Board.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Reporting</td>
                <td>Weekly RAG status report (auto-generated from Jira). Monthly executive dashboard. Real-time Power BI programme tracker (read access for Meridian stakeholders).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('5.3') && (<>
      {/* 5.3 Testing & Quality */}
      <div className="rfp-section-heading" id="5.3">Testing &amp; Quality</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✓</span>
            Quality Assurance Strategy
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Unit Testing</td>
                <td>≥ 80% branch coverage enforced in CI gate. Jest (frontend) + xUnit (backend). Zero-tolerance for coverage regression.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Integration Testing</td>
                <td>Contract testing via Pact. API integration suite runs on every merge to main. External integrations tested against live sandboxes.</td>
              </tr>
              <tr>
                <td className="overview-table-label">System Testing</td>
                <td>Full regression suite executed before each sprint demo. BDD scenarios written with Meridian BAs (Cucumber / SpecFlow).</td>
              </tr>
              <tr>
                <td className="overview-table-label">Performance Testing</td>
                <td>Load testing (k6) at end of Phase 2 and Phase 3. Targets: 500 concurrent users, p95 response ≤ 2s, p99 ≤ 5s under peak load.</td>
              </tr>
              <tr>
                <td className="overview-table-label">UAT</td>
                <td>Meridian-led UAT in a dedicated UAT environment. You receive a dedicated UAT coordinator, pre-populated test data, and a committed defect SLA (Critical 24h, High 72h).</td>
              </tr>
              <tr>
                <td className="overview-table-label">Security Testing</td>
                <td>OWASP ZAP DAST scan each sprint. SonarQube SAST in CI. Pre-go-live penetration test by CREST-accredited firm.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Accessibility</td>
                <td>WCAG 2.1 AA compliance. Automated axe-core checks in CI. Manual screen-reader testing before each phase release.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('5.4') && (<>
      {/* 5.4 Risks & Mitigation */}
      <div className="rfp-section-heading" id="5.4">Risks &amp; Mitigation</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">!</span>
            Risk Register
            <span className="overview-badge overview-badge--warn">4 Open</span>
          </div>
          <ul className="overview-risk-list">
            <li className="overview-risk overview-risk--high">
              <span className="overview-risk-level">HIGH</span>
              <div>
                <strong>Legacy data quality</strong> — Legacy HR / Finance systems have inconsistent data formats, estimated 15–20% record quality issues from initial profiling. <em>Mitigation:</em> Dedicated data cleansing sprint in Phase 1. Data steward assignment from Meridian required. Go/no-go gate before full migration.
              </div>
            </li>
            <li className="overview-risk overview-risk--high">
              <span className="overview-risk-level">HIGH</span>
              <div>
                <strong>Key stakeholder availability</strong> — Programme depends on active Meridian business SME input for requirements sign-off and UAT. Competing BAU priorities may cause delays. <em>Mitigation:</em> Named SME commitments required in programme charter. Escalation path to Programme Board if availability drops below 60%.
              </div>
            </li>
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">MED</span>
              <div>
                <strong>Third-party API changes</strong> — Payroll and finance integrations depend on third-party APIs that may change without notice. <em>Mitigation:</em> Versioned API contracts. 90-day notice clause negotiated with key vendors. Adapter pattern allows connector replacement without core system changes.
              </div>
            </li>
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">MED</span>
              <div>
                <strong>Scope creep</strong> — Public sector engagements historically experience 25–40% scope growth during discovery. <em>Mitigation:</em> Formal CR process with impact assessment. Monthly scope review in Programme Board. Fixed-price core scope ring-fenced; additional scope priced via pre-agreed rate card.
              </div>
            </li>
          </ul>
        </div>
      </div>

      </>)}

      {show('5.5') && (<>
      {/* 5.5 Training & Change */}
      <div className="rfp-section-heading" id="5.5">Training &amp; Change Enablement</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🎓</span>
            Training Programme
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Super-User Training</td>
                <td>3-day intensive workshop per department module. 2 super-users per department minimum. Certification on completion. Delivered Phase 4.</td>
              </tr>
              <tr>
                <td className="overview-table-label">End-User Training</td>
                <td>Role-based eLearning modules (Articulate 360). Average 4–6 hours per user. Available in LMS from 4 weeks before go-live. Video walkthroughs for each key workflow.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Administrator Training</td>
                <td>5-day technical training for Meridian IT administrators. Covers system configuration, user management, monitoring, backup/restore procedures.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Training Materials</td>
                <td>All materials delivered in Meridian-branded format. Editable source files provided. Updated within 10 business days of any system change.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🔄</span>
            Change Management
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Change Impact Assessment</td>
                <td>ADKAR model applied. Stakeholder impact analysis completed in Phase 1. Change readiness surveys at 60 days and 30 days pre-go-live.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Communication Plan</td>
                <td>Fortnightly all-staff updates from Month 3. Department-specific briefings at each phase milestone. Executive communication toolkit provided.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Resistance Management</td>
                <td>Identified risk departments receive dedicated change champion. Individual coaching sessions for senior staff with low change readiness scores.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Adoption Measurement</td>
                <td>System adoption KPIs tracked for 90 days post-go-live. Monthly adoption report to Programme Board. Intervention plan triggered if adoption &lt; 80%.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </>)}

      {show('5.6') && (<>
      {/* 5.6 SLA & Support Post-Go-Live */}
      <div className="rfp-section-heading" id="5.6">SLA &amp; Support Post-Go-Live</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🛡</span>
            Response &amp; Resolution SLAs
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Priority</th>
                <th>Definition</th>
                <th>First Response</th>
                <th>Resolution Target</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">P1 — Critical</td>
                <td>System down or data loss; no workaround</td>
                <td>30 minutes</td>
                <td>4 hours</td>
              </tr>
              <tr>
                <td className="overview-table-label">P2 — High</td>
                <td>Core function impaired; workaround exists</td>
                <td>2 hours</td>
                <td>1 business day</td>
              </tr>
              <tr>
                <td className="overview-table-label">P3 — Medium</td>
                <td>Non-critical feature degraded</td>
                <td>4 business hours</td>
                <td>5 business days</td>
              </tr>
              <tr>
                <td className="overview-table-label">P4 — Low</td>
                <td>Cosmetic issue or enhancement request</td>
                <td>1 business day</td>
                <td>Next release cycle</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📞</span>
            Support Model &amp; Coverage
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Support Hours</td>
                <td>Business hours (08:00–18:00 local, Mon–Fri) as standard. 24/7 on-call for P1/P2 incidents included at no extra charge for the first 12 months.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Channels</td>
                <td>Dedicated support portal (ticket tracking + SLA dashboard), direct Slack channel to your named support engineer, and emergency phone line for P1 incidents.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Named Support Engineer</td>
                <td>A single engineer with full project context assigned to your account — no explaining your system from scratch on every call.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Escalation Path</td>
                <td>Support engineer → Technical Lead → Delivery Director. Escalation automatically triggered if P1 is not resolved within 2 hours.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📊</span>
            Service Reporting &amp; Continuous Improvement
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Monthly SLA Report</td>
                <td>Ticket volume by priority, SLA adherence rate, mean time to resolution, recurring issue trends — delivered to your IT and programme lead.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Quarterly Service Review</td>
                <td>30-minute review call with your Delivery Director to assess support performance, review the release roadmap, and reprioritise the backlog.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Proactive Monitoring</td>
                <td>Automated alerting on system health, error rates, and performance thresholds. Issues identified and triaged before you report them.</td>
              </tr>
              <tr>
                <td className="overview-table-label">SLA Penalty Regime</td>
                <td>Missed P1 SLA: service credit applied automatically. Repeated breaches trigger a remediation plan review. Full terms in the managed services SOW.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}

      {show('5.7') && (<>
      {/* 5.7 Transition & Handover */}
      <div className="rfp-section-heading" id="5.7">Transition &amp; Handover</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">→</span>
            Hypercare &amp; BAU Transition
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Hypercare Period</td>
                <td>4 weeks per go-live wave. Dedicated support team on-site or on-call. P1 response SLA: 30 minutes. Daily operational call with Meridian IT.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Knowledge Transfer</td>
                <td>Pair-programming and handover sessions with Meridian internal team. Architecture decision records (ADRs) maintained throughout. Runbook and SOP library delivered.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Documentation Package</td>
                <td>System Architecture Document, Operations Manual, Disaster Recovery Playbook, API Reference, Data Dictionary, Security Policies. All in Meridian Confluence.</td>
              </tr>
              <tr>
                <td className="overview-table-label">BAU Support Model</td>
                <td>Post-hypercare: 12-month managed service option (separate SOW) or full handover to Meridian IT + nominated third-party support partner.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Warranty Period</td>
                <td>90-day warranty on all delivered code. Critical defects fixed within 24 hours at no charge. High defects within 5 business days.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}
    </div>
  )
}
