import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchFile, fetchFiles, fetchFR, fetchFL, fetchRequirementsSummary } from './api'
import { CodeViewer } from './components/CodeViewer'
import { EmptyState } from './components/EmptyState'
import { FileBoxHeader } from './components/FileBoxHeader'
import { FLTable } from './components/FLTable'
import { PreviewRenderer } from './components/PreviewRenderer'
import { BusinessAnalytics } from './components/BusinessAnalytics'
import { TechnicalSolution } from './components/TechnicalSolution'
import { CostOfOwnership } from './components/CostOfOwnership'
import { Timeline } from './components/Timeline'
import { Team } from './components/Team'
import { UXDesign } from './components/UXDesign'
import { Overview } from './components/Overview'
import { SecurityCompliance } from './components/SecurityCompliance'
import { DeliveryGovernance } from './components/DeliveryGovernance'
import { PricingCommercials } from './components/PricingCommercials'
import { ProofCredibility } from './components/ProofCredibility'
import { ExecutiveOverview } from './components/ExecutiveOverview'
import { RequirementsCoverage } from './components/RequirementsCoverage'
import { SolutionArchitecture } from './components/SolutionArchitecture'
import { RightPanel } from './components/RightPanel'
import { Sidebar, NAV_SECTIONS } from './components/Sidebar'
import type { FileContent, FileView, FileInfo, FRAnnotations, FRItem, RequirementsSummary, ViewTab } from './types'

