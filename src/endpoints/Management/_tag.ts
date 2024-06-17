import { BaseEndpoints } from "../../base";

export default class TagEndpoints extends BaseEndpoints {
  public base(store_id: string): string {
    this._validate({ store_id });
    return this._buildUrl(this._baseUrl, "stores", store_id, "tags");
  }

  public byId(store_id: string, tag_id: string): string {
    this._validate({ tag_id });
    return this._buildUrl(this.base(store_id), tag_id);
  }
}
