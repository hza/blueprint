import './DomainsList.css'
import { useEffect, useMemo, useState } from 'react'
import { fetchFL } from '../api'
import type { FRItem } from '../types'

interface Props {
  onSelectDomain?: (domain: string) => void
}

export function DomainsList({ onSelectDomain }: Props) {
  const [items, setItems] = useState<FRItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFL().then((data) => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    for (const item of items) {
      counts.set(item.domain, (counts.get(item.domain) ?? 0) + 1)
    }
    return Array.from(counts.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count }))
  }, [items])

  if (loading) {
    return (
      <div className="cat-list-loading">
        <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
        Loading…
      </div>
    )
  }

  return (
    <div className="cat-list">
      <div className="cat-list-scroll">
        <table className="cat-table">
          <thead>
            <tr>
              <th className="cat-th cat-th-id">#</th>
              <th className="cat-th cat-th-name">Domain</th>
              <th className="cat-th cat-th-count">Requirements</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(({ name, count }, index) => (
              <tr
                key={name}
                className="cat-tr"
                onClick={() => onSelectDomain?.(name)}
              >
                <td className="cat-td cat-td-id">{index + 1}</td>
                <td className="cat-td cat-td-name">{name}</td>
                <td className="cat-td cat-td-count">{count}</td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="cat-td-empty">No domains found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
