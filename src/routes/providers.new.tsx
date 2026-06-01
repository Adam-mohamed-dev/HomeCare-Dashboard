import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { CreateProviderProfile } from '../features/providers/components/CreateProviderProfile'

export const providersNewRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/providers/new',
  component: () => <CreateProviderProfile />,
})
