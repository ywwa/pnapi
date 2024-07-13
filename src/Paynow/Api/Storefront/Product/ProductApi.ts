import { ProductResponseDTO } from "../../../../dtos/Storefront";
import { Api, productResponse } from "../../../../lib";
import { ApiConfig, RequestOptions } from "../../../../types";
import { ProductEndpoints } from "../../../Endpoint";

export class ProductApi extends Api {
  private readonly __endpoints: ProductEndpoints;

  constructor(config: ApiConfig, endpoints: ProductEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async getAll(): Promise<ProductResponseDTO[]> {
    try {
      this._check_auth(["customer", "anonymous"]);
      const options: RequestOptions = {
        url: this.__endpoints.base,
        headers: {
          auth: this.__config.auth,
          additional: this._construct_additional_headers(this.__config),
        },
        response: productResponse.array(),
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getByIdOrSlug(param: string): Promise<ProductResponseDTO> {
    try {
      this._check_auth(["customer", "anonymous"]);
      const options: RequestOptions = {
        url: this.__endpoints.byIdOrSlug(param),
        headers: {
          auth: this.__config.auth,
          additional: this._construct_additional_headers(this.__config),
        },
        response: productResponse,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }
}
