import { Giftcard } from "../../Dtos";
import { Giftcards } from "../../Endpoints/Management";
import { BaseApi } from "../../lib";
import { Method } from "../../types";

export class GiftcardsApi extends BaseApi {
  public async create(
    body: Giftcard.Create.Body,
    storeId?: string,
  ): Promise<Giftcard.Response> {
    const data = await this.request({
      endpoint: Giftcards.base(this.storeId(storeId)),
      method: Method.POST,
      body: new Giftcard.Create.Body(body),
    });

    return new Giftcard.Response(data);
  }

  public async get(
    search?: Giftcard.Search,
    storeId?: string,
  ): Promise<Giftcard.Response[]> {
    const data = await this.request<Giftcard.Response[]>({
      endpoint: Giftcards.base(this.storeId(storeId)),
      ...(search && { search: new Giftcard.Search(search) }),
    });

    return data.map((giftcard) => new Giftcard.Response(giftcard));
  }

  public async getById(
    giftcardId: string,
    storeId?: string,
  ): Promise<Giftcard.Response> {
    const data = await this.request({
      endpoint: Giftcards.byId(this.storeId(storeId), giftcardId),
    });

    return new Giftcard.Response(data);
  }

  public async update(
    giftcardId: string,
    body: Giftcard.Update.Body,
    storeId?: string,
  ): Promise<Giftcard.Response> {
    const data = await this.request({
      endpoint: Giftcards.byId(this.storeId(storeId), giftcardId),
      method: Method.PATCH,
      body: new Giftcard.Update.Body(body),
    });

    return new Giftcard.Response(data);
  }

  public async delete(giftcardId: string, storeId?: string): Promise<void> {
    return await this.request<void>({
      endpoint: Giftcards.byId(this.storeId(storeId), giftcardId),
      method: Method.DELETE,
    });
  }
}
