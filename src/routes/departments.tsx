import { createFileRoute } from "@tanstack/react-router";
import { Shield, Lock, Users, Building, ChevronRight, CheckCircle, ArrowRight, DollarSign, Phone } from "lucide-react";

export const Route = createFileRoute("/departments")({
  component: Departments,
});

const benefits = [
  {
    icon: Lock,
    title: "Zero data collection",
    desc: "Everything runs on-device. No accounts, no servers, no data leaves the device. WatchStand collects nothing — period.",
  },
  {
    icon: Shield,
    title: "Built for first responder culture",
    desc: "Designed with input from active LEOs, firefighters, and EMTs. The anonymous design removes the biggest barrier to wellness tool adoption.",
  },
  {
    icon: Users,
    title: "Anonymous aggregated trends",
    desc: "With opt-in, departments get anonymized wellness trend data — aggregate mood patterns and tool usage — without identifying individuals.",
  },
  {
    icon: DollarSign,
    title: "Simple annual licensing",
    desc: "Predictable per-officer annual pricing. No hidden fees, no per-use charges, no data monetization. Free tier always available.",
  },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "always",
    features: [
      "Full wellness toolkit access",
      "Crisis hotline directory",
      "Mood check-ins & session log",
      "All 6 wellness tools",
      "No account needed",
    ],
    cta: "Available now",
    highlighted: false,
  },
  {
    name: "Department",
    price: "Custom",
    period: "per officer / year",
    features: [
      "Everything in Free",
      "Private-link deployment",
      "Anonymous wellness trends dashboard",
      "Usage analytics (aggregate only)",
      "Priority support & onboarding",
      "Custom branding available",
    ],
    cta: "Contact us",
    highlighted: true,
  },
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
          WatchStand <span className="text-[var(--amber)]">for Departments</span>
        </h1>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
          A wellness resource your people will actually use — because it asks nothing of them. No login, no data collection, no stigma.
        </p>
      </div>

      {/* Why WatchStand */}
      <div className="px-5 py-6">
        <h2 className="text-lg font-bold mb-1">Why departments choose WatchStand</h2>
        <p className="text-xs text-[var(--muted)] mb-5">Built for the culture. Designed for trust.</p>

        <div className="flex flex-col gap-3">
          {benefits.map((b) => (
            <div key={b.title} className="card rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--amber)]/10 flex items-center justify-center shrink-0 mt-0.5">
                <b.icon size={20} className="text-[var(--amber)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{b.title}</p>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold mb-4">How it works</h2>
        <div className="flex flex-col gap-4">
          {[
            { step: "1", title: "Deploy", desc: "We provide a private link for your agency. Officers download once — no accounts, no emails." },
            { step: "2", title: "Adopt", desc: "Officers use the tools anonymously. Zero learning curve. No training required." },
            { step: "3", title: "Monitor", desc: "Optionally receive anonymized wellness trends. See aggregate patterns without ever seeing individual data." },
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

      {/* Pricing */}
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold mb-1">Pricing</h2>
        <p className="text-xs text-[var(--muted)] mb-4">Simple, transparent, no surprises.</p>

        <div className="flex flex-col gap-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-5 border transition-all ${
                tier.highlighted
                  ? "bg-[var(--amber)]/5 border-[var(--amber)]/30"
                  : "card border-white/5"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-lg">{tier.name}</p>
                {tier.highlighted && (
                  <span className="text-[10px] font-semibold text-[var(--bg-deep)] bg-[var(--amber)] px-2.5 py-0.5 rounded-full">
                    Recommended
                  </span>
                )}
              </div>
              <div className="mb-3">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-xs text-[var(--muted)] ml-1">/{tier.period}</span>
              </div>
              <ul className="flex flex-col gap-2 mb-4">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <CheckCircle size={14} className="text-[var(--teal)] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                  tier.highlighted
                    ? "bg-[var(--amber)] text-[var(--bg-deep)]"
                    : "btn-card"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 py-6">
        <div className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg, rgba(217,142,59,0.1), rgba(79,140,130,0.05))", border: "1px solid rgba(217,142,59,0.2)" }}>
          <h2 className="text-lg font-bold mb-2">Ready to bring WatchStand to your agency?</h2>
          <p className="text-sm text-[var(--muted)] mb-4 max-w-sm mx-auto">
            We'll set up a private deployment, walk your team through it, and answer any questions.
          </p>
          <a
            href="tel:+18005550199"
            className="inline-flex items-center gap-2 btn-amber"
          >
            <Phone size={18} />
            Call (800) 555-0199
          </a>
          <p className="text-xs text-[var(--muted)] mt-2">Or email deployments@watchstand.app</p>
        </div>
      </div>

      {/* Privacy guarantee */}
      <div className="px-5 pb-6 text-center">
        <div className="card rounded-2xl p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock size={16} className="text-[var(--teal)]" />
            <span className="text-sm font-semibold text-[var(--teal)]">Privacy guarantee</span>
          </div>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            WatchStand never collects, stores, or transmits personal data. All wellness tools and check-ins run entirely on-device. Anonymous aggregated trends are opt-in only and can never be traced to an individual. We don't sell data. We don't share data. We don't have data to share.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 text-center">
        <a href="/" className="text-xs text-[var(--muted)] underline hover:text-[var(--amber)]">
          Back to WatchStand home
        </a>
      </div>
    </div>
  );
}