import { Store } from "../../Dtos";
import { Storefront } from "../../Endpoints";
import { BaseApi } from "../../lib";

export class StoreApi extends BaseApi {
  public async get(
    storeId?: string,
    withMeta: boolean = false,
  ): Promise<Store.Public> {
    const data = await this.request(
      {
        endpoint: Storefront.Store,
        headers: { "x-paynow-store-id": this.storeId(storeId) },
      },
      withMeta,
    );

    return new Store.Public(data);
  }
}
