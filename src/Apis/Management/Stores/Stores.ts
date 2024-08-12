import { Store } from "../../../Dtos";
import { Management } from "../../../Endpoints";
import { BaseApi } from "../../../lib";

export class StoresApi extends BaseApi {
  public async get(storeId?: string): Promise<Store.Response> {
    const data = await this.request({
      endpoint: Management.Stores.byId(this.storeId(storeId)),
    });

    return new Store.Response(data);
  }
}
