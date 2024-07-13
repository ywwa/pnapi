import { BASE_URL } from "../../lib";
import { type ClientConfig, type CustomerMeta } from "../../types";
import { StorefrontEndpoints } from "../Endpoint";
import {
  CartApi,
  CheckoutApi,
  CustomerApi,
  ProductApi,
  StoreApi,
  SubscriptionApi,
  TagApi,
} from "./Storefront";
import { NavlinkApi } from "./Storefront/Navlink";

export class StorefrontApi {
  private readonly __config: ClientConfig;
  private readonly __endpoints: StorefrontEndpoints;

  private __store: StoreApi;
  private __customer: CustomerApi;
  private __product: ProductApi;
  private __subscription: SubscriptionApi;
  private __tag: TagApi;
  private __navlink: NavlinkApi;
  private __cart: CartApi;
  private __checkout: CheckoutApi;

  constructor(config: ClientConfig) {
    this.__config = config;
    this.__endpoints = new StorefrontEndpoints(BASE_URL);
  }

  public set meta(meta: CustomerMeta) {
    this.__config.customer_ip = meta.customer_ip;
    this.__config.customer_country_code = meta.customer_country_code;
  }

  public get Store(): StoreApi {
    if (!this.__store)
      this.__store = new StoreApi(this.__config, this.__endpoints.store);
    return this.__store;
  }

  public get Customer(): CustomerApi {
    if (!this.__customer)
      this.__customer = new CustomerApi(
        this.__config,
        this.__endpoints.customer,
      );

    return this.__customer;
  }

  public get Product(): ProductApi {
    if (!this.__product)
      this.__product = new ProductApi(this.__config, this.__endpoints.product);

    return this.__product;
  }

  public get Subscription(): SubscriptionApi {
    if (!this.__subscription)
      this.__subscription = new SubscriptionApi(
        this.__config,
        this.__endpoints.subscription,
      );
    return this.__subscription;
  }

  public get Tag(): TagApi {
    if (!this.__tag)
      this.__tag = new TagApi(this.__config, this.__endpoints.tag);

    return this.__tag;
  }

  public get Navlink(): NavlinkApi {
    if (!this.__navlink)
      this.__navlink = new NavlinkApi(this.__config, this.__endpoints.navlink);
    return this.__navlink;
  }

  public get Cart(): CartApi {
    if (!this.__cart)
      this.__cart = new CartApi(this.__config, this.__endpoints.cart);
    return this.__cart;
  }

  public get Checkout(): CheckoutApi {
    if (!this.__checkout)
      this.__checkout = new CheckoutApi(
        this.__config,
        this.__endpoints.checkout,
      );
    return this.__checkout;
  }
}
