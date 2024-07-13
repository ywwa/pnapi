import { Endpoint } from "../../../../lib";

export class CustomerEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public get base(): string {
    return this.__build_url(this.__baseUrl, "store/customer");
  }

  public get commandDelivery(): string {
    return this.__build_url(this.base, "command_delivery");
  }
}
