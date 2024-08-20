import { makePath } from "../../lib";
import { AccessType, type Endpoint } from "../../types";

export namespace Subscriptions {
  export const base: Endpoint = {
    version: 1,
    path: "store/customer/subscriptions",
    access: [AccessType.Customer],
  };

  export const byId = (subscriptionId: string): Endpoint => ({
    ...base,
    path: makePath(base.path, subscriptionId),
  });
}
