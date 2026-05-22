import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { CreateProviderProfile } from '../features/providers/components/CreateProviderProfile'

export const providersNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/providers/new',
  component: () => <CreateProviderProfile />,
})
