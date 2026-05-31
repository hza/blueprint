import { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchFL } from '../api'
import type { FRItem } from '../types'
import './FLTable.css'

type SortKey = keyof FRItem
type SortDir = 'asc' | 'desc'

interface Props {
  onSelectSource: (item: FRItem, refIndex?: number) => void
  onSelectItem?: (item: FRItem) => void
  initialScrollTop?: number
  onScrollTopChange?: (top: number) => void
  initialFile?: string | null
  selectedItemId?: string | null
  initialDomainFilter?: string
}

export function FLTable({
  onSelectSource,
  onSelectItem,
  initialScrollTop = 0,
  onScrollTopChange,
  initialFile,
  selectedItemId = null,
  initialDomainFilter = '',
}: Props) {
  const normalizeRefFile = (value: string) => {
    const cleaned = value.trim()
    const parts = cleaned.split('/')
    return parts[parts.length - 1] || cleaned
  }

  const location = useLocation()
  const [items, setItems] = useState<FRItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filterText, setFilterText] = useState('')
  const [domainFilter, setDomainFilter] = useState(initialDomainFilter)
  const [fileFilter, setFileFilter] = useState(() =>
    initialFile ? normalizeRefFile(initialFile) : '',
  )
  const [sortKey, setSortKey] = useState<SortKey>('id')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [menu, setMenu] = useState<{ item: FRItem; refs: string[]; lines: string[]; x: number; y: number } | null>(null)
  const filterRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const restoredRef = useRef(false)

  const handleReqClick = useCallback(
    (e: React.MouseEvent, item: FRItem) => {
      if (onSelectItem) {
        onSelectItem(item)
        return
      }
      const refs = item.references.split(';').map((s) => s.trim()).filter(Boolean)
      const lines = item.line.split(';').map((s) => s.trim()).filter(Boolean)
      if (refs.length <= 1) {
        onSelectSource(item, 0)
        return
      }
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      setMenu({ item, refs, lines, x: rect.left, y: rect.bottom })
    },
    [onSelectSource, onSelectItem],
  )

  useEffect(() => {
    if (!menu) return
    const close = () => setMenu(null)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [menu])

  const highlightedId = location.hash ? location.hash.slice(1) : ''

  useEffect(() => {
    fetchFL().then((data) => {
      setItems(data)
      setLoading(false)
    })
    filterRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!highlightedId || !scrollRef.current) return
    const row = scrollRef.current.querySelector(`[data-id="${highlightedId}"]`)
    if (row) {
      row.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
  }, [highlightedId])

  useEffect(() => {
    if (!selectedItemId || !scrollRef.current) return
    const row = scrollRef.current.querySelector(`[data-id="${selectedItemId}"]`)
    if (row) {
      row.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
  }, [selectedItemId])

  useLayoutEffect(() => {
    setFileFilter(initialFile ? normalizeRefFile(initialFile) : '')
  }, [initialFile])

  const domains = useMemo(
    () => ['', ...Array.from(new Set(items.map((i) => i.domain))).sort()],
    [items],
  )

  const files = useMemo(
    () =>
      [
        '',
        ...Array.from(
          new Set(
            items.flatMap((item) =>
              item.references
                .split(';')
                .map((segment) => normalizeRefFile(segment))
                .filter(Boolean),
            ),
          ),
        ).sort(),
      ],
    [items],
  )

  useEffect(() => {
    if (loading || restoredRef.current || !scrollRef.current) return
    scrollRef.current.scrollTop = initialScrollTop
    restoredRef.current = true
  }, [loading, initialScrollTop])

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCat = !domainFilter || item.domain === domainFilter
      const refFiles = item.references
        .split(';')
        .map((segment) => normalizeRefFile(segment))
        .filter(Boolean)
      const matchesFile = !fileFilter || refFiles.includes(fileFilter)
      return matchesCat && matchesFile
    })
  }, [items, domainFilter, fileFilter])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      const cmp = av < bv ? -1 : av > bv ? 1 : 0
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return <span className="fl-sort-icon fl-sort-none">⇅</span>
    return (
      <span className="fl-sort-icon fl-sort-active">
        {sortDir === 'asc' ? '↑' : '↓'}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="fl-loading">
        <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
        Loading…
      </div>
    )
  }

  return (
    <div className="fl-table-wrap">
      {/* Toolbar */}
      <div className="fl-toolbar">
        <input
          ref={filterRef}
          className="fl-filter-input"
          type="search"
          placeholder="Filter requirements…"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <div className="fl-select-wrap">
          <select
            className="fl-cat-select"
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
          >
            {domains.map((c) => (
              <option key={c} value={c}>
                {c || 'All domains'}
              </option>
            ))}
          </select>
          {domainFilter && (
            <button className="fl-select-clear" onClick={() => setDomainFilter('')} title="Clear">×</button>
          )}
        </div>
        <div className="fl-select-wrap">
          <select
            className="fl-cat-select"
            value={fileFilter}
            onChange={(e) => setFileFilter(e.target.value)}
          >
            {files.map((f) => (
              <option key={f || '__all-files__'} value={f}>
                {f || 'All files'}
              </option>
            ))}
          </select>
          {fileFilter && (
            <button className="fl-select-clear" onClick={() => setFileFilter('')} title="Clear">×</button>
          )}
        </div>
        <span className="fl-count">
          {sorted.length} / {items.length} requirements
        </span>
      </div>

      {/* Table */}
      <div
        className="fl-scroll"
        ref={scrollRef}
        onScroll={(e) => onScrollTopChange?.(e.currentTarget.scrollTop)}
      >
        <table className="fl-table">
          <thead>
            <tr>
              {(
                [
                  ['id', 'ID'],
                  ['domain', 'Domain'],
                  ['requirement', 'Requirement'],

                ] as [SortKey, string][]
              ).map(([key, label]) => (
                <th key={key} onClick={() => handleSort(key)} className="fl-th">
                  {label}
                  {sortIndicator(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((item) => (
              <tr
                key={item.id}
                data-id={item.id}
                className={`fl-row fl-row-clickable${highlightedId === item.id ? ' fl-row-highlighted' : ''}${selectedItemId === item.id ? ' fl-row-selected' : ''}`}
                onClick={(e) => handleReqClick(e, item)}
              >
                <td className="fl-td fl-id">{item.id}</td>
                <td className="fl-td fl-cat">
                  <button
                    className="fl-cat-badge"
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setDomainFilter(item.domain) }}
                    title={`Filter by ${item.domain}`}
                  >
                    {item.domain}
                  </button>
                </td>
                <td className="fl-td fl-req">{item.requirement}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={3} className="fl-empty">No matching requirements</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {menu && (
        <div
          className="fl-ref-menu"
          style={{ top: menu.y, left: menu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          {menu.refs.map((ref, i) => (
            <button
              key={i}
              className="fl-ref-menu-item"
              type="button"
              onClick={() => {
                onSelectSource(menu.item, i)
                setMenu(null)
              }}
            >
              <span className="fl-ref-menu-file">{ref.split('/').pop()}</span>
              {menu.lines[i] && (
                <span className="fl-ref-menu-line">:{menu.lines[i]}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
