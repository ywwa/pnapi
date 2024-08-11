import { User } from "../../Dtos";
import { EUsers } from "../../Endpoints";
import { BaseApi } from "../../lib";

class UsersApi extends BaseApi {
  /** Get the currently authenticated user. */
  public async me(): Promise<User.Response> {
    const data = await this.request({
      endpoint: EUsers.me,
    });

    return new User.Response(data);
  }
}

export default UsersApi;
