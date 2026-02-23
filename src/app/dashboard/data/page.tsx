'use client'

import { useState } from 'react'
import {
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lock,
  Eye,
  ArrowUp,
  ArrowDown,
  FileWarning,
  HardDrive,
  Cloud,
  Folder,
  TrendingUp,
  FileText,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'

const dataMetrics = {
  dataAssets: 1456,
  sensitiveFiles: 234,
  encryptedData: 98.5,
  activeAlerts: 7,
}

const dataClassification = [
  { type: 'Public', count: 892, percentage: 61, color: 'bg-lime' },
  { type: 'Internal', count: 312, percentage: 22, color: 'bg-blue-400' },
  { type: 'Confidential', count: 189, percentage: 13, color: 'bg-orange-400' },
  { type: 'Restricted', count: 63, percentage: 4, color: 'bg-red-400' },
]

const dataSecurityThreats = [
  {
    id: 'data_001',
    type: 'Data Exfiltration',
    description: 'Large file transfer to external destination',
    source: 'user: john.doe',
    destination: 'external IP: 45.142.122.100',
    dataVolume: '2.4 GB',
    severity: 'critical',
    status: 'blocked',
    time: '8 min ago',
    mitre: 'T1041',
  },
  {
    id: 'data_002',
    type: 'Ransomware Activity',
    description: 'Mass file encryption detected',
    source: 'endpoint: WS-FINANCE-02',
    destination: 'Local filesystem',
    dataVolume: '450 MB',
    severity: 'critical',
    status: 'blocked',
    time: '25 min ago',
    mitre: 'T1486',
  },
  {
    id: 'data_003',
    type: 'PII Exposure',
    description: 'Unencrypted customer data in S3 bucket',
    source: 's3://company-data/customers/',
    destination: 'Public access',
    dataVolume: '12,450 records',
    severity: 'high',
    status: 'remediated',
    time: '1 hr ago',
    mitre: 'T1530',
  },
  {
    id: 'data_004',
    type: 'Database Breach Attempt',
    description: 'Bulk data query from unauthorized source',
    source: '10.0.0.45 (API server)',
    destination: 'PostgreSQL production',
    dataVolume: '50,000 rows',
    severity: 'high',
    status: 'investigating',
    time: '2 hr ago',
    mitre: 'T1213',
  },
  {
    id: 'data_005',
    type: 'Sensitive Data in Logs',
    description: 'Credit card numbers found in application logs',
    source: '/var/log/app/transactions.log',
    destination: 'Log aggregator',
    dataVolume: '89 occurrences',
    severity: 'medium',
    status: 'monitoring',
    time: '4 hr ago',
    mitre: 'T1552',
  },
]

const storageLocations = [
  {
    name: 'Production Database',
    type: 'PostgreSQL',
    icon: Database,
    size: '245 GB',
    sensitiveData: true,
    encrypted: true,
    lastScan: '2 hours ago',
    riskLevel: 'low',
  },
  {
    name: 'AWS S3 Buckets',
    type: 'Cloud Storage',
    icon: Cloud,
    size: '1.2 TB',
    sensitiveData: true,
    encrypted: true,
    lastScan: '1 hour ago',
    riskLevel: 'medium',
  },
  {
    name: 'File Servers',
    type: 'Network Storage',
    icon: HardDrive,
    size: '890 GB',
    sensitiveData: true,
    encrypted: false,
    lastScan: '30 min ago',
    riskLevel: 'high',
  },
  {
    name: 'SharePoint',
    type: 'Document Store',
    icon: Folder,
    size: '156 GB',
    sensitiveData: false,
    encrypted: true,
    lastScan: '45 min ago',
    riskLevel: 'low',
  },
]

const recentDataAccess = [
  { user: 'sarah.smith@company.com', file: 'Q4_Financial_Report.xlsx', action: 'Download', time: '5 min ago', risk: 'normal' },
  { user: 'john.doe@company.com', file: 'employee_salaries.csv', action: 'Export', time: '12 min ago', risk: 'elevated' },
  { user: 'api-service-account', file: 'customer_database.sql', action: 'Bulk Read', time: '28 min ago', risk: 'high' },
  { user: 'admin@company.com', file: 'encryption_keys.json', action: 'Access', time: '1 hr ago', risk: 'normal' },
]

export default function DataPage() {
  const [timeRange, setTimeRange] = useState('24h')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Data Security</h1>
          <p className="text-zinc-400 text-sm">
            Monitor data access, classification, and protect against exfiltration
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
              <Database className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs text-lime flex items-center gap-1">
              <ArrowUp className="w-3 h-3" />
              +45
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {dataMetrics.dataAssets.toLocaleString()}
          </div>
          <div className="text-sm text-zinc-400">Data Assets Tracked</div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <FileWarning className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{dataMetrics.sensitiveFiles}</div>
          <div className="text-sm text-zinc-400">Sensitive Files</div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-lime/10 rounded-lg">
              <Lock className="w-5 h-5 text-lime" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{dataMetrics.encryptedData}%</div>
          <div className="text-sm text-zinc-400">Data Encrypted</div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-xs text-red-400 flex items-center gap-1">
              <ArrowUp className="w-3 h-3" />
              +2
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{dataMetrics.activeAlerts}</div>
          <div className="text-sm text-zinc-400">Active Alerts</div>
        </div>
      </div>

      {/* Data Classification & Storage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Classification */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Data Classification</h2>
          <div className="space-y-4">
            {dataClassification.map((item) => (
              <div key={item.type}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">{item.type}</span>
                  <span className="text-sm text-zinc-400">
                    {item.count} files ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Locations */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Storage Locations</h2>
          <div className="space-y-3">
            {storageLocations.map((location) => {
              const Icon = location.icon
              return (
                <div
                  key={location.name}
                  className={`p-4 rounded-lg border ${
                    location.riskLevel === 'high'
                      ? 'border-red-500/30 bg-red-500/5'
                      : location.riskLevel === 'medium'
                      ? 'border-orange-500/30 bg-orange-500/5'
                      : 'border-white/10 bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-zinc-800 rounded-lg">
                      <Icon className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">{location.name}</span>
                        <span className="text-xs text-zinc-500">{location.size}</span>
                      </div>
                      <div className="text-xs text-zinc-400 mt-1">{location.type}</div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-xs">
                          {location.encrypted ? (
                            <>
                              <Lock className="w-3 h-3 text-lime" />
                              <span className="text-lime">Encrypted</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-3 h-3 text-red-400" />
                              <span className="text-red-400">Not Encrypted</span>
                            </>
                          )}
                        </div>
                        <span className="text-xs text-zinc-500">Scanned: {location.lastScan}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Data Access */}
      <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Sensitive Data Access</h2>
        <div className="space-y-3">
          {recentDataAccess.map((access, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-lg"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  access.risk === 'high'
                    ? 'bg-red-400'
                    : access.risk === 'elevated'
                    ? 'bg-orange-400'
                    : 'bg-lime'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-white font-medium truncate">{access.file}</span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  {access.user} • {access.action}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    access.risk === 'high'
                      ? 'bg-red-500/10 text-red-400'
                      : access.risk === 'elevated'
                      ? 'bg-orange-500/10 text-orange-400'
                      : 'bg-zinc-700 text-zinc-400'
                  }`}
                >
                  {access.risk}
                </span>
                <span className="text-xs text-zinc-500">{access.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Security Threats */}
      <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Data Security Threats</h2>
          <button className="text-sm text-lime hover:text-lime/80 transition-colors">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-zinc-400 border-b border-white/10 bg-zinc-800/50">
                <th className="px-6 py-3 font-medium">Threat Type</th>
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium">Data Volume</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">MITRE</th>
              </tr>
            </thead>
            <tbody>
              {dataSecurityThreats.map((threat) => (
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
                    <span className="text-sm text-zinc-400">{threat.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-300 font-mono">{threat.dataVolume}</span>
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
                      {threat.status === 'blocked' || threat.status === 'remediated' ? (
                        <CheckCircle className="w-4 h-4 text-lime" />
                      ) : threat.status === 'investigating' ? (
                        <Clock className="w-4 h-4 text-yellow-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-blue-400" />
                      )}
                      <span
                        className={`text-sm capitalize ${
                          threat.status === 'blocked' || threat.status === 'remediated'
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
                      className="text-xs text-lime hover:underline font-mono flex items-center gap-1"
                    >
                      {threat.mitre}
                      <ExternalLink className="w-3 h-3" />
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
