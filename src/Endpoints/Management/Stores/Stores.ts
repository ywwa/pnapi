import { makePath } from "../../../lib";
import { AccessType, type Endpoint } from "../../../types";

export namespace Stores {
  export const base: Endpoint = {
    version: 1,
    path: "stores",
    access: [AccessType.User, AccessType.Api],
  };

  export const byId = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(base.path, storeId),
    access: [AccessType.User, AccessType.Api],
  });
}
