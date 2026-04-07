import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const mockInstitutions = [
  { id: 1, name: 'MIT Campus India', shortName: 'MITCI', city: 'Mumbai', state: 'Maharashtra', admin: 'Dr. Rajesh Kumar', adminEmail: 'rajesh@mitci.edu', plan: 'Premium', status: 'active', users: 3240, storage: '68GB', storageMax: '100GB', storagePercent: 68, createdAt: '2024-01-15', modules: ['Finance', 'Library', 'Hostel', 'Exam'] },
  { id: 2, name: 'IIT Delhi Extension', shortName: 'IITDE', city: 'New Delhi', state: 'Delhi', admin: 'Prof. Sneha Singh', adminEmail: 'sneha@iitde.edu', plan: 'Premium', status: 'active', users: 2890, storage: '52GB', storageMax: '100GB', storagePercent: 52, createdAt: '2024-02-08', modules: ['Finance', 'Exam', 'Attendance'] },
  { id: 3, name: 'Oxford Ext. Bangalore', shortName: 'OXB', city: 'Bangalore', state: 'Karnataka', admin: 'Mr. Arjun Nair', adminEmail: 'arjun@oxb.edu', plan: 'Free', status: 'active', users: 890, storage: '12GB', storageMax: '20GB', storagePercent: 60, createdAt: '2024-03-20', modules: ['Exam'] },
  { id: 4, name: 'Stanford Hyderabad', shortName: 'SHD', city: 'Hyderabad', state: 'Telangana', admin: 'Dr. Meena Rao', adminEmail: 'meena@shd.edu', plan: 'Premium', status: 'active', users: 1560, storage: '34GB', storageMax: '100GB', storagePercent: 34, createdAt: '2024-04-10', modules: ['Finance', 'Hostel', 'Library'] },
  { id: 5, name: 'IISc Bangalore', shortName: 'IISC', city: 'Bangalore', state: 'Karnataka', admin: 'Prof. Vikram Bhat', adminEmail: 'vikram@iisc.edu', plan: 'Free', status: 'disabled', users: 420, storage: '8GB', storageMax: '20GB', storagePercent: 40, createdAt: '2024-05-01', modules: ['Exam', 'Attendance'] },
]

const allModules = ['Finance', 'Library', 'Hostel', 'Exam', 'Attendance', 'Transport', 'Canteen', 'HR']

function PlanBadge({ plan }) {
  return plan === 'Premium'
    ? <span className="badge" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>⭐ Premium</span>
    : <span className="badge badge-info">Free</span>
}

