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

interface NavSubsection {
  id: string
  title: string
  path: string
  badge?: number | string
  badgeGrey?: boolean
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
      { id: '1.1', title: 'Proposal Summary',                path: '/executive-overview/proposal-summary' },
{ id: '1.3', title: 'Key Assumptions', path: '/executive-overview/key-assumptions' },
{ id: '1.4', title: 'Clarifications', path: '/executive-overview/clarifications', badge: 4 },
    ],
  },
  {
    id: '2',
    title: 'Requirements Coverage',
    path: '/requirements-coverage',
    subsections: [
      { id: '2.1', title: 'Requirements Summary',        path: '/requirements-coverage/requirements-summary', badge: 0, badgeGrey: true },
      { id: '2.2', title: 'Coverage & Compliance Matrix', path: '/requirements-coverage/coverage-matrix' },
    ],
  },
  {
    id: '3',
    title: 'Solution Architecture',
    path: '/solution-architecture',
    subsections: [
      { id: '3.1', title: 'Architecture Overview',        path: '/solution-architecture/architecture-overview' },
      { id: '3.2', title: 'Functional Scope',             path: '/solution-architecture/functional-scope' },
      { id: '3.3', title: 'Roles & Integrations',          path: '/solution-architecture/integration-data', badge: '9+7', badgeGrey: true },
      { id: '3.4', title: 'Non-Functional Requirements',  path: '/solution-architecture/non-functional-requirements' },
      { id: '3.5', title: 'Acceptance Criteria',           path: '/solution-architecture/acceptance-criteria' },
    ],
  },
  {
    id: '4',
    title: 'Security & Compliance',
    path: '/security-compliance',
    subsections: [
      { id: '4.1', title: 'Security Model',           path: '/security-compliance/security-model' },
      { id: '4.2', title: 'Certifications & Standards', path: '/security-compliance/certifications-standards' },
    ],
  },
  {
    id: '5',
    title: 'Delivery & Governance',
    path: '/delivery-governance',
    subsections: [
      { id: '5.1', title: 'Delivery Approach & Timeline',   path: '/delivery-governance/delivery-timeline' },
      { id: '5.2', title: 'Team & Roles',                   path: '/delivery-governance/team-roles' },
      { id: '5.3', title: 'Testing & Quality',              path: '/delivery-governance/testing-quality' },
      { id: '5.4', title: 'Risks & Mitigation',             path: '/delivery-governance/risks-mitigation' },
      { id: '5.5', title: 'Training & Change Enablement',   path: '/delivery-governance/training-change-enablement' },
      { id: '5.6', title: 'SLA & Support Post-Go-Live',    path: '/delivery-governance/sla-support' },
      { id: '5.7', title: 'Transition & Handover',          path: '/delivery-governance/transition-handover' },
    ],
  },
  {
    id: '6',
    title: 'Pricing & Commercials',
    path: '/pricing-commercials',
    subsections: [
      { id: '6.1', title: 'TCO Overview',        path: '/pricing-commercials/tco-overview' },
      { id: '6.2', title: 'Cost Breakdown',       path: '/pricing-commercials/cost-breakdown' },
      { id: '6.3', title: 'Contractual Terms',    path: '/pricing-commercials/contractual-terms' },
    ],
  },
  {
    id: '7',
    title: 'References & Track Record',
    path: '/proof-credibility',
    subsections: [
      { id: '7.1', title: 'Results for Similar Organisations', path: '/proof-credibility/case-studies' },
      { id: '7.2', title: 'Peers You Can Call',               path: '/proof-credibility/client-references' },
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
  clientName?: string
  projectName?: string
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
  clientName = 'Meridian Software',
  projectName = 'Customer Facing Portal',
  collapsed = false,
  onCollapse,
  reqSummaryTotal,
}: SidebarProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem('app-theme') as Theme | null) ?? 'day'
  )
  const [userOpen, setUserOpen] = useState(false)
  const [docsOpen, setDocsOpen] = useState(false)
  const userRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('app-theme', theme)
  }, [theme])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false)
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
      <div className="sidebar-client">
        <img src="/rfp-icon.svg" className="sidebar-client-icon" alt="RFP" />
        <div className="sidebar-client-text">
          <span className="sidebar-client-name">{clientName}</span>
          <span className="sidebar-client-project">{projectName}</span>
        </div>
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
                        <svg className="sidebar-sub-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="2" width="10" height="12" rx="1.5" />
                          <line x1="5.5" y1="5.5" x2="10.5" y2="5.5" />
                          <line x1="5.5" y1="8" x2="10.5" y2="8" />
                          <line x1="5.5" y1="10.5" x2="8.5" y2="10.5" />
                        </svg>
                        <span className="sidebar-sub-title">{sub.title}</span>
                        {(() => {
                          const isReqSummary = sub.path === '/requirements-coverage/requirements-summary' && reqSummaryTotal != null
                          const badgeVal = isReqSummary ? reqSummaryTotal : sub.badge
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
                <div className="sidebar-popup-role">Buyer</div>
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
