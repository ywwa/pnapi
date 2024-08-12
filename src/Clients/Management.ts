import { StoresApi } from "../Apis/Management";
import { BaseApi } from "../lib";

class Management extends BaseApi {
  private storesApi: StoresApi;

  public get Stores(): StoresApi {
    if (!this.storesApi) this.storesApi = new StoresApi(this.config);

    return this.storesApi;
  }
}

export default Management;
