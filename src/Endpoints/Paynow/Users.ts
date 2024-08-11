import { AccessType, type Endpoint } from "../../types";

export namespace EUsers {
  export const me: Endpoint = {
    version: 1,
    path: "users/@me",
    access: [AccessType.User],
  };
}
