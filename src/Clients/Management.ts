import { CustomersApi, StoresApi } from "../Apis/Management";
import { BaseApi } from "../lib";

class Management extends BaseApi {
  private storesApi: StoresApi;
  private customersApi: CustomersApi;

  public get Stores(): StoresApi {
    if (!this.storesApi) this.storesApi = new StoresApi(this.config);

    return this.storesApi;
  }

  public get Customers(): CustomersApi {
    if (!this.customersApi) this.customersApi = new CustomersApi(this.config);

    return this.customersApi;
  }
}

export default Management;
