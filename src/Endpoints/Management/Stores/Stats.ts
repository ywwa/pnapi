import { makePath } from "../../../lib";
import { AccessType, Search, type Endpoint } from "../../../types";
import { Stores } from "./Stores";

export namespace Stats {
  const base = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(Stores.byId(storeId).path, "stats"),
  });

  export const dashboard = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, "dashboard"),
    access: [AccessType.User, AccessType.Api],
    search: [Search.Timezone],
  });

  export const rangeOrders = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, "range-orders"),
    access: [AccessType.User, AccessType.Api],
    search: [Search.Timezone, Search.Start, Search.End, Search.Limit],
  });

  export const rangeProducts = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, "range-products"),
    access: [AccessType.User, AccessType.Api],
    search: [Search.Timezone, Search.Start, Search.End, Search.Limit],
  });
}
