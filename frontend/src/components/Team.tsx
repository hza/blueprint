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

export function Team() {
  return (
    <div className="team-wrap">
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
    </div>
  )
}
