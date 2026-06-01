import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { useTranslation } from 'react-i18next'
import { PageContainer } from '../components/layout/PageContainer'
import { StatsGrid } from '../features/dashboard/components/StatsGrid'
import { ActivityFeed } from '../features/dashboard/components/ActivityFeed'
import { LiveMonitor } from '../features/dashboard/components/LiveMonitor'
import { useDashboardEvents } from '../features/dashboard/hooks/useDashboardEvents'

export const indexRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/',
  component: Dashboard,
})

function Dashboard() {
  const { t } = useTranslation()
  
  // Activate reactive simulation alerts
  useDashboardEvents()

  return (
    <PageContainer size="full" className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {t("common.welcome_back", { name: "Sarah" })}
            </h1>
            <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t("dashboard.subtitle", { count: 3 })}
            </p>
          </div>
        </div>

        {/* Stats Grid - Extracted Component */}
        <StatsGrid />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-2">
          
          {/* Recent Activity Sidebar - Extracted Component */}
          <ActivityFeed />

          {/* Live Visit Monitor - Extracted Component */}
          <LiveMonitor />

        </div>
      </div>
    </PageContainer>
  )
}
