import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { ProviderManagement } from '../features/providers/components/ProviderManagement'

export const providersRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/providers',
  component: () => <ProviderManagement />,
})
