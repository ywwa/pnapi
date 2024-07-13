import { Endpoint } from "../../../../lib";

export class StoreEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public get base(): string {
    return this.__build_url(this.__baseUrl, "store");
  }
}
