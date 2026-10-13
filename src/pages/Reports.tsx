import { useMemo, useState } from 'react'
import {
  CheckCircle2, Clock3, Download, FileText, PhilippinePeso,
  Printer, Search, ShoppingCart, X,
} from 'lucide-react'

type ReportStatus = 'Completed' | 'Processing' | 'Pending' | 'Cancelled'
type DateFilter = 'All Dates' | 'Today' | 'Last 7 Days' | 'Last 30 Days'

interface Report {
  id: number
  orderNumber: string
  customer: string
  date: string
  dateValue: string
  product: string
  amount: number
  status: ReportStatus
}

const reports: Report[] = [
  { id: 1, orderNumber: 'ORD-2481', customer: 'Alex Morgan', date: 'Oct 06, 2026', dateValue: '2026-10-06', product: 'Wireless Headphones', amount: 2499, status: 'Completed' },
  { id: 2, orderNumber: 'ORD-2480', customer: 'Sarah Johnson', date: 'Oct 06, 2026', dateValue: '2026-10-06', product: 'Mechanical Keyboard', amount: 3299, status: 'Processing' },
  { id: 3, orderNumber: 'ORD-2479', customer: 'David Wilson', date: 'Oct 05, 2026', dateValue: '2026-10-05', product: 'Office Chair', amount: 5499, status: 'Completed' },
  { id: 4, orderNumber: 'ORD-2478', customer: 'Emily Brown', date: 'Oct 05, 2026', dateValue: '2026-10-05', product: 'Laptop Stand', amount: 1299, status: 'Pending' },
  { id: 5, orderNumber: 'ORD-2477', customer: 'Michael Davis', date: 'Oct 04, 2026', dateValue: '2026-10-04', product: 'Wireless Mouse', amount: 899, status: 'Completed' },
  { id: 6, orderNumber: 'ORD-2476', customer: 'Jessica Miller', date: 'Oct 04, 2026', dateValue: '2026-10-04', product: 'USB-C Hub', amount: 1599, status: 'Cancelled' },
  { id: 7, orderNumber: 'ORD-2475', customer: 'Robert Taylor', date: 'Oct 03, 2026', dateValue: '2026-10-03', product: 'Standing Desk', amount: 12499, status: 'Processing' },
  { id: 8, orderNumber: 'ORD-2474', customer: 'Olivia Anderson', date: 'Oct 03, 2026', dateValue: '2026-10-03', product: 'Webcam Pro', amount: 2799, status: 'Completed' },
  { id: 9, orderNumber: 'ORD-2473', customer: 'James Thomas', date: 'Oct 02, 2026', dateValue: '2026-10-02', product: 'Desk Lamp', amount: 1099, status: 'Pending' },
  { id: 10, orderNumber: 'ORD-2472', customer: 'Sophia Martinez', date: 'Oct 02, 2026', dateValue: '2026-10-02', product: 'Laptop Backpack', amount: 1899, status: 'Completed' },
]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value)

// Date-only strings are compared in UTC to avoid daylight-saving transitions.
const dateToDay = (date: string) => Math.floor(Date.parse(`${date}T00:00:00Z`) / 86400000)
const latestDemoDay = Math.max(...reports.map((report) => dateToDay(report.dateValue)))
const latestDemoDate = reports.find((report) => dateToDay(report.dateValue) === latestDemoDay)?.date ?? 'Oct 06, 2026'

const statusStyles: Record<ReportStatus, string> = {
  Completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  Processing: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  Pending: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  Cancelled: 'bg-red-50 text-red-700 ring-red-600/10',
}

