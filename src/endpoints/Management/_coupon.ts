import { BaseEndpoints } from "../../base";

export default class CouponEndpoints extends BaseEndpoints {
  public base(store_id: string): string {
    this._validate({ store_id });
    return this._buildUrl(this._baseUrl, "stores", store_id, "coupons");
  }

  public byId(store_id: string, coupon_id: string): string {
    this._validate({ coupon_id });
    return this._buildUrl(this.base(store_id), coupon_id);
  }
}
