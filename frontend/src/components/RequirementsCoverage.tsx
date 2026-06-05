import { useEffect, useMemo, useRef, useState } from 'react'
import type { FRItem, RequirementsSummary } from '../types'
import './fl.css'

const MAX_DOMAIN_ROWS = 7

function domainColor(title: string): { background: string; color: string } {
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) >>> 0
  }
  const hue = hash % 360
  return { background: `hsl(${hue}, 60%, 88%)`, color: `hsl(${hue}, 60%, 28%)` }
}

type MatrixSortKey = 'id' | 'domain' | 'requirement' | 'status'

export function RequirementsCoverage({
  subsection,
  summary,
  items = [],
  selectedItemId: selectedItemIdProp,
  initialScrollTop = 0,
  onScrollTopChange,
  onSelectItem,
  onOpenSource,
}: {
  subsection?: string
  summary?: RequirementsSummary | null
  items?: FRItem[]
  selectedItemId?: string | null
  initialScrollTop?: number
  onScrollTopChange?: (top: number) => void
  onSelectItem?: (item: FRItem) => void
  onOpenSource?: (item: FRItem) => void
}) {
  const show = (id: string) => !subsection || subsection === id.split('.')[0] || subsection === id
const [showAllDomains, setShowAllDomains] = useState(false)
  const [gapRiskDomains, setGapRiskDomains] = useState<string[]>([])
  const [gapRiskLabel, setGapRiskLabel] = useState('')
  const [matrixFilter, setMatrixFilter] = useState('')
  const [matrixDomain, setMatrixDomain] = useState('')
  const [matrixStatus, setMatrixStatus] = useState('')
  const [matrixSortKey, setMatrixSortKey] = useState<MatrixSortKey>('id')
  const [matrixSortDir, setMatrixSortDir] = useState<'asc' | 'desc'>('asc')

  const [buyerResponses, setBuyerResponses] = useState<Record<string, { option: string; comment: string }>>(() => {
    try { return JSON.parse(localStorage.getItem('buyer-gap-responses') ?? '{}') } catch { return {} }
  })
  const setBuyerResponse = (id: string, field: 'option' | 'comment', value: string) => {
    setBuyerResponses(prev => {
      const next = { ...prev, [id]: { ...prev[id], [field]: value } }
      localStorage.setItem('buyer-gap-responses', JSON.stringify(next))
      return next
    })
  }
  const [selectedItemId, setSelectedItemId] = useState<string | null>(selectedItemIdProp ?? null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const restoredRef = useRef(false)

  useEffect(() => {
    if (restoredRef.current || !scrollRef.current) return
    scrollRef.current.scrollTop = initialScrollTop
    restoredRef.current = true
  }, [initialScrollTop])

  const matrixDomains = useMemo(
    () => ['', ...Array.from(new Set(items.map((i) => i.domain))).sort()],
    [items],
  )

  const matrixFiltered = useMemo(() => {
    const lc = matrixFilter.toLowerCase()
    return items.filter((item) => {
      if (matrixDomain && item.domain !== matrixDomain) return false
      if (matrixStatus && (item.status ?? 'met') !== matrixStatus) return false
      if (lc && !item.id.toLowerCase().includes(lc) && !item.requirement.toLowerCase().includes(lc)) return false
      return true
    })
  }, [items, matrixFilter, matrixDomain, matrixStatus])

  const matrixSorted = useMemo(() => {
    return [...matrixFiltered].sort((a, b) => {
      const statusRank = (s: string | undefined) => s === 'gap' ? 0 : s === 'risky' ? 1 : 2
      const av = matrixSortKey === 'status' ? statusRank(a.status) : a[matrixSortKey] ?? ''
      const bv = matrixSortKey === 'status' ? statusRank(b.status) : b[matrixSortKey] ?? ''
      const cmp = av < bv ? -1 : av > bv ? 1 : 0
      return matrixSortDir === 'asc' ? cmp : -cmp
    })
  }, [matrixFiltered, matrixSortKey, matrixSortDir])

  function handleMatrixSort(key: MatrixSortKey) {
    if (matrixSortKey === key) {
      setMatrixSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setMatrixSortKey(key)
      setMatrixSortDir('asc')
    }
  }

  function sortIcon(key: MatrixSortKey) {
    if (matrixSortKey !== key) return <span style={{ opacity: 0.35, marginLeft: '0.2em' }}>⇅</span>
    return <span style={{ marginLeft: '0.2em' }}>{matrixSortDir === 'asc' ? '↑' : '↓'}</span>
  }

  function statusBadge(status: string | undefined) {
    const s = status ?? 'met'
    if (s === 'gap') return <span className="overview-badge overview-badge--danger">Gap</span>
    if (s === 'risky') return <span className="overview-badge overview-badge--warn">Risk</span>
    return <span className="overview-badge overview-badge--ok">Met</span>
  }

  return (
    <div className="overview" ref={scrollRef} onScroll={(e) => onScrollTopChange?.(e.currentTarget.scrollTop)}>
      <div className="overview-banner">
        <div className="overview-banner-stats">
          <div className="overview-stat">
            <span className="overview-stat-label">Total Requirements</span>
            <span className="overview-stat-value">{summary?.total ?? '—'}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Fully Met</span>
            <span className="overview-stat-value overview-stat-score--ok">{summary?.met ?? '—'}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Risk</span>
            <span className="overview-stat-value overview-stat-score--warn">{summary?.risky ?? '—'}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Not Met</span>
            <span className="overview-stat-value overview-val--danger">{summary?.gaps ?? '—'}</span>
          </div>
          <div className="overview-stat">
            <span className="overview-stat-label">Coverage</span>
            <span className="overview-stat-value overview-stat-score--ok">
              {summary != null ? `${summary.coverage_pct}%` : '—'}
            </span>
          </div>
        </div>
      </div>

      {show('2.1') && (<>
      <div className="rfp-section-heading" id="2.1">Requirements Summary</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">📋</span>
            Requirements by Domain — Prioritized by coverage gaps and delivery risk
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Total</th>
                <th>Met</th>
                <th>Risk</th>
                <th>Gap</th>
              </tr>
            </thead>
            <tbody>
              {!summary ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--color-muted)' }}>Loading…</td></tr>
              ) : (() => {
                const MAX_ROWS = MAX_DOMAIN_ROWS
                const sorted = [...summary.domains].sort((a, b) =>
                  b.gap !== a.gap ? b.gap - a.gap : b.risky - a.risky
                )
                const shown = sorted.slice(0, MAX_ROWS)
                const rest = sorted.slice(MAX_ROWS)
                const other = rest.length > 0 ? rest.reduce(
                  (acc, d) => ({ domain: 'Other', total: acc.total + d.total, met: acc.met + d.met, risky: acc.risky + d.risky, gap: acc.gap + d.gap }),
                  { domain: 'Other', total: 0, met: 0, risky: 0, gap: 0 }
                ) : null
                const rows = showAllDomains ? sorted : [...shown, ...(other ? [other] : [])]
                return rows.map((d) => (
                  <tr key={d.domain}>
                    <td className="overview-table-label">{d.domain === 'Other'
                      ? <span
                          style={{ color: 'var(--color-muted)', cursor: 'pointer', textDecoration: 'underline dotted' }}
                          onClick={() => setShowAllDomains(true)}
                        >Other ({rest.length} domains) ▸</span>
                      : d.domain}</td>
                    <td>{d.total}</td>
                    <td>{d.met}</td>
                    <td>
                      {d.risky > 0
                        ? <span
                            className="overview-badge overview-badge--warn"
                            style={{ cursor: 'pointer' }}
                            title={`Show risks for ${d.domain}`}
                            onClick={() => {
                              const domains = d.domain === 'Other' ? rest.map(r => r.domain) : [d.domain]
                              const label = d.domain === 'Other' ? `Other (${rest.length} domains)` : d.domain
                              const isActive = gapRiskLabel === label
                              setGapRiskDomains(isActive ? [] : domains)
                              setGapRiskLabel(isActive ? '' : label)
                              if (!isActive) document.getElementById('gaps-risks-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                            }}
                          >{d.risky}</span>
                        : 0}
                    </td>
                    <td>
                      {d.gap > 0
                        ? <span
                            className="overview-badge overview-badge--danger"
                            style={{ cursor: 'pointer' }}
                            title={`Show gaps for ${d.domain}`}
                            onClick={() => {
                              const domains = d.domain === 'Other' ? rest.map(r => r.domain) : [d.domain]
                              const label = d.domain === 'Other' ? `Other (${rest.length} domains)` : d.domain
                              const isActive = gapRiskLabel === label
                              setGapRiskDomains(isActive ? [] : domains)
                              setGapRiskLabel(isActive ? '' : label)
                              if (!isActive) document.getElementById('gaps-risks-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                            }}
                          >{d.gap}</span>
                        : 0}
                    </td>
                  </tr>
                ))
              })()}
              {summary && showAllDomains && summary.domains.length > MAX_DOMAIN_ROWS && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '0.25rem 0' }}>
                    <span
                      style={{ color: 'var(--color-muted)', cursor: 'pointer', textDecoration: 'underline dotted', fontSize: '0.85em' }}
                      onClick={() => setShowAllDomains(false)}
                    >▴ Show less</span>
                  </td>
                </tr>
              )}
              {summary && (
                <tr>
                  <td className="overview-table-label overview-val--strong">Total</td>
                  <td><strong>{summary.total}</strong></td>
                  <td><strong>{summary.met}</strong></td>
                  <td><strong>{summary.risky}</strong></td>
                  <td><strong>{summary.gaps}</strong></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="overview-card" id="gaps-risks-card">
          <div className="overview-card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>
              <span className="overview-card-icon">!</span>
              Requirement Gaps &amp; Risks — Action Required
            </span>
            {gapRiskLabel && (
              <button
                type="button"
                onClick={() => { setGapRiskDomains([]); setGapRiskLabel('') }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.3em', background: 'var(--color-warn-bg, #fff3cd)', color: 'var(--color-warn, #856404)', border: 'none', borderRadius: '3px', padding: '0.1em 0.5em', fontWeight: 500, fontSize: '11px', cursor: 'pointer' }}
                title="Clear domain filter"
              >
                {gapRiskLabel} <span style={{ opacity: 0.6 }}>✕</span>
              </button>
            )}
          </div>
          {!summary ? (
            <p style={{ color: 'var(--color-muted)', padding: '0.5rem 0' }}>Loading…</p>
          ) : (() => {
            const gapItems = gapRiskDomains.length ? summary.gap_items.filter(i => gapRiskDomains.includes(i.domain)) : summary.gap_items
            const riskyItems = gapRiskDomains.length ? summary.risky_items.filter(i => gapRiskDomains.includes(i.domain)) : summary.risky_items
            return (
              <ul className="overview-risk-list">
                {[...gapItems.map(i => ({ ...i, kind: 'gap' as const })), ...riskyItems.map(i => ({ ...i, kind: 'risk' as const }))].map((item) => {
                  const resp = buyerResponses[item.id] ?? { option: '', comment: '' }
                  const preparedOptions = item.options ? item.options.split('|') : []
                  const isGap = item.kind === 'gap'
                  const accentColor = isGap ? 'var(--color-danger, #c0392b)' : 'var(--color-warn, #856404)'
                  const sourceItem = items.find(i => i.id === item.id)
                  const refLabel = sourceItem?.references?.split(';').map(s => s.trim()).filter(Boolean)[0] ?? null
                  return (
                    <li key={item.id} className={`overview-risk ${isGap ? 'overview-risk--high' : 'overview-risk--med'}`}>
                      <span className="overview-risk-level">{isGap ? 'GAP' : 'RISK'}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5em', flexWrap: 'wrap' }}>
                          <strong>{item.id} — {item.requirement}</strong>
                          {sourceItem && (
                            <button
                              type="button"
                              onClick={() => onOpenSource?.(sourceItem)}
                              title="Open source document"
                              style={{ fontSize: '11px', fontWeight: 500, color: accentColor, background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline dotted', whiteSpace: 'nowrap' }}
                            >
                              {refLabel ?? 'View source'}
                            </button>
                          )}
                        </div>
                        {item.description && <div style={{ marginTop: '0.15em', opacity: 0.85 }}>{item.description}</div>}
                        <div style={{ marginTop: '0.6em', borderTop: '1px solid var(--color-border, #e0e0e0)', paddingTop: '0.5em' }}>
                          <div style={{ fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: accentColor, marginBottom: '0.4em' }}>Your decision</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25em' }}>
                            {preparedOptions.map((opt) => (
                              <label key={opt} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5em', cursor: 'pointer', fontSize: '12px' }}>
                                <input
                                  type="radio"
                                  name={`resp-${item.id}`}
                                  value={opt}
                                  checked={resp.option === opt}
                                  onChange={() => setBuyerResponse(item.id, 'option', opt)}
                                  style={{ marginTop: '2px', accentColor }}
                                />
                                {opt}
                              </label>
                            ))}
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5em', cursor: 'pointer', fontSize: '12px', fontStyle: 'italic' }}>
                              <input
                                type="radio"
                                name={`resp-${item.id}`}
                                value="__custom__"
                                checked={resp.option === '__custom__'}
                                onChange={() => setBuyerResponse(item.id, 'option', '__custom__')}
                                style={{ marginTop: '2px', accentColor }}
                              />
                              I'll define my own terms
                            </label>
                          </div>
                          <textarea
                            className="fl-comment-textarea"
                            placeholder="Add your comment or position…"
                            value={resp.comment}
                            onChange={(e) => setBuyerResponse(item.id, 'comment', e.target.value)}
                            rows={2}
                            style={{ border: `1px solid ${resp.option === '__custom__' ? accentColor : 'var(--border)'}` }}
                          />
                        </div>
                      </div>
                    </li>
                  )
                })}
                {gapItems.length === 0 && riskyItems.length === 0 && (
                  <li style={{ color: 'var(--color-muted)' }}>
                    {gapRiskLabel ? `No gaps or risks for "${gapRiskLabel}".` : 'No gaps or risks identified.'}
                  </li>
                )}
              </ul>
            )
          })()}
        </div>
      </div>
      </>)}

      {show('2.2') && (<>
      {/* 2.2 Coverage & Compliance Matrix */}
      <div className="rfp-section-heading" id="2.2">Coverage &amp; Compliance Matrix</div>
      <div className="overview-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">✓</span>
            Requirements Compliance Matrix — Detailed view of coverage status
          </div>
          <div className="fl-toolbar" style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', marginBottom: '0' }}>
            <input
              className="fl-filter-input"
              type="search"
              placeholder="Filter requirements…"
              value={matrixFilter}
              onChange={(e) => setMatrixFilter(e.target.value)}
            />
            <div className="fl-select-wrap">
              <select
                className="fl-cat-select"
                value={matrixDomain}
                onChange={(e) => setMatrixDomain(e.target.value)}
              >
                {matrixDomains.map((d) => (
                  <option key={d} value={d}>{d || 'All domains'}</option>
                ))}
              </select>
              {matrixDomain && <button className="fl-select-clear" onClick={() => setMatrixDomain('')} title="Clear">×</button>}
            </div>
            <div className="fl-select-wrap">
              <select
                className="fl-cat-select"
                value={matrixStatus}
                onChange={(e) => setMatrixStatus(e.target.value)}
              >
                <option value="">All statuses</option>
                <option value="met">Met</option>
                <option value="risky">Risk</option>
                <option value="gap">Gap</option>
              </select>
              {matrixStatus && <button className="fl-select-clear" onClick={() => setMatrixStatus('')} title="Clear">×</button>}
            </div>
            <span className="fl-count">
              {matrixSorted.length} / {items.length} requirements
            </span>
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                {([['id', 'Req ID'], ['domain', 'Domain'], ['requirement', 'Requirement'], ['status', 'Status']] as [MatrixSortKey, string][]).map(([key, label]) => (
                  <th key={key} onClick={() => handleMatrixSort(key)} style={{ cursor: 'pointer', userSelect: 'none' }}>
                    {label}{sortIcon(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--color-muted)' }}>Loading…</td></tr>
              ) : matrixSorted.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--color-muted)' }}>No matching requirements</td></tr>
              ) : matrixSorted.map((item) => (
                <tr
                  key={item.id}
                  className={[
                    'fl-row',
                    onSelectItem ? 'fl-row-clickable' : '',
                    selectedItemId === item.id ? 'fl-row-selected' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => { setSelectedItemId(item.id); onSelectItem?.(item) }}
                  onDoubleClick={() => onOpenSource?.(item)}
                >
                  <td style={{ whiteSpace: 'nowrap' }}>{item.id}</td>
                  <td>
                    <button
                      type="button"
                      style={{ ...domainColor(item.domain), border: 'none', borderRadius: '3px', padding: '0.15rem 0.4rem', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 500 }}
                      onClick={() => setMatrixDomain(matrixDomain === item.domain ? '' : item.domain)}
                      title={`Filter by ${item.domain}`}
                    >
                      {item.domain}
                    </button>
                  </td>
                  <td>{item.requirement}</td>
                  <td>{statusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>)}

    </div>
  )
}
