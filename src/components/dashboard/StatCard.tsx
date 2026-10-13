import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

type CardTone = 'blue' | 'violet' | 'amber' | 'emerald'

interface StatCardProps {
  title: string
  value: string
  change: number
  description: string
  icon: LucideIcon
  tone?: CardTone
}

const iconStyles: Record<CardTone, string> = {
  blue: 'bg-blue-50 text-blue-600 ring-blue-100',
  violet: 'bg-violet-50 text-violet-600 ring-violet-100',
  amber: 'bg-amber-50 text-amber-600 ring-amber-100',
  emerald: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
}

function StatCard({ title, value, change, description, icon: Icon, tone = 'blue' }: StatCardProps) {
  const isPositive = change >= 0

  return (
    <article className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-2 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-[27px]">
            {value}
          </h2>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${iconStyles[tone]}`}>
          <Icon size={21} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-slate-100 pt-4">
        <span className={`inline-flex items-center gap-0.5 rounded-md px-2 py-1 text-xs font-bold ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
          {isPositive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
          {Math.abs(change)}%
        </span>
        <span className="text-xs text-slate-400">{description}</span>
      </div>
    </article>
  )
}

export default StatCard
