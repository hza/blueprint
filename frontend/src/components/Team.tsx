import './Team.css'

interface TeamMember {
  name: string
  role: string
  allocation: string
  skills: string[]
  phase: 'delivery' | 'management' | 'qa' | 'infrastructure'
}

const TEAM: TeamMember[] = [
  {
    name: 'Sarah Chen',
    role: 'Engagement Manager',
    allocation: '50%',
    skills: ['Stakeholder Management', 'Risk & Governance', 'Agile Delivery', 'Scrum'],
    phase: 'management',
  },
  {
    name: 'Mark Okonkwo',
    role: 'Solution Architect',
    allocation: '100%',
    skills: ['System Design', 'C4 Architecture', 'Cloud Infrastructure', 'API Design'],
    phase: 'infrastructure',
  },
  {
    name: 'Priya Ramaswamy',
    role: 'Senior Frontend Engineer',
    allocation: '100%',
    skills: ['React 18', 'TypeScript', 'React Flow', 'WebSockets', 'WCAG 2.1 AA'],
    phase: 'delivery',
  },
  {
    name: 'AI/ML Engineer',
    role: 'AI/ML Engineer',
    allocation: '100%',
    skills: ['LLM Integration', 'RAG / Qdrant', 'PII Anonymisation', 'Prompt Engineering'],
    phase: 'delivery',
  },
  {
    name: 'Backend Engineers ×2',
    role: 'Senior Backend Engineers',
    allocation: '100%',
    skills: ['FastAPI', 'PostgreSQL', 'Kafka', 'Celery', 'CQRS / Outbox'],
    phase: 'delivery',
  },
  {
    name: 'James Obi',
    role: 'QA Lead',
    allocation: '100%',
    skills: ['BDD / Gherkin', 'k6 Load Testing', 'OWASP ZAP', 'Playwright', 'UAT'],
    phase: 'qa',
  },
  {
    name: 'Lena Vogel',
    role: 'UX Designer',
    allocation: '75%',
    skills: ['shadcn/ui', 'Figma', 'WCAG 2.1 AA', 'Onboarding UX'],
    phase: 'delivery',
  },
  {
    name: 'DevOps Engineer',
    role: 'DevOps / Cloud Engineer',
    allocation: '100%',
    skills: ['Kubernetes', 'Helm', 'Terraform', 'GitHub Actions', 'Prometheus'],
    phase: 'infrastructure',
  },
]

const PHASE_LABELS: Record<TeamMember['phase'], string> = {
  management: 'Management',
  delivery: 'Delivery',
  qa: 'QA',
  infrastructure: 'Infrastructure',
}

const PHASE_COLORS: Record<TeamMember['phase'], string> = {
  management: '#6cb6ff',
  delivery: '#3fb950',
  qa: '#d2a8ff',
  infrastructure: '#ffa657',
}

const ALLOCATION_BAR: Record<string, number> = {
  '100%': 100,
  '75%': 75,
  '50%': 50,
  '25%': 25,
}

// Skills heatmap data
const SKILLS_DATA = [
  { name: 'Dmitry Ivanov', role: 'PM', scores: [1, 2, 1, 2, 1, 3] },
  { name: 'Sergei Kovalev', role: 'Tech Lead', scores: [3, 3, 2, 3, 2, 2] },
  { name: 'Anna Petrova', role: 'BA', scores: [2, 1, 1, 1, 1, 3] },
  { name: 'Ivan Smirnov', role: 'Full Stack Dev', scores: [2, 3, 3, 2, 2, 1] },
  { name: 'Olga Sidorova', role: 'ML Eng', scores: [3, 2, 1, 2, 1, 2] },
  { name: 'Pavel Fedorov', role: 'Full Stack Dev', scores: [1, 3, 3, 2, 2, 1] },
  { name: 'Natalia Kozlova', role: 'QA', scores: [1, 2, 2, 2, 3, 2] },
  { name: 'Elena Morozova', role: 'DevOps', scores: [1, 2, 1, 3, 3, 2] },
]

const SKILLS_COLS = ['AI/ML', 'Backend', 'Frontend', 'Cloud', 'Security', 'Domain']

