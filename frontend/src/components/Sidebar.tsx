import { useEffect, useRef, useState } from 'react'
import './Sidebar.css'
import { FileTree } from './FileTree'
import type { FileInfo } from '../types'

const THEMES = [
  { key: 'day',        label: 'Day',        topbar: '#253858', canvas: '#F5F7FA',  accent: '#2196F3' },
  { key: 'fantasy',    label: 'Fantasy',    topbar: '#000000', canvas: '#1B1B1B',  accent: '#FF9000' },
  { key: 'night',      label: 'Night',      topbar: '#050D18', canvas: '#0F172A',  accent: '#3B82F6' },
  { key: 'confluence', label: 'Confluence', topbar: '#FFFFFF', canvas: '#F4F5F7',  accent: '#0052CC' },
  { key: 'notion',     label: 'Notion',     topbar: '#F7F6F3', canvas: '#FFFFFF',  accent: '#2EAADC' },
  { key: 'gray',       label: 'Gray',       topbar: '#2D2E30', canvas: '#F1F3F4',  accent: '#5F6368' },
] as const
type Theme = (typeof THEMES)[number]['key']

const PROJECTS = [
  { company: 'Meridian Software', name: 'AI-Powered Customer Facing Portal' },
]

interface NavSubsection {
  id: string
  title: string
  path: string
  icon: string
  badge?: number | string
  badgeGrey?: boolean
}

