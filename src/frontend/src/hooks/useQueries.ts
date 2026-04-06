import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Player,
  PlayerDTO,
  PlayerId,
  PlayerSubmission,
  SubmissionId,
  Tier,
} from "../backend";
import { useActor } from "./useActor";

export function useGetAllPlayers() {
  const { actor, isFetching } = useActor();
  return useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPlayers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPlayersByGamemode(gamemode: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Player[]>({
    queryKey: ["players", "gamemode", gamemode],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPlayersByGamemode(gamemode);
    },
    enabled: !!actor && !isFetching && gamemode !== "Overall",
  });
}

export function useGetPlayersByTier(tier: Tier | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Player[]>({
    queryKey: ["players", "tier", tier],
    queryFn: async () => {
      if (!actor || !tier) return [];
      return actor.getPlayersByTier(tier);
    },
    enabled: !!actor && !isFetching && !!tier,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPendingSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery<PlayerSubmission[]>({
    queryKey: ["pendingSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitPlayer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      discordUsername,
      region,
      gamemode,
      submissionTier,
    }: {
      name: string;
      discordUsername: string;
      region: string;
      gamemode: string;
      submissionTier: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitPlayer(
        name,
        discordUsername,
        region,
        gamemode,
        submissionTier,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingSubmissions"] });
    },
  });
}

export function useApproveSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      submissionId,
      tier,
      notes,
    }: {
      submissionId: SubmissionId;
      tier: Tier;
      notes: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveSubmission(submissionId, tier, notes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({ queryKey: ["pendingSubmissions"] });
    },
  });
}

export function useRejectSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (submissionId: SubmissionId) => {
      if (!actor) throw new Error("Not connected");
      return actor.rejectSubmission(submissionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingSubmissions"] });
    },
  });
}

export function useCreatePlayer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (player: PlayerDTO) => {
      if (!actor) throw new Error("Not connected");
      return actor.createPlayer(player);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
}

export function useUpdatePlayer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, player }: { id: PlayerId; player: PlayerDTO }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updatePlayer(id, player);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
}

export function useDeletePlayer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: PlayerId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deletePlayer(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
}
