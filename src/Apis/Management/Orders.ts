import { Order } from "../../Dtos";
import { Orders } from "../../Endpoints/Management";
import { BaseApi } from "../../lib";

export class OrdersApi extends BaseApi {
  public async get(
    search?: Order.Search,
    storeId?: string,
  ): Promise<Order.Response[]> {
    const data = await this.request<Order.Response[]>({
      endpoint: Orders.base(this.storeId(storeId)),
      ...(search && { search: new Order.Search(search) }),
    });

    return data.map((order) => new Order.Response(order));
  }

  public async getById(
    orderId: string,
    storeId?: string,
  ): Promise<Order.Response> {
    const data = await this.request({
      endpoint: Orders.byId(this.storeId(storeId), orderId),
    });

    return new Order.Response(data);
  }
}
