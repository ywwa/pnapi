import { BaseEndpoint } from "../../../../lib";

export class GiftcardEndpoints extends BaseEndpoint {
  constructor(store_id: string) {
    super(store_id);
  }

  public base(): string {
    return this._buildUrl(this._baseUrl, "stores", this._storeId, "giftcards");
  }

  public by_id(giftcard_id: string): string {
    this._validate({ giftcard_id });
    return this._buildUrl(this.base(), giftcard_id);
  }
}
