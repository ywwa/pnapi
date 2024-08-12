import { makePath } from "../../../lib";
import { AccessType, type Endpoint } from "../../../types";
import { Stores } from "./Stores";

export namespace Members {
  export const base = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(Stores.byId(storeId).path, "members"),
    access: [AccessType.User, AccessType.Api],
  });

  export const byId = (storeId: string, userId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, userId),
    access: [AccessType.User, AccessType.Api],
  });

  export const setRole = (storeId: string, userId: string): Endpoint => ({
    version: 1,
    path: makePath(byId(storeId, userId).path, "set-role"),
    access: [AccessType.User, AccessType.Api],
  });
}
