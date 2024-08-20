import { makePath } from "../../lib";
import { AccessType, Header, type Endpoint } from "../../types";

export namespace Products {
  export const base: Endpoint = {
    version: 1,
    path: "store/products",
    access: [AccessType.Customer, AccessType.Anonymous],
    headers: {
      required: [Header.StoreId],
      optional: [Header.CustomerIp, Header.CustomerCountry],
    },
  };

  export const byIdSlug = (productIS: string): Endpoint => ({
    ...base,
    path: makePath(base.path, productIS),
  });
}
