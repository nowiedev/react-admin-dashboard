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
    <div>
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, Nowie. Here's what's happening today.
          </p>
        </div>

        <select className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 outline-none focus:border-blue-500">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
        </select>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}
      </div>

      {/* Analytics */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
                <RevenueChart />
            </div>
            
            <RecentActivity />
        </div>
    </div>
  )
}

export default Dashboard