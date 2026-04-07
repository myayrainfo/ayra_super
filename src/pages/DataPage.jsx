// DataPage.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function DataPage() {
  const [backupRunning, setBackupRunning] = useState(false)

  const runBackup = () => {
    setBackupRunning(true)
    setTimeout(() => { setBackupRunning(false); toast.success('Backup completed!') }, 3000)
  }

  const backups = [
    { id: 'BKP-20240407', date: '2024-04-07 02:00', size: '4.2 GB', type: 'Full',        status: 'success' },
    { id: 'BKP-20240406', date: '2024-04-06 02:00', size: '4.1 GB', type: 'Full',        status: 'success' },
    { id: 'BKP-20240405', date: '2024-04-05 14:30', size: '1.8 GB', type: 'Incremental', status: 'success' },
    { id: 'BKP-20240404', date: '2024-04-04 02:00', size: '4.0 GB', type: 'Full',        status: 'failed' },
  ]

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div>
        <h1 className="page-title">Data Management</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Backup, restore, and export system data</p>
      </div>

      {/* Storage overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Storage',   value: '500 GB',  used: '284 GB', pct: 57, color: '#6366f1' },
          { label: 'Database Size',   value: '128 GB',  used: '84 GB',  pct: 66, color: '#22d3ee' },
          { label: 'File Storage',    value: '372 GB',  used: '200 GB', pct: 54, color: '#a78bfa' },
          { label: 'Backup Storage',  value: '1 TB',    used: '320 GB', pct: 32, color: '#34d399' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }} className="stat-card">
            <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            <div className="font-display font-bold text-xl mb-0.5" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
            <div className="text-xs mb-2" style={{ color: s.color }}>{s.used} used</div>
            <div className="h-1.5 rounded-full" style={{ background: 'rgba(99,102,241,0.1)' }}>
              <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Actions */}
        <div className="glass-card p-5 space-y-3">
          <h3 className="section-title">Quick Actions</h3>
          {[
            { label: 'Run Full Backup',    color: '#6366f1', action: runBackup,                              icon: '💾' },
            { label: 'Export All Data',    color: '#22d3ee', action: () => toast.success('Export started…'), icon: '📦' },
            { label: 'Export Users CSV',   color: '#a78bfa', action: () => toast.success('CSV exported!'),   icon: '👥' },
            { label: 'Purge Inactive Data',color: '#fb7185', action: () => toast.success('Purge scheduled…'),icon: '🗑️' },
          ].map(act => (
            <button key={act.label} onClick={act.action}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all text-left"
              style={{ background: `${act.color}10`, border: `1px solid ${act.color}30`, color: act.color }}>
              <span>{act.icon}</span>
              {act.label}
              {act.action === runBackup && backupRunning && (
                <svg className="w-4 h-4 animate-spin ml-auto" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity=".3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Backup history */}
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="p-4" style={{ borderBottom: '1px solid var(--border-soft)' }}>
            <h3 className="section-title">Backup History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead><tr><th>Backup ID</th><th>Date</th><th>Size</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {backups.map((b, i) => (
                  <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                    <td><span className="font-mono text-xs" style={{ color: '#818cf8' }}>{b.id}</span></td>
                    <td><span className="text-xs" style={{ color: 'var(--text-muted)' }}>{b.date}</span></td>
                    <td><span className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>{b.size}</span></td>
                    <td><span className={`badge ${b.type === 'Full' ? 'badge-brand' : 'badge-info'}`}>{b.type}</span></td>
                    <td><span className={`badge ${b.status === 'success' ? 'badge-success' : 'badge-error'}`}>{b.status}</span></td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn-ghost py-1 px-2 text-xs" onClick={() => toast.success('Restore started!')}>Restore</button>
                        <button className="btn-ghost py-1 px-2 text-xs" onClick={() => toast.success('Download started!')}>Download</button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataPage
