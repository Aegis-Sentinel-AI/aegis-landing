'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, MessageCircle } from 'lucide-react'

export default function CommunityJoin() {
  return (
    <section id="community" className="py-24 lg:py-32 relative">
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
                Join the Community
              </h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                Early Bird is LIVE at $0.015/token on Arbitrum One. Join our Discord for 
                real-time updates, security alerts, and direct access to the team.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="https://discord.gg/aG5XwyV7sV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-4 justify-center"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join Discord
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/early-bird.html"
                  className="btn-secondary px-8 py-4 justify-center"
                >
                  <Shield className="w-5 h-5" />
                  Early Bird Details
                </Link>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-zinc-400">
                <span>
                  <strong className="text-white">$0.015</strong>/token
                </span>
                <span>•</span>
                <span>
                  <strong className="text-white">62.5%</strong> off listing
                </span>
                <span>•</span>
                <span>
                  <strong className="text-white">Arbitrum One</strong>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
