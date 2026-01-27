'use client'

import { motion } from 'framer-motion'
import { Flame, Vote, Gem, Ticket } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const tokenStats = [
  { value: '1B', label: 'Total Supply' },
  { value: '40%', label: 'Community & Ecosystem' },
  { value: '2%', label: 'Burn per Verification' },
]

const utilities = [
  {
    icon: Flame,
    title: 'Deflationary Burns',
    description: '2% of verification fees are burned, reducing supply over time',
  },
  {
    icon: Vote,
    title: 'Governance',
    description: 'Vote on protocol upgrades, fee structures, and grant allocations',
  },
  {
    icon: Gem,
    title: 'Staking Rewards',
    description: 'Stake AEGIS to earn yield from protocol fees',
  },
  {
    icon: Ticket,
    title: 'Access Tiers',
    description: 'Hold AEGIS to unlock premium features and priority support',
  },
]

const distribution = [
  { label: 'Community & Ecosystem', percentage: 40, color: '#6366f1' },
  { label: 'Team & Advisors', percentage: 20, color: '#8b5cf6' },
  { label: 'Private Sale', percentage: 15, color: '#a855f7' },
  { label: 'Treasury', percentage: 15, color: '#d946ef' },
  { label: 'Liquidity', percentage: 10, color: '#ec4899' },
]

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-24 lg:py-32 bg-background-elevated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="$AEGIS Token"
          title="Tokenomics"
          subtitle="Utility-first design with sustainable economics"
        />

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Stats */}
          <div className="space-y-6">
            {tokenStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-zinc-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Utilities */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Token Utility</h3>
            <div className="space-y-4">
              {utilities.map((utility, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 bg-background border border-border rounded-xl"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <utility.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{utility.title}</h4>
                    <p className="text-sm text-zinc-400">{utility.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">Distribution</h3>
          <div className="max-w-2xl mx-auto space-y-4">
            {distribution.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-center justify-between p-4 bg-background rounded-lg overflow-hidden"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 opacity-20"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
                <span className="relative font-medium">{item.label}</span>
                <span
                  className="relative font-bold"
                  style={{ color: item.color }}
                >
                  {item.percentage}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
