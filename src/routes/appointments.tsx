import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { AppointmentsView } from '../features/appointments/components/AppointmentsView'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/appointments',
  component: AppointmentsView,
})
