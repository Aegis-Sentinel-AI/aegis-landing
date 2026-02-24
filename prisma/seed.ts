/**
 * AegisSentinel — Database Seed Script
 * 
 * Seeds all tables with initial demo data.
 * Run with: npx prisma db seed
 */
import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const BCRYPT_ROUNDS = 12

async function main() {
  console.log('🌱 Seeding AegisSentinel database...\n')

  // ── Master Admin ─────────────────────────────────
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD
  if (!adminPassword) {
    throw new Error(
      'ADMIN_INITIAL_PASSWORD env var is required.\n' +
      'Set it in .env or pass inline: ADMIN_INITIAL_PASSWORD=your-secure-pw npx prisma db seed',
    )
  }

  console.log('👤 Creating users...')
  const adminHash = await bcrypt.hash(adminPassword, BCRYPT_ROUNDS)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@aegissentinel.online' },
    update: { passwordHash: adminHash }, // always re-hash on re-seed
    create: {
      email: 'admin@aegissentinel.online',
      name: 'Aegis Admin',
      role: 'admin',
      passwordHash: adminHash,
      walletAddress: process.env.ADMIN_WALLET_ADDRESS ?? null,
      provider: 'email',
    },
  })

  const analystHash = await bcrypt.hash('analyst-change-me', BCRYPT_ROUNDS)
  const analyst = await prisma.user.upsert({
    where: { email: 'analyst@aegissentinel.online' },
    update: {},
    create: {
      email: 'analyst@aegissentinel.online',
      name: 'Security Analyst',
      role: 'analyst',
      passwordHash: analystHash,
      provider: 'email',
    },
  })
  console.log(`  ✓ ${admin.email} (admin)`)
  console.log(`  ✓ ${analyst.email} (analyst)`)

  // ── Threats ──────────────────────────────────────
  console.log('\n🚨 Creating threats...')
  const threats = [
    {
      type: 'SQL Injection',
      severity: 'critical',
      source: '192.168.1.105',
      status: 'blocked',
      confidence: 98,
      aiInsight: 'Pattern matches known SQLi payload targeting MySQL databases. Attack vector: UNION-based injection attempting to extract user credentials. Recommended: Review query parameterization in affected endpoints.',
      mitre: 'T1190',
      category: 'Application',
      countryCode: 'RU',
    },
    {
      type: 'Brute Force Attack',
      severity: 'high',
      source: '10.0.0.45',
      status: 'blocked',
      confidence: 94,
      aiInsight: '523 failed authentication attempts in 3 minutes from single IP. Credential stuffing pattern detected using known breach database. Source IP linked to Tor exit node.',
      mitre: 'T1110',
      category: 'Identity',
      countryCode: 'CN',
    },
    {
      type: 'Unusual Port Access',
      severity: 'medium',
      source: '172.16.0.22',
      status: 'investigating',
      confidence: 76,
      aiInsight: 'Internal host scanning non-standard ports (8443, 9200, 27017). Could indicate reconnaissance or legitimate service discovery. Correlating with user activity logs.',
      mitre: 'T1046',
      category: 'Network',
      countryCode: 'US',
    },
    {
      type: 'Failed Login Attempt',
      severity: 'low',
      source: '192.168.1.88',
      status: 'blocked',
      confidence: 65,
      aiInsight: 'Multiple failed logins for service account. Pattern consistent with password expiration rather than attack. Recommend verifying with IT ops team.',
      mitre: 'T1078',
      category: 'Identity',
      countryCode: 'DE',
    },
    {
      type: 'Data Exfiltration Attempt',
      severity: 'critical',
      source: '10.0.1.15',
      status: 'blocked',
      confidence: 99,
      aiInsight: 'Large encrypted payload (2.4GB) detected to external IP via DNS tunneling. Data matches customer PII database schema. Immediate investigation required.',
      mitre: 'T1048',
      category: 'Data',
      countryCode: 'IR',
    },
    {
      type: 'Privilege Escalation',
      severity: 'critical',
      source: '10.0.2.33',
      status: 'blocked',
      confidence: 96,
      aiInsight: 'User account attempted to escalate to root via sudo CVE-2024-XXXX exploit. Behaviour anomaly detected by NHI monitor.',
      mitre: 'T1068',
      category: 'Identity',
      countryCode: 'RU',
    },
    {
      type: 'Cryptominer Detected',
      severity: 'high',
      source: '10.0.3.77',
      status: 'blocked',
      confidence: 91,
      aiInsight: 'Container workload showing abnormal CPU usage pattern consistent with XMRig cryptominer. Image hash does not match approved registry.',
      mitre: 'T1496',
      category: 'Infrastructure',
      countryCode: 'UA',
    },
    {
      type: 'API Rate Abuse',
      severity: 'medium',
      source: '203.0.113.42',
      status: 'investigating',
      confidence: 83,
      aiInsight: '12,400 requests/min to /api/v2/users endpoint from single API key. Pattern suggests automated scraping. Key belongs to partner integration.',
      mitre: 'T1499',
      category: 'Application',
      countryCode: 'BR',
    },
  ]

  for (const t of threats) {
    await prisma.threat.create({ data: t })
  }
  console.log(`  ✓ ${threats.length} threats created`)

  // ── Geo Attack Data ──────────────────────────────
  console.log('\n🌍 Creating geo attack data...')
  const geoData = [
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

  for (const g of geoData) {
    await prisma.geoAttack.upsert({
      where: { code_period: { code: g.code, period: '24h' } },
      update: { attacks: g.attacks, intensity: g.intensity },
      create: { ...g, period: '24h' },
    })
  }
  console.log(`  ✓ ${geoData.length} geo attack entries`)

  // ── Enterprise Detectors ─────────────────────────
  console.log('\n🛡️  Creating enterprise detectors...')
  const detectors = [
    { name: 'Non-Human Identity Monitor', status: 'active', detected: 12, category: 'Identity' },
    { name: 'Privileged Access Monitor', status: 'active', detected: 5, category: 'Identity' },
    { name: 'Data Flow Analyzer', status: 'active', detected: 8, category: 'Data' },
    { name: 'Cloud Security Posture', status: 'active', detected: 3, category: 'Infrastructure' },
    { name: 'Container Security Scanner', status: 'scanning', detected: 2, category: 'Infrastructure' },
    { name: 'API Abuse Detector', status: 'active', detected: 7, category: 'Application' },
  ]

  for (const d of detectors) {
    await prisma.detector.upsert({
      where: { name: d.name },
      update: { detected: d.detected, status: d.status },
      create: d,
    })
  }
  console.log(`  ✓ ${detectors.length} detectors`)

  // ── Metric Snapshot ──────────────────────────────
  console.log('\n📊 Creating metric snapshot...')
  await prisma.metricSnapshot.create({
    data: {
      trustScore: 94,
      threatsBlocked: 187,
      scansCompleted: 92,
      activeAlerts: 4,
      zkProofsGenerated: 67,
      onChainVerifications: 43,
    },
  })
  console.log('  ✓ Initial metric snapshot')

  // ── Activity Data ────────────────────────────────
  console.log('\n📈 Creating activity data...')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const activityHours = [
    { hour: '00:00', threats: 5, scans: 12 },
    { hour: '04:00', threats: 3, scans: 8 },
    { hour: '08:00', threats: 12, scans: 25 },
    { hour: '12:00', threats: 18, scans: 32 },
    { hour: '16:00', threats: 15, scans: 28 },
    { hour: '20:00', threats: 8, scans: 18 },
  ]

  for (const a of activityHours) {
    await prisma.activityHour.upsert({
      where: { hour_date: { hour: a.hour, date: today } },
      update: { threats: a.threats, scans: a.scans },
      create: { ...a, date: today },
    })
  }
  console.log(`  ✓ ${activityHours.length} activity hours`)

  // ── Network Insights ─────────────────────────────
  console.log('\n🧠 Creating AI network insights...')
  const insights = [
    {
      title: 'DDoS Attack Pattern Detected',
      severity: 'critical',
      confidence: 97,
      summary: 'Coordinated volumetric attack from 847 distinct IPs targeting port 443. Traffic spike of 12.4 Gbps detected. Attack signature matches Mirai botnet variant.',
      recommendation: 'Enable rate limiting and activate DDoS mitigation. Consider geo-blocking IPs from top 3 attacking regions.',
      affectedSystems: ['API Gateway', 'Load Balancer', 'CDN Edge'],
      mitre: 'T1498',
    },
    {
      title: 'Lateral Movement Activity',
      severity: 'high',
      confidence: 89,
      summary: 'Internal host 10.0.0.45 scanning adjacent subnets using SMB and RDP protocols. 23 hosts contacted in 5 minutes. Pattern indicates potential compromised workstation.',
      recommendation: 'Isolate affected host immediately. Check for credential theft indicators and review recent authentications.',
      affectedSystems: ['Workstation WS-FIN-042', 'Domain Controller'],
      mitre: 'T1021',
    },
    {
      title: 'DNS Tunneling Detected',
      severity: 'high',
      confidence: 94,
      summary: 'Anomalous DNS query patterns to suspicious.domain.xyz. High entropy in TXT record responses suggests data exfiltration via DNS channel.',
      recommendation: 'Block domain at DNS level. Investigate source host for malware. Review outbound DNS traffic policies.',
      affectedSystems: ['Endpoint EP-DEV-019', 'Internal DNS'],
      mitre: 'T1071.004',
    },
    {
      title: 'Port Scan from External IP',
      severity: 'medium',
      confidence: 82,
      summary: 'Sequential port scanning detected from 185.220.102.240. 1,847 ports probed in 3 minutes. Reconnaissance phase of potential attack.',
      recommendation: 'Add IP to blocklist. No immediate action required but monitor for follow-up exploitation attempts.',
      affectedSystems: ['Perimeter Firewall', 'Public Web Server'],
      mitre: 'T1046',
    },
  ]

  for (const i of insights) {
    await prisma.networkInsight.create({ data: i })
  }
  console.log(`  ✓ ${insights.length} network insights`)

  // ── Scans ────────────────────────────────────────
  console.log('\n🔍 Creating sample scans...')
  const scans = [
    { userId: admin.id, target: 'api.aegissentinel.online', scanType: 'application', status: 'completed', findings: 3, riskScore: 42, duration: 12400 },
    { userId: admin.id, target: '10.0.0.0/24', scanType: 'network', status: 'completed', findings: 7, riskScore: 68, duration: 34200 },
    { userId: analyst.id, target: '0x5cd78268AB8a8eF1F708E4aef911b211e52dEEd1', scanType: 'smart-contract', status: 'completed', findings: 0, riskScore: 12, duration: 8900 },
    { userId: admin.id, target: 'portal.aegissentinel.online', scanType: 'full', status: 'running', findings: 1, riskScore: null, duration: null },
  ]

  for (const s of scans) {
    await prisma.scan.create({
      data: {
        ...s,
        completedAt: s.status === 'completed' ? new Date() : null,
      },
    })
  }
  console.log(`  ✓ ${scans.length} scans`)

  // ── Audit Logs ───────────────────────────────────
  console.log('\n📝 Creating audit logs...')
  await prisma.auditLog.createMany({
    data: [
      { userId: admin.id, action: 'login', detail: 'Admin login from 192.168.1.1', ip: '192.168.1.1' },
      { userId: admin.id, action: 'scan_started', detail: 'Full scan on portal.aegissentinel.online', ip: '192.168.1.1' },
      { userId: analyst.id, action: 'threat_resolved', detail: 'Resolved SQL Injection threat #1', ip: '10.0.0.5' },
      { userId: admin.id, action: 'settings_changed', detail: 'Enabled 2FA for organization', ip: '192.168.1.1' },
    ],
  })
  console.log('  ✓ 4 audit log entries')

  // ── Waitlist ─────────────────────────────────────
  console.log('\n📧 Creating waitlist entries...')
  await prisma.waitlistEntry.createMany({
    data: [
      { email: 'interested@company.com', source: 'landing' },
      { email: 'ciso@enterprise.io', source: 'docs' },
      { email: 'dev@startup.dev', source: 'referral' },
    ],
    skipDuplicates: true,
  })
  console.log('  ✓ 3 waitlist entries')

  console.log('\n✅ Seed complete!\n')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
