import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ToastProvider } from '../components/ui/toast-custom'

export const rootRoute = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  )
}
