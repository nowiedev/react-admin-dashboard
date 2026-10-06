import {
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Users,
  X,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

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

function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* MOBILE OVERLAY */}

      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* LOGO */}

        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
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

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon size={20} />

                  <span>
                    {item.name}
                  </span>
                </NavLink>
              )
            })}
          </div>
        </nav>

        {/* BOTTOM */}

        <div className="border-t border-slate-200 p-4">
          <NavLink
            to="/settings"
            onClick={onClose}
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
    </>
  )
}

export default Sidebar