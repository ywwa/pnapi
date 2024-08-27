import { makePath } from "../../lib";
import { AccessType, type Endpoint } from "../../types";

export namespace DeliveryQueue {
  export const base: Endpoint = {
    version: 1,
    path: "delivery/command-queue",
    access: [AccessType.Gameserver],
  };

  export const byId = (attemptId: string): Endpoint => ({
    ...base,
    path: makePath(base.path, attemptId),
  });
}
