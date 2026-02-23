'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  RefreshCw,
  X,
  ChevronRight,
  Globe,
  Brain,
  Sparkles,
  Layers,
  ArrowRight,
  Target,
  Server,
  Lock,
  Eye,
  BarChart3,
  PieChart,
  MapPin,
  ExternalLink,
  Filter,
  Download,
  Play,
  Pause,
} from 'lucide-react'

// =============================================================================
// DATA & TYPES
// =============================================================================

interface Metric {
  trustScore: number
  threatsBlocked: number
  scansCompleted: number
  activeAlerts: number
  detectionLatency: number
  systemsProtected: number
}

interface Threat {
  id: number
  type: string
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info'
  source: string
  time: string
  timestamp: number
  status: 'blocked' | 'investigating' | 'resolved'
  confidence: number
  aiInsight: string
  mitre: string
  category: string
  affectedSystems: string[]
}

interface GeoAttack {
  country: string
  code: string
  attacks: number
  lat: number
  lng: number
  intensity: 'critical' | 'high' | 'medium' | 'low'
}

const generateMetrics = (): Metric => ({
  trustScore: Math.floor(Math.random() * 8) + 90,
  threatsBlocked: Math.floor(Math.random() * 50) + 180,
  scansCompleted: Math.floor(Math.random() * 20) + 95,
  activeAlerts: Math.floor(Math.random() * 4) + 3,
  detectionLatency: Math.floor(Math.random() * 30) + 45,
  systemsProtected: 847,
})

const threatCategories = [
  { name: 'Network', count: 12, color: '#3B82F6', icon: Globe },
  { name: 'Identity', count: 15, color: '#F97316', icon: Lock },
  { name: 'Application', count: 8, color: '#A855F7', icon: Server },
  { name: 'Data', count: 5, color: '#EF4444', icon: Eye },
  { name: 'Infrastructure', count: 3, color: '#06B6D4', icon: Server },
]

const geoAttackData: GeoAttack[] = [
  { country: 'Russia', code: 'RU', attacks: 2847, lat: 61.52, lng: 105.31, intensity: 'critical' },
  { country: 'China', code: 'CN', attacks: 2156, lat: 35.86, lng: 104.19, intensity: 'critical' },
  { country: 'United States', code: 'US', attacks: 1243, lat: 37.09, lng: -95.71, intensity: 'high' },
  { country: 'Brazil', code: 'BR', attacks: 876, lat: -14.23, lng: -51.92, intensity: 'high' },
  { country: 'India', code: 'IN', attacks: 654, lat: 20.59, lng: 78.96, intensity: 'medium' },
  { country: 'Germany', code: 'DE', attacks: 432, lat: 51.16, lng: 10.45, intensity: 'medium' },
  { country: 'Netherlands', code: 'NL', attacks: 387, lat: 52.13, lng: 5.29, intensity: 'medium' },
  { country: 'Iran', code: 'IR', attacks: 198, lat: 32.42, lng: 53.68, intensity: 'low' },
]

