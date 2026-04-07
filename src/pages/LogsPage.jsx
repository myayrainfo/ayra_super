import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const logTypes = { create: '#34d399', edit: '#6366f1', delete: '#fb7185', login: '#22d3ee', warning: '#fbbf24', security: '#fb7185' }

const mockLogs = [
  { id: 1,  time: '2024-04-07 14:32:10', user: 'Super Admin',        action: 'Disabled IISc Bangalore college module', type: 'warning',  college: 'IISc Bangalore',      ip: '192.168.1.1' },
  { id: 2,  time: '2024-04-07 14:28:45', user: 'Dr. Rajesh Kumar',   action: 'Created new student batch – CS 2024',    type: 'create',   college: 'MIT Campus India',    ip: '103.45.67.89' },
  { id: 3,  time: '2024-04-07 14:15:22', user: 'Admin Priya',        action: 'Updated fee structure for Semester 2',   type: 'edit',     college: 'MIT Campus India',    ip: '103.45.67.90' },
  { id: 4,  time: '2024-04-07 14:02:08', user: 'Unknown',            action: 'Failed login attempt (3rd time)',         type: 'security', college: 'Stanford Hyderabad',  ip: '45.33.22.11' },
  { id: 5,  time: '2024-04-07 13:54:33', user: 'Prof. Sneha Singh',  action: 'Exported student attendance report',      type: 'edit',     college: 'IIT Delhi Extension', ip: '117.98.44.22' },
  { id: 6,  time: '2024-04-07 13:41:17', user: 'Mr. Arjun Nair',     action: 'Deleted exam record ID #EX-2024-88',      type: 'delete',   college: 'Oxford Ext. Banglr',  ip: '49.37.201.55' },
  { id: 7,  time: '2024-04-07 13:30:05', user: 'Super Admin',        action: 'Upgraded Oxford Ext. to Premium plan',   type: 'edit',     college: 'Oxford Ext. Banglr',  ip: '192.168.1.1' },
  { id: 8,  time: '2024-04-07 13:18:44', user: 'Dr. Meena Rao',      action: 'Added 12 new teachers to roster',         type: 'create',   college: 'Stanford Hyderabad',  ip: '122.175.66.30' },
  { id: 9,  time: '2024-04-07 13:05:10', user: 'Admin Ravi',         action: 'Reset password for user ID #U-8842',      type: 'edit',     college: 'IISc Bangalore',      ip: '49.207.212.1' },
  { id: 10, time: '2024-04-07 12:52:28', user: 'Super Admin',        action: 'System backup completed successfully',    type: 'create',   college: 'System',              ip: '192.168.1.1' },
]

export default function LogsPage() {
  const [search, setSearch]     = useState('')
  const [typeFilter, setType]   = useState('all')
  const [logs]                  = useState(mockLogs)

  const filtered = logs.filter(l => {
    const matchSearch = l.user.toLowerCase().includes(search.toLowerCase()) ||
                        l.action.toLowerCase().includes(search.toLowerCase()) ||
                        l.college.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'all' || l.type === typeFilter
    return matchSearch && matchType
  })

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="page-title">Audit Logs</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Complete trail of all system actions
          </p>
        </div>
        <button className="btn-ghost flex items-center gap-2 text-sm"
          onClick={() => toast.success('Exporting logs as CSV…')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input className="input-field pl-9" placeholder="Search logs…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'create', 'edit', 'delete', 'security', 'warning'].map(t => (
            <button key={t} onClick={() => setType(t)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all ${typeFilter === t ? '' : 'btn-ghost'}`}
              style={typeFilter === t
                ? { background: `${logTypes[t] || '#6366f1'}20`, border: `1px solid ${logTypes[t] || '#6366f1'}40`, color: logTypes[t] || '#818cf8' }
                : {}}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Log table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr>
              <th>Time</th><th>User</th><th>Action</th><th>College</th><th>IP</th><th>Type</th>
            </tr></thead>
            <tbody>
              {filtered.map((log, i) => (
                <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                  <td>
                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{log.time}</span>
                  </td>
                  <td>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{log.user}</span>
                  </td>
                  <td>
                    <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{log.action}</span>
                  </td>
                  <td>
                    <span className="badge badge-brand text-xs">{log.college}</span>
                  </td>
                  <td>
                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{log.ip}</span>
                  </td>
                  <td>
                    <span className="badge text-xs capitalize px-2 py-0.5"
                          style={{ background: `${logTypes[log.type]}20`, color: logTypes[log.type], border: `1px solid ${logTypes[log.type]}30` }}>
                      {log.type}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && (
            <div className="py-16 text-center" style={{ color: 'var(--text-muted)' }}>No logs match your filters</div>
          )}
        </div>
      </div>

      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        Showing {filtered.length} of {logs.length} log entries
      </p>
    </div>
  )
}
