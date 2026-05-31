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
    skills: ['Stakeholder Management', 'Risk & Governance', 'Agile Delivery'],
    phase: 'management',
  },
  {
    name: 'Marcus Rivera',
    role: 'Solution Architect',
    allocation: '100%',
    skills: ['System Design', 'API Gateway', 'Cloud Infrastructure'],
    phase: 'infrastructure',
  },
  {
    name: 'Priya Nair',
    role: 'Lead Backend Engineer',
    allocation: '100%',
    skills: ['Node.js', 'PostgreSQL', 'ISO 27001', 'RBAC'],
    phase: 'delivery',
  },
  {
    name: 'David Kim',
    role: 'Full-Stack Engineer',
    allocation: '100%',
    skills: ['React', 'TypeScript', 'REST APIs', 'Data Migration'],
    phase: 'delivery',
  },
  {
    name: 'Amara Osei',
    role: 'QA Lead',
    allocation: '75%',
    skills: ['Test Automation', 'UAT', 'Regression Testing', 'Playwright'],
    phase: 'qa',
  },
  {
    name: 'Lena Müller',
    role: 'Data Engineer',
    allocation: '75%',
    skills: ['DataBridge', 'ETL Pipelines', 'SQL', 'Data Quality'],
    phase: 'delivery',
  },
  {
    name: 'James Thornton',
    role: 'DevOps / Cloud Engineer',
    allocation: '50%',
    skills: ['AWS', 'CI/CD', 'Docker', 'Security Hardening'],
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

export function Team() {
  return (
    <div className="team-wrap">
      <div className="team-header-row">
        <div className="team-title">Project Team — 7 Members · 6.75 FTE</div>
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
          { value: '7', label: 'Team Members' },
          { value: '6.75', label: 'Total FTE' },
          { value: '4', label: 'Full-Time' },
          { value: '3', label: 'Part-Time' },
          { value: '14 wks', label: 'Engagement' },
        ].map(({ value, label }) => (
          <div key={label} className="tl-card">
            <div className="tl-card-value">{value}</div>
            <div className="tl-card-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
