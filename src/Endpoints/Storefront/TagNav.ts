import { AccessType, type Endpoint, Header } from "../../types";

export namespace TagNav {
  export const tags: Endpoint = {
    version: 1,
    path: "store/tags",
    access: [AccessType.Anonymous, AccessType.Customer],
    headers: { required: [Header.StoreId] },
  };

  export const navlinks: Endpoint = {
    version: 1,
    path: "store/navlinks",
    access: [AccessType.Anonymous, AccessType.Customer],
    headers: { required: [Header.StoreId] },
  };
}
