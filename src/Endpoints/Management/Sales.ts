import { makePath } from "../../lib";
import { AccessType, type Endpoint } from "../../types";
import { Stores } from "./Stores";

export namespace Sales {
  export const base = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(Stores.byId(storeId).path, "sales"),
    access: [AccessType.User, AccessType.Api],
  });

  export const byId = (storeId: string, saleId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, saleId),
    access: [AccessType.User, AccessType.Api],
  });
}
