import { Stats } from "../../../Dtos";
import { Management } from "../../../Endpoints";
import { BaseApi } from "../../../lib";

export class StatsApi extends BaseApi {
  public async dashboard(
    search?: Stats.Dashboard.Search,
    storeId?: string,
  ): Promise<Stats.Dashboard.Response> {
    const data = await this.request({
      endpoint: Management.Stats.dashboard(this.storeId(storeId)),
      ...(search && { search: new Stats.Dashboard.Search(search) }),
    });

    return new Stats.Dashboard.Response(data);
  }

  public async orders(
    search: Stats.Search,
    storeId?: string,
  ): Promise<Stats.Order.Response[]> {
    const data = await this.request<Stats.Order.Response[]>({
      endpoint: Management.Stats.rangeOrders(this.storeId(storeId)),
      search: new Stats.Search(search),
    });

    return data.map((order) => new Stats.Order.Response(order));
  }

  public async products(
    search: Stats.Search,
    storeId?: string,
  ): Promise<Stats.Product.Response[]> {
    const data = await this.request<Stats.Product.Response[]>({
      endpoint: Management.Stats.rangeProducts(this.storeId(storeId)),
      search: new Stats.Search(search),
    });

    return data.map((product) => new Stats.Product.Response(product));
  }
}
