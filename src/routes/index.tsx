import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Home,
  HeartPulse,
  Wrench,
  LifeBuoy,
  Phone,
  ChevronLeft,
  MessageSquareText,
  Wind,
  Moon,
  RotateCcw,
  Sunrise,
  Brain,
  Search,
} from "lucide-react";
import { InstallPrompt } from "~/components/InstallPrompt";

export const Route = createFileRoute("/")({
  component: App,
});

// ---------- Design tokens ----------
// bg-deep: #0F1620  panel: #161B22  card: #1E2530  amber: #D98E3B
// teal (safe): #4F8C82  text: #EDEAE3  muted: #8B93A1  crisis: #B3462C

const TOOLS = [
  {
    id: "box-breathing",
    title: "Box breathing",
    tag: "4 min",
    icon: Wind,
    summary: "Slow your system down before or after a call.",
    kind: "breathing",
  },
  {
    id: "grounding",
    title: "5-4-3-2-1 grounding",
    tag: "3 min",
    icon: Brain,
    summary: "Pull yourself out of a spiral and back into the room.",
    kind: "steps",
    steps: [
      "Name 5 things you can see right now.",
      "Name 4 things you can physically feel (seat, boots, radio strap).",
      "Name 3 things you can hear.",
      "Name 2 things you can smell.",
      "Name 1 thing you can taste, or take one slow breath.",
    ],
  },
  {
    id: "post-call",
    title: "Post-call decompression",
    tag: "5 min",
    icon: RotateCcw,
    summary: "For right after a bad one, before you go home.",
    kind: "steps",
    steps: [
      "Sit down. Don't drive or talk to anyone for 60 seconds.",
      "Say out loud, or in your head, exactly what happened. Just the facts, no judgment.",
      "Notice one thing in your body that's tense. Roll your shoulders back, unclench your jaw.",
      "Ask: does anyone else need to know what I just saw, for my safety or theirs? If not, it can wait.",
      "Decide one small thing you'll do before you sleep tonight — a shower, a call, a walk.",
    ],
  },
  {
    id: "shift-sleep",
    title: "Shift-sleep reset",
    tag: "read",
    icon: Moon,
    summary: "Sleep hygiene built for rotating and night shifts.",
    kind: "steps",
    steps: [
      "Treat your first 20 minutes home as a buffer — no scrolling, no rehashing the shift.",
      "Blackout curtains or a sleep mask beat blinds every time. Darkness cues sleep regardless of the clock.",
      "Keep a consistent 'wind-down' whether it's 7am or 11pm — same order of steps, every time.",
      "Caffeine cutoff: none within 6 hours of your planned sleep, even on nights.",
      "If you can't sleep after 20 minutes, get up, do something boring and dim-lit, come back when tired.",
    ],
  },
  {
    id: "reframe",
    title: "Cognitive reframe",
    tag: "3 min",
    icon: HeartPulse,
    summary: "Check a thought that's stuck on repeat.",
    kind: "steps",
    steps: [
      "Write the thought down exactly as it sounds in your head.",
      "Ask: what would I tell a partner who said this to me about themselves?",
      "Ask: is this a fact, or a feeling wearing a fact's clothes?",
      "Find one piece of evidence that doesn't fit the thought.",
      "Rewrite it as something true and more useful.",
    ],
  },
  {
    id: "tactical-reset",
    title: "Pre-shift tactical reset",
    tag: "2 min",
    icon: Sunrise,
    summary: "A short primer to run before you clock in.",
    kind: "steps",
    steps: [
      "Three slow breaths, longer exhale than inhale.",
      "Name one thing outside of work you're looking forward to this week.",
      "Set one intention for the shift — not an outcome, a way you want to show up.",
      "Check your gear, check your head. Both matter.",
    ],
  },
];

