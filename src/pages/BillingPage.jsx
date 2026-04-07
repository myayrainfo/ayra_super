import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const plans = [
  { name: 'Free',       price: 0,    users: 500,   storage: '20GB',  modules: 2, color: '#94a3b8', colleges: 48 },
  { name: 'Premium',    price: 4999, users: 5000,  storage: '100GB', modules: 999, color: '#fbbf24', colleges: 94 },
]

const invoices = [
  { id: 'INV-2024-042', college: 'MIT Campus India',    plan: 'Premium', amount: '₹4,999', date: '2024-04-01', status: 'paid' },
  { id: 'INV-2024-041', college: 'IIT Delhi Extension', plan: 'Premium', amount: '₹4,999', date: '2024-04-01', status: 'paid' },
  { id: 'INV-2024-040', college: 'Stanford Hyderabad',  plan: 'Premium', amount: '₹4,999', date: '2024-04-01', status: 'overdue' },
  { id: 'INV-2024-039', college: 'Oxford Ext. Banglr',  plan: 'Free',    amount: '₹0',     date: '2024-03-15', status: 'paid' },
  { id: 'INV-2024-038', college: 'IISc Bangalore',      plan: 'Free',    amount: '₹0',     date: '2024-03-15', status: 'paid' },
]

const revenueStats = [
  { label: 'MRR',           value: '₹4,70,906',  sub: 'Monthly Recurring Revenue', color: '#34d399' },
  { label: 'ARR',           value: '₹56.5L',     sub: 'Annual Run Rate',            color: '#6366f1' },
  { label: 'Active Subs',   value: '94',          sub: 'Premium colleges',           color: '#fbbf24' },
  { label: 'Trial',         value: '12',          sub: 'Colleges on trial',          color: '#22d3ee' },
]

export default function BillingPage() {
  const [tab, setTab] = useState('overview')

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div>
        <h1 className="page-title">Billing &amp; Subscriptions</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Manage plans, invoices, and revenue</p>
      </div>

      {/* Revenue cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueStats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }} className="stat-card">
            <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            <div className="font-display font-bold text-2xl mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['overview', 'invoices', 'plans'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${tab === t ? 'btn-primary' : 'btn-ghost'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Plans */}
      {tab === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {plans.map(plan => (
            <motion.div key={plan.name} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                   style={{ background: `radial-gradient(circle, ${plan.color}20 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-xl" style={{ color: plan.color }}>{plan.name}</h3>
                <div className="text-right">
                  <div className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
                    {plan.price === 0 ? 'Free' : `₹${plan.price.toLocaleString()}`}
                  </div>
                  {plan.price > 0 && <div className="text-xs" style={{ color: 'var(--text-muted)' }}>/ month</div>}
                </div>
              </div>
              <div className="space-y-2.5 mb-5">
                {[
                  [`Up to ${plan.users.toLocaleString()} users`, true],
                  [`${plan.storage} storage`, true],
                  [plan.modules === 999 ? 'All modules included' : `${plan.modules} modules`, true],
                  ['Priority support', plan.price > 0],
                  ['Custom branding', plan.price > 0],
                  ['API access', plan.price > 0],
                ].map(([feat, included]) => (
                  <div key={feat} className="flex items-center gap-2 text-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 flex-shrink-0"
                         style={{ color: included ? '#34d399' : 'rgba(148,163,184,0.3)' }}>
                      {included ? <polyline points="20 6 9 17 4 12"/> : <line x1="18" y1="6" x2="6" y2="18"/>}
                    </svg>
                    <span style={{ color: included ? 'var(--text-primary)' : 'rgba(148,163,184,0.4)' }}>{feat}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border-soft)' }}>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{plan.colleges} colleges</span>
                <button className="btn-ghost py-1.5 px-3 text-xs" onClick={() => toast.success(`Editing ${plan.name} plan…`)}>
                  Edit Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Invoices */}
      {tab === 'invoices' && (
        <div className="glass-card overflow-hidden">
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-soft)' }}>
            <h3 className="section-title">Recent Invoices</h3>
            <button className="btn-ghost py-1.5 px-3 text-xs" onClick={() => toast.success('Exporting invoices…')}>
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead><tr>
                <th>Invoice ID</th><th>College</th><th>Plan</th><th>Amount</th><th>Date</th><th>Status</th><th>Action</th>
              </tr></thead>
              <tbody>
                {invoices.map((inv, i) => (
                  <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                    <td><span className="font-mono text-xs" style={{ color: '#818cf8' }}>{inv.id}</span></td>
                    <td><span style={{ color: 'var(--text-primary)' }}>{inv.college}</span></td>
                    <td><span className={`badge ${inv.plan === 'Premium' ? 'badge-warning' : 'badge-info'}`}>{inv.plan}</span></td>
                    <td><span className="font-mono font-medium" style={{ color: 'var(--text-primary)' }}>{inv.amount}</span></td>
                    <td><span style={{ color: 'var(--text-muted)' }}>{inv.date}</span></td>
                    <td>
                      <span className={`badge ${inv.status === 'paid' ? 'badge-success' : 'badge-error'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-ghost py-1 px-2.5 text-xs" onClick={() => toast.success('Invoice downloaded!')}>
                        Download
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Overview */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="glass-card p-5">
            <h3 className="section-title mb-4">Plan Distribution</h3>
            <div className="space-y-3">
              {plans.map(plan => (
                <div key={plan.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span style={{ color: 'var(--text-primary)' }}>{plan.name}</span>
                    <span style={{ color: plan.color }}>{plan.colleges} colleges</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: 'rgba(99,102,241,0.1)' }}>
                    <div className="h-full rounded-full" style={{ width: `${(plan.colleges / 142) * 100}%`, background: plan.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-5">
            <h3 className="section-title mb-4">Trial Management</h3>
            <div className="space-y-3">
              {[
                { college: 'Jadavpur University',  days: 12, total: 30 },
                { college: 'Anna University',      days: 6,  total: 30 },
                { college: 'Pune Institute',       days: 28, total: 30 },
              ].map(t => (
                <div key={t.college}>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: 'var(--text-primary)' }}>{t.college}</span>
                    <span style={{ color: t.days < 10 ? '#fb7185' : '#fbbf24' }}>{t.days} days left</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'rgba(99,102,241,0.1)' }}>
                    <div className="h-full rounded-full transition-all"
                         style={{ width: `${(t.days / t.total) * 100}%`, background: t.days < 10 ? '#fb7185' : '#fbbf24' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
