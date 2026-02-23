'use client'

import { useState } from 'react'
import {
  Users,
  Shield,
  Key,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserX,
  Lock,
  Eye,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Globe,
  MapPin,
  Activity,
} from 'lucide-react'

const identityMetrics = {
  totalUsers: 1247,
  activeSessions: 342,
  failedLogins24h: 89,
  privilegedAccounts: 23,
}

const authenticationEvents = [
  { time: '00:00', success: 45, failed: 3 },
  { time: '04:00', success: 28, failed: 1 },
  { time: '08:00', success: 156, failed: 12 },
  { time: '12:00', success: 234, failed: 8 },
  { time: '16:00', success: 189, failed: 15 },
  { time: '20:00', success: 78, failed: 4 },
]

const identityThreats = [
  {
    id: 'id_001',
    type: 'Brute Force Attack',
    target: 'admin@company.com',
    source: '185.220.102.240',
    attempts: 523,
    severity: 'critical',
    status: 'blocked',
    time: '5 min ago',
    mitre: 'T1110',
  },
  {
    id: 'id_002',
    type: 'Credential Stuffing',
    target: 'Multiple accounts (47)',
    source: 'Distributed (15 IPs)',
    attempts: 1240,
    severity: 'critical',
    status: 'blocked',
    time: '18 min ago',
    mitre: 'T1110.001',
  },
  {
    id: 'id_003',
    type: 'Privilege Escalation',
    target: 'john.doe@company.com',
    source: '10.0.0.45 (internal)',
    attempts: 3,
    severity: 'high',
    status: 'investigating',
    time: '45 min ago',
    mitre: 'T1068',
  },
  {
    id: 'id_004',
    type: 'Session Hijacking',
    target: 'sarah.smith@company.com',
    source: 'Session token replay',
    attempts: 1,
    severity: 'high',
    status: 'blocked',
    time: '1 hr ago',
    mitre: 'T1185',
  },
  {
    id: 'id_005',
    type: 'MFA Bypass Attempt',
    target: 'cfo@company.com',
    source: 'Push notification spam',
    attempts: 8,
    severity: 'medium',
    status: 'monitoring',
    time: '2 hr ago',
    mitre: 'T1111',
  },
]

const suspiciousLogins = [
  {
    user: 'john.doe@company.com',
    location: 'Moscow, Russia',
    ip: '185.220.102.240',
    device: 'Unknown Device',
    risk: 'high',
    time: '5 min ago',
    reason: 'Impossible travel',
  },
  {
    user: 'jane.smith@company.com',
    location: 'New York, USA',
    ip: '72.14.201.180',
    device: 'New iPhone',
    risk: 'medium',
    time: '32 min ago',
    reason: 'New device',
  },
  {
    user: 'dev.team@company.com',
    location: 'Singapore',
    ip: '103.252.118.90',
    device: 'Linux Server',
    risk: 'low',
    time: '1 hr ago',
    reason: 'Off-hours access',
  },
]

const riskDistribution = [
  { level: 'High Risk', count: 12, percentage: 1, color: 'bg-red-400' },
  { level: 'Medium Risk', count: 45, percentage: 4, color: 'bg-orange-400' },
  { level: 'Low Risk', count: 189, percentage: 15, color: 'bg-yellow-400' },
  { level: 'No Risk', count: 1001, percentage: 80, color: 'bg-lime' },
]

