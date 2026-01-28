import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import TrustedBy from '@/components/sections/TrustedBy'
import Problem from '@/components/sections/Problem'
import Features from '@/components/sections/Features'
import Architecture from '@/components/sections/Architecture'
import Tokenomics from '@/components/sections/Tokenomics'
import Roadmap from '@/components/sections/Roadmap'
import Waitlist from '@/components/sections/Waitlist'
import Footer from '@/components/layout/Footer'
import AmbientBackground from '@/components/ui/AmbientBackground'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <AmbientBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TrustedBy />
        <Problem />
        <Architecture />
        <Features />
        <Tokenomics />
        <Roadmap />
        <Waitlist />
        <Footer />
      </div>
    </main>
  )
}
