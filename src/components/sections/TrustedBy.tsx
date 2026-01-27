'use client'

import { motion } from 'framer-motion'

const badges = [
  { icon: '🇪🇺', label: 'GDPR Compliant' },
  { icon: '📋', label: 'MiCA Ready' },
  { icon: '🔒', label: 'SOC 2 Target' },
  { icon: '🏛️', label: 'NIS2 Aligned' },
]

export default function TrustedBy() {
  return (
    <section className="py-16 border-y border-border bg-background-elevated/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-zinc-500 uppercase tracking-wider mb-8"
        >
          Building for enterprises regulated under
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 px-5 py-3 bg-background-card border border-border rounded-lg"
            >
              <span className="text-xl">{badge.icon}</span>
              <span className="text-sm font-medium">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
