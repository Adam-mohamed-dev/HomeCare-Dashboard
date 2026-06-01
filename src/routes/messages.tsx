import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { MessagesView } from '../features/messages/components/MessagesView'

export const Route = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/messages',
  component: MessagesView,
})
