import { BaseAPI, BaseService } from "../../base";
import ManagementEndpoints from "../../endpoints/Management";
import { type ServiceConfig } from "../../types";
import CouponAPI from "./_coupon";
import CustomerAPI from "./_customer";
import GameserverAPI from "./_gameserver";
import GiftcardAPI from "./_giftcard";
import NavlinkAPI from "./_navlink";
import OrderAPI from "./_order";
import ProductAPI from "./_product";
import SaleAPI from "./_sale";
import StoreAPI from "./_store";
import SubscriptionAPI from "./_subscription";
import TagAPI from "./_tag";

export class ManagementService extends BaseService {
  private static instance: ManagementAPI | null = null;

  constructor(config: ServiceConfig) {
    super(config);
  }

  public getInstance(): ManagementAPI {
    if (!ManagementService.instance)
      ManagementService.instance = new ManagementAPI(this.config);

    return ManagementService.instance;
  }
}

export class ManagementAPI extends BaseAPI {
  private readonly _endpoints: ManagementEndpoints;

  private readonly storeAPI: StoreAPI;
  private readonly customerAPI: CustomerAPI;
  private readonly gameserverAPI: GameserverAPI;
  private readonly productAPI: ProductAPI;
  private readonly tagAPI: TagAPI;
  private readonly navlinkAPI: NavlinkAPI;
  private readonly orderAPI: OrderAPI;
  private readonly subscriptionAPI: SubscriptionAPI;
  private readonly couponAPI: CouponAPI;
  private readonly giftcardAPI: GiftcardAPI;
  private readonly saleAPI: SaleAPI;

  constructor(config: ServiceConfig) {
    super(config);

    this._endpoints = new ManagementEndpoints();
    this.storeAPI = new StoreAPI(this.config, this._endpoints.stores);
    this.customerAPI = new CustomerAPI(this.config, this._endpoints.customers);
    this.gameserverAPI = new GameserverAPI(
      this.config,
      this._endpoints.gameservers,
    );
    this.productAPI = new ProductAPI(this.config, this._endpoints.products);
    this.tagAPI = new TagAPI(this.config, this._endpoints.tags);
    this.navlinkAPI = new NavlinkAPI(this.config, this._endpoints.navlinks);
    this.orderAPI = new OrderAPI(this.config, this._endpoints.orders);
    this.subscriptionAPI = new SubscriptionAPI(
      this.config,
      this._endpoints.subscriptions,
    );
    this.couponAPI = new CouponAPI(this.config, this._endpoints.coupons);
    this.giftcardAPI = new GiftcardAPI(this.config, this._endpoints.giftcards);
    this.saleAPI = new SaleAPI(this.config, this._endpoints.sales);
  }

  public get Stores(): StoreAPI {
    return this.storeAPI;
  }

  public get Customers(): CustomerAPI {
    return this.customerAPI;
  }

  public get Gameservers(): GameserverAPI {
    return this.gameserverAPI;
  }

  public get Products(): ProductAPI {
    return this.productAPI;
  }

  public get Tags(): TagAPI {
    return this.tagAPI;
  }

  public get Navlinks(): NavlinkAPI {
    return this.navlinkAPI;
  }

  public get Orders(): OrderAPI {
    return this.orderAPI;
  }

  public get Subscriptions(): SubscriptionAPI {
    return this.subscriptionAPI;
  }

  public get Coupons(): CouponAPI {
    return this.couponAPI;
  }

  public get Giftcards(): GiftcardAPI {
    return this.giftcardAPI;
  }

  public get Sales(): SaleAPI {
    return this.saleAPI;
  }
}
