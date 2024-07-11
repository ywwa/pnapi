import { type TokenResponseDTO } from "../../../../dtos";
import { Api, tokenResponseSchema } from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type CustomersTokensEndpoints } from "../../../Endpoint";

export class CustomersTokensApi extends Api {
  private readonly __endpoints: CustomersTokensEndpoints;
  constructor(config: ApiConfig, endpoints: CustomersTokensEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async create(customerId: string): Promise<TokenResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(customerId),
        method: Method.Post,
        response: tokenResponseSchema,
      };

      return this._request<TokenResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async invalidate(customerId: string): Promise<void> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(customerId),
        method: Method.Delete,
      };

      return this._request<void>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async invalidateAll(): Promise<void> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        method: Method.Delete,
      };
      return this._request<void>(options);
    } catch (error: any) {
      throw error;
    }
  }
}
