'use client'

import DashboardLayout from '@/components/dashboard-layout'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { DollarSign, TrendingUp } from 'lucide-react'

const costData = [
  { name: 'Sprint 1', cost: 45000 },
  { name: 'Sprint 2', cost: 52000 },
  { name: 'Sprint 3', cost: 48000 },
  { name: 'Sprint 4', cost: 55000 },
]

const hoursData = [
  { name: 'Week 1', logged: 180, billed: 165 },
  { name: 'Week 2', logged: 195, billed: 178 },
  { name: 'Week 3', logged: 188, billed: 172 },
  { name: 'Week 4', logged: 205, billed: 195 },
]

const allocationData = [
  { name: 'Backend', value: 35, color: 'var(--accent)' },
  { name: 'Frontend', value: 28, color: '#3b82f6' },
  { name: 'DevOps', value: 18, color: '#8b5cf6' },
  { name: 'QA', value: 12, color: '#f59e0b' },
  { name: 'Design', value: 7, color: '#ec4899' },
]

export default function FinanceManagerDashboard() {
  return (
    <DashboardLayout role="finance-manager" title="Finance Manager Dashboard">
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: 'Q4 Budget', value: '$450K', change: '78% utilized' },
          { label: 'Avg Cost/Sprint', value: '$50K', change: '+2.5% vs avg' },
          { label: 'Hours Logged', value: '768h', change: '+5h vs target' },
          { label: 'Billable Rate', value: '94%', change: '+3% vs last Q' },
        ].map((metric, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{metric.value}</p>
            <p className="mt-2 text-xs text-accent">{metric.change}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cost per Sprint */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Cost per Sprint</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="cost" fill="var(--accent)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hours Logged vs Billed */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Hours Logged vs Billed</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hoursData}>
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
              <Legend />
              <Line
                type="monotone"
                dataKey="logged"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={{ fill: 'var(--accent)' }}
                name="Hours Logged"
              />
              <Line
                type="monotone"
                dataKey="billed"
                stroke="var(--muted-foreground)"
                strokeWidth={2}
                dot={{ fill: 'var(--muted-foreground)' }}
                name="Hours Billed"
                opacity={0.6}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Budget Allocation */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Resource Allocation Pie Chart */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Resource Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
                formatter={(value) => `${value}%`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Efficiency Metrics */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Efficiency Metrics</h3>
          <div className="space-y-4">
            {[
              { label: 'Cost per Delivery', value: '$2,340', change: '-5% vs last quarter' },
              { label: 'Resource Utilization', value: '87%', change: '+3% vs target' },
              { label: 'Budget Variance', value: '-2%', change: 'Under budget' },
              { label: 'ROI (Productivity)', value: '142%', change: '+8% vs baseline' },
            ].map((metric, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-secondary/30 p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{metric.label}</p>
                  <p className="text-xs text-muted-foreground">{metric.change}</p>
                </div>
                <p className="text-xl font-bold text-accent">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-accent/5 to-accent/10 p-6">
        <div className="flex items-start gap-4">
          <DollarSign className="h-6 w-6 text-accent flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground">Budget Summary</h3>
            <p className="mt-2 text-muted-foreground">
              Q4 spending is tracking at 78% of budget with 2 sprints remaining. Current trajectory indicates final spend of
              $485K, which is 7.8% over budget due to increased DevOps requirements. Recommend reallocating $20K from design
              resources or requesting budget increase of $35K for completion.
            </p>
            <div className="mt-4 flex gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Remaining Budget</p>
                <p className="text-2xl font-bold text-foreground">$105K</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Projected Final</p>
                <p className="text-2xl font-bold text-accent">$485K</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
