import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { CaseManagement } from '../features/cases/components/CaseManagement'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cases',
  component: CaseManagement,
})
