import { rootRoute } from './__root'
import { authLayoutRoute } from './_auth'
import { loginRoute } from './login'
import { appLayoutRoute } from './_app'
import { indexRoute } from './index'
import { patientsRoute } from './patients'
import { createPatientRoute } from './patients.new'
import { Route as patientPortfolioRoute } from './patients.$patientId'
import { providersRoute } from './providers'
import { providersNewRoute } from './providers.new'
import { Route as providersPortfolioRoute } from './providers.$providerId'
import { Route as casesRoute } from './cases'
import { Route as caseMatchesRoute } from './cases.$caseId'
import { Route as messagesRoute } from './messages'
import { Route as appointmentsRoute } from './appointments'
import { areasRoute } from './areas'
import { workloadRoute } from './workload'

export const routeTree = rootRoute.addChildren([
  authLayoutRoute.addChildren([loginRoute]),
  appLayoutRoute.addChildren([
    indexRoute,
    patientsRoute,
    createPatientRoute,
    patientPortfolioRoute,
    providersRoute,
    providersNewRoute,
    providersPortfolioRoute,
    casesRoute,
    caseMatchesRoute,
    messagesRoute,
    appointmentsRoute,
    areasRoute,
    workloadRoute,
  ]),
])
