import { Endpoint } from "../../lib";
import {
  CartEndpoints,
  CheckoutEndpoints,
  CustomerEndpoints,
  NavlinkEndpoints,
  ProductEndpoints,
  StoreEndpoints,
  SubscriptionEndpoints,
  TagEndpoints,
} from "./Storefront";

export class StorefrontEndpoints extends Endpoint {
  private __storeEndpoints: StoreEndpoints;
  private __customerEndpoints: CustomerEndpoints;
  private __productEndpoints: ProductEndpoints;
  private __subscription: SubscriptionEndpoints;
  private __tag: TagEndpoints;
  private __navlink: NavlinkEndpoints;
  private __cart: CartEndpoints;
  private __checkout: CheckoutEndpoints;

  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public get store(): StoreEndpoints {
    if (!this.__storeEndpoints)
      this.__storeEndpoints = new StoreEndpoints(this.__baseUrl);
    return this.__storeEndpoints;
  }

  public get customer(): CustomerEndpoints {
    if (!this.__customerEndpoints)
      this.__customerEndpoints = new CustomerEndpoints(this.__baseUrl);
    return this.__customerEndpoints;
  }

  public get product(): ProductEndpoints {
    if (!this.__productEndpoints)
      this.__productEndpoints = new ProductEndpoints(this.__baseUrl);
    return this.__productEndpoints;
  }

  public get subscription(): SubscriptionEndpoints {
    if (!this.__subscription)
      this.__subscription = new SubscriptionEndpoints(this.__baseUrl);
    return this.__subscription;
  }

  public get tag(): TagEndpoints {
    if (!this.__tag) this.__tag = new TagEndpoints(this.__baseUrl);
    return this.__tag;
  }

  public get navlink(): NavlinkEndpoints {
    if (!this.__navlink) this.__navlink = new NavlinkEndpoints(this.__baseUrl);
    return this.__navlink;
  }

  public get cart(): CartEndpoints {
    if (!this.__cart) this.__cart = new CartEndpoints(this.__baseUrl);
    return this.__cart;
  }

  public get checkout(): CheckoutEndpoints {
    if (!this.__checkout)
      this.__checkout = new CheckoutEndpoints(this.__baseUrl);
    return this.__checkout;
  }
}
