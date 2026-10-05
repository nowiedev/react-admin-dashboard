import {
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

const menuItems = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    name: 'Users',
    icon: Users,
    path: '/users',
  },
  {
    name: 'Products',
    icon: Package,
    path: '/products',
  },
  {
    name: 'Analytics',
    icon: BarChart3,
    path: '/analytics',
  },
  {
    name: 'Reports',
    icon: FileText,
    path: '/reports',
  },
]

function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
            N
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              NowieDev
            </h1>

            <p className="text-xs text-slate-500">
              Admin Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-slate-200 p-4">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`
          }
        >
          <Settings size={20} />

          <span>Settings</span>
        </NavLink>

        <button
          type="button"
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          <LogOut size={20} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar