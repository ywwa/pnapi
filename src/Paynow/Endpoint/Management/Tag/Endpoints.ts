import { BaseEndpoint } from "../../../../lib";

export class TagEndpoints extends BaseEndpoint {
  constructor(store_id: string) {
    super(store_id);
  }

  public base(): string {
    return this._buildUrl(this._baseUrl, "stores", this._storeId, "tags");
  }

  public by_id(tag_id: string): string {
    this._validate({ tag_id });
    return this._buildUrl(this.base(), tag_id);
  }
}
