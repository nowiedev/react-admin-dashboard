import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  Bell, Check, CircleHelp, Globe2, Info, Mail, Save,
  Settings2, ShieldCheck, UserRound,
} from 'lucide-react'

const inputClass = 'w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
const buttonClass = 'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:w-auto'
const sectionClass = 'min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'

function SectionHeading({ icon: Icon, title, description, tone = 'blue' }: {
  icon: typeof UserRound
  title: string
  description: string
  tone?: 'blue' | 'violet' | 'amber' | 'emerald'
}) {
  const tones = {
    blue: 'bg-blue-50 text-blue-600',
    violet: 'bg-violet-50 text-violet-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  }
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon size={20} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  )
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  )
}

function NotificationToggle({ title, description, enabled, onChange }: {
  title: string
  description: string
  enabled: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
      <div className="min-w-0 pr-2">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-label={title}
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 ${enabled ? 'bg-blue-600' : 'bg-slate-300'}`}
      >
        <span className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-semibold text-slate-800">{value}</span>
    </div>
  )
}

function Settings() {
  const [name, setName] = useState('Nowie John')
  const [email, setEmail] = useState('admin@nowiedev.com')
  const [role, setRole] = useState('Administrator')
  const [appName, setAppName] = useState('NowieDev Admin Dashboard')
  const [currency, setCurrency] = useState('PHP')
  const [timezone, setTimezone] = useState('Asia/Manila')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [orderNotifications, setOrderNotifications] = useState(true)
  const [lowStockNotifications, setLowStockNotifications] = useState(true)
  const [marketingNotifications, setMarketingNotifications] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)
  const [applicationSaved, setApplicationSaved] = useState(false)
  const profileTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const appTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (profileTimer.current) clearTimeout(profileTimer.current)
    if (appTimer.current) clearTimeout(appTimer.current)
  }, [])

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setProfileSaved(true)
    if (profileTimer.current) clearTimeout(profileTimer.current)
    profileTimer.current = setTimeout(() => setProfileSaved(false), 2500)
  }

  const handleApplicationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setApplicationSaved(true)
    if (appTimer.current) clearTimeout(appTimer.current)
    appTimer.current = setTimeout(() => setApplicationSaved(false), 2500)
  }

  const initials = name.trim().split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase() ?? '').join('') || 'AD'

  return (
    <div className="min-w-0 pb-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <Settings2 size={15} aria-hidden="true" /> Workspace preferences
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Settings</h1>
          <p className="mt-2 text-sm text-slate-500">Manage your profile, application preferences, and notifications.</p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          <Info size={14} aria-hidden="true" /> Demo environment
        </span>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <CircleHelp size={18} className="mt-0.5 shrink-0 text-slate-500" aria-hidden="true" />
        <p>These settings are a frontend demonstration. Changes are kept only while this page is open and do not update other dashboard pages or send notifications.</p>
      </div>

      <div className="mt-6 grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-3 xl:gap-6">
        <div className="min-w-0 space-y-5 xl:col-span-2 xl:space-y-6">
          <form onSubmit={handleProfileSubmit} className={sectionClass}>
            <SectionHeading icon={UserRound} title="Profile Settings" description="Update the details shown in your demo profile." />
            <div className="space-y-6 p-5 sm:p-6">
              <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-700">{initials}</div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">{name || 'Administrator'}</p>
                  <p className="mt-0.5 truncate text-sm text-slate-500">{role || 'No role assigned'}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-400"><Mail size={12} aria-hidden="true" /> <span className="truncate">{email}</span></p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field id="profile-name" label="Full Name">
                  <input id="profile-name" className={inputClass} required maxLength={100} autoComplete="name" value={name} onChange={e => { setName(e.target.value); setProfileSaved(false) }} />
                </Field>
                <Field id="profile-email" label="Email Address">
                  <input id="profile-email" className={inputClass} type="email" required maxLength={254} autoComplete="email" value={email} onChange={e => { setEmail(e.target.value); setProfileSaved(false) }} />
                </Field>
                <Field id="profile-role" label="Role">
                  <input id="profile-role" className={inputClass} value={role} maxLength={80} onChange={e => { setRole(e.target.value); setProfileSaved(false) }} />
                </Field>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p aria-live="polite" className="min-h-5 text-sm text-emerald-700">{profileSaved && <span className="inline-flex items-center gap-1.5"><Check size={16} /> Profile updated for this session.</span>}</p>
              <button type="submit" className={buttonClass}><Save size={17} /> Save Profile</button>
            </div>
          </form>

          <form onSubmit={handleApplicationSubmit} className={sectionClass}>
            <SectionHeading icon={Settings2} title="Application Settings" description="Configure example dashboard preferences." tone="violet" />
            <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <Field id="app-name" label="Application Name">
                  <input id="app-name" className={inputClass} required maxLength={100} value={appName} onChange={e => { setAppName(e.target.value); setApplicationSaved(false) }} />
                </Field>
              </div>
              <Field id="currency" label="Currency">
                <select id="currency" className={inputClass} value={currency} onChange={e => { setCurrency(e.target.value); setApplicationSaved(false) }}>
                  <option value="PHP">Philippine Peso (PHP)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="JPY">Japanese Yen (JPY)</option>
                </select>
              </Field>
              <Field id="timezone" label="Timezone">
                <select id="timezone" className={inputClass} value={timezone} onChange={e => { setTimezone(e.target.value); setApplicationSaved(false) }}>
                  <option value="Asia/Manila">Asia/Manila</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                </select>
              </Field>
              <p className="text-xs leading-5 text-slate-400 md:col-span-2">Currency and timezone selections are for demonstration and do not change report formatting.</p>
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p aria-live="polite" className="min-h-5 text-sm text-emerald-700">{applicationSaved && <span className="inline-flex items-center gap-1.5"><Check size={16} /> Preferences updated for this session.</span>}</p>
              <button type="submit" className={buttonClass}><Save size={17} /> Save Settings</button>
            </div>
          </form>
        </div>

        <div className="min-w-0 space-y-5 xl:space-y-6">
          <section className={sectionClass}>
            <SectionHeading icon={Bell} title="Notifications" description="Choose which demo alerts are enabled." tone="amber" />
            <div className="divide-y divide-slate-100">
              <NotificationToggle title="Email Notifications" description="Important updates by email." enabled={emailNotifications} onChange={setEmailNotifications} />
              <NotificationToggle title="Order Updates" description="Updates when orders change." enabled={orderNotifications} onChange={setOrderNotifications} />
              <NotificationToggle title="Low Stock Alerts" description="Inventory stock warnings." enabled={lowStockNotifications} onChange={setLowStockNotifications} />
              <NotificationToggle title="Marketing Updates" description="Product and marketing news." enabled={marketingNotifications} onChange={setMarketingNotifications} />
            </div>
            <p className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs leading-5 text-slate-500 sm:px-6">Toggles are interactive demo controls; no emails or push notifications are sent.</p>
          </section>

          <section className={sectionClass}>
            <SectionHeading icon={Globe2} title="System Information" description="Details about this template." tone="emerald" />
            <div className="px-5 py-2 sm:px-6">
              <InfoRow label="Version" value="1.0.0" />
              <InfoRow label="Environment" value="Demo / Development" />
              <InfoRow label="Framework" value="React + TypeScript" />
              <InfoRow label="UI" value="Tailwind CSS" />
            </div>
            <div className="mx-5 mb-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-3 text-xs font-medium text-emerald-800 sm:mx-6">
              <ShieldCheck size={17} className="shrink-0" aria-hidden="true" /> Frontend portfolio template
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Settings
