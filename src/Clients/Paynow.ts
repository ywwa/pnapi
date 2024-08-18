import { UsersApi } from "../Apis";
import { BaseApi } from "../lib";
import Management from "./Management";
import Storefront from "./Storefront";

class Paynow extends BaseApi {
  private usersApi: UsersApi;
  private managementClient: Management;
  private storefrontClient: Storefront;

  public get Users(): UsersApi {
    if (!this.usersApi) this.usersApi = new UsersApi(this.config);

    return this.usersApi;
  }

  public get Management(): Management {
    if (!this.managementClient)
      this.managementClient = new Management(this.config);

    return this.managementClient;
  }

  public get Storefront(): Storefront {
    if (!this.storefrontClient)
      this.storefrontClient = new Storefront(this.config, this.customer ?? {});

    return this.storefrontClient;
  }
}

export default Paynow;
