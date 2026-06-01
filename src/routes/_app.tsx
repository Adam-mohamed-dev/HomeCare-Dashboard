import { createRoute, Outlet } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { TopBar } from '../components/layout/TopBar'
import { Sidebar } from '../components/layout/Sidebar'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  component: AppLayout,
})

function AppLayout() {
  const { i18n } = useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-background flex flex-col font-sans overflow-hidden" dir={i18n.dir()}>
      <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 relative overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto bg-slate-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
