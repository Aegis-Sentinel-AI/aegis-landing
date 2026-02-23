'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  Filter,
  Search,
  ChevronDown,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Eye,
} from 'lucide-react'

const threats = [
  {
    id: 'THR-001',
    type: 'SQL Injection',
    category: 'Application',
    severity: 'critical',
    source: '192.168.1.105',
    target: '/api/v1/users',
    time: '2024-02-13T10:45:00Z',
    status: 'blocked',
    confidence: 0.95,
    mitreId: 'T1190',
    description: 'Attempted SQL injection via user_id parameter with UNION SELECT payload',
  },
  {
    id: 'THR-002',
    type: 'Credential Stuffing',
    category: 'Identity',
    severity: 'high',
    source: '45.33.108.22',
    target: '/auth/login',
    time: '2024-02-13T10:32:00Z',
    status: 'blocked',
    confidence: 0.92,
    mitreId: 'T1110.004',
    description: 'Automated login attempts with 847 unique credentials from known breach database',
  },
  {
    id: 'THR-003',
    type: 'DDoS Attack',
    category: 'Network',
    severity: 'critical',
    source: 'Multiple (botnet)',
    target: 'api.example.com',
    time: '2024-02-13T10:15:00Z',
    status: 'mitigated',
    confidence: 0.99,
    mitreId: 'T1498',
    description: 'Volumetric DDoS attack generating 45 Gbps traffic from 12,000+ unique IPs',
  },
  {
    id: 'THR-004',
    type: 'Data Exfiltration',
    category: 'Data',
    severity: 'critical',
    source: '10.0.1.45 (internal)',
    target: 'external.storage.com',
    time: '2024-02-13T09:55:00Z',
    status: 'investigating',
    confidence: 0.78,
    mitreId: 'T1041',
    description: 'Large data transfer (2.4GB) to external storage service outside business hours',
  },
  {
    id: 'THR-005',
    type: 'Privilege Escalation',
    category: 'Identity',
    severity: 'high',
    source: 'user_john.doe',
    target: 'Admin Role',
    time: '2024-02-13T09:42:00Z',
    status: 'blocked',
    confidence: 0.88,
    mitreId: 'T1068',
    description: 'Attempted to modify own role to admin via RBAC manipulation',
  },
  {
    id: 'THR-006',
    type: 'Container Escape',
    category: 'Infrastructure',
    severity: 'critical',
    source: 'pod-worker-5f8d9',
    target: 'Host System',
    time: '2024-02-13T09:30:00Z',
    status: 'blocked',
    confidence: 0.94,
    mitreId: 'T1611',
    description: 'Privileged container attempted to mount host filesystem',
  },
  {
    id: 'THR-007',
    type: 'XSS Attack',
    category: 'Application',
    severity: 'medium',
    source: '203.45.67.89',
    target: '/comments',
    time: '2024-02-13T09:15:00Z',
    status: 'blocked',
    confidence: 0.91,
    mitreId: 'T1059.007',
    description: 'Reflected XSS attempt via comment field with encoded script tag',
  },
  {
    id: 'THR-008',
    type: 'Port Scanning',
    category: 'Network',
    severity: 'low',
    source: '185.220.101.45',
    target: '0.0.0.0/0',
    time: '2024-02-13T08:55:00Z',
    status: 'blocked',
    confidence: 0.85,
    mitreId: 'T1046',
    description: 'Sequential port scan across 1000+ ports from known Tor exit node',
  },
  {
    id: 'THR-009',
    type: 'Ransomware Activity',
    category: 'Data',
    severity: 'critical',
    source: 'workstation-042',
    target: 'File System',
    time: '2024-02-13T08:30:00Z',
    status: 'contained',
    confidence: 0.97,
    mitreId: 'T1486',
    description: 'Mass file encryption detected - 47 files with .locked extension',
  },
  {
    id: 'THR-010',
    type: 'Session Hijacking',
    category: 'Identity',
    severity: 'high',
    source: '78.45.123.99',
    target: 'user_admin',
    time: '2024-02-13T08:12:00Z',
    status: 'blocked',
    confidence: 0.89,
    mitreId: 'T1550.001',
    description: 'Session token used from different IP/user agent than original',
  },
]

const categories = ['All', 'Network', 'Application', 'Identity', 'Data', 'Infrastructure']
const severities = ['All', 'Critical', 'High', 'Medium', 'Low']
const statuses = ['All', 'Blocked', 'Investigating', 'Mitigated', 'Contained']

