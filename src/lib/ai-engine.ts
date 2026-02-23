/**
 * AegisSentinel AI Engine Client
 *
 * Connects the Next.js dashboard to the Python FastAPI AI engine.
 * 
 * The AI engine runs separately (locally or on a server) and exposes
 * dashboard-compatible endpoints. This client provides typed access
 * to those endpoints with automatic fallback when the engine is offline.
 *
 * Environment:
 *   AI_ENGINE_URL — Base URL of the running engine (default: http://localhost:8080)
 */

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:8080'
const TIMEOUT_MS = 5_000

// ── Types ────────────────────────────────────────────────────────────

export interface EngineHealth {
  status: string
  version: string
  engine_initialized: boolean
  uptime_seconds: number
}

export interface EngineStatus {
  initialized: boolean
  mode: string
  sensitivity: string
  detectors: string[]
  threat_categories: Record<string, number>
  total_threat_types: number
  critical_threat_types: number
  scan_count: number
  last_scan: string | null
}

export interface EngineScanResult {
  scanId: string
  status: string
  trustScore: number
  threatsFound: number
  proofHash: string | null
  durationMs: number
  detectors: string[]
  threats: {
    id: string
    type: string
    severity: string
    confidence: number
    description: string
    mitre: string
  }[]
}

export interface EngineMetrics {
  trustScore: number
  threatsBlocked: number
  scansCompleted: number
  activeAlerts: number
  zkProofsGenerated: number
  onChainVerifications: number
}

export interface EngineThreat {
  id: string
  type: string
  severity: string
  source: string
  time: string
  status: string
  confidence: number
  aiInsight: string
  mitre: string
}

export interface EngineDetector {
  name: string
  status: string
  detected: number
  category: string
}

export interface ThreatCategoryCount {
  name: string
  count: number
  color: string
  bgColor: string
}

export interface CatalogEntry {
  id: string
  name: string
  category: string
  severity: string
  description: string
  mitre: string
  indicators: string[]
  remediation: string
}

// ── Fetch helper ─────────────────────────────────────────────────────

async function engineFetch<T>(path: string, options?: RequestInit): Promise<T | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

    const res = await fetch(`${AI_ENGINE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    })

    clearTimeout(timeout)

    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    // Engine unreachable — return null so callers can fall back
    return null
  }
}

// ── Public API ───────────────────────────────────────────────────────

/** Check if the AI engine is reachable and healthy. */
export async function isEngineOnline(): Promise<boolean> {
  const health = await engineFetch<EngineHealth>('/health')
  return health?.status === 'healthy' && health.engine_initialized === true
}

/** Get engine health details. */
export async function getEngineHealth(): Promise<EngineHealth | null> {
  return engineFetch<EngineHealth>('/health')
}

/** Get detailed engine status. */
export async function getEngineStatus(): Promise<EngineStatus | null> {
  return engineFetch<EngineStatus>('/engine/status')
}

/** Trigger a scan and get dashboard-formatted results. */
export async function triggerScan(target: string = 'all'): Promise<EngineScanResult | null> {
  return engineFetch<EngineScanResult>(`/dashboard/scan?target=${encodeURIComponent(target)}`, {
    method: 'POST',
  })
}

/** Get dashboard metrics from the engine. */
export async function getEngineMetrics(): Promise<EngineMetrics | null> {
  return engineFetch<EngineMetrics>('/dashboard/metrics')
}

/** Get recent threats from the engine. */
export async function getEngineThreats(limit: number = 10): Promise<EngineThreat[] | null> {
  return engineFetch<EngineThreat[]>(`/dashboard/threats?limit=${limit}`)
}

/** Get detector statuses. */
export async function getEngineDetectors(): Promise<EngineDetector[] | null> {
  return engineFetch<EngineDetector[]>('/dashboard/detectors')
}

/** Get threat category distribution. */
export async function getEngineThreatCategories(): Promise<ThreatCategoryCount[] | null> {
  return engineFetch<ThreatCategoryCount[]>('/dashboard/threat-categories')
}

/** Get full threat catalog. */
export async function getEngineCatalog(): Promise<CatalogEntry[] | null> {
  return engineFetch<CatalogEntry[]>('/dashboard/catalog')
}
