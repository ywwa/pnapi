import { Item } from "../../../Dtos";
import { CommandDelivery } from "../../../Endpoints/Management";
import { BaseApi } from "../../../lib";
import { Method } from "../../../types";

export class InventoryApi extends BaseApi {
  public async get(
    customerId: string,
    storeId?: string,
  ): Promise<Item.Response[]> {
    const data = await this.request<Item.Response[]>({
      endpoint: CommandDelivery.base(this.storeId(storeId), customerId),
    });

    return data.map((item) => new Item.Response(item));
  }

  public async assign(
    customerId: string,
    body: Item.Assign.Body,
    storeId?: string,
  ): Promise<Omit<Item.Response, "customer_id">[]> {
    const data = await this.request<Omit<Item.Response, "customer_id">[]>({
      endpoint: CommandDelivery.base(this.storeId(storeId), customerId),
      method: Method.POST,
      body: new Item.Assign.Body(body),
    });

    return data.map((item) => new Item.Response(item));
  }

  public async revoke(
    customerId: string,
    itemId: string,
    storeId?: string,
  ): Promise<void> {
    return await this.request<void>({
      endpoint: CommandDelivery.byId(this.storeId(storeId), customerId, itemId),
      method: Method.DELETE,
    });
  }
}
