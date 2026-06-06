import type { FileContent, FileView, ViewTab } from '../types'
import { FileBoxHeader } from './FileBoxHeader'

interface PageHeaderProps {
  title: string
  subtitle?: string
  segment?: string
  showSearch?: boolean
  activeTab: ViewTab
  selectedFile: string | null
  fileContent: FileContent | null
  fileView: FileView
  onSetFileView: (v: FileView) => void
  hasReturnPath?: boolean
  onClose?: () => void
}

export function PageHeader({
  title,
  subtitle,
  segment,
  showSearch = false,
  activeTab,
  selectedFile,
  fileContent,
  fileView,
  onSetFileView,
  hasReturnPath,
  onClose,
}: PageHeaderProps) {
  let titleArea: React.ReactNode

  if (subtitle) {
    const displayTitle = segment ? `${title} / ${segment}` : title
    titleArea = (
      <div className="breadcrumb-title-block">
        <span className="breadcrumb-file">{displayTitle}</span>
        <span className="breadcrumb-subtitle">{subtitle}</span>
      </div>
    )
  } else if (segment) {
    titleArea = (
      <>
        <span className="breadcrumb-file">{title}</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-file">{segment}</span>
      </>
    )
  } else {
    titleArea = <span className="breadcrumb-file">{title}</span>
  }

  return (
    <nav className="breadcrumb">
      {titleArea}
      {showSearch && (
        <div className="breadcrumb-search">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="breadcrumb-search-icon">
            <circle cx="6.5" cy="6.5" r="4.5" />
            <path d="M10.5 10.5L14 14" strokeLinecap="round" />
          </svg>
          <input className="breadcrumb-search-input" type="text" placeholder="Search" aria-label="Search" />
        </div>
      )}
      <FileBoxHeader
        activeTab={activeTab}
        selectedFile={selectedFile}
        fileContent={fileContent}
        fileView={fileView}
        onSetFileView={onSetFileView}
        hasReturnPath={hasReturnPath}
        onClose={onClose}
      />
    </nav>
  )
}
