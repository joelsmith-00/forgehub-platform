import { createFileRoute, notFound } from "@tanstack/react-router";
import { renderDashboardPage } from "@/components/dashboard/pages";
import { DASHBOARD_NAV } from "@/lib/dashboard-nav";
import type { RoleKey } from "@/lib/roles";

export const Route = createFileRoute("/dashboard/$role/$page")({
  beforeLoad: ({ params }) => {
    const role = params.role as RoleKey;
    const page = params.page;
    if (!DASHBOARD_NAV[role]) throw notFound();
    if (!DASHBOARD_NAV[role].some((n) => n.key === page)) throw notFound();
  },
  component: () => {
    const { role, page } = Route.useParams();
    return renderDashboardPage(role as RoleKey, page);
  },
});
