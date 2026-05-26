import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { AreasView } from '../features/areas/components/AreasView'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/areas',
  component: AreasView,
})