function skillCell(val: number) {
  if (val === 0) return { bg: '#F9FAFB', text: '—', color: '#9CA3AF' }
  if (val === 1) return { bg: '#DBEAFE', text: '●', color: '#93C5FD' }
  if (val === 2) return { bg: '#BFDBFE', text: '●●', color: '#3B82F6' }
  return { bg: '#1D4ED8', text: '●●●', color: '#ffffff' }
}

// Capacity timeline data
const CAPACITY_DATA = [
  { name: 'Dmitry Ivanov', role: 'PM', start: 1, end: 28, color: '#8B5CF6' },
  { name: 'Sergei Kovalev', role: 'Tech Lead', start: 1, end: 28, color: '#10B981' },
  { name: 'Anna Petrova', role: 'BA', start: 1, end: 16, color: '#EC4899' },
  { name: 'Ivan Smirnov', role: 'Full Stack', start: 3, end: 28, color: '#3B82F6' },
  { name: 'Olga Sidorova', role: 'ML Eng', start: 5, end: 20, color: '#F59E0B' },
  { name: 'Pavel Fedorov', role: 'Full Stack', start: 3, end: 28, color: '#3B82F6' },
  { name: 'Natalia Kozlova', role: 'QA', start: 8, end: 28, color: '#EF4444' },
  { name: 'Elena Morozova', role: 'DevOps', start: 10, end: 28, color: '#6B7280' },
]

const CHART_LEFT = 150
const CHART_WIDTH = 430
const TOTAL_WEEKS = 28

function weekX(week: number) {
  return CHART_LEFT + ((week - 1) / TOTAL_WEEKS) * CHART_WIDTH
}