function Reports() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState<DateFilter>('All Dates')

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase()
    return reports.filter((report) => {
      const matchesSearch = [report.orderNumber, report.customer, report.product]
        .some((value) => value.toLowerCase().includes(query))
      const matchesStatus = statusFilter === 'All' || report.status === statusFilter
      const daysAgo = latestDemoDay - dateToDay(report.dateValue)
      const matchesDate = dateFilter === 'All Dates' ||
        (dateFilter === 'Today' && daysAgo === 0) ||
        (dateFilter === 'Last 7 Days' && daysAgo >= 0 && daysAgo <= 6) ||
        (dateFilter === 'Last 30 Days' && daysAgo >= 0 && daysAgo <= 29)
      return matchesSearch && matchesStatus && matchesDate
    })
  }, [search, statusFilter, dateFilter])

  const totalRevenue = reports.filter((r) => r.status === 'Completed').reduce((sum, r) => sum + r.amount, 0)
  const completedOrders = reports.filter((r) => r.status === 'Completed').length
  const pendingOrders = reports.filter((r) => r.status === 'Pending' || r.status === 'Processing').length
  const filteredRevenue = filteredReports.filter((r) => r.status === 'Completed').reduce((sum, r) => sum + r.amount, 0)
  const hasFilters = Boolean(search || statusFilter !== 'All' || dateFilter !== 'All Dates')

  const summary = [
    { label: 'Total Reports', value: String(reports.length), hint: 'Recorded transactions', icon: FileText, iconStyle: 'bg-blue-50 text-blue-600' },
    { label: 'Revenue', value: formatCurrency(totalRevenue), hint: 'From completed orders', icon: PhilippinePeso, iconStyle: 'bg-emerald-50 text-emerald-600' },
    { label: 'Completed', value: String(completedOrders), hint: 'Successful orders', icon: CheckCircle2, iconStyle: 'bg-emerald-50 text-emerald-600' },
    { label: 'Pending', value: String(pendingOrders), hint: 'Pending and processing', icon: Clock3, iconStyle: 'bg-amber-50 text-amber-600' },
  ]

  const handleExportCSV = () => {
    const headers = ['Order Number', 'Customer', 'Date', 'Product', 'Amount', 'Status']
    const rows = filteredReports.map((report) => [report.orderNumber, report.customer, report.date, report.product, report.amount, report.status])
    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'sales-report.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('All')
    setDateFilter('All Dates')
  }

  return (
    <div className="min-w-0">
      <div className="reports-screen">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Reports</h1>
            <p className="mt-1.5 text-sm text-slate-500">Review, filter, and export business transaction reports.</p>
            <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Demo data · Latest record: {latestDemoDate}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            <button type="button" onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:px-4">
              <Printer size={17} /> Print
            </button>
            <button type="button" onClick={handleExportCSV}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:px-4">
              <Download size={17} /> Export CSV
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 xl:grid-cols-4">
          {summary.map(({ label, value, hint, icon: Icon, iconStyle }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500">{label}</p>
                  <p className="mt-2 break-words text-2xl font-bold tracking-tight text-slate-900">{value}</p>
                </div>
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}><Icon size={21} /></span>
              </div>
              <p className="mt-4 text-xs text-slate-500">{hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-semibold text-slate-900">Transaction History</h2>
                <p className="mt-0.5 text-xs text-slate-500">Browse the sample sales records below.</p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{filteredReports.length} records</span>
            </div>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-sm">
                <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input aria-label="Search reports" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders, customers, products..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex">
                <select aria-label="Filter by date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value as DateFilter)}
                  className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                  <option value="All Dates">All Dates</option><option value="Today">Today (Demo)</option><option value="Last 7 Days">Last 7 Days</option><option value="Last 30 Days">Last 30 Days</option>
                </select>
                <select aria-label="Filter by status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                  className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                  <option value="All">All Status</option><option value="Completed">Completed</option><option value="Processing">Processing</option><option value="Pending">Pending</option><option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            {hasFilters && <button type="button" onClick={clearFilters} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"><X size={13} /> Clear filters</button>}
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full min-w-[860px] text-left">
              <thead className="bg-slate-50/80">
                <tr>{['Order', 'Customer', 'Date', 'Product', 'Amount', 'Status'].map((header) => (
                  <th key={header} scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">{header}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="transition-colors hover:bg-blue-50/30">
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-blue-600">{report.orderNumber}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-800">{report.customer}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">{report.date}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{report.product}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold tabular-nums text-slate-800">{formatCurrency(report.amount)}</td>
                    <td className="whitespace-nowrap px-5 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[report.status]}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{report.status}</span></td>
                  </tr>
                ))}
                {filteredReports.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-14 text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"><ShoppingCart size={26} /></span>
                    <p className="mt-4 font-semibold text-slate-800">No reports found</p>
                    <p className="mt-1 text-sm text-slate-500">Try another search or adjust your filters.</p>
                    {hasFilters && <button type="button" onClick={clearFilters} className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700">Clear all filters</button>}
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Showing <span className="font-semibold text-slate-800">{filteredReports.length}</span> of <span className="font-semibold text-slate-800">{reports.length}</span> reports</p>
            <p>Completed revenue (filtered): <span className="font-semibold text-slate-800">{formatCurrency(filteredRevenue)}</span></p>
          </div>
        </div>
      </div>

      {/* Keep the existing print-report class structure: src/index.css controls print visibility and A4 layout. */}
      <div className="print-report">
        <div className="print-report-header">
          <div><h1>NowieDev</h1><p>Admin Dashboard</p></div>
          <div className="print-report-title"><h2>Sales Report</h2></div>
        </div>
        <div className="print-report-info">
          <div><span>Period</span><strong>{dateFilter}</strong></div>
          <div><span>Status</span><strong>{statusFilter === 'All' ? 'All Status' : statusFilter}</strong></div>
          <div><span>Records</span><strong>{filteredReports.length}</strong></div>
          <div><span>Revenue</span><strong>{formatCurrency(filteredRevenue)}</strong></div>
        </div>
        <table className="print-report-table">
          <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Product</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>{filteredReports.map((report) => (
            <tr key={report.id}><td>{report.orderNumber}</td><td>{report.customer}</td><td>{report.date}</td><td>{report.product}</td><td>{formatCurrency(report.amount)}</td><td>{report.status}</td></tr>
          ))}</tbody>
        </table>
        {filteredReports.length === 0 && <p className="print-empty">No records found for the selected filters.</p>}
        <div className="print-report-footer">
          <div><span>Total Records</span><strong>{filteredReports.length}</strong></div>
          <div><span>Completed Revenue</span><strong>{formatCurrency(filteredRevenue)}</strong></div>
        </div>
        <p className="print-generated">Generated from NowieDev Admin Dashboard</p>
      </div>
    </div>
  )
}

export default Reports
