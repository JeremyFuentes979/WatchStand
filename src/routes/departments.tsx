import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Lock, Users, Building, CheckCircle, HeartHandshake, Phone, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/departments")({
  component: Departments,
});

const features = [
  "Full wellness toolkit — 6 tools for breathing, grounding, decompression, sleep, reframing, and tactical reset",
  "Crisis hotline directory with 24/7 national and peer-support resources",
  "Anonymous mood check-ins with session history",
  "Searchable resources directory",
  "Private-link deployment for your agency — no app store, no accounts",
  "Everything runs on-device — zero data transmission",
];

function Departments() {
  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Hero */}
      <div className="px-5 pt-10 pb-8 text-center" style={{ background: "linear-gradient(180deg, rgba(217,142,59,0.08) 0%, rgba(15,22,32,0) 100%)" }}>
        <div className="w-14 h-14 rounded-2xl bg-[var(--amber)]/10 flex items-center justify-center mx-auto mb-4">
          <Building size={28} className="text-[var(--amber)]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          The Dark Guardian <span className="text-[var(--amber)]">for Your Agency</span>
        </h1>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
          A wellness resource your people will actually use — because it asks nothing of them. No login. No data collection. No cost.
        </p>
      </div>

      {/* Free for your agency */}
      <div className="px-5 py-6">
        <div className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg, rgba(217,142,59,0.08), rgba(79,140,130,0.04))", border: "1px solid rgba(217,142,59,0.2)" }}>
          <p className="text-xs font-semibold text-[var(--teal)] uppercase tracking-wider mb-2">No cost · No catch</p>
          <h2 className="text-2xl font-bold mb-2">Free for your agency</h2>
          <p className="text-sm text-[var(--muted)] max-w-sm mx-auto leading-relaxed">
            The Dark Guardian is completely free for first responder agencies. No licensing fees, no per-seat charges, no hidden costs. We're building this to support the people who show up — not to monetize them.
          </p>
        </div>
      </div>

      {/* The Problem */}
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold mb-1">Built for the culture</h2>
        <p className="text-xs text-[var(--muted)] mb-4">First responder mental health is a crisis of trust.</p>
        <div className="card rounded-2xl p-5 text-sm leading-relaxed space-y-3">
          <p>Most wellness programs fail because they ask officers to trust a system that logs their data, tracks their usage, or requires an account.</p>
          <p>First responders are trained to be hyper-vigilant about anything that could be used against them. A wellness app that collects data — even "anonymous" data — will not get adoption.</p>
          <p className="font-semibold text-[var(--amber)]">The Dark Guardian is built differently. Nothing leaves the device. No accounts. No data. Zero trust required.</p>
        </div>
      </div>

      {/* What's included */}
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold mb-1">Everything included</h2>
        <p className="text-xs text-[var(--muted)] mb-4">No tiers, no upsells. Every feature is available to every agency.</p>
        <div className="flex flex-col gap-2">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-2.5">
              <CheckCircle size={16} className="text-[var(--teal)] shrink-0 mt-0.5" />
              <p className="text-sm">{f}</p>
            </div>
          ))}
        </div>
      </div>

      {/* For CISM Teams */}
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold mb-1">For CISM teams</h2>
        <p className="text-xs text-[var(--muted)] mb-4">A tool you can confidently recommend to your department.</p>
        <div className="card rounded-2xl p-5 text-sm leading-relaxed space-y-3">
          <p>Critical Incident Stress Management teams need resources they can trust — and that their people will actually use.</p>
          <p>The Dark Guardian is designed to be that resource:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <HeartHandshake size={16} className="text-[var(--amber)] shrink-0 mt-0.5" />
              <span><strong>Anonymous by design</strong> — No names, no accounts, no logs. Officers don't have to trust a system; they just use it.</span>
            </li>
            <li className="flex items-start gap-2">
              <HeartHandshake size={16} className="text-[var(--amber)] shrink-0 mt-0.5" />
              <span><strong>Deploy in minutes</strong> — Share a private link with your department. No installation, no training, no IT approval needed.</span>
            </li>
            <li className="flex items-start gap-2">
              <HeartHandshake size={16} className="text-[var(--amber)] shrink-0 mt-0.5" />
              <span><strong>Always available</strong> — Crisis hotlines, grounding tools, and decompression protocols are a tap away, 24/7.</span>
            </li>
            <li className="flex items-start gap-2">
              <HeartHandshake size={16} className="text-[var(--amber)] shrink-0 mt-0.5" />
              <span><strong>Privacy guaranteed</strong> — No data collection means no liability for your department, no risk for your people.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* How it works */}
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold mb-4">How to deploy</h2>
        <div className="flex flex-col gap-4">
          {[
            { step: "1", title: "Reach out", desc: "Contact us and we'll set up a private deployment link for your agency." },
            { step: "2", title: "Share the link", desc: "Send the link to your personnel. No download, no account, no email required." },
            { step: "3", title: "Use it anonymously", desc: "All wellness tools, check-ins, and resources run entirely on the device. No data is ever transmitted." },
            { step: "4", title: "Optional insights", desc: "If your department opts in, we provide anonymized aggregate trends — mood patterns and engagement — without identifying individuals." },
          ].map((s) => (
            <div key={s.step} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--amber)]/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-sm font-bold text-[var(--amber)]">{s.step}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{s.title}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold mb-1">Privacy guarantees</h2>
        <p className="text-xs text-[var(--muted)] mb-4">What we promise every officer who uses The Dark Guardian.</p>
        <div className="card rounded-2xl p-4 space-y-3 text-sm">
          {[
            "Zero data collection — no accounts, no servers, no telemetry",
            "Everything runs on-device — check-ins, tools, resources never leave",
            "No login required — open the app and use it instantly",
            "No tracking — no analytics SDKs, no cookies, no fingerprinting",
            "Opt-in aggregated trends are anonymous and cannot be traced to individuals",
          ].map((g) => (
            <div key={g} className="flex items-start gap-2">
              <Lock size={14} className="text-[var(--teal)] shrink-0 mt-0.5" />
              <p className="text-xs">{g}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 py-6">
        <div className="rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg, rgba(217,142,59,0.1), rgba(79,140,130,0.05))", border: "1px solid rgba(217,142,59,0.2)" }}>
          <h2 className="text-xl font-bold mb-2">Bring The Dark Guardian to your agency</h2>
          <p className="text-sm text-[var(--muted)] mb-5 max-w-sm mx-auto leading-relaxed">
            We're building relationships with CISM teams and departments. Reach out and we'll get you set up — no cost, no commitment, no catch.
          </p>
          <div className="flex flex-col gap-3">
            <a href="mailto:deployments@watchstand.app" className="btn-amber inline-flex items-center justify-center gap-2">
              <ArrowRight size={18} />
              Contact us
            </a>
            <p className="text-sm text-[var(--muted)]">
              Or call <a href="tel:+18005550199" className="text-[var(--amber)] underline">(800) 555-0199</a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Link */}
      <div className="px-5 pb-8 text-center">
        <Link to="/" className="text-xs text-[var(--muted)] underline hover:text-[var(--amber)]">
          ← Back to The Dark Guardian home
        </Link>
      </div>
    </div>
  );
}