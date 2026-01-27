'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

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
    return code
      .replace(/(from|import|def|class|return|if|else|elif|for|while|try|except|with|as|async|await|True|False|None)/g, '<span class="text-purple-400">$1</span>')
      .replace(/(".*?"|'.*?')/g, '<span class="text-green-400">$1</span>')
      .replace(/(#.*$)/gm, '<span class="text-zinc-500">$1</span>')
      .replace(/(\d+)/g, '<span class="text-orange-400">$1</span>')
  }

  return (
    <div className="bg-background-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-background-elevated border-b border-border">
        <span className="text-sm text-zinc-400">{title || language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-400 bg-background-card border border-border rounded-md hover:text-white hover:border-border-light transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
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
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />
      </pre>
    </div>
  )
}
