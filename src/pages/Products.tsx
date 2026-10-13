import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AlertTriangle, Boxes, ChevronLeft, ChevronRight, Edit3, MoreHorizontal, Package, PackageX, Plus, Search, Trash2, X } from 'lucide-react'
import { createPortal } from 'react-dom'

type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock'
interface Product { id: number; name: string; sku: string; category: string; price: number; stock: number }
interface ProductForm { name: string; sku: string; category: string; price: string; stock: string }

const initialProducts: Product[] = [
  { id: 1, name: 'Wireless Headphones', sku: 'WH-1001', category: 'Electronics', price: 2499, stock: 42 },
  { id: 2, name: 'Mechanical Keyboard', sku: 'MK-1002', category: 'Electronics', price: 3299, stock: 8 },
  { id: 3, name: 'Office Chair', sku: 'OC-1003', category: 'Furniture', price: 5499, stock: 16 },
  { id: 4, name: 'Laptop Stand', sku: 'LS-1004', category: 'Accessories', price: 1299, stock: 0 },
  { id: 5, name: 'Wireless Mouse', sku: 'WM-1005', category: 'Electronics', price: 899, stock: 35 },
  { id: 6, name: 'USB-C Hub', sku: 'UH-1006', category: 'Accessories', price: 1599, stock: 6 },
  { id: 7, name: 'Standing Desk', sku: 'SD-1007', category: 'Furniture', price: 12499, stock: 11 },
  { id: 8, name: 'Webcam Pro', sku: 'WP-1008', category: 'Electronics', price: 2799, stock: 24 },
  { id: 9, name: 'Desk Lamp', sku: 'DL-1009', category: 'Furniture', price: 1099, stock: 4 },
  { id: 10, name: 'Laptop Backpack', sku: 'LB-1010', category: 'Accessories', price: 1899, stock: 18 },
  { id: 11, name: '27-inch Monitor', sku: 'MN-1011', category: 'Electronics', price: 9999, stock: 0 },
  { id: 12, name: 'Cable Organizer', sku: 'CO-1012', category: 'Accessories', price: 349, stock: 56 },
]
const PER_PAGE = 5
const emptyForm: ProductForm = { name: '', sku: '', category: 'Electronics', price: '', stock: '' }
const categories = ['Electronics', 'Furniture', 'Accessories']
const formatCurrency = (value: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value)
const getStockStatus = (stock: number): StockStatus => stock === 0 ? 'Out of Stock' : stock <= 10 ? 'Low Stock' : 'In Stock'
const fieldClass = 'w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700'
const secondaryButton = 'rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
const primaryButton = 'rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'

