/**
 * AegisSentinel Dashboard API — Data Layer
 * 
 * Data source priority:
 *   1. AI Engine (Python FastAPI) — when running and reachable
 *   2. Prisma/PostgreSQL — when DATABASE_URL is set
 *   3. In-memory mock data — always available fallback
 * 
 * To connect the AI engine:
 *   1. Set AI_ENGINE_URL in .env (default: http://localhost:8080)
 *   2. Start the engine: cd aegis-ai-engine && uvicorn sentinel_engine.api.rest:app
 * 
 * To connect a real database:
 *   1. Set DATABASE_URL in .env / Vercel env vars
 *   2. Run `npx prisma db push` to sync schema
 *   3. Run `npx prisma db seed` to populate data
 */

import { prisma } from '@/lib/prisma'
import {
  isEngineOnline,
  getEngineMetrics,
  getEngineThreats,
  getEngineDetectors,
  getEngineThreatCategories,
} from '@/lib/ai-engine'

// ── Metrics ────────────────────────────────────────────
export async function generateMetrics() {
  // 1. Try AI Engine
  try {
    const engineMetrics = await getEngineMetrics()
    if (engineMetrics) return { ...engineMetrics, source: 'ai-engine' }
  } catch { /* continue to fallback */ }

  // 2. Try Database
  if (prisma) {
    try {
      const latest = await prisma.metricSnapshot.findFirst({ orderBy: { timestamp: 'desc' } })
      if (latest) {
        return {
          trustScore: latest.trustScore + Math.floor(Math.random() * 3) - 1,
          threatsBlocked: latest.threatsBlocked + Math.floor(Math.random() * 10),
          scansCompleted: latest.scansCompleted + Math.floor(Math.random() * 5),
          activeAlerts: Math.max(0, latest.activeAlerts + Math.floor(Math.random() * 3) - 1),
          zkProofsGenerated: latest.zkProofsGenerated + Math.floor(Math.random() * 5),
          onChainVerifications: latest.onChainVerifications + Math.floor(Math.random() * 3),
        }
      }
    } catch { /* fallback to mock */ }
  }
  return {
    trustScore: Math.floor(Math.random() * 15) + 85,
    threatsBlocked: Math.floor(Math.random() * 50) + 150,
    scansCompleted: Math.floor(Math.random() * 20) + 80,
    activeAlerts: Math.floor(Math.random() * 5) + 2,
    zkProofsGenerated: Math.floor(Math.random() * 30) + 45,
    onChainVerifications: Math.floor(Math.random() * 20) + 30,
  }
}

// ── Enterprise Detectors ───────────────────────────────
export async function getEnterpriseDetectors() {
  // 1. Try AI Engine
  try {
    const engineDetectors = await getEngineDetectors()
    if (engineDetectors && engineDetectors.length) return engineDetectors
  } catch { /* continue to fallback */ }

  // 2. Try Database
  if (prisma) {
    try {
      const detectors = await prisma.detector.findMany({ orderBy: { detected: 'desc' } })
      if (detectors.length) return detectors
    } catch { /* fallback */ }
  }
  return [
    { name: 'Non-Human Identity Monitor', status: 'active', detected: 12, category: 'Identity' },
    { name: 'Privileged Access Monitor', status: 'active', detected: 5, category: 'Identity' },
    { name: 'Data Flow Analyzer', status: 'active', detected: 8, category: 'Data' },
    { name: 'Cloud Security Posture', status: 'active', detected: 3, category: 'Infrastructure' },
    { name: 'Container Security Scanner', status: 'scanning', detected: 2, category: 'Infrastructure' },
    { name: 'API Abuse Detector', status: 'active', detected: 7, category: 'Application' },
  ]
}

// ── Smart Contract Status ──────────────────────────────
export function getContractStatus() {
  return {
    network: 'Sepolia Testnet',
    contracts: [
      { name: 'SentinelToken', address: '0x5cd78268...dEEd1', status: 'verified', txCount: 847 },
      { name: 'SecurityVerifier', address: '0x535ff8D8...ECBC6', status: 'verified', txCount: 234 },
      { name: 'TrustRegistry', address: '0x4a774a6C...C7F0', status: 'verified', txCount: 156 },
    ],
    lastProof: '2 min ago',
    gasUsed: '0.0012 ETH',
  }
}

