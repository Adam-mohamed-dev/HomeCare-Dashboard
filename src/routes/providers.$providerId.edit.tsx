import { createRoute, useParams } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { CreateProviderProfile } from '../features/providers/components/CreateProviderProfile'

export const editProviderRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/providers/$providerId/edit',
  component: EditProviderPage,
})

function EditProviderPage() {
  const { providerId } = useParams({ from: editProviderRoute.id })
  return <CreateProviderProfile providerId={providerId} />
}
