import {
  useMemo,
  useState,
  type FormEvent,
} from 'react'

import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Search,
  X,
} from 'lucide-react'

type UserRole = 'Admin' | 'Manager' | 'Staff' | 'Customer'
type UserStatus = 'Active' | 'Inactive'

interface User {
  id: number
  name: string
  email: string
  role: UserRole
  status: UserStatus
  joined: string
  initials: string
}

interface UserForm {
  name: string
  email: string
  role: UserRole
  status: UserStatus
}

const initialUsers: User[] = [
  {
    id: 1,
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    role: 'Admin',
    status: 'Active',
    joined: 'Oct 01, 2026',
    initials: 'AM',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Manager',
    status: 'Active',
    joined: 'Sep 28, 2026',
    initials: 'SJ',
  },
  {
    id: 3,
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    role: 'Staff',
    status: 'Inactive',
    joined: 'Sep 20, 2026',
    initials: 'DW',
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily.brown@example.com',
    role: 'Customer',
    status: 'Active',
    joined: 'Sep 15, 2026',
    initials: 'EB',
  },
  {
    id: 5,
    name: 'Michael Davis',
    email: 'michael.davis@example.com',
    role: 'Staff',
    status: 'Active',
    joined: 'Sep 10, 2026',
    initials: 'MD',
  },
  {
    id: 6,
    name: 'Jessica Miller',
    email: 'jessica.miller@example.com',
    role: 'Customer',
    status: 'Inactive',
    joined: 'Sep 05, 2026',
    initials: 'JM',
  },
  {
    id: 7,
    name: 'Robert Taylor',
    email: 'robert.taylor@example.com',
    role: 'Manager',
    status: 'Active',
    joined: 'Aug 30, 2026',
    initials: 'RT',
  },
  {
    id: 8,
    name: 'Olivia Anderson',
    email: 'olivia.anderson@example.com',
    role: 'Customer',
    status: 'Active',
    joined: 'Aug 25, 2026',
    initials: 'OA',
  },
  {
    id: 9,
    name: 'James Thomas',
    email: 'james.thomas@example.com',
    role: 'Staff',
    status: 'Active',
    joined: 'Aug 18, 2026',
    initials: 'JT',
  },
  {
    id: 10,
    name: 'Sophia Martinez',
    email: 'sophia.martinez@example.com',
    role: 'Customer',
    status: 'Inactive',
    joined: 'Aug 12, 2026',
    initials: 'SM',
  },
  {
    id: 11,
    name: 'Daniel Garcia',
    email: 'daniel.garcia@example.com',
    role: 'Staff',
    status: 'Active',
    joined: 'Aug 05, 2026',
    initials: 'DG',
  },
  {
    id: 12,
    name: 'Emma Robinson',
    email: 'emma.robinson@example.com',
    role: 'Customer',
    status: 'Active',
    joined: 'Jul 28, 2026',
    initials: 'ER',
  },
]

const USERS_PER_PAGE = 5

const emptyForm: UserForm = {
  name: '',
  email: '',
  role: 'Customer',
  status: 'Active',
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')
}

