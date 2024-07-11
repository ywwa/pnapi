import { OrderLookupDTO, type OrderResponseDTO } from "../../../../dtos";
import { Api, orderLookupSchema, orderResponseSchema } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { type OrdersEndpoints } from "../../../Endpoint";

export class OrdersApi extends Api {
  private readonly __endpoints: OrdersEndpoints;
  constructor(config: ApiConfig, endpoints: OrdersEndpoints) {
    super(config);

    this.__endpoints = endpoints;
  }

  async get(params?: OrderLookupDTO): Promise<OrderResponseDTO[]> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        ...(params && { search: { schema: orderLookupSchema, params } }),
        response: orderResponseSchema.array(),
      };

      return this._request<OrderResponseDTO[]>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getById(orderId: string): Promise<OrderResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(orderId),
        response: orderResponseSchema,
      };

      return this._request<OrderResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }
}
