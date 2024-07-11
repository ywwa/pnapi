import { type CustomersInventoryEndpoints } from "../../..";
import { type ItemAssignDTO, type ItemResponseDTO } from "../../../../dtos";
import { Api, itemAssignSchema, itemResponseSchema } from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";

export class CustomersInventoryApi extends Api {
  private readonly __endpoints: CustomersInventoryEndpoints;

  constructor(config: ApiConfig, endpoints: CustomersInventoryEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async assign(
    customerId: string,
    body: ItemAssignDTO,
  ): Promise<ItemResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base(customerId),
        method: Method.Post,
        data: { schema: itemAssignSchema, params: body },
      };

      return this._request<ItemResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getAll(customerId: string): Promise<ItemResponseDTO[]> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base(customerId),
        response: itemResponseSchema.array(),
      };

      return this._request<ItemResponseDTO[]>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async revoke(customerId: string, itemId: string): Promise<void> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(customerId, itemId),
        method: Method.Delete,
      };

      return this._request<void>(options);
    } catch (error: any) {
      throw error;
    }
  }
}
