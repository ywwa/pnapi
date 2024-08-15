import { Sale } from "../../Dtos";
import { Sales } from "../../Endpoints/Management";
import { BaseApi } from "../../lib";
import { Method } from "../../types";

export class SalesApi extends BaseApi {
  public async create(
    body: Sale.Create.Body,
    storeId?: string,
  ): Promise<Sale.Response> {
    const data = await this.request({
      endpoint: Sales.base(this.storeId(storeId)),
      method: Method.POST,
      body: new Sale.Create.Body(body),
    });

    return new Sale.Response(data);
  }

  public async getAll(storeId?: string): Promise<Sale.Response[]> {
    const data = await this.request<Sale.Response[]>({
      endpoint: Sales.base(this.storeId(storeId)),
    });

    return data.map((sale) => new Sale.Response(sale));
  }

  public async getById(
    saleId: string,
    storeId?: string,
  ): Promise<Sale.Response> {
    const data = await this.request({
      endpoint: Sales.byId(this.storeId(storeId), saleId),
    });

    return new Sale.Response(data);
  }

  public async update(
    saleId: string,
    body: Sale.Update.Body,
    storeId?: string,
  ): Promise<Sale.Response> {
    const data = await this.request({
      endpoint: Sales.byId(this.storeId(storeId), saleId),
      method: Method.PATCH,
      body: new Sale.Update.Body(body),
    });

    return new Sale.Response(data);
  }

  public async delete(saleId: string, storeId?: string): Promise<void> {
    return await this.request<void>({
      endpoint: Sales.byId(this.storeId(storeId), saleId),
      method: Method.DELETE,
    });
  }
}
