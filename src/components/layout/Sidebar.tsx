
import {
  BarChart3,
  ChevronRight,
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
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Users', icon: Users, path: '/users' },
  { name: 'Products', icon: Package, path: '/products' },
  { name: 'Analytics', icon: BarChart3, path: '/analytics' },
  { name: 'Reports', icon: FileText, path: '/reports' },
]

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navClass = (isActive: boolean) =>
    `group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
      isActive
        ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        id="app-sidebar"
        aria-label="Sidebar navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5 sm:h-20">
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-extrabold text-white shadow-md shadow-blue-200">
              N
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                Nowie<span className="text-blue-600">Dev</span>
              </h1>
              <p className="text-[11px] font-medium tracking-wide text-slate-400">
                ADMIN DASHBOARD
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Main Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => navClass(isActive)}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.4 : 1.9}
                        className="shrink-0"
                      />
                      <span className="flex-1">{item.name}</span>
                      {isActive && (
                        <ChevronRight size={16} className="text-blue-500" />
                      )}
                    </>
                  )}
                </NavLink>
              )
            })}
          </div>
        </nav>

        <div className="shrink-0 border-t border-slate-100 p-3">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) => navClass(isActive)}
          >
            {({ isActive }) => (
              <>
                <Settings size={19} className="shrink-0" />
                <span className="flex-1">Settings</span>
                {isActive && (
                  <ChevronRight size={16} className="text-blue-500" />
                )}
              </>
            )}
          </NavLink>

          <button
            type="button"
            disabled
            title="Logout will be available when authentication is connected"
            className="mt-1 flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400"
          >
            <LogOut size={19} />
            <span>Logout</span>
            <span className="ml-auto text-[10px]">Soon</span>
          </button>

          <div className="mt-4 rounded-xl bg-slate-50 px-3 py-3">
            <p className="text-xs font-semibold text-slate-700">
              NowieDev Dashboard
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              Version 1.0.0
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
