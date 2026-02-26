'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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
  Link2,
  Server,
  Cpu,
  Key,
  Database,
  Cloud,
  Lock,
  ExternalLink,
} from 'lucide-react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// ── Type Definitions ───────────────────────────────────
interface Metrics {
  trustScore: number
  threatsBlocked: number
  scansCompleted: number
  activeAlerts: number
  zkProofsGenerated: number
  onChainVerifications: number
}

interface Detector {
  name: string
  status: string
  detected: number
  category: string
}

interface Contract {
  name: string
  address: string
  status: string
  txCount: number
}

interface ContractStatus {
  network: string
  contracts: Contract[]
  lastProof: string
  gasUsed: string
}

interface ThreatCategory {
  name: string
  count: number
  color: string
  bgColor: string
}

interface GeoAttack {
  country: string
  code: string
  attacks: number
  lat: number
  lng: number
  intensity: string
}

interface Threat {
  id: number
  type: string
  severity: string
  source: string
  time: string
  status: string
  confidence: number
  aiInsight: string
  mitre: string
}

interface ActivityPoint {
  hour: string
  threats: number
  scans: number
}

interface NetworkInsight {
  id: string
  title: string
  severity: string
  confidence: number
  summary: string
  recommendation: string
  affectedSystems: string[]
  mitre: string
}

interface DashboardData {
  metrics: Metrics
  enterpriseDetectors: Detector[]
  contractStatus: ContractStatus
  threatCategories: ThreatCategory[]
  geoAttackData: GeoAttack[]
  recentThreats: Threat[]
  activityData: ActivityPoint[]
  networkThreatInsights: NetworkInsight[]
  timestamp: string
  dataSource?: string
  engineOnline?: boolean
}

// ── Default empty state ────────────────────────────────
const defaultMetrics: Metrics = {
  trustScore: 0,
  threatsBlocked: 0,
  scansCompleted: 0,
  activeAlerts: 0,
  zkProofsGenerated: 0,
  onChainVerifications: 0,
}

