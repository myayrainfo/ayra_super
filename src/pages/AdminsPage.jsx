import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const mockAdmins = [
  { id: 1, name: 'Dr. Rajesh Kumar',   email: 'rajesh@mitci.edu',   college: 'MIT Campus India',    role: 'College Admin', status: 'active',   lastLogin: '2 hrs ago',  permissions: ['manage_users', 'manage_finance', 'view_reports'] },
  { id: 2, name: 'Prof. Sneha Singh',  email: 'sneha@iitde.edu',    college: 'IIT Delhi Extension', role: 'College Admin', status: 'active',   lastLogin: '5 hrs ago',  permissions: ['manage_users', 'manage_exam'] },
  { id: 3, name: 'Mr. Arjun Nair',     email: 'arjun@oxb.edu',      college: 'Oxford Ext. Banglr',  role: 'Sub-admin',     status: 'active',   lastLogin: '1 day ago',  permissions: ['view_reports'] },
  { id: 4, name: 'Dr. Meena Rao',      email: 'meena@shd.edu',      college: 'Stanford Hyderabad',  role: 'College Admin', status: 'suspended',lastLogin: '3 days ago', permissions: ['manage_users', 'manage_finance'] },
  { id: 5, name: 'Prof. Vikram Bhat',  email: 'vikram@iisc.edu',    college: 'IISc Bangalore',      role: 'Sub-admin',     status: 'active',   lastLogin: '12 hrs ago', permissions: ['manage_users'] },
]

const roleColors = { 'Superadmin': '#fb7185', 'College Admin': '#6366f1', 'Sub-admin': '#22d3ee' }

export default function AdminsPage() {
  const [admins, setAdmins]       = useState(mockAdmins)
  const [search, setSearch]       = useState('')
  const [showForm, setShowForm]   = useState(false)
  const [form, setForm]           = useState({ name: '', email: '', college: '', role: 'College Admin' })

  const filtered = admins.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.college.toLowerCase().includes(search.toLowerCase())
  )

  const suspend = (id) => {
    setAdmins(p => p.map(a => a.id === id ? { ...a, status: a.status === 'active' ? 'suspended' : 'active' } : a))
    toast.success('Admin status updated')
  }
  const remove = (id) => { setAdmins(p => p.filter(a => a.id !== id)); toast.success('Admin removed') }
  const addAdmin = () => {
    if (!form.name || !form.email) { toast.error('Name and email required'); return }
    setAdmins(p => [...p, { ...form, id: Date.now(), status: 'active', lastLogin: 'Never', permissions: [] }])
    setForm({ name: '', email: '', college: '', role: 'College Admin' })
    setShowForm(false)
    toast.success('Admin created!')
  }

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="page-title">Admin Management</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {admins.length} admins · {admins.filter(a => a.status === 'active').length} active
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => setShowForm(v => !v)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Create Admin
        </button>
      </div>

      {/* Quick create form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="glass-card p-5">
          <h3 className="section-title mb-4">New Admin</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <input className="input-field" placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="input-field" placeholder="Email address" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <input className="input-field" placeholder="Assign College" value={form.college} onChange={e => setForm(f => ({ ...f, college: e.target.value }))} />
            <select className="input-field" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
              <option>College Admin</option><option>Sub-admin</option>
            </select>
          </div>
          <div className="flex gap-3 mt-3">
            <button className="btn-primary" onClick={addAdmin}>Create Admin</button>
            <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </motion.div>
      )}

      {/* Search */}
      <div className="relative max-w-xs">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input className="input-field pl-9" placeholder="Search admins…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr>
              <th>Admin</th><th>College</th><th>Role</th><th>Permissions</th>
              <th>Last Login</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map((a, i) => (
                <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
                           style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                        {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{a.name}</div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="text-sm" style={{ color: 'var(--text-primary)' }}>{a.college}</span></td>
                  <td>
                    <span className="badge text-xs px-2 py-0.5" style={{ background: `${roleColors[a.role]}20`, color: roleColors[a.role] }}>
                      {a.role}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {a.permissions.slice(0, 2).map(p => (
                        <span key={p} className="badge badge-info text-xs">{p.replace('_', ' ')}</span>
                      ))}
                      {a.permissions.length > 2 && <span className="badge badge-info">+{a.permissions.length - 2}</span>}
                    </div>
                  </td>
                  <td><span className="text-sm" style={{ color: 'var(--text-muted)' }}>{a.lastLogin}</span></td>
                  <td>
                    <span className={`badge ${a.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      {['edit', 'suspend', 'delete'].map(action => (
                        <button key={action}
                          onClick={() => action === 'delete' ? remove(a.id) : action === 'suspend' ? suspend(a.id) : null}
                          className="p-1.5 rounded-lg transition-colors"
                          style={{ color: 'var(--text-muted)' }}
                          title={action.charAt(0).toUpperCase() + action.slice(1)}
                          onMouseEnter={e => e.currentTarget.style.color = action === 'delete' ? '#fb7185' : action === 'suspend' ? '#fbbf24' : '#6366f1'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                          {action === 'edit' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>}
                          {action === 'suspend' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"/></svg>}
                          {action === 'delete' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg>}
                        </button>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
