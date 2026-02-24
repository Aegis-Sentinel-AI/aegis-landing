'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useAccount, useSignMessage, useConnect, useDisconnect } from 'wagmi'
import Link from 'next/link'
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Wallet,
  User,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

type LoginTab = 'email' | 'wallet'

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="animate-pulse text-zinc-400">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}

function LoginContent() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('redirect') || '/dashboard'
  const authError = searchParams.get('error')

  const [activeTab, setActiveTab] = useState<LoginTab>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(authError === 'CredentialsSignin' ? 'Invalid email or password' : '')

  // Wallet connection
  const { address, isConnected } = useAccount()
  const { connectors, connect, isPending: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()
  const [isVerifying, setIsVerifying] = useState(false)
  const [walletSuccess, setWalletSuccess] = useState(false)

  // ── Email login handler ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }

    setIsLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password')
      setIsLoading(false)
    } else {
      window.location.href = callbackUrl
    }
  }

  // ── Wallet login handler ──
  const handleWalletLogin = async () => {
    if (!address) return

    setIsVerifying(true)
    setError('')

    try {
      const message = `Sign this message to authenticate with Aegis Sentinel.\n\nWallet: ${address}\nTimestamp: ${Date.now()}`
      const signature = await signMessageAsync({ message })

      const result = await signIn('wallet', {
        address,
        signature,
        message,
        redirect: false,
      })

      if (result?.error) {
        setError('Wallet authentication failed. Please try again.')
      } else {
        setWalletSuccess(true)
        setTimeout(() => {
          window.location.href = callbackUrl
        }, 1000)
      }
    } catch (err: any) {
      if (err.message?.includes('User rejected')) {
        setError('Signature request was rejected')
      } else {
        setError('Failed to verify wallet. Please try again.')
      }
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-zinc-400 mt-2">Sign in to access your security dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Login Type Tabs */}
          <div className="flex rounded-lg bg-zinc-800/50 p-1 mb-6">
            <button
              onClick={() => { setActiveTab('email'); setError('') }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all ${
                activeTab === 'email'
                  ? 'bg-zinc-700 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <User className="h-4 w-4" />
              Email Login
            </button>
            <button
              onClick={() => { setActiveTab('wallet'); setError('') }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all ${
                activeTab === 'wallet'
                  ? 'bg-zinc-700 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Wallet className="h-4 w-4" />
              Wallet Login
            </button>
          </div>

          {/* ── Wallet Login ── */}
          {activeTab === 'wallet' && (
            <div className="space-y-4">
              {walletSuccess ? (
                <div className="flex flex-col items-center gap-3 py-8">
                  <CheckCircle2 className="w-12 h-12 text-lime" />
                  <p className="text-white font-medium">Wallet verified!</p>
                  <p className="text-zinc-400 text-sm">Redirecting to dashboard...</p>
                </div>
              ) : !isConnected ? (
                <div className="space-y-3">
                  <p className="text-zinc-400 text-sm text-center mb-4">Connect your wallet to sign in</p>
                  {connectors.map((connector) => (
                    <button
                      key={connector.uid}
                      onClick={() => connect({ connector })}
                      disabled={isConnecting}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-lg text-white transition-colors disabled:opacity-50"
                    >
                      <Wallet className="w-5 h-5" />
                      <span>{connector.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-800/50 border border-white/10 rounded-lg">
                    <p className="text-zinc-400 text-xs mb-1">Connected Wallet</p>
                    <p className="text-white font-mono text-sm">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                  </div>
                  <button
                    onClick={handleWalletLogin}
                    disabled={isVerifying}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-lime hover:bg-lime/90 text-zinc-900 font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isVerifying ? (
                      <div className="w-5 h-5 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Sign message to verify</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => disconnect()}
                    className="w-full text-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    Disconnect wallet
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Email Login ── */}
          {activeTab === 'email' && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime/50 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-zinc-400">
                  Password
                </label>
                <Link href="#" className="text-sm text-lime hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime/50 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 bg-zinc-800 border border-white/20 rounded text-lime focus:ring-lime/50 focus:ring-offset-0"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-zinc-400">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-lime hover:bg-lime/90 text-zinc-900 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          )}

          {/* Demo Credentials removed — real admin account seeded via prisma db seed */}
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-zinc-400 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="#waitlist" className="text-lime hover:underline">
            Join the waitlist
          </Link>
        </p>

        {/* Footer Links */}
        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-zinc-500">
          <Link href="/privacy" className="hover:text-zinc-300">Privacy</Link>
          <Link href="/terms" className="hover:text-zinc-300">Terms</Link>
          <Link href="/" className="hover:text-zinc-300">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
