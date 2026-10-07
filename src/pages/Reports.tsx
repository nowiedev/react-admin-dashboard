import { useMemo, useState } from 'react'

import {
  CheckCircle2,
  Clock3,
  DollarSign,
  Download,
  FileText,
  Printer,
  Search,
  ShoppingCart,
} from 'lucide-react'

type ReportStatus =
  | 'Completed'
  | 'Processing'
  | 'Pending'
  | 'Cancelled'

type DateFilter =
  | 'All Dates'
  | 'Today'
  | 'Last 7 Days'
  | 'Last 30 Days'

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
  {
    id: 1,
    orderNumber: 'ORD-2481',
    customer: 'Alex Morgan',
    date: 'Oct 06, 2026',
    dateValue: '2026-10-06',
    product: 'Wireless Headphones',
    amount: 2499,
    status: 'Completed',
  },
  {
    id: 2,
    orderNumber: 'ORD-2480',
    customer: 'Sarah Johnson',
    date: 'Oct 06, 2026',
    dateValue: '2026-10-06',
    product: 'Mechanical Keyboard',
    amount: 3299,
    status: 'Processing',
  },
  {
    id: 3,
    orderNumber: 'ORD-2479',
    customer: 'David Wilson',
    date: 'Oct 05, 2026',
    dateValue: '2026-10-05',
    product: 'Office Chair',
    amount: 5499,
    status: 'Completed',
  },
  {
    id: 4,
    orderNumber: 'ORD-2478',
    customer: 'Emily Brown',
    date: 'Oct 05, 2026',
    dateValue: '2026-10-05',
    product: 'Laptop Stand',
    amount: 1299,
    status: 'Pending',
  },
  {
    id: 5,
    orderNumber: 'ORD-2477',
    customer: 'Michael Davis',
    date: 'Oct 04, 2026',
    dateValue: '2026-10-04',
    product: 'Wireless Mouse',
    amount: 899,
    status: 'Completed',
  },
  {
    id: 6,
    orderNumber: 'ORD-2476',
    customer: 'Jessica Miller',
    date: 'Oct 04, 2026',
    dateValue: '2026-10-04',
    product: 'USB-C Hub',
    amount: 1599,
    status: 'Cancelled',
  },
  {
    id: 7,
    orderNumber: 'ORD-2475',
    customer: 'Robert Taylor',
    date: 'Oct 03, 2026',
    dateValue: '2026-10-03',
    product: 'Standing Desk',
    amount: 12499,
    status: 'Processing',
  },
  {
    id: 8,
    orderNumber: 'ORD-2474',
    customer: 'Olivia Anderson',
    date: 'Oct 03, 2026',
    dateValue: '2026-10-03',
    product: 'Webcam Pro',
    amount: 2799,
    status: 'Completed',
  },
  {
    id: 9,
    orderNumber: 'ORD-2473',
    customer: 'James Thomas',
    date: 'Oct 02, 2026',
    dateValue: '2026-10-02',
    product: 'Desk Lamp',
    amount: 1099,
    status: 'Pending',
  },
  {
    id: 10,
    orderNumber: 'ORD-2472',
    customer: 'Sophia Martinez',
    date: 'Oct 02, 2026',
    dateValue: '2026-10-02',
    product: 'Laptop Backpack',
    amount: 1899,
    status: 'Completed',
  },
]

function parseLocalDate(value: string) {
  const [year, month, day] = value
    .split('-')
    .map(Number)

  return new Date(year, month - 1, day)
}

