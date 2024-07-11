import { BASE_URL } from "../../lib";
import { type ClientConfig } from "../../types";
import { ManagementEndpoints } from "../Endpoint";
import {
  CouponsApi,
  CustomersApi,
  GameserversApi,
  GiftcardsApi,
  NavlinksApi,
  OrdersApi,
  ProductsApi,
  SalesApi,
  StoresApi,
  SubscriptionsApi,
  TagsApi,
} from "./Management";

export class ManagementApi {
  private readonly __config: ClientConfig;
  private readonly __endpoints: ManagementEndpoints;
  private __stores: StoresApi;
  private __customers: { [storeId: string]: CustomersApi } = {};
  private __gameservers: { [storeId: string]: GameserversApi } = {};
  private __products: { [storeId: string]: ProductsApi } = {};
  private __tags: { [storeId: string]: TagsApi } = {};
  private __navlinks: { [storeId: string]: NavlinksApi } = {};
  private __orders: { [storeId: string]: OrdersApi } = {};
  private __subscriptions: { [storeId: string]: SubscriptionsApi } = {};
  private __coupons: { [storeId: string]: CouponsApi } = {};
  private __giftcards: { [storeId: string]: GiftcardsApi } = {};
  private __sales: { [storeId: string]: SalesApi } = {};

  constructor(config: ClientConfig) {
    this.__config = config;
    this.__endpoints = new ManagementEndpoints(BASE_URL);
  }

  public get Stores(): StoresApi {
    if (!this.__stores) {
      this.__stores = new StoresApi(this.__config, this.__endpoints.stores);
    }

    return this.__stores;
  }

  public Customers(storeId?: string): CustomersApi {
    if (!storeId && !this.__config.store_id)
      throw new Error("storeId or config.store_id is required");

    let id: string;
    id = storeId || this.__config.store_id!;

    if (!this.__customers[id]) {
      this.__customers[id] = new CustomersApi(
        this.__config,
        this.__endpoints.customers(id),
      );
    }

    return this.__customers[id];
  }

  public Gameservers(storeId?: string): GameserversApi {
    if (!storeId && !this.__config.store_id)
      throw new Error("storeId or config.store_id is required");

    let id: string;
    id = storeId || this.__config.store_id!;

    if (!this.__gameservers[id])
      this.__gameservers[id] = new GameserversApi(
        this.__config,
        this.__endpoints.gameservers(id),
      );

    return this.__gameservers[id];
  }

  public Products(storeId?: string): ProductsApi {
    if (!storeId && !this.__config.store_id)
      throw new Error("storeId or config.store_id is required");

    let id: string;
    id = storeId || this.__config.store_id!;

    if (!this.__products[id])
      this.__products[id] = new ProductsApi(
        this.__config,
        this.__endpoints.products(id),
      );

    return this.__products[id];
  }

  public Tags(storeId?: string): TagsApi {
    if (!storeId && !this.__config.store_id)
      throw new Error("storeId or config.store_id is required");

    let id: string;
    id = storeId || this.__config.store_id!;

    if (!this.__tags[id])
      this.__tags[id] = new TagsApi(this.__config, this.__endpoints.tags(id));

    return this.__tags[id];
  }

  public Navlinks(storeId?: string): NavlinksApi {
    if (!storeId && !this.__config.store_id)
      throw new Error("storeId or config.store_id is required");

    let id: string;
    id = storeId || this.__config.store_id!;

    if (!this.__navlinks[id])
      this.__navlinks[id] = new NavlinksApi(
        this.__config,
        this.__endpoints.navlinks(id),
      );

    return this.__navlinks[id];
  }

  public Orders(storeId?: string): OrdersApi {
    if (!storeId && !this.__config.store_id)
      throw new Error("storeId or config.store_id is required");

    let id: string;
    id = storeId || this.__config.store_id!;

    if (!this.__orders[id])
      this.__orders[id] = new OrdersApi(
        this.__config,
        this.__endpoints.orders(id),
      );

    return this.__orders[id];
  }

  public Subscriptions(storeId?: string): SubscriptionsApi {
    if (!storeId && !this.__config.store_id)
      throw new Error("storeId or config.store_id is required");

    let id: string;
    id = storeId || this.__config.store_id!;

    if (!this.__subscriptions[id])
      this.__subscriptions[id] = new SubscriptionsApi(
        this.__config,
        this.__endpoints.subscriptions(id),
      );

    return this.__subscriptions[id];
  }

  public Coupons(storeId?: string): CouponsApi {
    if (!storeId && !this.__config.store_id)
      throw new Error("storeId or config.store_id is required");

    let id: string;
    id = storeId || this.__config.store_id!;

    if (!this.__coupons[id])
      this.__coupons[id] = new CouponsApi(
        this.__config,
        this.__endpoints.coupons(id),
      );

    return this.__coupons[id];
  }

  public Giftcards(storeId?: string): GiftcardsApi {
    if (!storeId && !this.__config.store_id)
      throw new Error("storeId or config.store_id is required");

    let id: string;
    id = storeId || this.__config.store_id!;

    if (!this.__giftcards[id])
      this.__giftcards[id] = new GiftcardsApi(
        this.__config,
        this.__endpoints.giftcards(id),
      );

    return this.__giftcards[id];
  }

  public Sales(storeId?: string): SalesApi {
    if (!storeId && !this.__config.store_id)
      throw new Error("storeId or config.store_id is required");

    let id: string;
    id = storeId || this.__config.store_id!;

    if (!this.__sales[id])
      this.__sales[id] = new SalesApi(
        this.__config,
        this.__endpoints.sales(id),
      );

    return this.__sales[id];
  }
}