const recentThreats: Threat[] = [
  {
    id: 1,
    type: 'DDoS Attack',
    severity: 'critical',
    source: '185.220.102.240',
    time: '1 min ago',
    timestamp: Date.now() - 60000,
    status: 'blocked',
    confidence: 97,
    category: 'Network',
    aiInsight: 'Coordinated volumetric attack from 847 distinct IPs targeting port 443. Traffic spike of 12.4 Gbps detected. Attack signature matches Mirai botnet variant.',
    mitre: 'T1498',
    affectedSystems: ['API Gateway', 'Load Balancer', 'CDN Edge'],
  },
  {
    id: 2,
    type: 'Credential Stuffing',
    severity: 'critical',
    source: '45.33.32.156',
    time: '3 min ago',
    timestamp: Date.now() - 180000,
    status: 'blocked',
    confidence: 94,
    category: 'Identity',
    aiInsight: '2,847 login attempts in 2 minutes using credentials from known breach database. Pattern consistent with automated credential stuffing attack.',
    mitre: 'T1110.004',
    affectedSystems: ['Auth Service', 'User Portal'],
  },
  {
    id: 3,
    type: 'Lateral Movement',
    severity: 'high',
    source: '10.0.0.45',
    time: '7 min ago',
    timestamp: Date.now() - 420000,
    status: 'investigating',
    confidence: 89,
    category: 'Network',
    aiInsight: 'Internal host scanning adjacent subnets using SMB and RDP protocols. 23 hosts contacted in 5 minutes. Pattern indicates potential compromised workstation.',
    mitre: 'T1021',
    affectedSystems: ['Workstation WS-FIN-042', 'Domain Controller'],
  },
  {
    id: 4,
    type: 'DNS Tunneling',
    severity: 'high',
    source: '10.0.1.88',
    time: '12 min ago',
    timestamp: Date.now() - 720000,
    status: 'blocked',
    confidence: 92,
    category: 'Data',
    aiInsight: 'Anomalous DNS query patterns to suspicious.domain.xyz. High entropy in TXT record responses suggests data exfiltration via DNS channel.',
    mitre: 'T1071.004',
    affectedSystems: ['Endpoint EP-DEV-019', 'Internal DNS'],
  },
  {
    id: 5,
    type: 'Port Scanning',
    severity: 'medium',
    source: '192.168.1.105',
    time: '18 min ago',
    timestamp: Date.now() - 1080000,
    status: 'resolved',
    confidence: 82,
    category: 'Network',
    aiInsight: 'Sequential port scanning detected from external IP. 1,847 ports probed in 3 minutes. Reconnaissance phase of potential attack.',
    mitre: 'T1046',
    affectedSystems: ['Perimeter Firewall', 'Public Web Server'],
  },
]

const aiInsights = [
  {
    id: 'insight_1',
    title: 'Attack Pattern Detected',
    severity: 'critical',
    confidence: 97,
    summary: 'Coordinated attack campaign targeting authentication endpoints. 3 distinct threat actors identified using similar TTPs.',
    recommendation: 'Enable enhanced rate limiting on /api/auth/* endpoints and deploy CAPTCHA challenge.',
    timeDetected: '15 min ago',
  },
  {
    id: 'insight_2',
    title: 'Anomalous Data Flow',
    severity: 'high',
    confidence: 91,
    summary: 'Unusual outbound data transfer detected from finance subnet. 2.3GB transferred to unknown external IP in last hour.',
    recommendation: 'Investigate source host 10.0.5.42 and temporarily restrict egress traffic from subnet.',
    timeDetected: '32 min ago',
  },
  {
    id: 'insight_3',
    title: 'Privilege Escalation Risk',
    severity: 'medium',
    confidence: 86,
    summary: 'Service account svc_backup has accumulated excessive permissions across 12 systems. Potential blast radius if compromised.',
    recommendation: 'Review and minimize permissions. Apply principle of least privilege.',
    timeDetected: '1 hour ago',
  },
]

// =============================================================================
// COMPONENTS
// =============================================================================