export default function IdentityPage() {
  const [timeRange, setTimeRange] = useState('24h')

  const maxAuth = Math.max(...authenticationEvents.map((e) => e.success + e.failed))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Identity & Access</h1>
          <p className="text-zinc-400 text-sm">
            Monitor authentication, authorization, and identity threats
          </p>
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

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {identityMetrics.totalUsers.toLocaleString()}
          </div>
          <div className="text-sm text-zinc-400">Total Users</div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-lime/10 rounded-lg">
              <Activity className="w-5 h-5 text-lime" />
            </div>
            <span className="text-xs text-lime flex items-center gap-1">
              <ArrowUp className="w-3 h-3" />
              +24
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {identityMetrics.activeSessions}
          </div>
          <div className="text-sm text-zinc-400">Active Sessions</div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <UserX className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-xs text-red-400 flex items-center gap-1">
              <ArrowUp className="w-3 h-3" />
              +12
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {identityMetrics.failedLogins24h}
          </div>
          <div className="text-sm text-zinc-400">Failed Logins (24h)</div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Key className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {identityMetrics.privilegedAccounts}
          </div>
          <div className="text-sm text-zinc-400">Privileged Accounts</div>
        </div>
      </div>

      {/* Auth Activity & Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Authentication Activity */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Authentication Activity</h2>
          <div className="flex items-end gap-4 h-40">
            {authenticationEvents.map((event) => {
              const successHeight = (event.success / maxAuth) * 100
              const failedHeight = (event.failed / maxAuth) * 100
              return (
                <div key={event.time} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1 h-32 justify-end">
                    <div
                      className="w-6 bg-lime/80 rounded-t"
                      style={{ height: `${successHeight}%` }}
                    />
                    <div
                      className="w-6 bg-red-400/80 rounded-b"
                      style={{ height: `${failedHeight * 5}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-500">{event.time}</span>
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-lime rounded" />
              <span className="text-xs text-zinc-400">Successful</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded" />
              <span className="text-xs text-zinc-400">Failed</span>
            </div>
          </div>
        </div>

        {/* User Risk Distribution */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">User Risk Distribution</h2>
          <div className="space-y-4">
            {riskDistribution.map((risk) => (
              <div key={risk.level}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">{risk.level}</span>
                  <span className="text-sm text-zinc-400">
                    {risk.count} users ({risk.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${risk.color}`}
                    style={{ width: `${risk.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-zinc-800/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-lime" />
              <span className="text-white font-medium">95% of users</span>
              <span className="text-zinc-400">have low or no risk scores</span>
            </div>
          </div>
        </div>
      </div>

      {/* Suspicious Logins */}
      <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Suspicious Login Attempts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suspiciousLogins.map((login, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                login.risk === 'high'
                  ? 'border-red-500/30 bg-red-500/5'
                  : login.risk === 'medium'
                  ? 'border-orange-500/30 bg-orange-500/5'
                  : 'border-yellow-500/30 bg-yellow-500/5'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    login.risk === 'high'
                      ? 'bg-red-500/20 text-red-400'
                      : login.risk === 'medium'
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {login.risk.toUpperCase()} RISK
                </div>
                <span className="text-xs text-zinc-500">{login.time}</span>
              </div>
              <div className="text-sm text-white font-medium mb-2">{login.user}</div>
              <div className="space-y-1 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  {login.location}
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3" />
                  {login.ip}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10">
                <span className="text-xs text-zinc-500">Reason: </span>
                <span className="text-xs text-white">{login.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Identity Threats Table */}
      <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Identity Threats</h2>
          <button className="text-sm text-lime hover:text-lime/80 transition-colors">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-zinc-400 border-b border-white/10 bg-zinc-800/50">
                <th className="px-6 py-3 font-medium">Threat Type</th>
                <th className="px-6 py-3 font-medium">Target</th>
                <th className="px-6 py-3 font-medium">Source</th>
                <th className="px-6 py-3 font-medium">Attempts</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">MITRE</th>
              </tr>
            </thead>
            <tbody>
              {identityThreats.map((threat) => (
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
                    <span className="text-sm text-zinc-300">{threat.target}</span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-zinc-400 font-mono">{threat.source}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-300">{threat.attempts.toLocaleString()}</span>
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
                    <a
                      href={`https://attack.mitre.org/techniques/${threat.mitre}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-lime hover:underline font-mono"
                    >
                      {threat.mitre}
                    </a>
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
