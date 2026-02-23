'use client'

import { useState } from 'react'
import {
  Scan,
  Play,
  CheckCircle,
  Clock,
  AlertTriangle,
  Shield,
  Activity,
  Database,
  Cloud,
  Users,
  ChevronRight,
  Loader2,
} from 'lucide-react'

const scanHistory = [
  {
    id: 'scan_a1b2c3d4e5f6',
    target: 'all',
    status: 'completed',
    startTime: '2024-02-13T10:45:00Z',
    duration: 12500,
    trustScore: 94,
    threatsFound: 3,
    eventsAnalyzed: 15420,
    proofHash: '0x7a8b9c...d4e5f6',
  },
  {
    id: 'scan_f6e5d4c3b2a1',
    target: 'network',
    status: 'completed',
    startTime: '2024-02-13T10:30:00Z',
    duration: 4200,
    trustScore: 98,
    threatsFound: 1,
    eventsAnalyzed: 4850,
    proofHash: '0x1a2b3c...f6e5d4',
  },
  {
    id: 'scan_b2c3d4e5f6a1',
    target: 'identity',
    status: 'running',
    startTime: '2024-02-13T10:50:00Z',
    duration: null,
    trustScore: null,
    threatsFound: null,
    eventsAnalyzed: 2100,
    proofHash: null,
  },
  {
    id: 'scan_c3d4e5f6a1b2',
    target: 'application',
    status: 'completed',
    startTime: '2024-02-13T10:00:00Z',
    duration: 8300,
    trustScore: 87,
    threatsFound: 5,
    eventsAnalyzed: 9200,
    proofHash: '0x3c4d5e...b2c3d4',
  },
  {
    id: 'scan_d4e5f6a1b2c3',
    target: 'data',
    status: 'completed',
    startTime: '2024-02-13T09:30:00Z',
    duration: 6100,
    trustScore: 92,
    threatsFound: 2,
    eventsAnalyzed: 7500,
    proofHash: '0x4d5e6f...c3d4e5',
  },
  {
    id: 'scan_e5f6a1b2c3d4',
    target: 'infrastructure',
    status: 'completed',
    startTime: '2024-02-13T09:00:00Z',
    duration: 5400,
    trustScore: 96,
    threatsFound: 1,
    eventsAnalyzed: 6200,
    proofHash: '0x5e6f7a...d4e5f6',
  },
]

const scanTargets = [
  {
    id: 'all',
    name: 'Full Security Scan',
    description: 'Comprehensive scan across all security domains',
    icon: Shield,
    color: 'lime',
    estimatedTime: '10-15 min',
  },
  {
    id: 'network',
    name: 'Network Security',
    description: 'DDoS, scanning, lateral movement detection',
    icon: Activity,
    color: 'blue',
    estimatedTime: '3-5 min',
  },
  {
    id: 'identity',
    name: 'Identity & Access',
    description: 'Credential attacks, privilege escalation',
    icon: Users,
    color: 'orange',
    estimatedTime: '2-4 min',
  },
  {
    id: 'application',
    name: 'Application Security',
    description: 'SQL injection, XSS, API abuse',
    icon: Scan,
    color: 'purple',
    estimatedTime: '5-8 min',
  },
  {
    id: 'data',
    name: 'Data Protection',
    description: 'Exfiltration, ransomware, PII exposure',
    icon: Database,
    color: 'red',
    estimatedTime: '4-6 min',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'Container, cloud, Kubernetes threats',
    icon: Cloud,
    color: 'cyan',
    estimatedTime: '3-5 min',
  },
]

