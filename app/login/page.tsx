'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

type Role = 'ceo' | 'product-manager' | 'finance-manager' | 'engineer'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('engineer')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to dashboard based on role
    const dashboardMap: Record<Role, string> = {
      ceo: '/dashboard/ceo',
      'product-manager': '/dashboard/product-manager',
      'finance-manager': '/dashboard/finance-manager',
      engineer: '/dashboard/engineer',
    }
    router.push(dashboardMap[role])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <div className="flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-bold text-accent-foreground">
            ED
          </div>
          <span className="text-lg font-semibold text-foreground">Enterprise Delivery</span>
        </Link>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-foreground">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignUp ? 'Sign up to access your dashboard' : 'Sign in to your account'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-foreground">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                <option value="ceo">CEO</option>
                <option value="product-manager">Product Manager</option>
                <option value="finance-manager">Finance Manager</option>
                <option value="engineer">Engineer</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-accent px-4 py-2.5 font-semibold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/25"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
              <ArrowRight className="ml-2 inline h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            </span>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-accent transition-colors hover:text-accent/80"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-center text-xs text-muted-foreground">
              Demo credentials: any email, any password. Select your role to view the appropriate dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
