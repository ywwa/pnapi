import { makePath } from "../../../lib";
import { AccessType, Endpoint, Search } from "../../../types";
import { Stores } from "../Stores";

export namespace Customers {
  export const base = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(Stores.byId(storeId).path, "customers"),
    access: [AccessType.User, AccessType.Api],
  });

  export const byId = (storeId: string, customerId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, customerId),
    access: [AccessType.User, AccessType.Api],
  });

  export const lookup = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, "lookup"),
    access: [AccessType.User, AccessType.Api],
    search: [Search.Id, Search.SteamId, Search.MinecraftUUID, Search.Name],
  });
}
