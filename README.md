# AyraSuperAdmin — Frontend

Enterprise ERP SuperAdmin Control Panel built with React (Vite) + Tailwind CSS + MUI.

## 🚀 Quick Start

```bash
cd ayrasuper/frontend
npm install
npm run dev
```

Open **http://localhost:3000**

### Demo Credentials
| Field    | Value              |
|----------|--------------------|
| Email    | admin@ayra.edu     |
| Password | Admin@123          |

---

## 📁 Folder Structure

```
frontend/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                  # Entry point
    ├── App.jsx                   # Router + MUI theme
    ├── index.css                 # Global styles, design tokens, utility classes
    │
    ├── store/
    │   └── authStore.js          # Zustand auth state (token, user, login, logout)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── DashboardLayout.jsx   # Sidebar + topbar shell
    │   │   ├── SidebarIcons.jsx      # Custom SVG icon set
    │   │   └── sidebarConfig.js      # Navigation items config
    │   └── common/
    │       └── PageShell.jsx         # Reusable page wrapper
    │
    ├── pages/
    │   ├── LoginPage.jsx         # Secure login + forgot password
    │   ├── DashboardPage.jsx     # Real-time stats, charts, logs, health
    │   ├── InstitutionsPage.jsx  # Full CRUD for colleges
    │   ├── AdminsPage.jsx        # Admin management + roles
    │   ├── UsersPage.jsx         # Global user search + block/reset
    │   ├── RolesPage.jsx         # Dynamic roles + permission matrix
    │   ├── BillingPage.jsx       # Plans, invoices, revenue
    │   ├── AnalyticsPage.jsx     # Charts: trends, college usage, modules
    │   ├── LogsPage.jsx          # Filterable audit trail
    │   ├── SecurityPage.jsx      # Threats, 2FA config, session control
    │   ├── DataPage.jsx          # Backup, restore, export
    │   ├── NotificationsPage.jsx # Compose + broadcast notifications
    │   ├── ModulesPage.jsx       # Toggle modules per college
    │   ├── ApiPage.jsx           # API keys + third-party integrations
    │   ├── BrandingPage.jsx      # Logo, domain, colors per college
    │   ├── MonitoringPage.jsx    # Live charts (users, CPU, RAM)
    │   └── SettingsPage.jsx      # Global system configuration
    │
    ├── hooks/                    # Custom React hooks (add yours here)
    ├── context/                  # React context providers
    ├── services/                 # API service layer (axios)
    ├── utils/                    # Helpers and formatters
    ├── routes/                   # Route guards / helpers
    └── theme/                    # MUI theme overrides
```

---

## 🛠 Tech Stack

| Layer       | Technology                              |
|-------------|------------------------------------------|
| Framework   | React 18 + Vite                          |
| Styling     | Tailwind CSS v3 + custom design tokens   |
| UI Library  | Material UI v5                           |
| State       | Zustand (auth) + local useState          |
| Charts      | Recharts                                 |
| Animation   | Framer Motion                            |
| Routing     | React Router DOM v6                      |
| Toasts      | react-hot-toast                          |
| Fonts       | Syne (display) + DM Sans (body)          |

---

## 🎨 Design System

All design tokens are in `src/index.css` as CSS variables:

```css
--bg-primary     /* #0f0f17 — main background  */
--bg-card        /* #16213e — card background   */
--brand          /* #6366f1 — indigo primary    */
--text-primary   /* #f1f5f9 — main text         */
--text-muted     /* #94a3b8 — secondary text    */
--border-soft    /* rgba(99,102,241,0.15)        */
```

Utility classes defined: `.glass-card`, `.btn-primary`, `.btn-ghost`, `.input-field`, `.stat-card`, `.badge-*`, `.sidebar-item`, `.data-table`, `.live-dot`

---

## 📄 Pages Summary

| Page            | Route           | Feature Highlights                              |
|-----------------|-----------------|--------------------------------------------------|
| Login           | /login          | Email/password, show-hide, forgot password       |
| Dashboard       | /dashboard      | 4 KPI cards, 3 charts, activity log, health      |
| Institutions    | /institutions   | Add/Edit/Delete/Disable, plan, modules           |
| Admins          | /admins         | Create, assign, suspend, permission preview      |
| Users           | /users          | Global search, filter, block, reset password     |
| Roles           | /roles          | Create roles, granular permission toggles        |
| Billing         | /billing        | Plans, invoices, MRR/ARR, trial management       |
| Analytics       | /analytics      | Login trends, college usage, module pie chart    |
| Audit Logs      | /logs           | Filter by type, export CSV                       |
| Security        | /security       | Threat list, block IP, 2FA, session timeout      |
| Data            | /data           | Storage overview, backup history, export         |
| Notifications   | /notifications  | Compose, templates, broadcast history            |
| Modules         | /modules        | Toggle ON/OFF per college visually               |
| API             | /api            | API key management, integration connections      |
| Branding        | /branding       | Logo, domain, color theme per college            |
| Monitoring      | /monitoring     | Live CPU/RAM/users charts, service health        |
| Settings        | /settings       | SMTP, security, backup, system config            |

---

## 🔌 Connect to Backend

Replace mock logic in `src/store/authStore.js`:

```js
const response = await axios.post('/api/auth/login', { email, password })
const { token, user } = response.data
set({ token, user })
```

Add axios instance in `src/services/api.js` and wire each page to real endpoints.

---

## 🔮 Next Steps

- [ ] Connect real REST API endpoints
- [ ] Add WebSocket for live dashboard (Socket.io)
- [ ] Implement dark/light mode toggle
- [ ] Add drag-and-drop dashboard widgets
- [ ] AI-based usage insight panel
- [ ] Role-based menu hiding
- [ ] Mobile-responsive improvements
