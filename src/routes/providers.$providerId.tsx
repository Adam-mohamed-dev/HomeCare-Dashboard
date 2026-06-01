import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { ProviderPortfolio } from '../features/providers/components/ProviderPortfolio'

export const Route = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/providers/$providerId',
  component: ProviderPortfolio,
})
