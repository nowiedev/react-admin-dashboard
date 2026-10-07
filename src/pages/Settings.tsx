import { useState, type FormEvent } from 'react'

import {
  Bell,
  Check,
  Globe2,
  Save,
  Settings as SettingsIcon,
  User,
} from 'lucide-react'

function Settings() {
  const [name, setName] = useState('Nowie John')
  const [email, setEmail] = useState(
    'admin@nowiedev.com',
  )
  const [role, setRole] = useState('Administrator')

  const [appName, setAppName] = useState(
    'NowieDev Admin Dashboard',
  )
  const [currency, setCurrency] =
    useState('PHP')
  const [timezone, setTimezone] =
    useState('Asia/Manila')

  const [emailNotifications, setEmailNotifications] =
    useState(true)
  const [orderNotifications, setOrderNotifications] =
    useState(true)
  const [lowStockNotifications, setLowStockNotifications] =
    useState(true)
  const [marketingNotifications, setMarketingNotifications] =
    useState(false)

  const [profileSaved, setProfileSaved] =
    useState(false)
  const [applicationSaved, setApplicationSaved] =
    useState(false)

  const handleProfileSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setProfileSaved(true)

    window.setTimeout(() => {
      setProfileSaved(false)
    }, 2500)
  }

  const handleApplicationSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setApplicationSaved(true)

    window.setTimeout(() => {
      setApplicationSaved(false)
    }, 2500)
  }

  return (
    <div className="min-w-0">
      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your profile, application preferences,
          and notifications.
        </p>
      </div>

      <div className="mt-6 grid min-w-0 grid-cols-1 gap-5 sm:mt-8 sm:gap-6 xl:grid-cols-3">
        {/* LEFT COLUMN */}

        <div className="min-w-0 space-y-5 sm:space-y-6 xl:col-span-2">
          {/* PROFILE SETTINGS */}

          <form
            onSubmit={handleProfileSubmit}
            className="rounded-xl border border-slate-200 bg-white"
          >
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Profile Settings
                </h2>

                <p className="mt-0.5 text-sm text-slate-500">
                  Update your personal information.
                </p>
              </div>
            </div>

            <div className="space-y-5 p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                  NJ
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {name || 'Administrator'}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {role}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="profile-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="profile-name"
                    type="text"
                    required
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="profile-email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="profile-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="profile-role"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Role
                  </label>

                  <input
                    id="profile-role"
                    type="text"
                    value={role}
                    onChange={(event) =>
                      setRole(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                {profileSaved && (
                  <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <Check size={16} />
                    Profile saved successfully.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
              >
                <Save size={17} />
                Save Profile
              </button>
            </div>
          </form>

          {/* APPLICATION SETTINGS */}

          <form
            onSubmit={handleApplicationSubmit}
            className="rounded-xl border border-slate-200 bg-white"
          >
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <SettingsIcon size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Application Settings
                </h2>

                <p className="mt-0.5 text-sm text-slate-500">
                  Configure general dashboard preferences.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  htmlFor="app-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Application Name
                </label>

                <input
                  id="app-name"
                  type="text"
                  required
                  value={appName}
                  onChange={(event) =>
                    setAppName(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="currency"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Currency
                </label>

                <select
                  id="currency"
                  value={currency}
                  onChange={(event) =>
                    setCurrency(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
                >
                  <option value="PHP">
                    Philippine Peso (PHP)
                  </option>

                  <option value="USD">
                    US Dollar (USD)
                  </option>

                  <option value="EUR">
                    Euro (EUR)
                  </option>

                  <option value="JPY">
                    Japanese Yen (JPY)
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="timezone"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Timezone
                </label>

                <select
                  id="timezone"
                  value={timezone}
                  onChange={(event) =>
                    setTimezone(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
                >
                  <option value="Asia/Manila">
                    Asia/Manila
                  </option>

                  <option value="Asia/Tokyo">
                    Asia/Tokyo
                  </option>

                  <option value="America/New_York">
                    America/New York
                  </option>

                  <option value="Europe/London">
                    Europe/London
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                {applicationSaved && (
                  <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <Check size={16} />
                    Settings saved successfully.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
              >
                <Save size={17} />
                Save Settings
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN */}

        <div className="min-w-0 space-y-5 sm:space-y-6">
          {/* NOTIFICATIONS */}

          <div className="rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Bell size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Notifications
                </h2>

                <p className="mt-0.5 text-sm text-slate-500">
                  Choose what you want to receive.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              <NotificationToggle
                title="Email Notifications"
                description="Receive important updates by email."
                enabled={emailNotifications}
                onChange={setEmailNotifications}
              />

              <NotificationToggle
                title="Order Updates"
                description="Get notified when orders change."
                enabled={orderNotifications}
                onChange={setOrderNotifications}
              />

              <NotificationToggle
                title="Low Stock Alerts"
                description="Receive inventory stock warnings."
                enabled={lowStockNotifications}
                onChange={setLowStockNotifications}
              />

              <NotificationToggle
                title="Marketing Updates"
                description="Receive product and marketing news."
                enabled={marketingNotifications}
                onChange={setMarketingNotifications}
              />
            </div>
          </div>

          {/* SYSTEM INFO */}

          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Globe2 size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  System Information
                </h2>

                <p className="mt-0.5 text-sm text-slate-500">
                  Application details
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <InfoRow
                label="Version"
                value="1.0.0"
              />

              <InfoRow
                label="Environment"
                value="Development"
              />

              <InfoRow
                label="Framework"
                value="React + TypeScript"
              />

              <InfoRow
                label="UI"
                value="Tailwind CSS"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface NotificationToggleProps {
  title: string
  description: string
  enabled: boolean
  onChange: (value: boolean) => void
}

function NotificationToggle({
  title,
  description,
  enabled,
  onChange,
}: NotificationToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
      <div>
        <p className="text-sm font-semibold text-slate-700">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled
            ? 'bg-blue-600'
            : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
            enabled
              ? 'left-6'
              : 'left-1'
          }`}
        />
      </button>
    </div>
  )
}

interface InfoRowProps {
  label: string
  value: string
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-700">
        {value}
      </span>
    </div>
  )
}

export default Settings