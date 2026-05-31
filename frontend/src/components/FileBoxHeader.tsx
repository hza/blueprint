import { EyeIcon, OutlineIcon, SourceIcon } from './Icons'
import type { FileContent, FileView, ViewTab } from '../types'

interface FileBoxHeaderProps {
  activeTab: ViewTab
  selectedFile: string | null
  fileContent: FileContent | null
  fileView: FileView
  onSetFileView: (v: FileView) => void
}

export function FileBoxHeader({
  activeTab,
  selectedFile,
  fileContent,
  fileView,
  onSetFileView,
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
        <button
          className={`icon-btn${fileView === 'outline' ? ' active' : ''}`}
          title="Outline"
          onClick={() => onSetFileView('outline')}
        >
          <OutlineIcon />
          <span>Outline</span>
        </button>
      </div>
    </div>
  )
}
