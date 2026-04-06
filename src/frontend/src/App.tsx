import { Toaster } from "@/components/ui/sonner";
import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Tier } from "./backend";
import { AdminPanel } from "./components/AdminPanel";
import { GamemodeTabs } from "./components/GamemodeTabs";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { PlayerGrid } from "./components/PlayerGrid";
import { SubmitPlayerModal } from "./components/SubmitPlayerModal";
import { TIER_COLORS } from "./components/TierEmblem";
import {
  TierFilterPills,
  type TierFilterValue,
} from "./components/TierFilterPills";
import { useActor } from "./hooks/useActor";
import {
  useGetAllPlayers,
  useGetPlayersByGamemode,
  useIsAdmin,
} from "./hooks/useQueries";

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="mt-20 w-full"
      style={{
        borderTop: "1px solid oklch(0.18 0.04 245 / 0.4)",
        background: "oklch(0.05 0.01 262 / 0.95)",
      }}
    >
      <div className="mx-auto max-w-content px-6 py-10">
        <div className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {["About", "Rules", "Tier System", "FAQ", "Contact"].map((link) => (
            <span
              key={link}
              className="text-sm cursor-default"
              style={{ color: "oklch(0.38 0.01 255)" }}
            >
              {link}
            </span>
          ))}
        </div>
        <p
          className="text-center text-xs"
          style={{ color: "oklch(0.32 0.01 255)" }}
        >
          &copy; {year}. Built with ❤️ using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            style={{ color: "oklch(0.48 0.015 255)" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("rankings");
  const [activeTier, setActiveTier] = useState<TierFilterValue>("all");
  const [activeGamemode, setActiveGamemode] = useState("Overall");
  const [heroSearch, setHeroSearch] = useState("");
  const [gridSearch, setGridSearch] = useState("");
  const [submitOpen, setSubmitOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHeroSearch = useCallback((val: string) => {
    setHeroSearch(val);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setDebouncedSearch(val), 300);
  }, []);

  const handleGridSearch = useCallback((val: string) => {
    setGridSearch(val);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setDebouncedSearch(val), 300);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const { actor } = useActor();
  const { data: allPlayers = [], isLoading: allPlayersLoading } =
    useGetAllPlayers();
  const { data: modePlayersRaw = [], isLoading: modePlayersLoading } =
    useGetPlayersByGamemode(activeGamemode);
  const { data: isAdmin = false } = useIsAdmin();

  const isOverall = activeGamemode === "Overall";
  const rawPlayers = isOverall ? allPlayers : modePlayersRaw;
  const playersLoading = isOverall ? allPlayersLoading : modePlayersLoading;

  // Apply region filter client-side
  const players =
    regionFilter === "all"
      ? rawPlayers
      : rawPlayers.filter((p) => p.region === regionFilter);

  const handleGamemodeChange = (mode: string) => {
    setActiveGamemode(mode);
    setActiveTier("all");
    setGridSearch("");
    setHeroSearch("");
    setDebouncedSearch("");
  };

  const ht5Count = rawPlayers.filter((p) => p.tier === Tier.HT5).length;
  const ht1Count = rawPlayers.filter((p) => p.tier === Tier.HT1).length;

  const REGIONS_LIST = ["AS", "EU"];

  // Convert TierFilterValue to what PlayerGrid expects
  // CombatMaster/Grandmaster are submission-only, show all ranked players when selected
  const gridActiveTier: Tier | "all" =
    activeTier === "CombatMaster" || activeTier === "Grandmaster"
      ? "all"
      : (activeTier as Tier | "all");

  if (showAdmin) {
    return (
      <div className="min-h-screen">
        <Navbar
          activeSection="admin"
          onSectionChange={() => setShowAdmin(false)}
          onSubmitClick={() => setSubmitOpen(true)}
          isAdmin={isAdmin}
          onAdminClick={() => setShowAdmin(true)}
        />
        <main>
          <AdminPanel onBack={() => setShowAdmin(false)} />
        </main>
        <Footer />
        <Toaster />
        <SubmitPlayerModal open={submitOpen} onOpenChange={setSubmitOpen} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onSubmitClick={() => setSubmitOpen(true)}
        isAdmin={isAdmin}
        onAdminClick={() => setShowAdmin(true)}
      />

      <GamemodeTabs
        activeGamemode={activeGamemode}
        onGamemodeChange={handleGamemodeChange}
      />

      <main>
        {/* Hero */}
        <HeroSection onSearch={handleHeroSearch} searchValue={heroSearch} />

        {/* Rankings content */}
        <section className="mx-auto max-w-content px-4 py-8">
          {/* Stats row */}
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div>
              <p
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: "oklch(0.40 0.01 255)" }}
              >
                {isOverall ? "Total Players" : `${activeGamemode} Players`}
              </p>
              <p className="text-2xl font-black text-foreground">
                {rawPlayers.length}
              </p>
            </div>
            <div
              className="h-8 w-px hidden sm:block"
              style={{ background: "oklch(0.16 0.035 245)" }}
            />
            <div>
              <p
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: "oklch(0.40 0.01 255)" }}
              >
                HT5
              </p>
              <p
                className="text-2xl font-black"
                style={{ color: TIER_COLORS[Tier.HT5] }}
              >
                {ht5Count}
              </p>
            </div>
            <div
              className="h-8 w-px hidden sm:block"
              style={{ background: "oklch(0.16 0.035 245)" }}
            />
            <div>
              <p
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: "oklch(0.40 0.01 255)" }}
              >
                HT1
              </p>
              <p
                className="text-2xl font-black"
                style={{ color: TIER_COLORS[Tier.HT1] }}
              >
                {ht1Count}
              </p>
            </div>

            {/* Region filter */}
            <div className="ml-auto">
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="rounded-lg px-3 py-1.5 text-sm outline-none transition-all"
                style={{
                  background: "oklch(0.08 0.020 262)",
                  border: "1.5px solid oklch(0.18 0.04 245)",
                  color: "oklch(0.72 0.012 255)",
                }}
                data-ocid="region.select"
              >
                <option value="all">All Regions</option>
                {REGIONS_LIST.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tier filter + secondary search row */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TierFilterPills active={activeTier} onChange={setActiveTier} />
            <div className="relative" data-ocid="grid.search_input">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.40 0.01 255)" }}
              />
              <input
                type="text"
                placeholder="Filter players..."
                value={gridSearch}
                onChange={(e) => handleGridSearch(e.target.value)}
                className="h-9 w-full sm:w-56 rounded-lg pl-9 pr-3 text-sm outline-none transition-all"
                style={{
                  background: "oklch(0.08 0.020 262)",
                  border: "1.5px solid oklch(0.18 0.04 245)",
                  color: "oklch(0.92 0.005 255)",
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    "oklch(0.55 0.21 280 / 0.7)";
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    "oklch(0.22 0.05 245)";
                }}
              />
            </div>
          </div>

          {/* Player Grid */}
          <PlayerGrid
            players={players}
            isLoading={playersLoading && !!actor}
            activeTier={gridActiveTier}
            searchTerm={debouncedSearch || gridSearch}
            activeGamemode={activeGamemode}
          />
        </section>
      </main>

      <Footer />
      <Toaster />
      <SubmitPlayerModal
        open={submitOpen}
        onOpenChange={setSubmitOpen}
        activeGamemode={activeGamemode}
      />
    </div>
  );
}
