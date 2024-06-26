import { BaseApi } from "../../lib";
import { type ApiConfig } from "../../types";
import { ManagementEndpoints } from "../Endpoint";
import {
  CouponApi,
  CustomerApi,
  GameserverApi,
  GiftcardApi,
  NavlinkApi,
  OrderApi,
  ProductApi,
  SaleApi,
  StoreApi,
  SubscriptionApi,
  TagApi,
} from "./Management";

export class ManagementApi extends BaseApi {
  private readonly __ep: ManagementEndpoints;
  private readonly __store_api: StoreApi;
  private readonly __customer_api: CustomerApi;
  private readonly __gameserver_api: GameserverApi;
  private readonly __product_api: ProductApi;
  private readonly __tag_api: TagApi;
  private readonly __navlink_api: NavlinkApi;
  private readonly __order_api: OrderApi;
  private readonly __subscription_api: SubscriptionApi;
  private readonly __coupon_api: CouponApi;
  private readonly __giftcard_api: GiftcardApi;
  private readonly __sale_api: SaleApi;

  constructor(config: ApiConfig) {
    super(config);

    this.__ep = new ManagementEndpoints(this._config.store_id);
    this.__store_api = new StoreApi(this._config, this.__ep.stores);
    this.__customer_api = new CustomerApi(this._config, this.__ep.customers);
    this.__gameserver_api = new GameserverApi(
      this._config,
      this.__ep.gameservers,
    );
    this.__product_api = new ProductApi(this._config, this.__ep.products);
    this.__tag_api = new TagApi(this._config, this.__ep.tags);
    this.__navlink_api = new NavlinkApi(this._config, this.__ep.navlinks);
    this.__order_api = new OrderApi(this._config, this.__ep.orders);
    this.__subscription_api = new SubscriptionApi(
      this._config,
      this.__ep.subscriptions,
    );
  }

  /** Store API */
  public get Stores(): StoreApi {
    return this.__store_api;
  }

  /** Customer API */
  public get Customers(): CustomerApi {
    return this.__customer_api;
  }

  /** Gameserver API */
  public get Gameservers(): GameserverApi {
    return this.__gameserver_api;
  }

  /** Product API */
  public get Products(): ProductApi {
    return this.__product_api;
  }

  /** Tag API */
  public get Tags(): TagApi {
    return this.__tag_api;
  }

  /** Navlink API */
  public get Navlinks(): NavlinkApi {
    return this.__navlink_api;
  }

  /** Order API */
  public get Orders(): OrderApi {
    return this.__order_api;
  }

  /** Subscription API */
  public get Subscriptions(): SubscriptionApi {
    return this.__subscription_api;
  }

  /** Coupon API */
  public get Coupon(): CouponApi {
    return this.__coupon_api;
  }

  /** Giftcard API */
  public get Giftcard(): GiftcardApi {
    return this.__giftcard_api;
  }

  /** Sale API */
  public get Sale(): SaleApi {
    return this.__sale_api;
  }
}
