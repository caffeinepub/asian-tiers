import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type PlayerId = bigint;
export interface PlayerDTO {
    id: PlayerId;
    region: string;
    name: string;
    createdAt: Time;
    tier: Tier;
    notes: string;
    discordUsername: string;
    gamemode: Gamemode;
}
export interface Player {
    id: PlayerId;
    region: string;
    name: string;
    createdAt: Time;
    tier: Tier;
    notes: string;
    discordUsername: string;
    gamemode: Gamemode;
}
export type Time = bigint;
export type Gamemode = string;
export interface PlayerSubmission {
    id: SubmissionId;
    region: string;
    name: string;
    submittedAt: Time;
    discordUsername: string;
    gamemode: Gamemode;
    submissionTier: string;
}
export interface UserProfile {
    name: string;
}
export type SubmissionId = bigint;
export enum Tier {
    HT1 = "HT1",
    HT2 = "HT2",
    HT3 = "HT3",
    HT4 = "HT4",
    HT5 = "HT5",
    LT1 = "LT1",
    LT2 = "LT2",
    LT3 = "LT3",
    LT4 = "LT4",
    LT5 = "LT5"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    approveSubmission(submissionId: SubmissionId, tier: Tier, notes: string): Promise<Player>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPlayer(player: PlayerDTO): Promise<Player>;
    deletePlayer(id: PlayerId): Promise<void>;
    getAllPlayers(): Promise<Array<Player>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPendingSubmissions(): Promise<Array<PlayerSubmission>>;
    getPlayersByGamemode(gamemode: Gamemode): Promise<Array<Player>>;
    getPlayersByName(searchTerm: string): Promise<Array<Player>>;
    getPlayersByRegion(region: string): Promise<Array<Player>>;
    getPlayersByTier(tier: Tier): Promise<Array<Player>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    rejectSubmission(submissionId: SubmissionId): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitPlayer(name: string, discordUsername: string, region: string, gamemode: Gamemode, submissionTier: string): Promise<void>;
    updatePlayer(id: PlayerId, player: PlayerDTO): Promise<Player>;
}
