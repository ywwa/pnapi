import { BaseEndpoints } from "../../base";

export default class GiftcardEndpoints extends BaseEndpoints {
  public base(store_id: string): string {
    this._validate({ store_id });
    return this._buildUrl(this._baseUrl, "stores", store_id, "giftcards");
  }

  public byId(store_id: string, giftcard_id: string): string {
    this._validate({ giftcard_id });
    return this._buildUrl(this.base(store_id), giftcard_id);
  }
}