function MetricCard({
  title,
  value,
  suffix,
  icon: Icon,
  trend,
  trendLabel,
  color,
  pulsing = false,
  onClick,
}: {
  title: string
  value: number | string
  suffix?: string
  icon: React.ElementType
  trend?: number
  trendLabel?: string
  color: 'lime' | 'red' | 'blue' | 'orange' | 'cyan' | 'purple'
  pulsing?: boolean
  onClick?: () => void
}) {
  const colorClasses = {
    lime: { bg: 'bg-lime/10', text: 'text-lime', border: 'border-lime/20', glow: 'shadow-lime/20' },
    red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', glow: 'shadow-red-500/20' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', glow: 'shadow-blue-500/20' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', glow: 'shadow-orange-500/20' },
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20', glow: 'shadow-cyan-500/20' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', glow: 'shadow-purple-500/20' },
  }

  const c = colorClasses[color]

  return (
    <div
      onClick={onClick}
      className={`relative bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-white/20 hover:shadow-lg ${
        onClick ? 'cursor-pointer hover:-translate-y-1' : ''
      } ${pulsing ? `shadow-lg ${c.glow}` : ''}`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${c.bg} opacity-30 rounded-2xl`} />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-zinc-400">{title}</span>
          <div
            className={`p-2.5 rounded-xl ${c.bg} ${c.text} transition-all duration-300 ${
              pulsing ? 'animate-pulse scale-110' : ''
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-end gap-2 mb-2">
          <span className="text-4xl font-bold text-white tracking-tight">{value}</span>
          {suffix && <span className="text-lg text-zinc-400 mb-1">{suffix}</span>}
        </div>

        {trend !== undefined && (
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                trend > 0 ? 'bg-lime/10 text-lime' : 'bg-red-500/10 text-red-400'
              }`}
            >
              {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend > 0 ? '+' : ''}
              {trend}%
            </div>
            {trendLabel && <span className="text-xs text-zinc-500">{trendLabel}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

function ThreatDonutChart({
  data,
  onCategoryClick,
}: {
  data: typeof threatCategories
  onCategoryClick: (category: (typeof threatCategories)[0]) => void
}) {
  const total = data.reduce((sum, cat) => sum + cat.count, 0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Calculate donut segments
  let currentAngle = -90
  const segments = data.map((cat, index) => {
    const percentage = (cat.count / total) * 100
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    currentAngle += angle

    return {
      ...cat,
      percentage,
      startAngle,
      endAngle: currentAngle,
      index,
    }
  })

  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = (angle * Math.PI) / 180
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    }
  }

  const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(cx, cy, r, endAngle)
    const end = polarToCartesian(cx, cy, r, startAngle)
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
  }

  return (
    <div className="flex items-center gap-8">
      {/* Donut Chart */}
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <defs>
            {segments.map((seg) => (
              <filter key={`glow-${seg.index}`} id={`glow-${seg.index}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {segments.map((seg) => (
            <path
              key={seg.index}
              d={describeArc(100, 100, hoveredIndex === seg.index ? 75 : 70, seg.startAngle, seg.endAngle)}
              fill="none"
              stroke={seg.color}
              strokeWidth={hoveredIndex === seg.index ? 24 : 20}
              strokeLinecap="round"
              className="transition-all duration-300 cursor-pointer"
              style={{
                filter: hoveredIndex === seg.index ? `url(#glow-${seg.index})` : 'none',
              }}
              onMouseEnter={() => setHoveredIndex(seg.index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onCategoryClick(seg)}
            />
          ))}

          {/* Center Text */}
          <text x="100" y="92" textAnchor="middle" className="fill-white text-3xl font-bold">
            {total}
          </text>
          <text x="100" y="115" textAnchor="middle" className="fill-zinc-400 text-sm">
            Threats
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {segments.map((seg) => (
          <div
            key={seg.index}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
              hoveredIndex === seg.index ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
            onMouseEnter={() => setHoveredIndex(seg.index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onCategoryClick(seg)}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-sm text-zinc-300 w-24">{seg.name}</span>
            <span className="text-sm font-medium text-white">{seg.count}</span>
            <span className="text-xs text-zinc-500">({seg.percentage.toFixed(0)}%)</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ThreatRow({ threat, onClick }: { threat: Threat; onClick: () => void }) {
  const severityStyles = {
    critical: 'bg-red-500/10 border-red-500/30 text-red-400',
    high: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    medium: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    low: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    info: 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400',
  }

  const statusStyles = {
    blocked: 'text-lime',
    investigating: 'text-orange-400',
    resolved: 'text-zinc-400',
  }

  return (
    <tr
      className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full ${
              threat.severity === 'critical'
                ? 'bg-red-500 animate-pulse'
                : threat.severity === 'high'
                ? 'bg-orange-500'
                : threat.severity === 'medium'
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            }`}
          />
          <span className="text-sm font-medium text-white">{threat.type}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border ${severityStyles[threat.severity]}`}>
          {threat.severity}
        </span>
      </td>
      <td className="px-4 py-4">
        <ConfidenceBadge confidence={threat.confidence} />
      </td>
      <td className="px-4 py-4">
        <code className="text-sm text-zinc-400 font-mono bg-zinc-800/50 px-2 py-1 rounded">
          {threat.source}
        </code>
      </td>
      <td className="px-4 py-4">
        <span className="text-xs text-zinc-500 font-mono bg-zinc-800/50 px-2 py-1 rounded">
          {threat.mitre}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Clock className="w-3.5 h-3.5" />
          {threat.time}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className={`flex items-center gap-2 text-sm ${statusStyles[threat.status]}`}>
          {threat.status === 'blocked' && <CheckCircle className="w-4 h-4" />}
          {threat.status === 'investigating' && <Activity className="w-4 h-4 animate-pulse" />}
          {threat.status === 'resolved' && <CheckCircle className="w-4 h-4" />}
          {threat.status}
        </div>
      </td>
      <td className="px-4 py-4">
        <ChevronRight className="w-4 h-4 text-zinc-500" />
      </td>
    </tr>
  )
}

function ConfidenceBadge({ confidence }: { confidence: number }) {
  const getColor = () => {
    if (confidence >= 90) return { ring: 'stroke-lime', text: 'text-lime', bg: 'bg-lime' }
    if (confidence >= 80) return { ring: 'stroke-blue-400', text: 'text-blue-400', bg: 'bg-blue-400' }
    if (confidence >= 70) return { ring: 'stroke-yellow-400', text: 'text-yellow-400', bg: 'bg-yellow-400' }
    return { ring: 'stroke-zinc-400', text: 'text-zinc-400', bg: 'bg-zinc-400' }
  }

  const colors = getColor()
  const circumference = 2 * Math.PI * 12
  const strokeDashoffset = circumference - (confidence / 100) * circumference

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8">
        <svg className="w-8 h-8 -rotate-90">
          <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-700" />
          <circle
            cx="16"
            cy="16"
            r="12"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            className={colors.ring}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>
        {confidence >= 90 && (
          <div className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 ${colors.bg} rounded-full animate-pulse`} />
        )}
      </div>
      <span className={`text-sm font-medium ${colors.text}`}>{confidence}%</span>
    </div>
  )
}

function GeoHeatMap({
  data,
  onCountryClick,
}: {
  data: GeoAttack[]
  onCountryClick: (country: GeoAttack) => void
}) {
  const maxAttacks = Math.max(...data.map((d) => d.attacks))

  const intensityStyles = {
    critical: 'bg-red-500 shadow-red-500/50',
    high: 'bg-orange-500 shadow-orange-500/50',
    medium: 'bg-yellow-500 shadow-yellow-500/50',
    low: 'bg-blue-500 shadow-blue-500/50',
  }

  return (
    <div className="space-y-4">
      {/* Simple Bar Chart Representation */}
      <div className="space-y-3">
        {data.slice(0, 6).map((country, index) => (
          <div
            key={country.code}
            className="group cursor-pointer"
            onClick={() => onCountryClick(country)}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500 w-4">{index + 1}</span>
                <MapPin
                  className={`w-4 h-4 ${
                    country.intensity === 'critical'
                      ? 'text-red-400'
                      : country.intensity === 'high'
                      ? 'text-orange-400'
                      : country.intensity === 'medium'
                      ? 'text-yellow-400'
                      : 'text-blue-400'
                  }`}
                />
                <span className="text-sm text-white font-medium group-hover:text-lime transition-colors">
                  {country.country}
                </span>
              </div>
              <span className="text-sm font-mono text-zinc-400">{country.attacks.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden ml-7">
              <div
                className={`h-full rounded-full transition-all duration-500 group-hover:opacity-100 opacity-80 ${
                  intensityStyles[country.intensity]
                }`}
                style={{ width: `${(country.attacks / maxAttacks) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
        <span className="text-xs text-zinc-500">Intensity:</span>
        {(['critical', 'high', 'medium', 'low'] as const).map((level) => (
          <div key={level} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${intensityStyles[level].split(' ')[0]}`} />
            <span className="text-xs text-zinc-400 capitalize">{level}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AIInsightCard({ insight, onClick }: { insight: (typeof aiInsights)[0]; onClick: () => void }) {
  const severityStyles = {
    critical: 'border-red-500/30 bg-red-500/5',
    high: 'border-orange-500/30 bg-orange-500/5',
    medium: 'border-yellow-500/30 bg-yellow-500/5',
    low: 'border-blue-500/30 bg-blue-500/5',
  }

  return (
    <div
      className={`p-4 rounded-xl border ${severityStyles[insight.severity as keyof typeof severityStyles]} cursor-pointer hover:border-lime/30 transition-all duration-300 group`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-lime" />
          <span className="text-sm font-medium text-white">{insight.title}</span>
        </div>
        <ConfidenceBadge confidence={insight.confidence} />
      </div>
      <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{insight.summary}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">{insight.timeDetected}</span>
        <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-lime group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  )
}

// =============================================================================
// MODALS
// =============================================================================

function ThreatDetailModal({ threat, onClose }: { threat: Threat | null; onClose: () => void }) {
  if (!threat) return null

  const severityStyles = {
    critical: 'bg-red-500/10 border-red-500/30 text-red-400',
    high: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    medium: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    low: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    info: 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400',
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-white/10 sticky top-0 bg-zinc-900 z-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${severityStyles[threat.severity]}`}>
                  {threat.severity}
                </span>
                <span className="text-xs text-zinc-500 font-mono bg-zinc-800 px-2 py-1 rounded">{threat.mitre}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{threat.type}</h3>
              <p className="text-sm text-zinc-400 mt-1">{threat.category} Threat</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Key Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <span className="text-xs text-zinc-500 block mb-1">Source IP</span>
              <code className="text-sm text-white font-mono">{threat.source}</code>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <span className="text-xs text-zinc-500 block mb-1">Detected</span>
              <span className="text-sm text-white">{threat.time}</span>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <span className="text-xs text-zinc-500 block mb-1">AI Confidence</span>
              <ConfidenceBadge confidence={threat.confidence} />
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <span className="text-xs text-zinc-500 block mb-1">Status</span>
              <div className={`flex items-center gap-2 text-sm ${
                threat.status === 'blocked' ? 'text-lime' : threat.status === 'investigating' ? 'text-orange-400' : 'text-zinc-400'
              }`}>
                {threat.status === 'blocked' && <CheckCircle className="w-4 h-4" />}
                {threat.status === 'investigating' && <Activity className="w-4 h-4 animate-pulse" />}
                <span className="capitalize">{threat.status}</span>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-lime/5 border border-lime/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-lime" />
              <span className="font-medium text-lime">AI Analysis</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">{threat.aiInsight}</p>
          </div>

          {/* Affected Systems */}
          <div>
            <h4 className="text-sm font-medium text-zinc-400 mb-3">Affected Systems</h4>
            <div className="flex flex-wrap gap-2">
              {threat.affectedSystems.map((system, i) => (
                <span key={i} className="px-3 py-1.5 bg-zinc-800 border border-white/10 rounded-lg text-sm text-white">
                  {system}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <button className="flex-1 py-3 px-4 bg-lime hover:bg-lime/90 text-zinc-900 font-semibold rounded-xl transition-colors">
              Take Action
            </button>
            <button className="py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors">
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AIInsightsPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[440px] z-50 transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-zinc-900/90 backdrop-blur-xl border-l border-white/10" />

        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-lime/10 rounded-xl">
                <Brain className="w-5 h-5 text-lime" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Insights</h3>
                <span className="text-xs text-zinc-400">Real-time threat analysis</span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className="bg-zinc-800/50 border border-white/5 rounded-xl p-5 hover:border-lime/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${
                      insight.severity === 'critical'
                        ? 'bg-red-500/10 border-red-500/30 text-red-400'
                        : insight.severity === 'high'
                        ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                        : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                    }`}
                  >
                    <AlertTriangle className="w-3 h-3" />
                    {insight.severity}
                  </span>
                  <ConfidenceBadge confidence={insight.confidence} />
                </div>

                <h4 className="text-sm font-medium text-white mb-2">{insight.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">{insight.summary}</p>

                <div className="bg-zinc-900/50 rounded-lg p-3 border-l-2 border-lime">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3 h-3 text-lime" />
                    <span className="text-xs font-medium text-lime">Recommendation</span>
                  </div>
                  <p className="text-xs text-zinc-300">{insight.recommendation}</p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                  <span className="text-xs text-zinc-500">{insight.timeDetected}</span>
                  <button className="text-xs text-lime hover:underline">View Details →</button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <button className="w-full py-3 bg-lime/10 hover:bg-lime/20 border border-lime/30 rounded-xl text-lime text-sm font-medium transition-colors flex items-center justify-center gap-2">
              View All Insights
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// =============================================================================
// MAIN DASHBOARD
// =============================================================================

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metric>(generateMetrics())
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<(typeof threatCategories)[0] | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<GeoAttack | null>(null)
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const [alertPulsing, setAlertPulsing] = useState(false)
  const prevAlertsRef = useRef(metrics.activeAlerts)

  // Real-time updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      const newMetrics = generateMetrics()

      // Check if alerts increased
      if (newMetrics.activeAlerts > prevAlertsRef.current) {
        setAlertPulsing(true)
        setTimeout(() => setAlertPulsing(false), 3000)
      }
      prevAlertsRef.current = newMetrics.activeAlerts

      setMetrics(newMetrics)
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [isLive])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Security Overview</h1>
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
            <button
              onClick={() => setIsLive(!isLive)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                isLive
                  ? 'bg-lime/10 border-lime/30 text-lime'
                  : 'bg-zinc-800 border-white/10 text-zinc-400'
              }`}
            >
              {isLive ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
                  </span>
                  Live
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3" />
                  Paused
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAiPanelOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-lime/10 hover:bg-lime/20 border border-lime/30 rounded-xl text-lime text-sm font-medium transition-colors"
          >
            <Brain className="w-4 h-4" />
            AI Insights
            <span className="px-1.5 py-0.5 bg-lime/20 rounded-md text-xs">{aiInsights.length}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-xl text-white text-sm transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Trust Score"
          value={metrics.trustScore}
          suffix="/100"
          icon={Shield}
          trend={4}
          trendLabel="vs last week"
          color="lime"
        />
        <MetricCard
          title="Threats Blocked"
          value={metrics.threatsBlocked}
          suffix="24h"
          icon={Target}
          trend={12}
          trendLabel="vs yesterday"
          color="blue"
        />
        <MetricCard
          title="Active Alerts"
          value={metrics.activeAlerts}
          icon={Zap}
          trend={-8}
          trendLabel="vs yesterday"
          color="red"
          pulsing={alertPulsing}
        />
        <MetricCard
          title="Scans Completed"
          value={metrics.scansCompleted}
          suffix="24h"
          icon={Activity}
          trend={5}
          trendLabel="vs yesterday"
          color="purple"
        />
        <MetricCard
          title="Detection Latency"
          value={`${metrics.detectionLatency}ms`}
          icon={Clock}
          trend={-15}
          trendLabel="improvement"
          color="cyan"
        />
        <MetricCard
          title="Systems Protected"
          value={metrics.systemsProtected}
          icon={Server}
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Threat Distribution */}
        <div className="lg:col-span-2 bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Threat Distribution</h2>
              <p className="text-sm text-zinc-400">By category (24h)</p>
            </div>
            <button
              onClick={() => setAiPanelOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-lg text-sm text-zinc-300 transition-colors"
            >
              <Layers className="w-4 h-4" />
              Drill-Down
            </button>
          </div>
          <ThreatDonutChart
            data={threatCategories}
            onCategoryClick={(cat) => setSelectedCategory(cat)}
          />
        </div>

        {/* Geographic Heat Map */}
        <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Attack Origins</h2>
              <p className="text-sm text-zinc-400">Top countries (24h)</p>
            </div>
            <Globe className="w-5 h-5 text-zinc-500" />
          </div>
          <GeoHeatMap data={geoAttackData} onCountryClick={(c) => setSelectedCountry(c)} />
        </div>
      </div>

      {/* AI Insights Preview */}
      <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-lime/10 rounded-lg">
              <Brain className="w-5 h-5 text-lime" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">AI-Generated Insights</h2>
              <p className="text-sm text-zinc-400">Latest threat intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setAiPanelOpen(true)}
            className="text-sm text-lime hover:underline flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {aiInsights.map((insight) => (
            <AIInsightCard key={insight.id} insight={insight} onClick={() => setAiPanelOpen(true)} />
          ))}
        </div>
      </div>

      {/* Recent Threats Table */}
      <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Recent Threats</h2>
            <p className="text-sm text-zinc-400">Real-time threat feed</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-lg text-sm text-zinc-300 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <a
              href="/dashboard/threats"
              className="text-sm text-lime hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-zinc-800/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Threat
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  MITRE
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {recentThreats.map((threat) => (
                <ThreatRow key={threat.id} threat={threat} onClick={() => setSelectedThreat(threat)} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ThreatDetailModal threat={selectedThreat} onClose={() => setSelectedThreat(null)} />
      <AIInsightsPanel isOpen={aiPanelOpen} onClose={() => setAiPanelOpen(false)} />

      {/* Category Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCategory(null)}>
          <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-white/10 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedCategory.name} Threats</h3>
                <span className="text-sm text-zinc-400">{selectedCategory.count} threats detected</span>
              </div>
              <button onClick={() => setSelectedCategory(null)} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                  <span className="text-sm text-zinc-300">Critical</span>
                  <span className="text-sm font-medium text-red-400">{Math.ceil(selectedCategory.count * 0.2)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                  <span className="text-sm text-zinc-300">High</span>
                  <span className="text-sm font-medium text-orange-400">{Math.floor(selectedCategory.count * 0.35)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                  <span className="text-sm text-zinc-300">Medium</span>
                  <span className="text-sm font-medium text-yellow-400">{Math.floor(selectedCategory.count * 0.3)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                  <span className="text-sm text-zinc-300">Low</span>
                  <span className="text-sm font-medium text-blue-400">{Math.ceil(selectedCategory.count * 0.15)}</span>
                </div>
              </div>
              <a
                href="/dashboard/threats"
                className="block text-center text-sm text-lime hover:underline"
              >
                View all {selectedCategory.name.toLowerCase()} threats →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Country Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCountry(null)}>
          <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-white/10 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedCountry.country}</h3>
                <span className="text-sm text-zinc-400">Attack Origin Analysis</span>
              </div>
              <button onClick={() => setSelectedCountry(null)} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-white">{selectedCountry.attacks.toLocaleString()}</span>
                <span className="block text-sm text-zinc-400 mt-1">Attacks in last 24 hours</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <span className="text-xs text-zinc-500">Threat Level</span>
                  <span className={`block text-lg font-bold mt-1 capitalize ${
                    selectedCountry.intensity === 'critical' ? 'text-red-400' :
                    selectedCountry.intensity === 'high' ? 'text-orange-400' :
                    selectedCountry.intensity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                  }`}>{selectedCountry.intensity}</span>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <span className="text-xs text-zinc-500">% of Total</span>
                  <span className="block text-lg font-bold text-white mt-1">
                    {((selectedCountry.attacks / geoAttackData.reduce((a, b) => a + b.attacks, 0)) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="bg-lime/5 border border-lime/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-lime" />
                  <span className="text-sm font-medium text-lime">AI Insight</span>
                </div>
                <p className="text-sm text-zinc-300">
                  {selectedCountry.intensity === 'critical'
                    ? `High volume of sophisticated attacks from ${selectedCountry.country}. Primary vectors: DDoS, credential stuffing, and APT activity.`
                    : `Moderate attack activity from ${selectedCountry.country}. Mix of automated scanning and targeted probes.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
