import { Fragment } from 'react'
import './Timeline.css'

const TOTAL_WEEKS = 28

interface GanttRow {
  label: string
  start: number  // 1-based week
  end: number    // 1-based week, inclusive
  color: string
  phase: 'mvp' | 'analytics' | 'platform' | 'cross'
  milestone?: string
}

const ROWS: GanttRow[] = [
  // Phase 1 — MVP (weeks 1–12)
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

  // Phase 2 — Enhanced Analytics (weeks 13–20)
  { label: 'Real-Time Collaboration (WS)',     start: 13, end: 17, color: '#3fb950', phase: 'analytics' },
  { label: 'Approval Workflow Engine',         start: 14, end: 18, color: '#3fb950', phase: 'analytics' },
  { label: 'C4 Level 3 Component Views',       start: 15, end: 18, color: '#3fb950', phase: 'analytics' },
  { label: 'Confluence Export',                start: 16, end: 19, color: '#3fb950', phase: 'analytics' },
  { label: 'Email Notifications & Audit Trail',start: 17, end: 20, color: '#3fb950', phase: 'analytics', milestone: 'Phase 2 — Wk 20' },

  // Phase 3 — Platform & Ecosystem (weeks 21–28)
  { label: 'SSO (SAML / OAuth 2.0)',           start: 21, end: 24, color: '#ffa657', phase: 'platform' },
  { label: 'Salesforce CRM Webhooks',          start: 22, end: 25, color: '#ffa657', phase: 'platform' },
  { label: 'Analytics Dashboard',             start: 23, end: 26, color: '#ffa657', phase: 'platform' },
  { label: 'LLM Provider Switching & A/B',    start: 24, end: 27, color: '#ffa657', phase: 'platform' },
  { label: 'Ollama Self-Hosted LLM',           start: 25, end: 28, color: '#ffa657', phase: 'platform', milestone: 'Phase 3 Full Delivery — Wk 28' },

  // Cross-cutting
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

export function Timeline() {
  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1)

  return (
    <div className="timeline-wrap">
      <div className="timeline-header-row">
        <div className="timeline-title">Your Implementation Timeline — 28 Weeks · 3 Phases</div>
        <div className="timeline-legend">
          {Object.entries(PHASE_LABELS).map(([key, label]) => (
            <span key={key} className="timeline-legend-item">
              <span className="timeline-legend-dot" style={{ background: PHASE_COLORS[key as GanttRow['phase']] }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="gantt">
        {/* Week header */}
        <div className="gantt-label-cell gantt-head-label">Feature / Deliverable</div>
        {weeks.map(w => (
          <div key={w} className="gantt-week-header">{`Wk ${w}`}</div>
        ))}

        {/* Milestone markers row */}
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

        {/* Data rows */}
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
                <div
                  key={`${row.label}-${w}`}
                  className={`gantt-cell${active ? ' gantt-cell-active' : ''}`}
                >
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

      {/* Summary cards */}
      <div className="timeline-summary">
        <div className="tl-card">
          <div className="tl-card-value">28 wks</div>
          <div className="tl-card-label">Total Duration</div>
        </div>
        <div className="tl-card">
          <div className="tl-card-value">2026-08-04</div>
          <div className="tl-card-label">Kick-off</div>
        </div>
        <div className="tl-card">
          <div className="tl-card-value">2026-10-27</div>
          <div className="tl-card-label">Phase 1 MVP</div>
        </div>
        <div className="tl-card">
          <div className="tl-card-value">2026-12-22</div>
          <div className="tl-card-label">Phase 2 Complete</div>
        </div>
        <div className="tl-card">
          <div className="tl-card-value">2027-02-16</div>
          <div className="tl-card-label">Full Delivery</div>
        </div>
      </div>
    </div>
  )
}
