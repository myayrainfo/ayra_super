import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAuthStore } from '@/store/authStore'
import DashboardLayout from '@/components/layout/DashboardLayout'

import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import InstitutionsPage from '@/pages/InstitutionsPage'
import AdminsPage from '@/pages/AdminsPage'
import UsersPage from '@/pages/UsersPage'
import RolesPage from '@/pages/RolesPage'
import BillingPage from '@/pages/BillingPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import LogsPage from '@/pages/LogsPage'
import SecurityPage from '@/pages/SecurityPage'
import DataPage from '@/pages/DataPage'
import NotificationsPage from '@/pages/NotificationsPage'
import ModulesPage from '@/pages/ModulesPage'
import ApiPage from '@/pages/ApiPage'
import BrandingPage from '@/pages/BrandingPage'
import MonitoringPage from '@/pages/MonitoringPage'
import SettingsPage from '@/pages/SettingsPage'

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6366f1' },
    secondary: { main: '#22d3ee' },
    background: { default: '#0f0f17', paper: '#16213e' },
    text: { primary: '#f1f5f9', secondary: '#94a3b8' },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: { fontFamily: '"Syne", sans-serif' },
    h2: { fontFamily: '"Syne", sans-serif' },
    h3: { fontFamily: '"Syne", sans-serif' },
    h4: { fontFamily: '"Syne", sans-serif' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 500 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'rgba(22, 33, 62, 0.6)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(99,102,241,0.15)',
        },
      },
    },
  },
})

function PrivateRoute({ children }) {
  const token = useAuthStore((state) => state.token)
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  const token = useAuthStore((state) => state.token)
  const verifySession = useAuthStore((state) => state.verifySession)

  useEffect(() => {
    if (token) {
      verifySession()
    }
  }, [token, verifySession])

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="institutions/*" element={<InstitutionsPage />} />
          <Route path="admins/*" element={<AdminsPage />} />
          <Route path="users/*" element={<UsersPage />} />
          <Route path="roles/*" element={<RolesPage />} />
          <Route path="billing/*" element={<BillingPage />} />
          <Route path="analytics/*" element={<AnalyticsPage />} />
          <Route path="logs/*" element={<LogsPage />} />
          <Route path="security/*" element={<SecurityPage />} />
          <Route path="data/*" element={<DataPage />} />
          <Route path="notifications/*" element={<NotificationsPage />} />
          <Route path="modules/*" element={<ModulesPage />} />
          <Route path="api/*" element={<ApiPage />} />
          <Route path="branding/*" element={<BrandingPage />} />
          <Route path="monitoring/*" element={<MonitoringPage />} />
          <Route path="settings/*" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ThemeProvider>
  )
}
