import React from 'react'

interface FormattedTextProps {
  text: string | undefined | null
  className?: string
  fallback?: string
}

export function FormattedText({ text, className, fallback }: FormattedTextProps) {
  const content = text || fallback || ''
  
  if (!content) return null
  
  // Split by line breaks and map to JSX with preserved formatting
  // Handle both \n and \r\n line breaks
  const lines = content.split(/\r?\n/)
  
  return (
    <div className={className} style={{ whiteSpace: 'pre-wrap' }}>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line.length === 0 ? '\u00A0' : line} {/* Use non-breaking space for empty lines */}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  )
}