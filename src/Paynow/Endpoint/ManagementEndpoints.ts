import {
  CouponEndpoints,
  CustomerEndpoints,
  GameserverEndpoints,
  GiftcardEndpoints,
  NavlinkEndpoints,
  OrderEndpoints,
  ProductEndpoints,
  SaleEndpoints,
  StoreEndpoints,
  SubscriptionEndpoints,
  TagEndpoints,
} from ".";
import { BaseEndpoint } from "../../lib";

export class ManagementEndpoints extends BaseEndpoint {
  private readonly __stores: StoreEndpoints;
  private readonly __customers: CustomerEndpoints;
  private readonly __gameservers: GameserverEndpoints;
  private readonly __products: ProductEndpoints;
  private readonly __tags: TagEndpoints;
  private readonly __navlinks: NavlinkEndpoints;
  private readonly __orders: OrderEndpoints;
  private readonly __subscriptions: SubscriptionEndpoints;
  private readonly __coupons: CouponEndpoints;
  private readonly __giftcards: GiftcardEndpoints;
  private readonly __sales: SaleEndpoints;

  constructor(store_id: string) {
    super(store_id);
    this.__stores = new StoreEndpoints(this._storeId);
    this.__customers = new CustomerEndpoints(this._storeId);
    this.__gameservers = new GameserverEndpoints(this._storeId);
    this.__products = new ProductEndpoints(this._storeId);
    this.__tags = new TagEndpoints(this._storeId);
    this.__navlinks = new NavlinkEndpoints(this._storeId);
    this.__orders = new OrderEndpoints(this._storeId);
    this.__subscriptions = new SubscriptionEndpoints(this._storeId);
    this.__coupons = new CouponEndpoints(this._storeId);
    this.__giftcards = new GiftcardEndpoints(this._storeId);
    this.__sales = new SaleEndpoints(this._storeId);
  }

  /** Store endpoints */
  public get stores(): StoreEndpoints {
    return this.__stores;
  }

  /** Customer endpoints */
  public get customers(): CustomerEndpoints {
    return this.__customers;
  }

  /** Gameserver endpoints */
  public get gameservers(): GameserverEndpoints {
    return this.__gameservers;
  }

  /** Product endpoints */
  public get products(): ProductEndpoints {
    return this.__products;
  }

  /** Tag endpoints */
  public get tags(): TagEndpoints {
    return this.__tags;
  }

  /** Navlink Endpoints */
  public get navlinks(): NavlinkEndpoints {
    return this.__navlinks;
  }

  /** Order endpoints */
  public get orders(): OrderEndpoints {
    return this.__orders;
  }

  /** Subscription endpoints */
  public get subscriptions(): SubscriptionEndpoints {
    return this.__subscriptions;
  }

  /** Coupon endpoints */
  public get coupons(): CouponEndpoints {
    return this.__coupons;
  }

  /** Giftcard endpoints */
  public get giftcards(): GiftcardEndpoints {
    return this.__giftcards;
  }

  /** Sale endpoints */
  public get sales(): SaleEndpoints {
    return this.__sales;
  }
}
