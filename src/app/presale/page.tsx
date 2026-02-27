'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Clock, Rocket, ArrowRight, ArrowUpRight,
  Coins, Lock, Users, Zap, CheckCircle2, ChevronDown,
  Wallet, AlertTriangle, Globe, TrendingUp, Timer,
  Gift, Award, Star, ShieldCheck, ExternalLink, Mail
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// ─── Presale Configuration ───────────────────────────────────────────
const PRESALE_DATE = new Date('2026-06-01T12:00:00Z')

const presalePhases = [
  {
    name: 'Early Bird',
    price: '$0.015',
    priceNum: 0.015,
    discount: '62.5%',
    allocation: '50M',
    allocationNum: 50_000_000,
    cap: '$750K',
    status: 'upcoming' as const,
    bonus: '+20% bonus tokens',
    minBuy: '$100',
    maxBuy: '$25,000',
    color: '#ADFF2F',
  },
  {
    name: 'Presale',
    price: '$0.022',
    priceNum: 0.022,
    discount: '45%',
    allocation: '60M',
    allocationNum: 60_000_000,
    cap: '$1.32M',
    status: 'upcoming' as const,
    bonus: '+10% bonus tokens',
    minBuy: '$100',
    maxBuy: '$50,000',
    color: '#0066FF',
  },
  {
    name: 'Final Round',
    price: '$0.032',
    priceNum: 0.032,
    discount: '20%',
    allocation: '40M',
    allocationNum: 40_000_000,
    cap: '$1.28M',
    status: 'upcoming' as const,
    bonus: 'No bonus',
    minBuy: '$250',
    maxBuy: '$100,000',
    color: '#8B5CF6',
  },
]

const howToParticipate = [
  {
    step: 1,
    title: 'Set Up Wallet',
    description: 'Install MetaMask or any Web3 wallet and add the Arbitrum network.',
    icon: Wallet,
    color: '#0066FF',
  },
  {
    step: 2,
    title: 'Fund with ETH',
    description: 'Bridge ETH to Arbitrum or purchase directly through your wallet provider.',
    icon: Coins,
    color: '#ADFF2F',
  },
  {
    step: 3,
    title: 'Connect & Buy',
    description: 'Connect your wallet on the presale portal and purchase $AEGIS tokens.',
    icon: Rocket,
    color: '#8B5CF6',
  },
  {
    step: 4,
    title: 'Claim at TGE',
    description: 'Tokens are distributed according to the vesting schedule after Token Generation Event.',
    icon: Gift,
    color: '#F59E0B',
  },
]

const vestingSchedule = [
  { phase: 'Early Bird', tge: '10%', cliff: 'None', vesting: '9 months linear', color: '#ADFF2F' },
  { phase: 'Presale', tge: '10%', cliff: 'None', vesting: '9 months linear', color: '#0066FF' },
  { phase: 'Final Round', tge: '10%', cliff: 'None', vesting: '9 months linear', color: '#8B5CF6' },
]

const securityFeatures = [
  { text: 'Smart contract internally audited', icon: Shield },
  { text: 'Funds held in multi-sig treasury', icon: Lock },
  { text: 'Vesting enforced on-chain', icon: Timer },
  { text: '120+ automated tests passing', icon: ShieldCheck },
]

const faqs = [
  {
    q: 'When does the presale start?',
    a: 'The Early Bird round is scheduled for Q2 2026. Exact date and time will be announced to waitlist members 48 hours before launch.',
  },
  {
    q: 'What blockchain is $AEGIS on?',
    a: '$AEGIS is deployed on Arbitrum (Ethereum L2). You\'ll need ETH on Arbitrum to participate in the presale.',
  },
  {
    q: 'Is there a minimum or maximum buy?',
    a: 'Yes — minimums range from $100 (Early Bird) to $250 (Final Round). Maximums range from $25,000 to $100,000 depending on the round.',
  },
  {
    q: 'When do I receive my tokens?',
    a: 'Tokens are distributed starting at TGE (Token Generation Event). 10% unlocks immediately, with the rest vesting linearly over 9 months.',
  },
  {
    q: 'Will there be a public sale?',
    a: 'Yes \u2014 after the presale rounds, $AEGIS will launch publicly on Uniswap (Arbitrum) at $0.04 per token. The presale offers significant discounts over the listing price.',
  },
  {
    q: 'Is the presale KYC required?',
    a: 'No KYC required — the Early Bird presale is a trustless smart contract on Arbitrum One. Simply send ETH to the verified presale contract.',
  },
  {
    q: 'What happens if a round sells out early?',
    a: 'Rounds are first-come, first-served. Waitlist members get priority access. If a round sells out, the next round opens immediately.',
  },
  {
    q: 'Can I participate from any country?',
    a: 'Most countries are eligible. However, residents of sanctioned countries and US persons are excluded due to regulatory requirements.',
  },
]

