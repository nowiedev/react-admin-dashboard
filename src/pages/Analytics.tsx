import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react'

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
  {
    category: 'Electronics',
    sales: 428000,
  },
  {
    category: 'Furniture',
    sales: 312000,
  },
  {
    category: 'Accessories',
    sales: 218000,
  },
  {
    category: 'Office',
    sales: 164000,
  },
]

const orderStatusData = [
  {
    name: 'Completed',
    value: 68,
    color: '#10b981',
  },
  {
    name: 'Processing',
    value: 20,
    color: '#3b82f6',
  },
  {
    name: 'Pending',
    value: 8,
    color: '#f59e0b',
  },
  {
    name: 'Cancelled',
    value: 4,
    color: '#ef4444',
  },
]

const topProducts = [
  {
    name: 'Wireless Headphones',
    category: 'Electronics',
    sales: 428,
    revenue: 1069572,
  },
  {
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    sales: 315,
    revenue: 1039185,
  },
  {
    name: 'Office Chair',
    category: 'Furniture',
    sales: 186,
    revenue: 1022814,
  },
  {
    name: 'Standing Desk',
    category: 'Furniture',
    sales: 72,
    revenue: 899928,
  },
  {
    name: 'Webcam Pro',
    category: 'Electronics',
    sales: 248,
    revenue: 694152,
  },
]

const kpis = [
  {
    title: 'Total Revenue',
    value: '₱3.61M',
    change: 12.5,
    icon: DollarSign,
  },
  {
    title: 'Total Orders',
    value: '2,436',
    change: 8.2,
    icon: ShoppingCart,
  },
  {
    title: 'Customers',
    value: '1,849',
    change: 6.8,
    icon: Users,
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: -1.2,
    icon: TrendingUp,
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value)
}

function Analytics() {
  return (
    <div>
      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor business performance and sales trends.
          </p>
        </div>

        <select className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500">
          <option>This Year</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* KPI CARDS */}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          const positive = kpi.change >= 0

          return (
            <div
              key={kpi.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {kpi.title}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {kpi.value}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={21} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    positive
                      ? 'text-emerald-600'
                      : 'text-red-500'
                  }`}
                >
                  {positive ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}

                  {Math.abs(kpi.change)}%
                </span>

                <span className="text-sm text-slate-400">
                  vs previous period
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* REVENUE CHART */}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Revenue Performance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Monthly revenue throughout the year
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xl font-bold text-slate-900">
              ₱3.61M
            </p>

            <p className="text-xs font-medium text-emerald-600">
              +12.5% annual growth
            </p>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={revenueData}
              margin={{
                top: 10,
                right: 10,
                left: 5,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="analyticsRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#2563eb"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="95%"
                    stopColor="#2563eb"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#94a3b8',
                  fontSize: 12,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#94a3b8',
                  fontSize: 12,
                }}
                tickFormatter={(value) =>
                  `₱${value / 1000}k`
                }
              />

              <Tooltip
                formatter={(value) => [
                  formatCurrency(Number(value)),
                  'Revenue',
                ]}
                contentStyle={{
                  borderRadius: '10px',
                  border:
                    '1px solid #e2e8f0',
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
                fill="url(#analyticsRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECOND ROW */}

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* CATEGORY SALES */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Sales by Category
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Revenue performance across product categories
            </p>
          </div>

          <div className="mt-6 h-72">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={categoryData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#94a3b8',
                    fontSize: 12,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#94a3b8',
                    fontSize: 12,
                  }}
                  tickFormatter={(value) =>
                    `₱${value / 1000}k`
                  }
                />

                <Tooltip
                  formatter={(value) => [
                    formatCurrency(
                      Number(value),
                    ),
                    'Sales',
                  ]}
                />

                <Bar
                  dataKey="sales"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ORDER STATUS */}

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Order Status
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Distribution of current orders
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
            <div className="h-64">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {orderStatusData.map(
                      (item) => (
                        <Cell
                          key={item.name}
                          fill={item.color}
                        />
                      ),
                    )}
                  </Pie>

                  <Tooltip
                    formatter={(value) => [
                      `${value}%`,
                      'Orders',
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {orderStatusData.map(
                (item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor:
                            item.color,
                        }}
                      />

                      <span className="text-sm text-slate-600">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-slate-800">
                      {item.value}%
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TOP PRODUCTS */}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Top Selling Products
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Best performing products by revenue
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Units Sold
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Revenue
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {topProducts.map(
                (product, index) => (
                  <tr
                    key={product.name}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                          {index + 1}
                        </div>

                        <span className="text-sm font-semibold text-slate-800">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {product.category}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      {product.sales}
                    </td>

                    <td className="px-6 py-4 text-right text-sm font-semibold text-slate-800">
                      {formatCurrency(
                        product.revenue,
                      )}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Analytics