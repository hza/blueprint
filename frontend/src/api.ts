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

export async function fetchFL(): Promise<FRItem[]> {
  const res = await fetch(`${BASE}/fl`)
  if (!res.ok) return []
  const data = await res.json() as { items: FRItem[] }
  return data.items
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
