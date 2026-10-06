import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react'

import StatCard from '../components/dashboard/StatCard'
import RevenueChart from '../components/dashboard/RevenueChart'
import RecentActivity from '../components/dashboard/RecentActivity'

const stats = [
  {
    title: 'Total Revenue',
    value: '$48,295',
    change: 12.5,
    description: 'vs last month',
    icon: DollarSign,
  },
  {
    title: 'Total Users',
    value: '12,849',
    change: 8.2,
    description: 'vs last month',
    icon: Users,
  },
  {
    title: 'Total Orders',
    value: '3,241',
    change: 5.7,
    description: 'vs last month',
    icon: ShoppingCart,
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: -1.2,
    description: 'vs last month',
    icon: TrendingUp,
  },
]

function Dashboard() {
  return (
    <div className="min-w-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, Nowie. Here's what's happening today.
          </p>
        </div>

        <select className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500 sm:w-auto">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}
      </div>

      <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <RevenueChart />
        </div>

        <div className="min-w-0">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}

export default Dashboard