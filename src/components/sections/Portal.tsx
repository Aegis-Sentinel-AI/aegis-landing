'use client'

import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Shield, 
  Activity, 
  Bell, 
  BarChart3, 
  Key,
  ArrowRight,
  Check
} from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Link from 'next/link'

const portalFeatures = [
  {
    icon: LayoutDashboard,
    title: 'Real-time Dashboard',
    description: 'Monitor your security posture with live trust scores and threat metrics',
  },
  {
    icon: Shield,
    title: 'Security Scans',
    description: 'Initiate comprehensive scans and track results in real-time',
  },
  {
    icon: Activity,
    title: 'Threat Monitoring',
    description: 'Track active threats with severity filtering and detailed analysis',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Visual representation of security metrics over time',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Configure alerts for critical security events',
  },
  {
    icon: Key,
    title: 'API Access',
    description: 'Integrate Aegis Sentinel into your existing workflows',
  },
]

// Example dashboard preview (not live data)
const dashboardStats = [
  { label: 'Trust Score', value: '94%', color: 'text-emerald-400' },
  { label: 'Threats Found', value: '3', color: 'text-amber-400' },
  { label: 'Scans Run', value: '12', color: 'text-primary' },
  { label: 'Uptime', value: '99.9%', color: 'text-emerald-400' },
]

export default function Portal() {
  return (
    <section id="portal" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Enterprise Portal"
          title="Your Security Command Center"
          subtitle="Access the full power of Aegis Sentinel through our enterprise dashboard"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            {/* Dashboard mockup */}
            <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 shadow-2xl">
              {/* Window controls */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs text-zinc-500">portal.aegissentinel.online</span>
              </div>

              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Aegis Sentinel</h4>
                    <p className="text-xs text-zinc-500">Enterprise Dashboard</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-zinc-400">Preview</span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
                {dashboardStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-zinc-800/50 rounded-lg p-2 sm:p-3 text-center"
                  >
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-zinc-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Chart placeholder */}
              <div className="bg-zinc-800/50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-zinc-400">Security Score Trend</span>
                  <span className="text-xs text-primary">Last 7 days</span>
                </div>
                <div className="flex items-end gap-1 h-16">
                  {[65, 72, 68, 85, 78, 92, 94].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                      className="flex-1 bg-gradient-to-t from-primary/50 to-primary rounded-t"
                    />
                  ))}
                </div>
              </div>

              {/* Threat list preview */}
              <div className="space-y-2">
                {[
                  { level: 'Critical', color: 'bg-red-500', name: 'Suspicious API calls detected' },
                  { level: 'Medium', color: 'bg-amber-500', name: 'Unusual login pattern' },
                ].map((threat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-3 bg-zinc-800/30 rounded-lg px-3 py-2"
                  >
                    <div className={`w-2 h-2 rounded-full ${threat.color}`} />
                    <span className="text-xs text-zinc-400 flex-1">{threat.name}</span>
                    <span className="text-xs text-zinc-500">{threat.level}</span>
                  </motion.div>
                ))}
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Decorative floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:flex absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-2xl border border-primary/20 backdrop-blur-sm items-center justify-center"
            >
              <Activity className="w-8 h-8 text-primary" />
            </motion.div>
          </motion.div>

          {/* Right side - Features & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Everything you need to secure your enterprise
            </h3>
            <p className="text-zinc-400 mb-8">
              Our enterprise portal provides a comprehensive view of your security landscape. 
              Monitor threats, run scans, and manage your subscription all in one place.
            </p>

            {/* Feature list */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {portalFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-zinc-500">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 mb-8">
              {['Web3 Wallet Login', 'On-chain Subscriptions', 'Real-time Updates'].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                  <Check className="w-4 h-4 text-primary" />
                  {benefit}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://portal.aegissentinel.online"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                Access Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="https://docs.aegissentinel.online"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors border border-zinc-700"
              >
                View Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
