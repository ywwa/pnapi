import { makePath } from "../../lib";
import { AccessType, Header, Search, type Endpoint } from "../../types";

export namespace Cart {
  export const base: Endpoint = {
    version: 1,
    path: "store/cart",
    access: [AccessType.Customer],
    headers: { optional: [Header.CustomerIp, Header.CustomerCountry] },
  };

  export const lines: Endpoint = {
    ...base,
    path: makePath(base.path, "lines"),
    search: [Search.ProductId, Search.Quantity],
  };
}
