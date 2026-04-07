import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const threats = [
  { id: 1, ip: '45.33.22.11',    type: 'Brute Force',        attempts: 12, college: 'Stanford Hyderabad', time: '14 min ago', blocked: false },
  { id: 2, ip: '91.108.4.221',   type: 'Credential Stuffing', attempts: 7,  college: 'MIT Campus India',   time: '32 min ago', blocked: true },
  { id: 3, ip: '185.220.101.1',  type: 'Rate Limit Abuse',   attempts: 45, college: 'IIT Delhi Extension', time: '1 hr ago',   blocked: true },
  { id: 4, ip: '178.128.44.99',  type: 'SQL Injection Probe', attempts: 3,  college: 'Oxford Ext.',        time: '2 hrs ago',  blocked: false },
]

const twoFAStats = { enabled: 248, disabled: 138, total: 386 }

export default function SecurityPage() {
  const [threats2, setThreats] = useState(threats)
  const [tfa, setTfa]         = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState(30)

  const blockIP = (id) => {
    setThreats(p => p.map(t => t.id === id ? { ...t, blocked: true } : t))
    toast.success('IP blocked successfully')
  }

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div>
        <h1 className="page-title">Security &amp; Monitoring</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Threat detection, 2FA and access control</p>
      </div>

      {/* Security stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Threats Today',    value: threats.filter(t => !t.blocked).length, color: '#fb7185', icon: '⚠️' },
          { label: 'IPs Blocked',      value: threats.filter(t => t.blocked).length,   color: '#34d399', icon: '🛡️' },
          { label: '2FA Enabled',      value: twoFAStats.enabled,                       color: '#6366f1', icon: '🔐' },
          { label: 'Active Sessions',  value: '1,284',                                  color: '#22d3ee', icon: '👤' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }} className="stat-card">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="font-display font-bold text-2xl mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Threat table */}
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="p-4" style={{ borderBottom: '1px solid var(--border-soft)' }}>
            <h3 className="section-title">Suspicious Activity</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead><tr><th>IP Address</th><th>Type</th><th>Attempts</th><th>College</th><th>Time</th><th>Action</th></tr></thead>
              <tbody>
                {threats2.map((t, i) => (
                  <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}>
                    <td><span className="font-mono text-xs" style={{ color: '#fb7185' }}>{t.ip}</span></td>
                    <td><span className="badge badge-error text-xs">{t.type}</span></td>
                    <td><span className="font-mono font-bold" style={{ color: '#fbbf24' }}>{t.attempts}</span></td>
                    <td><span className="badge badge-brand text-xs">{t.college}</span></td>
                    <td><span className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.time}</span></td>
                    <td>
                      {t.blocked
                        ? <span className="badge badge-success text-xs">Blocked</span>
                        : <button onClick={() => blockIP(t.id)}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                            style={{ background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.3)', color: '#fb7185' }}>
                            Block IP
                          </button>
                      }
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security config */}
        <div className="glass-card p-5 space-y-5">
          <h3 className="section-title">Security Config</h3>

          {/* 2FA toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid var(--border-soft)' }}>
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Two-Factor Auth</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Require 2FA for all admins</div>
            </div>
            <button onClick={() => { setTfa(v => !v); toast.success(`2FA ${!tfa ? 'enabled' : 'disabled'}`) }}
              className="w-11 h-6 rounded-full relative transition-colors flex-shrink-0"
              style={{ background: tfa ? '#6366f1' : 'rgba(148,163,184,0.2)' }}>
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 transition-all"
                   style={{ left: tfa ? '26px' : '4px' }} />
            </button>
          </div>

          {/* Session timeout */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Session Timeout</div>
              <span className="font-mono text-sm" style={{ color: '#6366f1' }}>{sessionTimeout} min</span>
            </div>
            <input type="range" min={5} max={120} step={5} value={sessionTimeout}
              onChange={e => setSessionTimeout(+e.target.value)}
              className="w-full accent-indigo-500" />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              <span>5 min</span><span>120 min</span>
            </div>
          </div>

          {/* 2FA adoption */}
          <div>
            <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>2FA Adoption</div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(99,102,241,0.1)' }}>
              <div className="h-full rounded-full transition-all duration-1000"
                   style={{ width: `${(twoFAStats.enabled / twoFAStats.total) * 100}%`, background: 'linear-gradient(90deg, #6366f1, #22d3ee)' }} />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span style={{ color: '#34d399' }}>{twoFAStats.enabled} enabled</span>
              <span style={{ color: '#fb7185' }}>{twoFAStats.disabled} not enabled</span>
            </div>
          </div>

          <button className="btn-primary w-full" onClick={() => toast.success('Security config saved!')}>
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  )
}
