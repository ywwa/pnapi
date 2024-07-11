import { Endpoint } from "../../lib";
import {
  CouponsEndpoints,
  CustomersEndpoints,
  GameserversEndpoints,
  GiftcardsEndpoints,
  NavlinksEndpoints,
  OrdersEndpoints,
  ProductsEndpoints,
  SalesEndpoints,
  StoresEndpoints,
  SubscriptionsEndpoints,
  TagsEndpoints,
} from "./Management";

export class ManagementEndpoints extends Endpoint {
  private __storesEndpoints: StoresEndpoints;
  private __customersEndpoints: { [storeId: string]: CustomersEndpoints } = {};
  private __gameserversEndpoints: { [storeId: string]: GameserversEndpoints } =
    {};
  private __productsEndpoints: { [storeId: string]: ProductsEndpoints } = {};
  private __tagsEndpoints: { [storeId: string]: TagsEndpoints } = {};
  private __navlinksEndpoints: { [storeId: string]: NavlinksEndpoints } = {};
  private __ordersEndpoints: { [storeId: string]: OrdersEndpoints } = {};
  private __subscriptionsEndpoints: {
    [storeId: string]: SubscriptionsEndpoints;
  } = {};
  private __couponsEndpoints: {
    [storeId: string]: CouponsEndpoints;
  } = {};
  private __giftcardsEndpoints: {
    [storeId: string]: GiftcardsEndpoints;
  } = {};
  private __salesEndpoints: {
    [storeId: string]: SalesEndpoints;
  } = {};

  constructor(baseUrl: string) {
    super(baseUrl);
    this.__storesEndpoints = new StoresEndpoints(this.__baseUrl);
  }

  /**
   * Get the instance of StoresEndpoints.
   * @returns The instance of StoresEndpoints.
   */
  public get stores(): StoresEndpoints {
    return this.__storesEndpoints;
  }

  public customers(storeId: string): CustomersEndpoints {
    if (!this.__customersEndpoints[storeId]) {
      const storeUrl = this.__storesEndpoints.byId(storeId);
      this.__customersEndpoints[storeId] = new CustomersEndpoints(storeUrl);
    }

    return this.__customersEndpoints[storeId];
  }

  public gameservers(storeId: string): GameserversEndpoints {
    if (!this.__gameserversEndpoints[storeId]) {
      const storeUrl = this.__storesEndpoints.byId(storeId);
      this.__gameserversEndpoints[storeId] = new GameserversEndpoints(storeUrl);
    }

    return this.__gameserversEndpoints[storeId];
  }

  public products(storeId: string): ProductsEndpoints {
    if (!this.__productsEndpoints[storeId]) {
      const storeUrl = this.__storesEndpoints.byId(storeId);
      this.__productsEndpoints[storeId] = new ProductsEndpoints(storeUrl);
    }

    return this.__productsEndpoints[storeId];
  }

  public tags(storeId: string): TagsEndpoints {
    if (!this.__tagsEndpoints[storeId]) {
      const storeUrl = this.__storesEndpoints.byId(storeId);
      this.__tagsEndpoints[storeId] = new TagsEndpoints(storeUrl);
    }

    return this.__tagsEndpoints[storeId];
  }

  public navlinks(storeId: string): NavlinksEndpoints {
    if (!this.__navlinksEndpoints[storeId]) {
      const storeUrl = this.__storesEndpoints.byId(storeId);
      this.__navlinksEndpoints[storeId] = new NavlinksEndpoints(storeUrl);
    }

    return this.__navlinksEndpoints[storeId];
  }

  public orders(storeId: string): OrdersEndpoints {
    if (!this.__ordersEndpoints[storeId]) {
      const storeUrl = this.__storesEndpoints.byId(storeId);
      this.__ordersEndpoints[storeId] = new OrdersEndpoints(storeUrl);
    }

    return this.__ordersEndpoints[storeId];
  }

  public subscriptions(storeId: string): SubscriptionsEndpoints {
    if (!this.__subscriptionsEndpoints[storeId]) {
      const storeUrl = this.__storesEndpoints.byId(storeId);
      this.__subscriptionsEndpoints[storeId] = new SubscriptionsEndpoints(
        storeUrl,
      );
    }

    return this.__subscriptionsEndpoints[storeId];
  }

  public coupons(storeId: string): CouponsEndpoints {
    if (!this.__couponsEndpoints[storeId]) {
      const storeUrl = this.__storesEndpoints.byId(storeId);
      this.__couponsEndpoints[storeId] = new CouponsEndpoints(storeUrl);
    }

    return this.__couponsEndpoints[storeId];
  }

  public giftcards(storeId: string): GiftcardsEndpoints {
    if (!this.__giftcardsEndpoints[storeId]) {
      const storeUrl = this.__storesEndpoints.byId(storeId);
      this.__giftcardsEndpoints[storeId] = new GiftcardsEndpoints(storeUrl);
    }

    return this.__giftcardsEndpoints[storeId];
  }
  public sales(storeId: string): SalesEndpoints {
    if (!this.__salesEndpoints[storeId]) {
      const storeUrl = this.__storesEndpoints.byId(storeId);
      this.__salesEndpoints[storeId] = new SalesEndpoints(storeUrl);
    }

    return this.__salesEndpoints[storeId];
  }
}
