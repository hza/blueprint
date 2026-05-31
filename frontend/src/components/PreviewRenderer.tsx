import { useEffect, useRef } from 'react'
import { marked } from 'marked'
import './PreviewRenderer.css'

interface Props {
  content: string
}

export function PreviewRenderer({ content }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const html = marked.parse(content, { gfm: true }) as string
      ref.current.innerHTML = html
    }
  }, [content])

  return (
    <div className="preview-content">
      <div ref={ref} className="markdown-body" />
    </div>
  )
}
