import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { ProviderPortfolio } from '../features/providers/components/ProviderPortfolio'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/providers/$providerId',
  component: ProviderPortfolio,
})
