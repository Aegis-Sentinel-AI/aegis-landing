'use client'

import { motion } from 'framer-motion'
import { 
  Flame, Vote, Gem, ArrowRight, TrendingUp, Shield, 
  PieChart, Users, Building2, Rocket, Lock, Coins,
  Zap, ArrowUpRight, Clock, Target, DollarSign
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Token Sale Structure
const tokenSale = {
  seed: { price: 0.01, allocation: 5, raised: '500K', discount: '80%' },
  presale: { price: 0.025, allocation: 10, raised: '2.5M', discount: '50%' },
  public: { price: 0.05, allocation: 15, raised: '7.5M', discount: '0%' },
}

// Token Distribution
const distribution = [
  { name: 'Public Sale', percentage: 15, color: '#BFFF00', tokens: '150M', vesting: '10% TGE, 12mo linear' },
  { name: 'Ecosystem Rewards', percentage: 30, color: '#0066FF', tokens: '300M', vesting: '48mo linear' },
  { name: 'Treasury/DAO', percentage: 20, color: '#8B5CF6', tokens: '200M', vesting: 'Governance controlled' },
  { name: 'Team', percentage: 15, color: '#F59E0B', tokens: '150M', vesting: '12mo cliff, 36mo linear' },
  { name: 'Validators', percentage: 10, color: '#10B981', tokens: '100M', vesting: '60mo rewards' },
  { name: 'Liquidity', percentage: 5, color: '#EC4899', tokens: '50M', vesting: 'Unlocked for DEX' },
  { name: 'Advisors', percentage: 5, color: '#6366F1', tokens: '50M', vesting: '6mo cliff, 24mo linear' },
]

// Burn Mechanisms
const burnMechanisms = [
  { 
    name: 'Verification Burns', 
    rate: '2%', 
    description: 'Every ZK-proof verification triggers automatic burn',
    icon: Shield,
    color: '#FF6B6B',
    projected: '~15M tokens/year'
  },
  { 
    name: 'Subscription Burns', 
    rate: '1%', 
    description: 'Enterprise monthly payments include burn',
    icon: Building2,
    color: '#F59E0B',
    projected: '~8M tokens/year'
  },
  { 
    name: 'Staking Claim Burns', 
    rate: '0.5%', 
    description: 'Small burn when validators claim rewards',
    icon: Gem,
    color: '#0066FF',
    projected: '~3M tokens/year'
  },
  { 
    name: 'Governance Burns', 
    rate: '100 tokens', 
    description: 'Fixed cost to submit DAO proposals',
    icon: Vote,
    color: '#BFFF00',
    projected: '~50K tokens/year'
  },
  { 
    name: 'Premium Feature Burns', 
    rate: '5%', 
    description: 'API access and dashboard pro features',
    icon: Zap,
    color: '#8B5CF6',
    projected: '~5M tokens/year'
  },
]

// Revenue Flow
const revenueFlow = [
  { recipient: 'Validators', percentage: 70, color: '#0066FF' },
  { recipient: 'Treasury', percentage: 28, color: '#8B5CF6' },
  { recipient: 'Burned', percentage: 2, color: '#FF6B6B' },
]

// Subscription Tiers
const subscriptionTiers = [
  { 
    name: 'Starter', 
    price: '$2,500', 
    tokens: '50,000',
    features: ['10K scans/month', '100K API calls', 'Email support'],
    highlight: false
  },
  { 
    name: 'Professional', 
    price: '$7,500', 
    tokens: '150,000',
    features: ['50K scans/month', '500K API calls', 'Priority support', 'Custom reports'],
    highlight: true
  },
  { 
    name: 'Enterprise', 
    price: '$25,000', 
    tokens: '500,000',
    features: ['Unlimited scans', 'Unlimited API', 'Dedicated support', 'Custom integration', 'SLA guarantee'],
    highlight: false
  },
]

export default function TokenomicsPage() {
  const totalBurnProjected = burnMechanisms.reduce((acc, m) => {
    const num = parseFloat(m.projected.replace(/[^0-9.]/g, ''))
    return acc + (m.projected.includes('K') ? num * 1000 : num * 1000000)
  }, 0)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-lime/20 mb-6">
              <Coins className="w-4 h-4 text-lime" />
              <span className="text-sm font-mono text-lime">$SENTINEL Token</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Tokenomics
              <span className="block gradient-text">Deep Dive</span>
            </h1>
            
            <p className="text-xl text-zinc-400 mb-8">
              A utility-first token designed for real-world enterprise security demand.
              Deflationary by design, governed by the community.
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: 'Total Supply', value: '1B', sublabel: 'Fixed cap' },
                { label: 'Public Price', value: '$0.05', sublabel: 'TGE price' },
                { label: 'Initial MC', value: '$50M', sublabel: 'At TGE' },
                { label: 'Annual Burn', value: '~3%', sublabel: 'Projected' },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass rounded-xl p-4 border border-white/10"
                >
                  <div className="text-2xl md:text-3xl font-mono font-bold gradient-text">{metric.value}</div>
                  <div className="text-sm text-zinc-400">{metric.label}</div>
                  <div className="text-xs text-zinc-500 font-mono">{metric.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Token Sale Structure */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Token Sale Structure</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Three-phase launch with increasing prices rewarding early supporters
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(tokenSale).map(([phase, data], index) => (
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative card overflow-hidden ${phase === 'presale' ? 'border-lime/30 ring-1 ring-lime/20' : ''}`}
              >
                {phase === 'presale' && (
                  <div className="absolute top-0 left-0 right-0 bg-lime text-background text-xs font-mono font-bold text-center py-1">
                    COMING SOON
                  </div>
                )}
                
                <div className={phase === 'presale' ? 'pt-6' : ''}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono uppercase tracking-wider text-zinc-500">
                      {phase.charAt(0).toUpperCase() + phase.slice(1)} Round
                    </span>
                    <span className="px-2 py-1 rounded bg-lime/10 text-lime text-xs font-mono">
                      {data.discount} discount
                    </span>
                  </div>
                  
                  <div className="text-4xl font-mono font-bold mb-2">${data.price}</div>
                  <div className="text-sm text-zinc-400 mb-6">per token</div>
                  
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Allocation</span>
                      <span className="font-mono">{data.allocation}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Target Raise</span>
                      <span className="font-mono">${data.raised}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Tokens</span>
                      <span className="font-mono">{data.allocation * 10}M</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-zinc-500 mt-8"
          >
            Presale via PinkSale • Public launch on Uniswap (Arbitrum)
          </motion.p>
        </div>
      </section>

      {/* Token Distribution */}
      <section className="py-20 relative bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Token Distribution</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Balanced allocation prioritizing ecosystem growth and long-term sustainability
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Pie Chart Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-md mx-auto"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {distribution.reduce((acc, item, index) => {
                  const offset = acc.offset
                  const circumference = 2 * Math.PI * 40
                  const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`
                  
                  acc.elements.push(
                    <circle
                      key={index}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={item.color}
                      strokeWidth="20"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={-offset}
                      className="transition-all duration-500"
                    />
                  )
                  
                  acc.offset += (item.percentage / 100) * circumference
                  return acc
                }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-mono font-bold">1B</div>
                  <div className="text-sm text-zinc-400">Total Supply</div>
                </div>
              </div>
            </motion.div>

            {/* Distribution List */}
            <div className="space-y-4">
              {distribution.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5"
                >
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-mono font-bold" style={{ color: item.color }}>
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-zinc-500">
                      <span className="font-mono">{item.tokens} tokens</span>
                      <span className="truncate ml-2">{item.vesting}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Burn Mechanisms */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border border-red-500/20 mb-4">
              <Flame className="w-4 h-4 text-red-500" />
              <span className="text-sm font-mono text-red-400">Deflationary Design</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">5-Layer Burn Mechanism</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Multiple burn triggers ensure continuous supply reduction tied to real protocol usage
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {burnMechanisms.map((mechanism, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${mechanism.color}20` }}
                  >
                    <mechanism.icon className="w-6 h-6" style={{ color: mechanism.color }} />
                  </div>
                  <div 
                    className="px-3 py-1 rounded-lg font-mono font-bold text-lg"
                    style={{ backgroundColor: `${mechanism.color}20`, color: mechanism.color }}
                  >
                    {mechanism.rate}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{mechanism.name}</h3>
                <p className="text-sm text-zinc-400 mb-4">{mechanism.description}</p>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-lime" />
                    <span className="text-zinc-400">Projected:</span>
                    <span className="font-mono text-lime">{mechanism.projected}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total Burn Projection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 border border-red-500/20 text-center"
          >
            <Flame className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <div className="text-5xl font-mono font-bold text-red-400 mb-2">
              ~{(totalBurnProjected / 1000000).toFixed(1)}M
            </div>
            <div className="text-zinc-400 mb-4">Projected Annual Burn</div>
            <div className="text-sm text-zinc-500">
              ≈ 3.1% of total supply burned per year at projected enterprise adoption rates
            </div>
          </motion.div>
        </div>
      </section>

      {/* Revenue Flow */}
      <section className="py-20 relative bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Revenue Distribution</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Protocol fees flow to validators, treasury, and burns — creating aligned incentives
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-8 border border-white/10">
              {/* Flow Diagram */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                <div className="text-center">
                  <Building2 className="w-12 h-12 text-lime mx-auto mb-2" />
                  <div className="font-semibold">Enterprises</div>
                  <div className="text-sm text-zinc-500">Pay subscription</div>
                </div>
                
                <ArrowRight className="w-8 h-8 text-zinc-600 rotate-90 md:rotate-0" />
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <div className="font-semibold">Protocol</div>
                  <div className="text-sm text-zinc-500">Collects fees</div>
                </div>
                
                <ArrowRight className="w-8 h-8 text-zinc-600 rotate-90 md:rotate-0" />
                
                <div className="space-y-2">
                  {revenueFlow.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-mono" style={{ color: item.color }}>
                        {item.percentage}%
                      </span>
                      <span className="text-zinc-400">{item.recipient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-3">
                {revenueFlow.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.recipient}</span>
                      <span className="font-mono">{item.percentage}%</span>
                    </div>
                    <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Tiers */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Pricing</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Subscriptions paid in $SENTINEL tokens — creating continuous demand
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {subscriptionTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`card relative ${tier.highlight ? 'border-lime/30 ring-1 ring-lime/20' : ''}`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-lime text-background text-xs font-mono font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                  <div className="text-4xl font-mono font-bold gradient-text">{tier.price}</div>
                  <div className="text-sm text-zinc-400">/month</div>
                  <div className="mt-2 text-xs font-mono text-zinc-500">
                    {tier.tokens} $SENTINEL
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-lime" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-zinc-500 mt-8"
          >
            💡 Lock tokens for 12 months and receive 20% discount
          </motion.p>
        </div>
      </section>

      {/* Validator Staking */}
      <section className="py-20 relative bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Validator Staking</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Stake $SENTINEL to secure the network and earn protocol revenue
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Minimum Stake', value: '10,000', sublabel: '$SENTINEL', icon: Lock },
              { label: 'Target APY', value: '8-12%', sublabel: 'Variable', icon: TrendingUp },
              { label: 'Unstake Period', value: '7 days', sublabel: 'Lock period', icon: Clock },
              { label: 'Slash Penalty', value: '10%', sublabel: 'For malicious acts', icon: Shield },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <item.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-2xl font-mono font-bold gradient-text">{item.value}</div>
                <div className="text-sm text-zinc-400">{item.label}</div>
                <div className="text-xs text-zinc-500 font-mono">{item.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to participate?
            </h2>
            <p className="text-zinc-400 mb-8">
              Join our waitlist to be notified when the presale opens
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#waitlist" className="btn-primary">
                Join Waitlist
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="https://docs.aegissentinel.online/whitepaper" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Read Whitepaper
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
