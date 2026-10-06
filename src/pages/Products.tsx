import {
  useMemo,
  useState,
  type FormEvent,
} from 'react'

import {
  AlertTriangle,
  Boxes,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Package,
  PackageX,
  Plus,
  Search,
  X,
} from 'lucide-react'

type StockStatus =
  | 'In Stock'
  | 'Low Stock'
  | 'Out of Stock'

interface Product {
  id: number
  name: string
  sku: string
  category: string
  price: number
  stock: number
}

interface ProductForm {
  name: string
  sku: string
  category: string
  price: string
  stock: string
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    sku: 'WH-1001',
    category: 'Electronics',
    price: 2499,
    stock: 42,
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    sku: 'MK-1002',
    category: 'Electronics',
    price: 3299,
    stock: 8,
  },
  {
    id: 3,
    name: 'Office Chair',
    sku: 'OC-1003',
    category: 'Furniture',
    price: 5499,
    stock: 16,
  },
  {
    id: 4,
    name: 'Laptop Stand',
    sku: 'LS-1004',
    category: 'Accessories',
    price: 1299,
    stock: 0,
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    sku: 'WM-1005',
    category: 'Electronics',
    price: 899,
    stock: 35,
  },
  {
    id: 6,
    name: 'USB-C Hub',
    sku: 'UH-1006',
    category: 'Accessories',
    price: 1599,
    stock: 6,
  },
  {
    id: 7,
    name: 'Standing Desk',
    sku: 'SD-1007',
    category: 'Furniture',
    price: 12499,
    stock: 11,
  },
  {
    id: 8,
    name: 'Webcam Pro',
    sku: 'WP-1008',
    category: 'Electronics',
    price: 2799,
    stock: 24,
  },
  {
    id: 9,
    name: 'Desk Lamp',
    sku: 'DL-1009',
    category: 'Furniture',
    price: 1099,
    stock: 4,
  },
  {
    id: 10,
    name: 'Laptop Backpack',
    sku: 'LB-1010',
    category: 'Accessories',
    price: 1899,
    stock: 18,
  },
  {
    id: 11,
    name: '27-inch Monitor',
    sku: 'MN-1011',
    category: 'Electronics',
    price: 9999,
    stock: 0,
  },
  {
    id: 12,
    name: 'Cable Organizer',
    sku: 'CO-1012',
    category: 'Accessories',
    price: 349,
    stock: 56,
  },
]

const PRODUCTS_PER_PAGE = 5

const emptyForm: ProductForm = {
  name: '',
  sku: '',
  category: 'Electronics',
  price: '',
  stock: '',
}

function getStockStatus(stock: number): StockStatus {
  if (stock === 0) {
    return 'Out of Stock'
  }

  if (stock <= 10) {
    return 'Low Stock'
  }

  return 'In Stock'
}

