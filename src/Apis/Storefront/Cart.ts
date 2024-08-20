import { Cart } from "../../Dtos";
import { Storefront } from "../../Endpoints";
import { BaseApi } from "../../lib";
import { Method } from "../../types";

export class CartApi extends BaseApi {
  public async get(): Promise<Cart.Response> {
    const data = await this.request({
      endpoint: Storefront.Cart.base,
    });

    return new Cart.Response(data);
  }

  public async empty(): Promise<void> {
    return await this.request<void>({
      endpoint: Storefront.Cart.base,
      method: Method.DELETE,
    });
  }

  public async set(search: Cart.Search): Promise<void> {
    return await this.request<void>({
      endpoint: Storefront.Cart.lines,
      method: Method.PUT,
      search: new Cart.Search(search),
    });
  }
}
