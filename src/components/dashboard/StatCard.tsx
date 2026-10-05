import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: number
  description: string
  icon: LucideIcon
}

function StatCard({
  title,
  value,
  change,
  description,
  icon: Icon,
}: StatCardProps) {
  const isPositive = change >= 0

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h3>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={21} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`flex items-center gap-1 text-sm font-semibold ${
            isPositive ? 'text-emerald-600' : 'text-red-500'
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}

          {Math.abs(change)}%
        </span>

        <span className="text-sm text-slate-400">
          {description}
        </span>
      </div>
    </div>
  )
}

export default StatCard