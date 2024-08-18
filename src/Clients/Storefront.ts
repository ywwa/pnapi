import { CustomerApi, ProductApi, StoreApi } from "../Apis";
import { BaseApi } from "../lib";

class Storefront extends BaseApi {
  private storeApi: StoreApi;
  private customerApi: CustomerApi;
  private productApi: ProductApi;

  public get Store(): StoreApi {
    if (!this.storeApi)
      this.storeApi = new StoreApi(this.config, this.customer ?? {});

    return this.storeApi;
  }

  public get Customer(): CustomerApi {
    if (!this.customerApi)
      this.customerApi = new CustomerApi(this.config, this.customer ?? {});

    return this.customerApi;
  }

  public get Product(): ProductApi {
    if (!this.productApi)
      this.productApi = new ProductApi(this.config, this.customer ?? {});

    return this.productApi;
  }
}

export default Storefront;