function Users() {
  // Main data
  const [users, setUsers] = useState<User[]>(initialUsers)

  // Search / filters
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)

  // Action menu
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  // Add user
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newUser, setNewUser] = useState<UserForm>(emptyForm)

  // Edit user
  const [editingUser, setEditingUser] = useState<User | null>(null)

  // Delete user
  const [deletingUser, setDeletingUser] = useState<User | null>(null)

  // -----------------------------
  // FILTER USERS
  // -----------------------------

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)

      const matchesRole =
        roleFilter === 'All' || user.role === roleFilter

      const matchesStatus =
        statusFilter === 'All' || user.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, search, roleFilter, statusFilter])

  // -----------------------------
  // PAGINATION
  // -----------------------------

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PER_PAGE),
  )

  const safeCurrentPage = Math.min(currentPage, totalPages)

  const startIndex =
    (safeCurrentPage - 1) * USERS_PER_PAGE

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE,
  )

  const firstVisible =
    filteredUsers.length === 0 ? 0 : startIndex + 1

  const lastVisible = Math.min(
    startIndex + USERS_PER_PAGE,
    filteredUsers.length,
  )

  // -----------------------------
  // FILTER HANDLERS
  // -----------------------------

  const handleSearch = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
    setOpenMenuId(null)
  }

  const handleRoleFilter = (value: string) => {
    setRoleFilter(value)
    setCurrentPage(1)
    setOpenMenuId(null)
  }

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1)
    setOpenMenuId(null)
  }

  // -----------------------------
  // ADD USER
  // -----------------------------

  const handleAddUser = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const name = newUser.name.trim()
    const email = newUser.email.trim()

    if (!name || !email) {
      return
    }

    const user: User = {
      id: Date.now(),
      name,
      email,
      role: newUser.role,
      status: newUser.status,
      joined: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      initials: getInitials(name),
    }

    setUsers((currentUsers) => [
      user,
      ...currentUsers,
    ])

    setNewUser(emptyForm)
    setSearch('')
    setRoleFilter('All')
    setStatusFilter('All')
    setCurrentPage(1)
    setIsAddModalOpen(false)
  }

  const closeAddModal = () => {
    setIsAddModalOpen(false)
    setNewUser(emptyForm)
  }

  // -----------------------------
  // EDIT USER
  // -----------------------------

  const handleEditUser = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!editingUser) {
      return
    }

    const name = editingUser.name.trim()
    const email = editingUser.email.trim()

    if (!name || !email) {
      return
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              name,
              email,
              role: editingUser.role,
              status: editingUser.status,
              initials: getInitials(name),
            }
          : user,
      ),
    )

    setEditingUser(null)
    setOpenMenuId(null)
  }

  // -----------------------------
  // DELETE USER
  // -----------------------------

  const handleDeleteUser = () => {
    if (!deletingUser) {
      return
    }

    const userId = deletingUser.id

    setUsers((currentUsers) =>
      currentUsers.filter(
        (user) => user.id !== userId,
      ),
    )

    setDeletingUser(null)
    setOpenMenuId(null)
  }

  return (
    <div>
      {/* PAGE HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Users
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your users and their account information.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />

          Add User
        </button>
      </div>

      {/* TABLE CARD */}

      <div className="mt-8 overflow-visible rounded-xl border border-slate-200 bg-white">
        {/* FILTERS */}

        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                handleSearch(event.target.value)
              }
              placeholder="Search users..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={roleFilter}
              onChange={(event) =>
                handleRoleFilter(event.target.value)
              }
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
              <option value="Customer">Customer</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                handleStatusFilter(event.target.value)
              }
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  User
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Joined
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="transition hover:bg-slate-50"
                >
                  {/* USER */}

                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                        {user.initials}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {user.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ROLE */}

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                    {user.role}
                  </td>

                  {/* STATUS */}

                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        user.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          user.status === 'Active'
                            ? 'bg-emerald-500'
                            : 'bg-slate-400'
                        }`}
                      />

                      {user.status}
                    </span>
                  </td>

                  {/* JOINED */}

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    {user.joined}
                  </td>

                  {/* ACTIONS */}

                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenuId((currentId) =>
                            currentId === user.id
                              ? null
                              : user.id,
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        aria-label={`Actions for ${user.name}`}
                      >
                        <MoreHorizontal size={19} />
                      </button>

                      {openMenuId === user.id && (
                        <div className="absolute right-0 top-full z-30 mt-1 w-40 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingUser({
                                ...user,
                              })

                              setOpenMenuId(null)
                            }}
                            className="block w-full px-4 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                          >
                            Edit User
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setDeletingUser(user)
                              setOpenMenuId(null)
                            }}
                            className="block w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                          >
                            Delete User
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center"
                  >
                    <p className="font-medium text-slate-600">
                      No users found
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

        <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{' '}
            <span className="font-medium text-slate-700">
              {firstVisible}
            </span>
            {' – '}
            <span className="font-medium text-slate-700">
              {lastVisible}
            </span>{' '}
            of{' '}
            <span className="font-medium text-slate-700">
              {filteredUsers.length}
            </span>{' '}
            users
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safeCurrentPage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(page - 1, 1),
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={17} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                  safeCurrentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={
                safeCurrentPage === totalPages
              }
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(
                    page + 1,
                    totalPages,
                  ),
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* ============================= */}
      {/* ADD USER MODAL */}
      {/* ============================= */}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Add New User
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new user account.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAddModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddUser}>
              <div className="space-y-5 p-6">
                <div>
                  <label
                    htmlFor="add-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="add-name"
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(event) =>
                      setNewUser({
                        ...newUser,
                        name: event.target.value,
                      })
                    }
                    placeholder="Enter full name"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="add-email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="add-email"
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(event) =>
                      setNewUser({
                        ...newUser,
                        email: event.target.value,
                      })
                    }
                    placeholder="name@example.com"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="add-role"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Role
                    </label>

                    <select
                      id="add-role"
                      value={newUser.role}
                      onChange={(event) =>
                        setNewUser({
                          ...newUser,
                          role: event.target
                            .value as UserRole,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
                    >
                      <option value="Admin">
                        Admin
                      </option>

                      <option value="Manager">
                        Manager
                      </option>

                      <option value="Staff">
                        Staff
                      </option>

                      <option value="Customer">
                        Customer
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="add-status"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Status
                    </label>

                    <select
                      id="add-status"
                      value={newUser.status}
                      onChange={(event) =>
                        setNewUser({
                          ...newUser,
                          status: event.target
                            .value as UserStatus,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
                    >
                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================= */}
      {/* EDIT USER MODAL */}
      {/* ============================= */}

      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Edit User
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update the user's account
                  information.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingUser(null)
                }
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditUser}>
              <div className="space-y-5 p-6">
                <div>
                  <label
                    htmlFor="edit-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="edit-name"
                    type="text"
                    required
                    value={editingUser.name}
                    onChange={(event) =>
                      setEditingUser({
                        ...editingUser,
                        name: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="edit-email"
                    type="email"
                    required
                    value={editingUser.email}
                    onChange={(event) =>
                      setEditingUser({
                        ...editingUser,
                        email: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="edit-role"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Role
                    </label>

                    <select
                      id="edit-role"
                      value={editingUser.role}
                      onChange={(event) =>
                        setEditingUser({
                          ...editingUser,
                          role: event.target
                            .value as UserRole,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
                    >
                      <option value="Admin">
                        Admin
                      </option>

                      <option value="Manager">
                        Manager
                      </option>

                      <option value="Staff">
                        Staff
                      </option>

                      <option value="Customer">
                        Customer
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="edit-status"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Status
                    </label>

                    <select
                      id="edit-status"
                      value={editingUser.status}
                      onChange={(event) =>
                        setEditingUser({
                          ...editingUser,
                          status: event.target
                            .value as UserStatus,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
                    >
                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                <button
                  type="button"
                  onClick={() =>
                    setEditingUser(null)
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ============================= */}

      {deletingUser && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <span className="text-xl font-bold">
                !
              </span>
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Delete User
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-slate-700">
                {deletingUser.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setDeletingUser(null)
                }
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteUser}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users