'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
}

export default function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-2xl mx-auto mb-16"
    >
      {label && (
        <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-zinc-400">{subtitle}</p>
      )}
    </motion.div>
  )
}
