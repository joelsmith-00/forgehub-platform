import { createFileRoute, notFound } from "@tanstack/react-router";
import { renderDashboardPage } from "@/components/dashboard/pages";
import { DASHBOARD_NAV } from "@/lib/dashboard-nav";
import type { RoleKey } from "@/lib/roles";

export const Route = createFileRoute("/dashboard/$role/page")({
  parseParams: (p) => {
    const role = p.role as RoleKey;
    const page = p.page as string;
    if (!DASHBOARD_NAV[role]) throw notFound();
    if (!DASHBOARD_NAV[role].some((n) => n.key === page)) throw notFound();
    return { role, page };
  },
  component: () => {
    const { role, page } = Route.useParams();
    return renderDashboardPage(role as RoleKey, page);
  },
});