function SubIcon({ name }: { name: string }) {
  const base = { className: "sidebar-sub-icon", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, xmlns: "http://www.w3.org/2000/svg" }
  switch (name) {
    // Executive Overview
    case 'proposal-summary': return <svg {...base}><path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h5L13 4.5V13a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13z"/><polyline points="9 1 9 5 13 5"/><line x1="5.5" y1="8" x2="10.5" y2="8"/><line x1="5.5" y1="10.5" x2="8.5" y2="10.5"/></svg>
    case 'key-assumptions': return <svg {...base}><circle cx="5.5" cy="9.5" r="2.5"/><line x1="7.5" y1="7.5" x2="14" y2="1"/><line x1="12" y1="3" x2="13.5" y2="4.5"/><line x1="10" y1="5" x2="11.5" y2="6.5"/></svg>
    case 'clarifications': return <svg {...base}><path d="M8 1.5A6 6 0 1 0 14 7.5"/><path d="M8 5.5v2.8l1.5 1.5"/><circle cx="8" cy="11.5" r=".5" fill="currentColor" stroke="none"/></svg>

    // Requirements Coverage
    case 'requirements-summary': return <svg {...base}><rect x="2" y="2" width="12" height="12" rx="1.5"/><polyline points="5 8 7 10 11 6"/></svg>
    case 'coverage-matrix': return <svg {...base}><rect x="2" y="2" width="12" height="12" rx="1.5"/><line x1="2" y1="6" x2="14" y2="6"/><line x1="2" y1="10" x2="14" y2="10"/><line x1="6" y1="2" x2="6" y2="14"/><line x1="10" y1="2" x2="10" y2="14"/></svg>

    // Solution Architecture
    case 'architecture-overview': return <svg {...base}><rect x="2" y="9" width="12" height="4" rx="1"/><rect x="4" y="5" width="8" height="3" rx="1"/><rect x="6" y="2" width="4" height="2.5" rx="1"/></svg>
    case 'roles-integrations': return <svg {...base}><circle cx="8" cy="3.5" r="2"/><line x1="8" y1="5.5" x2="8" y2="10.5"/><line x1="5" y1="7.5" x2="11" y2="7.5"/><line x1="8" y1="10.5" x2="5.5" y2="13.5"/><line x1="8" y1="10.5" x2="10.5" y2="13.5"/></svg>
    case 'functional-scope': return <svg {...base}><polyline points="1.5 5 5 5 7 2 9 12 11 8 13 8 14.5 8"/></svg>
    case 'non-functional': return <svg {...base}><circle cx="8" cy="8" r="5.5"/><path d="M8 5v3.5l2 2"/></svg>
    case 'acceptance-criteria': return <svg {...base}><polyline points="2.5 9 5.5 12 13.5 4"/></svg>

    // Security & Compliance
    case 'security-model': return <svg {...base}><path d="M8 1.5L2 4v4c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4z"/></svg>
    case 'certifications': return <svg {...base}><circle cx="8" cy="7" r="3.5"/><path d="M5.5 9.5L4.5 14l3.5-1.5L11.5 14l-1-4.5"/></svg>

    // Delivery & Governance
    case 'delivery-timeline': return <svg {...base}><rect x="2" y="3" width="12" height="10" rx="1.5"/><line x1="2" y1="6.5" x2="14" y2="6.5"/><line x1="5.5" y1="2" x2="5.5" y2="4.5"/><line x1="10.5" y1="2" x2="10.5" y2="4.5"/><line x1="5" y1="9.5" x2="11" y2="9.5"/></svg>
    case 'team-roles': return <svg {...base}><circle cx="6" cy="5.5" r="2"/><path d="M2 13c0-2.2 1.8-4 4-4s4 1.8 4 4"/><circle cx="11.5" cy="5.5" r="1.5"/><path d="M9 13c0-1.7 1.1-3 2.5-3s2.5 1.3 2.5 3"/></svg>
    case 'testing-quality': return <svg {...base}><path d="M6 2h4M6 2v4.5L3.5 11a2 2 0 0 0 1.8 2.8h5.4a2 2 0 0 0 1.8-2.8L10 6.5V2"/><line x1="3.2" y1="9" x2="12.8" y2="9"/></svg>
    case 'risks-mitigation': return <svg {...base}><path d="M8 2L1.5 13.5h13z"/><line x1="8" y1="6.5" x2="8" y2="9.5"/><circle cx="8" cy="11.5" r=".5" fill="currentColor" stroke="none"/></svg>
    case 'training': return <svg {...base}><polygon points="8,2 15,5.5 8,9 1,5.5"/><path d="M4 7.2V11c0 1.7 1.8 3 4 3s4-1.3 4-3V7.2"/><line x1="15" y1="5.5" x2="15" y2="10"/><circle cx="15" cy="10.5" r="0.8" fill="currentColor" stroke="none"/></svg>
    case 'sla-support': return <svg {...base}><path d="M3 4.5h10a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1z"/><path d="M5 4.5V3.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/><path d="M6 8.5h4M8 7v3"/></svg>
    case 'transition': return <svg {...base}><path d="M3 8h10M10 5l3 3-3 3"/></svg>

    // Pricing & Commercials
    case 'tco-overview': return <svg {...base}><line x1="8" y1="1.5" x2="8" y2="14.5"/><path d="M11 5.5C11 3.5 9.5 2.5 8 2.5C6.5 2.5 5 3.5 5 5.5C5 7 6.5 7.5 8 8C9.5 8.5 11 9 11 10.5C11 12.5 9.5 13.5 8 13.5C6.5 13.5 5 12.5 5 10.5"/></svg>
    case 'cost-breakdown': return <svg {...base}><line x1="2.5" y1="13.5" x2="13.5" y2="13.5"/><rect x="3" y="9" width="2.5" height="4.5"/><rect x="6.75" y="6" width="2.5" height="7.5"/><rect x="10.5" y="3" width="2.5" height="10.5"/></svg>
    case 'contractual-terms': return <svg {...base}><path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h5L13 4.5V13a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13z"/><polyline points="9 1 9 5 13 5"/><line x1="5.5" y1="7.5" x2="10.5" y2="7.5"/><line x1="5.5" y1="9.5" x2="8.5" y2="9.5"/><path d="M5.5 12c.4-.7.8-.2 1.2.1s.8-.5 1.2-.1.8.3 1.2 0"/></svg>

    // References & Track Record
    case 'case-studies': return <svg {...base}><path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z"/></svg>
    case 'client-references': return <svg {...base}><rect x="4" y="1.5" width="8" height="13" rx="1.5"/><line x1="6.5" y1="3.5" x2="9.5" y2="3.5"/><circle cx="8" cy="13" r=".7" fill="currentColor" stroke="none"/></svg>

    default: return <svg {...base}><rect x="3" y="2" width="10" height="12" rx="1.5"/><line x1="5.5" y1="5.5" x2="10.5" y2="5.5"/><line x1="5.5" y1="8" x2="10.5" y2="8"/><line x1="5.5" y1="10.5" x2="8.5" y2="10.5"/></svg>
  }
}

interface NavSection {
  id: string
  title: string
  path: string
  subsections: NavSubsection[]
}