function StatusBadge({ status }) {
  return status === 'active'
    ? <span className="badge badge-success">● Active</span>
    : <span className="badge badge-error">● Disabled</span>
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
           onClick={onClose} />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-6 w-full max-w-lg relative z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="section-title">{title}</h3>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

function InstitutionForm({ data, onSave, onClose }) {
  const [form, setForm] = useState(data || { name: '', shortName: '', city: '', state: '', admin: '', adminEmail: '', plan: 'Free', modules: [] })

  const toggleModule = m => setForm(f => ({
    ...f,
    modules: f.modules.includes(m) ? f.modules.filter(x => x !== m) : [...f.modules, m]
  }))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Institution Name</label>
          <input className="input-field" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. MIT Campus" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Short Name</label>
          <input className="input-field" value={form.shortName} onChange={e => setForm(f => ({ ...f, shortName: e.target.value }))} placeholder="e.g. MITCI" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>City</label>
          <input className="input-field" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="City" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>State</label>
          <input className="input-field" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} placeholder="State" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Admin Name</label>
        <input className="input-field" value={form.admin} onChange={e => setForm(f => ({ ...f, admin: e.target.value }))} placeholder="Dr. John Doe" />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Admin Email</label>
        <input className="input-field" type="email" value={form.adminEmail} onChange={e => setForm(f => ({ ...f, adminEmail: e.target.value }))} placeholder="admin@college.edu" />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Subscription Plan</label>
        <select className="input-field" value={form.plan} onChange={e => setForm(f => ({ ...f, plan: e.target.value }))}>
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Active Modules</label>
        <div className="flex flex-wrap gap-2">
          {allModules.map(m => (
            <button key={m} type="button" onClick={() => toggleModule(m)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${form.modules.includes(m) ? 'badge-brand' : ''}`}
              style={form.modules.includes(m)
                ? { background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#818cf8' }
                : { background: 'transparent', border: '1px solid var(--border-soft)', color: 'var(--text-muted)' }}>
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button className="btn-primary flex-1" onClick={() => { onSave(form); toast.success('Institution saved!') }}>
          Save Institution
        </button>
        <button className="btn-ghost flex-1" onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

export default function InstitutionsPage() {
  const [institutions, setInstitutions] = useState(mockInstitutions)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(null)
  const [detailModal, setDetailModal] = useState(null)

  const filtered = institutions.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) ||
                        i.city.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || i.status === filter || i.plan.toLowerCase() === filter
    return matchSearch && matchFilter
  })

  const toggleStatus = (id) => {
    setInstitutions(prev => prev.map(i =>
      i.id === id ? { ...i, status: i.status === 'active' ? 'disabled' : 'active' } : i
    ))
    toast.success('Status updated')
  }

  const deleteInst = (id) => {
    setInstitutions(prev => prev.filter(i => i.id !== id))
    toast.success('Institution removed')
  }

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="page-title">Institutions</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {institutions.length} total · {institutions.filter(i => i.status === 'active').length} active
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => setAddModal(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Institution
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input className="input-field pl-9" placeholder="Search institutions…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {['all', 'active', 'disabled', 'premium', 'free'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? 'btn-primary' : 'btn-ghost'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Institution</th>
                <th>Location</th>
                <th>Admin</th>
                <th>Plan</th>
                <th>Users</th>
                <th>Storage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((inst, i) => (
                  <motion.tr key={inst.id}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                             style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                          {inst.shortName.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{inst.name}</div>
                          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{inst.shortName}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm" style={{ color: 'var(--text-primary)' }}>{inst.city}</div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{inst.state}</div>
                    </td>
                    <td>
                      <div className="text-sm" style={{ color: 'var(--text-primary)' }}>{inst.admin}</div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{inst.adminEmail}</div>
                    </td>
                    <td><PlanBadge plan={inst.plan} /></td>
                    <td>
                      <div className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>
                        {inst.users.toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <div className="text-sm" style={{ color: 'var(--text-primary)' }}>{inst.storage} / {inst.storageMax}</div>
                      <div className="h-1 w-20 rounded-full mt-1" style={{ background: 'rgba(99,102,241,0.15)' }}>
                        <div className="h-full rounded-full"
                             style={{
                               width: `${inst.storagePercent}%`,
                               background: inst.storagePercent > 80 ? '#fb7185' : '#6366f1'
                             }} />
                      </div>
                    </td>
                    <td><StatusBadge status={inst.status} /></td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setDetailModal(inst)} title="View"
                          className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#22d3ee'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button onClick={() => setEditModal(inst)} title="Edit"
                          className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#6366f1'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button onClick={() => toggleStatus(inst.id)} title="Toggle status"
                          className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#fbbf24'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"/>
                          </svg>
                        </button>
                        <button onClick={() => deleteInst(inst.id)} title="Delete"
                          className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#fb7185'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                            <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {!filtered.length && (
            <div className="py-16 text-center" style={{ color: 'var(--text-muted)' }}>
              No institutions found
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <Modal open={addModal} onClose={() => setAddModal(false)} title="Add New Institution">
        <InstitutionForm onSave={form => { setInstitutions(p => [...p, { ...form, id: Date.now(), status: 'active', users: 0, storage: '0GB', storageMax: form.plan === 'Premium' ? '100GB' : '20GB', storagePercent: 0, createdAt: new Date().toISOString().split('T')[0], modules: form.modules }]); setAddModal(false) }} onClose={() => setAddModal(false)} />
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editModal} onClose={() => setEditModal(null)} title="Edit Institution">
        {editModal && <InstitutionForm data={editModal} onSave={form => { setInstitutions(p => p.map(i => i.id === editModal.id ? { ...i, ...form } : i)); setEditModal(null); }} onClose={() => setEditModal(null)} />}
      </Modal>

      {/* Detail Modal */}
      <Modal open={!!detailModal} onClose={() => setDetailModal(null)} title="Institution Details">
        {detailModal && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Name', detailModal.name], ['Short Name', detailModal.shortName],
                ['City', detailModal.city], ['State', detailModal.state],
                ['Admin', detailModal.admin], ['Admin Email', detailModal.adminEmail],
                ['Plan', detailModal.plan], ['Status', detailModal.status],
                ['Users', detailModal.users.toLocaleString()], ['Storage', `${detailModal.storage} / ${detailModal.storageMax}`],
                ['Created', detailModal.createdAt], ['Storage %', `${detailModal.storagePercent}%`],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{k}</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{v}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>Active Modules</div>
              <div className="flex flex-wrap gap-1.5">
                {detailModal.modules.map(m => <span key={m} className="badge badge-brand">{m}</span>)}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
