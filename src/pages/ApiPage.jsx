import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const apiKeys = [
  { id: 1, name: 'MIT Campus - Production', key: 'ak_live_mit_••••••••••••4x9z', college: 'MIT Campus India',    created: '2024-01-15', lastUsed: '2 min ago',   requests: '24.8K', status: 'active' },
  { id: 2, name: 'IIT Delhi - Production',  key: 'ak_live_iit_••••••••••••7k2p', college: 'IIT Delhi Extension', created: '2024-02-08', lastUsed: '15 min ago',  requests: '18.2K', status: 'active' },
  { id: 3, name: 'Oxford - Staging',        key: 'ak_test_oxf_••••••••••••3m8a', college: 'Oxford Ext. Banglr',  created: '2024-03-20', lastUsed: '2 days ago',  requests: '4.1K',  status: 'active' },
  { id: 4, name: 'Stanford - Legacy',       key: 'ak_live_std_••••••••••••9p1b', college: 'Stanford Hyderabad',  created: '2023-11-01', lastUsed: '30 days ago', requests: '0',     status: 'revoked' },
]

const integrations = [
  { name: 'Razorpay',       category: 'Payment',  icon: '💳', connected: true,  desc: 'Payment gateway for fee collection' },
  { name: 'Twilio SMS',     category: 'SMS',      icon: '📱', connected: true,  desc: 'SMS notifications via Twilio' },
  { name: 'SendGrid',       category: 'Email',    icon: '📧', connected: true,  desc: 'Transactional email delivery' },
  { name: 'AWS S3',         category: 'Storage',  icon: '☁️', connected: true,  desc: 'File and media storage' },
  { name: 'Google OAuth',   category: 'Auth',     icon: '🔐', connected: false, desc: 'Google sign-in for users' },
  { name: 'Zoom',           category: 'Video',    icon: '🎥', connected: false, desc: 'Virtual classrooms integration' },
]

export default function ApiPage() {
  const [keys, setKeys] = useState(apiKeys)
  const [copied, setCopied] = useState(null)

  const revokeKey = (id) => {
    setKeys(p => p.map(k => k.id === id ? { ...k, status: 'revoked' } : k))
    toast.success('API key revoked')
  }

  const copyKey = (id) => {
    setCopied(id)
    toast.success('Key copied!')
    setTimeout(() => setCopied(null), 2000)
  }

  const generateKey = () => {
    toast.success('New API key generated!')
  }

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="page-title">API &amp; Integrations</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Manage API keys and third-party connections</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={generateKey}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Generate Key
        </button>
      </div>

      {/* API Keys */}
      <div className="glass-card overflow-hidden">
        <div className="p-4" style={{ borderBottom: '1px solid var(--border-soft)' }}>
          <h3 className="section-title">API Keys</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Key</th><th>College</th><th>Requests</th><th>Last Used</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {keys.map((k, i) => (
                <motion.tr key={k.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <td><span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{k.name}</span></td>
                  <td><span className="font-mono text-xs" style={{ color: '#818cf8' }}>{k.key}</span></td>
                  <td><span className="badge badge-brand text-xs">{k.college}</span></td>
                  <td><span className="font-mono text-sm" style={{ color: '#22d3ee' }}>{k.requests}</span></td>
                  <td><span className="text-xs" style={{ color: 'var(--text-muted)' }}>{k.lastUsed}</span></td>
                  <td><span className={`badge ${k.status === 'active' ? 'badge-success' : 'badge-error'}`}>{k.status}</span></td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => copyKey(k.id)} className="btn-ghost py-1 px-2 text-xs">
                        {copied === k.id ? '✓' : 'Copy'}
                      </button>
                      {k.status === 'active' && (
                        <button onClick={() => revokeKey(k.id)}
                          className="py-1 px-2 rounded-lg text-xs font-medium transition-all"
                          style={{ background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.3)', color: '#fb7185' }}>
                          Revoke
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Integrations */}
      <div>
        <h3 className="section-title mb-3">Third-Party Integrations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {integrations.map((intg, i) => (
            <motion.div key={intg.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }} className="glass-card p-4 flex items-center gap-3">
              <div className="text-2xl">{intg.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{intg.name}</span>
                  <span className="badge badge-info text-xs">{intg.category}</span>
                </div>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>{intg.desc}</p>
              </div>
              <button onClick={() => toast.success(`${intg.connected ? 'Disconnecting' : 'Connecting'} ${intg.name}…`)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all`}
                style={intg.connected
                  ? { background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }
                  : { background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8' }}>
                {intg.connected ? 'Connected' : 'Connect'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
