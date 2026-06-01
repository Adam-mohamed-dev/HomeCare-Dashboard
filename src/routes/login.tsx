import { createRoute } from '@tanstack/react-router'
import { authLayoutRoute } from './_auth'
import { LoginPage } from '../features/auth/components/LoginPage'

export const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/login',
  component: LoginPage,
})
