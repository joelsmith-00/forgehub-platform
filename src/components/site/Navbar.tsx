import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.asset.json";

const links = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Features", to: "/features" },
  { label: "Events", to: "/events" },
  { label: "Contact Us", to: "/contact" },
] as const;

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={forgeLogo.url}
            alt="FORGE Innovation & Ventures"
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              className="text-sm font-medium text-white/85 transition-colors hover:text-primary [&.active]:text-primary [&.active]:relative [&.active]:after:absolute [&.active]:after:-bottom-2 [&.active]:after:left-1/2 [&.active]:after:h-0.5 [&.active]:after:w-6 [&.active]:after:-translate-x-1/2 [&.active]:after:bg-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
        >
          Explore Platform <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
