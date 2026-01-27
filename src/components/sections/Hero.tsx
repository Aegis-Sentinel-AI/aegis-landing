'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Zap, Shield } from 'lucide-react'
import Terminal from '@/components/ui/Terminal'

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
          backgroundSize: '60px 60px'
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
              <span className="text-sm text-zinc-400">Now in Private Beta</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
            >
              AI-Powered Security
              <br />
              <span className="gradient-text">Verified On-Chain</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-zinc-400 max-w-xl mb-8"
            >
              AegisSentinel combines real-time AI threat detection with Zero-Knowledge proofs 
              and L2 blockchain verification — delivering enterprise security that's 
              GDPR-compliant and cryptographically verifiable.
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
                href="https://docs.aegissentinel.online/whitepaper"
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
                  <div className="text-2xl lg:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative lg:order-last"
          >
            <Terminal />
            
            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute -top-4 -right-4 glass rounded-lg px-3 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-lime" />
                <span className="text-zinc-400">GDPR Compliant</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-4 -left-4 glass rounded-lg px-3 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-zinc-400">&lt;2s Proof Time</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
