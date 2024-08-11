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
  STORE_ID: "x-paynow-store-id",
  CUSTOMER_IP: "x-paynow-customer-ip",
  CUSTOMER_COUNTRY: "x-paynow-customer-countrycode",
} as const;

export type Header = (typeof Header)[keyof typeof Header];

export const Search = {
  ID: "id",
  STEAM_ID: "steam_id",
  MINECRAFT_UUID: "minecraft_uuid",
  ORDER_ID: "order_id",
  SUBSCRIPTION_ID: "subscription_id",
  CUSTOMER_ID: "customer_id",
  CODE: "code",
  NAME: "name",
  IS_SUBSCRIPTION: "is_subscription",
  INCLUDE_CANCELED: "include_canceled",
  LIMIT: "limit",
  TIMEZONE: "tz",
  START: "start",
  AFTER: "after",
  END: "end",
  BEFORE: "before",
} as const;

export type Search = (typeof Search)[keyof typeof Search];
