import './FileTree.css'
import { useState } from 'react'
import type { FileInfo } from '../types'

interface Props {
  files: FileInfo[]
  selectedFile: string | null
  onSelectFile: (filename: string) => void
  onSelectRoot?: () => void
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="tree-chevron">
      <path d="M4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="tree-chevron">
      <path d="M6.427 4.427l3.396 3.396a.25.25 0 0 1 0 .354l-3.396 3.396A.25.25 0 0 1 6 11.396V4.604a.25.25 0 0 1 .427-.177Z" />
    </svg>
  )
}

function FolderOpenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="folder-icon">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <line x1="3" y1="11" x2="21" y2="11" />
    </svg>
  )
}

function FolderClosedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="folder-icon">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="file-icon">
      <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 10 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z" />
    </svg>
  )
}

export function FileTree({ files, selectedFile, onSelectFile, onSelectRoot }: Props) {
  const [open, setOpen] = useState(true)

  return (
    <div className="file-tree">
      <div
        className="tree-row tree-folder-row"
        onClick={() => {
          setOpen((o) => !o)
          onSelectRoot?.()
        }}
      >
        <span className="tree-indent" style={{ width: 8 }} />
        {open ? <ChevronDown /> : <ChevronRight />}
        {open ? <FolderOpenIcon /> : <FolderClosedIcon />}
        <span className="tree-label">RFP</span>
      </div>
      {open && files.map((file) => (
        <button
          key={file.name}
          className={`tree-row tree-file-row${selectedFile === file.name ? ' active' : ''}`}
          onClick={() => onSelectFile(file.name)}
          title={file.name}
        >
          <span className="tree-indent" style={{ width: 32 }} />
          <FileIcon />
          <span className="tree-label">{file.name}</span>
        </button>
      ))}
    </div>
  )
}
