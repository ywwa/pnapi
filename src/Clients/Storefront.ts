import { StoreApi } from "../Apis";
import { BaseApi } from "../lib";

class Storefront extends BaseApi {
  private storeApi: StoreApi;

  public get StoreApi(): StoreApi {
    if (!this.storeApi)
      this.storeApi = new StoreApi(this.config, this.customer ?? {});

    return this.storeApi;
  }
}

export default Storefront;
