import { Copy, MapPin, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { type Player, Tier } from "../backend";
import { TIER_COLORS, TierEmblem } from "./TierEmblem";

interface PlayerCardProps {
  player: Player;
  index: number;
  showGamemode?: boolean;
}

const tierGlowOpacity: Record<Tier, string> = {
  [Tier.HT5]: "0.55",
  [Tier.HT4]: "0.45",
  [Tier.HT3]: "0.40",
  [Tier.HT2]: "0.38",
  [Tier.HT1]: "0.32",
  [Tier.LT5]: "0.30",
  [Tier.LT4]: "0.25",
  [Tier.LT3]: "0.20",
  [Tier.LT2]: "0.16",
  [Tier.LT1]: "0.12",
};

const gamemodeColors: Record<string, string> = {
  Mace: "oklch(0.65 0.22 270)",
  UHC: "oklch(0.75 0.22 85)",
  Sword: "oklch(0.70 0.18 200)",
  Axe: "oklch(0.72 0.20 50)",
  SMP: "oklch(0.65 0.20 145)",
  Crystal: "oklch(0.72 0.18 215)",
  Pot: "oklch(0.68 0.22 155)",
  Netherpot: "oklch(0.70 0.22 35)",
  Tank: "oklch(0.65 0.10 240)",
};

export function PlayerCard({ player, index, showGamemode }: PlayerCardProps) {
  const [copied, setCopied] = useState(false);
  const tierColor = TIER_COLORS[player.tier];
  const glowOpacity = tierGlowOpacity[player.tier];
  const ocidIndex = index + 1;
  const displayGamemode =
    showGamemode && player.gamemode && player.gamemode !== "Overall";
  const gamemodeColor = displayGamemode
    ? (gamemodeColors[player.gamemode] ?? "oklch(0.58 0.10 260)")
    : null;

  const handleDiscordCopy = () => {
    if (!player.discordUsername) return;
    navigator.clipboard.writeText(player.discordUsername).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: Math.min(index * 0.03, 0.4) }}
      className="relative rounded-xl border p-4 card-hover"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.09 0.025 258), oklch(0.06 0.015 262))",
        borderColor: `${tierColor}44`,
        boxShadow: `0 2px 16px oklch(0 0 0 / 0.55), 0 0 0 0 ${tierColor}`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          `${tierColor}88`;
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 4px 24px oklch(0 0 0 / 0.6), 0 0 20px ${tierColor}${Math.round(
            Number.parseFloat(glowOpacity) * 80,
          )
            .toString(16)
            .padStart(2, "0")}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          `${tierColor}44`;
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 2px 16px oklch(0 0 0 / 0.55), 0 0 0 0 ${tierColor}`;
      }}
      data-ocid={`player.item.${ocidIndex}`}
    >
      {/* Tier badge */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="flex h-5 items-center justify-center rounded-full px-2 text-xs font-black tracking-wide"
          style={{
            background: `${tierColor}22`,
            border: `1px solid ${tierColor}55`,
            color: tierColor,
          }}
        >
          {player.tier}
        </div>
        {displayGamemode && gamemodeColor && (
          <span
            className="rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{
              background: `${gamemodeColor}18`,
              color: gamemodeColor,
              border: `1px solid ${gamemodeColor}44`,
            }}
          >
            {player.gamemode}
          </span>
        )}
      </div>

      {/* Emblem */}
      <div className="flex justify-center mb-3">
        <TierEmblem tier={player.tier} size={64} />
      </div>

      {/* Player name */}
      <div className="text-center mb-2">
        <h3
          className="text-sm font-bold leading-tight truncate"
          style={{ color: "oklch(0.92 0.005 255)" }}
          title={player.name}
        >
          {player.name}
        </h3>
      </div>

      {/* Region badge */}
      <div className="flex items-center justify-center mb-2">
        <span
          className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{
            background: "oklch(0.10 0.025 258)",
            color: "oklch(0.55 0.015 255)",
            border: "1px solid oklch(0.18 0.04 248)",
          }}
        >
          <MapPin className="h-2.5 w-2.5" />
          {player.region}
        </span>
      </div>

      {/* Discord username */}
      {player.discordUsername && (
        <button
          type="button"
          onClick={handleDiscordCopy}
          className="flex items-center justify-center gap-1.5 w-full rounded-lg px-2 py-1.5 text-xs transition-all duration-150 group"
          style={{
            background: copied
              ? "oklch(0.40 0.08 160 / 0.25)"
              : "oklch(0.10 0.025 248)",
            border: copied
              ? "1px solid oklch(0.68 0.19 160 / 0.5)"
              : "1px solid oklch(0.18 0.04 248)",
            color: copied ? "oklch(0.68 0.19 160)" : "oklch(0.55 0.018 255)",
          }}
          title="Click to copy Discord username"
          data-ocid={`player.discord.${ocidIndex}.button`}
        >
          {copied ? (
            <>
              <Copy className="h-3 w-3" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <MessageSquare
                className="h-3 w-3"
                style={{ color: "oklch(0.64 0.14 255)" }}
              />
              <span className="truncate max-w-[120px]">
                {player.discordUsername}
              </span>
            </>
          )}
        </button>
      )}

      {/* Notes */}
      {player.notes && (
        <p
          className="mt-2 text-center text-xs truncate"
          style={{ color: "oklch(0.40 0.01 255)" }}
          title={player.notes}
        >
          {player.notes}
        </p>
      )}
    </motion.div>
  );
}