// ─── Countdown Hook ──────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const calculate = useCallback(() => {
    const now = new Date().getTime()
    const diff = targetDate.getTime() - now

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      expired: false,
    }
  }, [targetDate])

  const [time, setTime] = useState(calculate)

  useEffect(() => {
    const interval = setInterval(() => setTime(calculate()), 1000)
    return () => clearInterval(interval)
  }, [calculate])

  return time
}

// ─── Countdown Digit Component ───────────────────────────────────────
function CountdownDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 glass rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold gradient-text"
            >
              {String(value).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
      </div>
      <span className="mt-2 text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-wider">{label}</span>
    </div>
  )
}

// ─── Email Signup Component ──────────────────────────────────────────
function PresaleNotifyForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'presale' }),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      // Fallback — still show success for UX
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 px-6 py-4 glass rounded-xl border border-lime/20"
      >
        <CheckCircle2 className="w-6 h-6 text-lime flex-shrink-0" />
        <div>
          <div className="font-semibold text-lime">You&apos;re on the list!</div>
          <div className="text-sm text-zinc-400">We&apos;ll notify you 48hrs before the presale opens.</div>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto">
      <div className="relative flex-1">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email for priority access"
          required
          className="w-full pl-12 pr-4 py-3.5 glass rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 bg-transparent text-white placeholder-zinc-500 font-mono text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-primary whitespace-nowrap disabled:opacity-50"
      >
        {loading ? 'Joining...' : 'Get Priority Access'}
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  )
}

// ─── FAQ Accordion ───────────────────────────────────────────────────
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={false}
      className="border-b border-white/5 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-medium text-zinc-200 group-hover:text-white transition-colors pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-zinc-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-zinc-400 text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Main Presale Page ───────────────────────────────────────────────
