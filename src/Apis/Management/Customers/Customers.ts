import { Customer } from "../../../Dtos";
import { Customers } from "../../../Endpoints/Management";
import { BaseApi } from "../../../lib";
import { Method } from "../../../types";
import { InventoryApi } from "./Inventory";
import { TokensApi } from "./Tokens";

export class CustomersApi extends BaseApi {
  private tokensApi: TokensApi;
  private inventoryApi: InventoryApi;

  public async create(
    body: Customer.Create.Body,
    storeId?: string,
  ): Promise<Customer.Response> {
    const data = await this.request({
      endpoint: Customers.base(this.storeId(storeId)),
      method: Method.POST,
      body: new Customer.Create.Body(body),
    });

    return new Customer.Response(data);
  }

  public async getAll(storeId?: string): Promise<Customer.Response[]> {
    const data = await this.request<Customer.Response[]>({
      endpoint: Customers.base(this.storeId(storeId)),
    });

    return data.map((customer) => new Customer.Response(customer));
  }

  public async getById(
    customerId: string,
    storeId?: string,
  ): Promise<Customer.Response> {
    const data = await this.request({
      endpoint: Customers.byId(this.storeId(storeId), customerId),
    });
    return new Customer.Response(data);
  }

  public async lookup(
    search: Customer.Lookup.Search,
    storeId?: string,
  ): Promise<Customer.Response> {
    const data = await this.request({
      endpoint: Customers.lookup(this.storeId(storeId)),
      search: new Customer.Lookup.Search(search),
    });

    return new Customer.Response(data);
  }

  public async update(
    customerId: string,
    body: Customer.Update.Body,
    storeId?: string,
  ): Promise<Customer.Response> {
    const data = await this.request({
      endpoint: Customers.byId(this.storeId(storeId), customerId),
      method: Method.PATCH,
      body: new Customer.Update.Body(body),
    });

    return new Customer.Response(data);
  }

  public get Tokens(): TokensApi {
    if (!this.tokensApi) this.tokensApi = new TokensApi(this.config);

    return this.tokensApi;
  }

  public get Inventory(): InventoryApi {
    if (!this.inventoryApi) this.inventoryApi = new InventoryApi(this.config);

    return this.inventoryApi;
  }
}
