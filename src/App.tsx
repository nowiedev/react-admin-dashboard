import { Navigate, Route, Routes } from 'react-router-dom'

import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'

import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Products from './pages/Products'
import Analytics from './pages/Analytics'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 p-8">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/users"
              element={<Users />}
            />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App