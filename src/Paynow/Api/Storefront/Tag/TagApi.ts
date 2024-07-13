import { type TagResonseDTO } from "../../../../dtos/Storefront";
import { Api, tagResponse } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { type TagEndpoints } from "../../../Endpoint/Storefront";

export class TagApi extends Api {
  private __endpoints: TagEndpoints;
  constructor(config: ApiConfig, endpoints: TagEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async getAll(): Promise<TagResonseDTO[]> {
    try {
      this._check_auth(["customer", "anonymous"]);

      if (!this.__config.store_id) throw new Error("Error: Missing store_id");

      const options: RequestOptions = {
        url: this.__endpoints.base,
        headers: {
          auth: this.__config.auth,
          additional: { "store-id": this.__config.store_id },
        },
        response: tagResponse.array(),
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }
}
