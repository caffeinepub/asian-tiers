import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSubmitPlayer } from "../hooks/useQueries";
import { GAMEMODES } from "./GamemodeTabs";

interface SubmitPlayerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeGamemode?: string;
}

const REGIONS = [
  { value: "AS", label: "🌏 Asia" },
  { value: "EU", label: "🌍 Europe" },
];

const SUBMISSION_TIERS = [
  "LT3",
  "LT3+",
  "LT2",
  "LT2+",
  "LT1",
  "LT1+",
  "M1",
  "M2",
  "M3",
  "M4",
  "M5",
  "Combat Master",
  "Grandmaster",
];

const DARK_SELECT_CONTENT_STYLE = {
  background: "oklch(0.08 0.020 262)",
  border: "1px solid oklch(0.18 0.04 245)",
};

export function SubmitPlayerModal({
  open,
  onOpenChange,
  activeGamemode,
}: SubmitPlayerModalProps) {
  const [name, setName] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [region, setRegion] = useState("");
  const [gamemode, setGamemode] = useState(activeGamemode ?? "");
  const [submissionTier, setSubmissionTier] = useState("");
  const submitPlayer = useSubmitPlayer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !region || !gamemode || !submissionTier) return;
    await submitPlayer.mutateAsync({
      name: name.trim(),
      discordUsername: discordUsername.trim(),
      region,
      gamemode,
      submissionTier,
    });
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setName("");
      setDiscordUsername("");
      setRegion("");
      setGamemode(activeGamemode ?? "");
      setSubmissionTier("");
      submitPlayer.reset();
    }, 200);
  };

  const isValid = !!name.trim() && !!region && !!gamemode && !!submissionTier;

  // Color indicator for selected tier
  const getTierColor = (tier: string): string => {
    if (tier === "Grandmaster") return "oklch(0.72 0.18 295)";
    if (tier === "Combat Master") return "oklch(0.82 0.18 85)";
    if (tier.startsWith("M"))
      return `oklch(0.60 0.20 ${180 + (Number(tier.slice(1)) - 1) * 8})`;
    return "oklch(0.52 0.12 250)";
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-md"
        style={{
          background: "oklch(0.08 0.020 262)",
          border: "1px solid oklch(0.18 0.04 245)",
        }}
        data-ocid="submit_player.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl font-bold">
            Submit a Player
          </DialogTitle>
          <DialogDescription style={{ color: "oklch(0.50 0.012 255)" }}>
            Nominate a Minecraft player for tier ranking consideration.
          </DialogDescription>
        </DialogHeader>

        {submitPlayer.isSuccess ? (
          <div
            className="flex flex-col items-center justify-center gap-3 py-8"
            data-ocid="submit_player.success_state"
          >
            <CheckCircle2
              className="h-12 w-12"
              style={{ color: "oklch(0.68 0.19 160)" }}
            />
            <h3 className="text-base font-semibold text-foreground">
              Submission Received!
            </h3>
            <p
              className="text-sm text-center"
              style={{ color: "oklch(0.50 0.012 255)" }}
            >
              Your submission has been sent for review. The admin will evaluate
              the player&apos;s tier placement.
            </p>
            <Button
              onClick={handleClose}
              className="mt-2"
              data-ocid="submit_player.close_button"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-2">
              {/* Player Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="player-name"
                  className="text-sm font-medium text-foreground"
                >
                  Player Name
                </Label>
                <Input
                  id="player-name"
                  placeholder="Minecraft username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  required
                  data-ocid="submit_player.input"
                />
              </div>

              {/* Discord */}
              <div className="space-y-2">
                <Label
                  htmlFor="player-discord"
                  className="text-sm font-medium text-foreground"
                >
                  Discord Username
                </Label>
                <Input
                  id="player-discord"
                  placeholder="e.g. username#1234 or @username"
                  value={discordUsername}
                  onChange={(e) => setDiscordUsername(e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  data-ocid="submit_player.discord.input"
                />
              </div>

              {/* Region */}
              <div className="space-y-2">
                <Label
                  htmlFor="player-region"
                  className="text-sm font-medium text-foreground"
                >
                  Region
                </Label>
                <Select value={region} onValueChange={setRegion} required>
                  <SelectTrigger
                    id="player-region"
                    className="bg-input border-border text-foreground"
                    data-ocid="submit_player.select"
                  >
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent style={DARK_SELECT_CONTENT_STYLE}>
                    {REGIONS.map((r) => (
                      <SelectItem
                        key={r.value}
                        value={r.value}
                        className="text-foreground focus:bg-accent"
                      >
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Gamemode */}
              <div className="space-y-2">
                <Label
                  htmlFor="player-gamemode"
                  className="text-sm font-medium text-foreground"
                >
                  Gamemode
                </Label>
                <Select value={gamemode} onValueChange={setGamemode} required>
                  <SelectTrigger
                    id="player-gamemode"
                    className="bg-input border-border text-foreground"
                    data-ocid="submit_player.gamemode.select"
                  >
                    <SelectValue placeholder="Select gamemode" />
                  </SelectTrigger>
                  <SelectContent style={DARK_SELECT_CONTENT_STYLE}>
                    {GAMEMODES.filter((g) => g !== "Overall").map((g) => (
                      <SelectItem
                        key={g}
                        value={g}
                        className="text-foreground focus:bg-accent"
                      >
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tier */}
              <div className="space-y-2">
                <Label
                  htmlFor="player-tier"
                  className="text-sm font-medium text-foreground"
                >
                  Tier
                </Label>
                <Select
                  value={submissionTier}
                  onValueChange={setSubmissionTier}
                  required
                >
                  <SelectTrigger
                    id="player-tier"
                    className="bg-input border-border text-foreground"
                    data-ocid="submit_player.tier.select"
                    style={
                      submissionTier
                        ? { borderColor: `${getTierColor(submissionTier)}66` }
                        : {}
                    }
                  >
                    <SelectValue placeholder="Select your tier" />
                  </SelectTrigger>
                  <SelectContent style={DARK_SELECT_CONTENT_STYLE}>
                    {SUBMISSION_TIERS.map((t) => {
                      const isGrandmaster = t === "Grandmaster";
                      const isCombatMaster = t === "Combat Master";
                      return (
                        <SelectItem
                          key={t}
                          value={t}
                          className="text-foreground focus:bg-accent"
                          style={{
                            color: isGrandmaster
                              ? "oklch(0.72 0.18 295)"
                              : isCombatMaster
                                ? "oklch(0.82 0.18 85)"
                                : undefined,
                            fontWeight:
                              isGrandmaster || isCombatMaster ? 700 : undefined,
                          }}
                        >
                          {isGrandmaster ? "👑 " : isCombatMaster ? "⭐ " : ""}
                          {t}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {submitPlayer.isError && (
                <div
                  className="flex items-center gap-2 rounded-lg p-3 text-sm"
                  style={{
                    background: "oklch(0.577 0.245 27 / 0.1)",
                    border: "1px solid oklch(0.577 0.245 27 / 0.4)",
                    color: "oklch(0.75 0.15 27)",
                  }}
                  data-ocid="submit_player.error_state"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Failed to submit. Please try again.
                </div>
              )}
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="border-border text-muted-foreground hover:text-foreground"
                data-ocid="submit_player.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitPlayer.isPending || !isValid}
                className="font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.52 0.22 278), oklch(0.50 0.20 295))",
                }}
                data-ocid="submit_player.submit_button"
              >
                {submitPlayer.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Player"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
