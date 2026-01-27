import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import TrustedBy from '@/components/sections/TrustedBy'
import Problem from '@/components/sections/Problem'
import Features from '@/components/sections/Features'
import HowItWorks from '@/components/sections/HowItWorks'
import Tokenomics from '@/components/sections/Tokenomics'
import Roadmap from '@/components/sections/Roadmap'
import Waitlist from '@/components/sections/Waitlist'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Problem />
      <Features />
      <HowItWorks />
      <Tokenomics />
      <Roadmap />
      <Waitlist />
      <Footer />
    </main>
  )
}
