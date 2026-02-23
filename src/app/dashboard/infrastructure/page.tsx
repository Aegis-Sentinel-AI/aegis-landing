'use client'

import { useState } from 'react'
import {
  Cloud,
  Server,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  ArrowUp,
  ArrowDown,
  Box,
  Cpu,
  HardDrive,
  Wifi,
  Container,
  Layers,
  Settings,
  ExternalLink,
  Activity,
} from 'lucide-react'

const infraMetrics = {
  totalResources: 248,
  containers: 156,
  cloudInstances: 67,
  criticalFindings: 4,
}

const resourceHealth = [
  { name: 'AWS Resources', healthy: 45, warning: 3, critical: 1, total: 49 },
  { name: 'Kubernetes Clusters', healthy: 12, warning: 1, critical: 0, total: 13 },
  { name: 'Docker Containers', healthy: 142, warning: 8, critical: 2, total: 152 },
  { name: 'On-Premise Servers', healthy: 28, warning: 4, critical: 1, total: 33 },
]

const infrastructureThreats = [
  {
    id: 'infra_001',
    type: 'Container Escape',
    target: 'k8s-prod/payment-service-7f9d8',
    description: 'Privileged container with host path mount',
    severity: 'critical',
    status: 'investigating',
    time: '12 min ago',
    mitre: 'T1611',
  },
  {
    id: 'infra_002',
    type: 'Kubernetes RBAC Misconfiguration',
    target: 'default namespace',
    description: 'Service account with cluster-admin privileges',
    severity: 'critical',
    status: 'remediated',
    time: '45 min ago',
    mitre: 'T1078.004',
  },
  {
    id: 'infra_003',
    type: 'Cloud Misconfiguration',
    target: 'AWS IAM Role: prod-lambda-exec',
    description: 'Overly permissive IAM policy (s3:*)',
    severity: 'high',
    status: 'monitoring',
    time: '1 hr ago',
    mitre: 'T1562.007',
  },
  {
    id: 'infra_004',
    type: 'Cryptomining Activity',
    target: 'EC2 instance i-0a1b2c3d4e5f',
    description: 'High CPU usage, mining pool connection detected',
    severity: 'high',
    status: 'blocked',
    time: '2 hr ago',
    mitre: 'T1496',
  },
  {
    id: 'infra_005',
    type: 'Exposed Service',
    target: 'Redis: 10.0.0.45:6379',
    description: 'Redis instance accessible without authentication',
    severity: 'high',
    status: 'remediated',
    time: '3 hr ago',
    mitre: 'T1190',
  },
]

const cloudProviders = [
  {
    name: 'AWS',
    icon: '☁️',
    resources: 49,
    regions: 3,
    spend: '$12,450/mo',
    compliance: 94,
    findings: 4,
  },
  {
    name: 'Azure',
    icon: '🔷',
    resources: 12,
    regions: 2,
    spend: '$3,200/mo',
    compliance: 98,
    findings: 1,
  },
  {
    name: 'GCP',
    icon: '🌐',
    resources: 6,
    regions: 1,
    spend: '$890/mo',
    compliance: 100,
    findings: 0,
  },
]

const kubernetesWorkloads = [
  { namespace: 'production', pods: 45, healthy: 44, cpu: 68, memory: 72 },
  { namespace: 'staging', pods: 23, healthy: 23, cpu: 45, memory: 58 },
  { namespace: 'monitoring', pods: 12, healthy: 12, cpu: 32, memory: 41 },
  { namespace: 'kube-system', pods: 18, healthy: 17, cpu: 25, memory: 34 },
]

const complianceChecks = [
  { name: 'CIS Kubernetes Benchmark', passed: 89, failed: 11, total: 100 },
  { name: 'CIS Docker Benchmark', passed: 45, failed: 5, total: 50 },
  { name: 'AWS Security Best Practices', passed: 72, failed: 8, total: 80 },
  { name: 'SOC 2 Controls', passed: 65, failed: 5, total: 70 },
]

