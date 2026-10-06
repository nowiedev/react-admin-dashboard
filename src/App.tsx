import { useState } from 'react'

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'

import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Products from './pages/Products'
import Analytics from './pages/Analytics'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-64">
        <Header
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
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

            <Route
              path="*"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App