import { makePath } from "../../../lib";
import { AccessType, Endpoint } from "../../../types";
import { Customers } from "./Customers";

export namespace Tokens {
  export const base = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(Customers.base(storeId).path, "tokens"),
    access: [AccessType.User, AccessType.Api],
  });

  export const byId = (storeId: string, customerId: string): Endpoint => ({
    version: 1,
    path: makePath(Customers.byId(storeId, customerId).path, "tokens"),
    access: [AccessType.User, AccessType.Api],
  });
}
