import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { createServerFn } from "@tanstack/react-start";
import { readFile, existsSync } from "node:fs";
import { readFile as readFileAsync } from "node:fs/promises";
import path from "node:path";
import { Search, MapPin, Phone, Mail, Globe, ChevronLeft, Building, Shield, Filter } from "lucide-react";

interface CismTeam {
  id: string;
  name: string;
  state: string;
  region: string;
  type: string;
  contact_name: string;
  email: string;
  phone: string;
  website: string;
  cert_level: string;
  notes: string;
  source: "public" | "member";
  member_name?: string;
}

const DATA_FILE = "/home/team/shared/cism_members.json";
const SEED_FILE = path.join(import.meta.dirname, "../data/cism-teams.json");

// ---------- Server: Load all CISM teams ----------
const loadTeams = createServerFn({ method: "GET" }).handler(async () => {
  const teams: CismTeam[] = [];

  // 1. Load seed data (public CISM teams)
  try {
    const seedRaw = await readFileAsync(SEED_FILE, "utf-8");
    const seedData = JSON.parse(seedRaw);
    teams.push(...seedData);
  } catch (e) {
    console.error("Failed to load seed CISM data:", e);
  }

  // 2. Load member signups from the JSON file
  try {
    if (existsSync(DATA_FILE)) {
      const raw = await readFileAsync(DATA_FILE, "utf-8");
      const members = JSON.parse(raw);
      for (const m of members) {
        teams.push({
          id: `member-${m.id}`,
          name: m.agency,
          state: "",
          region: "",
          type: "CISM Member",
          contact_name: m.full_name,
          email: m.email,
          phone: m.phone || "",
          website: "",
          cert_level: m.cert_level || "",
          notes: m.notes || "",
          source: "member",
          member_name: m.full_name,
        });
      }
    }
  } catch (e) {
    console.error("Failed to load member data:", e);
  }

  return teams;
});

export const Route = createFileRoute("/cism-finder")({
  component: CismFinder,
});

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
  "DC",
];

const REGIONS = [
  "National",
  "Northeast",
  "Southeast",
  "Midwest",
  "South Central",
  "Mountain",
  "Western",
];

const TEAM_TYPES = [
  "National Organization",
  "State CISM Team",
  "Regional CISM Team",
  "Department Peer Support Team",
  "CISM Member",
];

