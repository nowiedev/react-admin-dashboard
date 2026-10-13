import {
  PhilippinePeso,
  ShoppingCart,
  TrendingUp,
  Users,
  CalendarDays,
} from 'lucide-react'

import StatCard from '../components/dashboard/StatCard'
import RevenueChart from '../components/dashboard/RevenueChart'
import RecentActivity from '../components/dashboard/RecentActivity'

const stats = [
  {
    title: 'Total Revenue',
    value: '₱48,295',
    change: 12.5,
    description: 'vs previous period',
    icon:  PhilippinePeso,
    tone: 'blue' as const,
  },
  {
    title: 'Total Users',
    value: '12,849',
    change: 8.2,
    description: 'vs previous period',
    icon: Users,
    tone: 'violet' as const,
  },
  {
    title: 'Total Orders',
    value: '3,241',
    change: 5.7,
    description: 'vs previous period',
    icon: ShoppingCart,
    tone: 'amber' as const,
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: -1.2,
    description: 'vs previous period',
    icon: TrendingUp,
    tone: 'emerald' as const,
  },
]

function Dashboard() {
  return (
    <main className="min-w-0 space-y-6 pb-4 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Overview
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            Welcome back. Here's a snapshot of your business performance.
          </p>
        </div>

        <div className="inline-flex w-full items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm sm:w-auto">
          <CalendarDays size={17} className="text-slate-400" aria-hidden="true" />
          Demo reporting overview
        </div>
      </div>

      <section aria-label="Key performance indicators" className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section aria-label="Revenue and recent activity" className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <RevenueChart />
        </div>
        <div className="min-w-0">
          <RecentActivity />
        </div>
      </section>
      <p className="text-xs text-slate-400">Demo dashboard: figures are illustrative and are not linked to live transactions.</p>
    </main>
  )
}

export default Dashboard
