'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Scale, FileCheck, Building2 } from 'lucide-react'

const complianceBadges = [
  { 
    icon: Scale,
    label: 'GDPR',
    sublabel: 'Compliant',
    description: 'Full EU data protection',
    color: '#0066FF'
  },
  { 
    icon: FileCheck,
    label: 'MiCA',
    sublabel: 'Ready',
    description: 'Crypto-asset regulation',
    color: '#ADFF2F'
  },
  { 
    icon: ShieldCheck,
    label: 'SOC 2',
    sublabel: 'Type II',
    description: 'Security audit target',
    color: '#8B5CF6'
  },
  { 
    icon: Building2,
    label: 'NIS2',
    sublabel: 'Aligned',
    description: 'Critical infrastructure',
    color: '#FF6B6B'
  },
]

export default function TrustedBy() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-lime/5 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-sm font-mono font-semibold text-zinc-500 uppercase tracking-widest mb-2">
            Compliance Badge Bar
          </h3>
          <p className="text-lg text-zinc-400">
            Built for regulated enterprises from day one
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {complianceBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6 text-center hover:bg-white/10 transition-all group cursor-default"
            >
              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${badge.color}20` }}
              >
                <badge.icon className="w-7 h-7" style={{ color: badge.color }} />
              </div>
              
              {/* Label */}
              <div className="text-xl font-mono font-bold mb-0.5">{badge.label}</div>
              <div 
                className="text-sm font-mono font-medium uppercase tracking-wide mb-2"
                style={{ color: badge.color }}
              >
                {badge.sublabel}
              </div>
              <div className="text-xs text-zinc-500">{badge.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-zinc-500"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime" />
            Third-party audited
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Privacy by design
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Enterprise-grade SLAs
          </span>
        </motion.div>
      </div>
    </section>
  )
}
