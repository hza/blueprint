export interface FileInfo {
  name: string
  size: number
  size_formatted: string
}

export interface FileContent {
  name: string
  content: string
  lines: string[]
  line_count: number
  loc: number
  size: number
  size_formatted: string
}

export type ViewTab = 'overview' | 'qa' | 'analytics' | 'technical' | 'cost' | 'timeline' | 'team' | 'uxdesign' | 'code' | 'requirements' | 'security' | 'delivery' | 'pricing' | 'proof' | 'executive-overview' | 'requirements-coverage' | 'solution-architecture'

export type FileView = 'source' | 'preview' | 'outline'

export interface FRItem {
  id: string
  requirement: string
  domain: string
  original_text: string
  references: string
  line: string
}

export interface FRAnnotation {
  id: string
  requirement: string
  domain: string
  original_text: string
}

// keyed by 1-based line number
export type FRAnnotations = Record<number, FRAnnotation[]>
