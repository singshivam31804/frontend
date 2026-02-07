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
import { Users, Send } from 'lucide-react'

const sprintData = [
  { name: 'Sprint 1', completed: 45, inProgress: 12, backlog: 8 },
  { name: 'Sprint 2', completed: 52, inProgress: 8, backlog: 5 },
  { name: 'Sprint 3', completed: 48, inProgress: 15, backlog: 10 },
  { name: 'Sprint 4', completed: 55, inProgress: 10, backlog: 3 },
]

const workloadData = [
  { name: 'Sarah Chen', tasks: 12, capacity: 15 },
  { name: 'Marcus Johnson', tasks: 10, capacity: 15 },
  { name: 'Emily Davis', tasks: 14, capacity: 15 },
  { name: 'Alex Rodriguez', tasks: 8, capacity: 15 },
]

const engineers = [
  { id: 1, name: 'Sarah Chen', tasks: 12, availability: 'High' },
  { id: 2, name: 'Marcus Johnson', tasks: 10, availability: 'Medium' },
  { id: 3, name: 'Emily Davis', tasks: 14, availability: 'Low' },
  { id: 4, name: 'Alex Rodriguez', tasks: 8, availability: 'High' },
]

const taskTypes = ['Backend', 'Frontend', 'Design', 'DevOps', 'QA']

export default function ProductManagerDashboard() {
  const [selectedTask, setSelectedTask] = useState('Backend')
  const [selectedEngineer, setSelectedEngineer] = useState('Sarah Chen')

  return (
    <DashboardLayout role="product-manager" title="Product Manager Dashboard">
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: 'Sprint Progress', value: '78%', change: 'On Track' },
          { label: 'Team Velocity', value: '52 pts', change: '+8 pts' },
          { label: 'Active Tasks', value: '44', change: '-3 from last sprint' },
          { label: 'Completion Rate', value: '91%', change: '+5%' },
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
        {/* Sprint Progress */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Sprint Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sprintData}>
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
              <Bar dataKey="completed" fill="var(--accent)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="inProgress" fill="var(--muted)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Workload Distribution */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Workload per Engineer</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workloadData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" stroke="var(--muted-foreground)" />
              <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="tasks" fill="var(--accent)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engineers Table */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 font-semibold text-foreground">Team Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-medium text-foreground">Engineer</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Assigned Tasks</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Availability</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {engineers.map((engineer) => (
                <tr key={engineer.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-4 py-3 text-foreground font-medium">{engineer.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{engineer.tasks} tasks</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        engineer.availability === 'High'
                          ? 'bg-green-100 text-green-700'
                          : engineer.availability === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {engineer.availability}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-accent font-medium">Active</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Assignment Assistant */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-6 font-semibold text-foreground">Task Assignment Assistant</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Task Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground">Task Type</label>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {taskTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Recommended Engineer */}
          <div>
            <label className="block text-sm font-medium text-foreground">Recommended Engineer</label>
            <div className="mt-2 rounded-lg border border-border bg-background px-4 py-2.5">
              <p className="font-medium text-foreground">{selectedEngineer}</p>
              <p className="text-xs text-muted-foreground">Based on skills & availability</p>
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="mt-6 rounded-lg bg-accent/5 border border-accent/20 p-4">
          <p className="text-sm text-foreground">
            <span className="font-semibold">AI Recommendation:</span> Assign {selectedTask} task to {selectedEngineer}. They have the
            highest capacity and relevant skills for this task type. Estimated completion time: 3-4 days.
          </p>
        </div>

        {/* Assign Button */}
        <button className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-2.5 font-semibold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/25 w-full">
          <Send className="h-4 w-4" />
          Assign Task
        </button>
      </div>
    </DashboardLayout>
  )
}
