'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Lock, Database, ArrowRight, CheckCircle2, Shield } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const architectureSteps = [
  {
    id: 'ai-engine',
    label: 'AI Engine',
    icon: Cpu,
    color: '#0066FF',
    description: 'Autonomous AI agents analyze network traffic, user behavior, and transaction patterns in real-time.',
    details: [
      'Neural threat classification',
      'Anomaly detection models',
      'Behavioral pattern analysis',
      'Real-time risk scoring',
    ],
  },
  {
    id: 'zkp-prover',
    label: 'ZK Prover',
    icon: Lock,
    color: '#ADFF2F',
    description: 'Zero-Knowledge circuits generate cryptographic proofs of security status without exposing raw data.',
    details: [
      'Privacy-preserving computation',
      'SNARK proof generation',
      'Data never leaves your network',
      '< 2 second proof time',
    ],
  },
  {
    id: 'l2-contract',
    label: 'L2 Contract',
    icon: Database,
    color: '#8B5CF6',
    description: 'Smart contract on L2 verifies proofs and anchors immutable security verdicts on-chain.',
    details: [
      'Sub-second finality',
      'Minimal gas costs',
      'Immutable audit trail',
      'Cross-chain interop ready',
    ],
  },
]

export default function Architecture() {
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const runDataFlow = () => {
    if (isAnimating) return
    setIsAnimating(true)
    
    // Animate through each step
    setTimeout(() => setActiveStep('ai-engine'), 0)
    setTimeout(() => setActiveStep('zkp-prover'), 1200)
    setTimeout(() => setActiveStep('l2-contract'), 2400)
    setTimeout(() => {
      setActiveStep(null)
      setIsAnimating(false)
    }, 4000)
  }

  return (
    <section id="architecture" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Architecture"
          title="How It Works"
          subtitle="Interactive visualization of the AegisSentinel security pipeline"
        />

        {/* Interactive Architecture Diagram */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ height: '400px' }}>
              <defs>
                <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0066FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ADFF2F" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ADFF2F" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              {/* Line 1: AI Engine -> ZK Prover */}
              <motion.line
                x1="30%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke="url(#flowGradient1)"
                strokeWidth="2"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
              
              {/* Line 2: ZK Prover -> L2 Contract */}
              <motion.line
                x1="50%"
                y1="50%"
                x2="70%"
                y2="50%"
                stroke="url(#flowGradient2)"
                strokeWidth="2"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />

              {/* Animated data packets */}
              {isAnimating && (
                <>
                  <motion.circle
                    r="6"
                    fill="#0066FF"
                    initial={{ cx: '30%', cy: '50%', opacity: 0 }}
                    animate={{ 
                      cx: ['30%', '50%'],
                      cy: '50%',
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  />
                  <motion.circle
                    r="6"
                    fill="#ADFF2F"
                    initial={{ cx: '50%', cy: '50%', opacity: 0 }}
                    animate={{ 
                      cx: ['50%', '70%'],
                      cy: '50%',
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ duration: 1.2, delay: 1.2, ease: 'easeInOut' }}
                  />
                </>
              )}
            </svg>

            {/* Architecture Nodes */}
            <div className="grid grid-cols-3 gap-8 relative z-10" style={{ minHeight: '400px' }}>
              {architectureSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center justify-center"
                >
                  <motion.div
                    className={`relative cursor-pointer transition-all duration-300 ${
                      activeStep === step.id ? 'scale-110' : 'hover:scale-105'
                    }`}
                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                    whileHover={{ y: -5 }}
                  >
                    {/* Glow effect when active */}
                    {activeStep === step.id && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl blur-xl"
                        style={{ backgroundColor: step.color }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                      />
                    )}
                    
                    <div 
                      className={`relative w-32 h-32 rounded-2xl glass border-2 flex flex-col items-center justify-center transition-colors ${
                        activeStep === step.id ? 'border-opacity-100' : 'border-white/10'
                      }`}
                      style={{ borderColor: activeStep === step.id ? step.color : undefined }}
                    >
                      <step.icon 
                        className="w-12 h-12 mb-2" 
                        style={{ color: step.color }}
                      />
                      <span className="text-sm font-semibold">{step.label}</span>
                    </div>
                  </motion.div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {activeStep === step.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="glass rounded-xl p-4 w-full max-w-xs overflow-hidden"
                      >
                        <p className="text-sm text-zinc-400 mb-3">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-lime flex-shrink-0" />
                              <span className="text-zinc-300">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Data Flow Labels */}
            <div className="flex justify-center gap-32 mt-4 text-sm text-zinc-500">
              <span>Threat Data</span>
              <span>ZK Proof</span>
              <span>Verified</span>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {architectureSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector */}
                {index < architectureSteps.length - 1 && (
                  <div className="absolute left-[1.625rem] sm:left-8 top-16 sm:top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-lime/50" />
                )}
                
                <div 
                  className="card cursor-pointer"
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-11 h-11 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${step.color}20`, borderColor: `${step.color}40` }}
                    >
                      <step.icon className="w-5 h-5 sm:w-8 sm:h-8" style={{ color: step.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-lg">{step.label}</h3>
                      <p className="text-sm text-zinc-400">{step.description}</p>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {activeStep === step.id && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-white/10 space-y-2 overflow-hidden"
                      >
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-lime flex-shrink-0" />
                            <span className="text-zinc-300">{detail}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Run Animation Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={runDataFlow}
              disabled={isAnimating}
              className={`btn-primary px-8 py-4 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isAnimating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Shield className="w-5 h-5" />
                  </motion.div>
                  Processing...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Run Data Flow Demo
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
