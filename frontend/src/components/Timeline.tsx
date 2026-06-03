import { Fragment } from 'react'
import './Timeline.css'

const TOTAL_WEEKS = 14

interface GanttRow {
  label: string
  start: number  // 1-based week
  end: number    // 1-based week, inclusive
  color: string
  phase: 'discovery' | 'build' | 'integration' | 'testing' | 'delivery'
  milestone?: string
}

const ROWS: GanttRow[] = [
  { label: 'Discovery & Requirements',      start: 1,  end: 2,  color: '#6cb6ff', phase: 'discovery' },
  { label: 'ISO 27001 Security Controls',   start: 1,  end: 10, color: '#f78166', phase: 'build' },
  { label: 'Data Migration (DataBridge)',   start: 2,  end: 8,  color: '#ffa657', phase: 'build' },
  { label: 'Core Case Management Module',   start: 3,  end: 10, color: '#3fb950', phase: 'build',       milestone: 'Go-live (core) — Wk 10' },
  { label: 'RBAC & Access Controls',        start: 4,  end: 8,  color: '#3fb950', phase: 'build' },
  { label: 'Regulatory Reporting Module',   start: 5,  end: 11, color: '#a5d6ff', phase: 'integration' },
  { label: 'API Gateway (3 systems)',        start: 6,  end: 12, color: '#ffa657', phase: 'integration' },
  { label: 'Executive Dashboard / KPIs',    start: 7,  end: 12, color: '#a5d6ff', phase: 'integration' },
  { label: 'UAT & Acceptance Testing',      start: 9,  end: 12, color: '#d2a8ff', phase: 'testing' },
  { label: 'Staff Training',                start: 11, end: 13, color: '#d2a8ff', phase: 'testing' },
  { label: 'Go-live & Hypercare',           start: 14, end: 14, color: '#ff7b72', phase: 'delivery',    milestone: 'Full Go-live — Wk 14' },
]

const PHASE_LABELS: Record<GanttRow['phase'], string> = {
  discovery:   'Discovery',
  build:       'Build',
  integration: 'Integration',
  testing:     'Testing',
  delivery:    'Delivery',
}

const PHASE_COLORS: Record<GanttRow['phase'], string> = {
  discovery:   '#6cb6ff',
  build:       '#3fb950',
  integration: '#ffa657',
  testing:     '#d2a8ff',
  delivery:    '#ff7b72',
}

export function Timeline() {
  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1)

  return (
    <div className="timeline-wrap">
      <div className="timeline-header-row">
        <div className="timeline-title">Your Implementation Timeline — 14 Weeks to Go-Live</div>
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
          <div className="tl-card-value">14 wks</div>
          <div className="tl-card-label">Total Duration</div>
        </div>
        <div className="tl-card">
          <div className="tl-card-value">Wk 10</div>
          <div className="tl-card-label">Core Go-live</div>
        </div>
        <div className="tl-card">
          <div className="tl-card-value">Wk 14</div>
          <div className="tl-card-label">Full Go-live</div>
        </div>
        <div className="tl-card">
          <div className="tl-card-value">Jan 2026</div>
          <div className="tl-card-label">Compliance Deadline</div>
        </div>
        <div className="tl-card">
          <div className="tl-card-value">6.75 FTE</div>
          <div className="tl-card-label">Delivery Team</div>
        </div>
      </div>
    </div>
  )
}
