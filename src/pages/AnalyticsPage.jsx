import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const collegeUsageData = [
  { name: 'MIT Campus',   students: 3240, teachers: 280, admins: 12 },
  { name: 'IIT Delhi',    students: 2890, teachers: 210, admins: 8 },
  { name: 'Oxford Ext.',  students: 890,  teachers: 75,  admins: 4 },
  { name: 'Stanford HYD', students: 1560, teachers: 140, admins: 6 },
  { name: 'IISc',         students: 420,  teachers: 48,  admins: 3 },
]

const loginTrendData = [
  { week: 'W1 Jan', logins: 8420 }, { week: 'W2 Jan', logins: 9100 },
  { week: 'W3 Jan', logins: 8780 }, { week: 'W4 Jan', logins: 10200 },
  { week: 'W1 Feb', logins: 11400 }, { week: 'W2 Feb', logins: 10800 },
  { week: 'W3 Feb', logins: 12600 }, { week: 'W4 Feb', logins: 13200 },
  { week: 'W1 Mar', logins: 12900 }, { week: 'W2 Mar', logins: 14100 },
  { week: 'W3 Mar', logins: 13800 }, { week: 'W4 Mar', logins: 15400 },
]

const moduleUsageData = [
  { name: 'Exam',       value: 38 },
  { name: 'Finance',    value: 28 },
  { name: 'Attendance', value: 16 },
  { name: 'Library',    value: 10 },
  { name: 'Hostel',     value: 8 },
]

const COLORS = ['#6366f1', '#22d3ee', '#a78bfa', '#34d399', '#fbbf24']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-3 py-2">
      <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: <strong>{p.value?.toLocaleString()}</strong></p>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('3m')

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="page-title">Analytics &amp; Reports</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>System-wide usage intelligence</p>
        </div>
        <div className="flex gap-2">
          {['1m', '3m', '6m', '1y'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all uppercase ${period === p ? 'btn-primary' : 'btn-ghost'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Logins', value: '1,84,200', change: '+12.4%', color: '#6366f1' },
          { label: 'Avg Session', value: '24 min',   change: '+3.2%',  color: '#22d3ee' },
          { label: 'Bounce Rate', value: '8.4%',     change: '-2.1%',  color: '#34d399' },
          { label: 'New Users',   value: '1,284',    change: '+18.7%', color: '#a78bfa' },
        ].map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }} className="stat-card">
            <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{k.label}</div>
            <div className="font-display font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)' }}>{k.value}</div>
            <span className="badge badge-success text-xs">{k.change} vs prev</span>
          </motion.div>
        ))}
      </div>

      {/* Login trend */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass-card p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="section-title">Login Trends</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Weekly logins across all institutions</p>
          </div>
          <button className="btn-ghost py-1.5 px-3 text-xs" onClick={() => {}}>Export</button>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={loginTrendData}>
            <defs>
              <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
            <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}/>
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="logins" name="Logins" stroke="#6366f1" fill="url(#aGrad)" strokeWidth={2.5}/>
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* College usage + module distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="glass-card p-5 lg:col-span-2">
          <h3 className="section-title mb-5">College-wise Users</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={collegeUsageData} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }}/>
              <Bar dataKey="students" name="Students" fill="#6366f1" radius={[4,4,0,0]}/>
              <Bar dataKey="teachers" name="Teachers" fill="#22d3ee" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass-card p-5">
          <h3 className="section-title mb-5">Module Usage</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={moduleUsageData} cx="50%" cy="50%" outerRadius={65} innerRadius={35}
                   dataKey="value" nameKey="name">
                {moduleUsageData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-3">
            {moduleUsageData.map((m, i) => (
              <div key={m.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                  <span style={{ color: 'var(--text-muted)' }}>{m.name}</span>
                </div>
                <span style={{ color: 'var(--text-primary)' }}>{m.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
