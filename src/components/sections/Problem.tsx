'use client'

import { motion } from 'framer-motion'
import { Clock, Eye, BarChart3, Plug } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const problems = [
  {
    icon: Clock,
    title: 'Slow Detection',
    description: 'Average breach detection takes 277 days. By then, the damage is done.',
  },
  {
    icon: Eye,
    title: 'No Transparency',
    description: "Security reports are opaque. Stakeholders can't verify if systems are actually secure.",
  },
  {
    icon: BarChart3,
    title: 'Privacy Trade-offs',
    description: 'Cloud security tools require exposing sensitive data — a GDPR nightmare.',
  },
  {
    icon: Plug,
    title: 'Fragmented Tools',
    description: "Enterprises juggle 50+ security tools that don't communicate effectively.",
  },
]

export default function Problem() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="The Problem"
          subtitle="Traditional cybersecurity is failing enterprises"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card card-hover group"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                <problem.icon className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
              <p className="text-sm text-zinc-400">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
