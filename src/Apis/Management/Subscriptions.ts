import { Subscription } from "../../Dtos";
import { Subscriptions } from "../../Endpoints/Management";
import { BaseApi } from "../../lib";
import { Method } from "../../types";

export class SubscriptionsApi extends BaseApi {
  public async get(
    search?: Subscription.Search,
    storeId?: string,
  ): Promise<Subscription.Response[]> {
    const data = await this.request<Subscription.Response[]>({
      endpoint: Subscriptions.base(this.storeId(storeId)),
      ...(search && { search: new Subscription.Search(search) }),
    });

    return data.map((subscription) => new Subscription.Response(subscription));
  }

  public async getById(
    subscriptionId: string,
    storeId?: string,
  ): Promise<Subscription.Response> {
    const data = await this.request({
      endpoint: Subscriptions.byId(this.storeId(storeId), subscriptionId),
    });

    return new Subscription.Response(data);
  }

  public async cancel(subscriptionId: string, storeId?: string): Promise<void> {
    return await this.request<void>({
      endpoint: Subscriptions.cancel(this.storeId(storeId), subscriptionId),
      method: Method.POST,
    });
  }
}
