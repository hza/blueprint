import './Sidebar.css'
import { FileTree } from './FileTree'
import { RepoIcon } from './Icons'
import type { FileInfo } from '../types'

interface SidebarProps {
  files: FileInfo[]
  selectedFile: string | null
  error: string | null
  onSelectFile: (filename: string) => void
  onSelectRoot: () => void
  width?: number
}

export function Sidebar({ files, selectedFile, error, onSelectFile, onSelectRoot, width }: SidebarProps) {
  return (
    <aside className="sidebar" style={width !== undefined ? { width } : undefined}>
      <div className="sidebar-header">
        <RepoIcon />
        <span className="sidebar-folder">RFP Documentation</span>
      </div>
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
    </aside>
  )
}