const RESOURCES = [
  { name: "988 Suicide & Crisis Lifeline", audience: "Everyone", phone: "988", note: "Call or text, 24/7. Press 1 for the Veterans line if that fits you better." },
  { name: "Crisis Text Line", audience: "Everyone", phone: "741741", isText: true, note: "Text BADGE to 741741 for a first-responder-aware counselor." },
  { name: "Safe Call Now", audience: "All first responders", phone: "12064593020", display: "1-206-459-3020", note: "Peer advocates who are current or former first responders. Confidential, 24/7." },
  { name: "Copline", audience: "Law enforcement", phone: "18002675463", display: "1-800-267-5463", note: "Answered by retired officers. Built specifically for cops and their families." },
  { name: "Serve & Protect", audience: "All public safety", phone: "16153738000", display: "1-615-373-8000", note: "Crisis line and trauma referral network for public safety personnel." },
  { name: "Fire/EMS Helpline", audience: "Fire & EMS", phone: "18887313473", display: "1-888-731-3473", note: "Run by the National Volunteer Fire Council's Share the Load program." },
];

// ---------- Components ----------

function TopBadge() {
  return (
    <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] font-medium tracking-wider uppercase text-[var(--muted)] border-b border-white/5 bg-[var(--panel)]">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
      Local only · no account
    </div>
  );
}

