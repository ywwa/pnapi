import {
  type CheckoutCreateDTO,
  type CheckoutResponseDTO,
} from "../../../../dtos/Storefront";
import { Api, checkoutRequest } from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type CheckoutEndpoints } from "../../../Endpoint";

export class CheckoutApi extends Api {
  private readonly __endpoints: CheckoutEndpoints;
  constructor(config: ApiConfig, endpoints: CheckoutEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async create(body: CheckoutCreateDTO): Promise<CheckoutResponseDTO> {
    try {
      this._check_auth(["customer"]);

      const options: RequestOptions = {
        url: this.__endpoints.base,
        method: Method.Post,
        data: {
          schema: checkoutRequest,
          params: body,
        },
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }
}
