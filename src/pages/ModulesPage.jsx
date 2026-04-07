import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const allModules = [
  { id: 'finance',    name: 'Finance',    desc: 'Fee collection, payments, ledger',   icon: '💰', color: '#fbbf24' },
  { id: 'library',    name: 'Library',    desc: 'Books, e-resources, borrowing',       icon: '📚', color: '#6366f1' },
  { id: 'hostel',     name: 'Hostel',     desc: 'Room allotment, mess, warden',        icon: '🏠', color: '#a78bfa' },
  { id: 'exam',       name: 'Exam',       desc: 'Schedules, hall tickets, results',    icon: '📝', color: '#22d3ee' },
  { id: 'attendance', name: 'Attendance', desc: 'Daily attendance tracking',            icon: '✅', color: '#34d399' },
  { id: 'transport',  name: 'Transport',  desc: 'Bus routes, tracking, passes',        icon: '🚌', color: '#fb7185' },
  { id: 'canteen',    name: 'Canteen',    desc: 'Menu, wallet, pre-ordering',          icon: '🍽️', color: '#fbbf24' },
  { id: 'hr',         name: 'HR',         desc: 'Staff management, payroll, leaves',   icon: '👔', color: '#6366f1' },
]

const colleges = [
  { id: 1, name: 'MIT Campus India',    modules: ['finance','library','hostel','exam','attendance'] },
  { id: 2, name: 'IIT Delhi Extension', modules: ['finance','exam','attendance','hr'] },
  { id: 3, name: 'Oxford Ext. Banglr',  modules: ['exam'] },
  { id: 4, name: 'Stanford Hyderabad',  modules: ['finance','hostel','library'] },
  { id: 5, name: 'IISc Bangalore',      modules: ['exam','attendance'] },
]

export default function ModulesPage() {
  const [collegeModules, setCollegeModules] = useState(colleges)
  const [selected, setSelected]             = useState(colleges[0])

  const toggleModule = (collegeId, moduleId) => {
    setCollegeModules(prev => prev.map(c => {
      if (c.id !== collegeId) return c
      const has = c.modules.includes(moduleId)
      return { ...c, modules: has ? c.modules.filter(m => m !== moduleId) : [...c.modules, moduleId] }
    }))
    const college = collegeModules.find(c => c.id === collegeId)
    const mod = allModules.find(m => m.id === moduleId)
    toast.success(`${mod.name} ${college.modules.includes(moduleId) ? 'disabled' : 'enabled'} for ${college.name}`)
    // sync selected
    setSelected(prev => {
      if (prev.id !== collegeId) return prev
      const has = prev.modules.includes(moduleId)
      return { ...prev, modules: has ? prev.modules.filter(m => m !== moduleId) : [...prev.modules, moduleId] }
    })
  }

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div>
        <h1 className="page-title">Module Management</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Turn modules ON/OFF per institution
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* College list */}
        <div className="glass-card p-4 space-y-1.5">
          <h3 className="section-title mb-3">Institutions</h3>
          {collegeModules.map(c => (
            <button key={c.id} onClick={() => setSelected(c)}
              className={`w-full text-left p-3 rounded-xl transition-all ${selected?.id === c.id ? '' : ''}`}
              style={selected?.id === c.id
                ? { background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', color: '#e2e8f0' }
                : { background: 'rgba(22,33,62,0.3)', border: '1px solid var(--border-soft)', color: 'var(--text-muted)' }}>
              <div className="text-sm font-medium" style={{ color: selected?.id === c.id ? 'var(--text-primary)' : undefined }}>{c.name}</div>
              <div className="text-xs mt-0.5" style={{ color: '#6366f1' }}>{c.modules.length} modules active</div>
            </button>
          ))}
        </div>

        {/* Module grid */}
        <div className="lg:col-span-2">
          {selected && (
            <>
              <div className="mb-4">
                <h3 className="section-title">{selected.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Toggle modules for this institution</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {allModules.map(mod => {
                  const active = selected.modules.includes(mod.id)
                  return (
                    <motion.button key={mod.id} layout
                      onClick={() => toggleModule(selected.id, mod.id)}
                      className="p-4 rounded-2xl text-left transition-all relative overflow-hidden"
                      style={active
                        ? { background: `${mod.color}15`, border: `1px solid ${mod.color}40` }
                        : { background: 'rgba(22,33,62,0.4)', border: '1px solid var(--border-soft)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">{mod.icon}</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors`}
                             style={{ background: active ? mod.color : 'rgba(148,163,184,0.2)' }}>
                          <div className="w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all"
                               style={{ left: active ? '22px' : '3px' }} />
                        </div>
                      </div>
                      <div className="font-medium text-sm" style={{ color: active ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {mod.name}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.6)' }}>{mod.desc}</div>
                    </motion.button>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
