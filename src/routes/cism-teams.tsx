import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Shield, Zap, Clock, Network, ArrowRight, Share2, Smartphone, Lock, HeartHandshake, Mail } from "lucide-react";

export const Route = createFileRoute("/cism-teams")({
  component: CismTeams,
});

const benefits = [
  {
    icon: Shield,
    title: "Zero trust barrier",
    desc: "No account, no login, no data collection. First responders don't have to trust a system — they just use it. Everything stays on-device.",
  },
  {
    icon: Zap,
    title: "Deploy in minutes",
    desc: "Share a single link with your department. No IT approval, no app store download, no training required.",
  },
  {
    icon: Clock,
    title: "Always available",
    desc: "24/7 access to breathing exercises, grounding protocols, crisis hotlines, and decompression tools — even when your team is off-call.",
  },
  {
    icon: Network,
    title: "Force multiplier",
    desc: "Extends your team's reach between deployments. Officers have immediate, anonymous wellness support whenever they need it.",
  },
];

const steps = [
  {
    icon: Share2,
    title: "Share the link",
    desc: "Send a private deployment link to your department. No accounts, no downloads, no setup.",
  },
  {
    icon: Smartphone,
    title: "Instant access",
    desc: "First responders open the link and use breathing exercises, grounding protocols, decompression tools, and crisis hotlines immediately.",
  },
  {
    icon: Lock,
    title: "Zero liability",
    desc: "Everything runs on-device. No data is ever collected or transmitted. Your team has zero data liability.",
  },
];

const tools = [
  "Box breathing & 4-7-8 breathing exercises",
  "5-4-3-2-1 grounding protocol",
  "Post-call decompression protocol",
  "Shift-sleep reset & cognitive reframing",
  "Pre-shift tactical reset",
  "Crisis hotline directory (national & peer-support)",
  "Anonymous mood check-ins with session history",
  "Searchable resources directory",
];

function CismTeams() {
  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Hero */}
      <div className="px-5 pt-8 pb-6 text-center" style={{ background: "linear-gradient(180deg, rgba(217,142,59,0.06) 0%, rgba(15,22,32,0) 100%)" }}>
        <Link to="/" className="absolute left-4 top-4 btn-ghost"><ChevronLeft size={22} /></Link>
        <div className="w-14 h-14 rounded-2xl bg-[var(--amber)]/10 flex items-center justify-center mx-auto mb-4">
          <Shield size={28} className="text-[var(--amber)]" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          A wellness tool <span className="text-[var(--amber)]">your team can trust</span>
        </h1>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
          No accounts. No data collection. No liability. The Dark Guardian is built specifically so CISM teams can recommend it without hesitation.
        </p>
      </div>

      {/* Why CISM teams choose The Dark Guardian */}
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold mb-1">Why CISM teams choose The Dark Guardian</h2>
        <p className="text-xs text-[var(--muted)] mb-4">A resource your team can recommend — and your people will actually use.</p>
        <div className="grid grid-cols-1 gap-2.5">
          {benefits.map((b) => (
            <div key={b.title} className="card rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--amber)]/10 flex items-center justify-center shrink-0 mt-0.5">
                <b.icon size={20} className="text-[var(--amber)]" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-0.5">{b.title}</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold mb-1">How it works</h2>
        <p className="text-xs text-[var(--muted)] mb-4">Three steps from link to live wellness support.</p>
        <div className="flex flex-col gap-3">
          {steps.map((s, i) => (
            <div key={s.title} className="card rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--teal)]/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-[var(--teal)]">{i + 1}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <s.icon size={16} className="text-[var(--teal)]" />
                  <h3 className="font-semibold text-sm">{s.title}</h3>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* For your people */}
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold mb-1">For your people</h2>
        <p className="text-xs text-[var(--muted)] mb-4">Everything included — no tiers, no upsells, no cost.</p>
        <div className="card rounded-2xl p-4">
          <div className="grid grid-cols-1 gap-2">
            {tools.map((t) => (
              <div key={t} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] shrink-0" />
                <p className="text-sm">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CISM Network CTA */}
      <div className="px-5 py-4">
        <div className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg, rgba(217,142,59,0.08), rgba(79,140,130,0.04))", border: "1px solid rgba(217,142,59,0.2)" }}>
          <HeartHandshake size={28} className="mx-auto mb-3 text-[var(--amber)]" />
          <h2 className="text-lg font-bold mb-1">Join our CISM network</h2>
          <p className="text-xs text-[var(--muted)] mb-4 max-w-sm mx-auto leading-relaxed">
            CISM members who join our network get listed in the CISM Finder, receive deployment updates, and help shape the tools that departments use every day.
          </p>
          <Link to="/cism-signup" className="btn-amber inline-flex items-center gap-2">
            <ArrowRight size={18} />
            Join the CISM Network
          </Link>
        </div>
      </div>

      {/* Contact */}
      <div className="px-5 py-4">
        <div className="card rounded-2xl p-4 text-center">
          <Mail size={22} className="mx-auto mb-2 text-[var(--muted)]" />
          <h3 className="font-semibold text-sm mb-1">Ready to deploy?</h3>
          <p className="text-xs text-[var(--muted)] mb-3">
            We offer demos for CISM teams, help with departmental deployment, and answer any questions about privacy or liability.
          </p>
          <a href="mailto:DarkGuardianAdmin@protonmail.com" className="text-sm text-[var(--amber)] underline hover:text-[var(--amber)]/80">
            DarkGuardianAdmin@protonmail.com
          </a>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="px-5 pb-8 space-y-2 text-center">
        <Link to="/cism-finder" className="block text-xs text-[var(--muted)] underline hover:text-[var(--amber)]">
          Find CISM teams near you →
        </Link>
        <Link to="/cism-signup" className="block text-xs text-[var(--muted)] underline hover:text-[var(--amber)]">
          Join our CISM network →
        </Link>
        <Link to="/" className="block text-xs text-[var(--muted)] underline hover:text-[var(--amber)] mt-2">
          ← Back to The Dark Guardian home
        </Link>
      </div>
    </div>
  );
}