export const NAV_SECTIONS: NavSection[] = [
  {
    id: '1',
    title: 'Executive Overview',
    path: '/executive-overview',
    subsections: [
      { id: '1.1', title: 'Proposal Summary',   icon: 'proposal-summary',  path: '/executive-overview/proposal-summary' },
      { id: '1.3', title: 'Key Assumptions',    icon: 'key-assumptions',   path: '/executive-overview/key-assumptions' },
      { id: '1.4', title: 'Clarifications',     icon: 'clarifications',    path: '/executive-overview/clarifications' },
    ],
  },
  {
    id: '2',
    title: 'Requirements Coverage',
    path: '/requirements-coverage',
    subsections: [
      { id: '2.1', title: 'Requirements Summary',        icon: 'requirements-summary', path: '/requirements-coverage/requirements-summary', badge: 0, badgeGrey: true },
      { id: '2.2', title: 'Coverage & Compliance Matrix', icon: 'coverage-matrix',      path: '/requirements-coverage/coverage-matrix' },
    ],
  },
  {
    id: '3',
    title: 'Solution Architecture',
    path: '/solution-architecture',
    subsections: [
      { id: '3.1', title: 'Architecture Overview',       icon: 'architecture-overview', path: '/solution-architecture/architecture-overview' },
      { id: '3.3', title: 'Roles & Integrations',        icon: 'roles-integrations',    path: '/solution-architecture/integration-data', badge: '7+5', badgeGrey: true },
      { id: '3.2', title: 'Functional Scope',            icon: 'functional-scope',      path: '/solution-architecture/functional-scope' },
      { id: '3.4', title: 'Non-Functional Requirements', icon: 'non-functional',        path: '/solution-architecture/non-functional-requirements' },
      { id: '3.5', title: 'Acceptance Criteria',         icon: 'acceptance-criteria',   path: '/solution-architecture/acceptance-criteria' },
    ],
  },
  {
    id: '4',
    title: 'Security & Compliance',
    path: '/security-compliance',
    subsections: [
      { id: '4.1', title: 'Security Model',           icon: 'security-model', path: '/security-compliance/security-model' },
      { id: '4.2', title: 'Certifications & Standards', icon: 'certifications', path: '/security-compliance/certifications-standards' },
    ],
  },
  {
    id: '5',
    title: 'Delivery & Governance',
    path: '/delivery-governance',
    subsections: [
      { id: '5.1', title: 'Delivery Approach & Timeline', icon: 'delivery-timeline', path: '/delivery-governance/delivery-timeline' },
      { id: '5.2', title: 'Team & Roles',                 icon: 'team-roles',        path: '/delivery-governance/team-roles' },
      { id: '5.3', title: 'Testing & Quality',            icon: 'testing-quality',   path: '/delivery-governance/testing-quality' },
      { id: '5.4', title: 'Risks & Mitigation',           icon: 'risks-mitigation',  path: '/delivery-governance/risks-mitigation' },
      { id: '5.5', title: 'Training & Change Enablement', icon: 'training',          path: '/delivery-governance/training-change-enablement' },
      { id: '5.6', title: 'SLA & Support Post-Go-Live',  icon: 'sla-support',       path: '/delivery-governance/sla-support' },
      { id: '5.7', title: 'Transition & Handover',        icon: 'transition',        path: '/delivery-governance/transition-handover' },
    ],
  },
  {
    id: '6',
    title: 'Pricing & Commercials',
    path: '/pricing-commercials',
    subsections: [
      { id: '6.1', title: 'TCO Overview',      icon: 'tco-overview',      path: '/pricing-commercials/tco-overview' },
      { id: '6.2', title: 'Cost Breakdown',    icon: 'cost-breakdown',    path: '/pricing-commercials/cost-breakdown' },
      { id: '6.3', title: 'Contractual Terms', icon: 'contractual-terms', path: '/pricing-commercials/contractual-terms' },
    ],
  },
  {
    id: '7',
    title: 'References & Track Record',
    path: '/proof-credibility',
    subsections: [
      { id: '7.1', title: 'Results for Similar Organisations', icon: 'case-studies',       path: '/proof-credibility/case-studies' },
      { id: '7.2', title: 'Peers You Can Call',                icon: 'client-references',  path: '/proof-credibility/client-references' },
    ],
  },
]

interface SidebarProps {
  files: FileInfo[]
  selectedFile: string | null
  error: string | null
  onSelectFile: (filename: string) => void
  width?: number
  activeSection?: string | null
  onSectionChange?: (id: string, path: string) => void
  userName?: string
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  reqSummaryTotal?: number | null
}

