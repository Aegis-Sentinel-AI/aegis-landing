'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const terminalLines = [
  { type: 'command', content: '$ sentinel scan --network corporate' },
  { type: 'output', content: '→ Scanning 12,847 endpoints...' },
  { type: 'success', content: '✓ AI Analysis complete' },
  { type: 'success', content: '✓ ZK-Proof generated (50k constraints)' },
  { type: 'success', content: '✓ Verified on L2 (tx: 0x7f3a...)' },
  { type: 'highlight', content: '🛡️ Security Status: VERIFIED CLEAN' },
]

export default function Terminal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev >= terminalLines.length) {
            clearInterval(timer)
            return prev
          }
          return prev + 1
        })
      }, 400)
      return () => clearInterval(timer)
    }
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto glass rounded-xl overflow-hidden shadow-2xl border border-white/10"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-lime" />
        </div>
        <span className="ml-auto text-xs font-mono text-zinc-500">sentinel-engine</span>
      </div>

      {/* Body */}
      <div className="p-5 font-mono text-sm space-y-2">
        {terminalLines.slice(0, visibleLines).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-2 ${
              line.type === 'highlight'
                ? 'mt-3 px-3 py-2 bg-lime/10 border border-lime/20 rounded-lg'
                : ''
            }`}
          >
            {line.type === 'command' && (
              <>
                <span className="text-primary">$</span>
                <span className="text-white">{line.content.slice(2)}</span>
              </>
            )}
            {line.type === 'output' && (
              <>
                <span className="text-primary">→</span>
                <span className="text-zinc-400">{line.content.slice(2)}</span>
              </>
            )}
            {line.type === 'success' && (
              <>
                <span className="text-lime">✓</span>
                <span className="text-zinc-400">{line.content.slice(2)}</span>
              </>
            )}
            {line.type === 'highlight' && (
              <>
                <span>🛡️</span>
                <span className="text-zinc-300">
                  Security Status: <span className="text-lime font-semibold">VERIFIED CLEAN</span>
                </span>
              </>
            )}
          </motion.div>
        ))}
        
        {/* Cursor */}
        {visibleLines < terminalLines.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-primary"
          />
        )}
      </div>
    </motion.div>
  )
}
