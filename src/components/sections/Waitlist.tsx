'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [waitlistCount, setWaitlistCount] = useState(847)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call - replace with actual endpoint
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Success
    setStatus('success')
    setWaitlistCount((prev) => prev + 1)
    setEmail('')

    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="waitlist" className="py-24 lg:py-32 bg-background-elevated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative card text-center p-10 lg:p-16 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Join the Private Beta
              </h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                Be among the first enterprises to experience AI-verified cybersecurity. 
                Limited spots available.
              </p>

              <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className="flex-1 px-5 py-4 bg-background border border-border rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="btn-primary px-8 py-4 justify-center disabled:opacity-80"
                  >
                    {status === 'loading' && (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Joining...
                      </>
                    )}
                    {status === 'success' && (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        You're In!
                      </>
                    )}
                    {(status === 'idle' || status === 'error') && (
                      <>
                        Join Waitlist
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-zinc-500 mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </form>

              <div className="flex items-center justify-center gap-4 text-sm text-zinc-400">
                <span>
                  <strong className="text-white">{waitlistCount.toLocaleString()}</strong> on waitlist
                </span>
                <span>•</span>
                <span>
                  <strong className="text-white">12</strong> enterprise pilots
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
