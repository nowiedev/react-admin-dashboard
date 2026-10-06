import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
}

function Header({
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white px-4 sm:h-20 sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between gap-3">
        {/* MOBILE MENU */}

        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* SEARCH */}

        <div className="relative hidden w-full max-w-md sm:block">
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

        {/* MOBILE BRAND */}

        <div className="min-w-0 flex-1 sm:hidden">
          <p className="truncate text-base font-bold text-slate-900">
            NowieDev
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <button
            type="button"
            className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-slate-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 sm:h-10 sm:w-10">
              NJ
            </div>

            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-slate-800">
                Nowie John
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-slate-400 md:block"
            />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header