function StockBadge({ stock }: { stock: number }) {
  const status = getStockStatus(stock)
  const color = status === 'In Stock' ? 'bg-emerald-50 text-emerald-700 ring-emerald-100' : status === 'Low Stock' ? 'bg-amber-50 text-amber-700 ring-amber-100' : 'bg-red-50 text-red-700 ring-red-100'
  return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${color}`}><span className={`h-1.5 w-1.5 rounded-full ${status === 'In Stock' ? 'bg-emerald-500' : status === 'Low Stock' ? 'bg-amber-500' : 'bg-red-500'}`} />{status}</span>
}

function ProductFields({ form, onChange, prefix }: { form: ProductForm; onChange: (form: ProductForm) => void; prefix: string }) {
  const update = (key: keyof ProductForm, value: string) => onChange({ ...form, [key]: value })
  return <div className="space-y-4">
    <div><label className={labelClass} htmlFor={`${prefix}-name`}>Product Name</label><input id={`${prefix}-name`} required maxLength={100} className={fieldClass} value={form.name} placeholder="Enter product name" onChange={e => update('name', e.target.value)} /></div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div><label className={labelClass} htmlFor={`${prefix}-sku`}>SKU</label><input id={`${prefix}-sku`} required maxLength={40} className={fieldClass} value={form.sku} placeholder="PR-1001" onChange={e => update('sku', e.target.value)} /></div>
      <div><label className={labelClass} htmlFor={`${prefix}-category`}>Category</label><select id={`${prefix}-category`} className={fieldClass} value={form.category} onChange={e => update('category', e.target.value)}>{categories.map(category => <option key={category} value={category}>{category}</option>)}</select></div>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div><label className={labelClass} htmlFor={`${prefix}-price`}>Price (₱)</label><input id={`${prefix}-price`} type="number" required min="0" step="0.01" className={fieldClass} value={form.price} placeholder="0.00" onChange={e => update('price', e.target.value)} /></div>
      <div><label className={labelClass} htmlFor={`${prefix}-stock`}>Stock Quantity</label><input id={`${prefix}-stock`} type="number" required min="0" step="1" className={fieldClass} value={form.stock} placeholder="0" onChange={e => update('stock', e.target.value)} /></div>
    </div>
    <div className="rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-xs leading-5 text-blue-700">Stock status updates automatically: <strong>0</strong> Out of Stock · <strong>1–10</strong> Low Stock · <strong>11+</strong> In Stock.</div>
  </div>
}

function Modal({ title, subtitle, onClose, children }: { title: string; subtitle: string; onClose: () => void; children: ReactNode }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]'))
      if (!focusables.length) return
      const first = focusables[0], last = focusables[focusables.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', keydown)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keydown); previous?.focus() }
  }, [onClose])
  return createPortal(<div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 p-3 backdrop-blur-[2px] sm:p-5" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl outline-none sm:max-h-[calc(100dvh-2.5rem)]">
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6"><div><h2 className="text-lg font-bold text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div><button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><X size={20}/></button></div>
      {children}
    </div>
  </div>, document.body)
}

function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [menu, setMenu] = useState<{ id: number; top: number; left: number } | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<ProductForm>(emptyForm)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editForm, setEditForm] = useState<ProductForm>(emptyForm)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
  const [formError, setFormError] = useState('')

  const filteredProducts = useMemo(() => products.filter(product => {
    const query = search.trim().toLowerCase()
    return (product.name.toLowerCase().includes(query) || product.sku.toLowerCase().includes(query)) && (categoryFilter === 'All' || product.category === categoryFilter) && (statusFilter === 'All' || getStockStatus(product.stock) === statusFilter)
  }), [products, search, categoryFilter, statusFilter])
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PER_PAGE))
  const page = Math.min(currentPage, totalPages)
  const start = (page - 1) * PER_PAGE
  const paginatedProducts = filteredProducts.slice(start, start + PER_PAGE)
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const lowStock = products.filter(p => getStockStatus(p.stock) === 'Low Stock').length
  const outOfStock = products.filter(p => getStockStatus(p.stock) === 'Out of Stock').length
  const summary = [
    { label: 'Total Products', value: products.length, note: 'Products in inventory', icon: Package, iconClass: 'bg-blue-50 text-blue-600' },
    { label: 'Total Stock', value: totalStock, note: 'Units currently available', icon: Boxes, iconClass: 'bg-emerald-50 text-emerald-600' },
    { label: 'Low Stock', value: lowStock, note: 'Products needing attention', icon: AlertTriangle, iconClass: 'bg-amber-50 text-amber-600' },
    { label: 'Out of Stock', value: outOfStock, note: 'Products unavailable', icon: PackageX, iconClass: 'bg-red-50 text-red-600' },
  ]
  const resetFilters = () => { setSearch(''); setCategoryFilter('All'); setStatusFilter('All'); setCurrentPage(1); setMenu(null) }
  const closeAdd = () => { setIsAddModalOpen(false); setNewProduct(emptyForm); setFormError('') }
  const closeEdit = () => { setEditingProduct(null); setFormError('') }
  const openEdit = (product: Product) => { setEditingProduct(product); setEditForm({ name: product.name, sku: product.sku, category: product.category, price: String(product.price), stock: String(product.stock) }); setFormError(''); setMenu(null) }
  const validate = (form: ProductForm, excludeId?: number) => {
    const name = form.name.trim(), sku = form.sku.trim().toUpperCase(), category = form.category.trim()
    const price = Number(form.price), stock = Number(form.stock)
    if (!name || !sku || !category || !form.price.trim() || !form.stock.trim()) return { error: 'Please complete all required fields.' }
    if (!Number.isFinite(price) || price < 0 || !Number.isFinite(stock) || !Number.isSafeInteger(stock) || stock < 0) return { error: 'Enter a valid price and a nonnegative whole-number stock quantity.' }
    if (products.some(p => p.id !== excludeId && p.sku.toUpperCase() === sku)) return { error: 'This SKU already exists. Please use a unique SKU.' }
    return { product: { name, sku, category, price, stock } }
  }
  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = validate(newProduct)
    if (result.error || !result.product) { setFormError(result.error || 'Invalid product.'); return }
    setProducts(current => [{ id: Date.now(), ...result.product! }, ...current]); resetFilters(); closeAdd()
  }
  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingProduct) return
    const result = validate(editForm, editingProduct.id)
    if (result.error || !result.product) { setFormError(result.error || 'Invalid product.'); return }
    const updates = result.product
    setProducts(current => current.map(p => p.id === editingProduct.id ? { ...p, ...updates } : p)); closeEdit(); setMenu(null)
  }
  const handleDelete = () => { if (!deletingProduct) return; setProducts(current => current.filter(p => p.id !== deletingProduct.id)); setDeletingProduct(null); setMenu(null) }
  const toggleMenu = (id: number, button: HTMLButtonElement) => {
    if (menu?.id === id) { setMenu(null); return }
    const rect = button.getBoundingClientRect()
    const top = rect.bottom + 180 > window.innerHeight && rect.top >= 180 ? rect.top - 100 : rect.bottom + 6
    setMenu({ id, top, left: Math.max(8, Math.min(rect.right - 176, window.innerWidth - 184)) })
  }
  useEffect(() => {
    if (!menu) return
    const closeOnOutside = (e: PointerEvent) => { if (!menuRef.current?.contains(e.target as Node) && !(e.target as Element).closest?.('[data-product-actions]')) setMenu(null) }
    const close = () => setMenu(null)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('pointerdown', closeOnOutside)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', close)
    window.addEventListener('scroll', close, true)
    return () => { document.removeEventListener('pointerdown', closeOnOutside); document.removeEventListener('keydown', onKey); window.removeEventListener('resize', close); window.removeEventListener('scroll', close, true) }
  }, [menu])
  const activeMenuProduct = products.find(p => p.id === menu?.id)

  return <div className="min-w-0 space-y-6 sm:space-y-8">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-2xl font-bold tracking-tight text-slate-900">Products</h1><p className="mt-1 text-sm text-slate-500">Manage products, pricing, and inventory levels.</p></div><button type="button" onClick={() => { setFormError(''); setIsAddModalOpen(true) }} className={`${primaryButton} inline-flex w-full items-center justify-center gap-2 sm:w-auto`}><Plus size={18}/>Add Product</button></div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">{summary.map(item => { const Icon = item.icon; return <div key={item.label} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-slate-500">{item.label}</p><p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{item.value.toLocaleString('en-PH')}</p></div><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconClass}`}><Icon size={21}/></div></div><p className="mt-4 text-xs text-slate-400">{item.note}</p></div> })}</div>
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between"><div className="relative w-full lg:max-w-sm"><Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/><input aria-label="Search products" value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); setMenu(null) }} placeholder="Search product or SKU..." className={`${fieldClass} bg-slate-50 pl-10 focus:bg-white`}/></div><div className="flex flex-col gap-3 sm:flex-row"><select aria-label="Filter by category" className={fieldClass} value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); setMenu(null) }}><option value="All">All Categories</option>{categories.map(c => <option key={c}>{c}</option>)}</select><select aria-label="Filter by stock status" className={fieldClass} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); setMenu(null) }}><option value="All">All Stock Status</option><option>In Stock</option><option>Low Stock</option><option>Out of Stock</option></select></div></div>
    <div className="max-w-full overflow-x-auto"><table className="w-full min-w-[820px] text-left"><thead className="bg-slate-50/80"><tr>{['Product', 'Category', 'Price', 'Stock', 'Status', 'Action'].map((heading, index) => <th key={heading} scope="col" className={`px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 ${index === 5 ? 'text-right' : ''}`}>{heading}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{paginatedProducts.map(product => <tr key={product.id} className="transition-colors hover:bg-blue-50/30"><td className="whitespace-nowrap px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Package size={19}/></div><div><p className="text-sm font-semibold text-slate-800">{product.name}</p><p className="mt-0.5 text-xs text-slate-400">SKU: {product.sku}</p></div></div></td><td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{product.category}</td><td className="whitespace-nowrap px-5 py-4 text-sm font-semibold tabular-nums text-slate-800">{formatCurrency(product.price)}</td><td className="whitespace-nowrap px-5 py-4 text-sm tabular-nums text-slate-600">{product.stock} units</td><td className="whitespace-nowrap px-5 py-4"><StockBadge stock={product.stock}/></td><td className="whitespace-nowrap px-5 py-4 text-right"><button data-product-actions type="button" aria-label={`Actions for ${product.name}`} aria-expanded={menu?.id === product.id} onClick={e => toggleMenu(product.id, e.currentTarget)} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><MoreHorizontal size={20}/></button></td></tr>)}{paginatedProducts.length === 0 && <tr><td colSpan={6} className="px-6 py-14 text-center"><Package size={34} className="mx-auto text-slate-300"/><p className="mt-3 font-semibold text-slate-700">No products found</p><p className="mt-1 text-sm text-slate-400">Try changing your search or filters.</p><button type="button" onClick={resetFilters} className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700">Clear filters</button></td></tr>}</tbody></table></div>
    <div className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><p className="text-sm text-slate-500">Showing <strong className="text-slate-700">{filteredProducts.length ? start + 1 : 0}–{Math.min(start + PER_PAGE, filteredProducts.length)}</strong> of <strong className="text-slate-700">{filteredProducts.length}</strong> products</p><div className="flex flex-wrap items-center gap-1"><button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => { setCurrentPage(page - 1); setMenu(null) }} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={17}/></button>{Array.from({ length: totalPages }, (_, i) => i + 1).map(p => <button key={p} type="button" aria-label={`Page ${p}`} aria-current={p === page ? 'page' : undefined} onClick={() => { setCurrentPage(p); setMenu(null) }} className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold transition ${p === page ? 'bg-blue-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{p}</button>)}<button type="button" aria-label="Next page" disabled={page === totalPages} onClick={() => { setCurrentPage(page + 1); setMenu(null) }} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight size={17}/></button></div></div></section>
    {menu && activeMenuProduct && createPortal(<div ref={menuRef} style={{ position: 'fixed', top: menu.top, left: menu.left }} className="z-[65] w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"><button type="button" onClick={() => openEdit(activeMenuProduct)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"><Edit3 size={16}/>Edit Product</button><button type="button" onClick={() => { setDeletingProduct(activeMenuProduct); setMenu(null) }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"><Trash2 size={16}/>Delete Product</button></div>, document.body)}
    {isAddModalOpen && <Modal title="Add Product" subtitle="Add a new product to inventory." onClose={closeAdd}><form onSubmit={handleAdd} className="flex min-h-0 flex-col"><div className="overflow-y-auto px-5 py-5 sm:px-6"><ProductFields form={newProduct} onChange={setNewProduct} prefix="add"/>{formError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{formError}</p>}</div><div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6"><button type="button" onClick={closeAdd} className={secondaryButton}>Cancel</button><button type="submit" className={primaryButton}>Add Product</button></div></form></Modal>}
    {editingProduct && <Modal title="Edit Product" subtitle="Update product and inventory information." onClose={closeEdit}><form onSubmit={handleEdit} className="flex min-h-0 flex-col"><div className="overflow-y-auto px-5 py-5 sm:px-6"><ProductFields form={editForm} onChange={setEditForm} prefix="edit"/><p className="mt-3 text-sm text-slate-500">Current status: <strong className="text-slate-700">{editForm.stock !== '' && Number.isSafeInteger(Number(editForm.stock)) && Number(editForm.stock) >= 0 ? getStockStatus(Number(editForm.stock)) : 'Invalid stock'}</strong></p>{formError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{formError}</p>}</div><div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6"><button type="button" onClick={closeEdit} className={secondaryButton}>Cancel</button><button type="submit" className={primaryButton}>Save Changes</button></div></form></Modal>}
    {deletingProduct && <Modal title="Delete Product" subtitle="Confirm product removal." onClose={() => setDeletingProduct(null)}><div className="overflow-y-auto px-5 py-5 sm:px-6"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600"><Trash2 size={22}/></div><p className="mt-4 text-sm leading-6 text-slate-600">Are you sure you want to delete <strong className="text-slate-900">{deletingProduct.name}</strong>? This action cannot be undone in the current session.</p></div><div className="flex flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6"><button type="button" onClick={() => setDeletingProduct(null)} className={secondaryButton}>Cancel</button><button type="button" onClick={handleDelete} className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">Delete Product</button></div></Modal>}
  </div>
}
export default Products
