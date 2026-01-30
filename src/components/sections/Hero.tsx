'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Zap, Shield } from 'lucide-react'
import AnimatedShield from '@/components/ui/AnimatedShield'

const stats = [
  { value: '<100ms', label: 'Detection Latency' },
  { value: '99.7%', label: 'Threat Accuracy' },
  { value: 'Zero', label: 'Data Exposure' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
      
      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 102, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
      </div>
      
      {/* Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-lime/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
              </span>
              <span className="text-sm text-zinc-400">Presale Coming Soon</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
            >
              Automated AI Defense
              <br />
              <span className="gradient-text">for the Decentralized Era</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-zinc-400 max-w-xl mb-8"
            >
              AegisSentinel deploys autonomous AI agents that detect threats in real-time, 
              generate Zero-Knowledge proofs, and anchor verifiable security verdicts 
              on L2 — all while keeping your data private and GDPR-compliant.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="#waitlist" className="btn-primary text-base px-8 py-4">
                Get Early Access
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="https://aegis-docs-site.vercel.app/whitepaper"
                target="_blank"
                className="btn-secondary text-base px-8 py-4"
              >
                Read Whitepaper
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-8 lg:gap-12"
            >
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl lg:text-3xl font-mono font-bold tabular-nums">{stat.value}</div>
                  <div className="text-sm text-zinc-500 font-mono uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Animated Shield */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative lg:order-last"
          >
            <AnimatedShield />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
