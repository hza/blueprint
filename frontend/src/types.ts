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

export type ViewTab = 'overview' | 'qa' | 'analytics' | 'technical' | 'cost' | 'timeline' | 'team' | 'code' | 'requirements' | 'security' | 'delivery' | 'pricing' | 'proof' | 'executive-overview' | 'requirements-coverage' | 'solution-architecture' | 'uxdesign'

export type FileView = 'source' | 'preview'

export interface FRItem {
  id: string
  requirement: string
  domain: string
  original_text: string
  references: string
  line: string
  status?: 'met' | 'gap' | 'risky'
  statusDescription?: string
}

export interface FRAnnotation {
  id: string
  requirement: string
  domain: string
  original_text: string
}

// keyed by 1-based line number
export type FRAnnotations = Record<number, FRAnnotation[]>

export interface RequirementsDomainRow {
  domain: string
  total: number
  met: number
  risky: number
  gap: number
}

export interface RequirementsSummaryItem {
  id: string
  requirement: string
  domain: string
  description: string
  options?: string
}

export interface RequirementsSummary {
  total: number
  met: number
  risky: number
  gaps: number
  coverage_pct: number
  domains: RequirementsDomainRow[]
  gap_items: RequirementsSummaryItem[]
  risky_items: RequirementsSummaryItem[]
}
