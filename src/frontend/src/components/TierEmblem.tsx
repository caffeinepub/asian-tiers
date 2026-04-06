import { Tier } from "../backend";

interface TierEmblemProps {
  tier: Tier;
  size?: number;
}

export const TIER_COLORS: Record<Tier, string> = {
  [Tier.HT5]: "oklch(0.82 0.18 85)",
  [Tier.HT4]: "oklch(0.72 0.22 50)",
  [Tier.HT3]: "oklch(0.65 0.20 30)",
  [Tier.HT2]: "oklch(0.68 0.19 160)",
  [Tier.HT1]: "oklch(0.60 0.16 160)",
  [Tier.LT5]: "oklch(0.65 0.20 250)",
  [Tier.LT4]: "oklch(0.58 0.16 250)",
  [Tier.LT3]: "oklch(0.52 0.12 250)",
  [Tier.LT2]: "oklch(0.48 0.08 255)",
  [Tier.LT1]: "oklch(0.42 0.05 255)",
};

export const TIER_LABELS: Record<Tier, string> = {
  [Tier.HT5]: "High Tier 5",
  [Tier.HT4]: "High Tier 4",
  [Tier.HT3]: "High Tier 3",
  [Tier.HT2]: "High Tier 2",
  [Tier.HT1]: "High Tier 1",
  [Tier.LT5]: "Low Tier 5",
  [Tier.LT4]: "Low Tier 4",
  [Tier.LT3]: "Low Tier 3",
  [Tier.LT2]: "Low Tier 2",
  [Tier.LT1]: "Low Tier 1",
};

// Colors for submission tiers (string-based, not backend enum)
export const SUBMISSION_TIER_COLORS: Record<string, string> = {
  LT3: "oklch(0.52 0.12 250)",
  "LT3+": "oklch(0.54 0.14 245)",
  LT2: "oklch(0.48 0.08 255)",
  "LT2+": "oklch(0.50 0.10 250)",
  LT1: "oklch(0.42 0.05 255)",
  "LT1+": "oklch(0.45 0.07 250)",
  M1: "oklch(0.55 0.18 200)",
  M2: "oklch(0.58 0.20 190)",
  M3: "oklch(0.62 0.22 180)",
  M4: "oklch(0.65 0.22 170)",
  M5: "oklch(0.68 0.22 160)",
  "Combat Master": "oklch(0.82 0.18 85)",
  Grandmaster: "oklch(0.72 0.18 295)",
};

import type { ReactElement } from "react";