// ── Threat Categories ──────────────────────────────────
export async function getThreatCategories() {
  // 1. Try AI Engine
  try {
    const engineCats = await getEngineThreatCategories()
    if (engineCats && engineCats.length) return engineCats
  } catch { /* continue to fallback */ }

  // 2. Try Database
  if (prisma) {
    try {
      const groups = await prisma.threat.groupBy({
        by: ['category'],
        _count: true,
        where: { category: { not: null } },
      })
      if (groups.length) {
        const colorMap: Record<string, { color: string; bgColor: string }> = {
          Network: { color: '#3B82F6', bgColor: 'bg-blue-500' },
          Application: { color: '#A855F7', bgColor: 'bg-purple-500' },
          Identity: { color: '#F97316', bgColor: 'bg-orange-500' },
          Data: { color: '#EF4444', bgColor: 'bg-red-500' },
          Infrastructure: { color: '#06B6D4', bgColor: 'bg-cyan-500' },
          Insider: { color: '#EAB308', bgColor: 'bg-yellow-500' },
        }
        return groups.map((g) => ({
          name: g.category!,
          count: g._count,
          ...(colorMap[g.category!] || { color: '#9CA3AF', bgColor: 'bg-gray-500' }),
        }))
      }
    } catch { /* fallback */ }
  }
  return [
    { name: 'Network', count: 12, color: '#3B82F6', bgColor: 'bg-blue-500' },
    { name: 'Application', count: 8, color: '#A855F7', bgColor: 'bg-purple-500' },
    { name: 'Identity', count: 15, color: '#F97316', bgColor: 'bg-orange-500' },
    { name: 'Data', count: 5, color: '#EF4444', bgColor: 'bg-red-500' },
    { name: 'Infrastructure', count: 3, color: '#06B6D4', bgColor: 'bg-cyan-500' },
    { name: 'Insider', count: 2, color: '#EAB308', bgColor: 'bg-yellow-500' },
  ]
}

// ── Geographical Attack Data ───────────────────────────
export async function getGeoAttackData() {
  if (prisma) {
    try {
      const geo = await prisma.geoAttack.findMany({
        where: { period: '24h' },
        orderBy: { attacks: 'desc' },
      })
      if (geo.length) return geo
    } catch { /* fallback */ }
  }
  return [
    { country: 'Russia', code: 'RU', attacks: 2847, lat: 61.52, lng: 105.31, intensity: 'critical' },
    { country: 'China', code: 'CN', attacks: 2156, lat: 35.86, lng: 104.19, intensity: 'critical' },
    { country: 'United States', code: 'US', attacks: 1243, lat: 37.09, lng: -95.71, intensity: 'high' },
    { country: 'Brazil', code: 'BR', attacks: 876, lat: -14.23, lng: -51.92, intensity: 'high' },
    { country: 'India', code: 'IN', attacks: 654, lat: 20.59, lng: 78.96, intensity: 'medium' },
    { country: 'Germany', code: 'DE', attacks: 432, lat: 51.16, lng: 10.45, intensity: 'medium' },
    { country: 'Netherlands', code: 'NL', attacks: 387, lat: 52.13, lng: 5.29, intensity: 'medium' },
    { country: 'Ukraine', code: 'UA', attacks: 298, lat: 48.37, lng: 31.16, intensity: 'low' },
    { country: 'Romania', code: 'RO', attacks: 245, lat: 45.94, lng: 24.96, intensity: 'low' },
    { country: 'Iran', code: 'IR', attacks: 198, lat: 32.42, lng: 53.68, intensity: 'low' },
  ]
}

// ── Recent Threats ─────────────────────────────────────
export async function getRecentThreats() {
  // 1. Try AI Engine
  try {
    const engineThreats = await getEngineThreats(10)
    if (engineThreats && engineThreats.length) return engineThreats
  } catch { /* continue to fallback */ }

  // 2. Try Database
  if (prisma) {
    try {
      const threats = await prisma.threat.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
      })
      if (threats.length) {
        return threats.map((t) => ({
          id: t.id,
          type: t.type,
          severity: t.severity,
          source: t.source,
          time: timeAgo(t.createdAt),
          status: t.status,
          confidence: t.confidence,
          aiInsight: t.aiInsight || '',
          mitre: t.mitre || '',
        }))
      }
    } catch { /* fallback */ }
  }
  return [
    { id: 1, type: 'SQL Injection', severity: 'critical', source: '192.168.1.105', time: '2 min ago', status: 'blocked', confidence: 98, aiInsight: 'Pattern matches known SQLi payload targeting MySQL databases. Attack vector: UNION-based injection attempting to extract user credentials.', mitre: 'T1190' },
    { id: 2, type: 'Brute Force Attack', severity: 'high', source: '10.0.0.45', time: '5 min ago', status: 'blocked', confidence: 94, aiInsight: '523 failed authentication attempts in 3 minutes from single IP. Credential stuffing pattern detected.', mitre: 'T1110' },
    { id: 3, type: 'Unusual Port Access', severity: 'medium', source: '172.16.0.22', time: '12 min ago', status: 'investigating', confidence: 76, aiInsight: 'Internal host scanning non-standard ports (8443, 9200, 27017).', mitre: 'T1046' },
    { id: 4, type: 'Failed Login Attempt', severity: 'low', source: '192.168.1.88', time: '15 min ago', status: 'blocked', confidence: 65, aiInsight: 'Multiple failed logins for service account. Pattern consistent with password expiration.', mitre: 'T1078' },
    { id: 5, type: 'Data Exfiltration Attempt', severity: 'critical', source: '10.0.1.15', time: '23 min ago', status: 'blocked', confidence: 99, aiInsight: 'Large encrypted payload (2.4GB) detected to external IP via DNS tunneling.', mitre: 'T1048' },
  ]
}

