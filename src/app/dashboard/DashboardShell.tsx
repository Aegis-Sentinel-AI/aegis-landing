'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
  Shield,
  LayoutDashboard,
  AlertTriangle,
  Scan,
  Settings,
  Activity,
  Users,
  Database,
  Cloud,
  Menu,
  X,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Key,
} from 'lucide-react'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Threats', href: '/dashboard/threats', icon: AlertTriangle },
  { name: 'Scans', href: '/dashboard/scans', icon: Scan },
  { name: 'Network', href: '/dashboard/network', icon: Activity },
  { name: 'Identity', href: '/dashboard/identity', icon: Users },
  { name: 'Data', href: '/dashboard/data', icon: Database },
  { name: 'Infrastructure', href: '/dashboard/infrastructure', icon: Cloud },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const user = session?.user
  const userName = user?.name ?? 'User'
  const userEmail = user?.email ?? ''

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' })
  }

  const userInitials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'AS'

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 w-64 bg-zinc-900 border-r border-white/10">
          <SidebarContent pathname={pathname} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-zinc-900 border-r border-white/10">
          <SidebarContent pathname={pathname} />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top nav */}
        <header className="sticky top-0 z-40 bg-zinc-900/80 backdrop-blur border-b border-white/10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden sm:block">
                <input
                  type="text"
                  placeholder="Search threats..."
                  className="w-64 px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-zinc-400 hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded-lg hover:bg-zinc-700"
                >
                  <div className="w-8 h-8 bg-lime/20 rounded-full flex items-center justify-center">
                    <span className="text-lime text-sm font-medium">{userInitials}</span>
                  </div>
                  <span className="text-sm text-white hidden sm:block">
                    {userName}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setProfileOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-zinc-800 border border-white/10 rounded-lg shadow-xl z-20 overflow-hidden">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-medium text-white">{userName}</p>
                        <p className="text-xs text-zinc-400 truncate">{userEmail}</p>
                        <span className="inline-flex mt-1 px-2 py-0.5 text-xs bg-lime/10 text-lime rounded-full capitalize">
                          authenticated
                        </span>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          href="/dashboard/settings"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                        >
                          <User className="w-4 h-4" />
                          Profile Settings
                        </Link>
                        <Link
                          href="/dashboard/settings"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                        >
                          <Key className="w-4 h-4" />
                          API Keys
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-white/10 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-white/10">
        <Shield className="w-8 h-8 text-lime" />
        <div>
          <span className="text-lg font-bold text-white">Aegis</span>
          <span className="text-xs text-zinc-400 block">Security Dashboard</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-lime/10 text-lime'
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Trust Score */}
      <div className="p-4 border-t border-white/10">
        <div className="p-4 bg-zinc-800 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400">Trust Score</span>
            <span className="text-xs text-lime">Verified</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white">94</span>
            <span className="text-sm text-zinc-400 mb-1">/100</span>
          </div>
          <div className="mt-2 h-2 bg-zinc-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-lime to-emerald-400 w-[94%]" />
          </div>
        </div>
      </div>
    </>
  )
}
