import { createRoute } from "@tanstack/react-router"
import { appLayoutRoute } from "./_app"
import { WorkloadView } from "../features/workload/components/WorkloadView"

export const workloadRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/workload",
  component: WorkloadView,
})
