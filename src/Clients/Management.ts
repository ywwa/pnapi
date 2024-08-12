import { CustomersApi, GameserversApi, StoresApi } from "../Apis/Management";
import { BaseApi } from "../lib";

class Management extends BaseApi {
  private storesApi: StoresApi;
  private customersApi: CustomersApi;
  private gameserversApi: GameserversApi;

  public get Stores(): StoresApi {
    if (!this.storesApi) this.storesApi = new StoresApi(this.config);

    return this.storesApi;
  }

  public get Customers(): CustomersApi {
    if (!this.customersApi) this.customersApi = new CustomersApi(this.config);

    return this.customersApi;
  }

  public get Gameservers(): GameserversApi {
    if (!this.gameserversApi)
      this.gameserversApi = new GameserversApi(this.config);

    return this.gameserversApi;
  }
}

export default Management;
