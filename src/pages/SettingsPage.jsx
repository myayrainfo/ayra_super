import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function SettingRow({ label, desc, children }) {
  return (
    <div className="flex items-center justify-between py-4" style={{ borderBottom: '1px solid var(--border-soft)' }}>
      <div className="flex-1 mr-6">
        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</div>
        {desc && <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{desc}</div>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} className="w-11 h-6 rounded-full relative transition-colors"
      style={{ background: value ? '#6366f1' : 'rgba(148,163,184,0.2)' }}>
      <div className="w-4 h-4 bg-white rounded-full absolute top-1 transition-all"
           style={{ left: value ? '26px' : '4px' }} />
    </button>
  )
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    maintenanceMode:   false,
    debugMode:         false,
    emailNotifs:       true,
    smsNotifs:         false,
    autoBackup:        true,
    forceTwoFA:        true,
    allowRegistration: true,
    darkMode:          true,
    uploadLimit:       50,
    sessionTimeout:    30,
    maxLoginAttempts:  5,
    smtpHost:          'smtp.sendgrid.net',
    smtpPort:          '587',
    smtpUser:          'apikey',
    fromEmail:         'noreply@ayra.edu',
    systemName:        'AyraSuperAdmin',
    supportEmail:      'support@ayra.edu',
  })

  const set = (key, val) => setSettings(s => ({ ...s, [key]: val }))

  const sections = [
    {
      title: 'General',
      rows: [
        { label: 'System Name',      desc: 'Displayed across all interfaces', key: 'systemName',        type: 'text' },
        { label: 'Support Email',    desc: 'Contact for support tickets',      key: 'supportEmail',      type: 'text' },
        { label: 'Maintenance Mode', desc: 'Disable access for all users',    key: 'maintenanceMode',   type: 'toggle' },
        { label: 'Debug Mode',       desc: 'Enable verbose error logging',     key: 'debugMode',         type: 'toggle' },
        { label: 'Dark Mode Default',desc: 'Default theme for institutions',   key: 'darkMode',          type: 'toggle' },
      ]
    },
    {
      title: 'Security',
      rows: [
        { label: 'Force 2FA',            desc: 'Require 2FA for all admins',           key: 'forceTwoFA',        type: 'toggle' },
        { label: 'Allow Registration',   desc: 'Allow new colleges to self-register',  key: 'allowRegistration', type: 'toggle' },
        { label: 'Session Timeout',      desc: 'Auto-logout after inactivity (mins)',  key: 'sessionTimeout',    type: 'number', min: 5, max: 120 },
        { label: 'Max Login Attempts',   desc: 'Block after N failed attempts',        key: 'maxLoginAttempts',  type: 'number', min: 1, max: 20 },
      ]
    },
    {
      title: 'Notifications',
      rows: [
        { label: 'Email Notifications', desc: 'Send system alerts via email',  key: 'emailNotifs', type: 'toggle' },
        { label: 'SMS Notifications',   desc: 'Send alerts via SMS',           key: 'smsNotifs',   type: 'toggle' },
      ]
    },
    {
      title: 'Storage & Backup',
      rows: [
        { label: 'Auto Backup',   desc: 'Daily automatic backups at 2 AM',       key: 'autoBackup',  type: 'toggle' },
        { label: 'Upload Limit',  desc: 'Max file upload size per user (MB)',     key: 'uploadLimit', type: 'number', min: 5, max: 500 },
      ]
    },
    {
      title: 'Email (SMTP)',
      rows: [
        { label: 'SMTP Host',   desc: '', key: 'smtpHost',   type: 'text' },
        { label: 'SMTP Port',   desc: '', key: 'smtpPort',   type: 'text' },
        { label: 'SMTP User',   desc: '', key: 'smtpUser',   type: 'text' },
        { label: 'From Email',  desc: '', key: 'fromEmail',  type: 'text' },
      ]
    },
  ]

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="page-title">System Settings</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Global configuration for AyraSuperAdmin</p>
        </div>
        <button className="btn-primary" onClick={() => toast.success('Settings saved!')}>
          Save All Changes
        </button>
      </div>

      {sections.map((section, si) => (
        <motion.div key={section.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.06 }} className="glass-card overflow-hidden">
          <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border-soft)', background: 'rgba(99,102,241,0.04)' }}>
            <h3 className="section-title text-base">{section.title}</h3>
          </div>
          <div className="px-5">
            {section.rows.map(row => (
              <SettingRow key={row.key} label={row.label} desc={row.desc}>
                {row.type === 'toggle' && (
                  <Toggle value={settings[row.key]} onChange={v => set(row.key, v)} />
                )}
                {row.type === 'text' && (
                  <input className="input-field w-56 text-sm" value={settings[row.key]}
                    onChange={e => set(row.key, e.target.value)} />
                )}
                {row.type === 'number' && (
                  <div className="flex items-center gap-2">
                    <input type="number" min={row.min} max={row.max} className="input-field w-20 text-sm font-mono text-center"
                      value={settings[row.key]} onChange={e => set(row.key, +e.target.value)} />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {row.key === 'sessionTimeout' ? 'min' : row.key === 'uploadLimit' ? 'MB' : ''}
                    </span>
                  </div>
                )}
              </SettingRow>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
