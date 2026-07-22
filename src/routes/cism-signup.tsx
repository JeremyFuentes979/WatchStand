import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HeartHandshake, ChevronLeft, Check, Send, AlertCircle } from "lucide-react";
import { createServerFn } from "@tanstack/react-start";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const DATA_FILE = "/home/team/shared/cism_members.json";

// ---------- Server: Submit signup ----------
const submitSignup = createServerFn({ method: "POST" }).handler(async (data: {
  full_name: string;
  email: string;
  phone: string;
  agency: string;
  cert_level: string;
  years_exp: string;
  notes: string;
}) => {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    let members: unknown[] = [];
    if (existsSync(DATA_FILE)) {
      const raw = await readFile(DATA_FILE, "utf-8");
      try { members = JSON.parse(raw); } catch { members = []; }
    }

    const entry = {
      ...data,
      id: members.length + 1,
      created_at: new Date().toISOString(),
    };
    members.push(entry);

    await writeFile(DATA_FILE, JSON.stringify(members, null, 2), "utf-8");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
});

export const Route = createFileRoute("/cism-signup")({
  component: CismSignup,
});

const certLevels = [
  "ICISF Affiliated",
  "ICISF Registered",
  "ICISF Accredited",
  "State-certified",
  "Other",
];

const expLevels = [
  "Less than 1 year",
  "1–3 years",
  "4–7 years",
  "8–12 years",
  "13–20 years",
  "20+ years",
];

function CismSignup() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    agency: "",
    cert_level: "",
    years_exp: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.full_name || !form.email || !form.agency || !form.cert_level) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    const result = await submitSignup(form);
    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.error || "Submission failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center px-5 pt-6 pb-8 min-h-full animate-fade-in">
        <Link to="/" className="w-full btn-ghost flex items-center gap-1.5 text-sm mb-8">
          <ChevronLeft size={18} /> Home
        </Link>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-[var(--amber)]/10 flex items-center justify-center mb-6">
            <Check size={36} className="text-[var(--amber)]" />
          </div>
          <h2 className="text-xl font-bold mb-2">Thanks for signing up</h2>
          <p className="text-sm text-[var(--muted)] max-w-xs mb-2">
            We'll be in touch.
          </p>
          <p className="text-xs text-[var(--muted)] max-w-xs">
            We'll send deployment information and network updates to <strong className="text-[var(--text)]">{form.email}</strong>
          </p>
          <Link to="/" className="btn-card mt-8">Back to home</Link>
        </div>
      </div>
    );
  }

  const inputClass = "w-full card rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--amber)]/30 transition-colors";

  return (
    <div className="flex flex-col px-5 pt-4 pb-6 min-h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <Link to="/" className="btn-ghost -ml-2"><ChevronLeft size={22} /></Link>
        <div className="w-9 h-9 rounded-lg bg-[var(--amber)]/10 flex items-center justify-center">
          <HeartHandshake size={18} className="text-[var(--amber)]" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Join the CISM Network</h1>
          <p className="text-xs text-[var(--muted)]">
            Certified CISM members who want to help deploy wellness resources to first responder agencies
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="card rounded-2xl p-4 mb-5 text-sm leading-relaxed">
        <p className="mb-2">
          Join our network of certified CISM professionals. As a member, you'll get:
        </p>
        <ul className="space-y-1 text-xs text-[var(--muted)]">
          <li>✓ Access to The Dark Guardian deployment dashboard</li>
          <li>✓ Ability to recommend the tool to departments you serve</li>
          <li>✓ Invitations to CISM networking events and trainings</li>
          <li>✓ First access to new features and resources</li>
        </ul>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-xs font-medium text-[var(--muted)] mb-1.5 block">Full name *</label>
            <input
              type="text" value={form.full_name} onChange={(e) => updateField("full_name", e.target.value)}
              placeholder="e.g. John Smith" className={inputClass} required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[var(--muted)] mb-1.5 block">Email address *</label>
              <input
                type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)}
                placeholder="john@agency.org" className={inputClass} required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--muted)] mb-1.5 block">Phone number</label>
              <input
                type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)}
                placeholder="(555) 123-4567" className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[var(--muted)] mb-1.5 block">Department / Agency *</label>
            <input
              type="text" value={form.agency} onChange={(e) => updateField("agency", e.target.value)}
              placeholder="e.g. Metro Police Department" className={inputClass} required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[var(--muted)] mb-1.5 block">CISM certification level *</label>
              <select value={form.cert_level} onChange={(e) => updateField("cert_level", e.target.value)} className={inputClass} required>
                <option value="">Select...</option>
                {certLevels.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--muted)] mb-1.5 block">Years of CISM experience</label>
              <select value={form.years_exp} onChange={(e) => updateField("years_exp", e.target.value)} className={inputClass}>
                <option value="">Select...</option>
                {expLevels.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[var(--muted)] mb-1.5 block">Message / Notes</label>
            <textarea
              value={form.notes} onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Anything else you'd like us to know..."
              className={`${inputClass} resize-none h-20`} maxLength={500}
            />
          </div>
        </div>

        {error && (
          <div className="card rounded-xl p-3 border border-red-500/20 text-sm text-red-400 flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-amber w-full flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting ? (
            <>Submitting...</>
          ) : (
            <><Send size={18} /> Join the CISM Network</>
          )}
        </button>

        <p className="text-center text-xs text-[var(--muted)] pb-2">
          Your information will be stored securely and used only for CISM network coordination.
        </p>
      </form>
    </div>
  );
}