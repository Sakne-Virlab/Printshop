'use client'

import styles from "./MarkdownBlock.module.scss"
import { marked } from 'marked'

interface MarkdownBlockProps {
  content: string
  className?: string
}

export default function MarkdownBlock({ content, className = '' }: MarkdownBlockProps) {
  if (!content) return null

  // Парсим markdown в HTML
  const html = marked.parse(content, {
    breaks: true,        // переносы строк как <br>
    gfm: true,           // GitHub-flavored markdown
  }) as string

  return (
    <div 
      className={`${styles.markdownBlock} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}