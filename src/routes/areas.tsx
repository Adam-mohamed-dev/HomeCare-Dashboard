import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { AreasView } from '../features/areas/components/AreasView'

export const areasRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/areas',
  component: AreasView,
})
