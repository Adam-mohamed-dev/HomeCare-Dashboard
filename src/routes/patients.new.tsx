import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { CreatePatientChart } from '../features/patients/components/CreatePatientChart'

export const createPatientRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/patients/new',
  component: () => <CreatePatientChart />,
})
