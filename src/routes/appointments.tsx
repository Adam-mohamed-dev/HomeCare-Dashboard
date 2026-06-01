import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { AppointmentsView } from '../features/appointments/components/AppointmentsView'

export const Route = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/appointments',
  component: AppointmentsView,
})
