import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const allPermissions = [
  { group: 'Users',    perms: ['view_users', 'create_users', 'edit_users', 'delete_users', 'block_users'] },
  { group: 'Finance',  perms: ['view_finance', 'manage_finance', 'export_finance', 'delete_finance'] },
  { group: 'Exam',     perms: ['view_exams', 'create_exams', 'edit_exams', 'delete_exams'] },
  { group: 'Reports',  perms: ['view_reports', 'export_reports', 'delete_reports'] },
  { group: 'Settings', perms: ['view_settings', 'manage_settings', 'manage_modules'] },
]

const mockRoles = [
  { id: 1, name: 'Superadmin',    color: '#fb7185', description: 'Full system access',       permissions: allPermissions.flatMap(g => g.perms), assignedTo: 1 },
  { id: 2, name: 'College Admin', color: '#6366f1', description: 'Manage one institution',   permissions: ['view_users','create_users','edit_users','view_finance','manage_finance','view_exams','create_exams','view_reports','export_reports'], assignedTo: 142 },
  { id: 3, name: 'Finance Admin', color: '#fbbf24', description: 'Finance module only',      permissions: ['view_finance','manage_finance','export_finance','view_reports'], assignedTo: 38 },
  { id: 4, name: 'Exam Coord.',   color: '#22d3ee', description: 'Exam management only',     permissions: ['view_exams','create_exams','edit_exams','view_reports'], assignedTo: 24 },
  { id: 5, name: 'Sub-admin',     color: '#a78bfa', description: 'Limited read access',      permissions: ['view_users','view_reports'], assignedTo: 67 },
]

function PermissionToggle({ perm, active, onChange }) {
  return (
    <button type="button"
      onClick={() => onChange(perm)}
      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${active ? '' : ''}`}
      style={active
        ? { background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#818cf8' }
        : { background: 'transparent', border: '1px solid var(--border-soft)', color: 'var(--text-muted)' }}>
      {perm.replace(/_/g, ' ')}
    </button>
  )
}

export default function RolesPage() {
  const [roles, setRoles]         = useState(mockRoles)
  const [selected, setSelected]   = useState(mockRoles[1])
  const [editing, setEditing]     = useState(false)
  const [newRoleName, setNewRoleName] = useState('')
  const [showNew, setShowNew]     = useState(false)

  const togglePerm = (perm) => {
    setSelected(r => ({
      ...r,
      permissions: r.permissions.includes(perm)
        ? r.permissions.filter(p => p !== perm)
        : [...r.permissions, perm]
    }))
  }

  const saveRole = () => {
    setRoles(prev => prev.map(r => r.id === selected.id ? selected : r))
    setEditing(false)
    toast.success('Role permissions saved!')
  }

  const addRole = () => {
    if (!newRoleName.trim()) return
    const newRole = { id: Date.now(), name: newRoleName, color: '#6366f1', description: 'New custom role', permissions: [], assignedTo: 0 }
    setRoles(p => [...p, newRole])
    setSelected(newRole)
    setNewRoleName('')
    setShowNew(false)
    setEditing(true)
    toast.success('Role created!')
  }

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="page-title">Roles &amp; Permissions</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Define granular access control for each role
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => setShowNew(v => !v)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Role
        </button>
      </div>

      {showNew && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="glass-card p-5">
          <h3 className="section-title mb-3">Create New Role</h3>
          <div className="flex gap-3">
            <input className="input-field flex-1" placeholder="Role name (e.g. Library Manager)"
              value={newRoleName} onChange={e => setNewRoleName(e.target.value)} />
            <button className="btn-primary" onClick={addRole}>Create</button>
            <button className="btn-ghost" onClick={() => setShowNew(false)}>Cancel</button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Role list */}
        <div className="space-y-2">
          {roles.map(role => (
            <motion.button key={role.id} onClick={() => { setSelected(role); setEditing(false) }}
              className={`w-full text-left p-4 rounded-xl transition-all ${selected?.id === role.id ? 'ring-1' : ''}`}
              style={selected?.id === role.id
                ? { background: `${role.color}15`, border: `1px solid ${role.color}40`, ringColor: role.color }
                : { background: 'rgba(22,33,62,0.4)', border: '1px solid var(--border-soft)' }}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: role.color }} />
                  <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{role.name}</span>
                </div>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{role.assignedTo} users</span>
              </div>
              <p className="text-xs ml-4.5" style={{ color: 'var(--text-muted)' }}>{role.description}</p>
              <div className="mt-2 ml-4.5">
                <span className="text-xs" style={{ color: role.color }}>{role.permissions.length} permissions</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Permission editor */}
        <div className="lg:col-span-2 glass-card p-5">
          {selected ? (
            <>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: selected.color }} />
                  <h3 className="section-title">{selected.name}</h3>
                  <span className="badge badge-brand">{selected.permissions.length} active</span>
                </div>
                <div className="flex gap-2">
                  {editing
                    ? <>
                        <button className="btn-primary py-1.5 px-3 text-xs" onClick={saveRole}>Save</button>
                        <button className="btn-ghost py-1.5 px-3 text-xs" onClick={() => { setSelected(roles.find(r => r.id === selected.id)); setEditing(false) }}>Cancel</button>
                      </>
                    : <button className="btn-ghost py-1.5 px-3 text-xs" onClick={() => setEditing(true)}>Edit Permissions</button>
                  }
                </div>
              </div>

              <div className="space-y-4">
                {allPermissions.map(group => (
                  <div key={group.group}>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                      {group.group}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.perms.map(perm => (
                        editing
                          ? <PermissionToggle key={perm} perm={perm} active={selected.permissions.includes(perm)} onChange={togglePerm} />
                          : <span key={perm}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium ${selected.permissions.includes(perm) ? '' : 'opacity-30'}`}
                              style={selected.permissions.includes(perm)
                                ? { background: `${selected.color}20`, border: `1px solid ${selected.color}40`, color: selected.color }
                                : { background: 'transparent', border: '1px solid var(--border-soft)', color: 'var(--text-muted)' }}>
                              {perm.replace(/_/g, ' ')}
                            </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>
              Select a role to view permissions
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
