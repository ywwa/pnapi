import { makePath } from "../../../lib";
import { AccessType, type Endpoint } from "../../../types";
import { Customers } from "./Customers";

export namespace CommandDelivery {
  export const base = (storeId: string, customerId: string): Endpoint => ({
    version: 1,
    path: makePath(
      Customers.byId(storeId, customerId).path,
      "command_delivery",
    ),
    access: [AccessType.User, AccessType.Api],
  });

  export const byId = (
    storeId: string,
    customerId: string,
    itemId: string,
  ): Endpoint => ({
    version: 1,
    path: makePath(base(storeId, customerId).path, itemId),
    access: [AccessType.User, AccessType.Api],
  });
}
