/** Supported Games */
export const Games = {
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

export type Game = (typeof Games)[keyof typeof Games];

/** Suppoerted Currencies */
export const Currencies = {
  /** U.S. Dollar */
  USD: "usd",
  /** Euro */
  EUR: "eur",
  /** British Pound */
  GBP: "gbp",
} as const;

export type Currency = (typeof Currencies)[keyof typeof Currencies];

/** Scale */
export const Scales = {
  Day: "day",
  Week: "week",
  Month: "month",
  Year: "year",
} as const;

export type Scale = (typeof Scales)[keyof typeof Scales];

/** Stage */
export const Stages = {
  Purchase: "on_purchase",
  Expire: "on_expire",
  Renew: "on_renew",
  Refund: "on_refund",
  Chargeback: "on_chargeback",
};

export type Stage = (typeof Stages)[keyof typeof Stages];

/** State */
export const States = {
  Usable: "usable",
  Active: "active",
  Used: "used",
  Revoked: "revoked",
} as const;

export type State = (typeof States)[keyof typeof States];

/** Revoke Reason */
export const RevokeReasons = {
  Admin: "admin",
  Refund: "refund",
  Chargeback: "chargeback",
} as const;

export type RevokeReason = (typeof RevokeReasons)[keyof typeof RevokeReasons];

/** Status */
export const Statuses = {
  Created: "created",
  Completed: "completed",
  Canceled: "canceled",
  Refunded: "refunded",
} as const;

export type Status = (typeof Statuses)[keyof typeof Statuses];

/** Discount Type */
export const Discounts = {
  Amount: "amount",
  Percent: "percent",
} as const;

export type Discount = (typeof Discounts)[keyof typeof Discounts];
