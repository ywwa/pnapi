import { CartApi, CustomerApi, ProductApi, StoreApi, TagNavApi } from "../Apis";
import { CheckoutApi } from "../Apis/Storefront/Checkout";
import { BaseApi } from "../lib";
import type { Authorization, CustomerMeta } from "../types";

class Storefront extends BaseApi {
  private storeApi: StoreApi;
  private customerApi: CustomerApi;
  private productApi: ProductApi;
  private tagNavApi: TagNavApi;
  private cartApi: CartApi;
  private checkoutApi: CheckoutApi;

  public set customerMeta(props: CustomerMeta) {
    this.customer = { ...props };
  }

  public set access(access: Authorization) {
    this.config.access = access;
  }

  public get Store(): StoreApi {
    if (!this.storeApi)
      this.storeApi = new StoreApi(this.config, this.customer ?? {});

    return this.storeApi;
  }

  public get Customer(): CustomerApi {
    if (!this.customerApi) this.customerApi = new CustomerApi(this.config);

    return this.customerApi;
  }

  public get Product(): ProductApi {
    if (!this.productApi)
      this.productApi = new ProductApi(this.config, this.customer ?? {});

    return this.productApi;
  }

  public get TagNav(): TagNavApi {
    if (!this.tagNavApi) this.tagNavApi = new TagNavApi(this.config);

    return this.tagNavApi;
  }

  public get Cart(): CartApi {
    if (!this.cartApi) this.cartApi = new CartApi(this.config);

    return this.cartApi;
  }

  public get Checkout(): CheckoutApi {
    if (!this.checkoutApi) this.checkoutApi = new CheckoutApi(this.config);

    return this.checkoutApi;
  }
}

export default Storefront;
