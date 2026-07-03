import { createFileRoute } from "@tanstack/react-router";
import { renderDashboardPage } from "@/components/dashboard/pages";
import type { RoleKey } from "@/lib/roles";

export const Route = createFileRoute("/dashboard/$role/")({
  component: () => {
    const { role } = Route.useParams();
    return renderDashboardPage(role as RoleKey, "");
  },
});
