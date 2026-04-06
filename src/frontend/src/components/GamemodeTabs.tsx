export const GAMEMODES = [
  "Overall",
  "Mace",
  "UHC",
  "Sword",
  "Axe",
  "SMP",
  "Crystal",
  "Pot",
  "Netherpot",
  "Tank",
] as const;

export type GamemodeType = (typeof GAMEMODES)[number];

// Custom MC-style SVG icon components
function OverallIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Overall"
      role="img"
    >
      <title>Overall</title>
      <path
        d="M8 1 L10 5 L14 5.5 L11 8.5 L11.8 13 L8 10.8 L4.2 13 L5 8.5 L2 5.5 L6 5 Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

function MaceIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mace"
      role="img"
    >
      <title>Mace</title>
      <circle cx="8" cy="3.5" r="2.5" fill="currentColor" opacity="0.9" />
      <line
        x1="5.2"
        y1="1.5"
        x2="4"
        y2="0.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="10.8"
        y1="1.5"
        x2="12"
        y2="0.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="1"
        x2="8"
        y2="0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="5"
        y1="3.5"
        x2="4"
        y2="3.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="3.5"
        x2="12"
        y2="3.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <rect
        x="7.3"
        y="5.5"
        width="1.4"
        height="9.5"
        rx="0.7"
        fill="currentColor"
        opacity="0.75"
      />
    </svg>
  );
}

function UHCIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="UHC"
      role="img"
    >
      <title>UHC</title>
      <circle cx="8" cy="9" r="5.5" fill="currentColor" opacity="0.85" />
      <path
        d="M8 3.5 C8 3.5 6 1.5 6 1 C6 0.5 7 0.2 8 0.5 C9 0.2 10 0.5 10 1 C10 1.5 8 3.5 8 3.5Z"
        fill="currentColor"
        opacity="0.95"
      />
      <ellipse
        cx="6"
        cy="7"
        rx="1.2"
        ry="1.5"
        fill="white"
        opacity="0.25"
        transform="rotate(-20 6 7)"
      />
    </svg>
  );
}

function SwordIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sword"
      role="img"
    >
      <title>Sword</title>
      <path
        d="M8 1 L9.2 10 L8 11.5 L6.8 10 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <rect
        x="5"
        y="10"
        width="6"
        height="1.5"
        rx="0.5"
        fill="currentColor"
        opacity="0.8"
      />
      <rect
        x="7.3"
        y="11.5"
        width="1.4"
        height="3.5"
        rx="0.7"
        fill="currentColor"
        opacity="0.7"
      />
      <path d="M7 1 L8 0 L9 1 L8 2.5Z" fill="currentColor" />
    </svg>
  );
}

function AxeIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Axe"
      role="img"
    >
      <title>Axe</title>
      <line
        x1="3"
        y1="13"
        x2="11"
        y2="5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M9 3 C9 3 13 2 14 3 C15 4 14 8 13 8 C13 8 12 5 10 5 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M9 3 L7 2 L8 4 Z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function SMPIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SMP"
      role="img"
    >
      <title>SMP</title>
      <rect
        x="2"
        y="2"
        width="12"
        height="4"
        rx="0.5"
        fill="#4a9c3f"
        opacity="0.95"
      />
      <rect
        x="2"
        y="6"
        width="12"
        height="8"
        rx="0.5"
        fill="#8B5E3C"
        opacity="0.9"
      />
      <rect
        x="2"
        y="5.5"
        width="2"
        height="1.5"
        rx="0.2"
        fill="#4a9c3f"
        opacity="0.8"
      />
      <rect
        x="6"
        y="5.5"
        width="2"
        height="1.5"
        rx="0.2"
        fill="#4a9c3f"
        opacity="0.8"
      />
      <rect
        x="10"
        y="5.5"
        width="2"
        height="1.5"
        rx="0.2"
        fill="#4a9c3f"
        opacity="0.8"
      />
    </svg>
  );
}

function CrystalIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Crystal"
      role="img"
    >
      <title>Crystal</title>
      <path
        d="M8 1 L12 4 L13 8 L12 12 L8 15 L4 12 L3 8 L4 4 Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M8 1 L12 4 L13 8 L12 12 L8 15 L4 12 L3 8 L4 4 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M8 4 L11 6.5 L11 9.5 L8 12 L5 9.5 L5 6.5 Z"
        fill="currentColor"
        opacity="0.15"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M6 3.5 L7.5 5"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

function PotIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pot"
      role="img"
    >
      <title>Pot</title>
      <rect
        x="6.5"
        y="1"
        width="3"
        height="2"
        rx="0.5"
        fill="currentColor"
        opacity="0.6"
      />
      <rect
        x="6.8"
        y="3"
        width="2.4"
        height="2"
        fill="currentColor"
        opacity="0.5"
      />
      <ellipse
        cx="8"
        cy="10.5"
        rx="4.5"
        ry="4"
        fill="currentColor"
        opacity="0.75"
      />
      <ellipse
        cx="8"
        cy="11"
        rx="3.5"
        ry="3"
        fill="currentColor"
        opacity="0.5"
      />
      <ellipse
        cx="6.5"
        cy="9"
        rx="1"
        ry="1.5"
        fill="white"
        opacity="0.2"
        transform="rotate(-20 6.5 9)"
      />
    </svg>
  );
}

function NetherpotIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Netherpot"
      role="img"
    >
      <title>Netherpot</title>
      <path
        d="M5 14 C5 14 3 11 4 8 C4 8 5 10 6 9 C6 9 5 6 7 4 C7 4 7 7 9 6 C9 6 11 4 10 1 C10 1 13 4 13 8 C13 11 11 14 8 14 C6.5 14 5 14 5 14Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M7 13 C7 13 6 11 7 9 C7 9 8 10 8.5 9 C8.5 9 10 7 9.5 5 C9.5 5 11 7 11 10 C11 12 9.5 13 8 13 C7.5 13 7 13 7 13Z"
        fill="white"
        opacity="0.2"
      />
    </svg>
  );
}

function TankIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tank"
      role="img"
    >
      <title>Tank</title>
      <path
        d="M8 1 L14 3.5 L14 8.5 C14 12 11 15 8 15.5 C5 15 2 12 2 8.5 L2 3.5 Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M8 1 L14 3.5 L14 8.5 C14 12 11 15 8 15.5 C5 15 2 12 2 8.5 L2 3.5 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M8 3.5 L12 5.5 L12 9 C12 11.5 10 13.5 8 14 C6 13.5 4 11.5 4 9 L4 5.5 Z"
        fill="currentColor"
        opacity="0.15"
      />
    </svg>
  );
}

import type { ReactElement } from "react";
type IconComponent = ({ size }: { size?: number }) => ReactElement;

const GAMEMODE_ICONS: Record<GamemodeType, IconComponent> = {
  Overall: OverallIcon,
  Mace: MaceIcon,
  UHC: UHCIcon,
  Sword: SwordIcon,
  Axe: AxeIcon,
  SMP: SMPIcon,
  Crystal: CrystalIcon,
  Pot: PotIcon,
  Netherpot: NetherpotIcon,
  Tank: TankIcon,
};

const GAMEMODE_COLORS: Record<GamemodeType, string> = {
  Overall: "oklch(0.82 0.18 85)",
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

interface GamemodeTabsProps {
  activeGamemode: string;
  onGamemodeChange: (mode: string) => void;
}

export function GamemodeTabs({
  activeGamemode,
  onGamemodeChange,
}: GamemodeTabsProps) {
  return (
    <div
      className="sticky z-40 w-full"
      style={{
        top: "57px",
        background: "oklch(0.04 0.008 262 / 0.98)",
        borderBottom: "1px solid oklch(0.18 0.04 248 / 0.7)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="mx-auto max-w-content px-4"
        style={{ overflowX: "auto", scrollbarWidth: "none" }}
      >
        <div
          className="flex items-center gap-1 py-2"
          style={{ minWidth: "max-content" }}
        >
          {GAMEMODES.map((mode) => {
            const Icon = GAMEMODE_ICONS[mode];
            const isActive = activeGamemode === mode;
            const color = GAMEMODE_COLORS[mode];

            return (
              <button
                type="button"
                key={mode}
                onClick={() => onGamemodeChange(mode)}
                data-ocid={`gamemode.${mode.toLowerCase().replace(" ", "-")}.tab`}
                className="relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 outline-none focus-visible:ring-2"
                style={{
                  color: isActive ? color : "oklch(0.45 0.012 255)",
                  background: isActive ? `${color}18` : "transparent",
                  border: isActive
                    ? `1px solid ${color}44`
                    : "1px solid transparent",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "oklch(0.72 0.01 255)";
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "oklch(0.10 0.025 258)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "oklch(0.45 0.012 255)";
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                  }
                }}
              >
                <Icon size={14} />
                <span>{mode}</span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1/2 h-0.5 rounded-full"
                    style={{
                      background: color,
                      width: "60%",
                      transform: "translateX(-50%) translateY(1px)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
