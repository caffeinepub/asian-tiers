import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Check,
  Download,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  type Player,
  type PlayerDTO,
  type PlayerSubmission,
  Tier,
} from "../backend";
import {
  useApproveSubmission,
  useCreatePlayer,
  useDeletePlayer,
  useGetAllPlayers,
  useGetPendingSubmissions,
  useRejectSubmission,
  useUpdatePlayer,
} from "../hooks/useQueries";
import { GAMEMODES } from "./GamemodeTabs";
import { TIER_COLORS, TIER_LABELS } from "./TierEmblem";

interface AdminPanelProps {
  onBack: () => void;
}

const REGIONS = ["AS", "EU"];

const TIERS: Tier[] = [
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

type PlayerFormData = {
  name: string;
  discordUsername: string;
  region: string;
  tier: Tier;
  gamemode: string;
  notes: string;
};

const emptyForm: PlayerFormData = {
  name: "",
  discordUsername: "",
  region: "AS",
  tier: Tier.LT1,
  gamemode: "Mace",
  notes: "",
};

function ApproveDialog({
  submission,
  onClose,
}: {
  submission: PlayerSubmission | null;
  onClose: () => void;
}) {
  const [tier, setTier] = useState<Tier>(Tier.LT1);
  const [notes, setNotes] = useState("");
  const approve = useApproveSubmission();

  const handleApprove = async () => {
    if (!submission) return;
    try {
      await approve.mutateAsync({
        submissionId: submission.id,
        tier,
        notes,
      });
      toast.success(`${submission.name} approved as ${tier}!`);
      onClose();
    } catch {
      toast.error("Failed to approve submission.");
    }
  };

  return (
    <Dialog open={!!submission} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        style={{
          background: "oklch(0.10 0.022 262)",
          border: "1px solid oklch(0.18 0.04 245)",
        }}
        data-ocid="admin.approve.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground">Approve Player</DialogTitle>
          <DialogDescription style={{ color: "oklch(0.50 0.012 255)" }}>
            Set tier and notes for{" "}
            <span className="font-semibold text-foreground">
              {submission?.name}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label className="text-foreground">Tier</Label>
            <Select value={tier} onValueChange={(v) => setTier(v as Tier)}>
              <SelectTrigger
                className="bg-input border-border text-foreground"
                data-ocid="admin.approve.tier.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(0.10 0.022 262)",
                  border: "1px solid oklch(0.18 0.04 245)",
                }}
              >
                {TIERS.map((t) => (
                  <SelectItem key={t} value={t} className="text-foreground">
                    <span
                      style={{ color: TIER_COLORS[t] }}
                      className="font-semibold"
                    >
                      {t}
                    </span>{" "}
                    — {TIER_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Notes (optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Top UHC player in the region"
              className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
              rows={3}
              data-ocid="admin.approve.notes.textarea"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-border text-muted-foreground"
            data-ocid="admin.approve.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            disabled={approve.isPending}
            className="text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.52 0.22 278), oklch(0.50 0.20 295))",
            }}
            data-ocid="admin.approve.confirm_button"
          >
            {approve.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PlayerFormDialog({
  player,
  open,
  onClose,
}: {
  player: Player | null;
  open: boolean;
  onClose: () => void;
}) {
  const isEdit = !!player;
  const createPlayer = useCreatePlayer();
  const updatePlayer = useUpdatePlayer();

  const [form, setForm] = useState<PlayerFormData>(() =>
    player
      ? {
          name: player.name,
          discordUsername: player.discordUsername,
          region: player.region,
          tier: player.tier,
          gamemode: player.gamemode ?? "Mace",
          notes: player.notes,
        }
      : emptyForm,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dto: PlayerDTO = {
      id: player?.id ?? BigInt(0),
      name: form.name,
      discordUsername: form.discordUsername,
      region: form.region,
      tier: form.tier,
      gamemode: form.gamemode,
      notes: form.notes,
      createdAt: player?.createdAt ?? BigInt(Date.now() * 1_000_000),
    };
    try {
      if (isEdit && player) {
        await updatePlayer.mutateAsync({ id: player.id, player: dto });
        toast.success("Player updated!");
      } else {
        await createPlayer.mutateAsync(dto);
        toast.success("Player created!");
      }
      onClose();
    } catch {
      toast.error("Failed to save player.");
    }
  };

  const isPending = createPlayer.isPending || updatePlayer.isPending;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg"
        style={{
          background: "oklch(0.10 0.022 262)",
          border: "1px solid oklch(0.18 0.04 245)",
        }}
        data-ocid="admin.player_form.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isEdit ? "Edit Player" : "Add New Player"}
          </DialogTitle>
          <DialogDescription style={{ color: "oklch(0.50 0.012 255)" }}>
            {isEdit
              ? "Update player information"
              : "Create a new ranked player"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 py-2">
            {/* Name */}
            <div className="col-span-2 space-y-2">
              <Label className="text-foreground">Player Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Minecraft username"
                className="bg-input border-border text-foreground"
                required
                data-ocid="admin.player_form.name.input"
              />
            </div>
            {/* Discord */}
            <div className="col-span-2 space-y-2">
              <Label className="text-foreground">Discord Username</Label>
              <Input
                value={form.discordUsername}
                onChange={(e) =>
                  setForm((f) => ({ ...f, discordUsername: e.target.value }))
                }
                placeholder="e.g. username#1234"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                data-ocid="admin.player_form.discord.input"
              />
            </div>
            {/* Region */}
            <div className="space-y-2">
              <Label className="text-foreground">Region</Label>
              <Select
                value={form.region}
                onValueChange={(v) => setForm((f) => ({ ...f, region: v }))}
              >
                <SelectTrigger
                  className="bg-input border-border text-foreground"
                  data-ocid="admin.player_form.region.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "oklch(0.10 0.022 262)",
                    border: "1px solid oklch(0.18 0.04 245)",
                  }}
                >
                  {REGIONS.map((r) => (
                    <SelectItem key={r} value={r} className="text-foreground">
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Gamemode */}
            <div className="space-y-2">
              <Label className="text-foreground">Gamemode</Label>
              <Select
                value={form.gamemode}
                onValueChange={(v) => setForm((f) => ({ ...f, gamemode: v }))}
              >
                <SelectTrigger
                  className="bg-input border-border text-foreground"
                  data-ocid="admin.player_form.gamemode.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "oklch(0.10 0.022 262)",
                    border: "1px solid oklch(0.18 0.04 245)",
                  }}
                >
                  {GAMEMODES.filter((g) => g !== "Overall").map((g) => (
                    <SelectItem key={g} value={g} className="text-foreground">
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Tier */}
            <div className="col-span-2 space-y-2">
              <Label className="text-foreground">Tier</Label>
              <Select
                value={form.tier}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, tier: v as Tier }))
                }
              >
                <SelectTrigger
                  className="bg-input border-border text-foreground"
                  data-ocid="admin.player_form.tier.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "oklch(0.10 0.022 262)",
                    border: "1px solid oklch(0.18 0.04 245)",
                  }}
                >
                  {TIERS.map((t) => (
                    <SelectItem key={t} value={t} className="text-foreground">
                      <span
                        style={{ color: TIER_COLORS[t] }}
                        className="font-semibold"
                      >
                        {t}
                      </span>{" "}
                      — {TIER_LABELS[t]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Notes */}
            <div className="col-span-2 space-y-2">
              <Label className="text-foreground">Notes (optional)</Label>
              <Textarea
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                placeholder="e.g. Top player in Mace region"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
                rows={3}
                data-ocid="admin.player_form.notes.textarea"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border text-muted-foreground"
              data-ocid="admin.player_form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="text-white"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.52 0.22 278), oklch(0.50 0.20 295))",
              }}
              data-ocid="admin.player_form.save_button"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isEdit ? "Save Changes" : "Create Player"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [approvingSubmission, setApprovingSubmission] =
    useState<PlayerSubmission | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { data: submissions = [], isLoading: subsLoading } =
    useGetPendingSubmissions();
  const { data: players = [], isLoading: playersLoading } = useGetAllPlayers();
  const rejectSubmission = useRejectSubmission();
  const deletePlayer = useDeletePlayer();

  const handleReject = async (id: bigint) => {
    try {
      await rejectSubmission.mutateAsync(id);
      toast.success("Submission rejected.");
    } catch {
      toast.error("Failed to reject submission.");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deletePlayer.mutateAsync(id);
      toast.success("Player deleted.");
    } catch {
      toast.error("Failed to delete player.");
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(
      players.map((p) => ({
        id: Number(p.id),
        name: p.name,
        discordUsername: p.discordUsername,
        tier: p.tier,
        region: p.region,
        gamemode: p.gamemode,
        notes: p.notes,
        createdAt: Number(p.createdAt),
      })),
      null,
      2,
    );
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "players.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported players.json");
  };

  return (
    <div className="mx-auto max-w-content px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="border-border text-muted-foreground hover:text-foreground"
          data-ocid="admin.back.button"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Rankings
        </Button>
        <div>
          <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
          <p className="text-sm" style={{ color: "oklch(0.50 0.012 255)" }}>
            Manage players and submissions
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="submissions"
        className="w-full"
        data-ocid="admin.panel"
      >
        <TabsList
          className="mb-6"
          style={{
            background: "oklch(0.10 0.022 262)",
            border: "1px solid oklch(0.18 0.04 245)",
          }}
        >
          <TabsTrigger
            value="submissions"
            className="data-[state=active]:text-foreground"
            data-ocid="admin.submissions.tab"
          >
            Pending Submissions
            {submissions.length > 0 && (
              <span
                className="ml-2 rounded-full px-2 py-0.5 text-xs font-bold"
                style={{
                  background: "oklch(0.55 0.21 280 / 0.3)",
                  color: "oklch(0.72 0.18 285)",
                }}
              >
                {submissions.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="players"
            className="data-[state=active]:text-foreground"
            data-ocid="admin.players.tab"
          >
            Manage Players
          </TabsTrigger>
        </TabsList>

        {/* Pending Submissions */}
        <TabsContent value="submissions">
          {subsLoading ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="admin.submissions.loading_state"
            >
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3" />
              Loading submissions...
            </div>
          ) : submissions.length === 0 ? (
            <div
              className="text-center py-16"
              data-ocid="admin.submissions.empty_state"
            >
              <p className="text-muted-foreground">No pending submissions.</p>
            </div>
          ) : (
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: "1px solid oklch(0.18 0.04 245)",
                background: "oklch(0.09 0.020 262)",
              }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: "oklch(0.18 0.04 245)" }}>
                    <TableHead className="text-muted-foreground">
                      Player
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Discord
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Region
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Gamemode
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Self-Reported Tier
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Submitted
                    </TableHead>
                    <TableHead className="text-muted-foreground text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((sub, i) => (
                    <TableRow
                      key={Number(sub.id)}
                      style={{ borderColor: "oklch(0.18 0.04 245 / 0.4)" }}
                      data-ocid={`admin.submission.row.${i + 1}`}
                    >
                      <TableCell className="font-medium text-foreground">
                        {sub.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {sub.discordUsername || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-border text-muted-foreground"
                        >
                          {sub.region}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {sub.gamemode || "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        <span
                          className="font-semibold"
                          style={{ color: "oklch(0.72 0.18 285)" }}
                        >
                          {sub.submissionTier || "—"}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(
                          Number(sub.submittedAt) / 1_000_000,
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={() => setApprovingSubmission(sub)}
                            className="h-7 px-3 text-xs text-white"
                            style={{ background: "oklch(0.52 0.22 278)" }}
                            data-ocid={`admin.submission.approve_button.${i + 1}`}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(sub.id)}
                            disabled={rejectSubmission.isPending}
                            className="h-7 px-3 text-xs border-destructive/40 text-destructive hover:bg-destructive/10"
                            data-ocid={`admin.submission.reject_button.${i + 1}`}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* Manage Players */}
        <TabsContent value="players">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {players.length} player{players.length !== 1 ? "s" : ""} total
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleExport}
                className="border-border text-muted-foreground hover:text-foreground"
                data-ocid="admin.player.export_button"
              >
                <Download className="h-4 w-4 mr-1.5" />
                Export JSON
              </Button>
              <Button
                size="sm"
                onClick={() => setShowCreateForm(true)}
                className="text-white"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.52 0.22 278), oklch(0.50 0.20 295))",
                }}
                data-ocid="admin.player.add_button"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Add Player
              </Button>
            </div>
          </div>

          {playersLoading ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="admin.players.loading_state"
            >
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3" />
              Loading players...
            </div>
          ) : players.length === 0 ? (
            <div
              className="text-center py-16"
              data-ocid="admin.players.empty_state"
            >
              <p className="text-muted-foreground">
                No players yet. Add the first one!
              </p>
            </div>
          ) : (
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: "1px solid oklch(0.18 0.04 245)",
                background: "oklch(0.09 0.020 262)",
              }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: "oklch(0.18 0.04 245)" }}>
                    <TableHead className="text-muted-foreground">
                      Player
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Discord
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Region
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Gamemode
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Tier
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Notes
                    </TableHead>
                    <TableHead className="text-muted-foreground text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((player, i) => (
                    <TableRow
                      key={Number(player.id)}
                      style={{ borderColor: "oklch(0.18 0.04 245 / 0.4)" }}
                      data-ocid={`admin.player.row.${i + 1}`}
                    >
                      <TableCell className="font-medium text-foreground">
                        {player.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {player.discordUsername || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-border text-muted-foreground"
                        >
                          {player.region}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {player.gamemode || "—"}
                      </TableCell>
                      <TableCell>
                        <span
                          className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                          style={{
                            background: `${TIER_COLORS[player.tier]}22`,
                            color: TIER_COLORS[player.tier],
                            border: `1px solid ${TIER_COLORS[player.tier]}44`,
                          }}
                        >
                          {player.tier}
                        </span>
                      </TableCell>
                      <TableCell
                        className="text-muted-foreground text-sm max-w-[160px] truncate"
                        title={player.notes}
                      >
                        {player.notes || "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingPlayer(player)}
                            className="h-7 w-7 p-0 border-border hover:border-primary"
                            data-ocid={`admin.player.edit_button.${i + 1}`}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 w-7 p-0 border-destructive/40 text-destructive hover:bg-destructive/10"
                                data-ocid={`admin.player.delete_button.${i + 1}`}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent
                              style={{
                                background: "oklch(0.13 0.032 262)",
                                border: "1px solid oklch(0.22 0.05 245)",
                              }}
                            >
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-foreground">
                                  Delete {player.name}?
                                </AlertDialogTitle>
                                <AlertDialogDescription
                                  style={{ color: "oklch(0.50 0.012 255)" }}
                                >
                                  This will permanently remove this player from
                                  the rankings.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  className="border-border text-muted-foreground"
                                  data-ocid="admin.player.delete_cancel_button"
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(player.id)}
                                  className="bg-destructive text-white hover:bg-destructive/90"
                                  data-ocid="admin.player.delete_confirm_button"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <ApproveDialog
        submission={approvingSubmission}
        onClose={() => setApprovingSubmission(null)}
      />
      <PlayerFormDialog
        player={editingPlayer}
        open={!!editingPlayer}
        onClose={() => setEditingPlayer(null)}
      />
      <PlayerFormDialog
        player={null}
        open={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      />
    </div>
  );
}
