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
  },
  {
    id: 2,
    title: 'New order received',
    description: 'Order #ORD-2481 was placed',
    time: '18 minutes ago',
    icon: ShoppingBag,
  },
  {
    id: 3,
    title: 'Payment received',
    description: '$1,250 payment completed',
    time: '45 minutes ago',
    icon: CreditCard,
  },
  {
    id: 4,
    title: 'Order completed',
    description: 'Order #ORD-2476 was delivered',
    time: '1 hour ago',
    icon: PackageCheck,
  },
]

function RecentActivity() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest updates from your store
        </p>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  {activity.title}
                </p>

                <p className="mt-0.5 truncate text-sm text-slate-500">
                  {activity.description}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {activity.time}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <button className="mt-6 w-full rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
        View all activity
      </button>
    </div>
  )
}

export default RecentActivity