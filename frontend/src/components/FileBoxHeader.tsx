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
          className="icon-btn icon-btn-no-bg"
          title="Close"
          onClick={onClose}
          style={{ position: 'relative', left: 16 }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" style={{ width: 14, height: 14 }}>
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </svg>
        </button>
      )}
    </div>
  )
}
