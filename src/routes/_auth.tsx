import { createRoute, Outlet } from '@tanstack/react-router'
import { rootRoute } from './__root'

export const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: () => <Outlet />,
})
