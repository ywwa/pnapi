import { makePath } from "../../lib";
import { AccessType, Search, type Endpoint } from "../../types";
import { Stores } from "./Stores";

export namespace Subscriptions {
  export const base = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(Stores.byId(storeId).path, "subscriptions"),
    access: [AccessType.User, AccessType.Api],
    search: [Search.Limit, Search.After, Search.Before, Search.CustomerId],
  });

  export const byId = (storeId: string, subscriptionId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, subscriptionId),
    access: [AccessType.User, AccessType.Api],
  });

  export const cancel = (
    storeId: string,
    subscriptionId: string,
  ): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, subscriptionId, "cancel"),
    access: [AccessType.User, AccessType.Api],
  });
}
