'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, LogOut, Home } from 'lucide-react'

type Role = 'ceo' | 'product-manager' | 'finance-manager' | 'engineer'

interface DashboardLayoutProps {
  children: React.ReactNode
  role: Role
  title: string
}

const dashboardLinks: Record<Role, { name: string; href: string; label: string }[]> = {
  ceo: [
    { name: 'Overview', href: '/dashboard/ceo', label: 'ceo' },
  ],
  'product-manager': [
    { name: 'Overview', href: '/dashboard/product-manager', label: 'product-manager' },
  ],
  'finance-manager': [
    { name: 'Overview', href: '/dashboard/finance-manager', label: 'finance-manager' },
  ],
  engineer: [
    { name: 'Overview', href: '/dashboard/engineer', label: 'engineer' },
  ],
}

export default function DashboardLayout({ children, role, title }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    router.push('/login')
  }

  const getRoleLabel = (role: Role) => {
    const labels: Record<Role, string> = {
      ceo: 'CEO',
      'product-manager': 'Product Manager',
      'finance-manager': 'Finance Manager',
      engineer: 'Engineer',
    }
    return labels[role]
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transition-all duration-300 md:static md:z-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="border-b border-border p-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-bold text-accent-foreground">
                ED
              </div>
              <span className="text-lg font-semibold text-foreground">Enterprise Delivery</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Main</p>
              <div className="mt-3 space-y-2">
                <Link
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">Dashboard</p>
              <div className="mt-3 space-y-2">
                {dashboardLinks[role].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? 'bg-accent/10 text-accent font-semibold'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* User Section */}
          <div className="border-t border-border p-6">
            <div className="mb-4 rounded-lg bg-secondary p-4">
              <p className="text-xs font-medium text-muted-foreground">Current Role</p>
              <p className="mt-1 font-semibold text-foreground">{getRoleLabel(role)}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="space-y-6">{children}</div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