const tierIconPaths: Record<Tier, ReactElement> = {
  [Tier.HT5]: (
    <g transform="translate(32, 28)">
      <path
        d="M-12 8 L-16 -4 L-8 2 L0 -10 L8 2 L16 -4 L12 8 Z"
        fill="oklch(0.90 0.14 80)"
        stroke="oklch(0.80 0.18 80)"
        strokeWidth="1"
      />
      <rect
        x="-12"
        y="8"
        width="24"
        height="5"
        rx="1"
        fill="oklch(0.88 0.14 80)"
      />
      <circle cx="-8" cy="-4" r="2" fill="oklch(0.95 0.05 85)" />
      <circle cx="0" cy="-10" r="2.5" fill="oklch(0.95 0.05 85)" />
      <circle cx="8" cy="-4" r="2" fill="oklch(0.95 0.05 85)" />
    </g>
  ),
  [Tier.HT4]: (
    <g transform="translate(32, 30)">
      <polygon
        points="0,-14 3.5,-5 13,-5 5.5,1 8.5,10 0,5 -8.5,10 -5.5,1 -13,-5 -3.5,-5"
        fill="oklch(0.72 0.22 50)"
        stroke="oklch(0.82 0.18 50)"
        strokeWidth="1"
      />
    </g>
  ),
  [Tier.HT3]: (
    <g transform="translate(32, 30)">
      <path
        d="M0 -14 L13 -8 L13 2 C13 10 6 16 0 18 C-6 16 -13 10 -13 2 L-13 -8 Z"
        fill="oklch(0.65 0.20 30 / 0.35)"
        stroke="oklch(0.65 0.20 30)"
        strokeWidth="2"
      />
      <path
        d="M0 -8 L7 -4 L7 3 C7 8 3 12 0 13 C-3 12 -7 8 -7 3 L-7 -4 Z"
        fill="oklch(0.65 0.20 30 / 0.5)"
      />
    </g>
  ),
  [Tier.HT2]: (
    <g transform="translate(32, 32)">
      <path
        d="M0 -14 L12 4 L-12 4 Z"
        fill="oklch(0.68 0.19 160 / 0.4)"
        stroke="oklch(0.68 0.19 160)"
        strokeWidth="2"
      />
      <circle cx="0" cy="2" r="4" fill="oklch(0.68 0.19 160 / 0.6)" />
    </g>
  ),
  [Tier.HT1]: (
    <g transform="translate(32, 32)">
      <rect
        x="-10"
        y="-10"
        width="20"
        height="20"
        rx="3"
        fill="oklch(0.60 0.16 160 / 0.3)"
        stroke="oklch(0.60 0.16 160)"
        strokeWidth="2"
      />
      <rect
        x="-5"
        y="-5"
        width="10"
        height="10"
        rx="1"
        fill="oklch(0.60 0.16 160 / 0.5)"
      />
    </g>
  ),
  [Tier.LT5]: (
    <g transform="translate(32, 32)">
      <circle
        cx="0"
        cy="0"
        r="12"
        fill="oklch(0.65 0.20 250 / 0.25)"
        stroke="oklch(0.65 0.20 250)"
        strokeWidth="2"
      />
      <circle cx="0" cy="0" r="6" fill="oklch(0.65 0.20 250 / 0.5)" />
    </g>
  ),
  [Tier.LT4]: (
    <g transform="translate(32, 32)">
      <polygon
        points="0,-12 10.4,6 -10.4,6"
        fill="oklch(0.58 0.16 250 / 0.3)"
        stroke="oklch(0.58 0.16 250)"
        strokeWidth="2"
      />
    </g>
  ),
  [Tier.LT3]: (
    <g transform="translate(32, 32)">
      <rect
        x="-10"
        y="-10"
        width="20"
        height="20"
        fill="oklch(0.52 0.12 250 / 0.25)"
        stroke="oklch(0.52 0.12 250)"
        strokeWidth="2"
      />
    </g>
  ),
  [Tier.LT2]: (
    <g transform="translate(32, 32)">
      <line
        x1="-10"
        y1="0"
        x2="10"
        y2="0"
        stroke="oklch(0.48 0.08 255)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="0"
        y1="-10"
        x2="0"
        y2="10"
        stroke="oklch(0.48 0.08 255)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  ),
  [Tier.LT1]: (
    <g transform="translate(32, 32)">
      <line
        x1="-10"
        y1="0"
        x2="10"
        y2="0"
        stroke="oklch(0.42 0.05 255)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  ),
};

export function TierEmblem({ tier, size = 64 }: TierEmblemProps) {
  const color = TIER_COLORS[tier];

  const hexPoints = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{
        width: size,
        height: size,
        filter: `drop-shadow(0 0 6px ${color}88) drop-shadow(0 0 12px ${color}44)`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`${tier} emblem`}
      >
        <title>{tier} emblem</title>
        <polygon
          points={hexPoints(32, 32, 29)}
          fill={`${color}1a`}
          stroke={color}
          strokeWidth="2"
        />
        <polygon
          points={hexPoints(32, 32, 22)}
          fill={`${color}10`}
          stroke={`${color}55`}
          strokeWidth="1"
        />
        {tierIconPaths[tier]}
      </svg>
    </div>
  );
}
