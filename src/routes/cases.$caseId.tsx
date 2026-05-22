import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { CaseMatches } from '../features/cases/components/CaseMatches'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cases/$caseId',
  component: CaseMatches,
})
