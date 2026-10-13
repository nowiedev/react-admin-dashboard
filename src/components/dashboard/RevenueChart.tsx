import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 18500 },
  { month: 'Feb', revenue: 22400 },
  { month: 'Mar', revenue: 19800 },
  { month: 'Apr', revenue: 27600 },
  { month: 'May', revenue: 25300 },
  { month: 'Jun', revenue: 32100 },
  { month: 'Jul', revenue: 29800 },
  { month: 'Aug', revenue: 36500 },
  { month: 'Sep', revenue: 34200 },
  { month: 'Oct', revenue: 41800 },
  { month: 'Nov', revenue: 39600 },
  { month: 'Dec', revenue: 48295 },
]

const formatPHP = (value: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value)

function RevenueChart() {
  return (
    <section className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">Revenue Overview</h2>
          <p className="mt-1 text-sm text-slate-500">Illustrative monthly revenue trend</p>
        </div>
        <div className="sm:text-right">
          <p className="text-2xl font-bold tracking-tight text-slate-900">₱48,295</p>
          <p className="mt-1 text-xs font-semibold text-emerald-600">+12.5% vs previous period</p>
        </div>
      </div>

      <div className="h-64 w-full min-w-0 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="dashboardRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.24} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 5" vertical={false} stroke="#e9eef5" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} interval="preserveStartEnd" minTickGap={18} tickMargin={12} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} width={52} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(value: number) => `₱${Math.round(value / 1000)}k`} />
            <Tooltip
              formatter={(value) => [formatPHP(Number(value ?? 0)), 'Revenue']}
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15,23,42,0.08)', fontSize: 12 }}
              cursor={{ stroke: '#93c5fd', strokeDasharray: '4 4' }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fill="url(#dashboardRevenueGradient)" activeDot={{ r: 5, strokeWidth: 3, stroke: '#fff' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" /> Revenue
        </span>
        <span className="text-xs text-slate-400">Jan – Dec · Demo data</span>
      </div>
    </section>
  )
}

export default RevenueChart
