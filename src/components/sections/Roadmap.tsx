'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'

const roadmapItems = [
  {
    quarter: 'Q1 2026',
    title: 'Foundation',
    status: 'completed',
    items: [
      { label: 'Core AI engine development', done: true },
      { label: 'ZK circuit design', done: true },
      { label: 'Technical whitepaper', done: true },
    ],
  },
  {
    quarter: 'Q2 2026',
    title: 'Private Beta',
    status: 'active',
    items: [
      { label: 'Testnet deployment', done: true },
      { label: 'Enterprise pilot program', done: false },
      { label: 'Security audits', done: false },
    ],
  },
  {
    quarter: 'Q3 2026',
    title: 'Public Launch',
    status: 'upcoming',
    items: [
      { label: 'Mainnet deployment', done: false },
      { label: 'Token Generation Event', done: false },
      { label: 'DEX listings', done: false },
    ],
  },
  {
    quarter: 'Q4 2026',
    title: 'Expansion',
    status: 'upcoming',
    items: [
      { label: 'Multi-chain support', done: false },
      { label: 'Enterprise dashboard', done: false },
      { label: 'Partner integrations', done: false },
    ],
  },
]

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Roadmap"
          title="Building the Future"
        />

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />

          <div className="grid grid-cols-4 gap-8">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative pt-12"
              >
                {/* Marker */}
                <div
                  className={cn(
                    'absolute top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 z-10',
                    item.status === 'completed' && 'bg-green-500 border-green-500',
                    item.status === 'active' && 'bg-primary border-primary shadow-lg shadow-primary/50',
                    item.status === 'upcoming' && 'bg-background-card border-border'
                  )}
                />

                <div className="text-center mb-4">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {item.quarter}
                  </span>
                  <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                </div>

                <ul className="space-y-2">
                  {item.items.map((task, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex items-center gap-2">
                      <span>{task.done ? '✅' : '⬜'}</span>
                      {task.label}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden relative pl-8">
          {/* Line */}
          <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-border" />

          <div className="space-y-10">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Marker */}
                <div
                  className={cn(
                    'absolute -left-5 top-0 w-4 h-4 rounded-full border-2',
                    item.status === 'completed' && 'bg-green-500 border-green-500',
                    item.status === 'active' && 'bg-primary border-primary',
                    item.status === 'upcoming' && 'bg-background-card border-border'
                  )}
                />

                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {item.quarter}
                </span>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>

                <ul className="space-y-2">
                  {item.items.map((task, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex items-center gap-2">
                      <span>{task.done ? '✅' : '⬜'}</span>
                      {task.label}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
