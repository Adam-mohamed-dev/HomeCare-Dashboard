import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { InsurancesView } from '../features/insurances/components/InsurancesView'

export const insurancesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/insurances',
  component: InsurancesView,
})
