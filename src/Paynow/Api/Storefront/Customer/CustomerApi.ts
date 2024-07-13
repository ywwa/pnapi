import {
  type CustomerResponseDTO,
  type ItemDTO,
} from "../../../../dtos/Storefront";
import { Api, customerResponse, itemResponse } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { type CustomerEndpoints } from "../../../Endpoint";

export class CustomerApi extends Api {
  private readonly __endpoints: CustomerEndpoints;

  constructor(config: ApiConfig, endpoints: CustomerEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async get(): Promise<CustomerResponseDTO> {
    try {
      this._check_auth(["customer"]);

      const options: RequestOptions = {
        url: this.__endpoints.base,
        response: customerResponse,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getInventory(): Promise<ItemDTO[]> {
    try {
      this._check_auth(["customer"]);

      const options: RequestOptions = {
        url: this.__endpoints.commandDelivery,
        response: itemResponse.array(),
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }
}
