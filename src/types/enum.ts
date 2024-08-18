/** Supported Access Types */
export const AccessType = {
  User: "user",
  Api: "apikey",
  Customer: "customer",
  Gameserver: "gameserver",
  Anonymous: "anonymous",
} as const;

export type AccessType = (typeof AccessType)[keyof typeof AccessType];

/** Supported HTTP Methods */
export const Method = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export type Method = (typeof Method)[keyof typeof Method];

/** Headers used in Paynow API */
export const Header = {
  StoreId: "x-paynow-store-id",
  CustomerIp: "x-paynow-customer-ip",
  CustomerCountry: "x-paynow-customer-countrycode",
} as const;

export type Header = (typeof Header)[keyof typeof Header];

export const Search = {
  Id: "id",
  SteamId: "steam_id",
  MinecraftUUID: "minecraft_uuid",
  OrderId: "order_id",
  SubscriptionId: "subscription_id",
  ProductId: "product_id",
  CustomerId: "customer_id",
  Code: "code",
  Name: "name",
  IsSubscription: "is_subscription",
  IncludeCanceled: "include_canceled",
  Limit: "limit",
  Quantity: "quantity",
  Timezone: "tz",
  Start: "start",
  After: "after",
  End: "end",
  Before: "before",
} as const;

export type Search = (typeof Search)[keyof typeof Search];
