'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Chrome,
  Github,
} from 'lucide-react'

function setAuthCookie(data: Record<string, unknown>) {
  document.cookie = `aegis_auth_token=${btoa(JSON.stringify(data))};path=/;max-age=${60 * 60 * 24 * 7};samesite=lax`
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Demo credentials check (in production, this would be a real auth call)
    const searchParams = new URLSearchParams(window.location.search)
    const redirect = searchParams.get('redirect') || '/dashboard'

    if (email === 'demo@aegissentinel.online' && password === 'demo123') {
      const authData = { email, name: 'Demo User', role: 'admin', authenticated: true }
      localStorage.setItem('aegis_auth', JSON.stringify(authData))
      setAuthCookie(authData)
      router.push(redirect)
    } else if (email && password) {
      const authData = { email, name: email.split('@')[0], role: 'viewer', authenticated: true }
      localStorage.setItem('aegis_auth', JSON.stringify(authData))
      setAuthCookie(authData)
      router.push(redirect)
    } else {
      setError('Please enter both email and password')
      setIsLoading(false)
    }
  }

  const handleSSOLogin = (provider: string) => {
    // In production, this would redirect to OAuth flow
    const searchParams = new URLSearchParams(window.location.search)
    const redirect = searchParams.get('redirect') || '/dashboard'
    const authData = { email: `sso-user@${provider}.com`, name: `${provider} User`, role: 'admin', authenticated: true }
    localStorage.setItem('aegis_auth', JSON.stringify(authData))
    setAuthCookie(authData)
    router.push(redirect)
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
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* SSO Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSSOLogin('google')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-lg text-white transition-colors"
            >
              <Chrome className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
            <button
              onClick={() => handleSSOLogin('github')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-lg text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-zinc-900/50 text-zinc-500">or continue with email</span>
            </div>
          </div>

          {/* Form */}
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

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-lime/5 border border-lime/20 rounded-lg">
            <p className="text-sm text-lime font-medium mb-1">Demo Credentials</p>
            <p className="text-xs text-zinc-400">
              Email: <code className="text-zinc-300">demo@aegissentinel.online</code>
              <br />
              Password: <code className="text-zinc-300">demo123</code>
            </p>
          </div>
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
