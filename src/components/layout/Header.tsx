
import { useEffect, useRef, useState } from 'react'
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  Settings,
  UserRound,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface HeaderProps {
  onMenuClick: () => void
}

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/users': 'Users',
  '/products': 'Products',
  '/analytics': 'Analytics',
  '/reports': 'Reports',
  '/settings': 'Settings',
}

function Header({ onMenuClick }: HeaderProps) {
const [profileMenu, setProfileMenu] = useState({
  open: false,
  pathname: '',
})

  const profileRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const profileOpen =
    profileMenu.open &&
    profileMenu.pathname === location.pathname

  const closeProfileMenu = () => {
    setProfileMenu({
      open: false,
      pathname: location.pathname,
    })
  }

  const pageTitle = pageTitles[location.pathname] ?? 'Dashboard'


  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileMenu((current) => ({
          ...current,
          open: false,
        }))
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProfileMenu((current) => ({
          ...current,
          open: false,
        }))
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md sm:h-20 sm:px-6 lg:px-8">
      <div className="flex w-full min-w-0 items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            aria-controls="app-sidebar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="min-w-0 sm:hidden">
            <p className="truncate text-sm font-bold text-slate-900">
              NowieDev
            </p>
            <p className="truncate text-xs text-slate-500">
              {pageTitle}
            </p>
          </div>

          <div className="hidden min-w-0 max-w-md flex-1 sm:block">
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                disabled
                aria-label="Global search coming soon"
                placeholder="Global search coming soon..."
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            disabled
            title="Notifications coming soon"
            aria-label="Notifications coming soon"
            className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl text-slate-400"
          >
            <Bell size={20} />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() =>
                setProfileMenu((current) => ({
                  open:
                    current.pathname === location.pathname
                      ? !current.open
                      : true,
                  pathname: location.pathname,
                }))
              }
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              aria-label="Open profile menu"
              className={`flex items-center gap-2 rounded-xl p-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:gap-3 ${
                profileOpen ? 'bg-blue-50' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-sm font-bold text-blue-700 ring-2 ring-white sm:h-10 sm:w-10">
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
                className={`hidden text-slate-400 transition-transform md:block ${
                  profileOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {profileOpen && (
              <div
                role="menu"
                aria-label="Profile menu"
                className="absolute right-0 top-full z-50 mt-3 w-60 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60"
              >
                <div className="border-b border-slate-100 px-3 py-3">
                  <p className="text-sm font-semibold text-slate-900">
                    Nowie John
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    admin@nowiedev.com
                  </p>
                </div>

                <Link
                  to="/settings"
                  role="menuitem"
                  onClick={closeProfileMenu}
                  className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <UserRound size={17} />
                  My Profile
                </Link>

                <Link
                  to="/settings"
                  role="menuitem"
                  onClick={closeProfileMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <Settings size={17} />
                  Account Settings
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
