import { makePath } from "../../lib";
import { AccessType, type Endpoint } from "../../types";
import { Stores } from "./Stores";

export namespace Tags {
  export const base = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(Stores.byId(storeId).path, "tags"),
    access: [AccessType.User, AccessType.Api],
  });

  export const byId = (storeId: string, tagId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, tagId),
    access: [AccessType.User, AccessType.Api],
  });
}
