import { BaseEndpoint } from "../../../../lib";

export class CouponEndpoints extends BaseEndpoint {
  constructor(store_id: string) {
    super(store_id);
  }

  public base(): string {
    return this._buildUrl(this._baseUrl, "stores", this._storeId, "coupons");
  }

  public by_id(coupon_id: string): string {
    this._validate({ coupon_id });
    return this._buildUrl(this.base(), coupon_id);
  }
}
