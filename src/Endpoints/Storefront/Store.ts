import { AccessType, type Endpoint, Header } from "../../types";

export const Store: Endpoint = {
  version: 1,
  path: "store",
  access: [AccessType.Customer, AccessType.Anonymous],
  headers: {
    required: [Header.StoreId],
    optional: [Header.CustomerIp, Header.CustomerCountry],
  },
};
