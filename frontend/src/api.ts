import type { FileContent, FileInfo, FRAnnotation, FRAnnotations, FRItem } from './types'

const BASE = '/api'

export async function fetchFiles(): Promise<FileInfo[]> {
  const res = await fetch(`${BASE}/files`)
  if (!res.ok) throw new Error(`Failed to fetch files: ${res.statusText}`)
  const data = await res.json()
  return data.files as FileInfo[]
}

export async function fetchFile(filename: string): Promise<FileContent> {
  const res = await fetch(`${BASE}/files/${encodeURIComponent(filename)}`)
  if (!res.ok) throw new Error(`Failed to fetch file: ${res.statusText}`)
  return res.json() as Promise<FileContent>
}

async function fetchReqStatus(): Promise<Record<string, { status: string; description: string }>> {
  const res = await fetch(`${BASE}/req-status`)
  if (!res.ok) return {}
  const data = await res.json() as { statuses: Record<string, { status: string; description: string }> }
  return data.statuses
}

export async function fetchFL(): Promise<FRItem[]> {
  const [flRes, statuses] = await Promise.all([
    fetch(`${BASE}/fl`),
    fetchReqStatus(),
  ])
  if (!flRes.ok) return []
  const data = await flRes.json() as { items: FRItem[] }
  return data.items.map((item) => {
    const s = statuses[item.id]
    if (!s) return item
    return { ...item, status: s.status as FRItem['status'], statusDescription: s.description }
  })
}

export async function fetchFR(filename: string): Promise<FRAnnotations> {
  const res = await fetch(`${BASE}/fr/${encodeURIComponent(filename)}`)
  if (!res.ok) return {}
  const data = await res.json() as { annotations: Record<string, FRAnnotation[]> }
  const result: FRAnnotations = {}
  for (const [k, v] of Object.entries(data.annotations)) {
    result[parseInt(k, 10)] = v
  }
  return result
}
