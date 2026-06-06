import { useEffect, useRef, useState } from 'react'
import { DEFAULT_USER_NAME } from '../types'
import type { ViewTab } from '../types'
import './TopBar.css'

const THEMES = [
  { key: 'day',         label: 'Day',         topbar: '#253858', canvas: '#F5F7FA',  accent: '#2196F3' },
  { key: 'night',       label: 'Night',       topbar: '#050D18', canvas: '#0F172A',  accent: '#3B82F6' },
  { key: 'confluence',  label: 'Confluence',  topbar: '#FFFFFF', canvas: '#F4F5F7',  accent: '#0052CC' },
  { key: 'notion',      label: 'Notion',      topbar: '#F7F6F3', canvas: '#FFFFFF',  accent: '#2EAADC' },
  { key: 'gray',        label: 'Gray',        topbar: '#2D2E30', canvas: '#F1F3F4',  accent: '#5F6368' },
] as const
type Theme = (typeof THEMES)[number]['key']

interface TopBarProps {
  userName?: string
  activeTab?: ViewTab
  onTabChange?: (tab: ViewTab) => void
}

const NAV_TABS: { key: ViewTab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'requirements', label: 'Requirements' },
  { key: 'qa', label: 'Q&A' },
  { key: 'analytics', label: 'Business Analytics' },
  { key: 'uxdesign', label: 'UI/UX' },
  { key: 'technical', label: 'Technical Solution' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'team', label: 'Team' },
  { key: 'cost', label: 'Investment & ROI' },
]

export function TopBar({ userName = DEFAULT_USER_NAME, activeTab, onTabChange }: TopBarProps) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem('app-theme') as Theme | null) ?? 'day'
  )
  const userRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('app-theme', theme)
  }, [theme])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="topbar">
      <div className="topbar-left">
        <svg className="topbar-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="conf-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4C9AFF" />
              <stop offset="100%" stopColor="#0052CC" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="6" fill="rgba(255,255,255,0.1)" />
          <path d="M6 22 C8 18 12 10 16 8 C20 10 24 18 26 22" stroke="url(#conf-grad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M10 26 C11.5 23 13.5 19 16 17 C18.5 19 20.5 23 22 26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
        <span className="topbar-title">The Blueprint</span>
      </div>

      <nav className="topbar-nav">
        {NAV_TABS.map((t) => (
          <button
            key={t.key}
            className={`topbar-nav-tab${activeTab === t.key || (activeTab === 'code' && t.key === 'requirements') ? ' active' : ''}`}
            data-label={t.label}
            onClick={() => onTabChange?.(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="topbar-right">
        <div className="topbar-search">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="topbar-search-icon">
            <circle cx="6.5" cy="6.5" r="4.5" />
            <path d="M10.5 10.5L14 14" strokeLinecap="round" />
          </svg>
          <input className="topbar-search-input" type="text" placeholder="Search" aria-label="Search" />
        </div>

        <div className="topbar-notif-wrap" ref={notifRef}>
          <button
            className={`topbar-icon-btn${notifOpen ? ' active' : ''}`}
            title="Notifications"
            aria-label="Notifications"
            onClick={() => setNotifOpen((v) => !v)}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 2a5 5 0 0 1 5 5v2.5l1 2H2l1-2V7a5 5 0 0 1 5-5z" strokeLinejoin="round" />
              <path d="M6.5 13.5a1.5 1.5 0 0 0 3 0" strokeLinecap="round" />
            </svg>
            <span className="topbar-badge">3</span>
          </button>
          {notifOpen && (
            <div className="topbar-dropdown">
              <div className="topbar-dropdown-header">Notifications</div>
              <div className="topbar-notif-item topbar-notif-warn">
                <span className="notif-dot warn" />
                <div>
                  <div className="notif-title">3 requirements flagged</div>
                  <div className="notif-sub">Missing acceptance criteria</div>
                </div>
              </div>
              <div className="topbar-notif-item">
                <span className="notif-dot info" />
                <div>
                  <div className="notif-title">RFP analysis complete</div>
                  <div className="notif-sub">2 minutes ago</div>
                </div>
              </div>
              <div className="topbar-notif-item">
                <span className="notif-dot success" />
                <div>
                  <div className="notif-title">Timeline updated</div>
                  <div className="notif-sub">Phase 2 dates confirmed</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="topbar-icon-btn" title="Help" aria-label="Help">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="6.5" />
            <path d="M6 6.5a2 2 0 1 1 2.5 1.9C8 8.8 8 9.5 8 10" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="8" cy="12" r="0.5" fill="currentColor" stroke="none" />
          </svg>
        </button>

        <div className="topbar-divider" />

        <div className="topbar-notif-wrap" ref={userRef}>
          <div
            className={`topbar-user${userOpen ? ' active' : ''}`}
            title={userName}
            onClick={() => setUserOpen((v) => !v)}
          >
            <span className="topbar-avatar">{initials}</span>
          </div>
          {userOpen && (
            <div className="topbar-dropdown topbar-user-dropdown">
              <div className="topbar-user-header">
                <span className="topbar-avatar topbar-avatar-lg">{initials}</span>
                <div>
                  <div className="topbar-user-name">{userName}</div>
                  <div className="topbar-user-role">Buyer</div>
                </div>
              </div>
              <div className="topbar-menu-sep" />
              <button className="topbar-menu-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="5.5" r="2.5" />
                  <path d="M2 13.5c0-3 2.7-5 6-5s6 2 6 5" strokeLinecap="round" />
                </svg>
                Profile
              </button>
              <button className="topbar-menu-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="2.5" />
                  <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" strokeLinecap="round" />
                </svg>
                Preferences
              </button>
              <div className="topbar-menu-sep" />
              <div className="topbar-theme-section">
                <div className="topbar-theme-label">Theme</div>
                <div className="topbar-theme-swatches">
                  {THEMES.map((t) => (
                    <button
                      key={t.key}
                      className={`topbar-theme-swatch${theme === t.key ? ' active' : ''}`}
                      title={t.label}
                      onClick={() => setThemeState(t.key)}
                      style={{ '--swatch-topbar': t.topbar, '--swatch-canvas': t.canvas, '--swatch-accent': t.accent } as React.CSSProperties}
                    >
                      <span className="topbar-theme-swatch-preview" />
                      <span className="topbar-theme-swatch-name">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="topbar-menu-sep" />
              <div className="topbar-menu-footer">
                <button className="topbar-menu-item topbar-menu-item-link">Report a problem</button>
                <span className="topbar-menu-version">v6.1.391</span>
              </div>
              <div className="topbar-menu-sep" />
              <button className="topbar-menu-item topbar-menu-item-danger">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" strokeLinecap="round" />
                  <path d="M10 11l3-3-3-3M13 8H6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
