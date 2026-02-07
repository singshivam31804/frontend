'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, BarChart3, Brain, Users, Zap } from 'lucide-react'

export default function LandingPage() {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    document.querySelectorAll('[data-observe]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-bold text-accent-foreground">
              ED
            </div>
            <span className="text-lg font-semibold text-foreground">Enterprise Delivery</span>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2 font-medium text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/25"
          >
            Login
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        data-observe
        className={`mx-auto max-w-7xl px-6 py-20 text-center transition-all duration-700 ${
          visibleSections['hero'] ? 'fade-in-up opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="text-balance text-5xl font-bold text-foreground md:text-6xl">
          Transform Engineering Activity into Business Insights
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          AI-powered analytics that help your organization understand, optimize, and accelerate delivery performance
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3 font-semibold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/25"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-8 py-3 font-semibold text-foreground transition-all hover:bg-secondary">
            View Demo
          </button>
        </div>
      </section>

      {/* Problem Section */}
      <section
        id="problem"
        data-observe
        className={`mx-auto max-w-7xl px-6 py-20 transition-all duration-700 ${
          visibleSections['problem'] ? 'fade-in-up opacity-100' : 'opacity-0'
        }`}
      >
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">The Challenge</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Organizations collect vast amounts of engineering data but struggle to extract actionable insights. Teams operate in silos, stakeholders lack visibility, and critical bottlenecks remain invisible.
            </p>
            <ul className="mt-6 space-y-3">
              {['Limited visibility into team productivity', 'Disconnected metrics and analytics', 'Slow decision-making processes'].map(
                (item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-background p-8">
            <div className="space-y-4">
              <div className="h-32 rounded-lg bg-border/50" />
              <div className="h-20 rounded-lg bg-border/50" />
              <div className="h-20 rounded-lg bg-border/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        data-observe
        className={`mx-auto max-w-7xl px-6 py-20 transition-all duration-700 ${
          visibleSections['features'] ? 'fade-in-up opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">Powerful Features</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          Comprehensive tools built for modern engineering teams
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Users,
              title: 'Role-Based Dashboards',
              description: 'Customized views for executives, managers, and engineers',
            },
            {
              icon: BarChart3,
              title: 'Delivery Health Monitoring',
              description: 'Real-time tracking of project health and milestones',
            },
            {
              icon: Brain,
              title: 'AI-Generated Insights',
              description: 'Intelligent recommendations powered by machine learning',
            },
            {
              icon: Zap,
              title: 'Task Assignment Assistant',
              description: 'Smart recommendations for optimal team allocation',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`fade-in-up rounded-xl border border-border bg-card p-6 transition-all duration-700 hover:shadow-lg hover:border-accent stagger-delay-${i + 1} ${
                visibleSections['features'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <feature.icon className="h-8 w-8 text-accent" />
              <h3 className="mt-4 font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        data-observe
        className={`mx-auto max-w-7xl px-6 py-20 transition-all duration-700 ${
          visibleSections['how-it-works'] ? 'fade-in-up opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">How It Works</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {[
            { step: '1', title: 'Collect Activity Data', description: 'Integrate with your engineering tools' },
            { step: '2', title: 'Analyze Metrics', description: 'AI processes and normalizes your data' },
            { step: '3', title: 'Generate Insights', description: 'Get actionable recommendations' },
            { step: '4', title: 'Visualize Dashboards', description: 'View comprehensive analytics' },
          ].map((item, i) => (
            <div
              key={i}
              className={`fade-in-up text-center transition-all duration-700 stagger-delay-${i + 1} ${
                visibleSections['how-it-works'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">
                {item.step}
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        data-observe
        className={`mx-auto max-w-4xl px-6 py-20 text-center transition-all duration-700 ${
          visibleSections['cta'] ? 'fade-in-up opacity-100' : 'opacity-0'
        }`}
      >
        <div className="rounded-2xl border border-border bg-card p-12">
          <h2 className="text-3xl font-bold text-foreground">Ready to Transform Your Delivery?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join teams that are already using our platform to drive better engineering outcomes
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 font-semibold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/25"
          >
            Sign Up for Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Enterprise Delivery Intelligence. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
