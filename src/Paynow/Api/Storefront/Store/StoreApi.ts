import { type StoreResponseDTO } from "../../../../dtos/Storefront";
import { Api, storeResponse } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { type StoreEndpoints } from "../../../Endpoint";

export class StoreApi extends Api {
  private readonly __endpoints: StoreEndpoints;

  constructor(config: ApiConfig, endpoints: StoreEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async get(): Promise<StoreResponseDTO> {
    try {
      this._check_auth(["anonymous", "customer"]);
      const options: RequestOptions = {
        url: this.__endpoints.base,
        headers: {
          auth: this.__config.auth,
          additional: this._construct_additional_headers(this.__config),
        },
        response: storeResponse,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }
}
