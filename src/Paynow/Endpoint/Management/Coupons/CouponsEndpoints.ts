import { Endpoint } from "../../../../lib";

export class CouponsEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  get base(): string {
    return this.__build_url(this.__baseUrl, "coupons");
  }

  byId(couponId: string): string {
    this.__validate({ couponId });

    return this.__build_url(this.base, couponId);
  }
}