function Reports() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] =
    useState('All')

  const [dateFilter, setDateFilter] =
    useState<DateFilter>('All Dates')

  const latestReportDate = useMemo(() => {
    const timestamps = reports.map((report) =>
      parseLocalDate(report.dateValue).getTime(),
    )

    return new Date(Math.max(...timestamps))
  }, [])

  const filteredReports = useMemo(() => {
    const value = search.trim().toLowerCase()

    return reports.filter((report) => {
      const matchesSearch =
        report.orderNumber
          .toLowerCase()
          .includes(value) ||
        report.customer
          .toLowerCase()
          .includes(value) ||
        report.product
          .toLowerCase()
          .includes(value)

      const matchesStatus =
        statusFilter === 'All' ||
        report.status === statusFilter

      const reportDate = parseLocalDate(
        report.dateValue,
      )

      const differenceInDays = Math.floor(
        (latestReportDate.getTime() -
          reportDate.getTime()) /
          (1000 * 60 * 60 * 24),
      )

      let matchesDate = true

      if (dateFilter === 'Today') {
        matchesDate = differenceInDays === 0
      }

      if (dateFilter === 'Last 7 Days') {
        matchesDate =
          differenceInDays >= 0 &&
          differenceInDays <= 6
      }

      if (dateFilter === 'Last 30 Days') {
        matchesDate =
          differenceInDays >= 0 &&
          differenceInDays <= 29
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDate
      )
    })
  }, [
    search,
    statusFilter,
    dateFilter,
    latestReportDate,
  ])

  const totalRevenue = reports
    .filter(
      (report) =>
        report.status === 'Completed',
    )
    .reduce(
      (total, report) =>
        total + report.amount,
      0,
    )

  const completedOrders = reports.filter(
    (report) =>
      report.status === 'Completed',
  ).length

  const pendingOrders = reports.filter(
    (report) =>
      report.status === 'Pending' ||
      report.status === 'Processing',
  ).length

  const filteredRevenue =
    filteredReports
      .filter(
        (report) =>
          report.status === 'Completed',
      )
      .reduce(
        (total, report) =>
          total + report.amount,
        0,
      )

  const formatCurrency = (
    value: number,
  ) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(value)

  const handleExportCSV = () => {
    const headers = [
      'Order Number',
      'Customer',
      'Date',
      'Product',
      'Amount',
      'Status',
    ]

    const rows = filteredReports.map(
      (report) => [
        report.orderNumber,
        report.customer,
        report.date,
        report.product,
        report.amount,
        report.status,
      ],
    )

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(
                /"/g,
                '""',
              )}"`,
          )
          .join(','),
      )
      .join('\n')

    const blob = new Blob(
      ['\uFEFF' + csvContent],
      {
        type: 'text/csv;charset=utf-8;',
      },
    )

    const url =
      URL.createObjectURL(blob)

    const link =
      document.createElement('a')

    link.href = url
    link.download = 'sales-report.csv'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-w-0">
      {/* SCREEN CONTENT */}

      <div className="reports-screen">
        {/* HEADER */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Reports
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review, filter, and export
              business transaction reports.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-row">
            <button
              type="button"
              onClick={handlePrint}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:w-auto"
            >
              <Printer size={18} />
              Print
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {/* SUMMARY */}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Reports
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {reports.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={21} />
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Recorded transactions
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Revenue
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {formatCurrency(
                    totalRevenue,
                  )}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <DollarSign size={21} />
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              From completed orders
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Completed
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {completedOrders}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={21} />
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Successful orders
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {pendingOrders}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Clock3 size={21} />
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Awaiting completion
            </p>
          </div>
        </div>

        {/* TABLE */}

        <div className="mt-6 min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value,
                  )
                }
                placeholder="Search orders..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={dateFilter}
                onChange={(event) =>
                  setDateFilter(
                    event.target
                      .value as DateFilter,
                  )
                }
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
              >
                <option value="All Dates">
                  All Dates
                </option>

                <option value="Today">
                  Today
                </option>

                <option value="Last 7 Days">
                  Last 7 Days
                </option>

                <option value="Last 30 Days">
                  Last 30 Days
                </option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value,
                  )
                }
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
              >
                <option value="All">
                  All Status
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full min-w-[860px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredReports.map(
                  (report) => (
                    <tr
                      key={report.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-blue-600">
                        {
                          report.orderNumber
                        }
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                        {report.customer}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                        {report.date}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {report.product}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-700">
                        {formatCurrency(
                          report.amount,
                        )}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            report.status ===
                            'Completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : report.status ===
                                  'Processing'
                                ? 'bg-blue-50 text-blue-700'
                                : report.status ===
                                    'Pending'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  ),
                )}

                {filteredReports.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center"
                    >
                      <ShoppingCart
                        size={32}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 font-medium text-slate-600">
                        No reports found
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Try changing your
                        search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-200 px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing{' '}
              <span className="font-semibold text-slate-700">
                {filteredReports.length}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-slate-700">
                {reports.length}
              </span>{' '}
              reports
            </p>
          </div>
        </div>
      </div>

      {/* PRINT-ONLY REPORT */}

      <div className="print-report">
        <div className="print-report-header">
          <div>
            <h1>NowieDev</h1>
            <p>Admin Dashboard</p>
          </div>

          <div className="print-report-title">
            <h2>Sales Report</h2>
          </div>
        </div>

        <div className="print-report-info">
          <div>
            <span>Period</span>
            <strong>{dateFilter}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>
              {statusFilter === 'All'
                ? 'All Status'
                : statusFilter}
            </strong>
          </div>

          <div>
            <span>Records</span>
            <strong>
              {filteredReports.length}
            </strong>
          </div>

          <div>
            <span>Revenue</span>
            <strong>
              {formatCurrency(
                filteredRevenue,
              )}
            </strong>
          </div>
        </div>

        <table className="print-report-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.map(
              (report) => (
                <tr key={report.id}>
                  <td>
                    {report.orderNumber}
                  </td>

                  <td>
                    {report.customer}
                  </td>

                  <td>{report.date}</td>

                  <td>
                    {report.product}
                  </td>

                  <td>
                    {formatCurrency(
                      report.amount,
                    )}
                  </td>

                  <td>
                    {report.status}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>

        {filteredReports.length === 0 && (
          <p className="print-empty">
            No records found for the
            selected filters.
          </p>
        )}

        <div className="print-report-footer">
          <div>
            <span>Total Records</span>
            <strong>
              {filteredReports.length}
            </strong>
          </div>

          <div>
            <span>
              Completed Revenue
            </span>

            <strong>
              {formatCurrency(
                filteredRevenue,
              )}
            </strong>
          </div>
        </div>

        <p className="print-generated">
          Generated from NowieDev Admin
          Dashboard
        </p>
      </div>
    </div>
  )
}

export default Reports