function Products() {
  const [products, setProducts] =
    useState<Product[]>(initialProducts)

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] =
    useState('All')
  const [statusFilter, setStatusFilter] =
    useState('All')

  const [currentPage, setCurrentPage] =
    useState(1)

  const [openMenuId, setOpenMenuId] =
    useState<number | null>(null)

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false)

  const [newProduct, setNewProduct] =
    useState<ProductForm>(emptyForm)

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null)

  const [deletingProduct, setDeletingProduct] =
    useState<Product | null>(null)

  // -----------------------------
  // FILTER PRODUCTS
  // -----------------------------

  const filteredProducts = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase()

    return products.filter((product) => {
      const status = getStockStatus(
        product.stock,
      )

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchValue) ||
        product.sku
          .toLowerCase()
          .includes(searchValue)

      const matchesCategory =
        categoryFilter === 'All' ||
        product.category === categoryFilter

      const matchesStatus =
        statusFilter === 'All' ||
        status === statusFilter

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      )
    })
  }, [
    products,
    search,
    categoryFilter,
    statusFilter,
  ])

  // -----------------------------
  // SUMMARY CARDS
  // -----------------------------

  const totalProducts = products.length

  const totalStock = products.reduce(
    (total, product) =>
      total + product.stock,
    0,
  )

  const lowStockProducts =
    products.filter(
      (product) =>
        getStockStatus(product.stock) ===
        'Low Stock',
    ).length

  const outOfStockProducts =
    products.filter(
      (product) =>
        getStockStatus(product.stock) ===
        'Out of Stock',
    ).length

  // -----------------------------
  // PAGINATION
  // -----------------------------

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
        PRODUCTS_PER_PAGE,
    ),
  )

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  )

  const startIndex =
    (safeCurrentPage - 1) *
    PRODUCTS_PER_PAGE

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE,
    )

  const firstVisible =
    filteredProducts.length === 0
      ? 0
      : startIndex + 1

  const lastVisible = Math.min(
    startIndex + PRODUCTS_PER_PAGE,
    filteredProducts.length,
  )

  // -----------------------------
  // FILTER HANDLERS
  // -----------------------------

  const handleSearch = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
    setOpenMenuId(null)
  }

  const handleCategoryFilter = (
    value: string,
  ) => {
    setCategoryFilter(value)
    setCurrentPage(1)
    setOpenMenuId(null)
  }

  const handleStatusFilter = (
    value: string,
  ) => {
    setStatusFilter(value)
    setCurrentPage(1)
    setOpenMenuId(null)
  }

  // -----------------------------
  // ADD PRODUCT
  // -----------------------------

  const handleAddProduct = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const name = newProduct.name.trim()
    const sku = newProduct.sku.trim()
    const category =
      newProduct.category.trim()

    const price = Number(newProduct.price)
    const stock = Number(newProduct.stock)

    if (
      !name ||
      !sku ||
      !category ||
      Number.isNaN(price) ||
      Number.isNaN(stock) ||
      price < 0 ||
      stock < 0
    ) {
      return
    }

    const product: Product = {
      id: Date.now(),
      name,
      sku,
      category,
      price,
      stock,
    }

    setProducts((currentProducts) => [
      product,
      ...currentProducts,
    ])

    setNewProduct(emptyForm)

    setSearch('')
    setCategoryFilter('All')
    setStatusFilter('All')
    setCurrentPage(1)

    setIsAddModalOpen(false)
  }

  const closeAddModal = () => {
    setIsAddModalOpen(false)
    setNewProduct(emptyForm)
  }

  // -----------------------------
  // EDIT PRODUCT
  // -----------------------------

  const handleEditProduct = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!editingProduct) {
      return
    }

    const name =
      editingProduct.name.trim()

    const sku =
      editingProduct.sku.trim()

    const category =
      editingProduct.category.trim()

    if (
      !name ||
      !sku ||
      !category ||
      editingProduct.price < 0 ||
      editingProduct.stock < 0
    ) {
      return
    }

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === editingProduct.id
          ? {
              ...editingProduct,
              name,
              sku,
              category,
            }
          : product,
      ),
    )

    setEditingProduct(null)
    setOpenMenuId(null)
  }

  // -----------------------------
  // DELETE PRODUCT
  // -----------------------------

  const handleDeleteProduct = () => {
    if (!deletingProduct) {
      return
    }

    const productId = deletingProduct.id

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) =>
          product.id !== productId,
      ),
    )

    setDeletingProduct(null)
    setOpenMenuId(null)
  }

  // -----------------------------
  // CURRENCY
  // -----------------------------

  const formatCurrency = (
    price: number,
  ) => {
    return new Intl.NumberFormat(
      'en-PH',
      {
        style: 'currency',
        currency: 'PHP',
      },
    ).format(price)
  }

  return (
    <div className="min-w-0">
      {/* PAGE HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Products
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage products, pricing, and
            inventory levels.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsAddModalOpen(true)
          }
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />

          Add Product
        </button>
      </div>

      {/* SUMMARY CARDS */}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Products
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalProducts}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Package size={21} />
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Products in inventory
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Stock
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalStock}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Boxes size={21} />
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Units currently available
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Low Stock
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {lowStockProducts}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle size={21} />
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Products needing attention
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Out of Stock
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {outOfStockProducts}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <PackageX size={21} />
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Products unavailable
          </p>
        </div>
      </div>

      {/* PRODUCT TABLE */}

      <div className="mt-6 overflow-visible rounded-xl border border-slate-200 bg-white">
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
                handleSearch(
                  event.target.value,
                )
              }
              placeholder="Search product or SKU..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={categoryFilter}
              onChange={(event) =>
                handleCategoryFilter(
                  event.target.value,
                )
              }
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
            >
              <option value="All">
                All Categories
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Furniture">
                Furniture
              </option>

              <option value="Accessories">
                Accessories
              </option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                handleStatusFilter(
                  event.target.value,
                )
              }
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
            >
              <option value="All">
                All Stock Status
              </option>

              <option value="In Stock">
                In Stock
              </option>

              <option value="Low Stock">
                Low Stock
              </option>

              <option value="Out of Stock">
                Out of Stock
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
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Stock
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedProducts.map(
                (product) => {
                  const status =
                    getStockStatus(
                      product.stock,
                    )

                  return (
                    <tr
                      key={product.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Package
                              size={19}
                            />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {product.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              SKU:{' '}
                              {product.sku}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {product.category}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                        {formatCurrency(
                          product.price,
                        )}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {product.stock} units
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            status ===
                            'In Stock'
                              ? 'bg-emerald-50 text-emerald-700'
                              : status ===
                                  'Low Stock'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenuId(
                                (
                                  currentId,
                                ) =>
                                  currentId ===
                                  product.id
                                    ? null
                                    : product.id,
                              )
                            }
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                          >
                            <MoreHorizontal
                              size={19}
                            />
                          </button>

                          {openMenuId ===
                            product.id && (
                            <div className="absolute right-0 top-full z-30 mt-1 w-40 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProduct(
                                    {
                                      ...product,
                                    },
                                  )

                                  setOpenMenuId(
                                    null,
                                  )
                                }}
                                className="block w-full px-4 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                              >
                                Edit Product
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setDeletingProduct(
                                    product,
                                  )

                                  setOpenMenuId(
                                    null,
                                  )
                                }}
                                className="block w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                              >
                                Delete Product
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                },
              )}

              {paginatedProducts.length ===
                0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center"
                  >
                    <Package
                      size={32}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 font-medium text-slate-600">
                      No products found
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
              {filteredProducts.length}
            </span>{' '}
            products
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={
                safeCurrentPage === 1
              }
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(
                    page - 1,
                    1,
                  ),
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
                onClick={() =>
                  setCurrentPage(page)
                }
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
                safeCurrentPage ===
                totalPages
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

      {/* ADD PRODUCT MODAL */}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Add Product
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add a new product to
                  inventory.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAddModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleAddProduct}
            >
              <div className="space-y-5 p-6">
                <div>
                  <label
                    htmlFor="add-product-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Product Name
                  </label>

                  <input
                    id="add-product-name"
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(event) =>
                      setNewProduct({
                        ...newProduct,
                        name: event.target
                          .value,
                      })
                    }
                    placeholder="Enter product name"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="add-sku"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      SKU
                    </label>

                    <input
                      id="add-sku"
                      type="text"
                      required
                      value={newProduct.sku}
                      onChange={(event) =>
                        setNewProduct({
                          ...newProduct,
                          sku: event.target
                            .value,
                        })
                      }
                      placeholder="PR-1001"
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="add-category"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Category
                    </label>

                    <select
                      id="add-category"
                      value={
                        newProduct.category
                      }
                      onChange={(event) =>
                        setNewProduct({
                          ...newProduct,
                          category:
                            event.target
                              .value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                    >
                      <option value="Electronics">
                        Electronics
                      </option>

                      <option value="Furniture">
                        Furniture
                      </option>

                      <option value="Accessories">
                        Accessories
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="add-price"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Price
                    </label>

                    <input
                      id="add-price"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={newProduct.price}
                      onChange={(event) =>
                        setNewProduct({
                          ...newProduct,
                          price:
                            event.target
                              .value,
                        })
                      }
                      placeholder="0.00"
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="add-stock"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Stock Quantity
                    </label>

                    <input
                      id="add-stock"
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={newProduct.stock}
                      onChange={(event) =>
                        setNewProduct({
                          ...newProduct,
                          stock:
                            event.target
                              .value,
                        })
                      }
                      placeholder="0"
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">
                  Stock status is calculated
                  automatically: 0 = Out of
                  Stock, 1–10 = Low Stock,
                  11+ = In Stock.
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}

      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Edit Product
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update product and
                  inventory information.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingProduct(null)
                }
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleEditProduct}
            >
              <div className="space-y-5 p-6">
                <div>
                  <label
                    htmlFor="edit-product-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Product Name
                  </label>

                  <input
                    id="edit-product-name"
                    type="text"
                    required
                    value={
                      editingProduct.name
                    }
                    onChange={(event) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: event.target
                          .value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="edit-sku"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      SKU
                    </label>

                    <input
                      id="edit-sku"
                      type="text"
                      required
                      value={
                        editingProduct.sku
                      }
                      onChange={(event) =>
                        setEditingProduct({
                          ...editingProduct,
                          sku: event.target
                            .value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-category"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Category
                    </label>

                    <select
                      id="edit-category"
                      value={
                        editingProduct.category
                      }
                      onChange={(event) =>
                        setEditingProduct({
                          ...editingProduct,
                          category:
                            event.target
                              .value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                    >
                      <option value="Electronics">
                        Electronics
                      </option>

                      <option value="Furniture">
                        Furniture
                      </option>

                      <option value="Accessories">
                        Accessories
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="edit-price"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Price
                    </label>

                    <input
                      id="edit-price"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={
                        editingProduct.price
                      }
                      onChange={(event) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: Number(
                            event.target
                              .value,
                          ),
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-stock"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Stock Quantity
                    </label>

                    <input
                      id="edit-stock"
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={
                        editingProduct.stock
                      }
                      onChange={(event) =>
                        setEditingProduct({
                          ...editingProduct,
                          stock: Number(
                            event.target
                              .value,
                          ),
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-sm text-slate-500">
                    Current status:{' '}
                    <span className="font-semibold text-slate-700">
                      {getStockStatus(
                        editingProduct.stock,
                      )}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                <button
                  type="button"
                  onClick={() =>
                    setEditingProduct(null)
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE PRODUCT MODAL */}

      {deletingProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <span className="text-xl font-bold">
                !
              </span>
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Delete Product
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to
              delete{' '}
              <span className="font-semibold text-slate-700">
                {deletingProduct.name}
              </span>
              ? This action cannot be
              undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setDeletingProduct(null)
                }
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleDeleteProduct
                }
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products