import { Navlink } from "../../Dtos";
import { Navlinks } from "../../Endpoints/Management";
import { BaseApi } from "../../lib";
import { Method } from "../../types";

type TNavlink = Omit<Navlink.Response, "tag_query" | "children">;

export class NavlinksApi extends BaseApi {
  public async create(
    body: Navlink.Create.Body,
    storeId?: string,
  ): Promise<TNavlink> {
    const data = await this.request({
      endpoint: Navlinks.base(this.storeId(storeId)),
      method: Method.POST,
      body: new Navlink.Create.Body(body),
    });

    return new Navlink.Response(data);
  }

  public async getAll(storeId?: string): Promise<TNavlink[]> {
    const data = await this.request<Navlink.Response[]>({
      endpoint: Navlinks.base(this.storeId(storeId)),
    });

    return data.map((navlink) => new Navlink.Response(navlink));
  }

  public async getById(nodeId: string, storeId?: string): Promise<TNavlink> {
    const data = await this.request({
      endpoint: Navlinks.byId(this.storeId(storeId), nodeId),
    });

    return new Navlink.Response(data);
  }

  public async update(
    nodeId: string,
    body: Navlink.Update.Body,
    storeId?: string,
  ): Promise<TNavlink> {
    const data = await this.request({
      endpoint: Navlinks.byId(this.storeId(storeId), nodeId),
      method: Method.PATCH,
      body: new Navlink.Update.Body(body),
    });

    return new Navlink.Response(data);
  }

  public async sort(body: Navlink.Sort.Body, storeId?: string): Promise<void> {
    return await this.request({
      endpoint: Navlinks.sortOrders(this.storeId(storeId)),
      method: Method.PATCH,
      body: new Navlink.Sort.Body(body),
    });
  }

  public async delete(nodeId: string, storeId?: string): Promise<void> {
    return await this.request({
      endpoint: Navlinks.byId(this.storeId(storeId), nodeId),
      method: Method.DELETE,
    });
  }
}
