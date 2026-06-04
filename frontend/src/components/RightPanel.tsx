import { useEffect, useState } from 'react'
import type { FRItem } from '../types'
import './RightPanel.css'
import './fl.css'

interface Props {
  item: FRItem | null
  width?: number
  onClose: () => void
  onOpenSource: (item: FRItem, refIndex: number) => void
  onDomainClick?: (domain: string) => void
  requirementEdits?: Record<string, string>
  onRequirementEdit?: (id: string, text: string) => void
  onRequirementCancel?: (id: string) => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
}

export function RightPanel({ item, width, onClose, onOpenSource, onDomainClick, requirementEdits, onRequirementEdit, onRequirementCancel, onPrev, onNext, hasPrev, hasNext }: Props) {
  const savedText = item ? (requirementEdits?.[item.id] ?? item.requirement) : ''
  const [draft, setDraft] = useState(savedText)

  useEffect(() => {
    setDraft(item ? (requirementEdits?.[item.id] ?? item.requirement) : '')
  }, [item?.id])

  if (!item) return null

  const refs = item.references.split(';').map((s) => s.trim()).filter(Boolean)
  const lines = item.line.split(';').map((s) => s.trim()).filter(Boolean)
  const isDirty = draft !== (requirementEdits?.[item.id] ?? item.requirement)

  const handleSave = () => {
    onRequirementEdit?.(item.id, draft)
  }

  const handleCancel = () => {
    const original = requirementEdits?.[item.id] ?? item.requirement
    setDraft(original)
    if (requirementEdits?.[item.id] !== undefined) {
      onRequirementCancel?.(item.id)
      setDraft(item.requirement)
    }
  }

  return (
    <div className="right-panel" style={width !== undefined ? { width } : undefined}>
      <div className="right-panel-header">
        <span className="right-panel-id">{item.id}</span>
        <button
          className="right-panel-domain"
          type="button"
          onClick={() => onDomainClick?.(item.domain)}
          title="Filter by domain"
        >{item.domain}</button>
        <div className="right-panel-nav-group">
          <button className="right-panel-nav" type="button" onClick={onPrev} disabled={!hasPrev} title="Previous requirement">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><line x1="10" y1="6" x2="2" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button className="right-panel-nav" type="button" onClick={onNext} disabled={!hasNext} title="Next requirement">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button className="right-panel-close" type="button" onClick={onClose} title="Close">×</button>
        </div>
      </div>

      <div className="right-panel-body">
        {item.status && (
          <section className="right-panel-section">
            <h4 className="right-panel-label">Status</h4>
            <div className="right-panel-status-row">
              <span className={`fl-status-badge fl-status-${item.status}`}>{item.status}</span>
            </div>
            {item.statusDescription && (
              <p className="right-panel-text right-panel-status-desc">{item.statusDescription}</p>
            )}
          </section>
        )}
        <section className="right-panel-section">
          <h4 className="right-panel-label">Requirement</h4>
          <textarea
            className="right-panel-requirement-edit"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          {isDirty && (
            <div className="right-panel-edit-actions">
              <button className="right-panel-save-btn" type="button" onClick={handleSave} title="Save">✓</button>
              <button className="right-panel-cancel-btn" type="button" onClick={handleCancel} title="Cancel">✕</button>
            </div>
          )}
        </section>

        {item.original_text && (
          <section className="right-panel-section">
            <h4 className="right-panel-label">Original Text</h4>
            <p className="right-panel-text right-panel-original">{item.original_text}</p>
          </section>
        )}

        {refs.length > 0 && (
          <section className="right-panel-section">
            <h4 className="right-panel-label">References</h4>
            <ul className="right-panel-refs">
              {refs.map((ref, i) => {
                const filename = ref.split('/').pop() || ref
                const line = lines[i]
                return (
                  <li key={i}>
                    <button
                      className="right-panel-ref-btn"
                      type="button"
                      onClick={() => onOpenSource(item, i)}
                    >
                      <span className="right-panel-ref-file">{filename}</span>
                      {line && <span className="right-panel-ref-line">:{line}</span>}
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
