import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { MessagesView } from '../features/messages/components/MessagesView'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/messages',
  component: MessagesView,
})
