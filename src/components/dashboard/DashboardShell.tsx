import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Menu, X, Search, Bell, ChevronDown } from "lucide-react";

import { ROLES, type RoleKey } from "@/lib/roles";
import { DASHBOARD_NAV, LOGOUT_ITEM } from "@/lib/dashboard-nav";
import forgeLogo from "@/assets/forge-logo.asset.json";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/lib/auth";

const THEME =
  "[--dsh-bg:#000000] [--dsh-side:#414042] [--dsh-card:#58595b] [--dsh-primary:#f15a22] [--dsh-secondary:#f58220] [--dsh-gold:#fcaf17]";

export function DashboardShell({ role, children }: { role: RoleKey; children: ReactNode }) {
  const cfg = ROLES[role];
  const nav = DASHBOARD_NAV[role];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = useAuth();

  useEffect(() => {
    if (user === null) {
      // no session — send to role login
      navigate({ to: "/login/$role", params: { role } });
    } else if (user && user.role !== role) {
      navigate({ to: "/dashboard/$role", params: { role: user.role } });
    }
  }, [user, role, navigate]);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login/$role", params: { role } });
  };

  const activeKey = (() => {
    const base = `/dashboard/${role}`;
    if (pathname === base || pathname === base + "/") return "";
    const tail = pathname.slice(base.length + 1);
    return tail.split("/")[0];
  })();

  return (
    <div className={`${THEME} min-h-screen bg-[var(--dsh-bg)] text-white`}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-[var(--dsh-side)] transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <img src={forgeLogo.url} alt="FORGE" className="h-8 w-auto" />
          </Link>
          <button className="lg:hidden text-white/70" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
            <div className={`grid h-10 w-10 place-items-center rounded-md bg-gradient-to-br ${cfg.accent} text-white`}>
              <cfg.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{cfg.label} Portal</div>
              <div className="truncate text-[11px] text-white/60">{cfg.tagline}</div>
            </div>
          </div>
        </div>
        <nav className="px-3 pb-24 space-y-1 overflow-y-auto max-h-[calc(100vh-10rem)]">
          {nav.map((item) => {
            const isActive = activeKey === item.key;
            const to = item.key
              ? "/dashboard/$role/$page"
              : "/dashboard/$role";
            const params = item.key
              ? { role, page: item.key }
              : { role };
            return (
              <Link
                key={item.key || "home"}
                to={to}
                params={params}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--dsh-primary)] text-white shadow-glow"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white"
          >
            <LOGOUT_ITEM.icon className="h-4 w-4" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-white/10 bg-[var(--dsh-bg)]/95 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-white" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 rounded-md bg-white/5 px-3 py-2">
              <Search className="h-4 w-4 text-white/50" />
              <input
                placeholder="Search…"
                className="w-40 bg-transparent text-sm outline-none placeholder:text-white/40 md:w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-md bg-white/5 p-2 hover:bg-white/10">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[var(--dsh-primary)]" />
            </button>
            <div className="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1.5">
              <div className={`grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br ${cfg.accent} text-[11px] font-bold`}>
                {(user?.name ?? cfg.label)[0]}
              </div>
              <div className="hidden text-left sm:block">
                <div className="text-xs font-semibold leading-tight">{user?.name ?? `Demo ${cfg.label}`}</div>
                <div className="text-[10px] text-white/50 leading-tight font-mono">{user?.forgeId ?? `${cfg.label.toLowerCase()}@forge.edu`}</div>
              </div>
              <ChevronDown className="h-3 w-3 text-white/50" />
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

/* ============ Reusable atoms ============ */

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  accent = "primary",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: string;
  accent?: "primary" | "secondary" | "gold" | "white";
}) {
  const bg =
    accent === "gold"
      ? "bg-[var(--dsh-gold)]/15 text-[var(--dsh-gold)]"
      : accent === "secondary"
        ? "bg-[var(--dsh-secondary)]/15 text-[var(--dsh-secondary)]"
        : accent === "white"
          ? "bg-white/10 text-white"
          : "bg-[var(--dsh-primary)]/15 text-[var(--dsh-primary)]";
  return (
    <div className="rounded-xl bg-[var(--dsh-card)] p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
          <div className="mt-2 text-2xl font-black">{value}</div>
          {trend && <div className="mt-1 text-[11px] text-white/50">{trend}</div>}
        </div>
        <div className={`grid h-10 w-10 place-items-center rounded-lg ${bg}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export function Panel({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-xl bg-[var(--dsh-card)] p-5 shadow-card">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-white/60">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-white/60">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function TableShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export function Th({ children }: { children: ReactNode }) {
  return (
    <th className="border-b border-white/10 bg-white/5 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-white/70">
      {children}
    </th>
  );
}
export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`border-b border-white/5 px-4 py-3 ${className}`}>{children}</td>;
}

export function Chip({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "success" | "warn" | "danger" | "info";
}) {
  const map: Record<string, string> = {
    default: "bg-white/10 text-white/80",
    success: "bg-emerald-500/15 text-emerald-300",
    warn: "bg-[var(--dsh-gold)]/20 text-[var(--dsh-gold)]",
    danger: "bg-red-500/20 text-red-300",
    info: "bg-[var(--dsh-primary)]/20 text-[var(--dsh-primary)]",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${map[tone]}`}>
      {children}
    </span>
  );
}
