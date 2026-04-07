import React from 'react'
import { motion } from 'framer-motion'

// Generic page shell used by pages that are stubs for now
export function PageShell({ title, subtitle, color = '#6366f1', children }) {
  return (
    <div className="space-y-5 max-w-[1400px]">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
      </motion.div>
      {children}
    </div>
  )
}