export default function ThreatsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSeverity, setSelectedSeverity] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedThreat, setExpandedThreat] = useState<string | null>(null)

  const filteredThreats = threats.filter((threat) => {
    if (selectedCategory !== 'All' && threat.category !== selectedCategory) return false
    if (selectedSeverity !== 'All' && threat.severity.toLowerCase() !== selectedSeverity.toLowerCase()) return false
    if (selectedStatus !== 'All' && threat.status.toLowerCase() !== selectedStatus.toLowerCase()) return false
    if (searchQuery && !threat.type.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !threat.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const severityColors = {
    critical: 'bg-red-500/10 text-red-400 border-red-500/30',
    high: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    low: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  }

  const statusColors = {
    blocked: 'text-lime',
    investigating: 'text-yellow-400',
    mitigated: 'text-blue-400',
    contained: 'text-purple-400',
  }

  const statusIcons = {
    blocked: CheckCircle,
    investigating: Eye,
    mitigated: Shield,
    contained: XCircle,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Threat Detection</h1>
        <p className="text-zinc-400 text-sm">Monitor and manage detected security threats</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="text-red-400 text-2xl font-bold">
            {threats.filter(t => t.severity === 'critical').length}
          </div>
          <div className="text-red-400/70 text-sm">Critical</div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <div className="text-orange-400 text-2xl font-bold">
            {threats.filter(t => t.severity === 'high').length}
          </div>
          <div className="text-orange-400/70 text-sm">High</div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="text-yellow-400 text-2xl font-bold">
            {threats.filter(t => t.severity === 'medium').length}
          </div>
          <div className="text-yellow-400/70 text-sm">Medium</div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="text-blue-400 text-2xl font-bold">
            {threats.filter(t => t.severity === 'low').length}
          </div>
          <div className="text-blue-400/70 text-sm">Low</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search threats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime/50"
          />
        </div>
        <FilterDropdown
          label="Category"
          value={selectedCategory}
          options={categories}
          onChange={setSelectedCategory}
        />
        <FilterDropdown
          label="Severity"
          value={selectedSeverity}
          options={severities}
          onChange={setSelectedSeverity}
        />
        <FilterDropdown
          label="Status"
          value={selectedStatus}
          options={statuses}
          onChange={setSelectedStatus}
        />
      </div>

      {/* Threats List */}
      <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-zinc-400 border-b border-white/10 bg-zinc-800/50">
                <th className="px-6 py-3 font-medium">Threat</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">Source</th>
                <th className="px-6 py-3 font-medium">Confidence</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredThreats.map((threat) => {
                const StatusIcon = statusIcons[threat.status as keyof typeof statusIcons] || CheckCircle
                const isExpanded = expandedThreat === threat.id

                return (
                  <>
                    <tr
                      key={threat.id}
                      onClick={() => setExpandedThreat(isExpanded ? null : threat.id)}
                      className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <AlertTriangle
                            className={`w-4 h-4 flex-shrink-0 ${
                              threat.severity === 'critical'
                                ? 'text-red-400'
                                : threat.severity === 'high'
                                ? 'text-orange-400'
                                : threat.severity === 'medium'
                                ? 'text-yellow-400'
                                : 'text-blue-400'
                            }`}
                          />
                          <div>
                            <div className="text-sm text-white font-medium">{threat.type}</div>
                            <div className="text-xs text-zinc-500">{threat.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-zinc-300">{threat.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full border capitalize ${
                            severityColors[threat.severity as keyof typeof severityColors]
                          }`}
                        >
                          {threat.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-sm text-zinc-400 font-mono">{threat.source}</code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-lime rounded-full"
                              style={{ width: `${threat.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-zinc-400">
                            {Math.round(threat.confidence * 100)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`flex items-center gap-2 text-sm capitalize ${
                            statusColors[threat.status as keyof typeof statusColors]
                          }`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {threat.status}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                          <Clock className="w-3 h-3" />
                          {new Date(threat.time).toLocaleTimeString()}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-zinc-800/50">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-white mb-2">Description</h4>
                              <p className="text-sm text-zinc-400">{threat.description}</p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-zinc-500">Target:</span>
                                <code className="text-xs text-zinc-300 font-mono">{threat.target}</code>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-zinc-500">MITRE ATT&CK:</span>
                                <a
                                  href={`https://attack.mitre.org/techniques/${threat.mitreId}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-lime hover:underline flex items-center gap-1"
                                >
                                  {threat.mitreId}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-sm text-white hover:bg-zinc-800"
      >
        <Filter className="w-4 h-4 text-zinc-400" />
        {label}: {value}
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-20 bg-zinc-800 border border-white/10 rounded-lg shadow-xl overflow-hidden min-w-[150px]">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 ${
                  value === option ? 'text-lime bg-lime/10' : 'text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
