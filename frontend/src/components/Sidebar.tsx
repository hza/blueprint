import { useEffect, useRef, useState } from 'react'
import './Sidebar.css'
import { FileTree } from './FileTree'
import type { FileInfo } from '../types'

const THEMES = [
  { key: 'day',        label: 'Day',        topbar: '#273664', canvas: '#FFFFFF',  accent: '#2563EB' },
  { key: 'night',      label: 'Night',      topbar: '#050D18', canvas: '#0F172A',  accent: '#3B82F6' },
  { key: 'confluence', label: 'Confluence', topbar: '#FFFFFF', canvas: '#F4F5F7',  accent: '#0052CC' },
  { key: 'notion',     label: 'Notion',     topbar: '#F7F6F3', canvas: '#FFFFFF',  accent: '#2EAADC' },
  { key: 'freshworks', label: 'Freshworks', topbar: '#253858', canvas: '#F5F7FA',  accent: '#2196F3' },
  { key: 'gray',       label: 'Gray',       topbar: '#2D2E30', canvas: '#F1F3F4',  accent: '#5F6368' },
] as const
type Theme = (typeof THEMES)[number]['key']

interface NavSubsection {
  id: string
  title: string
}

interface NavSection {
  id: string
  title: string
  subsections: NavSubsection[]
}

const NAV_SECTIONS: NavSection[] = [
  {
    id: '1',
    title: 'Executive Summary & Overview',
    subsections: [
      { id: '1.1', title: 'Executive Summary' },
      { id: '1.2', title: 'Key Assumptions & Dependencies' },
      { id: '1.3', title: 'Clarifications & Exceptions' },
    ],
  },
  {
    id: '2',
    title: 'Requirements & Compliance Matrix',
    subsections: [
      { id: '2.1', title: 'RFP Requirements Summary' },
      { id: '2.2', title: 'Coverage & Compliance Matrix' },
    ],
  },
  {
    id: '3',
    title: 'Technical & Solution Architecture',
    subsections: [
      { id: '3.1', title: 'High-Level Design (HLD)' },
      { id: '3.2', title: 'Core Capabilities & Custom Software Scope' },
      { id: '3.3', title: 'Integration & Data Architecture' },
    ],
  },
  {
    id: '4',
    title: 'Information Security & Compliance',
    subsections: [
      { id: '4.1', title: 'Security Architecture & Data Protection' },
      { id: '4.2', title: 'Certifications, Audits & Compliance' },
    ],
  },
  {
    id: '5',
    title: 'Project Delivery, Team & Governance',
    subsections: [
      { id: '5.1', title: 'Implementation Approach & Timeline' },
      { id: '5.2', title: 'Project Team, Expertise & Resource Allocation' },
      { id: '5.3', title: 'Change Management, Training & Support' },
      { id: '5.4', title: 'References & Case Studies' },
    ],
  },
  {
    id: '6',
    title: 'Commercials, Pricing & Legal',
    subsections: [
      { id: '6.1', title: 'Total Cost of Ownership (TCO) Summary' },
      { id: '6.2', title: 'Granular Cost Breakdown' },
      { id: '6.3', title: 'Value & ROI Analysis' },
      { id: '6.4', title: 'Legal & Contractual Notes' },
    ],
  },
]

interface SidebarProps {
  files: FileInfo[]
  selectedFile: string | null
  error: string | null
  onSelectFile: (filename: string) => void
  onSelectRoot: () => void
  width?: number
  activeSection?: string | null
  onSectionChange?: (id: string) => void
  userName?: string
}

export function Sidebar({
  files,
  selectedFile,
  error,
  onSelectFile,
  onSelectRoot,
  width,
  activeSection,
  onSectionChange,
  userName = 'Hans Zimmer',
}: SidebarProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem('app-theme') as Theme | null) ?? 'day'
  )
  const [userOpen, setUserOpen] = useState(false)
  const [docsOpen, setDocsOpen] = useState(false)
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())
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

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

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
    <aside className="sidebar" style={width !== undefined ? { width } : undefined}>
      {/* Brand */}
      <div className="sidebar-brand">
        <svg className="sidebar-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sb-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4C9AFF" />
              <stop offset="100%" stopColor="#0052CC" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="6" fill="rgba(255,255,255,0.1)" />
          <path d="M6 22 C8 18 12 10 16 8 C20 10 24 18 26 22" stroke="url(#sb-grad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M10 26 C11.5 23 13.5 19 16 17 C18.5 19 20.5 23 22 26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
        <span className="sidebar-brand-title">The Blueprint</span>
      </div>

      {/* Proposal Navigation */}
      <nav className="sidebar-nav">
        {NAV_SECTIONS.map((section) => {
          const collapsed = collapsedSections.has(section.id)
          const hasChildren = section.subsections.length > 0
          const sectionActive = isActive(section.id)

          return (
            <div key={section.id} className="sidebar-section">
              <button
                className={`sidebar-section-header${sectionActive && !hasChildren ? ' active' : ''}${sectionActive && hasChildren ? ' parent-active' : ''}`}
                onClick={() => {
                  if (hasChildren) {
                    toggleSection(section.id)
                  } else {
                    onSectionChange?.(section.id)
                  }
                }}
              >
                <span className="sidebar-section-id">{section.id}</span>
                <span className="sidebar-section-title">{section.title}</span>
                {hasChildren && (
                  <svg
                    className={`sidebar-chevron${collapsed ? '' : ' open'}`}
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              {hasChildren && !collapsed && (
                <div className="sidebar-subsections">
                  {section.subsections.map((sub) => (
                    <button
                      key={sub.id}
                      className={`sidebar-sub-item${activeSection === sub.id ? ' active' : ''}`}
                      onClick={() => onSectionChange?.(sub.id)}
                    >
                      <span className="sidebar-sub-id">{sub.id}</span>
                      <span className="sidebar-sub-title">{sub.title}</span>
                    </button>
                  ))}
                </div>
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
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 13, height: 13, flexShrink: 0 }}>
            <path d="M3 2h7l3 3v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" strokeLinejoin="round" />
            <path d="M10 2v3h3" strokeLinejoin="round" />
          </svg>
          <span>RFP Documents</span>
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
                onSelectRoot={onSelectRoot}
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
                <div className="sidebar-popup-role">Customer</div>
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
