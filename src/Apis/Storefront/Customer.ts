import { z } from "zod";
import { Customer, Item } from "../../Dtos";
import { Storefront } from "../../Endpoints";
import { BaseApi } from "../../lib";

type TItem = Pick<
  Item.Response,
  | "id"
  | "store_id"
  | "subscription_id"
  | "order_id"
  | "order_line_id"
  | "quantity_index"
  | "execute_on_gameserver_id"
  | "product"
  | "state"
  | "expirable"
  | "gift"
  | "added_at"
  | "active_at"
  | "expires_at"
  | "removed_at"
  | "customer_id"
  | "revoke_reason"
>;

export class CustomerApi extends BaseApi {
  public async get(): Promise<
    Omit<Customer.Response, "created_by" | "updated_by" | "metadata">
  > {
    const data = await this.request({ endpoint: Storefront.Customer.base });
    return new Customer.Response(data, {
      omit: { metadata: true, created_by: true, updated_by: true },
    });
  }

  public async inventory(): Promise<TItem[]> {
    const data = await this.request<TItem[]>({
      endpoint: Storefront.Customer.commandDelivery,
    });

    return data.map(
      (item) =>
        new Item.Response(item, {
          pick: {
            id: true,
            store_id: true,
            subscription_id: true,
            order_id: true,
            order_line_id: true,
            quantity_index: true,
            execute_on_gameserver_id: true,
            product: true,
            state: true,
            expirable: true,
            gift: true,
            added_at: true,
            active_at: true,
            expires_at: true,
            removed_at: true,
            revoke_reason: true,
          },
          extend: { customer_id: z.string() },
        }),
    );
  }
}
