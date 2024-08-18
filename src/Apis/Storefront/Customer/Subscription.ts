import { Customer, Subscription } from "../../../Dtos";
import { Storefront } from "../../../Endpoints";
import { BaseApi } from "../../../lib";
import { Method, SchemaOptions, TResponse } from "../../../types";

type CleanCustomer = Pick<
  Subscription.Response["customer"],
  | "id"
  | "profile"
  | "steam_id"
  | "steam"
  | "minecraft_uuid"
  | "minecraft"
  | "name"
>;

type Response = Omit<
  Subscription.Response,
  "customer" | "customer_ip" | "pricing_region_id"
> & { customer: CleanCustomer };

const options: SchemaOptions<TResponse<typeof Subscription.Schema>> = {
  omit: {
    customer: true,
    customer_ip: true,
    pricing_region_id: true,
  },
  extend: {
    customer: Customer.Schema.pick({
      id: true,
      profile: true,
      steam_id: true,
      steam: true,
      minecraft_uuid: true,
      minecraft: true,
      name: true,
    }),
  },
};

export class SubscriptionApi extends BaseApi {
  public async getAll(): Promise<Response[]> {
    const data = await this.request<Response[]>({
      endpoint: Storefront.Subscriptions.base,
    });

    return data.map(
      (subscription) => new Subscription.Response(subscription, options),
    );
  }

  public async getById(subscriptionId: string): Promise<Response> {
    const data = await this.request({
      endpoint: Storefront.Subscriptions.byId(subscriptionId),
    });

    return new Subscription.Response(data, options);
  }

  public async cancel(subscriptionId: string): Promise<void> {
    return await this.request({
      endpoint: Storefront.Subscriptions.byId(subscriptionId),
      method: Method.DELETE,
    });
  }
}