export default function DashboardPage() {
  // ── API-driven state ───────────────────────────────
  const [metrics, setMetrics] = useState<Metrics>(defaultMetrics)
  const [enterpriseDetectors, setEnterpriseDetectors] = useState<Detector[]>([])
  const [contractStatus, setContractStatus] = useState<ContractStatus | null>(null)
  const [threatCategories, setThreatCategories] = useState<ThreatCategory[]>([])
  const [geoAttackData, setGeoAttackData] = useState<GeoAttack[]>([])
  const [recentThreats, setRecentThreats] = useState<Threat[]>([])
  const [activityData, setActivityData] = useState<ActivityPoint[]>([])
  const [networkThreatInsights, setNetworkThreatInsights] = useState<NetworkInsight[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [engineOnline, setEngineOnline] = useState(false)
  const [dataSource, setDataSource] = useState<string>('loading')

  // ── UI state ───────────────────────────────────────
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<ThreatCategory | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<GeoAttack | null>(null)
  const [networkInsightsOpen, setNetworkInsightsOpen] = useState(false)
  const [alertPulsing, setAlertPulsing] = useState(false)
  const prevAlertsRef = useRef(0)

  // ── Fetch all dashboard data from API ──────────────
  const fetchDashboardData = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard', { cache: 'no-store' })
      if (!res.ok) throw new Error('API error')
      const data: DashboardData = await res.json()
      setMetrics(data.metrics)
      setEnterpriseDetectors(data.enterpriseDetectors)
      setContractStatus(data.contractStatus)
      setThreatCategories(data.threatCategories)
      setGeoAttackData(data.geoAttackData)
      setRecentThreats(data.recentThreats)
      setActivityData(data.activityData)
      setNetworkThreatInsights(data.networkThreatInsights)
      setEngineOnline(data.engineOnline ?? false)
      setDataSource(data.dataSource ?? 'mock')
      setDataLoaded(true)
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
    }
  }, [])

  // ── Refresh only metrics (lightweight poll) ────────
  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard/metrics', { cache: 'no-store' })
      if (!res.ok) throw new Error('API error')
      const data: Metrics = await res.json()
      setMetrics(data)
    } catch (err) {
      console.error('Failed to fetch metrics:', err)
    }
  }, [])

  const refreshData = async () => {
    setIsRefreshing(true)
    await fetchDashboardData()
    setIsRefreshing(false)
  }

  // Initial load
  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  // Auto-refresh metrics every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchMetrics, 30000)
    return () => clearInterval(interval)
  }, [fetchMetrics])

  // Detect alert count increase and trigger pulse animation
  useEffect(() => {
    if (metrics.activeAlerts > prevAlertsRef.current) {
      setAlertPulsing(true)
      const timeout = setTimeout(() => setAlertPulsing(false), 2000)
      return () => clearTimeout(timeout)
    }
    prevAlertsRef.current = metrics.activeAlerts
  }, [metrics.activeAlerts])

  const severityColors = {
    critical: 'bg-red-500/10 text-red-400 border-red-500/20',
    high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  }

  const statusColors = {
    blocked: 'text-lime',
    investigating: 'text-yellow-400',
    active: 'text-red-400',
  }

  // Calculate donut chart segments
  const totalThreats = threatCategories.reduce((acc, cat) => acc + cat.count, 0)
  let accumulatedAngle = 0
  const donutSegments = threatCategories.map((cat) => {
    const angle = (cat.count / totalThreats) * 360
    const startAngle = accumulatedAngle
    accumulatedAngle += angle
    return { ...cat, startAngle, angle }
  })

  // Loading skeleton
  if (!dataLoaded) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 h-20" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-zinc-900 border border-white/10 rounded-xl p-6 h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 h-64" />
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 h-64" />
        </div>
        <div className="flex items-center justify-center gap-3 pt-8 text-zinc-400">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="text-sm">Fetching live threat data from API...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enterprise Stats Banner */}
      <div className="bg-gradient-to-r from-lime/5 via-primary/5 to-purple-500/5 border border-white/10 rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-lime/10 rounded-lg">
              <Shield className="w-5 h-5 text-lime" />
            </div>
            <div>
              <span className="text-sm font-medium text-white">AegisSentinel Enterprise</span>
              <span className="block text-xs text-zinc-400">AI-Powered Threat Detection</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="text-center">
              <span className="block text-lg font-bold text-white">&lt;100ms</span>
              <span className="text-xs text-zinc-500">Detection</span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-lime">35+</span>
              <span className="text-xs text-zinc-500">Threat Types</span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-white">97%+</span>
              <span className="text-xs text-zinc-500">AI Confidence</span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-primary">MITRE</span>
              <span className="text-xs text-zinc-500">ATT&CK</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-white/5">
              <div className={`w-2 h-2 rounded-full ${engineOnline ? 'bg-lime animate-pulse' : 'bg-zinc-500'}`} />
              <span className="text-xs font-mono text-zinc-400">
                {engineOnline ? 'AI Engine Live' : `Source: ${dataSource}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Security Overview</h1>
          <p className="text-zinc-400 text-sm">
            Real-time threat detection and monitoring
          </p>
        </div>
        <button
          onClick={refreshData}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw
            className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
          />
          Refresh
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Trust Score"
          value={metrics.trustScore}
          suffix="/100"
          icon={Shield}
          trend={+2.5}
          color="lime"
        />
        <MetricCard
          title="Threats Blocked"
          value={metrics.threatsBlocked}
          icon={AlertTriangle}
          trend={-12}
          trendLabel="vs yesterday"
          color="red"
        />
        <MetricCard
          title="Scans Completed"
          value={metrics.scansCompleted}
          icon={Activity}
          trend={+8}
          trendLabel="today"
          color="blue"
        />
        <MetricCard
          title="Active Alerts"
          value={metrics.activeAlerts}
          icon={Zap}
          color="orange"
          pulsing={alertPulsing}
        />
      </div>

      {/* Main Content Grid - Donut Chart & Heat Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vibrant Donut Chart */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Threats by Category</h2>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* SVG Donut Chart */}
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {donutSegments.map((segment, i) => {
                  const radius = 35
                  const circumference = 2 * Math.PI * radius
                  const strokeDasharray = (segment.angle / 360) * circumference
                  const strokeDashoffset = -(segment.startAngle / 360) * circumference
                  return (
                    <circle
                      key={segment.name}
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke={segment.color}
                      strokeWidth="12"
                      strokeDasharray={`${strokeDasharray} ${circumference}`}
                      strokeDashoffset={strokeDashoffset}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedCategory(segment)}
                      style={{
                        filter: selectedCategory?.name === segment.name ? 'drop-shadow(0 0 8px ' + segment.color + ')' : 'none'
                      }}
                    />
                  )
                })}
              </svg>
              {/* Center Stats */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{totalThreats}</span>
                <span className="text-xs text-zinc-400">Total Threats</span>
              </div>
            </div>
            {/* Legend */}
            <div className="flex-1 space-y-2">
              {threatCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all ${
                    selectedCategory?.name === cat.name ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${cat.bgColor}`} />
                    <span className="text-sm text-zinc-300 font-sans">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{cat.count}</span>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* Drill-Down Button */}
          <button
            onClick={() => setNetworkInsightsOpen(true)}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-lime/30 rounded-lg text-sm text-zinc-300 hover:text-lime transition-all group"
          >
            <Layers className="w-4 h-4 group-hover:text-lime transition-colors" />
            <span className="font-sans">Drill-Down AI Insights</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Geographical Heat Map */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Attack Origins</h2>
            <div className="flex items-center gap-2 text-xs">
              <Globe className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-400">Live • 24h</span>
            </div>
          </div>
          {/* World Map Visualization */}
          <div className="w-full h-[280px] sm:h-[350px] lg:h-[420px] mb-4 relative">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 130, center: [10, 30] }}
              width={800}
              height={420}
              style={{ width: '100%', height: '100%' }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const props = geo.properties;
                    const country = geoAttackData.find(
                      (c) =>
                        c.code === props.ISO_A2 ||
                        c.code === props.ISO_A2_EH ||
                        c.country === props.NAME ||
                        c.country === props.name ||
                        c.country === props.ADMIN
                    );
                    let fill = '#1a1a2e';
                    let stroke = '#2a2a3e';
                    if (country) {
                      if (country.intensity === 'critical') fill = '#7f1d1d';
                      else if (country.intensity === 'high') fill = '#7c2d12';
                      else if (country.intensity === 'medium') fill = '#713f12';
                      else if (country.intensity === 'low') fill = '#1e3a5f';
                      stroke = '#444';
                    }
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => setSelectedCountry(country || null)}
                        onMouseLeave={() => setSelectedCountry(null)}
                        onClick={() => setSelectedCountry(country || null)}
                        style={{
                          default: { fill, stroke, strokeWidth: 0.5, outline: 'none', cursor: country ? 'pointer' : 'default' },
                          hover: { fill: country ? (country.intensity === 'critical' ? '#ef4444' : country.intensity === 'high' ? '#f97316' : country.intensity === 'medium' ? '#eab308' : '#3b82f6') : '#2a2a3e', stroke: '#555', strokeWidth: 0.5, outline: 'none' },
                          pressed: { fill: '#333', outline: 'none' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
              {/* Glowing attack markers at coordinates */}
              {geoAttackData.map((d) => {
                const colors: Record<string, string> = {
                  critical: '#ef4444',
                  high: '#f97316',
                  medium: '#eab308',
                  low: '#3b82f6',
                };
                const sizes: Record<string, number> = {
                  critical: 10,
                  high: 7,
                  medium: 5,
                  low: 4,
                };
                const color = colors[d.intensity] || '#3b82f6';
                const r = sizes[d.intensity] || 4;
                return (
                  <Marker key={d.code} coordinates={[d.lng, d.lat]}>
                    <circle r={r + 4} fill={color} opacity={0.15}>
                      <animate attributeName="r" from={r + 2} to={r + 10} dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle r={r} fill={color} opacity={0.8} stroke={color} strokeWidth={1}>
                      <title>{d.country}: {d.attacks.toLocaleString()} attacks</title>
                    </circle>
                    <text
                      textAnchor="middle"
                      y={-r - 4}
                      style={{ fontFamily: 'system-ui', fill: '#fff', fontSize: '8px', fontWeight: 600, pointerEvents: 'none' }}
                    >
                      {d.code}
                    </text>
                  </Marker>
                );
              })}
            </ComposableMap>
            {/* Tooltip */}
            {selectedCountry && (
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 min-w-[180px]">
                <div className="text-sm font-semibold text-white mb-1">{selectedCountry.country}</div>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${
                    selectedCountry.intensity === 'critical' ? 'bg-red-500' :
                    selectedCountry.intensity === 'high' ? 'bg-orange-500' :
                    selectedCountry.intensity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-xs text-zinc-400 capitalize">{selectedCountry.intensity} severity</span>
                </div>
                <div className="text-lg font-bold text-white">{selectedCountry.attacks.toLocaleString()}</div>
                <div className="text-xs text-zinc-500">attacks in 24h</div>
              </div>
            )}
          </div>
          {/* Intensity Legend */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/10">
            {[
              { label: 'Critical', class: 'bg-red-500' },
              { label: 'High', class: 'bg-orange-500' },
              { label: 'Medium', class: 'bg-yellow-500' },
              { label: 'Low', class: 'bg-blue-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${item.class}`} />
                <span className="text-xs text-zinc-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Threat Activity</h2>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-zinc-400">Threats</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-lime rounded-full" />
              <span className="text-zinc-400">Scans</span>
            </div>
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="h-48 flex items-end justify-between gap-1 sm:gap-2 overflow-x-auto">
          {activityData.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="relative w-full flex gap-1 justify-center">
                <div
                  className="w-3 bg-red-500/80 rounded-t"
                  style={{ height: `${item.threats * 6}px` }}
                />
                <div
                  className="w-3 bg-lime/80 rounded-t"
                  style={{ height: `${item.scans * 4}px` }}
                />
              </div>
              <span className="text-xs text-zinc-500">{item.hour}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Blockchain & Enterprise Detectors Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Smart Contract Status */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Link2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">On-Chain Verification</h2>
                <span className="text-xs text-zinc-400">{contractStatus?.network}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-lime/10 rounded-full">
              <div className="w-2 h-2 bg-lime rounded-full animate-pulse" />
              <span className="text-xs text-lime font-medium">Live</span>
            </div>
          </div>

          {/* Contract List */}
          <div className="space-y-3 mb-4">
            {contractStatus?.contracts.map((contract) => (
              <div key={contract.name} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-1.5 bg-zinc-700 rounded flex-shrink-0">
                    <Server className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm text-white font-medium">{contract.name}</span>
                    <span className="block text-xs text-zinc-500 font-mono truncate">{contract.address}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-lime" />
                    <span className="text-xs text-lime">{contract.status}</span>
                  </div>
                  <span className="text-xs text-zinc-400">{contract.txCount} txs</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
            <div className="text-center">
              <span className="block text-xl font-bold text-white">{metrics.zkProofsGenerated}</span>
              <span className="text-xs text-zinc-400">ZK Proofs</span>
            </div>
            <div className="text-center">
              <span className="block text-xl font-bold text-white">{metrics.onChainVerifications}</span>
              <span className="text-xs text-zinc-400">Verified</span>
            </div>
            <div className="text-center">
              <span className="block text-xl font-bold text-lime">{contractStatus?.lastProof}</span>
              <span className="text-xs text-zinc-400">Last Proof</span>
            </div>
          </div>

          {/* View on Explorer */}
          <a 
            href="https://arbiscan.io/address/0xc375d7a7d9de74c796f7ead6a49a9e1e23ac6062"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-zinc-300 hover:text-white transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View on Arbiscan
          </a>
        </div>

        {/* Enterprise Detectors Status */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Cpu className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Enterprise Detectors</h2>
                <span className="text-xs text-zinc-400">35+ threat types monitored</span>
              </div>
            </div>
            <span className="text-xs text-zinc-400">
              {enterpriseDetectors.filter(d => d.status === 'active').length}/{enterpriseDetectors.length} Active
            </span>
          </div>

          {/* Detector List */}
          <div className="space-y-2">
            {enterpriseDetectors.map((detector) => (
              <div key={detector.name} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    detector.status === 'active' ? 'bg-lime' : 
                    detector.status === 'scanning' ? 'bg-yellow-400 animate-pulse' : 'bg-zinc-500'
                  }`} />
                  <span className="text-sm text-white">{detector.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    detector.category === 'Identity' ? 'bg-orange-500/10 text-orange-400' :
                    detector.category === 'Data' ? 'bg-red-500/10 text-red-400' :
                    detector.category === 'Infrastructure' ? 'bg-cyan-500/10 text-cyan-400' :
                    'bg-purple-500/10 text-purple-400'
                  }`}>
                    {detector.category}
                  </span>
                  <div className="flex items-center gap-1 min-w-[50px] justify-end">
                    <AlertTriangle className="w-3 h-3 text-zinc-400" />
                    <span className="text-sm text-zinc-300">{detector.detected}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MITRE ATT&CK Coverage */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">MITRE ATT&CK Coverage</span>
              <span className="text-sm text-lime font-medium">87%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-lime to-emerald-400 w-[87%]" />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['T1498', 'T1046', 'T1557', 'T1110', 'T1078', 'T1048'].map(id => (
                <span key={id} className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded font-mono">
                  {id}
                </span>
              ))}
              <span className="text-xs px-2 py-0.5 text-zinc-500">+29 more</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Threats with AI Confidence */}
      <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-white">Recent Threats</h2>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-lime/10 rounded-full">
                <Brain className="w-3 h-3 text-lime" />
                <span className="text-xs text-lime font-medium">AI Analysis</span>
              </div>
            </div>
            <a
              href="/dashboard/threats"
              className="text-sm text-lime hover:underline"
            >
              View all
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-zinc-400 border-b border-white/5">
                <th className="px-6 py-3 font-medium">Threat Type</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">AI Confidence</th>
                <th className="px-6 py-3 font-medium">Source</th>
                <th className="px-6 py-3 font-medium">Time</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {recentThreats.map((threat) => (
                <tr
                  key={threat.id}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                  onClick={() => setSelectedThreat(threat)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          threat.severity === 'critical'
                            ? 'text-red-400'
                            : threat.severity === 'high'
                            ? 'text-orange-400'
                            : threat.severity === 'medium'
                            ? 'text-yellow-400'
                            : 'text-blue-400'
                        }`}
                      />
                      <span className="text-sm text-white">{threat.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full border ${
                        severityColors[threat.severity as keyof typeof severityColors]
                      }`}
                    >
                      {threat.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <AIConfidenceIndicator confidence={threat.confidence} />
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-zinc-400 font-mono">
                      {threat.source}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Clock className="w-3 h-3" />
                      {threat.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        statusColors[threat.status as keyof typeof statusColors]
                      }`}
                    >
                      {threat.status === 'blocked' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Activity className="w-4 h-4" />
                      )}
                      {threat.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drill-down Modal for Threat Details */}
      {selectedThreat && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedThreat(null)}>
          <div className="bg-zinc-900 border border-white/10 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-white/10 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className={`w-5 h-5 ${
                    selectedThreat.severity === 'critical' ? 'text-red-400' : 
                    selectedThreat.severity === 'high' ? 'text-orange-400' : 'text-yellow-400'
                  }`} />
                  <h3 className="text-xl font-bold text-white">{selectedThreat.type}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs rounded-full border ${
                    severityColors[selectedThreat.severity as keyof typeof severityColors]
                  }`}>
                    {selectedThreat.severity}
                  </span>
                  <span className="text-sm text-zinc-400">{selectedThreat.time}</span>
                </div>
              </div>
              <button onClick={() => setSelectedThreat(null)} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* AI Analysis Section */}
              <div className="bg-lime/5 border border-lime/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-lime/20 rounded-lg">
                    <Brain className="w-4 h-4 text-lime" />
                  </div>
                  <span className="text-sm font-medium text-lime">AI Analysis</span>
                  <AIConfidenceIndicator confidence={selectedThreat.confidence} showLabel />
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{selectedThreat.aiInsight}</p>
              </div>
              
              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <span className="text-xs text-zinc-500">Source IP</span>
                  <code className="block text-sm text-white font-mono mt-1">{selectedThreat.source}</code>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <span className="text-xs text-zinc-500">MITRE ATT&CK</span>
                  <a href={`https://attack.mitre.org/techniques/${selectedThreat.mitre}/`} 
                     target="_blank" rel="noopener noreferrer"
                     className="block text-sm text-lime font-mono mt-1 hover:underline">
                    {selectedThreat.mitre}
                  </a>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <span className="text-xs text-zinc-500">Status</span>
                  <span className={`block text-sm font-medium mt-1 capitalize ${
                    statusColors[selectedThreat.status as keyof typeof statusColors]
                  }`}>{selectedThreat.status}</span>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <span className="text-xs text-zinc-500">Detection Time</span>
                  <span className="block text-sm text-white mt-1">{selectedThreat.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drill-down Modal for Category */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCategory(null)}>
          <div className="bg-zinc-900 border border-white/10 rounded-xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-white/10 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${selectedCategory.bgColor}`} />
                <h3 className="text-xl font-bold text-white">{selectedCategory.name} Threats</h3>
              </div>
              <button onClick={() => setSelectedCategory(null)} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-white">{selectedCategory.count}</span>
                <span className="block text-sm text-zinc-400 mt-1">Active threats in this category</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                  <span className="text-sm text-zinc-300">Critical</span>
                  <span className="text-sm font-medium text-red-400">{Math.floor(selectedCategory.count * 0.2)}</span>
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
              <a href="/dashboard/threats" className="block text-center text-sm text-lime hover:underline mt-6">
                View all {selectedCategory.name.toLowerCase()} threats →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Drill-down Modal for Country */}
      {selectedCountry && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCountry(null)}>
          <div className="bg-zinc-900 border border-white/10 rounded-xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
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
                <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                  <span className="text-xs text-zinc-500">Threat Level</span>
                  <span className={`block text-lg font-bold mt-1 capitalize ${
                    selectedCountry.intensity === 'critical' ? 'text-red-400' :
                    selectedCountry.intensity === 'high' ? 'text-orange-400' :
                    selectedCountry.intensity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                  }`}>{selectedCountry.intensity}</span>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                  <span className="text-xs text-zinc-500">% of Total</span>
                  <span className="block text-lg font-bold text-white mt-1">
                    {((selectedCountry.attacks / geoAttackData.reduce((a, b) => a + b.attacks, 0)) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="bg-lime/5 border border-lime/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-lime" />
                  <span className="text-sm font-medium text-lime">AI Insight</span>
                </div>
                <p className="text-sm text-zinc-300">
                  {selectedCountry.intensity === 'critical' 
                    ? `High volume of sophisticated attacks originating from ${selectedCountry.country}. Primary vectors: DDoS, credential stuffing, and APT activity. Consider geo-blocking or enhanced monitoring.`
                    : `Moderate attack activity from ${selectedCountry.country}. Mix of automated scanning and targeted probes. Standard monitoring recommended.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Network Insights Glassmorphism Side Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[420px] z-50 transform transition-transform duration-500 ease-out ${
          networkInsightsOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Glassmorphism backdrop */}
        <div className="absolute inset-0 bg-zinc-900/70 backdrop-blur-xl border-l border-white/10" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-lime/10 rounded-lg">
                <Layers className="w-5 h-5 text-lime" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-sans">AI Network Insights</h3>
                <span className="text-xs text-zinc-400 font-sans">Deep threat analysis</span>
              </div>
            </div>
            <button 
              onClick={() => setNetworkInsightsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
          
          {/* Insights List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {networkThreatInsights.map((insight) => (
              <div 
                key={insight.id}
                className="bg-zinc-800/50 border border-white/5 rounded-xl p-5 hover:border-lime/30 transition-all duration-300"
              >
                {/* Title & Severity */}
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-sm font-medium text-white font-sans pr-3">{insight.title}</h4>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border whitespace-nowrap ${
                    insight.severity === 'critical' 
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : insight.severity === 'high'
                      ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                      : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                  }`}>
                    <AlertTriangle className="w-3 h-3" />
                    {insight.severity}
                  </span>
                </div>
                
                {/* AI Summary */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-4 font-sans">{insight.summary}</p>
                
                {/* Confidence & MITRE Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-lime/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-lime">{insight.confidence}%</span>
                      </div>
                      {insight.confidence >= 90 && (
                        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-lime rounded-full animate-pulse" />
                      )}
                    </div>
                    <span className="text-xs text-zinc-500">AI Confidence</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono bg-zinc-800 px-2 py-1 rounded">{insight.mitre}</span>
                </div>
                
                {/* Affected Systems */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {insight.affectedSystems.map((system, idx) => (
                    <span key={idx} className="text-xs bg-zinc-700/50 text-zinc-300 px-2 py-0.5 rounded">{system}</span>
                  ))}
                </div>
                
                {/* Recommendation */}
                <div className="bg-zinc-900/50 rounded-lg p-3 border-l-2 border-lime">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3 h-3 text-lime" />
                    <span className="text-xs font-medium text-lime font-sans">Recommendation</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans">{insight.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-zinc-900/50">
            <a 
              href="/dashboard/threats"
              className="flex items-center justify-center gap-2 w-full py-3 bg-lime/10 hover:bg-lime/20 border border-lime/30 rounded-lg text-lime text-sm font-medium transition-colors"
            >
              <span>View Full Threat Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Overlay when panel is open */}
      {networkInsightsOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setNetworkInsightsOpen(false)}
        />
      )}
    </div>
  )
}

function MetricCard({
  title,
  value,
  suffix,
  icon: Icon,
  trend,
  trendLabel,
  color,
  pulsing = false,
}: {
  title: string
  value: number
  suffix?: string
  icon: React.ElementType
  trend?: number
  trendLabel?: string
  color: string
  pulsing?: boolean
}) {
  const colorClasses = {
    lime: 'text-lime bg-lime/10',
    red: 'text-red-400 bg-red-500/10',
    blue: 'text-blue-400 bg-blue-500/10',
    orange: 'text-orange-400 bg-orange-500/10',
  }

  const pulsingClasses = {
    lime: 'shadow-lime/50',
    red: 'shadow-red-500/50',
    blue: 'shadow-blue-500/50',
    orange: 'shadow-orange-500/50',
  }

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-xl p-7">
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-sans text-zinc-400 tracking-wide">{title}</span>
        <div
          className={`p-2.5 rounded-lg transition-all duration-300 ${
            colorClasses[color as keyof typeof colorClasses]
          } ${pulsing ? `animate-bounce shadow-lg ${pulsingClasses[color as keyof typeof pulsingClasses]}` : ''}`}
        >
          <Icon className={`w-5 h-5 ${pulsing ? 'animate-pulse' : ''}`} />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
        {suffix && <span className="text-zinc-400 mb-1 font-sans">{suffix}</span>}
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1.5 mt-3">
          {trend > 0 ? (
            <TrendingUp className="w-4 h-4 text-lime" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span
            className={`text-sm font-sans ${trend > 0 ? 'text-lime' : 'text-red-400'}`}
          >
            {trend > 0 ? '+' : ''}
            {trend}%
          </span>
          {trendLabel && (
            <span className="text-xs font-sans text-zinc-500">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}

// AI Confidence Indicator with glowing pulse effect
function AIConfidenceIndicator({ confidence, showLabel = false }: { confidence: number; showLabel?: boolean }) {
  const isHighConfidence = confidence >= 90
  const isMediumConfidence = confidence >= 70 && confidence < 90
  
  const getColor = () => {
    if (confidence >= 90) return { ring: 'ring-lime', bg: 'bg-lime', text: 'text-lime', glow: 'shadow-lime/50' }
    if (confidence >= 70) return { ring: 'ring-yellow-400', bg: 'bg-yellow-400', text: 'text-yellow-400', glow: 'shadow-yellow-400/50' }
    return { ring: 'ring-zinc-500', bg: 'bg-zinc-500', text: 'text-zinc-400', glow: '' }
  }
  
  const colors = getColor()
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {/* Outer glow ring for high confidence */}
        {isHighConfidence && (
          <div className={`absolute inset-0 rounded-full ${colors.bg} opacity-20 animate-ping`} />
        )}
        {/* Main indicator */}
        <div className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 ring-2 ${colors.ring} ${isHighConfidence ? `shadow-lg ${colors.glow}` : ''}`}>
          <span className={`text-xs font-bold ${colors.text}`}>{confidence}</span>
        </div>
        {/* Subtle pulse for medium confidence */}
        {isMediumConfidence && (
          <div className={`absolute inset-0 rounded-full ring-2 ${colors.ring} animate-pulse opacity-50`} />
        )}
      </div>
      {showLabel && (
        <span className={`text-xs ${colors.text}`}>
          {confidence >= 90 ? 'Verified' : confidence >= 70 ? 'Likely' : 'Uncertain'}
        </span>
      )}
    </div>
  )
}