export default function InfrastructurePage() {
  const [view, setView] = useState<'cloud' | 'kubernetes' | 'containers'>('cloud')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Infrastructure Security</h1>
          <p className="text-zinc-400 text-sm">
            Monitor cloud, Kubernetes, and container security posture
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[
            { id: 'cloud', label: 'Cloud', icon: Cloud },
            { id: 'kubernetes', label: 'Kubernetes', icon: Layers },
            { id: 'containers', label: 'Containers', icon: Box },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setView(tab.id as 'cloud' | 'kubernetes' | 'containers')}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  view === tab.id
                    ? 'bg-lime text-black font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Server className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs text-lime flex items-center gap-1">
              <ArrowUp className="w-3 h-3" />
              +12
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{infraMetrics.totalResources}</div>
          <div className="text-sm text-zinc-400">Total Resources</div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Box className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{infraMetrics.containers}</div>
          <div className="text-sm text-zinc-400">Active Containers</div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Cloud className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{infraMetrics.cloudInstances}</div>
          <div className="text-sm text-zinc-400">Cloud Instances</div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{infraMetrics.criticalFindings}</div>
          <div className="text-sm text-zinc-400">Critical Findings</div>
        </div>
      </div>

      {/* Resource Health & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Health */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Resource Health</h2>
          <div className="space-y-4">
            {resourceHealth.map((resource) => {
              const healthPercentage = (resource.healthy / resource.total) * 100
              return (
                <div key={resource.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white">{resource.name}</span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-lime">{resource.healthy} healthy</span>
                      {resource.warning > 0 && (
                        <span className="text-yellow-400">{resource.warning} warning</span>
                      )}
                      {resource.critical > 0 && (
                        <span className="text-red-400">{resource.critical} critical</span>
                      )}
                    </div>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-lime"
                      style={{ width: `${(resource.healthy / resource.total) * 100}%` }}
                    />
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${(resource.warning / resource.total) * 100}%` }}
                    />
                    <div
                      className="h-full bg-red-400"
                      style={{ width: `${(resource.critical / resource.total) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Compliance Status</h2>
          <div className="space-y-4">
            {complianceChecks.map((check) => {
              const passRate = Math.round((check.passed / check.total) * 100)
              return (
                <div key={check.name} className="p-3 bg-zinc-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white">{check.name}</span>
                    <span
                      className={`text-sm font-medium ${
                        passRate >= 90
                          ? 'text-lime'
                          : passRate >= 70
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      {passRate}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <CheckCircle className="w-3 h-3 text-lime" />
                    <span>{check.passed} passed</span>
                    <span className="text-zinc-600">•</span>
                    <AlertTriangle className="w-3 h-3 text-red-400" />
                    <span>{check.failed} failed</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Cloud Providers / Kubernetes based on view */}
      {view === 'cloud' && (
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Cloud Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cloudProviders.map((provider) => (
              <div
                key={provider.name}
                className="p-4 bg-zinc-800/50 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{provider.icon}</span>
                    <span className="text-lg font-medium text-white">{provider.name}</span>
                  </div>
                  {provider.findings > 0 && (
                    <span className="px-2 py-1 text-xs bg-red-500/10 text-red-400 rounded">
                      {provider.findings} findings
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-zinc-400">Resources</div>
                    <div className="text-white font-medium">{provider.resources}</div>
                  </div>
                  <div>
                    <div className="text-zinc-400">Regions</div>
                    <div className="text-white font-medium">{provider.regions}</div>
                  </div>
                  <div>
                    <div className="text-zinc-400">Monthly Spend</div>
                    <div className="text-white font-medium">{provider.spend}</div>
                  </div>
                  <div>
                    <div className="text-zinc-400">Compliance</div>
                    <div
                      className={`font-medium ${
                        provider.compliance >= 95 ? 'text-lime' : 'text-yellow-400'
                      }`}
                    >
                      {provider.compliance}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'kubernetes' && (
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Kubernetes Workloads</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-zinc-400 border-b border-white/10">
                  <th className="pb-3 font-medium">Namespace</th>
                  <th className="pb-3 font-medium">Pods</th>
                  <th className="pb-3 font-medium">Health</th>
                  <th className="pb-3 font-medium">CPU Usage</th>
                  <th className="pb-3 font-medium">Memory Usage</th>
                </tr>
              </thead>
              <tbody>
                {kubernetesWorkloads.map((workload) => (
                  <tr key={workload.namespace} className="border-b border-white/5">
                    <td className="py-3">
                      <code className="text-sm text-lime font-mono">{workload.namespace}</code>
                    </td>
                    <td className="py-3 text-sm text-white">{workload.pods}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {workload.healthy === workload.pods ? (
                          <CheckCircle className="w-4 h-4 text-lime" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        )}
                        <span className="text-sm text-white">
                          {workload.healthy}/{workload.pods}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-zinc-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              workload.cpu > 80
                                ? 'bg-red-400'
                                : workload.cpu > 60
                                ? 'bg-yellow-400'
                                : 'bg-lime'
                            }`}
                            style={{ width: `${workload.cpu}%` }}
                          />
                        </div>
                        <span className="text-xs text-zinc-400">{workload.cpu}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-zinc-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              workload.memory > 80
                                ? 'bg-red-400'
                                : workload.memory > 60
                                ? 'bg-yellow-400'
                                : 'bg-lime'
                            }`}
                            style={{ width: `${workload.memory}%` }}
                          />
                        </div>
                        <span className="text-xs text-zinc-400">{workload.memory}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === 'containers' && (
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Container Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <div className="text-sm text-zinc-400 mb-2">Image Vulnerabilities</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">24</span>
                <span className="text-xs text-red-400">Critical</span>
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                45 High • 89 Medium • 156 Low
              </div>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <div className="text-sm text-zinc-400 mb-2">Privileged Containers</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-orange-400">3</span>
                <span className="text-xs text-zinc-400">of 156</span>
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                Requires security review
              </div>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <div className="text-sm text-zinc-400 mb-2">Root Containers</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-red-400">7</span>
                <span className="text-xs text-zinc-400">running as root</span>
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                Security risk: escalation
              </div>
            </div>
          </div>
          <div className="p-4 bg-lime/5 border border-lime/20 rounded-lg">
            <div className="flex items-center gap-2 text-lime text-sm font-medium mb-2">
              <Shield className="w-4 h-4" />
              Security Recommendations
            </div>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li>• Update base image for payment-service (CVE-2024-1234)</li>
              <li>• Remove privileged flag from monitoring containers</li>
              <li>• Configure non-root users for 7 containers</li>
            </ul>
          </div>
        </div>
      )}

      {/* Infrastructure Threats */}
      <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Infrastructure Threats</h2>
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
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">MITRE</th>
              </tr>
            </thead>
            <tbody>
              {infrastructureThreats.map((threat) => (
                <tr key={threat.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          threat.severity === 'critical'
                            ? 'text-red-400'
                            : 'text-orange-400'
                        }`}
                      />
                      <span className="text-sm text-white font-medium">{threat.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-zinc-300 font-mono">{threat.target}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-400">{threat.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        threat.severity === 'critical'
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-orange-500/10 text-orange-400'
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
