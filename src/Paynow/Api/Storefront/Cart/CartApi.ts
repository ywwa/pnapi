import {
  type CartResponseDTO,
  type CartUpdateDTO,
} from "../../../../dtos/Storefront";
import { Api } from "../../../../lib";
import { cartResponse, cartUpdate } from "../../../../lib/schemas/Storefront";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type CartEndpoints } from "../../../Endpoint/Storefront";

export class CartApi extends Api {
  private readonly __endpoints: CartEndpoints;

  constructor(config: ApiConfig, endpoints: CartEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async get(): Promise<CartResponseDTO> {
    try {
      this._check_auth(["customer"]);
      const options: RequestOptions = {
        url: this.__endpoints.base,
        headers: {
          auth: this.__config.auth,
          additional: this._construct_additional_headers(this.__config),
        },
        response: cartResponse,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }

  async empty(): Promise<void> {
    try {
      this._check_auth(["customer"]);
      const options: RequestOptions = {
        url: this.__endpoints.base,
        method: Method.Delete,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }

  async update(params: CartUpdateDTO): Promise<CartResponseDTO> {
    try {
      this._check_auth(["customer"]);

      const options: RequestOptions = {
        url: this.__endpoints.lines,
        method: Method.Put,
        search: { schema: cartUpdate, params },
        response: cartResponse,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }
}
