import { makePath } from "../../lib";
import { AccessType, type Endpoint } from "../../types";
import { Stores } from "./Stores";

export namespace Navlinks {
  export const base = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(Stores.byId(storeId).path, "navlinks"),
    access: [AccessType.User, AccessType.Api],
  });

  export const byId = (storeId: string, nodeId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, nodeId),
    access: [AccessType.User, AccessType.Api],
  });

  export const sortOrders = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, "sort-orders"),
    access: [AccessType.User, AccessType.Api],
  });
}
