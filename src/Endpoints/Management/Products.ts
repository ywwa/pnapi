import { makePath } from "../../lib";
import { AccessType, type Endpoint } from "../../types";
import { Stores } from "./Stores";

export namespace Products {
  export const base = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(Stores.byId(storeId).path, "products"),
    access: [AccessType.User, AccessType.Api],
  });

  export const byId = (storeId: string, productId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, productId),
    access: [AccessType.User, AccessType.Api],
  });
}