export default function ScansPage() {
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  const startScan = () => {
    if (!selectedTarget) return
    setIsScanning(true)
    // Simulate scan
    setTimeout(() => {
      setIsScanning(false)
      setSelectedTarget(null)
    }, 3000)
  }

  const targetIcons: Record<string, React.ElementType> = {
    all: Shield,
    network: Activity,
    identity: Users,
    application: Scan,
    data: Database,
    infrastructure: Cloud,
  }

  const targetColors: Record<string, string> = {
    all: 'text-lime bg-lime/10',
    network: 'text-blue-400 bg-blue-500/10',
    identity: 'text-orange-400 bg-orange-500/10',
    application: 'text-purple-400 bg-purple-500/10',
    data: 'text-red-400 bg-red-500/10',
    infrastructure: 'text-cyan-400 bg-cyan-500/10',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Security Scans</h1>
        <p className="text-zinc-400 text-sm">Run scans and view scan history with ZK proofs</p>
      </div>

      {/* New Scan Section */}
      <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Start New Scan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {scanTargets.map((target) => {
            const Icon = target.icon
            const isSelected = selectedTarget === target.id
            const colorClasses: Record<string, string> = {
              lime: 'border-lime/50 bg-lime/5',
              blue: 'border-blue-500/50 bg-blue-500/5',
              orange: 'border-orange-500/50 bg-orange-500/5',
              purple: 'border-purple-500/50 bg-purple-500/5',
              red: 'border-red-500/50 bg-red-500/5',
              cyan: 'border-cyan-500/50 bg-cyan-500/5',
            }
            const iconColors: Record<string, string> = {
              lime: 'text-lime',
              blue: 'text-blue-400',
              orange: 'text-orange-400',
              purple: 'text-purple-400',
              red: 'text-red-400',
              cyan: 'text-cyan-400',
            }

            return (
              <button
                key={target.id}
                onClick={() => setSelectedTarget(target.id)}
                disabled={isScanning}
                className={`p-4 rounded-lg border text-left transition-all ${
                  isSelected
                    ? colorClasses[target.color]
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                } ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${isSelected ? '' : 'bg-zinc-800'}`}>
                    <Icon className={`w-5 h-5 ${isSelected ? iconColors[target.color] : 'text-zinc-400'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{target.name}</div>
                    <div className="text-xs text-zinc-400 mt-1">{target.description}</div>
                    <div className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {target.estimatedTime}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-400">
            {selectedTarget
              ? `Selected: ${scanTargets.find((t) => t.id === selectedTarget)?.name}`
              : 'Select a scan type to continue'}
          </div>
          <button
            onClick={startScan}
            disabled={!selectedTarget || isScanning}
            className="flex items-center gap-2 px-6 py-2 bg-lime text-black font-medium rounded-lg hover:bg-lime/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Scan
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scan History */}
      <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Scan History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-zinc-400 border-b border-white/10 bg-zinc-800/50">
                <th className="px-6 py-3 font-medium">Scan ID</th>
                <th className="px-6 py-3 font-medium">Target</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Trust Score</th>
                <th className="px-6 py-3 font-medium">Threats</th>
                <th className="px-6 py-3 font-medium">Duration</th>
                <th className="px-6 py-3 font-medium">ZK Proof</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {scanHistory.map((scan) => {
                const TargetIcon = targetIcons[scan.target] || Shield
                return (
                  <tr key={scan.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-6 py-4">
                      <code className="text-sm text-zinc-300 font-mono">{scan.id}</code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded ${targetColors[scan.target]}`}>
                          <TargetIcon className="w-4 h-4" />
                        </div>
                        <span className="text-sm text-white capitalize">{scan.target}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {scan.status === 'completed' ? (
                        <div className="flex items-center gap-2 text-lime text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </div>
                      ) : scan.status === 'running' ? (
                        <div className="flex items-center gap-2 text-yellow-400 text-sm">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Running
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                          <Clock className="w-4 h-4" />
                          Pending
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {scan.trustScore !== null ? (
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                scan.trustScore >= 90
                                  ? 'bg-lime'
                                  : scan.trustScore >= 70
                                  ? 'bg-yellow-400'
                                  : 'bg-red-400'
                              }`}
                              style={{ width: `${scan.trustScore}%` }}
                            />
                          </div>
                          <span className="text-sm text-white">{scan.trustScore}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-zinc-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {scan.threatsFound !== null ? (
                        <div className="flex items-center gap-2">
                          {scan.threatsFound > 0 ? (
                            <AlertTriangle className="w-4 h-4 text-orange-400" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-lime" />
                          )}
                          <span className={`text-sm ${scan.threatsFound > 0 ? 'text-orange-400' : 'text-lime'}`}>
                            {scan.threatsFound}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-zinc-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {scan.duration !== null ? (
                        <span className="text-sm text-zinc-400">
                          {(scan.duration / 1000).toFixed(1)}s
                        </span>
                      ) : (
                        <span className="text-sm text-zinc-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {scan.proofHash ? (
                        <code className="text-xs text-lime font-mono bg-lime/10 px-2 py-1 rounded">
                          {scan.proofHash}
                        </code>
                      ) : (
                        <span className="text-sm text-zinc-500">Generating...</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
