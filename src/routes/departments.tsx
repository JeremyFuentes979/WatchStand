import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Lock, Users, Building, CheckCircle, DollarSign, Phone, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/departments")({
  component: Departments,
});

const pricingPlans = [
  {
    name: "Base",
    price: "$199",
    period: "/year",
    desc: "For departments under 50 personnel",
    features: [
      "Full wellness toolkit access",
      "Crisis hotline directory",
      "Mood check-ins & session log",
      "All 6 wellness tools",
      "Private-link deployment",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Standard",
    price: "$499",
    period: "/year",
    desc: "For departments under 200 personnel",
    features: [
      "Everything in Base",
      "Anonymous wellness trends dashboard",
      "Aggregate usage analytics",
      "Priority email & phone support",
      "Custom branding available",
      "Onboarding session",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large agencies, statewide deployments, or multi-agency coalitions",
    features: [
      "Everything in Standard",
      "Unlimited personnel",
      "Dedicated account manager",
      "Custom integrations",
      "White-label options",
      "Aggregate cross-agency reporting",
    ],
    cta: "Contact Us",
    highlighted: false,
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
          WatchStand <span className="text-[var(--amber)]">for Your Agency</span>
        </h1>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
          The first wellness toolkit built for the culture of policing and EMS. No login. No data collection. No stigma.
        </p>
      </div>

      {/* The Problem */}
      <div className="px-5 py-6">
        <h2 className="text-lg font-bold mb-1">The crisis of trust</h2>
        <p className="text-xs text-[var(--muted)] mb-4">First responder mental health is a crisis — but the solution has to fit the culture.</p>
        <div className="card rounded-2xl p-5 text-sm leading-relaxed space-y-3">
          <p>Most wellness programs fail because they ask officers to trust a system that logs their data, tracks their usage, or requires an account.</p>
          <p>First responders are trained to be hyper-vigilant about anything that could be used against them. A wellness app that collects data — even "anonymous" data — will not get adoption.</p>
          <p className="font-semibold text-[var(--amber)]">WatchStand is built differently. Nothing leaves the device. No accounts. No data. Zero trust required.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold mb-4">How it works</h2>
        <div className="flex flex-col gap-4">
          {[
            { step: "1", title: "Deploy a private link", desc: "We give your agency a private URL. Officers open it once — no download, no account, no email required." },
            { step: "2", title: "Officers use it anonymously", desc: "All wellness tools, check-ins, and resources run entirely on the device. No data is ever transmitted or stored." },
            { step: "3", title: "Optional aggregated insights", desc: "If your department opts in, we provide anonymized, aggregated wellness trends — mood patterns and tool engagement — without ever identifying individuals." },
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
        <h2 className="text-lg font-bold mb-1">Annual licensing</h2>
        <p className="text-xs text-[var(--muted)] mb-4">Simple, predictable pricing based on department size.</p>
        <div className="flex flex-col gap-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-5 border transition-all ${
                plan.highlighted
                  ? "bg-[var(--amber)]/5 border-[var(--amber)]/30"
                  : "card border-white/5"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-lg">{plan.name}</p>
                {plan.highlighted && (
                  <span className="text-[10px] font-semibold text-[var(--bg-deep)] bg-[var(--amber)] px-2.5 py-0.5 rounded-full">
                    Most popular
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--muted)] mb-3">{plan.desc}</p>
              <div className="mb-3">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-xs text-[var(--muted)] ml-1">{plan.period}</span>}
              </div>
              <ul className="flex flex-col gap-2 mb-4">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <CheckCircle size={14} className="text-[var(--teal)] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-[var(--amber)] text-[var(--bg-deep)] hover:opacity-90"
                    : "btn-card"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div className="px-5 py-4">
        <h2 className="text-lg font-bold mb-1">Privacy guarantees</h2>
        <p className="text-xs text-[var(--muted)] mb-4">What we promise every officer who uses WatchStand.</p>
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
          <h2 className="text-xl font-bold mb-2">Deploy WatchStand for Your Team</h2>
          <p className="text-sm text-[var(--muted)] mb-5 max-w-sm mx-auto leading-relaxed">
            Ready to bring private, anonymous wellness support to your agency? We'll set up your deployment and walk your team through it.
          </p>
          <div className="flex flex-col gap-3">
            <a href="mailto:deployments@watchstand.app" className="btn-amber inline-flex items-center justify-center gap-2">
              <ArrowRight size={18} />
              Email deployments@watchstand.app
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
          ← Back to WatchStand home
        </Link>
      </div>
    </div>
  );
}