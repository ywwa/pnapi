import { Product } from "../../Dtos";
import { Products } from "../../Endpoints/Management";
import { BaseApi } from "../../lib";
import { Method } from "../../types";

type Response = Omit<Product.Response, "stock" | "pricing" | "currency">;

export class ProductsApi extends BaseApi {
  public async create(
    body: Product.Create.Body,
    storeId?: string,
  ): Promise<Response> {
    const data = await this.request({
      endpoint: Products.base(this.storeId(storeId)),
      method: Method.POST,
      body: new Product.Create.Body(body),
    });

    return new Product.Response(data);
  }

  public async getAll(storeId?: string): Promise<Response[]> {
    const data = await this.request<Response[]>({
      endpoint: Products.base(this.storeId(storeId)),
    });

    return data.map((product) => new Product.Response(product));
  }

  public async getById(
    productId: string,
    storeId?: string,
  ): Promise<Response> {
    const data = await this.request<Response>({
      endpoint: Products.byId(this.storeId(storeId), productId),
    });

    return new Product.Response(data);
  }

  public async update(
    productId: string,
    body: Product.Update.Body,
    storeId?: string,
  ): Promise<Response> {
    const data = await this.request({
      endpoint: Products.byId(this.storeId(storeId), productId),
      method: Method.PATCH,
      body: new Product.Update.Body(body),
    });

    return new Product.Response(data);
  }

  public async delete(productId: string, storeId?: string): Promise<void> {
    return this.request<void>({
      method: "DELETE",
      endpoint: Products.byId(this.storeId(storeId), productId),
    });
  }
}
