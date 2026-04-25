import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { sidebarItems } from './sidebarConfig'
import SidebarIcon from './SidebarIcons'
import toast from 'react-hot-toast'

function Avatar({ name }) {
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'SA'
  return (
    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
         style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)', color: '#fff' }}>
      {initials}
    </div>
  )
}

export default function DashboardLayout() {
  const [collapsed, setCollapsed]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 mb-2 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center"
             style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 0 16px rgba(99,102,241,0.5)' }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.9"/>
            <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
        </div>
        {!collapsed && (
          <div>
            <div className="font-display font-bold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>
              Ayra<span style={{ color: '#6366f1' }}>Super</span>
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Control Panel</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-5 pb-4">
        {sidebarItems.map(section => (
          <div key={section.section}>
            {!collapsed && (
              <p className="px-4 text-xs font-semibold uppercase tracking-widest mb-1"
                 style={{ color: 'rgba(148,163,184,0.5)' }}>
                {section.section}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map(item => (
                <NavLink key={item.path} to={item.path}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`
                  }>
                  <SidebarIcon name={item.icon} />
                  {!collapsed && (
                    <span className="flex-1">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className="badge badge-success text-[10px] py-0 px-1.5 animate-pulse-slow">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-3 border-t" style={{ borderColor: 'var(--border-soft)' }}>
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <Avatar name={user?.name} />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                {user?.name || 'Super Admin'}
              </div>
              <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                {user?.email}
              </div>
            </div>
          )}
          {!collapsed && (
            <button onClick={handleLogout} title="Logout"
              className="p-1.5 rounded-lg transition-colors flex-shrink-0"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fb7185'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col relative z-20 flex-shrink-0"
        style={{
          background: 'rgba(22, 33, 62, 0.7)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid var(--border-soft)',
        }}>
        <SidebarContent />

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(v => !v)}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-colors"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-soft)', color: 'var(--text-muted)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"
               style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
      </motion.aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.6)' }}
              onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ duration: 0.25 }}
              className="fixed left-0 top-0 bottom-0 w-60 z-40 flex flex-col lg:hidden"
              style={{ background: 'rgba(22, 33, 62, 0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid var(--border-soft)' }}>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ background: 'rgba(15,15,23,0.8)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-soft)' }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-lg" style={{ color: 'var(--text-muted)' }}
              onClick={() => setMobileOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            {/* Live indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
                 style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
              <div className="live-dot" />
              <span className="text-xs font-medium" style={{ color: '#34d399' }}>System Online</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative p-2 rounded-xl transition-colors"
              style={{ color: 'var(--text-muted)', border: '1px solid var(--border-soft)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full"
                    style={{ background: '#fb7185' }} />
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                 style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <Avatar name={user?.name} />
              <div className="hidden sm:block">
                <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{user?.name}</div>
                <div className="text-xs" style={{ color: '#6366f1' }}>Superadmin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-primary)' }}>
          <div className="p-5 lg:p-7 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
