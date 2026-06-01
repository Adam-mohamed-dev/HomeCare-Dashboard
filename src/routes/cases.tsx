import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { CaseManagement } from '../features/cases/components/CaseManagement'

export const Route = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/cases',
  component: CaseManagement,
})
