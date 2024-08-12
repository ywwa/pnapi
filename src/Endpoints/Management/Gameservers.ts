import { makePath } from "../../lib";
import { AccessType, type Endpoint } from "../../types";
import { Stores } from "./Stores";

export namespace Gameservers {
  export const base = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(Stores.byId(storeId).path, "gameservers"),
    access: [AccessType.User, AccessType.Api],
  });

  export const byId = (storeId: string, gameserverId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, gameserverId),
    access: [AccessType.User, AccessType.Api],
  });

  export const resetToken = (
    storeId: string,
    gameserverId: string,
  ): Endpoint => ({
    version: 1,
    path: makePath(byId(storeId, gameserverId).path, "reset-token"),
    access: [AccessType.User, AccessType.Api],
  });
}
