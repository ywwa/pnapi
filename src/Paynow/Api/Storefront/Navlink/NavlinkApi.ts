import { NavlinkResponseDTO } from "../../../../dtos/Storefront";
import { Api, navlinkResponse } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { type NavlinkEndpoints } from "../../../Endpoint/Storefront";

export class NavlinkApi extends Api {
  private __endpoints: NavlinkEndpoints;
  constructor(config: ApiConfig, endpoints: NavlinkEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async getAll(): Promise<NavlinkResponseDTO[]> {
    try {
      this._check_auth(["customer", "anonymous"]);

      if (!this.__config.store_id) throw new Error("Error: Missing store_id");

      const options: RequestOptions = {
        url: this.__endpoints.base,
        headers: {
          auth: this.__config.auth,
          additional: { "store-id": this.__config.store_id },
        },
        response: navlinkResponse.array(),
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }
}
