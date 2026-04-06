import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { type Player, Tier } from "../backend";
import { PlayerCard } from "./PlayerCard";
import { TIER_COLORS, TIER_LABELS } from "./TierEmblem";

interface PlayerGridProps {
  players: Player[];
  isLoading: boolean;
  activeTier: Tier | "all";
  searchTerm: string;
  activeGamemode?: string;
}

export const TIER_ORDER: Tier[] = [
  Tier.HT5,
  Tier.HT4,
  Tier.HT3,
  Tier.HT2,
  Tier.HT1,
  Tier.LT5,
  Tier.LT4,
  Tier.LT3,
  Tier.LT2,
  Tier.LT1,
];

const SKELETON_KEYS = [
  "sk-1",
  "sk-2",
  "sk-3",
  "sk-4",
  "sk-5",
  "sk-6",
  "sk-7",
  "sk-8",
];

export function PlayerGrid({
  players,
  isLoading,
  activeTier,
  searchTerm,
  activeGamemode,
}: PlayerGridProps) {
  const showGamemode = activeGamemode === "Overall";

  const filtered = players.filter((p) => {
    const matchesTier = activeTier === "all" || p.tier === activeTier;
    const matchesSearch =
      !searchTerm.trim() ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.discordUsername.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        data-ocid="player.loading_state"
      >
        {SKELETON_KEYS.map((key) => (
          <div
            key={key}
            className="rounded-xl border p-4"
            style={{
              background: "oklch(0.10 0.022 262)",
              borderColor: "oklch(0.18 0.04 245)",
            }}
          >
            <div className="flex justify-between mb-3">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <div className="flex justify-center mb-3">
              <Skeleton className="h-16 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-3/4 mx-auto mb-3 rounded" />
            <Skeleton className="h-5 w-1/2 mx-auto mb-2 rounded-full" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 text-center"
        data-ocid="player.empty_state"
      >
        <Search
          className="h-10 w-10 mb-4"
          style={{ color: "oklch(0.32 0.02 255)" }}
        />
        <h3
          className="text-base font-semibold mb-2"
          style={{ color: "oklch(0.60 0.01 255)" }}
        >
          No players found
        </h3>
        <p className="text-sm" style={{ color: "oklch(0.40 0.01 255)" }}>
          {searchTerm
            ? `No players matching "${searchTerm}"`
            : activeGamemode && activeGamemode !== "Overall"
              ? `No ${activeGamemode} players yet`
              : "No players in this tier yet"}
        </p>
      </div>
    );
  }

  // Flat list when filtering by specific tier
  if (activeTier !== "all") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((player, i) => (
          <PlayerCard
            key={Number(player.id)}
            player={player}
            index={i}
            showGamemode={showGamemode}
          />
        ))}
      </div>
    );
  }

  // Grouped by tier
  const tierGroups = TIER_ORDER.map((tier) => ({
    tier,
    players: filtered.filter((p) => p.tier === tier),
  })).filter((group) => group.players.length > 0);

  let globalIndex = 0;

  return (
    <div>
      {tierGroups.map((group) => {
        const tierColor = TIER_COLORS[group.tier];
        const groupStartIndex = globalIndex;
        globalIndex += group.players.length;

        return (
          <div key={group.tier} className="mb-10">
            {/* Tier section header */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-black uppercase tracking-widest shrink-0"
                style={{ color: tierColor }}
              >
                {TIER_LABELS[group.tier]}
              </span>
              <div
                className="flex-1 h-px"
                style={{
                  background: `linear-gradient(90deg, ${tierColor}55, transparent)`,
                }}
              />
              <span
                className="text-xs shrink-0"
                style={{ color: "oklch(0.40 0.01 255)" }}
              >
                {group.players.length}{" "}
                {group.players.length === 1 ? "player" : "players"}
              </span>
            </div>

            {/* Players grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {group.players.map((player, i) => (
                <PlayerCard
                  key={Number(player.id)}
                  player={player}
                  index={groupStartIndex + i}
                  showGamemode={showGamemode}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
