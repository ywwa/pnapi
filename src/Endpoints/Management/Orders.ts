import { makePath } from "../../lib";
import { AccessType, Search, type Endpoint } from "../../types";
import { Stores } from "./Stores";

export namespace Orders {
  export const base = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(Stores.byId(storeId).path, "orders"),
    access: [AccessType.User, AccessType.Api],
    search: [
      Search.OrderId,
      Search.SubscriptionId,
      Search.IsSubscription,
      Search.Limit,
      Search.After,
      Search.Before,
    ],
  });

  export const byId = (storeId: string, orderId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, orderId),
    access: [AccessType.User, AccessType.Api],
  });
}
