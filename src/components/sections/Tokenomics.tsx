'use client'

import { motion } from 'framer-motion'
import { Flame, Vote, Gem, ArrowRight, TrendingUp, Shield } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const tokenUtilities = [
  {
    icon: Flame,
    title: 'Burn',
    color: '#FF6B6B',
    percentage: '2%',
    description: 'Every verification burns 2% of fees — creating perpetual deflationary pressure.',
    stats: [
      { label: 'Burn Rate', value: '2%/tx' },
      { label: 'Mechanism', value: 'Auto' },
    ],
  },
  {
    icon: Gem,
    title: 'Stake',
    color: '#0066FF',
    percentage: '8-12%',
    description: 'Stake $AEGIS to earn yield from protocol fees and secure the network.',
    stats: [
      { label: 'Target APY', value: '8-12%' },
      { label: 'Launch', value: 'Q2 2026' },
    ],
  },
  {
    icon: Vote,
    title: 'Governance',
    color: '#ADFF2F',
    percentage: '1 Token',
    description: 'Shape the protocol\'s future. Vote on upgrades, fee structures, and grants.',
    stats: [
      { label: 'Voter Power', value: '1:1' },
      { label: 'Model', value: 'On-chain' },
    ],
  },
]

const tokenMetrics = [
  { label: 'Total Supply', value: '1,000,000,000', suffix: '$AEGIS' },
  { label: 'Early Bird Price', value: '$0.015', suffix: 'Q2 2026' },
  { label: 'Listing Price', value: '$0.04', suffix: 'Uniswap (Arbitrum)' },
]

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-lime/5 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="$AEGIS Token"
          title="Tokenomics Dashboard"
          subtitle="Utility-first design powering the security economy"
        />

        {/* Token Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 mb-12 border border-white/10"
        >
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {tokenMetrics.map((metric, index) => (
              <div key={index} className="space-y-1">
                <div className="text-sm font-mono uppercase tracking-wider text-zinc-500">{metric.label}</div>
                <div className="text-2xl lg:text-3xl font-mono font-bold tabular-nums gradient-text">{metric.value}</div>
                <div className="text-xs font-mono text-zinc-400">{metric.suffix}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Utility Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {tokenUtilities.map((utility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="card card-hover group relative overflow-hidden"
            >
              {/* Top accent */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: utility.color }}
              />
              
              {/* Icon & Title */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <div 
                  className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${utility.color}20` }}
                >
                  <utility.icon className="w-5 h-5 sm:w-7 sm:h-7" style={{ color: utility.color }} />
                </div>
                <div 
                  className="text-2xl sm:text-3xl font-mono font-bold tabular-nums whitespace-nowrap"
                  style={{ color: utility.color }}
                >
                  {utility.percentage}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{utility.title}</h3>
              <p className="text-zinc-400 mb-6">{utility.description}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                {utility.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-lg font-mono font-bold tabular-nums">{stat.value}</div>
                    <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://docs.aegissentinel.online/tokenomics"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            <TrendingUp className="w-5 h-5" />
            View Full Tokenomics
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
