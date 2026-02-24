'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [waitlistCount, setWaitlistCount] = useState(847)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      // Success
      setStatus('success')
      setWaitlistCount((prev) => prev + 1)
      setEmail('')

      setTimeout(() => setStatus('idle'), 4000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="waitlist" className="py-24 lg:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative glass border border-white/10 rounded-2xl text-center p-10 lg:p-16 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-lime/20 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Join the Presale Waitlist
              </h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                Get early access to the $AEGIS token presale on PinkSale. 
                Exclusive pricing for waitlist members.
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
                    className="flex-1 px-5 py-4 glass border border-white/10 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
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
                        <CheckCircle2 className="w-5 h-5 text-lime" />
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
                {status === 'error' && (
                  <p className="text-xs text-red-400 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errorMessage}
                  </p>
                )}
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
