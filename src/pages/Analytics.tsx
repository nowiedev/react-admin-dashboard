import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  PhilippinePeso,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 185000, orders: 120 },
  { month: 'Feb', revenue: 214000, orders: 142 },
  { month: 'Mar', revenue: 198000, orders: 135 },
  { month: 'Apr', revenue: 245000, orders: 168 },
  { month: 'May', revenue: 272000, orders: 184 },
  { month: 'Jun', revenue: 258000, orders: 176 },
  { month: 'Jul', revenue: 310000, orders: 211 },
  { month: 'Aug', revenue: 342000, orders: 235 },
  { month: 'Sep', revenue: 328000, orders: 221 },
  { month: 'Oct', revenue: 386000, orders: 264 },
  { month: 'Nov', revenue: 402000, orders: 279 },
  { month: 'Dec', revenue: 448000, orders: 301 },
]

const categoryData = [
  { category: 'Electronics', sales: 428000 },
  { category: 'Furniture', sales: 312000 },
  { category: 'Accessories', sales: 218000 },
  { category: 'Office', sales: 164000 },
]

const orderStatusData = [
  { name: 'Completed', value: 68, color: '#10b981' },
  { name: 'Processing', value: 20, color: '#3b82f6' },
  { name: 'Pending', value: 8, color: '#f59e0b' },
  { name: 'Cancelled', value: 4, color: '#ef4444' },
]

const topProducts = [
  { name: 'Wireless Headphones', category: 'Electronics', sales: 428, revenue: 1069572 },
  { name: 'Mechanical Keyboard', category: 'Electronics', sales: 315, revenue: 1039185 },
  { name: 'Office Chair', category: 'Furniture', sales: 186, revenue: 1022814 },
  { name: 'Standing Desk', category: 'Furniture', sales: 72, revenue: 899928 },
  { name: 'Webcam Pro', category: 'Electronics', sales: 248, revenue: 694152 },
]

const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value)

const formatCompactPeso = (value: number) =>
  `₱${new Intl.NumberFormat('en-PH', { notation: 'compact', maximumFractionDigits: 2 }).format(value)}`

const kpis: {
  title: string
  value: string
  change: number
  icon: LucideIcon
  iconClass: string
}[] = [
  { title: 'Total Revenue', value: formatCompactPeso(totalRevenue), change: 12.5, icon: PhilippinePeso, iconClass: 'bg-blue-50 text-blue-600' },
  { title: 'Total Orders', value: '2,436', change: 8.2, icon: ShoppingCart, iconClass: 'bg-violet-50 text-violet-600' },
  { title: 'Customers', value: '1,849', change: 6.8, icon: Users, iconClass: 'bg-amber-50 text-amber-600' },
  { title: 'Conversion Rate', value: '3.24%', change: -1.2, icon: TrendingUp, iconClass: 'bg-emerald-50 text-emerald-600' },
]

const cardClass = 'min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6'
const chartTooltipStyle = {
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
  fontSize: 12,
}

function Analytics() {
  return (
    <div className="min-w-0 pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Analytics</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor business performance and sales trends.</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
          <CalendarDays size={17} className="text-blue-600" />
          2026 Demo Data
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          const positive = kpi.change >= 0
          return (
            <div key={kpi.title} className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500">{kpi.title}</p>
                  <p className="mt-2 break-words text-2xl font-bold tracking-tight text-slate-900">{kpi.value}</p>
                </div>
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${kpi.iconClass}`}>
                  <Icon size={21} strokeWidth={2} />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold ${positive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}>
                  {positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                  {Math.abs(kpi.change)}%
                </span>
                <span className="text-xs text-slate-400">vs previous period (demo)</span>
              </div>
            </div>
          )
        })}
      </div>

      <section className={`${cardClass} mt-6`} aria-labelledby="revenue-heading">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 id="revenue-heading" className="text-lg font-semibold tracking-tight text-slate-900">Revenue Performance</h2>
            <p className="mt-1 text-sm text-slate-500">Monthly revenue across the demo year</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xl font-bold tracking-tight text-slate-900">{formatCurrency(totalRevenue)}</p>
            <p className="mt-1 text-xs font-medium text-emerald-600">+12.5% annual growth (demo)</p>
          </div>
        </div>
        <div className="h-64 w-full min-w-0 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="analyticsRevenuePolish" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.23} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} minTickGap={14} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} width={58} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(value: number) => `₱${value / 1000}k`} />
              <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Revenue']} contentStyle={chartTooltipStyle} />
              <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fill="url(#analyticsRevenuePolish)" activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-2">
        <section className={cardClass} aria-labelledby="category-heading">
          <h2 id="category-heading" className="text-lg font-semibold tracking-tight text-slate-900">Sales by Category</h2>
          <p className="mt-1 text-sm text-slate-500">Revenue across product categories</p>
          <div className="mt-6 h-64 min-w-0 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 5, right: 5, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} interval={0} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} width={58} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(value: number) => `₱${value / 1000}k`} />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Sales']} contentStyle={chartTooltipStyle} />
                <Bar dataKey="sales" fill="#2563eb" radius={[6, 6, 0, 0]} maxBarSize={58} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className={cardClass} aria-labelledby="status-heading">
          <h2 id="status-heading" className="text-lg font-semibold tracking-tight text-slate-900">Order Status</h2>
          <p className="mt-1 text-sm text-slate-500">Distribution of demo orders</p>
          <div className="mt-4 grid grid-cols-1 items-center gap-3 sm:grid-cols-2">
            <div className="relative h-60 min-w-0 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={orderStatusData} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="80%" paddingAngle={3} stroke="none">
                    {orderStatusData.map((item) => <Cell key={item.name} fill={item.color} />)}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} contentStyle={chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900">68%</span>
                <span className="text-xs text-slate-400">Completed</span>
              </div>
            </div>
            <div className="space-y-4">
              {orderStatusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="truncate text-sm text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-slate-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="mt-6 min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm" aria-labelledby="products-heading">
        <div className="border-b border-slate-100 p-4 sm:p-6">
          <h2 id="products-heading" className="text-lg font-semibold tracking-tight text-slate-900">Top Selling Products</h2>
          <p className="mt-1 text-sm text-slate-500">Best performing demo products by revenue</p>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-slate-50/80">
              <tr>
                <th scope="col" className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6">Product</th>
                <th scope="col" className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6">Category</th>
                <th scope="col" className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6">Units Sold</th>
                <th scope="col" className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topProducts.map((product, index) => (
                <tr key={product.name} className="transition-colors hover:bg-blue-50/30">
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">{index + 1}</span>
                      <span className="text-sm font-semibold text-slate-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 sm:px-6"><span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{product.category}</span></td>
                  <td className="px-4 py-4 text-right text-sm font-medium tabular-nums text-slate-700 sm:px-6">{product.sales.toLocaleString('en-PH')}</td>
                  <td className="px-4 py-4 text-right text-sm font-semibold tabular-nums text-slate-800 sm:px-6">{formatCurrency(product.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="mt-4 text-xs text-slate-400">Analytics figures are illustrative demo data and are not connected to live transactions.</p>
    </div>
  )
}

export default Analytics
