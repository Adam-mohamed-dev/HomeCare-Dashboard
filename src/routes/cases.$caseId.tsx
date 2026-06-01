import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { CaseMatches } from '../features/cases/components/CaseMatches'

export const Route = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/cases/$caseId',
  component: CaseMatches,
})
