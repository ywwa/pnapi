import { makePath } from "../../lib";
import { AccessType, type Endpoint } from "../../types";
import { Stores } from "./Stores";

export namespace Giftcards {
  export const base = (storeId: string): Endpoint => ({
    version: 1,
    path: makePath(Stores.byId(storeId).path, "giftcards"),
    access: [AccessType.User, AccessType.Api],
  });

  export const byId = (storeId: string, giftcardId: string): Endpoint => ({
    version: 1,
    path: makePath(base(storeId).path, giftcardId),
    access: [AccessType.User, AccessType.Api],
  });
}
