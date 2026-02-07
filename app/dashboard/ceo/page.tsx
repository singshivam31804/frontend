'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { AlertCircle, TrendingUp } from 'lucide-react'

const deliveryData = [
  { name: 'Sprint 1', value: 85 },
  { name: 'Sprint 2', value: 78 },
  { name: 'Sprint 3', value: 92 },
  { name: 'Sprint 4', value: 88 },
  { name: 'Sprint 5', value: 95 },
]

const trendData = [
  { name: 'Week 1', productivity: 65, velocity: 45 },
  { name: 'Week 2', productivity: 72, velocity: 52 },
  { name: 'Week 3', productivity: 68, velocity: 48 },
  { name: 'Week 4', productivity: 80, velocity: 61 },
  { name: 'Week 5', productivity: 85, velocity: 68 },
]

const alerts = [
  { id: 1, title: 'Q4 Delivery at Risk', severity: 'high', description: 'Three critical features behind schedule' },
  { id: 2, title: 'Team Capacity Alert', severity: 'medium', description: 'Engineering capacity at 95%' },
]

export default function CEODashboard() {
  return (
    <DashboardLayout role="ceo" title="CEO Dashboard">
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: 'On-Time Delivery', value: '92%', change: '+5%' },
          { label: 'Team Productivity', value: '85%', change: '+12%' },
          { label: 'Active Projects', value: '12', change: '0%' },
          { label: 'Risk Level', value: 'Medium', change: '-2%' },
        ].map((metric, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{metric.value}</p>
            <p className="mt-2 text-xs text-accent">{metric.change} vs last month</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Delivery Health */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Delivery Health Score</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="value" fill="var(--accent)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Productivity Trend */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Productivity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="productivity"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={{ fill: 'var(--accent)' }}
              />
              <Line
                type="monotone"
                dataKey="velocity"
                stroke="var(--muted-foreground)"
                strokeWidth={2}
                dot={{ fill: 'var(--muted-foreground)' }}
                opacity={0.6}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Alerts */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground">Risk Alerts</h3>
        <div className="mt-4 space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-4 rounded-lg border p-4 ${
                alert.severity === 'high'
                  ? 'border-red-200 bg-red-50'
                  : 'border-yellow-200 bg-yellow-50'
              }`}
            >
              <AlertCircle
                className={`h-5 w-5 flex-shrink-0 ${
                  alert.severity === 'high' ? 'text-red-500' : 'text-yellow-500'
                }`}
              />
              <div>
                <p
                  className={`font-medium ${
                    alert.severity === 'high' ? 'text-red-900' : 'text-yellow-900'
                  }`}
                >
                  {alert.title}
                </p>
                <p
                  className={`text-sm ${
                    alert.severity === 'high' ? 'text-red-700' : 'text-yellow-700'
                  }`}
                >
                  {alert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Summary */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-accent/5 to-accent/10 p-6">
        <div className="flex items-start gap-4">
          <TrendingUp className="h-6 w-6 text-accent flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground">AI Executive Summary</h3>
            <p className="mt-2 text-muted-foreground">
              Overall delivery health is strong with 92% on-time delivery. However, capacity constraints in the backend team
              may impact Q4 timelines. Consider resource reallocation or timeline extension for the Identity Management feature.
              Productivity has improved 12% month-over-month, indicating effective team optimization.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
