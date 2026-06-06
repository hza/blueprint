import React, { Fragment } from 'react'
import './Timeline.css'

const TOTAL_WEEKS = 28

interface GanttRow {
  label: string
  start: number
  end: number
  color: string
  phase: 'mvp' | 'analytics' | 'platform' | 'cross'
  milestone?: string
}

const ROWS: GanttRow[] = [
  { label: 'User Management & RBAC',           start: 1,  end: 3,  color: '#6cb6ff', phase: 'mvp' },
  { label: 'Document Ingestion Pipeline',      start: 1,  end: 5,  color: '#6cb6ff', phase: 'mvp' },
  { label: 'PII Anonymisation Worker',         start: 3,  end: 6,  color: '#6cb6ff', phase: 'mvp' },
  { label: 'AI Analysis Engine (RAG/Qdrant)',  start: 4,  end: 9,  color: '#6cb6ff', phase: 'mvp' },
  { label: 'Feature List & Effort Estimates',  start: 6,  end: 10, color: '#6cb6ff', phase: 'mvp' },
  { label: 'C4 Context & Application Views',   start: 6,  end: 10, color: '#6cb6ff', phase: 'mvp' },
  { label: 'Risk Register & Go/No-Go Advisor', start: 7,  end: 10, color: '#6cb6ff', phase: 'mvp' },
  { label: 'RFP Health Score',                 start: 8,  end: 11, color: '#6cb6ff', phase: 'mvp' },
  { label: 'Client Portal (view-only)',        start: 9,  end: 11, color: '#6cb6ff', phase: 'mvp' },
  { label: 'PDF / DOCX Export + MS Teams',     start: 10, end: 12, color: '#6cb6ff', phase: 'mvp',      milestone: 'Phase 1 MVP — Wk 12' },
  { label: 'Real-Time Collaboration (WS)',     start: 13, end: 17, color: '#3fb950', phase: 'analytics' },
  { label: 'Approval Workflow Engine',         start: 14, end: 18, color: '#3fb950', phase: 'analytics' },
  { label: 'C4 Level 3 Component Views',       start: 15, end: 18, color: '#3fb950', phase: 'analytics' },
  { label: 'Confluence Export',                start: 16, end: 19, color: '#3fb950', phase: 'analytics' },
  { label: 'Email Notifications & Audit Trail',start: 17, end: 20, color: '#3fb950', phase: 'analytics', milestone: 'Phase 2 — Wk 20' },
  { label: 'SSO (SAML / OAuth 2.0)',           start: 21, end: 24, color: '#ffa657', phase: 'platform' },
  { label: 'Salesforce CRM Webhooks',          start: 22, end: 25, color: '#ffa657', phase: 'platform' },
  { label: 'Analytics Dashboard',             start: 23, end: 26, color: '#ffa657', phase: 'platform' },
  { label: 'LLM Provider Switching & A/B',    start: 24, end: 27, color: '#ffa657', phase: 'platform' },
  { label: 'Ollama Self-Hosted LLM',           start: 25, end: 28, color: '#ffa657', phase: 'platform', milestone: 'Phase 3 Full Delivery — Wk 28' },
  { label: 'Security (GDPR, SOC 2, OWASP)',   start: 1,  end: 28, color: '#d2a8ff', phase: 'cross' },
  { label: 'WCAG 2.1 AA Accessibility',        start: 1,  end: 28, color: '#d2a8ff', phase: 'cross' },
]

const PHASE_LABELS: Record<GanttRow['phase'], string> = {
  mvp:       'Phase 1 — MVP',
  analytics: 'Phase 2 — Enhanced Analytics',
  platform:  'Phase 3 — Platform & Ecosystem',
  cross:     'Cross-cutting',
}

const PHASE_COLORS: Record<GanttRow['phase'], string> = {
  mvp:       '#6cb6ff',
  analytics: '#3fb950',
  platform:  '#ffa657',
  cross:     '#d2a8ff',
}

