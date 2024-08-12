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
