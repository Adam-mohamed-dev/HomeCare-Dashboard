import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { PatientPortfolio } from '../features/patients/components/PatientPortfolio'

export const Route = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/patients/$patientId',
  component: PatientPortfolio,
})