export function Sidebar({
  files,
  selectedFile,
  error,
  onSelectFile,
  width,
  activeSection,
  onSectionChange,
  userName = 'Hans Zimmer',
  collapsed = false,
  onCollapse,
  reqSummaryTotal,
}: SidebarProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem('app-theme') as Theme | null) ?? 'day'
  )

  const ASSUMPTION_IDS = ['A1', 'A2', 'A3', 'A4', 'A5']
  const CLARIFICATION_IDS = ['Q1', 'Q2', 'Q3', 'Q4']

  const countNotApproved = (saved: Record<string, string>) => {
    const defaults: Record<string, string> = {}
    ASSUMPTION_IDS.forEach(id => { defaults[id] = saved[id] ?? (id === 'A1' ? 'Pending' : id === 'A2' ? 'Rejected' : 'Approved') })
    return ASSUMPTION_IDS.filter(id => defaults[id] !== 'Approved').length
  }

  const countUnanswered = (saved: Record<string, string>) =>
    CLARIFICATION_IDS.filter(id => !saved[id]?.trim()).length

  const [notApprovedAssumptions, setNotApprovedAssumptions] = useState<number>(() => {
    try { return countNotApproved(JSON.parse(localStorage.getItem('assumption_statuses') ?? '{}')) }
    catch { return 0 }
  })

  const [unansweredClarifications, setUnansweredClarifications] = useState<number>(() => {
    try { return countUnanswered(JSON.parse(localStorage.getItem('clarifications_answers') ?? '{}')) }
    catch { return CLARIFICATION_IDS.length }
  })

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'assumption_statuses') {
        try { setNotApprovedAssumptions(countNotApproved(JSON.parse(e.newValue ?? '{}'))) }
        catch { /* ignore */ }
      }
      if (e.key === 'clarifications_answers') {
        try { setUnansweredClarifications(countUnanswered(JSON.parse(e.newValue ?? '{}'))) }
        catch { /* ignore */ }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  const [userOpen, setUserOpen] = useState(false)
  const [docsOpen, setDocsOpen] = useState(false)
  const [projectOpen, setProjectOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0])
  const userRef = useRef<HTMLDivElement>(null)
  const projectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('app-theme', theme)
  }, [theme])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false)
      if (projectRef.current && !projectRef.current.contains(e.target as Node)) setProjectOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (id: string) => {
    if (activeSection === id) return true
    // a parent section is active if a child subsection is active
    if (activeSection?.startsWith(id + '.')) return true
    return false
  }

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <aside className={`sidebar${collapsed ? ' sidebar-collapsed' : ''}`} style={width !== undefined ? { width } : undefined}>
      {/* Brand */}
      <div className="sidebar-brand">
        <svg className="sidebar-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="var(--topbar-hover)" />
          <path d="M6 22 C8 18 12 10 16 8 C20 10 24 18 26 22" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M10 26 C11.5 23 13.5 19 16 17 C18.5 19 20.5 23 22 26" stroke="var(--topbar-fg)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
        <span className="sidebar-brand-title">The Blueprint</span>
        <button
          className="sidebar-collapse-btn"
          onClick={() => onCollapse?.(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.5" y="1.5" width="17" height="17" rx="3.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 1.5C3.067 1.5 1.5 3.067 1.5 5v10c0 1.933 1.567 3.5 3.5 3.5H7.5V1.5H5z" fill="currentColor" fillOpacity="0.18" />
            <line x1="7.5" y1="1.5" x2="7.5" y2="18.5" stroke="currentColor" strokeWidth="1.5" />
            {collapsed
              ? <path d="M10.5 8l3 2-3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              : <path d="M13.5 8l-3 2 3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            }
          </svg>
        </button>
      </div>

      {/* Client / Project */}
      <div className="sidebar-client" ref={projectRef}>
        <img src="/rfp-icon.svg" className="sidebar-client-icon" alt="RFP" />
        <div className="sidebar-client-text">
          <span className="sidebar-client-name">{selectedProject.company}</span>
          <span className="sidebar-client-project">{selectedProject.name}</span>
        </div>
        <button
          className={`sidebar-project-chevron${projectOpen ? ' open' : ''}`}
          onClick={() => setProjectOpen(o => !o)}
          aria-label="Switch project"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
        {projectOpen && (
          <div className="sidebar-project-dropdown">
            {PROJECTS.map(p => (
              <button
                key={p.name}
                className={`sidebar-project-option${p.name === selectedProject.name ? ' active' : ''}`}
                onClick={() => { setSelectedProject(p); setProjectOpen(false) }}
              >
                <img src="/rfp-icon.svg" className="sidebar-project-option-icon" alt="" />
                <div className="sidebar-project-option-text">
                  <span className="sidebar-project-option-company">{p.company}</span>
                  <span className="sidebar-project-option-name">{p.name}</span>
                </div>
              </button>
            ))}
            <div className="sidebar-project-sep" />
            <a
              href="mailto:sales@scnsoft.com?subject=New%20Project%20Inquiry"
              className="sidebar-project-new"
              onClick={() => setProjectOpen(false)}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="8" r="6.25" />
                <path d="M8 5.5v5M5.5 8h5" />
              </svg>
              Start a New Project with SCNSoft
            </a>
          </div>
        )}
      </div>

      {/* Proposal Navigation */}
      <nav className="sidebar-nav">
        {NAV_SECTIONS.map((section) => {
          const hasChildren = section.subsections.length > 0
          const sectionActive = isActive(section.id)

          return (
            <div key={section.id} className="sidebar-section">
              {hasChildren ? (
                <>
                  <div className="sidebar-group-label" style={{cursor: 'pointer'}} onClick={() => onSectionChange?.(section.id, section.path)}>{section.title}</div>
                  <div className="sidebar-subsections">
                    {section.subsections.map((sub) => (
                      <button
                        key={sub.id}
                        className={`sidebar-sub-item${activeSection === sub.id ? ' active' : ''}`}
                        onClick={() => onSectionChange?.(sub.id, sub.path)}
                      >
                        <SubIcon name={sub.icon} />
                        <span className="sidebar-sub-title">{sub.title}</span>
                        {(() => {
                          const isReqSummary = sub.path === '/requirements-coverage/requirements-summary' && reqSummaryTotal != null
                          const isKeyAssumptions = sub.path === '/executive-overview/key-assumptions'
                          const isClarifications = sub.path === '/executive-overview/clarifications'
                          const badgeVal = isReqSummary ? reqSummaryTotal : isKeyAssumptions ? (notApprovedAssumptions || undefined) : isClarifications ? (unansweredClarifications || undefined) : sub.badge
                          const badgeGrey = isReqSummary ? false : sub.badgeGrey
                          return badgeVal !== undefined && badgeVal !== 0 && (
                            <span className={badgeGrey ? 'sidebar-badge sidebar-badge--grey' : 'sidebar-badge'}>{badgeVal}</span>
                          )
                        })()}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <button
                  className={`sidebar-sub-item${sectionActive ? ' active' : ''}`}
                  onClick={() => onSectionChange?.(section.id, section.path)}
                >
                  <span className="sidebar-sub-title">{section.title}</span>
                </button>
              )}
            </div>
          )
        })}
      </nav>

      {/* RFP Documents */}
      <div className="sidebar-docs">
        <button
          className="sidebar-docs-toggle"
          onClick={() => setDocsOpen((v) => !v)}
          aria-expanded={docsOpen}
        >
          <svg className={`sidebar-docs-chevron${docsOpen ? ' open' : ''}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 13, height: 13, flexShrink: 0 }}>
            <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 10 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z" />
          </svg>
          <span className="sidebar-section-title">RFP Documents</span>
        </button>
        {docsOpen && (
          <div className="sidebar-docs-tree">
            {error && !files.length ? (
              <div className="sidebar-error">{error}</div>
            ) : (
              <FileTree
                files={files}
                selectedFile={selectedFile}
                onSelectFile={onSelectFile}
              />
            )}
          </div>
        )}
      </div>

      {/* User / Theme footer */}
      <div className="sidebar-footer" ref={userRef}>
        <button
          className={`sidebar-user-btn${userOpen ? ' open' : ''}`}
          onClick={() => setUserOpen((v) => !v)}
        >
          <span className="sidebar-avatar">{initials}</span>
          <span className="sidebar-user-name">{userName}</span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="sidebar-user-chevron">
            <path d="M4 6l4-4 4 4M4 10l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {userOpen && (
          <div className="sidebar-user-popup">
            <div className="sidebar-popup-header">
              <span className="sidebar-avatar sidebar-avatar-lg">{initials}</span>
              <div>
                <div className="sidebar-popup-name">{userName}</div>
                <div className="sidebar-popup-role">Valued Client</div>
              </div>
            </div>
            <div className="sidebar-popup-sep" />
            <div className="sidebar-theme-section">
              <div className="sidebar-theme-label">Theme</div>
              <div className="sidebar-theme-swatches">
                {THEMES.map((t) => (
                  <button
                    key={t.key}
                    className={`sidebar-theme-swatch${theme === t.key ? ' active' : ''}`}
                    title={t.label}
                    onClick={() => setThemeState(t.key)}
                    style={{ '--swatch-topbar': t.topbar, '--swatch-canvas': t.canvas, '--swatch-accent': t.accent } as React.CSSProperties}
                  >
                    <span className="sidebar-theme-swatch-preview" />
                    <span className="sidebar-theme-swatch-name">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="sidebar-popup-sep" />
            <button className="sidebar-popup-item sidebar-popup-item-danger">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" strokeLinecap="round" />
                <path d="M10 11l3-3-3-3M13 8H6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sign out
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
