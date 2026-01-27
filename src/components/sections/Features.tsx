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
    <section id="features" className="py-24 lg:py-32 bg-background-elevated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Features"
          title="Security Reimagined"
          subtitle="Three technologies, one unified protocol"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative bg-background border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-zinc-400 mb-6">{feature.description}</p>

              <ul className="space-y-3">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
