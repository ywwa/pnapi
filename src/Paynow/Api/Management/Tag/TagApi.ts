import { BaseApi } from "../../../../lib";
import { ApiConfig } from "../../../../types";
import { TagEndpoints } from "../../../Endpoint";

export class TagApi extends BaseApi {
  private readonly __ep: TagEndpoints;

  constructor(config: ApiConfig, endpoint: TagEndpoints) {
    super(config);

    this.__ep = endpoint;
  }
}