export function Team() {
  return (
    <div className="team-wrap">

      {/* 1. Org Chart */}
      <div className="overview-card">
        <div className="overview-card-header">
          <span className="overview-card-icon">🏢</span>
          <span>Team Structure</span>
        </div>
        <svg viewBox="0 0 600 260" style={{ width: '100%', display: 'block' }}>
          {/* Lines */}
          {/* PM → Sponsor */}
          <line x1="300" y1="52" x2="300" y2="90" stroke="#D1D5DB" strokeWidth="1.5" />
          {/* PM bottom → horizontal bar */}
          <line x1="300" y1="122" x2="300" y2="145" stroke="#D1D5DB" strokeWidth="1.5" />
          <line x1="120" y1="145" x2="480" y2="145" stroke="#D1D5DB" strokeWidth="1.5" />
          {/* horizontals down to leads */}
          <line x1="120" y1="145" x2="120" y2="160" stroke="#D1D5DB" strokeWidth="1.5" />
          <line x1="300" y1="145" x2="300" y2="160" stroke="#D1D5DB" strokeWidth="1.5" />
          <line x1="480" y1="145" x2="480" y2="160" stroke="#D1D5DB" strokeWidth="1.5" />
          {/* leads to level 3 */}
          <line x1="120" y1="192" x2="120" y2="220" stroke="#D1D5DB" strokeWidth="1.5" />
          <line x1="300" y1="192" x2="300" y2="220" stroke="#D1D5DB" strokeWidth="1.5" />
          <line x1="480" y1="192" x2="480" y2="220" stroke="#D1D5DB" strokeWidth="1.5" />

          {/* Level 0: Project Sponsor */}
          <rect x="230" y="20" width="140" height="32" rx="4" fill="#3B82F6" />
          <text x="300" y="40" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Project Sponsor</text>

          {/* Level 1: Project Manager */}
          <rect x="230" y="90" width="140" height="32" rx="4" fill="#8B5CF6" />
          <text x="300" y="110" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Project Manager</text>

          {/* Level 2: Tech Lead */}
          <rect x="60" y="160" width="120" height="32" rx="4" fill="#10B981" />
          <text x="120" y="180" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Tech Lead</text>

          {/* Level 2: QA Lead */}
          <rect x="240" y="160" width="120" height="32" rx="4" fill="#F59E0B" />
          <text x="300" y="180" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">QA Lead</text>

          {/* Level 2: BA Lead */}
          <rect x="420" y="160" width="120" height="32" rx="4" fill="#EC4899" />
          <text x="480" y="180" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">BA Lead</text>

          {/* Level 3: under Tech Lead */}
          <rect x="65" y="220" width="110" height="28" rx="4" fill="#E5E7EB" />
          <text x="120" y="238" textAnchor="middle" fill="#374151" fontSize="11">2× Dev Engineers</text>

          {/* Level 3: under QA */}
          <rect x="245" y="220" width="110" height="28" rx="4" fill="#E5E7EB" />
          <text x="300" y="238" textAnchor="middle" fill="#374151" fontSize="11">1× QA Engineer</text>

          {/* Level 3: under BA */}
          <rect x="425" y="220" width="110" height="28" rx="4" fill="#E5E7EB" />
          <text x="480" y="238" textAnchor="middle" fill="#374151" fontSize="11">1× Business Analyst</text>
        </svg>
      </div>

      <div className="team-header-row">
        <div className="team-title">Project Team — 8 Members · 7.5 FTE · 28-Week Engagement</div>
        <div className="team-legend">
          {Object.entries(PHASE_LABELS).map(([key, label]) => (
            <span key={key} className="team-legend-item">
              <span className="team-legend-dot" style={{ background: PHASE_COLORS[key as TeamMember['phase']] }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="team-grid">
        {TEAM.map((member) => (
          <div key={member.name} className="team-card">
            <div className="team-card-top">
              <div
                className="team-avatar"
                style={{ background: PHASE_COLORS[member.phase] }}
              >
                {member.name.split(' ').map(w => w[0]).join('')}
              </div>
              <div className="team-card-info">
                <div className="team-member-name">{member.name}</div>
                <div className="team-member-role">{member.role}</div>
              </div>
              <div
                className="team-phase-badge"
                style={{ background: `${PHASE_COLORS[member.phase]}22`, color: PHASE_COLORS[member.phase] }}
              >
                {PHASE_LABELS[member.phase]}
              </div>
            </div>

            <div className="team-allocation-row">
              <span className="team-allocation-label">Allocation</span>
              <span className="team-allocation-value">{member.allocation}</span>
              <div className="team-allocation-track">
                <div
                  className="team-allocation-fill"
                  style={{
                    width: `${ALLOCATION_BAR[member.allocation] ?? 0}%`,
                    background: PHASE_COLORS[member.phase],
                  }}
                />
              </div>
            </div>

            <div className="team-skills">
              {member.skills.map((skill) => (
                <span key={skill} className="team-skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="team-summary">
        {[
          { value: '8', label: 'Team Members' },
          { value: '7.5', label: 'Total FTE' },
          { value: '6', label: 'Full-Time' },
          { value: '2', label: 'Part-Time' },
          { value: '28 wks', label: 'Engagement' },
        ].map(({ value, label }) => (
          <div key={label} className="tl-card">
            <div className="tl-card-value">{value}</div>
            <div className="tl-card-label">{label}</div>
          </div>
        ))}
      </div>

      {/* 2. Skills Heatmap */}
      <div className="overview-card">
        <div className="overview-card-header">
          <span className="overview-card-icon">⚡</span>
          <span>Team Skills Profile</span>
        </div>
        <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '6px 8px', fontWeight: 600, color: '#6B7280', width: '160px' }}>Member</th>
              {SKILLS_COLS.map(col => (
                <th key={col} style={{ textAlign: 'center', padding: '6px 4px', fontWeight: 600, color: '#6B7280' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SKILLS_DATA.map(member => (
              <tr key={member.name}>
                <td style={{ padding: '4px 8px', fontWeight: 500, color: '#374151' }}>
                  {member.name}
                  <span style={{ color: '#9CA3AF', fontWeight: 400, marginLeft: 4 }}>({member.role})</span>
                </td>
                {member.scores.map((val, i) => {
                  const cell = skillCell(val)
                  return (
                    <td key={i} style={{ textAlign: 'center', padding: '4px', background: cell.bg }}>
                      <span style={{ color: cell.color, fontWeight: 600 }}>{cell.text}</span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 10, fontSize: '11px', color: '#6B7280', display: 'flex', gap: 16 }}>
          <span><span style={{ color: '#93C5FD', fontWeight: 700 }}>●</span> Basic</span>
          <span><span style={{ color: '#3B82F6', fontWeight: 700 }}>●●</span> Good</span>
          <span><span style={{ color: '#1D4ED8', fontWeight: 700 }}>●●●</span> Expert</span>
        </div>
      </div>

      {/* 3. Capacity Timeline */}
      <div className="overview-card">
        <div className="overview-card-header">
          <span className="overview-card-icon">📅</span>
          <span>Team Availability by Phase</span>
        </div>
        <svg viewBox="0 0 600 260" style={{ width: '100%', display: 'block' }}>
          {/* Phase background bands */}
          <rect x={CHART_LEFT} y="0" width={(12 / TOTAL_WEEKS) * CHART_WIDTH} height="245" fill="#EFF6FF" opacity="0.6" />
          <rect x={CHART_LEFT + (12 / TOTAL_WEEKS) * CHART_WIDTH} y="0" width={(8 / TOTAL_WEEKS) * CHART_WIDTH} height="245" fill="#F5F3FF" opacity="0.6" />
          <rect x={CHART_LEFT + (20 / TOTAL_WEEKS) * CHART_WIDTH} y="0" width={(8 / TOTAL_WEEKS) * CHART_WIDTH} height="245" fill="#F0FDF4" opacity="0.6" />

          {/* Vertical gridlines every 4 weeks */}
          {[1, 5, 9, 13, 17, 21, 25].map(w => (
            <line key={w} x1={weekX(w)} y1="10" x2={weekX(w)} y2="245" stroke="#E5E7EB" strokeWidth="1" />
          ))}
          <line x1={weekX(28) + (1 / TOTAL_WEEKS) * CHART_WIDTH} y1="10" x2={weekX(28) + (1 / TOTAL_WEEKS) * CHART_WIDTH} y2="245" stroke="#E5E7EB" strokeWidth="1" />

          {/* Header */}
          <text x={CHART_LEFT / 2} y="25" textAnchor="middle" fontSize="11" fill="#6B7280" fontWeight="600">Member</text>
          <text x={CHART_LEFT + CHART_WIDTH / 2} y="25" textAnchor="middle" fontSize="11" fill="#6B7280" fontWeight="600">Weeks →</text>

          {/* Member rows */}
          {CAPACITY_DATA.map((member, i) => {
            const rowY = 40 + i * 22
            const barX = weekX(member.start)
            const barWidth = ((member.end - member.start + 1) / TOTAL_WEEKS) * CHART_WIDTH
            return (
              <g key={member.name}>
                <text x={CHART_LEFT - 4} y={rowY + 13} textAnchor="end" fontSize="11" fill="#374151" fontWeight="500">{member.name}</text>
                <text x={CHART_LEFT - 4} y={rowY + 23} textAnchor="end" fontSize="9" fill="#9CA3AF">{member.role}</text>
                <rect x={barX} y={rowY + 3} width={barWidth} height="14" rx="2" fill={member.color} opacity="0.8" />
              </g>
            )
          })}

          {/* X-axis week labels */}
          {[1, 5, 9, 13, 17, 21, 25, 28].map(w => (
            <text key={w} x={weekX(w)} y="250" textAnchor="middle" fontSize="10" fill="#6B7280">{w}</text>
          ))}

          {/* Phase labels */}
          <text
            x={CHART_LEFT + (6 / TOTAL_WEEKS) * CHART_WIDTH}
            y="260"
            textAnchor="middle"
            fontSize="10"
            fill="#3B82F6"
            fontWeight="600"
          >Phase 1 (wk 1–12)</text>
          <text
            x={CHART_LEFT + (16 / TOTAL_WEEKS) * CHART_WIDTH}
            y="260"
            textAnchor="middle"
            fontSize="10"
            fill="#7C3AED"
            fontWeight="600"
          >Phase 2 (wk 13–20)</text>
          <text
            x={CHART_LEFT + (24 / TOTAL_WEEKS) * CHART_WIDTH}
            y="260"
            textAnchor="middle"
            fontSize="10"
            fill="#16A34A"
            fontWeight="600"
          >Phase 3 (wk 21–28)</text>
        </svg>
      </div>

    </div>
  )
}