export function DeliveryGovernance({ subsection }: { subsection?: string }) {
  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1)
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Methodology</span>
            <span className="overview-stat-value">Agile (Scrum)</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Duration</span>
            <span className="overview-stat-value">28 weeks</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Phases</span>
            <span className="overview-stat-value">3</span>
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

      {/* Gantt chart */}
      <div className="timeline-wrap" style={{ height: 'auto', overflow: 'visible', padding: '0 0 8px' }}>
        <div className="timeline-header-row">
          <div className="timeline-title">Implementation Timeline — 28 Weeks · 3 Phases</div>
          <div className="timeline-legend">
            {Object.entries(PHASE_LABELS).map(([key, label]) => (
              <span key={key} className="timeline-legend-item">
                <span className="timeline-legend-dot" style={{ background: PHASE_COLORS[key as GanttRow['phase']] }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="gantt" style={{ gridTemplateColumns: `240px repeat(${TOTAL_WEEKS}, 1fr)` }}>
          <div className="gantt-label-cell gantt-head-label">Feature / Deliverable</div>
          {weeks.map(w => (
            <div key={w} className="gantt-week-header">{`Wk ${w}`}</div>
          ))}

          <div className="gantt-label-cell gantt-milestone-label">Milestones</div>
          {weeks.map(w => {
            const hits = ROWS.filter(r => r.milestone && r.end === w)
            return (
              <div key={w} className="gantt-milestone-cell">
                {hits.map(r => (
                  <div key={r.label} className="gantt-milestone-marker" title={r.milestone}>
                    <span className="gantt-milestone-diamond" style={{ background: r.color }} />
                    <span className="gantt-milestone-text">{r.milestone}</span>
                  </div>
                ))}
              </div>
            )
          })}

          {ROWS.map((row) => (
            <Fragment key={row.label}>
              <div className="gantt-label-cell gantt-row-label">
                <span className="gantt-phase-dot" style={{ background: PHASE_COLORS[row.phase] }} />
                {row.label}
              </div>
              {weeks.map(w => {
                const active = w >= row.start && w <= row.end
                const isStart = w === row.start
                const isEnd = w === row.end
                return (
                  <div key={`${row.label}-${w}`} className={`gantt-cell${active ? ' gantt-cell-active' : ''}`}>
                    {active && (
                      <div
                        className="gantt-bar"
                        style={{
                          background: row.color,
                          borderRadius: `${isStart ? '4px' : '0'} ${isEnd ? '4px' : '0'} ${isEnd ? '4px' : '0'} ${isStart ? '4px' : '0'}`,
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </Fragment>
          ))}
        </div>

        <div className="timeline-summary">
          <div className="tl-card"><div className="tl-card-value">28 wks</div><div className="tl-card-label">Total Duration</div></div>
          <div className="tl-card"><div className="tl-card-value">2026-08-04</div><div className="tl-card-label">Kick-off</div></div>
          <div className="tl-card"><div className="tl-card-value">2026-10-27</div><div className="tl-card-label">Phase 1 MVP</div></div>
          <div className="tl-card"><div className="tl-card-value">2026-12-22</div><div className="tl-card-label">Phase 2 Complete</div></div>
          <div className="tl-card"><div className="tl-card-value">2027-02-16</div><div className="tl-card-label">Full Delivery</div></div>
        </div>
      </div>

      {/* 5.1 Delivery Approach & Timeline */}
      <div className="rfp-section-heading" id="5.1">Delivery Approach &amp; Timeline</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🗓</span>
            Sprint Rhythm (2-Week Sprint)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '4px' }}>
            {([
              { day: 'Mon', week: 1, ceremonies: [{ label: 'Sprint Planning', bg: 'var(--sem-info-bg)', color: 'var(--sem-info-fg)' }, { label: 'Stand-up (15 min)', bg: 'var(--canvas-inset)', color: 'var(--fg-muted)', small: true }] },
              { day: 'Tue', week: 1, ceremonies: [{ label: 'Stand-up (15 min)', bg: 'var(--canvas-inset)', color: 'var(--fg-muted)', small: true }] },
              { day: 'Wed', week: 1, ceremonies: [{ label: 'Stand-up (15 min)', bg: 'var(--canvas-inset)', color: 'var(--fg-muted)', small: true }] },
              { day: 'Thu', week: 1, ceremonies: [{ label: 'Stand-up (15 min)', bg: 'var(--canvas-inset)', color: 'var(--fg-muted)', small: true }] },
              { day: 'Fri', week: 1, ceremonies: [{ label: 'Stand-up (15 min)', bg: 'var(--canvas-inset)', color: 'var(--fg-muted)', small: true }, { label: 'Backlog Refinement', bg: 'var(--sem-warn-bg)', color: 'var(--sem-warn-fg)' }] },
              { day: 'Mon', week: 2, ceremonies: [{ label: 'Stand-up (15 min)', bg: 'var(--canvas-inset)', color: 'var(--fg-muted)', small: true }] },
              { day: 'Tue', week: 2, ceremonies: [{ label: 'Stand-up (15 min)', bg: 'var(--canvas-inset)', color: 'var(--fg-muted)', small: true }] },
              { day: 'Wed', week: 2, ceremonies: [{ label: 'Stand-up (15 min)', bg: 'var(--canvas-inset)', color: 'var(--fg-muted)', small: true }] },
              { day: 'Thu', week: 2, ceremonies: [{ label: 'Stand-up (15 min)', bg: 'var(--canvas-inset)', color: 'var(--fg-muted)', small: true }, { label: 'Sprint Review', bg: 'var(--sem-ok-bg)', color: 'var(--sem-ok-fg)' }] },
              { day: 'Fri', week: 2, ceremonies: [{ label: 'Stand-up (15 min)', bg: 'var(--canvas-inset)', color: 'var(--fg-muted)', small: true }, { label: 'Retrospective', bg: 'var(--sem-purple-bg)', color: 'var(--sem-purple-fg)' }] },
            ] as { day: string; week: number; ceremonies: { label: string; bg: string; color: string; small?: boolean }[] }[]).map((cell, idx) => (
              <div key={idx} style={{ minHeight: '80px', border: '1px solid var(--border)', borderRadius: '4px', padding: '6px', fontSize: '11px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px', color: 'var(--fg-muted)' }}>Wk{cell.week} {cell.day}</div>
                {cell.ceremonies.map((c, ci) => (
                  <div key={ci} style={{ background: c.bg, color: c.color, borderRadius: '2px', padding: '2px 4px', marginBottom: '2px', fontSize: c.small ? '10px' : '11px' }}>{c.label}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">◎</span>
            Programme Phases (RFP §7)
          </div>
          <ul className="overview-timeline">
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">2026-08-04 – 2026-10-27 (12 weeks)</span>
                <span className="overview-tl-event"><strong>Phase 1 — MVP:</strong> User management (all roles), document upload (PDF, DOCX, MD) + OCR pipeline, PII anonymisation worker, Deal Go/No-Go AI Advisor, requirement extraction (FR, NFR, BR), feature list with basic effort estimation, C4 Context &amp; Application views, Risk Register (AI-extracted, editable heatmap), RFP Health Score, PDF &amp; DOCX export, basic client portal (view-only), MS Teams notifications.</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">2026-10-28 – 2026-12-22 (+8 weeks)</span>
                <span className="overview-tl-event"><strong>Phase 2 — Enhanced Analytics:</strong> C4 Component View (Level 3) for Paid Discovery, real-time collaboration (WebSockets), approval workflow engine, in-app persistent chat, audio/video calling integration, Confluence export, email notifications, full audit trail UI.</span>
              </div>
            </li>
            <li className="overview-tl-item overview-tl--future">
              <span className="overview-tl-dot" />
              <div>
                <span className="overview-tl-date">2026-12-23 – 2027-02-16 (+8 weeks)</span>
                <span className="overview-tl-event"><strong>Phase 3 — Platform &amp; Ecosystem:</strong> SSO (SAML), CRM webhook integration (Salesforce), analytics dashboard for management, custom canvas configuration via Admin panel, LLM provider switching &amp; prompt A/B testing, self-hosted LLM support (Ollama), API key management for external integrations.</span>
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
                <td>Scrum. 2-week sprints. Feature-team model. Dedicated Product Owner from Meridian required for sprint sign-offs.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Sprint Ceremonies</td>
                <td>Daily stand-up (15 min), Sprint Planning (4 hrs), Sprint Review + Demo (2 hrs), Retrospective (1.5 hrs). Meridian Product Owner attends Sprint Review.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Definition of Done</td>
                <td>Code reviewed, unit tests ≥ 80% coverage, integration tests green, documented, demo'd to PO, security scan passed, deployed to staging.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Release Cadence</td>
                <td>Production-ready build every sprint. Blue/green or canary releases. Feature flags for gradual rollout of new AI models.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Tooling</td>
                <td>Jira (backlog &amp; tracking), Confluence (documentation), GitHub Actions (CI/CD), Slack or MS Teams (communication).</td>
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
          <table className="overview-table delivery-team-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Name</th>
                <th>Allocation</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="overview-table-label">Engagement Manager / PM</td>
                <td><span className="team-name-cell"><span className="team-avatar">SC</span>Sarah Chen</span></td>
                <td>50%</td>
                <td>Single point of accountability. Weekly RAG status report.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Solution Architect</td>
                <td><span className="team-name-cell"><span className="team-avatar">MO</span>Mark Okonkwo</span></td>
                <td>100%</td>
                <td>Owns architecture views, tech stack recommendation, and NFR sign-off. Meets RFP minimum qualification (dedicated SA for Phase 1).</td>
              </tr>
              <tr>
                <td className="overview-table-label">Senior Frontend Engineer</td>
                <td><span className="team-name-cell"><span className="team-avatar">PR</span>Priya Ramaswamy</span></td>
                <td>100%</td>
                <td>React 18, TypeScript, React Flow / Konva.js. Meets RFP minimum qualification (senior Frontend for Phase 1).</td>
              </tr>
              <tr>
                <td className="overview-table-label">Senior Backend Engineers (×2)</td>
                <td><span className="team-name-cell"><span className="team-avatar team-avatar--tbd">?</span>Named in Annex D</span></td>
                <td>100%</td>
                <td>FastAPI, PostgreSQL, Kafka, Celery. AI/ML integration and RAG pipeline ownership.</td>
              </tr>
              <tr>
                <td className="overview-table-label">AI/ML Engineer</td>
                <td><span className="team-name-cell"><span className="team-avatar team-avatar--tbd">?</span>Named in Annex D</span></td>
                <td>100%</td>
                <td>LLM abstraction layer, prompt engineering, Qdrant RAG pipeline, PII anonymisation worker, output schema validation.</td>
              </tr>
              <tr>
                <td className="overview-table-label">QA Lead</td>
                <td><span className="team-name-cell"><span className="team-avatar team-avatar--tbd">?</span>Named in Annex D</span></td>
                <td>100%</td>
                <td>≥ 80% unit coverage gate, BDD (Gherkin/Pytest-BDD), OWASP ZAP DAST per sprint.</td>
              </tr>
              <tr>
                <td className="overview-table-label">UX Designer</td>
                <td><span className="team-name-cell"><span className="team-avatar">LV</span>Lena Vogel</span></td>
                <td>75%</td>
                <td>shadcn/ui or Ant Design. WCAG 2.1 AA. Onboarding guided tour and contextual tooltips.</td>
              </tr>
              <tr>
                <td className="overview-table-label">DevOps / Cloud Engineer</td>
                <td><span className="team-name-cell"><span className="team-avatar team-avatar--tbd">?</span>Named in Annex D</span></td>
                <td>100%</td>
                <td>Kubernetes (Helm), Terraform / Pulumi, GitHub Actions CI/CD, Prometheus + Grafana, blue/green deployments.</td>
              </tr>
            </tbody>
          </table>
        </div>




      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📋</span>
            RACI — Who Does What
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="raci-table" style={{ width: '100%', fontSize: 'var(--font-size-sm)', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '28%' }} />
                {['PM', 'Tech Lead', 'Dev Team', 'QA', 'BA', 'Your Team'].map(col => (
                  <col key={col} style={{ width: `${72 / 6}%` }} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: 'var(--canvas-subtle)', color: 'var(--fg)' }}>Activity</th>
                  {['PM', 'Tech Lead', 'Dev Team', 'QA', 'BA', 'Your Team'].map((col, i, arr) => (
                    <th key={col} style={{ textAlign: 'center', padding: '10px 12px', borderBottom: '1px solid var(--border)', borderRight: i < arr.length - 1 ? '1px solid var(--border)' : undefined, background: 'var(--canvas-subtle)', color: 'var(--fg)' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {([
                  ['Sprint Planning',        'R','A','C','C','C','I'],
                  ['Requirements Sign-off',  'A','C','I','I','R','R'],
                  ['Architecture Decisions', 'C','R','C','I','I','I'],
                  ['Code Reviews',           'I','A','R','C','I','I'],
                  ['UAT Coordination',       'A','I','I','C','C','R'],
                  ['Change Requests',        'R','C','C','I','A','A'],
                  ['Risk Escalation',        'R','A','C','I','I','C'],
                  ['Deployment Approvals',   'A','R','C','C','I','C'],
                  ['Steering Updates',       'R','C','I','I','I','A'],
                  ['Invoice Approval',       'I','I','I','I','I','R'],
                ] as [string, string, string, string, string, string, string][]).map(([activity, ...cells], rowIdx, rows) => {
                  const isLast = rowIdx === rows.length - 1
                  const cellStyle = (v: string): React.CSSProperties => {
                    if (v === 'R') return { background: 'var(--sem-info-bg)', color: 'var(--sem-info-fg)', fontWeight: 'bold' }
                    if (v === 'A') return { background: 'var(--sem-ok-bg)', color: 'var(--sem-ok-fg)', fontWeight: 'bold' }
                    if (v === 'C') return { background: 'var(--sem-warn-bg)', color: 'var(--sem-warn-fg)' }
                    return { background: 'var(--canvas-inset)', color: 'var(--fg-muted)' }
                  }
                  return (
                    <tr key={activity}>
                      <td style={{ textAlign: 'left', padding: '10px 12px', borderBottom: isLast ? undefined : '1px solid var(--border)', borderRight: '1px solid var(--border)', color: 'var(--fg)' }}>{activity}</td>
                      {cells.map((v, i) => (
                        <td key={i} className={`raci-cell raci-cell--${v.toLowerCase()}`} style={{ textAlign: 'center', padding: '10px 12px', borderBottom: isLast ? undefined : '1px solid var(--border)', borderRight: i < cells.length - 1 ? '1px solid var(--border)' : undefined, ...cellStyle(v) }}>{v}</td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '8px', fontSize: '11px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ background: 'var(--sem-info-bg)', color: 'var(--sem-info-fg)', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px' }}>R = Responsible</span>
            <span style={{ background: 'var(--sem-ok-bg)', color: 'var(--sem-ok-fg)', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px' }}>A = Accountable</span>
            <span style={{ background: 'var(--sem-warn-bg)', color: 'var(--sem-warn-fg)', padding: '2px 6px', borderRadius: '3px' }}>C = Consulted</span>
            <span style={{ background: 'var(--canvas-inset)', color: 'var(--fg-muted)', padding: '2px 6px', borderRadius: '3px' }}>I = Informed</span>
          </div>
        </div>
      </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🏛</span>
            Governance Structure
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Steering Committee</td>
                <td>Monthly. Meridian stakeholder (Sales Manager / CTO) + SCNSoft Engagement Manager. Scope, budget, and schedule decisions.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Delivery Sync</td>
                <td>Bi-weekly. Meridian Product Owner + SCNSoft PM. Status, risks, blockers.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Technical Review</td>
                <td>Weekly. Meridian technical lead + SCNSoft Solution Architect. Architecture decisions, integration issues, AI pipeline findings.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Change Control</td>
                <td>All scope changes &gt; 8 hours assessed via formal Change Request (CR). Meridian PM approves CRs up to agreed threshold; larger to Steering Committee.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Reporting</td>
                <td>Weekly RAG status report (auto-generated from Jira). Real-time programme tracker with read access for Meridian stakeholders.</td>
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
                <td>≥ 80% branch coverage enforced in CI gate. Zero-tolerance for coverage regression on business logic.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Integration Testing</td>
                <td>Contract testing. API integration suite runs on every merge to main. LLM output schema validation (Pydantic / Zod).</td>
              </tr>
              <tr>
                <td className="overview-table-label">System Testing</td>
                <td>Full regression suite before each sprint demo. BDD scenarios written with Meridian's team (Gherkin / Pytest-BDD). Acceptance criteria in Given/When/Then format.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Performance Testing</td>
                <td>Load testing (k6) at Phase 1 gate. Targets: 100 concurrent users, API p95 &lt; 300 ms, 30-page RFP analysis &lt; 120 s.</td>
              </tr>
              <tr>
                <td className="overview-table-label">UAT</td>
                <td>Meridian-led UAT in dedicated environment. Pre-populated test data. Defect SLA: Critical 24 h, High 72 h.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Security Testing</td>
                <td>OWASP ZAP DAST scan each sprint. Dependency scanning in CI — hard block on critical CVEs. Pre-go-live penetration test by accredited firm.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Accessibility</td>
                <td>WCAG 2.1 AA. Automated axe-core checks in CI. Manual screen-reader testing before each phase release.</td>
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
            <span className="overview-card-icon">⬛</span>
            Risk Heatmap
          </div>
          <div className="risk-heatmap-wrap">
            <div className="risk-heatmap">
              {/* 5 rows: probability 5→1 top to bottom; 5 cols: impact 1→5 left to right */}
              {[5,4,3,2,1].map(prob => (
                [1,2,3,4,5].map(impact => {
                  const score = prob * impact
                  const zone = score >= 15 ? 'high' : score >= 6 ? 'med' : 'low'
                  // Risks: LLM reliability (P=4,I=4), PII anonymisation (P=3,I=5),
                  //        OCR quality (P=3,I=3), Scope creep (P=4,I=3)
                  const dots: string[] = []
                  if (prob === 4 && impact === 4) dots.push('LLM')
                  if (prob === 3 && impact === 5) dots.push('PII')
                  if (prob === 3 && impact === 3) dots.push('OCR')
                  if (prob === 4 && impact === 3) dots.push('SCR')
                  return (
                    <div key={`${prob}-${impact}`} className={`risk-heatmap-cell risk-heatmap-cell--${zone}`}>
                      {dots.map(d => <span key={d} className="risk-heatmap-dot" title={
                        d === 'LLM' ? 'LLM API reliability' :
                        d === 'PII' ? 'PII anonymisation accuracy' :
                        d === 'OCR' ? 'OCR quality on poor-quality PDFs' :
                        'Scope creep in AI feature requests'
                      }>{d}</span>)}
                    </div>
                  )
                })
              ))}
            </div>
            <div className="risk-heatmap-axes">
              <span className="risk-heatmap-ylabel">← Probability →</span>
              <span className="risk-heatmap-xlabel">← Impact →</span>
            </div>
            <div className="risk-heatmap-legend">
              <span className="risk-heatmap-legend-item risk-heatmap-legend--high">High</span>
              <span className="risk-heatmap-legend-item risk-heatmap-legend--med">Medium</span>
              <span className="risk-heatmap-legend-item risk-heatmap-legend--low">Low</span>
            </div>
          </div>
        </div>
      </div>

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
                <strong>LLM API reliability</strong> — External LLM providers (OpenAI, Anthropic) may have outages or rate-limit spikes affecting analysis pipeline throughput. <em>Mitigation:</em> Abstraction layer allows automatic failover between providers. Graceful degradation mode activates within 30 s if AI service goes down — upload and manual editing remain functional with a visible user banner.
              </div>
            </li>
            <li className="overview-risk overview-risk--high">
              <span className="overview-risk-level">HIGH</span>
              <div>
                <strong>PII anonymisation accuracy</strong> — Missed PII in complex or unusual RFP documents could reach an external LLM. <em>Mitigation:</em> Named-entity recognition (NER) model with ≥ 99% recall target on standard PII classes. Audit log records placeholder count per document version. Reviewed as a Phase 1 acceptance criterion before client data is processed.
              </div>
            </li>
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">MED</span>
              <div>
                <strong>OCR quality on poor-quality scanned PDFs</strong> — Scanned documents with low resolution or unusual fonts may fall below the 95% OCR accuracy target. <em>Mitigation:</em> Integrity check on arrival; corrupted or low-quality files rejected with a clear error before processing. Analysts can manually correct segmentation output.
              </div>
            </li>
            <li className="overview-risk overview-risk--med">
              <span className="overview-risk-level">MED</span>
              <div>
                <strong>Scope creep in AI feature requests</strong> — AI capabilities (prompt tuning, new output types) are easy to request but expensive to validate safely. <em>Mitigation:</em> Prompt management via versioned config (not code — no deployment required). New AI capabilities scoped via formal CR. Feature flags allow gradual rollout with A/B testing before full release.
              </div>
            </li>
          </ul>
        </div>
      </div>

      </>)}

      {show('5.5') && (<>
      {/* 5.5 Training & Change */}
      <div className="rfp-section-heading" id="5.5">Training &amp; Onboarding</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">🎓</span>
            User Onboarding (RFP §4.4)
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">In-App Guided Tour</td>
                <td>Interactive onboarding checklist for new employees: first upload, team invite, first export. Contextual tooltips on key actions. Activated on first login.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Role-Based Docs</td>
                <td>Short-form help articles per role (BA, SA, Sales Manager, Account Manager, Customer). Linked from contextual tooltips.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Admin Handover</td>
                <td>Admin panel walkthrough with Meridian IT. System configuration, user management, LLM configuration, audit log access. Included in Phase 1 sign-off.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Documentation Package</td>
                <td>API reference (OpenAPI 3.1), operations runbook, architecture decision records, data dictionary — delivered at each phase sign-off and maintained in Confluence.</td>
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
                <td>Portal down or data loss; no workaround</td>
                <td>30 minutes</td>
                <td>1 hour (RFP RTO)</td>
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
                <td>Business hours standard. 24/7 on-call for P1/P2 incidents included at no extra charge for the first 12 months post-Phase 1 go-live.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Channels</td>
                <td>Dedicated support portal (ticket tracking + SLA dashboard), Slack or MS Teams channel to named support engineer, emergency phone line for P1 incidents.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Ops Team Alerts</td>
                <td>Failed jobs alert ops team within 5 min (RFP §4.4). `/healthz` endpoint exposes structured status for all subsystems. Automated alerting on error rates and performance thresholds.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Proactive Monitoring</td>
                <td>Prometheus + Grafana dashboards. Issues identified and triaged before you report them. Monthly SLA report to Meridian IT lead.</td>
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
            <span className="overview-card-icon">🔄</span>
            Handover Plan
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Ownership Transfer</td>
                <td>Full source code, infrastructure-as-code, CI/CD pipelines, and secrets handed to Meridian's designated team at end of Phase 3. All assets committed to your Git organisation.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Documentation Package</td>
                <td>Architecture Decision Records (ADRs), runbooks, API reference (OpenAPI 3.1), data dictionary, and operational playbooks delivered in Confluence before go-live of each phase.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Knowledge Transfer Sessions</td>
                <td>Four structured sessions (2 hrs each) covering system architecture, deployment pipeline, monitoring and alerting, and admin/configuration. Recordings and slide decks provided.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Hypercare Period</td>
                <td>4-week hypercare window post-Phase 3 go-live: daily check-ins, same-day hotfixes, dedicated Slack channel. Transitions to standard SLA support at week 5.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✅</span>
            Acceptance &amp; Exit Criteria
          </div>
          <table className="overview-table">
            <tbody>
              <tr>
                <td className="overview-table-label">Acceptance Testing</td>
                <td>User Acceptance Testing (UAT) conducted jointly with Meridian stakeholders at the end of each phase. Signed-off test report required before phase closure.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Definition of Done — Project</td>
                <td>All RFP functional requirements met, performance benchmarks verified, security scan clean, documentation complete, and Meridian team independently able to operate the system.</td>
              </tr>
              <tr>
                <td className="overview-table-label">IP &amp; Data Return</td>
                <td>All Meridian data and configurations returned or deleted from SCNSoft systems within 30 days of project closure. Certificate of deletion provided on request.</td>
              </tr>
              <tr>
                <td className="overview-table-label">Ongoing Retainer (Optional)</td>
                <td>Optional managed-service retainer available post-handover: L3 engineering support, quarterly architectural reviews, and LLM model refresh. Priced separately on request.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}
    </div>
  )
}
