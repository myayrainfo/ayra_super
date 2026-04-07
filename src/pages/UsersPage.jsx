import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const mockUsers = [
  { id: 1, name: 'Aarav Sharma',    email: 'aarav@mitci.edu',   college: 'MIT Campus India',    role: 'Student', status: 'active',  lastLogin: '1 hr ago' },
  { id: 2, name: 'Priya Nair',      email: 'priya@iitde.edu',   college: 'IIT Delhi Extension', role: 'Teacher', status: 'active',  lastLogin: '3 hrs ago' },
  { id: 3, name: 'Rohan Verma',     email: 'rohan@oxb.edu',     college: 'Oxford Ext. Banglr',  role: 'Student', status: 'blocked', lastLogin: '2 days ago' },
  { id: 4, name: 'Divya Krishnan',  email: 'divya@shd.edu',     college: 'Stanford Hyderabad',  role: 'Teacher', status: 'active',  lastLogin: '30 min ago' },
  { id: 5, name: 'Karan Mehta',     email: 'karan@iisc.edu',    college: 'IISc Bangalore',      role: 'Student', status: 'active',  lastLogin: '5 hrs ago' },
  { id: 6, name: 'Ananya Roy',      email: 'ananya@mitci.edu',  college: 'MIT Campus India',    role: 'Student', status: 'active',  lastLogin: '2 hrs ago' },
  { id: 7, name: 'Vikram Patel',    email: 'vikram@iitde.edu',  college: 'IIT Delhi Extension', role: 'Student', status: 'active',  lastLogin: '8 hrs ago' },
]

export default function UsersPage() {
  const [users, setUsers]     = useState(mockUsers)
  const [search, setSearch]   = useState('')
  const [college, setCollege] = useState('All')
  const [role, setRole]       = useState('All')

  const colleges = ['All', ...new Set(mockUsers.map(u => u.college))]
  const roles    = ['All', 'Student', 'Teacher']

  const filtered = users.filter(u => {
    return (
      (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
      (college === 'All' || u.college === college) &&
      (role === 'All' || u.role === role)
    )
  })

  const toggleBlock = id => {
    setUsers(p => p.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u))
    toast.success('User status updated')
  }

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div>
        <h1 className="page-title">Global User Management</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          {users.length} total users across all institutions
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input className="input-field pl-9" placeholder="Search users…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input-field w-auto" value={college} onChange={e => setCollege(e.target.value)}>
          {colleges.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="input-field w-auto" value={role} onChange={e => setRole(e.target.value)}>
          {roles.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr>
              <th>User</th><th>College</th><th>Role</th><th>Last Login</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map((u, i) => (
                <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
                           style={{ background: u.role === 'Teacher' ? 'rgba(34,211,238,0.15)' : 'rgba(167,139,250,0.15)', color: u.role === 'Teacher' ? '#22d3ee' : '#a78bfa' }}>
                        {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{u.name}</div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="text-sm" style={{ color: 'var(--text-primary)' }}>{u.college}</span></td>
                  <td>
                    <span className={`badge ${u.role === 'Teacher' ? 'badge-info' : 'badge-brand'}`}>{u.role}</span>
                  </td>
                  <td><span className="text-sm" style={{ color: 'var(--text-muted)' }}>{u.lastLogin}</span></td>
                  <td>
                    <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-error'}`}>{u.status}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button onClick={() => toggleBlock(u.id)}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                        style={{ background: u.status === 'active' ? 'rgba(251,113,133,0.1)' : 'rgba(52,211,153,0.1)', color: u.status === 'active' ? '#fb7185' : '#34d399', border: `1px solid ${u.status === 'active' ? 'rgba(251,113,133,0.3)' : 'rgba(52,211,153,0.3)'}` }}>
                        {u.status === 'active' ? 'Block' : 'Unblock'}
                      </button>
                      <button onClick={() => toast.success('Password reset email sent!')}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all btn-ghost">
                        Reset PW
                      </button>
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
