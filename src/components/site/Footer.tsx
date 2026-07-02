import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.asset.json";

const columns = [
  {
    title: "Quick Links",
    items: ["Home", "About Us", "Features", "Events", "Contact Us"],
  },
  {
    title: "For Students",
    items: ["Dashboard", "Attendance", "Marks", "Assignments", "Leaderboard"],
  },
  {
    title: "For Staff",
    items: ["Dashboard", "Student Management", "Attendance", "Reports", "Analytics"],
  },
  {
    title: "For Alumni",
    items: ["Alumni Network", "Mentorship", "Events", "Discussions", "Alumni Directory"],
  },
  {
    title: "Support",
    items: ["Help Center", "Privacy Policy", "Terms & Conditions", "FAQ", "Contact Support"],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <img src={forgeLogo.url} alt="FORGE" className="h-10 w-auto" />
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Igniting innovation, empowering ventures, and building the future, together.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <h4 className="mb-4 text-sm font-bold text-white">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.items.map((it) => (
                  <li key={it}>
                    <a href="#" className="text-sm text-white/60 transition-colors hover:text-primary">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © 2026 FORGE Innovation & Ventures. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
