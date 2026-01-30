import Link from 'next/link'
import { Shield, Twitter, Github, MessageCircle } from 'lucide-react'

const footerLinks = {
  protocol: [
    { label: 'Features', href: '#features' },
    { label: 'Architecture', href: '#how-it-works' },
    { label: 'Tokenomics', href: '#tokenomics' },
    { label: 'Roadmap', href: '#roadmap' },
  ],
  developers: [
    { label: 'Documentation', href: 'https://docs.aegissentinel.online', external: true },
    { label: 'API Reference', href: 'https://docs.aegissentinel.online/api-reference', external: true },
    { label: 'GitHub', href: 'https://github.com/Aegis-Sentinel-AI', external: true },
    { label: 'Contributing', href: 'https://github.com/Aegis-Sentinel-AI/aegis-docs/blob/main/CONTRIBUTING.md', external: true },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: 'mailto:contact@aegissentinel.online' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Compliance', href: 'https://docs.aegissentinel.online/compliance', external: true },
    { label: 'Security', href: 'https://github.com/Aegis-Sentinel-AI/aegis-docs/security/policy', external: true },
  ],
}

const socialLinks = [
  { icon: Twitter, href: 'https://x.com/AegisSentinelAi', label: 'X' },
  { icon: MessageCircle, href: 'https://discord.gg/aegissentinel', label: 'Discord' },
  { icon: Github, href: 'https://github.com/Aegis-Sentinel-AI', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">AegisSentinel</span>
            </Link>
            <p className="text-zinc-400 text-sm mb-6 max-w-xs">
              AI-driven cybersecurity for the decentralized era. GDPR & MiCA compliant.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Protocol</h4>
            <ul className="space-y-3">
              {footerLinks.protocol.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Developers</h4>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© 2026 AegisSentinel. All rights reserved.</p>
          <p>Built with 🛡️ in Norway</p>
        </div>
      </div>
    </footer>
  )
}
