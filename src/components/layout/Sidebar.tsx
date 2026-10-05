import {
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react'

const menuItems = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    active: true,
  },
  {
    name: 'Users',
    icon: Users,
  },
  {
    name: 'Products',
    icon: Package,
  },
  {
    name: 'Analytics',
    icon: BarChart3,
  },
  {
    name: 'Reports',
    icon: FileText,
  },
]

function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
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

      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <button
              key={item.name}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={20} />
              {item.name}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
          <Settings size={20} />
          Settings
        </button>

        <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar