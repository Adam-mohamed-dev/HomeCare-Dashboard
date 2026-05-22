import { rootRoute } from './__root'
import { indexRoute } from './index'
import { patientsRoute } from './patients'
import { createPatientRoute } from './patients.new'
import { providersRoute } from './providers'
import { providersNewRoute } from './providers.new'
import { Route as providersPortfolioRoute } from './providers.$providerId'
import { Route as casesRoute } from './cases'
import { Route as caseMatchesRoute } from './cases.$caseId'
import { Route as messagesRoute } from './messages'
import { Route as appointmentsRoute } from './appointments'

export const routeTree = rootRoute.addChildren([
  indexRoute,
  patientsRoute,
  createPatientRoute,
  providersRoute,
  providersNewRoute,
  providersPortfolioRoute,
  casesRoute,
  caseMatchesRoute,
  messagesRoute,
  appointmentsRoute,
])
