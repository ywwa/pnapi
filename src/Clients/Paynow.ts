import UsersApi from "../Apis/Paynow/Users";
import { BaseApi } from "../lib";

class Paynow extends BaseApi {
  private usersApi: UsersApi;

  public get Users(): UsersApi {
    if (!this.usersApi) this.usersApi = new UsersApi(this.config);

    return this.usersApi;
  }
}

export default Paynow;