// --- Home ---
function HomeScreen({ setScreen }: { setScreen: (s: string) => void }) {
  return (
    <div className="flex flex-col px-5 pt-6 pb-4 gap-4 animate-fade-in">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">The Dark Guardian</h1>
          <p className="text-sm text-[var(--muted)] mt-0.5">First responder wellness toolkit</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[var(--amber)]/10 flex items-center justify-center">
          <LifeBuoy size={20} className="text-[var(--amber)]" />
        </div>
      </div>

      {/* PWA Install prompt — subtle, only appears when installable */}
      <InstallPrompt />

      {/* Crisis banner */}
      <button onClick={() => setScreen("crisis")} className="card rounded-2xl p-4 flex items-center gap-3 border border-[var(--crisis)]/30 text-left">
        <div className="w-11 h-11 rounded-xl bg-[var(--crisis)]/10 flex items-center justify-center shrink-0">
          <Phone size={20} style={{ color: "#B3462C" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm" style={{ color: "#B3462C" }}>Need to talk to someone right now?</p>
          <p className="text-xs text-[var(--muted)] mt-0.5">988 · Crisis Text Line · Peer support hotlines</p>
        </div>
        <span className="text-[var(--muted)] shrink-0">→</span>
      </button>

      {/* Quick Check-in */}
      <button onClick={() => setScreen("checkin")} className="card rounded-2xl p-5 flex items-center gap-4 text-left">
        <div className="w-14 h-14 rounded-full bg-[var(--amber)]/10 flex items-center justify-center shrink-0">
          <HeartPulse size={26} className="text-[var(--amber)]" />
        </div>
        <div className="flex-1">
          <p className="font-semibold">How are you doing?</p>
          <p className="text-xs text-[var(--muted)] mt-0.5">Quick mood check-in</p>
        </div>
        <span className="bg-[var(--amber)] text-[var(--bg-deep)] text-xs font-bold px-3 py-1 rounded-full shrink-0">Tap</span>
      </button>

      {/* Tools */}
      <div>
        <h2 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">Tools</h2>
        <div className="flex flex-col gap-2">
          {TOOLS.slice(0, 3).map((tool) => (
            <button
              key={tool.id}
              onClick={() => setScreen("tool-detail")}
              className="card rounded-xl p-3.5 flex items-center gap-3 text-left transition-all hover:border-[var(--amber)]/30"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--amber)]/10 flex items-center justify-center shrink-0">
                <tool.icon size={18} className="text-[var(--amber)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{tool.title}</p>
                <p className="text-xs text-[var(--muted)]">{tool.summary}</p>
              </div>
              <span className="text-xs text-[var(--muted)]">{tool.tag}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => setScreen("tools")} className="btn-card w-full text-sm">
        <Wrench size={16} className="inline mr-2" />
        All tools
      </button>

      <p className="text-center text-xs text-[var(--muted)] pb-2">Everything stays on your device. No account needed.</p>
    </div>
  );
}

// --- Crisis ---
function CrisisScreen({ setScreen }: { setScreen: (s: string) => void }) {
  return (
    <div className="flex flex-col px-5 pt-4 pb-4 gap-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => setScreen("home")} className="btn-ghost -ml-2"><ChevronLeft size={22} /></button>
        <div className="w-9 h-9 rounded-lg bg-[var(--crisis)]/10 flex items-center justify-center">
          <Phone size={18} style={{ color: "#B3462C" }} />
        </div>
        <div>
          <h1 className="text-lg font-bold">Crisis support</h1>
          <p className="text-xs text-[var(--muted)]">Free, confidential, 24/7</p>
        </div>
      </div>

      <div className="rounded-2xl p-4" style={{ background: "rgba(179,70,44,0.08)", border: "1px solid rgba(179,70,44,0.2)" }}>
        <p className="font-semibold text-sm" style={{ color: "#B3462C" }}>If this is a life-threatening emergency</p>
        <p className="text-xs text-[var(--muted)] mt-1">Call 911 immediately. Help is on the way.</p>
      </div>

      {RESOURCES.map((r, i) => (
        <a
          key={i}
          href={`tel:${r.phone}`}
          className="card rounded-2xl p-4 flex items-start gap-3 transition-all hover:border-[var(--amber)]/30 active:scale-[0.98]"
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--amber)]/10 flex items-center justify-center shrink-0 mt-0.5">
            {r.isText ? <MessageSquareText size={18} className="text-[var(--amber)]" /> : <Phone size={18} className="text-[var(--amber)]" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{r.name}</p>
            <p className="text-lg font-bold text-[var(--amber)] mt-0.5">{r.display || r.phone}</p>
            <p className="text-xs text-[var(--teal)] mt-0.5">{r.audience}</p>
            <p className="text-xs text-[var(--muted)] mt-1">{r.note}</p>
          </div>
        </a>
      ))}

      <p className="text-center text-xs text-[var(--muted)] pb-2">The Dark Guardian is not a crisis service. These resources are provided for reference.</p>
    </div>
  );
}

// --- Check-in ---
const MOODS = [
  { label: "Rough", emoji: "😢", color: "from-red-500/20 to-red-600/10", textColor: "#B3462C" },
  { label: "Low", emoji: "😔", color: "from-orange-500/20 to-orange-600/10", textColor: "#D98E3B" },
  { label: "Steady", emoji: "😐", color: "from-yellow-500/20 to-yellow-600/10", textColor: "#D98E3B" },
  { label: "Good", emoji: "🙂", color: "from-teal-500/20 to-teal-600/10", textColor: "#4F8C82" },
  { label: "Strong", emoji: "💪", color: "from-green-500/20 to-green-600/10", textColor: "#4F8C82" },
];

function CheckinScreen({ setScreen }: { setScreen: (s: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [logged, setLogged] = useState(false);
  const [history, setHistory] = useState<{ mood: string; emoji: string; note: string; time: string }[]>([]);

  const handleLog = () => {
    if (!selected) return;
    const m = MOODS.find((x) => x.label === selected)!;
    setHistory((prev) => [{ mood: selected, emoji: m.emoji, note, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...prev].slice(0, 20));
    setLogged(true);
  };

  const handleNew = () => {
    setSelected(null);
    setNote("");
    setLogged(false);
  };

  return (
    <div className="flex flex-col px-5 pt-4 pb-4 gap-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => setScreen("home")} className="btn-ghost -ml-2"><ChevronLeft size={22} /></button>
        <div className="w-9 h-9 rounded-lg bg-[var(--amber)]/10 flex items-center justify-center">
          <HeartPulse size={18} className="text-[var(--amber)]" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Check in</h1>
          <p className="text-xs text-[var(--muted)]">How are you doing right now?</p>
        </div>
      </div>

      {!logged ? (
        <>
          <div>
            <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-3">Select your mood</p>
            <div className="grid grid-cols-5 gap-2">
              {MOODS.map((m) => (
                <button
                  key={m.label}
                  onClick={() => setSelected(m.label)}
                  className={`card rounded-xl p-3 flex flex-col items-center gap-1.5 transition-all ${
                    selected === m.label ? "border-[var(--amber)] ring-1 ring-[var(--amber)]" : ""
                  }`}
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <span className={`text-[10px] font-medium ${selected === m.label ? "text-[var(--amber)]" : "text-[var(--muted)]"}`}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {selected && (
            <div className="animate-slide-up">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional note (stays on your device)..."
                className="w-full card rounded-xl p-3 text-sm resize-none h-20 outline-none"
                maxLength={200}
              />
              <button onClick={handleLog} className="btn-amber w-full mt-3 flex items-center justify-center gap-2">
                <HeartPulse size={18} />
                Log check-in
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="animate-slide-up text-center py-8">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${MOODS.find((m) => m.label === selected)?.color} flex items-center justify-center mx-auto mb-4`}>
            <span className="text-4xl">{MOODS.find((m) => m.label === selected)?.emoji}</span>
          </div>
          <p className="text-lg font-semibold">Logged</p>
          <p className="text-sm text-[var(--muted)] mt-1">Feeling <span className="text-[var(--amber)]">{selected}</span></p>
          {note && <p className="text-xs text-[var(--muted)] mt-2 italic">"{note}"</p>}
          <button onClick={handleNew} className="btn-card mt-6">New check-in</button>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2">This session</p>
          {history.map((h, i) => (
            <div key={i} className="card rounded-xl px-3.5 py-2.5 flex items-center gap-3 mb-1.5">
              <span className="text-xl">{h.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{h.mood}</p>
                <p className="text-xs text-[var(--muted)]">{h.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-[var(--muted)] pt-2">Session log clears when you close the app.</p>
    </div>
  );
}

// --- Tools ---
function ToolsScreen({ setScreen, setActiveToolId }: { setScreen: (s: string) => void; setActiveToolId: (id: string) => void }) {
  return (
    <div className="flex flex-col px-5 pt-4 pb-4 gap-3 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => setScreen("home")} className="btn-ghost -ml-2"><ChevronLeft size={22} /></button>
        <div className="w-9 h-9 rounded-lg bg-[var(--amber)]/10 flex items-center justify-center">
          <Wrench size={18} className="text-[var(--amber)]" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Wellness tools</h1>
          <p className="text-xs text-[var(--muted)]">Pick something that fits right now</p>
        </div>
      </div>

      {TOOLS.map((tool) => (
        <button
          key={tool.id}
          onClick={() => { setActiveToolId(tool.id); setScreen("tool-detail"); }}
          className="card rounded-2xl p-4 flex items-start gap-3 text-left transition-all hover:border-[var(--amber)]/30"
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--amber)]/10 flex items-center justify-center shrink-0 mt-0.5">
            <tool.icon size={20} className="text-[var(--amber)]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{tool.title}</p>
            <p className="text-xs text-[var(--muted)] mt-1">{tool.summary}</p>
          </div>
          <span className="text-xs text-[var(--muted)] shrink-0">{tool.tag}</span>
        </button>
      ))}
    </div>
  );
}

// --- Tool Detail ---
function ToolDetailScreen({ setScreen, activeToolId }: { setScreen: (s: string) => void; activeToolId: string }) {
  const tool = TOOLS.find((t) => t.id === activeToolId) || TOOLS[0];
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [breathCount, setBreathCount] = useState(4);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStart = () => {
    setStarted(true);
    setStepIndex(0);
    setDone(false);
    if (tool.kind === "breathing") {
      setBreathCount(4);
      setBreathPhase("inhale");
      intervalRef.current = setInterval(() => {
        setBreathCount((c) => {
          if (c <= 1) {
            setBreathPhase((p) => {
              if (p === "inhale") return "hold";
              if (p === "hold") return "exhale";
              return "inhale";
            });
            return 4;
          }
          return c - 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleNextStep = () => {
    if (tool.kind === "steps" && tool.steps && stepIndex < tool.steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setDone(true);
    }
  };

  const handleReset = () => {
    setStarted(false);
    setStepIndex(0);
    setBreathCount(4);
    setBreathPhase("inhale");
    setDone(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center px-5 pt-4 pb-8 min-h-full animate-fade-in">
        <button onClick={() => setScreen("tools")} className="w-full btn-ghost flex items-center gap-1.5 text-sm mb-8"><ChevronLeft size={18} /> Tools</button>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-[var(--amber)]/10 flex items-center justify-center mb-6"><HeartPulse size={36} className="text-[var(--amber)]" /></div>
          <p className="text-lg font-bold mb-2">Done</p>
          <p className="text-sm text-[var(--muted)] max-w-xs">You completed the {tool.title.toLowerCase()} exercise.</p>
          <button onClick={handleReset} className="btn-card mt-8">Do it again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-5 pt-4 pb-8 min-h-full animate-fade-in">
      <button onClick={() => { handleReset(); setScreen("tools"); }} className="w-fit btn-ghost flex items-center gap-1.5 text-sm mb-4"><ChevronLeft size={18} /> Tools</button>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[var(--amber)]/10 flex items-center justify-center"><tool.icon size={20} className="text-[var(--amber)]" /></div>
        <div>
          <h1 className="text-lg font-bold">{tool.title}</h1>
          <p className="text-xs text-[var(--muted)]">{tool.tag}</p>
        </div>
      </div>

      {tool.kind === "breathing" ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className={`w-44 h-44 rounded-full flex items-center justify-center mb-8 animate-breathe`}
            style={{ background: "radial-gradient(circle at 30% 30%, rgba(217,142,59,0.2), rgba(79,140,130,0.1))" }}>
            <div className="text-center">
              <span className="text-5xl font-bold block">{breathCount}</span>
              <span className="text-sm text-[var(--amber)] font-medium capitalize">{breathPhase}</span>
            </div>
          </div>
          {started && <p className="text-sm text-[var(--muted)] mb-6 text-center max-w-xs">Follow your breath. Inhale 4 — hold 4 — exhale 4.</p>}
          {!started ? (
            <button onClick={handleStart} className="btn-amber px-10">Start</button>
          ) : (
            <button onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); handleReset(); }} className="btn-card">Stop</button>
          )}
        </div>
      ) : tool.kind === "steps" && tool.steps ? (
        <div className="flex-1 flex flex-col">
          {!started ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-[var(--muted)] mb-6 max-w-xs">{tool.steps.length} steps · {tool.tag}</p>
              <button onClick={handleStart} className="btn-amber px-10">Begin</button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col animate-fade-in">
              <div className="flex gap-1.5 mb-4">
                {tool.steps.map((_, i) => (
                  <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${i <= stepIndex ? "bg-[var(--amber)]" : "bg-white/10"}`} />
                ))}
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                <span className="text-5xl mb-4">{stepIndex + 1}</span>
                <p className="text-lg leading-relaxed">{tool.steps[stepIndex]}</p>
              </div>
              <button onClick={handleNextStep} className="btn-amber w-full mt-4">
                {stepIndex < tool.steps.length - 1 ? "Next" : "Finish"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[var(--muted)]">Select a tool to begin.</p>
        </div>
      )}
    </div>
  );
}

// --- Resources ---
function ResourcesScreen({ setScreen }: { setScreen: (s: string) => void }) {
  const [search, setSearch] = useState("");
  const filtered = RESOURCES.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.note.toLowerCase().includes(search.toLowerCase()) ||
      r.audience.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col px-5 pt-4 pb-4 gap-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => setScreen("home")} className="btn-ghost -ml-2"><ChevronLeft size={22} /></button>
        <div className="w-9 h-9 rounded-lg bg-[var(--amber)]/10 flex items-center justify-center">
          <LifeBuoy size={18} className="text-[var(--amber)]" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Directory</h1>
          <p className="text-xs text-[var(--muted)]">Crisis lines & support services</p>
        </div>
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, audience, or keyword..."
          className="w-full card rounded-xl pl-9 pr-3.5 py-2.5 text-sm outline-none"
        />
      </div>

      {filtered.map((r, i) => (
        <a
          key={i}
          href={`tel:${r.phone}`}
          className="card rounded-2xl p-4 flex items-start gap-3 transition-all hover:border-[var(--amber)]/30 active:scale-[0.98]"
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--amber)]/10 flex items-center justify-center shrink-0 mt-0.5">
            {r.isText ? <MessageSquareText size={18} className="text-[var(--amber)]" /> : <Phone size={18} className="text-[var(--amber)]" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{r.name}</p>
            <p className="text-lg font-bold text-[var(--amber)] mt-0.5">{r.display || r.phone}</p>
            <p className="text-xs text-[var(--teal)] mt-0.5">{r.audience}</p>
            <p className="text-xs text-[var(--muted)] mt-1">{r.note}</p>
          </div>
        </a>
      ))}

      {filtered.length === 0 && (
        <p className="text-sm text-[var(--muted)] text-center py-8">No results found for "{search}"</p>
      )}

      {/* Agency & CISM links */}
      <div className="mt-2 pt-4 border-t border-white/5">
        <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">Agencies & CISM</p>
        <div className="flex flex-col gap-2">
          <a href="/departments" className="card rounded-xl p-3.5 flex items-center gap-3 text-left hover:border-[var(--amber)]/30">
            <div className="w-9 h-9 rounded-lg bg-[var(--amber)]/10 flex items-center justify-center shrink-0">
              <LifeBuoy size={18} className="text-[var(--amber)]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">For your agency</p>
              <p className="text-xs text-[var(--muted)]">The Dark Guardian for departments</p>
            </div>
            <span className="text-[var(--muted)]">→</span>
          </a>
          <a href="/cism-finder" className="card rounded-xl p-3.5 flex items-center gap-3 text-left hover:border-[var(--amber)]/30">
            <div className="w-9 h-9 rounded-lg bg-[var(--amber)]/10 flex items-center justify-center shrink-0">
              <Search size={18} className="text-[var(--amber)]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Find CISM teams</p>
              <p className="text-xs text-[var(--muted)]">Search CISM teams near you</p>
            </div>
            <span className="text-[var(--muted)]">→</span>
          </a>
          <a href="/cism-signup" className="card rounded-xl p-3.5 flex items-center gap-3 text-left hover:border-[var(--amber)]/30">
            <div className="w-9 h-9 rounded-lg bg-[var(--amber)]/10 flex items-center justify-center shrink-0">
              <MessageSquareText size={18} className="text-[var(--amber)]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">CISM membership</p>
              <p className="text-xs text-[var(--muted)]">Join our CISM network</p>
            </div>
            <span className="text-[var(--muted)]">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// --- NavBar ---
function NavBar({ screen, setScreen }: { screen: string; setScreen: (s: string) => void }) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "checkin", icon: HeartPulse, label: "Check-in" },
    { id: "tools", icon: Wrench, label: "Tools" },
    { id: "resources", icon: LifeBuoy, label: "Directory" },
  ];

  return (
    <nav className="sticky bottom-0 z-50 panel border-t border-white/5">
      <div className="flex items-center justify-around py-2 px-1">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setScreen(id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${screen === id ? "nav-icon active" : "nav-icon"}`}
          >
            <Icon size={21} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// ---------- Main App ----------
function App() {
  const [screen, setScreen] = useState("home");
  const [activeToolId, setActiveToolId] = useState(TOOLS[0].id);

  // Hide nav on tool-detail
  const showNav = screen !== "tool-detail";

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <HomeScreen setScreen={setScreen} />;
      case "crisis":
        return <CrisisScreen setScreen={setScreen} />;
      case "checkin":
        return <CheckinScreen setScreen={setScreen} />;
      case "tools":
        return <ToolsScreen setScreen={setScreen} setActiveToolId={setActiveToolId} />;
      case "tool-detail":
        return <ToolDetailScreen setScreen={setScreen} activeToolId={activeToolId} />;
      case "resources":
        return <ResourcesScreen setScreen={setScreen} />;
      default:
        return <HomeScreen setScreen={setScreen} />;
    }
  };

  return (
    <div className="phone-frame flex flex-col" style={{ backgroundColor: "var(--bg-deep)" }}>
      <TopBadge />
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        {renderScreen()}
      </main>
      {showNav && <NavBar screen={screen} setScreen={setScreen} />}
    </div>
  );
}
