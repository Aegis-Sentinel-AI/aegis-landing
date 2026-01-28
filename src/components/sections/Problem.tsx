'use client'

import { motion } from 'framer-motion'
import { Bot, Clock, ShieldOff } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const threats2026 = [
  {
    icon: Bot,
    title: 'AI-Powered Phishing',
    stat: '340%',
    statLabel: 'increase in 2026',
    description: 'Autonomous AI agents craft hyper-personalized attacks that bypass traditional filters with 94% success rate.',
  },
  {
    icon: Clock,
    title: 'L1 Latency Gap',
    stat: '12s',
    statLabel: 'avg block time',
    description: 'Mainnet confirmation delays leave a critical window for front-running, MEV attacks, and transaction manipulation.',
  },
  {
    icon: ShieldOff,
    title: 'Privacy Leaks',
    stat: '€2.1B',
    statLabel: 'GDPR fines YTD',
    description: 'Cloud security tools require full data access — creating compliance nightmares and exposing sensitive information.',
  },
]

export default function Problem() {
  return (
    <section className="py-24 lg:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="2026 Threat Landscape"
          title="The Problem"
          subtitle="The attack surface has evolved. Your defenses need to evolve faster."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {threats2026.map((threat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="card card-hover group relative overflow-hidden"
            >
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 opacity-80" />
              
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                  <threat.icon className="w-7 h-7 text-red-400" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-400">{threat.stat}</div>
                  <div className="text-xs text-zinc-500">{threat.statLabel}</div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{threat.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{threat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
