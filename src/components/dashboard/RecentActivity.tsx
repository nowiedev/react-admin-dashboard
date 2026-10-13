import {
  ShoppingBag,
  UserPlus,
  CreditCard,
  PackageCheck,
} from 'lucide-react'

const activities = [
  {
    id: 1,
    title: 'New user registered',
    description: 'Alex Morgan created an account',
    time: '2 minutes ago',
    icon: UserPlus,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 2,
    title: 'New order received',
    description: 'Order #ORD-2481 was placed',
    time: '18 minutes ago',
    icon: ShoppingBag,
    color: 'bg-violet-50 text-violet-600',
  },
  {
    id: 3,
    title: 'Payment received',
    description: '₱1,250 payment completed',
    time: '45 minutes ago',
    icon: CreditCard,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 4,
    title: 'Order completed',
    description: 'Order #ORD-2476 was delivered',
    time: '1 hour ago',
    icon: PackageCheck,
    color: 'bg-amber-50 text-amber-600',
  },
]

function RecentActivity() {
  return (
    <section className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">Recent Activity</h2>
          <p className="mt-1 text-sm text-slate-500">Sample store updates</p>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
          {activities.length} updates
        </span>
      </div>

      <ol className="flex-1 space-y-1">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <li key={activity.id} className="flex items-start gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-slate-50 sm:gap-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.color}`}>
                <Icon size={18} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-5 text-slate-800">{activity.title}</p>
                <p className="mt-1 break-words text-sm leading-5 text-slate-500">{activity.description}</p>
                <p className="mt-1.5 text-xs text-slate-400">{activity.time}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="text-center text-xs text-slate-400">Showing the latest {activities.length} sample activities</p>
      </div>
    </section>
  )
}

export default RecentActivity
