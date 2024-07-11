/** Supported Games */
export const Game = {
  /** Rust */
  Rust: "rust",
  /** Garry's Mod */
  Gmod: "gmod",
  /** Minecraft */
  Minecraft: "minecraft",
  /** 7 Days to Die */
  Sdtd: "7d2d",
  /** Hurtworld */
  Hurtworld: "hurtworld",
  /** Other */
  Other: "other",
} as const;

export type Game = (typeof Game)[keyof typeof Game];

/** Suppoerted Currencies */
export const Currency = {
  /** U.S. Dollar */
  USD: "usd",
  /** Euro */
  EUR: "eur",
  /** British Pound */
  GBP: "gbp",
} as const;

export type Currency = (typeof Currency)[keyof typeof Currency];

/** Scale */
export const Scale = {
  Day: "day",
  Week: "week",
  Month: "month",
  Year: "year",
} as const;

export type Scale = (typeof Scale)[keyof typeof Scale];

/** Stage */
export const Stage = {
  Purchase: "on_purchase",
  Expire: "on_expire",
  Renew: "on_renew",
  Refund: "on_refund",
  Chargeback: "on_chargeback",
};

export type Stage = (typeof Stage)[keyof typeof Stage];

/** State */
export const State = {
  Usable: "usable",
  Active: "active",
  Used: "used",
  Revoked: "revoked",
} as const;

export type State = (typeof State)[keyof typeof State];

/** Revoke Reason */
export const RevokeReason = {
  Admin: "admin",
  Refund: "refund",
  Chargeback: "chargeback",
} as const;

export type RevokeReason = (typeof RevokeReason)[keyof typeof RevokeReason];

/** Status */
export const Status = {
  Created: "created",
  Completed: "completed",
  Canceled: "canceled",
  Refunded: "refunded",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

/** Discount Type */
export const Discount = {
  Amount: "amount",
  Percent: "percent",
} as const;

export type Discount = (typeof Discount)[keyof typeof Discount];
