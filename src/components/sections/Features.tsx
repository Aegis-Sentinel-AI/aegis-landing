'use client'

import { motion } from 'framer-motion'
import { Brain, Shield, Boxes, Check } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const features = [
  {
    icon: Brain,
    title: 'AI Threat Detection',
    description: 'Specialized security LLMs trained on 50M+ threat patterns analyze your network in real-time. Detects zero-days, APTs, and anomalies that rule-based systems miss.',
    benefits: [
      'Fine-tuned SecBERT & CodeLlama models',
      'Behavioral anomaly detection',
      'Natural language threat reports',
    ],
  },
  {
    icon: Shield,
    title: 'Zero-Knowledge Proofs',
    description: 'Prove your security status without revealing sensitive data. Our ZK-SNARK circuits generate cryptographic proofs that verify security claims privately.',
    benefits: [
      'Groth16 proofs (~50k constraints)',
      'GDPR-compliant by design',
      'Proof generation in <2 seconds',
    ],
  },
  {
    icon: Boxes,
    title: 'L2 Blockchain Settlement',
    description: 'Security proofs are verified and recorded on Ethereum L2 (Arbitrum/Base). Immutable audit trails that regulators and stakeholders can trust.',
    benefits: [
      'Low gas costs (~$0.01 per verification)',
      'Tamper-proof audit logs',
      'Cross-chain verification support',
    ],
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Features"
          title="Security Reimagined"
          subtitle="Three technologies, one unified protocol"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="group card card-hover"
            >
              {/* Icon */}
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="w-8 h-8 text-primary" />
              </motion.div>

              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.2 }}
                className="text-xl font-semibold mb-3"
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3 }}
                className="text-zinc-400 mb-6"
              >
                {feature.description}
              </motion.p>

              <ul className="space-y-3">
                {feature.benefits.map((benefit, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.4 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm text-zinc-400"
                  >
                    <Check className="w-4 h-4 text-lime flex-shrink-0" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
