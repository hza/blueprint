import { useEffect, useMemo, useRef, useState } from 'react'
import type { FRItem, RequirementsSummary } from '../types'
import './FLTable.css'

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
  const gapCount = summary?.gaps ?? 0
  const [showAllDomains, setShowAllDomains] = useState(false)
  const [gapRiskDomains, setGapRiskDomains] = useState<string[]>([])
  const [gapRiskLabel, setGapRiskLabel] = useState('')
  const [matrixFilter, setMatrixFilter] = useState('')
  const [matrixDomain, setMatrixDomain] = useState('')
  const [matrixStatus, setMatrixStatus] = useState('')
  const [matrixSortKey, setMatrixSortKey] = useState<MatrixSortKey>('id')
  const [matrixSortDir, setMatrixSortDir] = useState<'asc' | 'desc'>('asc')
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
        <div className="overview-banner-header">
          <div className="overview-banner-main">
            <div className="overview-banner-title">2. Requirements Coverage</div>
            <div className="overview-banner-client">Meridian Software · Customer Facing Portal — RFP</div>
          </div>
          <span className={`overview-badge ${gapCount > 0 ? 'overview-badge--danger' : 'overview-badge--ok'}`}>
            {gapCount} {gapCount === 1 ? 'GAP' : 'GAPS'}
          </span>
        </div>
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
                {gapItems.map((item) => (
                  <li key={item.id} className="overview-risk overview-risk--high">
                    <span className="overview-risk-level">GAP</span>
                    <div>
                      <strong>{item.id} — {item.requirement}</strong>
                      {item.description && <> {item.description}</>}
                    </div>
                  </li>
                ))}
                {riskyItems.map((item) => (
                  <li key={item.id} className="overview-risk overview-risk--med">
                    <span className="overview-risk-level">RISK</span>
                    <div>
                      <strong>{item.id} — {item.requirement}</strong>
                      {item.description && <> {item.description}</>}
                    </div>
                  </li>
                ))}
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
            <select
              className="fl-cat-select"
              value={matrixDomain}
              onChange={(e) => setMatrixDomain(e.target.value)}
            >
              {matrixDomains.map((d) => (
                <option key={d} value={d}>{d || 'All domains'}</option>
              ))}
            </select>
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

      {show('2.3') && (<>
      {/* 2.3 Gaps & Questions */}
      <div className="rfp-section-heading" id="2.3">Outstanding Questions</div>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">❓</span>
            Outstanding Questions to Client
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Question</th>
                <th>Req</th>
                <th>Urgency</th>
                <th>Client's Answer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OQ-01</td>
                <td>Will interim security controls evidence (SOC 2 Type II + documented GDPR/PII controls) satisfy the SOC 2 Type II requirement (CR-009) at go-live, with certification to follow post-launch?</td>
                <td>CR-009</td>
                <td><span className="overview-badge overview-badge--danger">Critical</span></td>
                <td><span className="overview-badge overview-badge--warn">Pending</span></td>
              </tr>
              <tr>
                <td>OQ-02</td>
                <td>Which enterprise IdP provider is in use (Okta, Azure AD, ADFS)? Timeline for IdP configuration sign-off to unblock SAML SSO delivery.</td>
                <td>TC-029</td>
                <td><span className="overview-badge overview-badge--warn">High</span></td>
                <td><span className="overview-badge overview-badge--warn">Pending</span></td>
              </tr>
              <tr>
                <td>OQ-03</td>
                <td>What is the expected quality (DPI, scan resolution) of RFP documents uploaded? This directly determines achievable OCR accuracy against the 95% target.</td>
                <td>NFR-002</td>
                <td><span className="overview-badge overview-badge--warn">High</span></td>
                <td><span className="overview-badge overview-badge--warn">Pending</span></td>
              </tr>
              <tr>
                <td>OQ-04</td>
                <td>Is the Salesforce webhook integration (FR-133) required at go-live or can it be deferred to Phase 2? Depends on your SF edition and API access tier.</td>
                <td>FR-133</td>
                <td><span className="overview-badge">Medium</span></td>
                <td><span className="overview-badge overview-badge--warn">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overview-card">
          <div className="overview-card-header">
            <span className="overview-card-icon">→</span>
            High-Risk Items — Resolution Plan
          </div>
          <table className="overview-table">
            <thead>
              <tr>
                <th>Req ID</th>
                <th>Issue</th>
                <th>Resolution</th>
                <th>Target Phase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TC-013</td>
                <td>RAG pipeline with 512-token chunking and Qdrant requires ML infrastructure setup and iterative prompt tuning</td>
                <td>Dedicated ML infrastructure sprint in Phase 1; retrieval quality benchmarked before Phase 2 feature build.</td>
                <td>Phase 1</td>
              </tr>
              <tr>
                <td>NFR-011</td>
                <td>500 ms real-time collaboration propagation under concurrent load</td>
                <td>WebSocket infrastructure with horizontal scaling; load test milestone gating Phase 2 go/no-go.</td>
                <td>Phase 2</td>
              </tr>
              <tr>
                <td>NFR-019</td>
                <td>RTO 1 hour / RPO 15 minutes requires active standby and continuous replication</td>
                <td>DR architecture scoped in Phase 1; DR test run before production launch.</td>
                <td>Phase 1 / Launch</td>
              </tr>
              <tr>
                <td>CR-015</td>
                <td>PII anonymisation before LLM dispatch — entity detection accuracy affects downstream output quality</td>
                <td>NLP-based PII detection with reversible mapping; accuracy threshold validated on representative dataset before go-live.</td>
                <td>Phase 1</td>
              </tr>
              <tr>
                <td>FR-016</td>
                <td>Audio/video calling requires third-party SDK (Twilio/Daily.co); not in base scope</td>
                <td>Scoped and priced separately. Can be added to Phase 3 if confirmed. No impact on core portal delivery.</td>
                <td>Phase 3 (optional)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>)}
    </div>
  )
}
