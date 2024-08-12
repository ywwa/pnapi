import { Store } from "../../../Dtos";
import { Management } from "../../../Endpoints";
import { BaseApi } from "../../../lib";
import { Method } from "../../../types";
import { MembersApi } from "./Members";

export class StoresApi extends BaseApi {
  private membersApi: MembersApi;

  public async create(body: Store.Create.Body): Promise<Store.Response> {
    const data = await this.request({
      endpoint: Management.Stores.base,
      method: Method.POST,
      body: new Store.Create.Body(body),
    });

    return new Store.Response(data);
  }

  public async get(storeId?: string): Promise<Store.Response> {
    const data = await this.request({
      endpoint: Management.Stores.byId(this.storeId(storeId)),
    });

    return new Store.Response(data);
  }

  public async getAll(): Promise<Store.Response[]> {
    const data = await this.request<Store.Response[]>({
      endpoint: Management.Stores.base,
    });

    return data.map((store) => new Store.Response(store));
  }

  public async update(
    body: Store.Update.Body,
    storeId?: string,
  ): Promise<Store.Response> {
    const data = await this.request({
      endpoint: Management.Stores.byId(this.storeId(storeId)),
      method: Method.PATCH,
      body: new Store.Update.Body(body),
    });

    return new Store.Response(data);
  }

  public async delete(storeId?: string): Promise<void> {
    return await this.request<void>({
      endpoint: Management.Stores.byId(this.storeId(storeId)),
      method: Method.DELETE,
    });
  }

  public get Members(): MembersApi {
    if (!this.membersApi) this.membersApi = new MembersApi(this.config);
    return this.membersApi;
  }
}
