import { AccessType, type Endpoint } from "../../types";

export const Checkouts: Endpoint = {
  version: 1,
  path: "/checkouts",
  access: [AccessType.Customer],
};
