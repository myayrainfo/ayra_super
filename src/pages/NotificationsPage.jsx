import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const colleges = ['All Institutions', 'MIT Campus India', 'IIT Delhi Extension', 'Oxford Ext. Banglr', 'Stanford Hyderabad', 'IISc Bangalore']

const sentNotifications = [
  { id: 1, title: 'System Maintenance Notice',       to: 'All Institutions',    type: 'email',    time: '2024-04-05 10:00', status: 'delivered', reach: 142 },
  { id: 2, title: 'Premium Plan Upgrade Available',  to: 'Free Tier Colleges',  type: 'in-app',   time: '2024-04-03 14:30', status: 'delivered', reach: 48  },
  { id: 3, title: 'Storage Usage Warning',           to: 'MIT Campus India',    type: 'email',    time: '2024-04-02 09:15', status: 'delivered', reach: 1   },
  { id: 4, title: 'New Module: Transport Available', to: 'All Institutions',    type: 'in-app',   time: '2024-03-28 11:00', status: 'delivered', reach: 142 },
]

export default function NotificationsPage() {
  const [tab, setTab]         = useState('compose')
  const [title, setTitle]     = useState('')
  const [message, setMessage] = useState('')
  const [target, setTarget]   = useState('All Institutions')
  const [channel, setChannel] = useState({ email: true, inApp: true, sms: false })

  const send = () => {
    if (!title || !message) { toast.error('Title and message required'); return }
    toast.success(`Notification sent to ${target}!`)
    setTitle(''); setMessage('')
  }

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div>
        <h1 className="page-title">Notification Center</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Send alerts and announcements system-wide</p>
      </div>

      <div className="flex gap-2">
        {['compose', 'history'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${tab === t ? 'btn-primary' : 'btn-ghost'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'compose' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 glass-card p-6 space-y-4">
            <h3 className="section-title">Compose Notification</h3>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Title</label>
              <input className="input-field" placeholder="Notification title…" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Message</label>
              <textarea className="input-field min-h-28 resize-none" placeholder="Write your message…" value={message} onChange={e => setMessage(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Send To</label>
              <select className="input-field" value={target} onChange={e => setTarget(e.target.value)}>
                {colleges.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Channels</label>
              <div className="flex gap-3">
                {[['email', '📧 Email'], ['inApp', '🔔 In-App'], ['sms', '📱 SMS']].map(([key, label]) => (
                  <button key={key} type="button" onClick={() => setChannel(c => ({ ...c, [key]: !c[key] }))}
                    className="px-3 py-2 rounded-xl text-sm font-medium transition-all"
                    style={channel[key]
                      ? { background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#818cf8' }
                      : { background: 'transparent', border: '1px solid var(--border-soft)', color: 'var(--text-muted)' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn-primary" onClick={send}>Send Notification</button>
          </div>

          <div className="glass-card p-5">
            <h3 className="section-title mb-4">Quick Templates</h3>
            <div className="space-y-2">
              {[
                'System maintenance scheduled',
                'Storage limit approaching',
                'New feature available',
                'Plan renewal reminder',
                'Security policy update',
              ].map(tmpl => (
                <button key={tmpl} onClick={() => setTitle(tmpl)}
                  className="w-full text-left p-3 rounded-xl text-sm transition-all"
                  style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid var(--border-soft)', color: 'var(--text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-soft)' }}>
                  {tmpl}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead><tr><th>Title</th><th>Sent To</th><th>Channel</th><th>Reach</th><th>Time</th><th>Status</th></tr></thead>
              <tbody>
                {sentNotifications.map((n, i) => (
                  <motion.tr key={n.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                    <td><span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{n.title}</span></td>
                    <td><span className="badge badge-brand text-xs">{n.to}</span></td>
                    <td><span className="badge badge-info text-xs">{n.type}</span></td>
                    <td><span className="font-mono text-sm" style={{ color: '#22d3ee' }}>{n.reach} colleges</span></td>
                    <td><span className="text-xs" style={{ color: 'var(--text-muted)' }}>{n.time}</span></td>
                    <td><span className="badge badge-success">{n.status}</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