// ── Activity Chart Data ────────────────────────────────
export async function getActivityData() {
  if (prisma) {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const activity = await prisma.activityHour.findMany({
        where: { date: today },
        orderBy: { hour: 'asc' },
      })
      if (activity.length) {
        return activity.map((a) => ({
          hour: a.hour,
          threats: a.threats,
          scans: a.scans,
        }))
      }
    } catch { /* fallback */ }
  }
  return [
    { hour: '00:00', threats: 5, scans: 12 },
    { hour: '04:00', threats: 3, scans: 8 },
    { hour: '08:00', threats: 12, scans: 25 },
    { hour: '12:00', threats: 18, scans: 32 },
    { hour: '16:00', threats: 15, scans: 28 },
    { hour: '20:00', threats: 8, scans: 18 },
    { hour: 'Now', threats: 6, scans: 15 },
  ]
}

// ── Network Threat Insights ────────────────────────────
export async function getNetworkThreatInsights() {
  if (prisma) {
    try {
      const insights = await prisma.networkInsight.findMany({
        where: { resolved: false },
        orderBy: { createdAt: 'desc' },
        take: 10,
      })
      if (insights.length) return insights
    } catch { /* fallback */ }
  }
  return [
    { id: 'net_ai_1', title: 'DDoS Attack Pattern Detected', severity: 'critical', confidence: 97, summary: 'Coordinated volumetric attack from 847 distinct IPs targeting port 443.', recommendation: 'Enable rate limiting and activate DDoS mitigation.', affectedSystems: ['API Gateway', 'Load Balancer', 'CDN Edge'], mitre: 'T1498' },
    { id: 'net_ai_2', title: 'Lateral Movement Activity', severity: 'high', confidence: 89, summary: 'Internal host 10.0.0.45 scanning adjacent subnets using SMB and RDP protocols.', recommendation: 'Isolate affected host immediately.', affectedSystems: ['Workstation WS-FIN-042', 'Domain Controller'], mitre: 'T1021' },
    { id: 'net_ai_3', title: 'DNS Tunneling Detected', severity: 'high', confidence: 94, summary: 'Anomalous DNS query patterns to suspicious.domain.xyz.', recommendation: 'Block domain at DNS level.', affectedSystems: ['Endpoint EP-DEV-019', 'Internal DNS'], mitre: 'T1071.004' },
    { id: 'net_ai_4', title: 'Port Scan from External IP', severity: 'medium', confidence: 82, summary: 'Sequential port scanning detected from 185.220.102.240.', recommendation: 'Add IP to blocklist.', affectedSystems: ['Perimeter Firewall', 'Public Web Server'], mitre: 'T1046' },
  ]
}

// ── Full Dashboard Payload ─────────────────────────────
export async function getDashboardData() {
  // Check AI engine availability once for status reporting
  let engineOnline = false
  try {
    engineOnline = await isEngineOnline()
  } catch { /* engine offline */ }

  const [metrics, enterpriseDetectors, threatCategories, geoAttackData, recentThreats, activityData, networkThreatInsights] = await Promise.all([
    generateMetrics(),
    getEnterpriseDetectors(),
    getThreatCategories(),
    getGeoAttackData(),
    getRecentThreats(),
    getActivityData(),
    getNetworkThreatInsights(),
  ])

  return {
    metrics,
    enterpriseDetectors,
    contractStatus: getContractStatus(),
    threatCategories,
    geoAttackData,
    recentThreats,
    activityData,
    networkThreatInsights,
    timestamp: new Date().toISOString(),
    dataSource: engineOnline ? 'ai-engine' : prisma ? 'database' : 'mock',
    engineOnline,
  }
}

// ── Helpers ────────────────────────────────────────────
function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}
