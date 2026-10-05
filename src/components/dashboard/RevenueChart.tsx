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

function RevenueChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monthly revenue performance
          </p>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-slate-900">
            $48,295
          </p>

          <p className="text-xs font-medium text-emerald-600">
            +12.5% this month
          </p>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{
              top: 10,
              right: 10,
              left: -15,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="revenueGradient"
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
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                'Revenue',
              ]}
              contentStyle={{
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueChart