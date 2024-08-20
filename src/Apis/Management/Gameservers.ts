import { Gameserver } from "../../Dtos";
import { Gameservers } from "../../Endpoints/Management";
import { BaseApi } from "../../lib";
import { Method } from "../../types";

export class GameserversApi extends BaseApi {
  public async create(
    body: Gameserver.Create.Body,
    storeId?: string,
  ): Promise<Gameserver.Response> {
    const data = await this.request({
      endpoint: Gameservers.base(this.storeId(storeId)),
      method: Method.POST,
      body: new Gameserver.Create.Body(body),
    });

    return new Gameserver.Response(data);
  }

  public async getAll(storeId?: string): Promise<Gameserver.Response[]> {
    const data = await this.request<Gameserver.Response[]>({
      endpoint: Gameservers.base(this.storeId(storeId)),
    });

    return data.map((gameserver) => new Gameserver.Response(gameserver));
  }

  public async getById(
    gameserverId: string,
    storeId?: string,
  ): Promise<Gameserver.Response> {
    const data = await this.request({
      endpoint: Gameservers.byId(this.storeId(storeId), gameserverId),
    });

    return new Gameserver.Response(data);
  }

  public async update(
    gameserverId: string,
    body: Gameserver.Update.Body,
    storeId?: string,
  ): Promise<Gameserver.Response> {
    const data = await this.request({
      endpoint: Gameservers.byId(this.storeId(storeId), gameserverId),
      method: Method.PATCH,
      body: new Gameserver.Update.Body(body),
    });

    return new Gameserver.Response(data);
  }

  public async resetToken(
    gameserverId: string,
    storeId?: string,
  ): Promise<Gameserver.Response> {
    const data = await this.request({
      endpoint: Gameservers.resetToken(this.storeId(storeId), gameserverId),
      method: Method.POST,
    });

    return new Gameserver.Response(data);
  }

  public async delete(gameserverId: string, storeId?: string): Promise<void> {
    return this.request<void>({
      endpoint: Gameservers.byId(this.storeId(storeId), gameserverId),
      method: Method.DELETE,
    });
  }
}
