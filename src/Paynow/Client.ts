import { type ClientConfig } from "../types";
import { ManagementApi } from "./Api";

export class Paynow {
  private readonly config: ClientConfig;
  private readonly __management: ManagementApi;

  constructor(config: ClientConfig) {
    this.config = config;

    this.__management = new ManagementApi(this.config);
  }

  public get Management(): ManagementApi {
    return this.__management;
  }
}
