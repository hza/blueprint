import { Fragment } from 'react'
import './Timeline.css'
import './Overview.css'

const TOTAL_WEEKS = 28

interface GanttRow {
  label: string
  start: number  // 1-based week
  end: number    // 1-based week, inclusive
  color: string
  phase: 'mvp' | 'analytics' | 'platform' | 'cross'
  milestone?: string
  critical?: boolean
}

const ROWS: GanttRow[] = [
  // Phase 1 — MVP (weeks 1–12)
  { label: 'User Management & RBAC',           start: 1,  end: 3,  color: '#6cb6ff', phase: 'mvp',  critical: true },
  { label: 'Document Ingestion Pipeline',      start: 1,  end: 5,  color: '#6cb6ff', phase: 'mvp',  critical: true },
  { label: 'PII Anonymisation Worker',         start: 3,  end: 6,  color: '#6cb6ff', phase: 'mvp' },
  { label: 'AI Analysis Engine (RAG/Qdrant)',  start: 4,  end: 9,  color: '#6cb6ff', phase: 'mvp',  critical: true },
  { label: 'Feature List & Effort Estimates',  start: 6,  end: 10, color: '#6cb6ff', phase: 'mvp' },
  { label: 'C4 Context & Application Views',   start: 6,  end: 10, color: '#6cb6ff', phase: 'mvp' },
  { label: 'Risk Register & Go/No-Go Advisor', start: 7,  end: 10, color: '#6cb6ff', phase: 'mvp' },
  { label: 'RFP Health Score',                 start: 8,  end: 11, color: '#6cb6ff', phase: 'mvp' },
  { label: 'Client Portal (view-only)',        start: 9,  end: 11, color: '#6cb6ff', phase: 'mvp',  critical: true },
  { label: 'PDF / DOCX Export + MS Teams',     start: 10, end: 12, color: '#6cb6ff', phase: 'mvp',  critical: true, milestone: 'Phase 1 MVP — Wk 12' },

  // Phase 2 — Enhanced Analytics (weeks 13–20)
  { label: 'Real-Time Collaboration (WS)',     start: 13, end: 17, color: '#3fb950', phase: 'analytics', critical: true },
  { label: 'Approval Workflow Engine',         start: 14, end: 18, color: '#3fb950', phase: 'analytics' },
  { label: 'C4 Level 3 Component Views',       start: 15, end: 18, color: '#3fb950', phase: 'analytics' },
  { label: 'Confluence Export',                start: 16, end: 19, color: '#3fb950', phase: 'analytics' },
  { label: 'Email Notifications & Audit Trail',start: 17, end: 20, color: '#3fb950', phase: 'analytics', critical: true, milestone: 'Phase 2 — Wk 20' },

  // Phase 3 — Platform & Ecosystem (weeks 21–28)
  { label: 'SSO (SAML / OAuth 2.0)',           start: 21, end: 24, color: '#ffa657', phase: 'platform', critical: true },
  { label: 'Salesforce CRM Webhooks',          start: 22, end: 25, color: '#ffa657', phase: 'platform' },
  { label: 'Analytics Dashboard',             start: 23, end: 26, color: '#ffa657', phase: 'platform' },
  { label: 'LLM Provider Switching & A/B',    start: 24, end: 27, color: '#ffa657', phase: 'platform' },
  { label: 'Ollama Self-Hosted LLM',           start: 25, end: 28, color: '#ffa657', phase: 'platform', milestone: 'Phase 3 Full Delivery — Wk 28' },

  // Cross-cutting
  { label: 'Security (GDPR, SOC 2, OWASP)',   start: 1,  end: 28, color: '#d2a8ff', phase: 'cross', critical: true },
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

const DEPENDENCIES = [
  { from: 'Architecture Sign-off (Wk 4)', to: 'Development Start (Wk 5)',   note: 'Blocks all development work' },
  { from: 'Phase 1 UAT (Wk 12)',          to: 'Phase 2 Kick-off (Wk 13)',   note: 'UAT sign-off gates next phase' },
  { from: 'SSO Integration (Wk 8)',       to: 'Client Portal Login (Wk 10)', note: 'SSO must complete before auth flows' },
  { from: 'Data Migration Design (Wk 6)', to: 'Migration Execution (Wk 24)', note: 'Schema locked before data move' },
  { from: 'Phase 2 UAT (Wk 20)',          to: 'Phase 3 Kick-off (Wk 21)',   note: 'Analytics must pass UAT first' },
  { from: 'Pen Test (Wk 26)',             to: 'Go-Live Approval (Wk 28)',    note: 'Security clearance required' },
]

// Burnup chart data
const CHART_LEFT = 45
const CHART_RIGHT = 520
const CHART_TOP = 10
const CHART_BOTTOM = 170
const CHART_WIDTH = CHART_RIGHT - CHART_LEFT
const CHART_HEIGHT = CHART_BOTTOM - CHART_TOP

const WEEK_TICKS = [0, 4, 8, 12, 16, 20, 24, 28]
const PCT_TICKS = [0, 25, 50, 75, 100]

const PROJECTED_POINTS = [
  [0, 0], [4, 8], [8, 18], [12, 40], [16, 58], [20, 72], [24, 88], [28, 100],
]

function weekToX(week: number) {
  return CHART_LEFT + (week / 28) * CHART_WIDTH
}

function pctToY(pct: number) {
  return CHART_BOTTOM - (pct / 100) * CHART_HEIGHT
}

export function Timeline() {
  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1)

  const projectedPolyline = PROJECTED_POINTS.map(([w, p]) => `${weekToX(w)},${pctToY(p)}`).join(' ')
  const plannedPolyline = `${weekToX(0)},${pctToY(0)} ${weekToX(28)},${pctToY(100)}`

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
          <span className="timeline-legend-item">
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#EF4444', flexShrink: 0 }} />
            Critical Path
          </span>
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
            <div
              className="gantt-label-cell gantt-row-label"
              style={row.critical ? { borderLeft: '3px solid #EF4444' } : undefined}
            >
              <span className="gantt-phase-dot" style={{ background: PHASE_COLORS[row.phase] }} />
              {row.label}
              {row.critical && (
                <span style={{
                  marginLeft: 'auto',
                  fontSize: 9,
                  fontWeight: 700,
                  color: '#EF4444',
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: 3,
                  padding: '1px 4px',
                  flexShrink: 0,
                  letterSpacing: '0.03em',
                }}>
                  CRITICAL
                </span>
              )}
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

      {/* Milestone Burnup Chart */}
      <div className="overview-card">
        <div className="overview-card-header">
          <span className="overview-card-icon">📈</span>
          <strong>Planned Delivery Progress</strong>
        </div>
        <div style={{ padding: '16px 20px' }}>
          <svg viewBox="0 0 540 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Gridlines */}
            {PCT_TICKS.map(pct => (
              <line
                key={pct}
                x1={CHART_LEFT} y1={pctToY(pct)}
                x2={CHART_RIGHT} y2={pctToY(pct)}
                stroke="#F3F4F6" strokeWidth="1"
              />
            ))}

            {/* Phase boundary vertical lines */}
            {[12, 20].map(w => (
              <line
                key={w}
                x1={weekToX(w)} y1={CHART_TOP}
                x2={weekToX(w)} y2={CHART_BOTTOM}
                stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4,3"
              />
            ))}
            <text x={weekToX(12) + 4} y={CHART_TOP + 10} fontSize="9" fill="#9CA3AF">Phase 1</text>
            <text x={weekToX(20) + 4} y={CHART_TOP + 10} fontSize="9" fill="#9CA3AF">Phase 2 End</text>

            {/* Y-axis labels */}
            {PCT_TICKS.map(pct => (
              <text key={pct} x={CHART_LEFT - 4} y={pctToY(pct) + 4} fontSize="9" fill="#9CA3AF" textAnchor="end">
                {pct}%
              </text>
            ))}

            {/* X-axis labels */}
            {WEEK_TICKS.map(w => (
              <text key={w} x={weekToX(w)} y={CHART_BOTTOM + 14} fontSize="9" fill="#9CA3AF" textAnchor="middle">
                Wk {w}
              </text>
            ))}

            {/* Axes */}
            <line x1={CHART_LEFT} y1={CHART_TOP} x2={CHART_LEFT} y2={CHART_BOTTOM} stroke="#E5E7EB" strokeWidth="1" />
            <line x1={CHART_LEFT} y1={CHART_BOTTOM} x2={CHART_RIGHT} y2={CHART_BOTTOM} stroke="#E5E7EB" strokeWidth="1" />

            {/* Planned line (blue dashed) */}
            <polyline
              points={plannedPolyline}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="1.5"
              strokeDasharray="5,4"
              opacity="0.7"
            />

            {/* Projected line (green solid) */}
            <polyline
              points={projectedPolyline}
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
            />

            {/* Projected dots */}
            {PROJECTED_POINTS.map(([w, p]) => (
              <circle key={w} cx={weekToX(w)} cy={pctToY(p)} r="3.5" fill="#10B981" />
            ))}

            {/* Legend */}
            <line x1="50" y1="192" x2="68" y2="192" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="5,4" />
            <text x="72" y="195" fontSize="9" fill="#6B7280">Planned</text>
            <line x1="120" y1="192" x2="138" y2="192" stroke="#10B981" strokeWidth="2" />
            <circle cx="129" cy="192" r="2.5" fill="#10B981" />
            <text x="142" y="195" fontSize="9" fill="#6B7280">Projected</text>
          </svg>
        </div>
      </div>

      {/* Key Task Dependencies */}
      <div className="overview-card">
        <div className="overview-card-header">
          <span className="overview-card-icon">→</span>
          <strong>Key Task Dependencies</strong>
        </div>
        <div style={{ padding: '16px 20px' }}>
          {DEPENDENCIES.map((dep, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 4 }}>
              <span style={{ background: '#DBEAFE', color: '#1E40AF', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>
                {dep.from}
              </span>
              <span style={{ color: '#9CA3AF', margin: '0 8px', fontSize: 14, fontWeight: 600 }}>→</span>
              <span style={{ background: '#DBEAFE', color: '#1E40AF', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>
                {dep.to}
              </span>
              <span style={{ fontSize: 11, color: '#6B7280', marginLeft: 12, fontStyle: 'italic' }}>
                {dep.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
