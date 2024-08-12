import { Member } from "../../../Dtos";
import { Management } from "../../../Endpoints";
import { BaseApi } from "../../../lib";

export class MembersApi extends BaseApi {
  public async getAll(storeId?: string): Promise<Member.Response[]> {
    const data = await this.request<Member.Response[]>({
      endpoint: Management.Members.base(this.storeId(storeId)),
    });

    return data.map((member) => new Member.Response(member));
  }

  public async getById(
    userId: string,
    storeId?: string,
  ): Promise<Member.Response> {
    const data = await this.request({
      endpoint: Management.Members.byId(this.storeId(storeId), userId),
    });

    return new Member.Response(data);
  }

  public async setRole(
    userId: string,
    body: Member.Role.Body,
    storeId?: string,
  ): Promise<Member.Response> {
    const data = await this.request({
      endpoint: Management.Members.setRole(this.storeId(storeId), userId),
      body: new Member.Role.Body(body),
    });

    return new Member.Response(data);
  }
}
