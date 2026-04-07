export const sidebarItems = [
  {
    section: 'Overview',
    items: [
      { label: 'Dashboard',        path: '/dashboard',       icon: 'dashboard' },
    ]
  },
  {
    section: 'Management',
    items: [
      { label: 'Institutions',     path: '/institutions',    icon: 'institution' },
      { label: 'Admins',           path: '/admins',          icon: 'admin' },
      { label: 'Users',            path: '/users',           icon: 'users' },
      { label: 'Roles & Perms',    path: '/roles',           icon: 'roles' },
    ]
  },
  {
    section: 'Business',
    items: [
      { label: 'Billing',          path: '/billing',         icon: 'billing' },
      { label: 'Analytics',        path: '/analytics',       icon: 'analytics' },
      { label: 'Notifications',    path: '/notifications',   icon: 'notifications' },
    ]
  },
  {
    section: 'System',
    items: [
      { label: 'Audit Logs',       path: '/logs',            icon: 'logs' },
      { label: 'Security',         path: '/security',        icon: 'security' },
      { label: 'Data Management',  path: '/data',            icon: 'data' },
      { label: 'Module Control',   path: '/modules',         icon: 'modules' },
      { label: 'API & Integrations', path: '/api',           icon: 'api' },
      { label: 'Branding',         path: '/branding',        icon: 'branding' },
      { label: 'Live Monitoring',  path: '/monitoring',      icon: 'monitoring', badge: 'LIVE' },
      { label: 'Settings',         path: '/settings',        icon: 'settings' },
    ]
  }
]