function CismFinder() {
  const [teams, setTeams] = useState<CismTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Load data on mount
  useState(() => {
    loadTeams().then((data) => {
      setTeams(data);
      setLoading(false);
    });
  });

  // Extract unique states from teams
  const availableStates = useMemo(() => {
    const states = new Set(teams.map((t) => t.state).filter(Boolean));
    return US_STATES.filter((s) => states.has(s));
  }, [teams]);

  // Filtered teams
  const filtered = useMemo(() => {
    return teams.filter((t) => {
      if (search) {
        const q = search.toLowerCase();
        const matchName = t.name.toLowerCase().includes(q);
        const matchContact = t.contact_name.toLowerCase().includes(q);
        const matchNotes = t.notes.toLowerCase().includes(q);
        const matchState = t.state.toLowerCase().includes(q);
        const matchRegion = t.region.toLowerCase().includes(q);
        if (!matchName && !matchContact && !matchNotes && !matchState && !matchRegion) return false;
      }
      if (stateFilter && t.state !== stateFilter) return false;
      if (regionFilter && t.region !== regionFilter) return false;
      if (typeFilter && t.type !== typeFilter) return false;
      return true;
    });
  }, [teams, search, stateFilter, regionFilter, typeFilter]);

  const inputClass = "w-full card rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--amber)]/30 transition-colors";

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-3">
        <Link to="/" className="btn-ghost -ml-2"><ChevronLeft size={22} /></Link>
        <div className="w-9 h-9 rounded-lg bg-[var(--amber)]/10 flex items-center justify-center">
          <MapPin size={18} className="text-[var(--amber)]" />
        </div>
        <div>
          <h1 className="text-lg font-bold">CISM Finder</h1>
          <p className="text-xs text-[var(--muted)]">
            Find CISM teams and resources near you
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-5 pb-3">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            placeholder="Search by name, state, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputClass} pl-10`}
          />
        </div>
      </div>

      {/* Filter toggle */}
      <div className="px-5 pb-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-ghost text-xs flex items-center gap-1.5"
        >
          <Filter size={14} />
          {showFilters ? "Hide filters" : "Show filters"}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="px-5 pb-3 animate-fade-in">
          <div className="card rounded-2xl p-4 grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-[var(--muted)] block mb-1">State</label>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full card rounded-xl px-3 py-2.5 text-xs outline-none"
              >
                <option value="">All states</option>
                {availableStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-[var(--muted)] block mb-1">Region</label>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full card rounded-xl px-3 py-2.5 text-xs outline-none"
              >
                <option value="">All regions</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-[var(--muted)] block mb-1">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full card rounded-xl px-3 py-2.5 text-xs outline-none"
              >
                <option value="">All types</option>
                {TEAM_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="px-5 pb-4 flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--amber)] border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            <p className="text-xs text-[var(--muted)] mb-3">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
              {teams.length > 0 && ` out of ${teams.length} total`}
            </p>

            {filtered.length === 0 ? (
              <div className="card rounded-2xl p-8 text-center">
                <MapPin size={32} className="mx-auto mb-3 text-[var(--muted)]" />
                <p className="text-sm text-[var(--muted)]">No CISM teams found</p>
                <p className="text-xs text-[var(--muted)] mt-1">Try a different search or filter</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {filtered.map((team) => (
                  <div key={team.id} className="card rounded-2xl p-4">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm leading-tight">{team.name}</h3>
                        <p className="text-xs text-[var(--muted)] mt-0.5">{team.contact_name}</p>
                      </div>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                        team.source === "public"
                          ? "bg-[var(--teal)]/10 text-[var(--teal)]"
                          : "bg-[var(--amber)]/10 text-[var(--amber)]"
                      }`}>
                        {team.source === "public" ? "Directory" : "Member"}
                      </span>
                    </div>

                    {/* Type & Location */}
                    <div className="flex flex-wrap gap-2 mb-2.5">
                      <span className="text-[10px] bg-[var(--card)] border border-white/5 rounded-full px-2 py-0.5 text-[var(--muted)]">
                        {team.type}
                      </span>
                      {team.state && (
                        <span className="text-[10px] bg-[var(--card)] border border-white/5 rounded-full px-2 py-0.5 text-[var(--muted)] flex items-center gap-1">
                          <MapPin size={10} /> {team.state}
                        </span>
                      )}
                      {team.region && (
                        <span className="text-[10px] bg-[var(--card)] border border-white/5 rounded-full px-2 py-0.5 text-[var(--muted)]">
                          {team.region}
                        </span>
                      )}
                      {team.cert_level && (
                        <span className="text-[10px] bg-[var(--amber)]/5 border border-[var(--amber)]/10 rounded-full px-2 py-0.5 text-[var(--amber)]">
                          {team.cert_level}
                        </span>
                      )}
                    </div>

                    {/* Contact info */}
                    <div className="flex flex-col gap-1.5">
                      {team.email && (
                        <a href={`mailto:${team.email}`} className="flex items-center gap-2 text-xs text-[var(--teal)] hover:underline">
                          <Mail size={12} />
                          {team.email}
                        </a>
                      )}
                      {team.phone && (
                        <a href={`tel:${team.phone}`} className="flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--text)]">
                          <Phone size={12} />
                          {team.phone}
                        </a>
                      )}
                      {team.website && (
                        <a href={team.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--text)]">
                          <Globe size={12} />
                          {team.website.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                    </div>

                    {/* Notes */}
                    {team.notes && (
                      <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed border-t border-white/5 pt-2">
                        {team.notes}
                      </p>
                    )}

                    {/* Member name */}
                    {team.source === "member" && team.member_name && (
                      <p className="text-[10px] text-[var(--amber)] mt-1.5">
                        Listed by {team.member_name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pb-6 text-center">
        <p className="text-xs text-[var(--muted)] mb-3">
          Know a CISM team not listed here?
        </p>
        <Link to="/cism-signup" className="btn-card inline-flex items-center gap-2 text-sm">
          <Shield size={16} />
          Join the CISM Network
        </Link>
      </div>
    </div>
  );
}