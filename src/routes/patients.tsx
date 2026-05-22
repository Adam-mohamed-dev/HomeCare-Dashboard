import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { PatientManagement } from '../features/patients/components/PatientManagement'

export const patientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/patients',
  component: () => <PatientManagement />,
})
