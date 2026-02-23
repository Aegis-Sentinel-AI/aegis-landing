'use client'

import { useState } from 'react'
import {
  Activity,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Wifi,
  Server,
  Zap,
  TrendingUp,
  Eye,
} from 'lucide-react'

const networkMetrics = {
  packetsAnalyzed: 2450890,
  activeConnections: 342,
  blockedIps: 47,
  avgLatency: 24,
}

const trafficStats = [
  { protocol: 'HTTPS', percentage: 68, bytes: '12.4 GB', color: 'bg-lime' },
  { protocol: 'HTTP', percentage: 15, bytes: '2.8 GB', color: 'bg-yellow-400' },
  { protocol: 'DNS', percentage: 10, bytes: '1.9 GB', color: 'bg-blue-400' },
  { protocol: 'SSH', percentage: 5, bytes: '940 MB', color: 'bg-purple-400' },
  { protocol: 'Other', percentage: 2, bytes: '380 MB', color: 'bg-zinc-500' },
]

const recentNetworkThreats = [
  {
    id: 'net_001',
    type: 'DDoS Attack',
    source: '185.220.102.240',
    target: 'api.example.com:443',
    severity: 'critical',
    packets: 15420,
    status: 'blocked',
    time: '2 min ago',
  },
  {
    id: 'net_002',
    type: 'Port Scanning',
    source: '94.102.49.190',
    target: 'Multiple ports (22, 23, 80, 443, 8080)',
    severity: 'high',
    packets: 2840,
    status: 'blocked',
    time: '15 min ago',
  },
  {
    id: 'net_003',
    type: 'DNS Tunneling',
    source: '192.168.1.45 (internal)',
    target: 'suspicious.domain.xyz',
    severity: 'high',
    packets: 890,
    status: 'investigating',
    time: '28 min ago',
  },
  {
    id: 'net_004',
    type: 'Lateral Movement',
    source: '10.0.0.15 (internal)',
    target: '10.0.0.22, 10.0.0.34, 10.0.0.56',
    severity: 'medium',
    packets: 456,
    status: 'monitoring',
    time: '1 hr ago',
  },
  {
    id: 'net_005',
    type: 'C2 Communication',
    source: '172.16.0.89 (internal)',
    target: '45.142.122.100:8443',
    severity: 'critical',
    packets: 234,
    status: 'blocked',
    time: '2 hr ago',
  },
]

const topBlockedIps = [
  { ip: '185.220.102.240', country: 'Russia', attempts: 15420, lastSeen: '2 min ago' },
  { ip: '94.102.49.190', country: 'Netherlands', attempts: 2840, lastSeen: '15 min ago' },
  { ip: '23.129.64.210', country: 'United States', attempts: 1250, lastSeen: '45 min ago' },
  { ip: '185.56.80.65', country: 'Romania', attempts: 890, lastSeen: '1 hr ago' },
  { ip: '45.142.122.100', country: 'Germany', attempts: 456, lastSeen: '2 hr ago' },
]

export default function NetworkPage() {
  const [timeRange, setTimeRange] = useState('24h')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Network Security</h1>
          <p className="text-zinc-400 text-sm">Real-time network threat monitoring and analysis</p>
        </div>
        <div className="flex items-center gap-2">
          {['1h', '24h', '7d', '30d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                timeRange === range
                  ? 'bg-lime text-black font-medium'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Network Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs text-lime flex items-center gap-1">
              <ArrowUp className="w-3 h-3" />
              +12.5%
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {(networkMetrics.packetsAnalyzed / 1000000).toFixed(2)}M
          </div>
          <div className="text-sm text-zinc-400">Packets Analyzed</div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-lime/10 rounded-lg">
              <Wifi className="w-5 h-5 text-lime" />
            </div>
            <span className="text-xs text-lime flex items-center gap-1">
              <ArrowUp className="w-3 h-3" />
              +5
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{networkMetrics.activeConnections}</div>
          <div className="text-sm text-zinc-400">Active Connections</div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-xs text-lime flex items-center gap-1">
              <ArrowDown className="w-3 h-3" />
              -8
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{networkMetrics.blockedIps}</div>
          <div className="text-sm text-zinc-400">Blocked IPs (24h)</div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs text-lime flex items-center gap-1">
              <ArrowDown className="w-3 h-3" />
              -2ms
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{networkMetrics.avgLatency}ms</div>
          <div className="text-sm text-zinc-400">Avg Response Time</div>
        </div>
      </div>

      {/* Traffic Distribution & Top Blocked */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic by Protocol */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Traffic by Protocol</h2>
          <div className="space-y-4">
            {trafficStats.map((stat) => (
              <div key={stat.protocol}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">{stat.protocol}</span>
                  <span className="text-sm text-zinc-400">
                    {stat.bytes} ({stat.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${stat.color}`}
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Blocked IPs */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Top Blocked IPs</h2>
          <div className="space-y-3">
            {topBlockedIps.map((ip, index) => (
              <div
                key={ip.ip}
                className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-lg"
              >
                <div className="w-6 h-6 flex items-center justify-center text-xs font-bold text-lime bg-lime/10 rounded-full">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-white font-mono">{ip.ip}</code>
                    <span className="text-xs text-zinc-500">{ip.country}</span>
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    {ip.attempts.toLocaleString()} attempts • {ip.lastSeen}
                  </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network Threats Table */}
      <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Network Threats</h2>
          <button className="text-sm text-lime hover:text-lime/80 transition-colors">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-zinc-400 border-b border-white/10 bg-zinc-800/50">
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Source</th>
                <th className="px-6 py-3 font-medium">Target</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">Packets</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentNetworkThreats.map((threat) => (
                <tr key={threat.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          threat.severity === 'critical'
                            ? 'text-red-400'
                            : threat.severity === 'high'
                            ? 'text-orange-400'
                            : 'text-yellow-400'
                        }`}
                      />
                      <span className="text-sm text-white font-medium">{threat.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-zinc-300 font-mono">{threat.source}</code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-zinc-400 font-mono text-xs">{threat.target}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        threat.severity === 'critical'
                          ? 'bg-red-500/10 text-red-400'
                          : threat.severity === 'high'
                          ? 'bg-orange-500/10 text-orange-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}
                    >
                      {threat.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-300">{threat.packets.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {threat.status === 'blocked' ? (
                        <CheckCircle className="w-4 h-4 text-lime" />
                      ) : threat.status === 'investigating' ? (
                        <Clock className="w-4 h-4 text-yellow-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-blue-400" />
                      )}
                      <span
                        className={`text-sm capitalize ${
                          threat.status === 'blocked'
                            ? 'text-lime'
                            : threat.status === 'investigating'
                            ? 'text-yellow-400'
                            : 'text-blue-400'
                        }`}
                      >
                        {threat.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-400">{threat.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
