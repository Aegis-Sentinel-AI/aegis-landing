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
      { label: 'Burned YTD', value: '12.4M' },
      { label: 'Burn Rate', value: '2%/tx' },
    ],
  },
  {
    icon: Gem,
    title: 'Stake',
    color: '#0066FF',
    percentage: '8.2%',
    description: 'Stake $SENTINEL to earn yield from protocol fees and secure the network.',
    stats: [
      { label: 'APY', value: '8.2%' },
      { label: 'Total Staked', value: '340M' },
    ],
  },
  {
    icon: Vote,
    title: 'Governance',
    color: '#ADFF2F',
    percentage: '1 Token',
    description: 'Shape the protocol\'s future. Vote on upgrades, fee structures, and grants.',
    stats: [
      { label: 'Active Proposals', value: '7' },
      { label: 'Voter Power', value: '1:1' },
    ],
  },
]

const tokenMetrics = [
  { label: 'Total Supply', value: '1,000,000,000', suffix: '$SENTINEL' },
  { label: 'Circulating', value: '420,000,000', suffix: '42%' },
  { label: 'Fully Diluted MC', value: '$84M', suffix: 'est.' },
]

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-lime/5 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="$SENTINEL Token"
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
                <div className="text-sm text-zinc-500">{metric.label}</div>
                <div className="text-2xl lg:text-3xl font-bold gradient-text">{metric.value}</div>
                <div className="text-xs text-zinc-400">{metric.suffix}</div>
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
              <div className="flex items-center justify-between mb-6">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${utility.color}20` }}
                >
                  <utility.icon className="w-7 h-7" style={{ color: utility.color }} />
                </div>
                <div 
                  className="text-3xl font-bold"
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
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-zinc-500">{stat.label}</div>
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
