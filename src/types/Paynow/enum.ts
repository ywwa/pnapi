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

export const Status = {
  Created: "created",
  Completed: "completed",
  Canceled: "canceled",
  Refunded: "refunded",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export const NotTaxedReason = {
  NotTaxedReasonExempt: "exempt",
  NotTaxedReasonNoTax: "no_tax",
  NotTaxedReasonNotCollecting: "not_collecting",
  NotTaxedReasonProductNotTaxed: "product_not_taxed",
} as const;

export type NotTaxedReason =
  (typeof NotTaxedReason)[keyof typeof NotTaxedReason];

export const DeclineCode = {
  Unknown: "unknown",
  GenericDecline: "generic_decline",
  CallIssuer: "call_issuer",
  AuthenticationRequired: "authentication_required",
  CurrencyNotSupported: "currency_not_supported",
  DuplicateTransaction: "duplicate_transaction",
  ExpiredCard: "expired_card",
  Fraudulent: "fraudulent",
  IncorrectNumber: "incorrect_number",
  IncorrectCvc: "incorrect_cvc",
  IncorrectPin: "incorrect_pin",
  IncorrectZip: "incorrect_zip",
  InsufficientFunds: "insufficient_funds",
  InvalidAccount: "invalid_account",
  InvalidAmount: "invalid_amount",
  InvalidExpiryMonth: "invalid_expiry_month",
  InvalidExpiryYear: "invalid_expiry_year",
  IssuerNotAvailable: "issuer_not_available",
  LostCard: "lost_card",
  MerchantBlacklist: "merchant_blacklist",
  NewAccountInformationAvailable: "new_account_information_available",
  NoActionTaken: "no_action_taken",
  PicupCard: "pickup_card",
  PinTryExceeded: "pin_try_exceeded",
  RestrictedCard: "restricted_card",
  StolenCard: "stolen_card",
  TestmodeDecline: "testmode_decline",
  TryAgainLater: "try_again_later",
  SecurityViolation: "security_violation",
  CardVelocityExceeded: "card_velocity_exceeded",
  DoNotHonor: "do_not_honor",
  ProcessingError: "processing_error",
  CardNotSupported: "card_not_supported",
  TransactionNotAllowed: "transaction_not_allowed",
} as const;

export type DeclineCode = (typeof DeclineCode)[keyof typeof DeclineCode];

export const DiscountType = { Amount: "amount", Percent: "percent" } as const;

export type DiscountType = (typeof DiscountType)[keyof typeof DiscountType];