const SIDEBAR_MIN = 160
const SIDEBAR_MAX = 600
const SIDEBAR_DEFAULT = 290
const RIGHT_PANEL_MIN = 220
const RIGHT_PANEL_MAX = 700
const RIGHT_PANEL_DEFAULT = 320

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [files, setFiles] = useState<FileInfo[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState<FileContent | null>(null)
  const [frAnnotations, setFrAnnotations] = useState<FRAnnotations>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedListItemId, setSelectedListItemId] = useState<string | null>(null)
  const [fileView, setFileView] = useState<FileView>('source')
  const outlineReturnPath = useRef<string | null>(null)
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [draggingSidebar, setDraggingSidebar] = useState(false)
  const [rightPanelWidth, setRightPanelWidth] = useState(RIGHT_PANEL_DEFAULT)
  const [draggingRightPanel, setDraggingRightPanel] = useState(false)
  const [flItems, setFlItems] = useState<FRItem[]>([])
  const [reqSummary, setReqSummary] = useState<RequirementsSummary | null>(null)
  const [rightPanelItem, setRightPanelItem] = useState<FRItem | null>(null)
  const [domainFilter, setDomainFilter] = useState('')
  const [requirementEdits, setRequirementEdits] = useState<Record<string, string>>({})
  const [activeSection, setActiveSection] = useState<string | null>(() => {
    const path = window.location.pathname
    for (const section of NAV_SECTIONS) {
      for (const sub of section.subsections) {
        if (path === sub.path) return sub.id
      }
      if (path === section.path) return section.id
    }
    return '1'
  })
  const flScrollTopRef = useRef(0)
  const rcScrollTopRef = useRef(0)
  const sidebarDragRef = useRef<{ x: number; width: number } | null>(null)
  const rightPanelDragRef = useRef<{ x: number; width: number } | null>(null)

  const handleRightPanelResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setDraggingRightPanel(true)
    rightPanelDragRef.current = { x: e.clientX, width: rightPanelWidth }
    const onMove = (ev: MouseEvent) => {
      if (!rightPanelDragRef.current) return
      const delta = rightPanelDragRef.current.x - ev.clientX
      setRightPanelWidth(
        Math.min(RIGHT_PANEL_MAX, Math.max(RIGHT_PANEL_MIN, rightPanelDragRef.current.width + delta))
      )
    }
    const onUp = () => {
      rightPanelDragRef.current = null
      setDraggingRightPanel(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const handleSidebarResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setDraggingSidebar(true)
    sidebarDragRef.current = { x: e.clientX, width: sidebarWidth }
    const onMove = (ev: MouseEvent) => {
      if (!sidebarDragRef.current) return
      const delta = ev.clientX - sidebarDragRef.current.x
      setSidebarWidth(
        Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, sidebarDragRef.current.width + delta))
      )
    }
    const onUp = () => {
      sidebarDragRef.current = null
      setDraggingSidebar(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }


  const p = location.pathname
  const activeTab: ViewTab =
    p === '/requirements' ? 'requirements' :
    p === '/overview' ? 'overview' :
    p === '/qa' ? 'qa' :
    p === '/analytics' ? 'analytics' :
    p === '/technical' ? 'technical' :
    p === '/cost' ? 'cost' :
    p === '/timeline' ? 'timeline' :
    p === '/team' ? 'team' :
    p === '/uxdesign' ? 'uxdesign' :
    p === '/security' || p.startsWith('/security-compliance') ? 'security' :
    p === '/delivery' || p.startsWith('/delivery-governance') ? 'delivery' :
    p === '/pricing' || p.startsWith('/pricing-commercials') ? 'pricing' :
    p === '/proof' || p.startsWith('/proof-credibility') ? 'proof' :
    p.startsWith('/executive-overview') ? 'executive-overview' :
    p.startsWith('/requirements-coverage') ? 'requirements-coverage' :
    p.startsWith('/solution-architecture') ? 'solution-architecture' :
    'requirements'

  useEffect(() => {
    if (location.pathname === '/fl') {
      navigate(`/list${location.search}${location.hash}`, { replace: true })
      return
    }
    const knownPrefixes = ['/requirements', '/overview', '/qa', '/analytics', '/technical', '/cost', '/timeline', '/team', '/uxdesign', '/security', '/delivery', '/pricing', '/proof', '/executive-overview', '/requirements-coverage', '/solution-architecture', '/security-compliance', '/delivery-governance', '/pricing-commercials', '/proof-credibility']
    if (!knownPrefixes.some((prefix) => location.pathname === prefix || location.pathname.startsWith(prefix + '/'))) {
      navigate('/requirements', { replace: true })
    }
  }, [location.pathname, location.search, location.hash, navigate])

  useEffect(() => {
    fetchFiles()
      .then(setFiles)
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : 'Failed to load files'),
      )
  }, [])

  useEffect(() => {
    fetchFL().then(setFlItems).catch(() => {})
  }, [])

  useEffect(() => {
    fetchRequirementsSummary().then(setReqSummary).catch(() => {})
  }, [])


  const openFile = (
    filename: string,
    line?: number,
    options?: { preserveCurrentTab?: boolean },
  ) => {
    const fileViewingTabs = new Set<ViewTab>(['requirements', 'qa'])
    const targetPath = options?.preserveCurrentTab && fileViewingTabs.has(activeTab) ? `/${activeTab}` : '/requirements'
    const fileChanged = filename !== selectedFile
    setSelectedFile(filename)
    navigate({ pathname: targetPath, hash: line ? `#L${line}` : '' })
    setLoading(true)
    setError(null)
    if (fileChanged) setFrAnnotations({})
    fetchFile(filename)
      .then((data) => {
        setFileContent(data)
        setLoading(false)
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : 'Failed to load file')
        setLoading(false)
      })
    fetchFR(filename).then(setFrAnnotations).catch(() => {})
  }

  const openFRSource = (item: FRItem, preferredIndex?: number) => {
    const refFiles = item.references
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean)
    if (!refFiles.length) return

    const refLines = item.line.split(';').map((s) => s.trim())

    const pickFilename = (p: string) => { const parts = p.trim().split('/'); return parts[parts.length - 1] || p.trim() }
    const pickFirstLine = (seg: string) => { const m = seg.match(/\d+/); return m ? parseInt(m[0], 10) : undefined }

    const indexForSelected = selectedFile
      ? refFiles.findIndex((f) => pickFilename(f) === selectedFile)
      : -1

    const targetIndex =
      preferredIndex !== undefined && preferredIndex >= 0 && preferredIndex < refFiles.length
        ? preferredIndex
        : indexForSelected >= 0
          ? indexForSelected
          : 0

    const targetFile = pickFilename(refFiles[targetIndex])
    const targetLine = pickFirstLine(refLines[targetIndex] ?? refLines[0] ?? '')

    if (!targetFile) return
    setSelectedListItemId(item.id)
    if (activeTab === 'requirements-coverage') outlineReturnPath.current = location.pathname
    openFile(targetFile, targetLine, { preserveCurrentTab: true })
  }

  const showListView = () => {
    setSelectedFile(null)
    setFileContent(null)
    setFrAnnotations({})
    navigate('/requirements')
  }

  return (
    <div className="app-shell">
    <div className="app-layout">
      <Sidebar
        files={files}
        selectedFile={selectedFile}
        error={error}
        onSelectFile={(filename) => openFile(filename)}
        onSelectRoot={showListView}
        width={sidebarCollapsed ? undefined : sidebarWidth}
        activeSection={activeSection}
        onSectionChange={(id, path) => {
          setActiveSection(id)
          navigate(path)
        }}
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
        reqSummaryTotal={reqSummary?.total ?? null}
      />
      {!sidebarCollapsed && (
        <div className={`sidebar-resize-handle${draggingSidebar ? ' dragging' : ''}`} onMouseDown={handleSidebarResizeMouseDown} />
      )}

      <main className="main-content">
        {activeTab === 'overview' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Overview</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <Overview />
              </div>
            </div>
          </>
        ) : activeTab === 'analytics' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Business Analytics</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <BusinessAnalytics />
              </div>
            </div>
          </>
        ) : activeTab === 'technical' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Technical Solution</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <TechnicalSolution />
              </div>
            </div>
          </>
        ) : activeTab === 'cost' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Your Investment &amp; Return</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <CostOfOwnership />
              </div>
            </div>
          </>
        ) : activeTab === 'timeline' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Timeline</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <Timeline />
              </div>
            </div>
          </>
          ) : activeTab === 'uxdesign' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">UI/UX Design</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <UXDesign />
              </div>
            </div>
          </>

        ) : activeTab === 'team' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Team</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <Team />
              </div>
            </div>
          </>
        ) : activeTab === 'security' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Security &amp; Compliance</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <SecurityCompliance subsection={activeSection ?? undefined} />
              </div>
            </div>
          </>
        ) : activeTab === 'delivery' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Delivery &amp; Governance</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <DeliveryGovernance subsection={activeSection ?? undefined} />
              </div>
            </div>
          </>
        ) : activeTab === 'pricing' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Pricing &amp; Commercials</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <PricingCommercials subsection={activeSection ?? undefined} />
              </div>
            </div>
          </>
        ) : activeTab === 'proof' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">References &amp; Track Record</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <ProofCredibility subsection={activeSection ?? undefined} />
              </div>
            </div>
          </>
        ) : activeTab === 'executive-overview' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Executive Overview</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <ExecutiveOverview subsection={activeSection ?? undefined} />
              </div>
            </div>
          </>
        ) : activeTab === 'requirements-coverage' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Requirements Coverage</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <RequirementsCoverage subsection={activeSection ?? undefined} summary={reqSummary} items={flItems} selectedItemId={selectedListItemId} initialScrollTop={rcScrollTopRef.current} onScrollTopChange={(top) => { rcScrollTopRef.current = top }} onSelectItem={(item) => { setSelectedListItemId(item.id); setRightPanelItem(item) }} onOpenSource={(item) => { setSelectedListItemId(item.id); openFRSource(item) }} />
              </div>
            </div>
          </>
        ) : activeTab === 'solution-architecture' ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Solution Architecture</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <SolutionArchitecture subsection={activeSection ?? undefined} />
              </div>
            </div>
          </>
         ) : activeTab === 'qa' && !selectedFile ? (
          <EmptyState />
        ) : activeTab === 'qa' && selectedFile ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Q&amp;A</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-file">{selectedFile}</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                {loading && (
                  <div className="loading">
                    <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Loading…
                  </div>
                )}
                {!loading && error && <div className="error-msg">{error}</div>}
                {!loading && fileContent && (
                  fileView === 'preview'
                    ? <PreviewRenderer content={fileContent.content} />
                    : fileView === 'outline'
                      ? <FLTable initialFile={selectedFile} onSelectSource={openFRSource} onSelectItem={(item) => { setSelectedListItemId(item.id); setRightPanelItem(item) }} selectedItemId={selectedListItemId} initialScrollTop={flScrollTopRef.current} onScrollTopChange={(top) => { flScrollTopRef.current = top }} />
                      : <CodeViewer file={fileContent} />
                )}
              </div>
            </div>
          </>
        ) : activeTab === 'requirements' && !selectedFile ? (
          <>
            <nav className="breadcrumb">
              <span className="breadcrumb-file">Requirements</span>
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={setFileView} />
            </nav>
            <div className="file-box">
              <div className="file-box-body">
                <FLTable
                  key={domainFilter}
                  initialFile={null}
                  onSelectSource={openFRSource}
                  onSelectItem={(item) => { setSelectedListItemId(item.id); setRightPanelItem(item) }}
                  selectedItemId={selectedListItemId}
                  initialScrollTop={flScrollTopRef.current}
                  onScrollTopChange={(top) => { flScrollTopRef.current = top }}
                  initialDomainFilter={domainFilter}
                />
              </div>
            </div>
          </>
        ) : !selectedFile ? (
          <EmptyState />
        ) : (
          <>
            <nav className="breadcrumb">
              {activeTab === 'requirements' ? (
                <>
                  <span className="breadcrumb-file">Requirements</span>
                  <span className="breadcrumb-sep">/</span>
                  <span className="breadcrumb-file">{selectedFile}</span>
                </>
              ) : (
                <span className="breadcrumb-file">{selectedFile}</span>
              )}
              <FileBoxHeader activeTab={activeTab} selectedFile={selectedFile} fileContent={fileContent} fileView={fileView} onSetFileView={(v) => {
                if (v === 'outline' && outlineReturnPath.current) {
                  const returnTo = outlineReturnPath.current
                  outlineReturnPath.current = null
                  setSelectedFile(null)
                  setFileContent(null)
                  navigate(returnTo)
                } else {
                  setFileView(v)
                }
              }} />
            </nav>

            <div className="file-box">
              <div className="file-box-body">
                <div style={{ flex: 1, overflow: 'hidden', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                  {error && <div className="error-msg">{error}</div>}
                  {!error && fileContent && (
                    fileView === 'preview'
                      ? <PreviewRenderer content={fileContent.content} />
                      : fileView === 'outline'
                        ? <FLTable initialFile={selectedFile} onSelectSource={openFRSource} onSelectItem={(item) => { setSelectedListItemId(item.id); setRightPanelItem(item) }} selectedItemId={selectedListItemId} initialScrollTop={flScrollTopRef.current} onScrollTopChange={(top) => { flScrollTopRef.current = top }} />
                        : <CodeViewer file={fileContent} frAnnotations={frAnnotations} onSelectFR={(id) => {
                          setSelectedListItemId(id)
                          const item = flItems.find((f) => f.id === id)
                          if (!item) return
                          setRightPanelItem(item)
                        }} />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      {(activeTab === 'requirements' || (activeTab === 'requirements-coverage' && activeSection === '2.2')) && <div className={`right-panel-resize-handle${draggingRightPanel ? ' dragging' : ''}`} onMouseDown={handleRightPanelResizeMouseDown} />}
      {(activeTab === 'requirements' || (activeTab === 'requirements-coverage' && activeSection === '2.2')) && <RightPanel
        item={rightPanelItem}
        width={rightPanelWidth}
        hasPrev={rightPanelItem ? flItems.findIndex((f) => f.id === rightPanelItem.id) > 0 : false}
        hasNext={rightPanelItem ? flItems.findIndex((f) => f.id === rightPanelItem.id) < flItems.length - 1 : false}
        onPrev={() => {
          if (!rightPanelItem) return
          const idx = flItems.findIndex((f) => f.id === rightPanelItem.id)
          if (idx > 0) { setRightPanelItem(flItems[idx - 1]); setSelectedListItemId(flItems[idx - 1].id) }
        }}
        onNext={() => {
          if (!rightPanelItem) return
          const idx = flItems.findIndex((f) => f.id === rightPanelItem.id)
          if (idx < flItems.length - 1) { setRightPanelItem(flItems[idx + 1]); setSelectedListItemId(flItems[idx + 1].id) }
        }}
        onClose={() => setRightPanelItem(null)}
        onOpenSource={(item, refIndex) => {
          setFileView('source')
          openFRSource(item, refIndex)
        }}
        onDomainClick={(domain) => {
          setDomainFilter(domain)
          setSelectedFile(null)
          setFileContent(null)
          setFrAnnotations({})
          navigate('/requirements')
        }}
        requirementEdits={requirementEdits}
        onRequirementEdit={(id, text) => setRequirementEdits((prev) => ({ ...prev, [id]: text }))}
        onRequirementCancel={(id) => setRequirementEdits((prev) => { const next = { ...prev }; delete next[id]; return next })}
      />}
    </div>
    </div>
  )
}
