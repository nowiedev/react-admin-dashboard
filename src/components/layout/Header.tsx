import {
  Bell,
  ChevronDown,
  Search,
} from 'lucide-react'

function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search anything..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Right Section */}
      <div className="ml-6 flex items-center gap-4">
        {/* Notification */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200" />

        {/* User */}
        <button className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-slate-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
            NJ
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Nowie John
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 sm:block"
          />
        </button>
      </div>
    </header>
  )
}

export default Header