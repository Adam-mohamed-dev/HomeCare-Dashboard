import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { CreatePatientChart } from '../features/patients/components/CreatePatientChart'

export const createPatientRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/patients/new',
  component: () => <CreatePatientChart />,
})
