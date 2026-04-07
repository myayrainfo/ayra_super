import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

// ── Mock data ──────────────────────────────────────────────
const loginData = [
  { day: 'Mon', logins: 1240, registrations: 45 },
  { day: 'Tue', logins: 1580, registrations: 62 },
  { day: 'Wed', logins: 1320, registrations: 38 },
  { day: 'Thu', logins: 1890, registrations: 71 },
  { day: 'Fri', logins: 2100, registrations: 84 },
  { day: 'Sat', logins: 890,  registrations: 22 },
  { day: 'Sun', logins: 760,  registrations: 18 },
]

const growthData = [
  { month: 'Oct', users: 8200 }, { month: 'Nov', users: 9600 },
  { month: 'Dec', users: 10800 }, { month: 'Jan', users: 12400 },
  { month: 'Feb', users: 14100 }, { month: 'Mar', users: 15800 },
  { month: 'Apr', users: 17200 },
]

const collegeUsage = [
  { name: 'MIT Campus',   usage: 89 },
  { name: 'IIT Delhi',    usage: 76 },
  { name: 'Oxford Ext.',  usage: 65 },
  { name: 'Stanford',     usage: 58 },
  { name: 'IISc Banglr',  usage: 44 },
]

const activityLogs = [
  { id: 1, user: 'Dr. Ananya Sharma',  action: 'Added new student batch', college: 'IIT Delhi',    time: '2 min ago', type: 'create' },
  { id: 2, user: 'Admin Priya',        action: 'Updated fee structure',    college: 'MIT Campus',  time: '8 min ago', type: 'edit' },
  { id: 3, user: 'Super Admin',        action: 'Disabled College Module',  college: 'Oxford Ext.', time: '15 min ago', type: 'warning' },
  { id: 4, user: 'John Doe',           action: 'Failed login attempt',     college: 'Stanford',    time: '22 min ago', type: 'error' },
  { id: 5, user: 'Admin Ravi',         action: 'Exported user report',     college: 'IISc',        time: '34 min ago', type: 'info' },
]

const systemHealth = [
  { label: 'API Server',    status: 'online',  latency: '24ms',   uptime: '99.9%' },
  { label: 'Database',      status: 'online',  latency: '8ms',    uptime: '99.99%' },
  { label: 'Auth Service',  status: 'online',  latency: '12ms',   uptime: '100%' },
  { label: 'Storage S3',    status: 'warning', latency: '145ms',  uptime: '98.2%' },
  { label: 'Email Service', status: 'online',  latency: '56ms',   uptime: '99.5%' },
]

// ── Sub-components ─────────────────────────────────────────
function StatCard({ label, value, sub, color, icon, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="stat-card"
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
           style={{ background: `radial-gradient(ellipse at top right, ${color}15 0%, transparent 60%)` }} />
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
             style={{ background: `${color}20`, color }}>
          {icon}
        </div>
        <span className="badge badge-success text-xs">↑ Live</span>
      </div>
      <div className="font-display font-bold text-3xl mb-0.5" style={{ color: 'var(--text-primary)' }}>
        {value}
      </div>
      <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
      <div className="text-xs" style={{ color }}>{sub}</div>
    </motion.div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-3 py-2">
      <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  )
}

// ── Main Dashboard ─────────────────────────────────────────
export default function DashboardPage() {
  const [activeUsers, setActiveUsers] = useState(1284)

  // Simulate live user count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(v => v + Math.floor(Math.random() * 20 - 10))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    {
      label: 'Total Institutions',
      value: '142',
      sub: '+3 this month',
      color: '#6366f1',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 11h2v4H8zm6 0h2v4h-2z"/></svg>
    },
    {
      label: 'Total Admins',
      value: '386',
      sub: '12 pending approval',
      color: '#22d3ee',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 15c-2.76 0-5 1.34-5 3v1h10v-1c0-1.66-2.24-3-5-3z"/><circle cx="12" cy="8" r="4"/></svg>
    },
    {
      label: 'Total Users',
      value: '17,284',
      sub: '15,120 students · 2,164 staff',
      color: '#a78bfa',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    },
    {
      label: 'Active Sessions',
      value: activeUsers.toLocaleString(),
      sub: 'Live users right now',
      color: '#34d399',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    },
  ]

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Command Center</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Real-time overview across all institutions
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
             style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
          <div className="live-dot" />
          <span className="text-sm font-medium" style={{ color: '#34d399' }}>Live</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Daily logins */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="section-title">Daily Logins</h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>This week vs registrations</p>
            </div>
            <span className="badge badge-brand">7 Days</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={loginData}>
              <defs>
                <linearGradient id="loginGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
              <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="logins" name="Logins" stroke="#6366f1" fill="url(#loginGrad)" strokeWidth={2}/>
              <Area type="monotone" dataKey="registrations" name="Registrations" stroke="#34d399" fill="url(#regGrad)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* User growth */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="glass-card p-5">
          <div className="mb-5">
            <h3 className="section-title">User Growth</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Monthly cumulative</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="users" name="Users" stroke="#22d3ee" strokeWidth={2.5}
                    dot={{ fill: '#22d3ee', r: 3 }} activeDot={{ r: 5 }}/>
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Usage per college */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass-card p-5">
          <div className="mb-5">
            <h3 className="section-title">Usage per College</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>% of capacity used</p>
          </div>
          <div className="space-y-3">
            {collegeUsage.map(c => (
              <div key={c.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'var(--text-primary)' }}>{c.name}</span>
                  <span style={{ color: c.usage > 80 ? '#fb7185' : c.usage > 60 ? '#fbbf24' : '#34d399' }}>
                    {c.usage}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'rgba(99,102,241,0.15)' }}>
                  <div className="h-full rounded-full transition-all duration-1000"
                       style={{
                         width: `${c.usage}%`,
                         background: c.usage > 80 ? '#fb7185' : c.usage > 60 ? '#fbbf24' : '#34d399',
                         boxShadow: `0 0 6px ${c.usage > 80 ? '#fb718550' : c.usage > 60 ? '#fbbf2450' : '#34d39950'}`
                       }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity log */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Recent Activity</h3>
            <button className="text-xs transition-colors" style={{ color: '#6366f1' }}>View all →</button>
          </div>
          <div className="space-y-2">
            {activityLogs.map(log => {
              const colors = { create: '#34d399', edit: '#6366f1', warning: '#fbbf24', error: '#fb7185', info: '#22d3ee' }
              return (
                <div key={log.id} className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                     style={{ border: '1px solid transparent' }}
                     onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-soft)'}
                     onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: colors[log.type] }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{log.user}</span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{log.action}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="badge badge-brand text-xs py-0">{log.college}</span>
                    </div>
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{log.time}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* System Health */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="section-title">System Health</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Live service status</p>
          </div>
          <span className="badge badge-success">All systems operational</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {systemHealth.map(s => (
            <div key={s.label} className="p-3 rounded-xl text-center"
                 style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid var(--border-soft)' }}>
              <div className={`w-2.5 h-2.5 rounded-full mx-auto mb-2 ${s.status === 'online' ? 'live-dot' : ''}`}
                   style={{ background: s.status === 'online' ? '#34d399' : '#fbbf24' }} />
              <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{s.label}</div>
              <div className="font-mono text-xs" style={{ color: s.status === 'online' ? '#34d399' : '#fbbf24' }}>
                {s.latency}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.uptime}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
