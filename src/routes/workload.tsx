import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./__root"
import { WorkloadView } from "../features/workload/components/WorkloadView"

export const workloadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/workload",
  component: WorkloadView,
})
