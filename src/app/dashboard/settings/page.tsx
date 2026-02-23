'use client'

import { useState } from 'react'
import {
  Settings,
  Shield,
  Bell,
  Users,
  Key,
  Webhook,
  Database,
  Clock,
  Globe,
  Save,
  CheckCircle,
  Link,
  Mail,
  Smartphone,
  AlertTriangle,
} from 'lucide-react'

const sections = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Webhook },
  { id: 'api', label: 'API Keys', icon: Key },
]

const integrations = [
  {
    name: 'Slack',
    description: 'Send alerts to Slack channels',
    connected: true,
    icon: '💬',
  },
  {
    name: 'Discord',
    description: 'Bot integration for Discord servers',
    connected: true,
    icon: '🎮',
  },
  {
    name: 'PagerDuty',
    description: 'Critical incident escalation',
    connected: false,
    icon: '📟',
  },
  {
    name: 'Jira',
    description: 'Create tickets for security findings',
    connected: false,
    icon: '📋',
  },
  {
    name: 'Splunk',
    description: 'Forward logs to Splunk SIEM',
    connected: true,
    icon: '📊',
  },
  {
    name: 'AWS Security Hub',
    description: 'Sync findings with AWS Security Hub',
    connected: true,
    icon: '☁️',
  },
]

const apiKeys = [
  {
    name: 'Production API Key',
    key: 'sk_live_****************************8f9d',
    created: '2024-01-15',
    lastUsed: '2 minutes ago',
    permissions: ['read', 'write', 'scan'],
  },
  {
    name: 'Staging API Key',
    key: 'sk_test_****************************2a4b',
    created: '2024-02-01',
    lastUsed: '1 hour ago',
    permissions: ['read', 'scan'],
  },
  {
    name: 'CI/CD Integration',
    key: 'sk_ci_******************************7c3e',
    created: '2024-01-20',
    lastUsed: '15 minutes ago',
    permissions: ['read', 'scan'],
  },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general')
  const [settings, setSettings] = useState({
    // General
    organizationName: 'Aegis Corp',
    timezone: 'UTC',
    dataRetention: '90',
    // Security
    mfaRequired: true,
    sessionTimeout: '30',
    ipWhitelist: true,
    zkProofsEnabled: true,
    // Notifications
    emailAlerts: true,
    slackAlerts: true,
    criticalSms: true,
    weeklyDigest: true,
    realTimeThreats: true,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const ToggleSwitch = ({
    enabled,
    onChange,
  }: {
    enabled: boolean
    onChange: () => void
  }) => (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        enabled ? 'bg-lime' : 'bg-zinc-700'
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
          enabled ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-zinc-400 text-sm">
            Configure your Aegis Sentinel security dashboard
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-lime text-black font-medium rounded-lg hover:bg-lime/90 transition-colors"
        >
          {saved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 h-fit">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    activeSection === section.id
                      ? 'bg-lime/10 text-lime'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === 'general' && (
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">General Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={settings.organizationName}
                    onChange={(e) =>
                      setSettings({ ...settings, organizationName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-lime"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) =>
                      setSettings({ ...settings, timezone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-lime"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Oslo">Oslo (CET)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Data Retention (days)
                  </label>
                  <select
                    value={settings.dataRetention}
                    onChange={(e) =>
                      setSettings({ ...settings, dataRetention: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-lime"
                  >
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                    <option value="365">1 year</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <div className="text-sm text-white font-medium">
                      Require MFA for all users
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Enforce multi-factor authentication
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.mfaRequired}
                    onChange={() =>
                      setSettings({ ...settings, mfaRequired: !settings.mfaRequired })
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <div className="text-sm text-white font-medium">IP Whitelist</div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Only allow access from approved IP ranges
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.ipWhitelist}
                    onChange={() =>
                      setSettings({ ...settings, ipWhitelist: !settings.ipWhitelist })
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <div className="text-sm text-white font-medium">ZK Proofs</div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Generate zero-knowledge proofs for all scans
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.zkProofsEnabled}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        zkProofsEnabled: !settings.zkProofsEnabled,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <select
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      setSettings({ ...settings, sessionTimeout: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-lime"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-lg">
                      <Mail className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">Email Alerts</div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Send threat alerts via email
                      </div>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.emailAlerts}
                    onChange={() =>
                      setSettings({ ...settings, emailAlerts: !settings.emailAlerts })
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-lg">
                      <span className="text-lg">💬</span>
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">Slack Alerts</div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Post alerts to connected Slack channels
                      </div>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.slackAlerts}
                    onChange={() =>
                      setSettings({ ...settings, slackAlerts: !settings.slackAlerts })
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-lg">
                      <Smartphone className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">
                        Critical SMS Alerts
                      </div>
                      <div className="text-xs text-zinc-400 mt-1">
                        SMS for critical severity threats only
                      </div>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.criticalSms}
                    onChange={() =>
                      setSettings({ ...settings, criticalSms: !settings.criticalSms })
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">
                        Real-time Threat Alerts
                      </div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Instant alerts for detected threats
                      </div>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.realTimeThreats}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        realTimeThreats: !settings.realTimeThreats,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-lg">
                      <Clock className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">Weekly Digest</div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Weekly summary of security status
                      </div>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.weeklyDigest}
                    onChange={() =>
                      setSettings({ ...settings, weeklyDigest: !settings.weeklyDigest })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className={`p-4 rounded-lg border ${
                      integration.connected
                        ? 'border-lime/30 bg-lime/5'
                        : 'border-white/10 bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{integration.icon}</span>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {integration.name}
                          </div>
                          <div className="text-xs text-zinc-400 mt-1">
                            {integration.description}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      {integration.connected ? (
                        <div className="flex items-center gap-2 text-xs text-lime">
                          <CheckCircle className="w-3 h-3" />
                          Connected
                        </div>
                      ) : (
                        <div className="text-xs text-zinc-500">Not connected</div>
                      )}
                      <button
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          integration.connected
                            ? 'text-zinc-400 hover:text-white hover:bg-white/10'
                            : 'bg-lime text-black hover:bg-lime/90'
                        }`}
                      >
                        {integration.connected ? 'Configure' : 'Connect'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'api' && (
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">API Keys</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-lime text-black text-sm font-medium rounded-lg hover:bg-lime/90 transition-colors">
                  <Key className="w-4 h-4" />
                  Create New Key
                </button>
              </div>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div
                    key={apiKey.name}
                    className="p-4 bg-zinc-800/50 border border-white/10 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm font-medium text-white">{apiKey.name}</div>
                        <code className="text-xs text-zinc-400 font-mono mt-1 block">
                          {apiKey.key}
                        </code>
                      </div>
                      <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
                        Revoke
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span>Created: {apiKey.created}</span>
                      <span>Last used: {apiKey.lastUsed}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {apiKey.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="px-2 py-1 text-xs bg-zinc-700 text-zinc-300 rounded"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-zinc-800/50 border border-white/10 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-lime mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-white">API Security</div>
                    <div className="text-xs text-zinc-400 mt-1">
                      API keys grant programmatic access to your Aegis Sentinel account.
                      Keep them secure and rotate them regularly. Never expose keys in
                      client-side code.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
