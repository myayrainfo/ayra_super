import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function useRealtime(base, variance, interval = 2000) {
  const [value, setValue] = useState(base)
  useEffect(() => {
    const id = setInterval(() => setValue(v => Math.max(0, v + Math.floor(Math.random() * variance * 2 - variance))), interval)
    return () => clearInterval(id)
  }, [])
  return value
}

function GaugeBar({ label, value, max, color, unit = '' }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span style={{ color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ color: pct > 85 ? '#fb7185' : pct > 65 ? '#fbbf24' : color }}>
          {value}{unit} / {max}{unit}
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(99,102,241,0.1)' }}>
        <div className="h-full rounded-full transition-all duration-700"
             style={{ width: `${pct}%`, background: pct > 85 ? '#fb7185' : pct > 65 ? '#fbbf24' : color }} />
      </div>
    </div>
  )
}

export default function MonitoringPage() {
  const liveUsers   = useRealtime(1284, 12)
  const cpuUsage    = useRealtime(42, 5)
  const memUsage    = useRealtime(68, 4)
  const apiLatency  = useRealtime(24, 8)
  const reqPerSec   = useRealtime(48, 10)

  const [history, setHistory] = useState(
    Array.from({ length: 20 }, (_, i) => ({ t: i, users: 1200 + Math.random() * 200, cpu: 35 + Math.random() * 20 }))
  )

  useEffect(() => {
    const id = setInterval(() => {
      setHistory(prev => [...prev.slice(-19), { t: Date.now(), users: liveUsers, cpu: cpuUsage }])
    }, 2000)
    return () => clearInterval(id)
  }, [liveUsers, cpuUsage])

  const services = [
    { name: 'API Server',     status: 'healthy', uptime: '99.97%', latency: `${apiLatency}ms` },
    { name: 'Auth Service',   status: 'healthy', uptime: '100%',   latency: '12ms' },
    { name: 'Database',       status: 'healthy', uptime: '99.99%', latency: '8ms' },
    { name: 'Redis Cache',    status: 'healthy', uptime: '99.9%',  latency: '2ms' },
    { name: 'S3 Storage',     status: 'warning', uptime: '98.2%',  latency: '145ms' },
    { name: 'Email Service',  status: 'healthy', uptime: '99.5%',  latency: '56ms' },
  ]

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="flex items-center gap-3">
        <h1 className="page-title">Live Monitoring</h1>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
             style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)' }}>
          <div className="live-dot" />
          <span className="text-xs font-medium" style={{ color: '#34d399' }}>Real-time</span>
        </div>
      </div>

      {/* Live counters */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Live Users',   value: liveUsers.toLocaleString(), color: '#34d399', icon: '👥' },
          { label: 'CPU Usage',    value: `${cpuUsage}%`,             color: cpuUsage > 85 ? '#fb7185' : '#6366f1', icon: '⚙️' },
          { label: 'RAM Usage',    value: `${memUsage}%`,             color: memUsage > 80 ? '#fb7185' : '#22d3ee', icon: '💾' },
          { label: 'API Latency',  value: `${apiLatency}ms`,          color: apiLatency > 100 ? '#fb7185' : '#a78bfa', icon: '⚡' },
          { label: 'Req / sec',    value: reqPerSec.toString(),       color: '#fbbf24', icon: '🔄' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }} className="stat-card text-center">
            <div className="text-xl mb-2">{s.icon}</div>
            <div className="font-display font-bold text-2xl mb-0.5 font-mono transition-all" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Live charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="section-title mb-4">Live User Count</h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={history}>
              <defs>
                <linearGradient id="uGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
              <XAxis dataKey="t" hide />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}/>
              <Tooltip formatter={v => [v, 'Users']} contentStyle={{ background: '#16213e', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, fontSize: 11 }} />
              <Area type="monotone" dataKey="users" stroke="#34d399" fill="url(#uGrad)" strokeWidth={2} dot={false} isAnimationActive={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="section-title mb-4">CPU Load</h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={history}>
              <defs>
                <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
              <XAxis dataKey="t" hide />
              <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}/>
              <Tooltip formatter={v => [`${Math.round(v)}%`, 'CPU']} contentStyle={{ background: '#16213e', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, fontSize: 11 }} />
              <Area type="monotone" dataKey="cpu" stroke="#6366f1" fill="url(#cGrad)" strokeWidth={2} dot={false} isAnimationActive={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resource usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5 space-y-4">
          <h3 className="section-title">Resource Usage</h3>
          <GaugeBar label="CPU"       value={cpuUsage}  max={100}  color="#6366f1"  unit="%" />
          <GaugeBar label="Memory"    value={memUsage}  max={100}  color="#22d3ee"  unit="%" />
          <GaugeBar label="Storage"   value={284}       max={500}  color="#a78bfa"  unit=" GB" />
          <GaugeBar label="Bandwidth" value={reqPerSec} max={200}  color="#34d399"  unit=" req/s" />
        </div>

        <div className="glass-card p-5">
          <h3 className="section-title mb-4">Service Status</h3>
          <div className="space-y-2">
            {services.map(svc => (
              <div key={svc.name} className="flex items-center justify-between p-2.5 rounded-xl"
                   style={{ background: 'rgba(99,102,241,0.04)', border: '1px solid var(--border-soft)' }}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full ${svc.status === 'healthy' ? 'live-dot' : ''}`}
                       style={{ background: svc.status === 'healthy' ? '#34d399' : '#fbbf24' }} />
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{svc.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs" style={{ color: svc.status === 'healthy' ? '#34d399' : '#fbbf24' }}>
                    {svc.latency}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{svc.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
