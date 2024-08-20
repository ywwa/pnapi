import { makePath } from "../../lib";
import { AccessType, type Endpoint } from "../../types";
import { Stores } from "./Stores";

export namespace Coupons {
  export const base = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(Stores.byId(storeId).path, "coupons"),
    access: [AccessType.User, AccessType.Api],
  });

  export const byId = (storeId: string, couponId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, couponId),
    access: [AccessType.User, AccessType.Api],
  });
}
