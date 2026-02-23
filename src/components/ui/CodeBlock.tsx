'use client'

import { useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'

// DOMPurify only works in browser - use dynamic import
const sanitizeHtml = (html: string | null | undefined): string => {
  if (!html) return '';
  // During SSR, return escaped content as-is (already escaped in highlightCode)
  if (typeof window === 'undefined') return html;
  // Client-side: use DOMPurify for extra safety
  try {
    const DOMPurify = require('dompurify');
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['span', 'p'],
      ALLOWED_ATTR: ['class'],
    });
  } catch {
    return html;
  }
}

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export default function CodeBlock({ code, language = 'python', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    // Escape HTML first to prevent XSS
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
    
    return escaped
      .replace(/(from|import|def|class|return|if|else|elif|for|while|try|except|with|as|async|await|True|False|None)/g, '<span class="text-purple-400">$1</span>')
      .replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="text-green-400">$1</span>')
      .replace(/(#.*$)/gm, '<span class="text-zinc-500">$1</span>')
      .replace(/(\d+)/g, '<span class="text-orange-400">$1</span>')
  }

  return (
    <div className="glass rounded-xl overflow-hidden border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
        <span className="text-sm text-zinc-400">{title || language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-400 glass rounded-md hover:text-white hover:bg-white/10 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-lime" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="p-5 overflow-x-auto">
        <code
          className="text-sm font-mono leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(highlightCode(code)) }}
        />
      </pre>
    </div>
  )
}
