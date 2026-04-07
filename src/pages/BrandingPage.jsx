// BrandingPage.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function BrandingPage() {
  const [colleges] = useState([
    { id: 1, name: 'MIT Campus India',    domain: 'mit.ayra.edu',    logo: null, primary: '#6366f1', secondary: '#22d3ee' },
    { id: 2, name: 'IIT Delhi Extension', domain: 'iit.ayra.edu',    logo: null, primary: '#f59e0b', secondary: '#10b981' },
    { id: 3, name: 'Stanford Hyderabad',  domain: 'stanford.ayra.edu', logo: null, primary: '#ef4444', secondary: '#3b82f6' },
  ])
  const [selected, setSelected] = useState(colleges[0])
  const [primary, setPrimary]   = useState(selected.primary)
  const [secondary, setSecondary] = useState(selected.secondary)
  const [domain, setDomain]     = useState(selected.domain)

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div>
        <h1 className="page-title">Branding &amp; White-Labeling</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Customize theme and domain per institution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* College selector */}
        <div className="glass-card p-4 space-y-2">
          <h3 className="section-title mb-3">Institutions</h3>
          {colleges.map(c => (
            <button key={c.id} onClick={() => { setSelected(c); setPrimary(c.primary); setSecondary(c.secondary); setDomain(c.domain) }}
              className="w-full text-left p-3 rounded-xl transition-all"
              style={selected?.id === c.id
                ? { background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)' }
                : { background: 'rgba(22,33,62,0.3)', border: '1px solid var(--border-soft)' }}>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{c.name}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{c.domain}</div>
            </button>
          ))}
        </div>

        {/* Branding editor */}
        <div className="lg:col-span-2 glass-card p-6 space-y-5">
          <h3 className="section-title">{selected?.name} – Branding</h3>

          {/* Logo upload */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Logo Upload</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                   style={{ background: `${primary}20`, border: `2px dashed ${primary}40` }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" style={{ color: primary }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <div>
                <button className="btn-ghost py-1.5 px-3 text-sm" onClick={() => toast.success('File picker opened!')}>
                  Upload Logo
                </button>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>PNG, SVG recommended · Max 2MB</p>
              </div>
            </div>
          </div>

          {/* Custom domain */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Custom Domain</label>
            <div className="flex gap-2">
              <input className="input-field flex-1" value={domain} onChange={e => setDomain(e.target.value)} placeholder="college.ayra.edu" />
              <button className="btn-ghost py-2 px-3 text-sm" onClick={() => toast.success('Domain verified!')}>Verify</button>
            </div>
          </div>

          {/* Color pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Primary Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={primary} onChange={e => setPrimary(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent" />
                <input className="input-field flex-1 font-mono" value={primary} onChange={e => setPrimary(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Accent Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={secondary} onChange={e => setSecondary(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent" />
                <input className="input-field flex-1 font-mono" value={secondary} onChange={e => setSecondary(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Preview</label>
            <div className="p-4 rounded-xl" style={{ background: '#0f0f17', border: '1px solid var(--border-soft)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{selected?.name}</span>
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{ background: primary }}>Primary Button</div>
                <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{ background: secondary }}>Accent Button</div>
              </div>
            </div>
          </div>

          <button className="btn-primary" onClick={() => toast.success('Branding saved!')}>Save Branding</button>
        </div>
      </div>
    </div>
  )
}
