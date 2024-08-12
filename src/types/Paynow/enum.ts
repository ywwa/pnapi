export const Game = {
  Rust: "rust",
  GarrysMod: "gmod",
  Minecraft: "minecraft",
  MinecraftOffline: "minecraft_offline",
  SevenDaysToDie: "7d2d",
  Hurtworld: "hurtworld",
  Other: "other",
} as const;

export type Game = (typeof Game)[keyof typeof Game];

export const Currency = {
  EUR: "eur",
  USD: "usd",
  GBP: "gbp",
} as const;

export type Currency = (typeof Currency)[keyof typeof Currency];

export const Platform = {
  Steam: "steam",
  Minecraft: "minecraft",
  MinecraftOffline: "minecraft_offline",
} as const;

export type Platform = (typeof Platform)[keyof typeof Platform];

export const State = {
  Usage: "usable",
  Active: "active",
  Used: "used",
  Revoked: "revoked",
} as const;

export type State = (typeof State)[keyof typeof State];

export const Stage = {
  PURCHASE: "on_purchase",
  EXPIRE: "on_expire",
  RENEW: "on_renew",
  REFUND: "on_refund",
  CHARGEBACK: "on_chargeback",
} as const;

export type Stage = (typeof Stage)[keyof typeof Stage];

export const RevokeReason = {
  Admin: "admin",
  Refund: "refund",
  Chargeback: "chargeback",
} as const;

export type RevokeReason = (typeof RevokeReason)[keyof typeof RevokeReason];

export const Scale = {
  Day: "day",
  Week: "week",
  Month: "month",
  Year: "year",
} as const;

export type Scale = (typeof Scale)[keyof typeof Scale];
