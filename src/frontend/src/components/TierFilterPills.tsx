import { Tier } from "../backend";
import { TIER_COLORS, TIER_LABELS } from "./TierEmblem";

export type TierFilterValue = Tier | "all" | "CombatMaster" | "Grandmaster";

interface TierFilterPillsProps {
  active: TierFilterValue;
  onChange: (tier: TierFilterValue) => void;
}

const pills: Array<{
  id: TierFilterValue;
  label: string;
  color?: string;
  special?: boolean;
}> = [
  { id: "all", label: "All" },
  // High-prestige tiers shown first
  {
    id: "Grandmaster",
    label: "Grandmaster",
    color: "oklch(0.72 0.18 295)",
    special: true,
  },
  {
    id: "CombatMaster",
    label: "Combat Master",
    color: "oklch(0.82 0.18 85)",
    special: true,
  },
  // Standard tiers
  { id: Tier.HT5, label: "HT5", color: TIER_COLORS[Tier.HT5] },
  { id: Tier.HT4, label: "HT4", color: TIER_COLORS[Tier.HT4] },
  { id: Tier.HT3, label: "HT3", color: TIER_COLORS[Tier.HT3] },
  { id: Tier.HT2, label: "HT2", color: TIER_COLORS[Tier.HT2] },
  { id: Tier.HT1, label: "HT1", color: TIER_COLORS[Tier.HT1] },
  { id: Tier.LT5, label: "LT5", color: TIER_COLORS[Tier.LT5] },
  { id: Tier.LT4, label: "LT4", color: TIER_COLORS[Tier.LT4] },
  { id: Tier.LT3, label: "LT3", color: TIER_COLORS[Tier.LT3] },
  { id: Tier.LT2, label: "LT2", color: TIER_COLORS[Tier.LT2] },
  { id: Tier.LT1, label: "LT1", color: TIER_COLORS[Tier.LT1] },
];

export function TierFilterPills({ active, onChange }: TierFilterPillsProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-1.5"
      role="tablist"
      aria-label="Filter by tier"
    >
      {pills.map((pill) => {
        const isActive = active === pill.id;
        const isGrandmaster = pill.id === "Grandmaster";
        const isCombatMaster = pill.id === "CombatMaster";
        const isTierEnum =
          pill.id !== "all" &&
          pill.id !== "CombatMaster" &&
          pill.id !== "Grandmaster";
        const pilllabel =
          pill.id === "all"
            ? "All"
            : isTierEnum
              ? TIER_LABELS[pill.id as Tier]
                ? pill.label
                : pill.label
              : pill.label;

        return (
          <button
            key={pill.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(pill.id)}
            data-ocid={`tier.${pill.id === "all" ? "all" : typeof pill.id === "string" ? pill.id.toLowerCase().replace(" ", "-") : (pill.id as string).toLowerCase()}.tab`}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200"
            style={
              isActive
                ? {
                    background: pill.color
                      ? `${pill.color}28`
                      : "oklch(0.52 0.22 278 / 0.25)",
                    border: `1.5px solid ${
                      pill.color || "oklch(0.55 0.21 280 / 0.7)"
                    }`,
                    color: pill.color || "oklch(0.72 0.18 285)",
                    boxShadow: pill.color
                      ? `0 0 10px ${pill.color}55`
                      : "0 0 8px oklch(0.55 0.21 280 / 0.2)",
                  }
                : isGrandmaster
                  ? {
                      background: "oklch(0.10 0.025 295)",
                      border: "1.5px solid oklch(0.72 0.18 295 / 0.35)",
                      color: "oklch(0.65 0.15 295)",
                    }
                  : isCombatMaster
                    ? {
                        background: "oklch(0.10 0.025 85)",
                        border: "1.5px solid oklch(0.82 0.18 85 / 0.35)",
                        color: "oklch(0.72 0.14 85)",
                      }
                    : {
                        background: "oklch(0.10 0.022 260)",
                        border: "1.5px solid oklch(0.22 0.05 245)",
                        color: "oklch(0.50 0.012 255)",
                      }
            }
          >
            {isGrandmaster && <span style={{ fontSize: "0.65rem" }}>👑</span>}
            {isCombatMaster && <span style={{ fontSize: "0.65rem" }}>⭐</span>}
            {pill.id !== "all" && !pill.special && (
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: isActive ? pill.color : "oklch(0.32 0.02 255)",
                }}
              />
            )}
            {pilllabel}
          </button>
        );
      })}
    </div>
  );
}
