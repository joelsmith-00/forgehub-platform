import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — FORGE" }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <section className="relative bg-ink text-ink-foreground">
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-40">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Get in Touch</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-white/70">We're here to help you every step of the way.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-20 sm:grid-cols-3">
        {[
          { icon: Mail, t: "Email", d: "hello@forge.edu" },
          { icon: Phone, t: "Phone", d: "+1 (555) 000-0000" },
          { icon: MapPin, t: "Address", d: "FORGE Campus, Innovation Way" },
        ].map((c) => (
          <div key={c.t} className="rounded-xl bg-card p-6 shadow-card">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
              <c.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 text-sm font-bold">{c.t}</div>
            <div className="mt-1 text-sm text-muted-foreground">{c.d}</div>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  ),
});
