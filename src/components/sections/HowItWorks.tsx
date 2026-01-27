'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import CodeBlock from '@/components/ui/CodeBlock'

const steps = [
  {
    number: 1,
    title: 'Ingest',
    description: 'Sentinel agents collect security events from your network, cloud, and endpoints.',
    icon: '📡',
  },
  {
    number: 2,
    title: 'Analyze',
    description: 'AI engine processes events, classifies threats, and generates a security report.',
    icon: '🤖',
  },
  {
    number: 3,
    title: 'Prove',
    description: 'ZK-Prover creates a cryptographic proof of the security status — no raw data leaves your network.',
    icon: '🔐',
  },
  {
    number: 4,
    title: 'Verify',
    description: 'L2 smart contract verifies the proof and records the result on-chain forever.',
    icon: '⛓️',
  },
]

const codeExample = `from sentinel import AegisClient

client = AegisClient(api_key="sk_live_...")

# Run a security scan
result = client.scan(
    network="corporate",
    generate_proof=True
)

# Verify on-chain
tx = client.verify_on_chain(result.proof)
print(f"Verified: {tx.hash}")`

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Architecture"
          title="How It Works"
          subtitle="From scan to on-chain verification in under 5 seconds"
        />

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              {/* Card */}
              <div className="card relative pt-10">
                {/* Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/30">
                  {step.number}
                </div>
                
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <CodeBlock code={codeExample} language="python" title="Integration Example" />
        </motion.div>
      </div>
    </section>
  )
}
