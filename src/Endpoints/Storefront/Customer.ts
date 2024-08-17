import { makePath } from "../../lib";
import { AccessType, type Endpoint } from "../../types";
import { Store } from "./Store";

export namespace Customer {
  export const base: Endpoint = {
    version: 1,
    path: makePath(Store.path, "customer"),
    access: [AccessType.Customer],
  };

  export const commandDelivery: Endpoint = {
    version: 1,
    path: makePath(base.path, "command_delivery"),
    access: [AccessType.Customer],
  };
}
