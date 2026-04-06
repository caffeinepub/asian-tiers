import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface HeroSectionProps {
  onSearch: (term: string) => void;
  searchValue: string;
}

export function HeroSection({ onSearch, searchValue }: HeroSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "360px" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/generated/hero-asian-cityscape.dim_1920x600.jpg')`,
        }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.07 0.018 262 / 0.90) 0%, oklch(0.08 0.020 260 / 0.92) 60%, oklch(0.07 0.018 262) 100%)",
        }}
      />
      {/* Decorative glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.55 0.21 280) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-content px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Badge */}
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: "oklch(0.55 0.21 280 / 0.15)",
              border: "1px solid oklch(0.55 0.21 280 / 0.35)",
              color: "oklch(0.75 0.16 285)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse-glow"
              style={{ background: "oklch(0.72 0.18 285)" }}
            />
            Asia's Premier Minecraft Rankings
          </div>

          <h1
            className="mb-4 font-black leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "white",
              textShadow: "0 2px 20px oklch(0 0 0 / 0.5)",
              letterSpacing: "-0.02em",
            }}
          >
            Asia's Official{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 285), oklch(0.65 0.22 300))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Tier Rankings
            </span>
          </h1>

          <p
            className="mb-8 max-w-lg mx-auto text-base"
            style={{ color: "oklch(0.62 0.015 255)", lineHeight: "1.6" }}
          >
            The definitive ranking system for Asian Minecraft PvP players. Track
            the best players across the continent.
          </p>

          {/* Search */}
          <div
            className="relative mx-auto max-w-xl"
            data-ocid="hero.search_input"
          >
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5"
              style={{ color: "oklch(0.50 0.015 255)" }}
            />
            <input
              type="text"
              placeholder="Search players by name..."
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full rounded-2xl py-3.5 pl-12 pr-5 text-sm outline-none transition-all"
              style={{
                background: "oklch(0.11 0.026 260)",
                border: "1.5px solid oklch(0.18 0.04 245)",
                color: "oklch(0.92 0.005 255)",
                boxShadow: "0 4px 24px oklch(0 0 0 / 0.3)",
              }}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor =
                  "oklch(0.55 0.21 280 / 0.7)";
                (e.target as HTMLInputElement).style.boxShadow =
                  "0 4px 24px oklch(0 0 0 / 0.3), 0 0 0 3px oklch(0.55 0.21 280 / 0.2)";
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor =
                  "oklch(0.18 0.04 245)";
                (e.target as HTMLInputElement).style.boxShadow =
                  "0 4px 24px oklch(0 0 0 / 0.3)";
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
