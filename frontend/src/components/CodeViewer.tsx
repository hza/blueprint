import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { FileContent, FRAnnotation, FRAnnotations } from '../types'
import './CodeViewer.css'

interface Props {
  file: FileContent
  frAnnotations?: FRAnnotations
  onSelectFR?: (id: string, e: React.MouseEvent) => void
}

interface Tooltip {
  top: number
  left: number
  frs: FRAnnotation[]
}

export function CodeViewer({ file, frAnnotations = {}, onSelectFR }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const [hash, setHash] = useState(window.location.hash)
  const [tooltip, setTooltip] = useState<Tooltip | null>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const suppressScrollRef = useRef(false)

  useEffect(() => {
    setHash(location.hash)
  }, [location.hash])

  const highlightedLine = (() => {
    const m = hash.match(/^#L(\d+)$/)
    return m ? parseInt(m[1], 10) : null
  })()

  useEffect(() => {
    if (suppressScrollRef.current) {
      suppressScrollRef.current = false
      return
    }
    if (highlightedLine && containerRef.current) {
      const el = containerRef.current.querySelector<HTMLTableRowElement>(`#L${highlightedLine}`)
      el?.scrollIntoView({ block: 'center', behavior: 'auto' })
    }
  }, [highlightedLine, file.name])

  const cancelHide = () => {
    if (hideTimerRef.current !== null) {
      clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }
  }

  const scheduleHide = () => {
    cancelHide()
    hideTimerRef.current = setTimeout(() => setTooltip(null), 120)
  }

  const showTooltip = (e: React.MouseEvent<HTMLTableCellElement>, frs: FRAnnotation[]) => {
    cancelHide()
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({ top: rect.top, left: rect.right + 10, frs })
  }

  return (
    <>
      <div className="code-content" ref={containerRef}>
        <table className="code-table">
          <tbody>
            {file.lines.map((line, i) => {
              const lineNum = i + 1
              const highlighted = lineNum === highlightedLine
              const frs = frAnnotations[lineNum]
              return (
                <tr key={lineNum} id={`L${lineNum}`} className={highlighted ? 'highlighted' : ''}>
                  <td className="line-number">
                    <a
                      href={`#L${lineNum}`}
                      onClick={(e) => {
                        e.preventDefault()
                        window.location.hash = `L${lineNum}`
                      }}
                    >
                      {lineNum}
                    </a>
                  </td>
                  <td
                    className={`fr-gutter${frs ? ' has-fr' : ''}`}
                    onMouseEnter={frs ? (e) => showTooltip(e, frs) : undefined}
                    onMouseLeave={frs ? scheduleHide : undefined}
                  >
                    {frs && (
                      <span
                        className="fr-indicator"
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                          setTooltip(null)
                          suppressScrollRef.current = true
                          history.replaceState(null, '', `#L${lineNum}`)
                          setHash(`#L${lineNum}`)
                          onSelectFR?.(frs[0].id, e)
                        }}
                      >
                        📋
                      </span>
                    )}
                  </td>
                  <td className="line-content">
                    <span>{line === '' ? '\u00a0' : line}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {tooltip && (
        <div
          className="fr-tooltip"
          style={{ top: tooltip.top, left: tooltip.left }}
          onMouseEnter={cancelHide}
          onMouseLeave={scheduleHide}
        >
          {tooltip.frs.map((fr) => (
            <div key={fr.id} className="fr-tooltip-item">
              <div className="fr-tooltip-header">
                <button
                  className="fr-tooltip-id fr-tooltip-id-link"
                  type="button"
                    onClick={(e) => { setTooltip(null); onSelectFR?.(fr.id, e) }}
                >
                  {fr.id}
                </button>
                <span className="fr-tooltip-category">{fr.domain}</span>
              </div>
              <p className="fr-tooltip-req">{fr.requirement}</p>
              {fr.original_text && (
                <p className="fr-tooltip-original">{fr.original_text}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

