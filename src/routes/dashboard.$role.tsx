import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { ROLES, type RoleKey } from "@/lib/roles";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const Route = createFileRoute("/dashboard/$role")({
  parseParams: (p) => {
    const role = p.role as RoleKey;
    if (!(role in ROLES)) throw notFound();
    return { role };
  },
  head: ({ params }) => ({
    meta: [
      { title: `${ROLES[params.role as RoleKey].label} Dashboard — FORGE` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Layout,
});

function Layout() {
  const { role } = Route.useParams();
  return (
    <DashboardShell role={role as RoleKey}>
      <Outlet />
    </DashboardShell>
  );
}
