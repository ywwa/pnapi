/** Supported Games */
export enum Game {
  RUST = "rust",
}

/** Suppoerted Currencies */
export enum Currency {
  EUR = "eur",
  USD = "usd",
  GBP = "gbp",
}

/** Scale */
export enum Scale {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

/** Stage */
export enum Stage {
  PURCHASE = "on_purchase",
  EXPIRE = "on_expire",
  RENEW = "on_renew",
  REFUND = "on_refund",
  CHARGEBACK = "on_chargeback",
}

/** State */
export enum State {
  USABLE = "usable",
  ACTIVE = "active",
  USED = "used",
  REVOKED = "revoked",
}

/** Revoke Reason */
export enum RevokeReason {
  ADMIN = "admin",
  REFUND = "refund",
  CHARGEBACK = "chargeback",
}

/** Status */
export enum Status {
  CREATED = "created",
  COMPLETED = "completed",
  CANCELED = "canceled",
  REFUNDED = "refunded",
}

/** Discount Type */
export enum Discount {
  AMOUNT = "amount",
  PERCENT = "percent",
}
