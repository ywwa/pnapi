import { Checkout } from "../../Dtos";
import { Storefront } from "../../Endpoints";
import { BaseApi } from "../../lib";
import { Method } from "../../types";

export class CheckoutApi extends BaseApi {
  public async create(body: Checkout.Body): Promise<Checkout.Response> {
    const data = await this.request({
      endpoint: Storefront.Checkouts,
      method: Method.POST,
      body: new Checkout.Body(body),
    });

    return new Checkout.Response(data);
  }
}
