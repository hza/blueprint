import { EyeIcon, SourceIcon } from './Icons'
import type { FileContent, FileView, ViewTab } from '../types'

interface FileBoxHeaderProps {
  activeTab: ViewTab
  selectedFile: string | null
  fileContent: FileContent | null
  fileView: FileView
  onSetFileView: (v: FileView) => void
  hasReturnPath?: boolean
  onClose?: () => void
}

export function FileBoxHeader({
  activeTab,
  selectedFile,
  fileContent,
  fileView,
  onSetFileView,
  hasReturnPath,
  onClose,
}: FileBoxHeaderProps) {
  if (!fileContent || !selectedFile || !(activeTab === 'code' || activeTab === 'qa' || activeTab === 'requirements')) {
    return null
  }
  return (
    <div className="breadcrumb-actions">
      <div className="file-view-toggle">
        <button
          className={`icon-btn${fileView === 'source' ? ' active' : ''}`}
          title="Source"
          onClick={() => onSetFileView('source')}
        >
          <SourceIcon />
          <span>Source</span>
        </button>
        <button
          className={`icon-btn${fileView === 'preview' ? ' active' : ''}`}
          title="Preview"
          onClick={() => onSetFileView('preview')}
        >
          <EyeIcon />
          <span>Preview</span>
        </button>
      </div>
      {onClose && hasReturnPath && (
        <button
          className="icon-btn icon-btn-close"
          title="Back"
          onClick={onClose}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" style={{ width: 14, height: 14 }}>
            <polyline points="10,3 4,8 10,13" />
          </svg>
        </button>
      )}
    </div>
  )
}
