'use client'

import DashboardLayout from '@/components/dashboard-layout'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { CheckCircle2, Clock, AlertCircle, Code } from 'lucide-react'

const productivityData = [
  { name: 'Mon', tasks: 4, completed: 3 },
  { name: 'Tue', tasks: 5, completed: 5 },
  { name: 'Wed', tasks: 3, completed: 3 },
  { name: 'Thu', tasks: 6, completed: 4 },
  { name: 'Fri', tasks: 4, completed: 4 },
]

const assignedTasks = [
  {
    id: 1,
    title: 'Implement Authentication Service',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-02-15',
    estimate: '8h',
    logged: '4h',
  },
  {
    id: 2,
    title: 'Code Review: Payment Module',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2024-02-12',
    estimate: '3h',
    logged: '1.5h',
  },
  {
    id: 3,
    title: 'Fix Database Connection Pool',
    status: 'Completed',
    priority: 'High',
    dueDate: '2024-02-08',
    estimate: '4h',
    logged: '3.5h',
  },
  {
    id: 4,
    title: 'Write Unit Tests for Validation',
    status: 'Blocked',
    priority: 'Medium',
    dueDate: '2024-02-18',
    estimate: '6h',
    logged: '0h',
  },
]

export default function EngineerDashboard() {
  return (
    <DashboardLayout role="engineer" title="Engineer Dashboard">
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-foreground">12</p>
          <p className="mt-2 text-xs text-accent">This sprint</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <p className="text-sm font-medium text-muted-foreground">Hours Logged</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-foreground">38h</p>
          <p className="mt-2 text-xs text-accent">Out of 40h target</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-purple-500" />
            <p className="text-sm font-medium text-muted-foreground">Active Tasks</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-foreground">2</p>
          <p className="mt-2 text-xs text-accent">2 more blocked</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <p className="text-sm font-medium text-muted-foreground">Blockers</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-foreground">1</p>
          <p className="mt-2 text-xs text-accent">Needs attention</p>
        </div>
      </div>

      {/* Productivity Chart */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground">Weekly Productivity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productivityData}>
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
            <Bar dataKey="tasks" fill="var(--muted)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="completed" fill="var(--accent)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Assigned Tasks */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 font-semibold text-foreground">Assigned Tasks</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-medium text-foreground">Task</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Priority</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Due Date</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Time</th>
              </tr>
            </thead>
            <tbody>
              {assignedTasks.map((task) => (
                <tr key={task.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-4 py-3 font-medium text-foreground">{task.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        task.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : task.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                        task.priority === 'High'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{task.dueDate}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {task.logged}/{task.estimate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Time Tracking Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Sprint Time */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Current Sprint Time</h3>
          <div className="space-y-4">
            {[
              { label: 'Target Hours', value: '40h', color: 'bg-gray-200' },
              { label: 'Hours Logged', value: '38h', color: 'bg-accent' },
              { label: 'Remaining', value: '2h', color: 'bg-secondary' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-foreground">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={`h-full ${item.color}`}
                    style={{
                      width: i === 0 ? '100%' : i === 1 ? '95%' : '5%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Distribution */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Task Distribution</h3>
          <div className="space-y-3">
            {[
              { label: 'Completed', value: 12, color: 'bg-green-500' },
              { label: 'In Progress', value: 2, color: 'bg-blue-500' },
              { label: 'Blocked', value: 1, color: 'bg-red-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${item.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                </div>
                <p className="text-sm font-bold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 font-semibold text-foreground">Quick Actions</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <button className="rounded-lg border border-border bg-secondary px-4 py-2.5 font-medium text-foreground transition-colors hover:bg-secondary/80">
            Log Time
          </button>
          <button className="rounded-lg border border-border bg-secondary px-4 py-2.5 font-medium text-foreground transition-colors hover:bg-secondary/80">
            Update Task
          </button>
          <button className="rounded-lg bg-accent px-4 py-2.5 font-medium text-accent-foreground transition-colors hover:shadow-lg hover:shadow-accent/25">
            Report Blocker
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
