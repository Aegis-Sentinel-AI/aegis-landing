'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#features', label: 'Features' },
  { href: '#tokenomics', label: 'Tokenomics' },
  { href: '/presale', label: 'Presale', highlight: true },
  { href: '/login', label: 'Portal' },
  { href: 'https://docs.aegissentinel.online', label: 'Docs', external: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'glass border-b border-white/10' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold whitespace-nowrap">AegisSentinel</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link, i) => {
              // Add a subtle separator before the first external link
              const prevLink = navLinks[i - 1]
              const showDivider = link.external && prevLink && !prevLink.external

              return (
                <div key={link.href} className="flex items-center">
                  {showDivider && (
                    <div className="w-px h-4 bg-white/10 mx-3" />
                  )}
                  {link.highlight ? (
                    <Link
                      href={link.href}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-lime/20 bg-lime/5 text-lime text-sm font-semibold hover:bg-lime/10 hover:border-lime/40 transition-all whitespace-nowrap mx-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group whitespace-nowrap px-3 py-1.5"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </Link>
                  )}
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden xl:block flex-shrink-0">
            <Link href="#waitlist" className="btn-primary text-sm whitespace-nowrap">
              Join Waitlist
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden glass border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="block py-2 text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#waitlist"
                className="btn-primary w-full justify-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Waitlist
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