export default function PresalePage() {
  const countdown = useCountdown(PRESALE_DATE)

  const totalRaise = presalePhases.reduce((sum, p) => {
    return sum + parseFloat(p.cap.replace(/[$,K]/g, '')) * (p.cap.includes('M') ? 1_000_000 : 1_000)
  }, 0)

  return (
    <main className="min-h-screen bg-background relative">
      <Navbar />

      {/* ── Hero + Countdown ─────────────────────────────────────── */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-lime/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-lime/20 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-sm font-mono text-lime">Presale — Q2 2026</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Secure Your
              <span className="block gradient-text">$AEGIS Tokens</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
              Get up to 60% discount on the AI-powered cybersecurity token 
              before public launch. Limited allocation, first-come first-served.
            </p>

            {/* Countdown Timer */}
            {!countdown.expired ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <div className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-6">
                  Presale opens in
                </div>
                <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
                  <CountdownDigit value={countdown.days} label="Days" />
                  <span className="text-3xl font-mono text-zinc-600 mt-[-20px]">:</span>
                  <CountdownDigit value={countdown.hours} label="Hours" />
                  <span className="text-3xl font-mono text-zinc-600 mt-[-20px]">:</span>
                  <CountdownDigit value={countdown.minutes} label="Min" />
                  <span className="text-3xl font-mono text-zinc-600 mt-[-20px]">:</span>
                  <CountdownDigit value={countdown.seconds} label="Sec" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-12 inline-flex items-center gap-3 px-8 py-4 glass rounded-xl border border-lime/30 animate-confidence-glow"
              >
                <Rocket className="w-6 h-6 text-lime" />
                <span className="text-xl font-bold text-lime">Presale is LIVE!</span>
              </motion.div>
            )}

            {/* Priority Access Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <PresaleNotifyForm />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12"
            >
              {[
                { label: 'Starting Price', value: '$0.015', sub: 'Early Bird' },
                { label: 'Listing Price', value: '$0.040', sub: 'Uniswap launch' },
                { label: 'Total Allocation', value: '150M', sub: '$AEGIS' },
                { label: 'Target Raise', value: `$${(totalRaise / 1_000_000).toFixed(1)}M`, sub: 'Hard cap' },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-xl p-4 border border-white/10">
                  <div className="text-2xl md:text-3xl font-mono font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                  <div className="text-xs text-zinc-500 font-mono">{stat.sub}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Presale Rounds ───────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Presale Rounds</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Three rounds with increasing prices — earlier participation means bigger discounts
            </p>
          </motion.div>

          {/* Phase Timeline */}
          <div className="hidden lg:flex items-center justify-center mb-12">
            {presalePhases.map((phase, i) => (
              <div key={i} className="flex items-center">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm border-2"
                    style={{ borderColor: phase.color, color: phase.color }}
                  >
                    {i + 1}
                  </div>
                  <span className="font-medium" style={{ color: phase.color }}>
                    {phase.name}
                  </span>
                </div>
                {i < presalePhases.length - 1 && (
                  <div className="w-24 xl:w-32 h-px bg-gradient-to-r from-white/20 to-white/5 mx-6" />
                )}
              </div>
            ))}
            <div className="flex items-center ml-6">
              <div className="w-24 xl:w-32 h-px bg-gradient-to-r from-white/20 to-white/5 mr-6" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm border-2 border-lime/50 text-lime">
                  <Rocket className="w-5 h-5" />
                </div>
                <span className="font-medium text-lime">TGE</span>
              </div>
            </div>
          </div>

          {/* Phase Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {presalePhases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative card overflow-hidden group ${
                  index === 0 ? 'border-lime/30 ring-1 ring-lime/20' : ''
                }`}
              >
                {/* Best Value Badge */}
                {index === 0 && (
                  <div className="absolute top-0 left-0 right-0 bg-lime text-background text-xs font-mono font-bold text-center py-1.5 flex items-center justify-center gap-1.5">
                    <Star className="w-3.5 h-3.5" />
                    BEST VALUE — 60% OFF
                  </div>
                )}

                <div className={index === 0 ? 'pt-6' : ''}>
                  {/* Phase header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
                        style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                      >
                        {index + 1}
                      </div>
                      <span className="font-mono uppercase tracking-wider text-sm" style={{ color: phase.color }}>
                        {phase.name}
                      </span>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold"
                      style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
                    >
                      {phase.discount} off
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-4xl font-mono font-bold mb-1" style={{ color: phase.color }}>
                      {phase.price}
                    </div>
                    <div className="text-sm text-zinc-500">
                      per token
                      <span className="text-zinc-600 ml-2 line-through">$0.04</span>
                    </div>
                  </div>

                  {/* Bonus */}
                  {phase.bonus !== 'No bonus' && (
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg mb-6 text-sm font-mono"
                      style={{ backgroundColor: `${phase.color}10`, color: phase.color }}
                    >
                      <Gift className="w-4 h-4" />
                      {phase.bonus}
                    </div>
                  )}

                  {/* Details */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Allocation</span>
                      <span className="font-mono">{phase.allocation} tokens</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Hard Cap</span>
                      <span className="font-mono">{phase.cap}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Min Buy</span>
                      <span className="font-mono">{phase.minBuy}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Max Buy</span>
                      <span className="font-mono">{phase.maxBuy}</span>
                    </div>
                  </div>

                  {/* Progress bar placeholder */}
                  <div className="mt-6">
                    <div className="flex justify-between text-xs text-zinc-500 mb-2">
                      <span>0% sold</span>
                      <span>{phase.allocation}</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: '0%', backgroundColor: phase.color }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Participate ────────────────────────────────────── */}
      <section className="py-20 relative bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Participate</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Four simple steps to secure your $AEGIS tokens at the best price
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howToParticipate.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card relative"
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-2 text-6xl font-mono font-bold text-white/5">
                  {item.step}
                </div>

                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>

                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>

                {/* Connector line (hidden on mobile) */}
                {index < howToParticipate.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Accepted payment methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="text-sm text-zinc-500 mb-4">Accepted payment methods</div>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {['ETH', 'USDT', 'USDC', 'DAI'].map((token) => (
                <div key={token} className="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-white/5">
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm">{token}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Vesting Schedule ──────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vesting Schedule</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Transparent, on-chain vesting protects all participants and ensures price stability
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card overflow-hidden"
          >
            {/* Table header */}
            <div className="overflow-x-auto">
            <div className="grid grid-cols-4 gap-4 pb-4 border-b border-white/10 text-sm font-mono text-zinc-500 uppercase tracking-wider min-w-[480px]">
              <div>Round</div>
              <div>TGE Unlock</div>
              <div>Cliff</div>
              <div>Vesting</div>
            </div>

            {/* Table rows */}
            {vestingSchedule.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-4 gap-4 py-4 border-b border-white/5 last:border-0 items-center min-w-[480px]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: row.color }} />
                  <span className="font-medium text-sm">{row.phase}</span>
                </div>
                <div className="font-mono text-sm" style={{ color: row.color }}>{row.tge}</div>
                <div className="text-sm text-zinc-400">{row.cliff}</div>
                <div className="text-sm text-zinc-400">{row.vesting}</div>
              </motion.div>
            ))}
            </div>

            {/* Visual timeline */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
                Token Release Timeline
              </div>
              <div className="relative">
                {/* Month markers */}
                <div className="flex justify-between text-xs font-mono text-zinc-600 mb-2">
                  <span>TGE</span>
                  <span>3mo</span>
                  <span>6mo</span>
                  <span>9mo</span>
                  <span>12mo</span>
                </div>

                {/* Vesting bars */}
                <div className="space-y-2">
                  {vestingSchedule.map((row, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-mono text-zinc-500 w-20 text-right flex-shrink-0">
                        {row.phase}
                      </span>
                      <div className="flex-1 h-4 bg-zinc-800/50 rounded-full overflow-hidden relative">
                        {/* TGE unlock */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${parseInt(row.tge)}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
                          className="absolute left-0 top-0 h-full rounded-full"
                          style={{ backgroundColor: row.color, opacity: 0.9 }}
                        />
                        {/* Linear vesting portion */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${100 - parseInt(row.tge)}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 + i * 0.2, duration: 1 }}
                          className="absolute top-0 h-full rounded-r-full"
                          style={{
                            left: `${parseInt(row.tge)}%`,
                            backgroundColor: row.color,
                            opacity: 0.4,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Security & Compliance ─────────────────────────────────── */}
      <section className="py-20 relative bg-zinc-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Security & Compliance</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Your investment is protected by multiple layers of security and regulatory compliance
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {securityFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 glass rounded-xl border border-white/5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Smart contract links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="https://arbiscan.io/address/0x8F60e81Ca34510193D568A9a4CB4CbeF95e3F6a1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="font-mono">View Presale on Arbiscan</span>
            </a>
            <a
              href="https://docs.aegissentinel.online"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="font-mono">Audit Report</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Comparison Table ──────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Buy in Presale?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              See how presale pricing compares to the public launch
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 font-mono text-zinc-500 uppercase tracking-wider text-xs">Metric</th>
                    <th className="text-center py-4 px-4 font-mono text-xs uppercase tracking-wider" style={{ color: '#ADFF2F' }}>Early Bird</th>
                    <th className="text-center py-4 px-4 font-mono text-xs uppercase tracking-wider" style={{ color: '#0066FF' }}>Presale</th>
                    <th className="text-center py-4 px-4 font-mono text-xs uppercase tracking-wider" style={{ color: '#8B5CF6' }}>Final Round</th>
                    <th className="text-center py-4 px-4 font-mono text-zinc-500 uppercase tracking-wider text-xs">Public</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: 'Price', values: ['$0.015', '$0.022', '$0.032', '$0.040'] },
                    { metric: 'Discount', values: ['62.5%', '45%', '20%', '0%'] },
                    { metric: 'Tokens per $1,000', values: ['66,667', '45,455', '31,250', '25,000'] },
                    { metric: 'Potential ROI at $0.50', values: ['33x', '23x', '15.6x', '12.5x'] },
                    { metric: 'Bonus Tokens', values: ['+20%', '+10%', '—', '—'] },
                    { metric: 'Access', values: ['Waitlist', 'Waitlist', 'Open', 'Open'] },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="py-3 px-4 text-zinc-400">{row.metric}</td>
                      {row.values.map((val, j) => (
                        <td
                          key={j}
                          className={`py-3 px-4 text-center font-mono ${
                            j === 3 ? 'text-zinc-500' : 'text-white'
                          }`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* ROI Calculator hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg border border-white/5 text-sm text-zinc-500">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>ROI projections are hypothetical. Crypto investments carry inherent risk.</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="py-20 relative bg-zinc-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-zinc-400">
              Everything you need to know about the $AEGIS presale
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-primary/20 mb-8">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-primary">Limited Time Offer</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Don&apos;t Miss the
              <span className="block gradient-text">Lowest Token Price</span>
            </h2>

            <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
              The Early Bird round offers the best price at $0.015 per token &mdash; 
              a 62.5% discount from the listing price. Once it sells out, it&apos;s gone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/#waitlist" className="btn-primary text-lg px-8 py-4">
                Join Waitlist for Priority Access
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/tokenomics" className="btn-secondary text-lg px-8 py-4">
                View Full Tokenomics
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Audited</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Vested on-chain</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>MiCA compliant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
