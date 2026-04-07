import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuthStore()

  const [mode, setMode]             = useState('login') // 'login' | 'forgot'
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [showPass, setShowPass]     = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)
  const [errors, setErrors]         = useState({})

  const validate = () => {
    const e = {}
    if (!email)    e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Invalid email format'
    if (!password) e.password = 'Password is required'
    else if (password.length < 6) e.password = 'Minimum 6 characters'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validate()) return
    const result = await login(email, password)
    if (result.success) {
      toast.success('Welcome back, Super Admin!')
      navigate('/dashboard')
    } else {
      toast.error(result.message || 'Login failed')
    }
  }

  const handleForgot = async (e) => {
    e.preventDefault()
    if (!forgotEmail) return
    await new Promise(r => setTimeout(r, 1000))
    setForgotSent(true)
    toast.success('Reset link sent!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
         style={{ background: 'var(--bg-primary)' }}>

      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-60 pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'float 8s ease-in-out infinite' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'float 10s ease-in-out infinite reverse' }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
           style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
               style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.9"/>
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <h1 className="font-display font-bold text-3xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Ayra<span style={{ color: '#6366f1' }}>Super</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Enterprise ERP Control Center
          </p>
        </div>

        <div className="glass-card p-8">
          <AnimatePresence mode="wait">

            {/* ── LOGIN FORM ── */}
            {mode === 'login' && (
              <motion.form key="login" onSubmit={handleLogin}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <h2 className="font-display font-semibold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                  Sign in
                </h2>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                  Access the superadmin control panel
                </p>

                {/* Demo hint */}
                <div className="mb-5 px-4 py-3 rounded-xl text-xs" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}>
                  <strong>Demo:</strong> admin@ayra.edu &nbsp;/&nbsp; Admin@123
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="admin@ayra.edu"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: '' })) }}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-xs mt-1" style={{ color: 'var(--rose)' }}>{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="mb-2">
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      className="input-field pr-11"
                      placeholder="Enter password"
                      value={password}
                      onChange={e => { setPassword(e.target.value); setErrors(er => ({ ...er, password: '' })) }}
                      autoComplete="current-password"
                    />
                    <button type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: showPass ? '#6366f1' : 'var(--text-muted)' }}
                      onClick={() => setShowPass(v => !v)}>
                      <EyeIcon open={showPass} />
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs mt-1" style={{ color: 'var(--rose)' }}>{errors.password}</p>
                  )}
                </div>

                {/* Forgot link */}
                <div className="text-right mb-6">
                  <button type="button"
                    className="text-xs transition-colors"
                    style={{ color: 'var(--brand-light)' }}
                    onClick={() => setMode('forgot')}>
                    Forgot password?
                  </button>
                </div>

                {/* Submit */}
                <button type="submit" disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity=".3"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      Authenticating…
                    </>
                  ) : 'Sign in to AyraSuperAdmin'}
                </button>
              </motion.form>
            )}

            {/* ── FORGOT PASSWORD ── */}
            {mode === 'forgot' && (
              <motion.div key="forgot"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <button type="button" onClick={() => { setMode('login'); setForgotSent(false) }}
                  className="flex items-center gap-1 text-xs mb-5 transition-colors"
                  style={{ color: 'var(--text-muted)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                  </svg>
                  Back to sign in
                </button>

                {!forgotSent ? (
                  <form onSubmit={handleForgot}>
                    <h2 className="font-display font-semibold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                      Reset password
                    </h2>
                    <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                      Enter your email and we'll send a reset link
                    </p>
                    <div className="mb-5">
                      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                        Email address
                      </label>
                      <input
                        type="email" className="input-field" placeholder="admin@ayra.edu"
                        value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Send reset link
                    </button>
                  </form>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4">
                    <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                         style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" className="w-6 h-6">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                      Check your inbox
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      Reset link sent to <strong style={{ color: 'var(--text-primary)' }}>{forgotEmail}</strong>
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
          Secured by AyraSuperAdmin &bull; v1.0.0
        </p>
      </motion.div>
    </div>
  )
}
