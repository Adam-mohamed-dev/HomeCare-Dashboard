import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { ProviderManagement } from '../features/providers/components/ProviderManagement'

export const providersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/providers',
  component: () => <ProviderManagement />,
})
