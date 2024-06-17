import { BaseAPI } from "../../base";
import CouponEndpoints from "../../endpoints/Management/_coupon";
import { ServiceConfig } from "../../types";

export default class CouponAPI extends BaseAPI {
  private readonly _endpoints: CouponEndpoints;

  constructor(config: ServiceConfig, endpoints: CouponEndpoints) {
    super(config);
    this._endpoints = endpoints;
  }

  public async create() {
    return this._endpoints.base(this.config.store_id);
  }

  public async getAll() {
    return this._endpoints.base(this.config.store_id);
  }

  public async getById(coupon_id: string) {
    return this._endpoints.byId(this.config.store_id, coupon_id);
  }

  public async update(coupon_id: string) {
    return this._endpoints.byId(this.config.store_id, coupon_id);
  }

  public async delete(coupon_id: string) {
    return this._endpoints.byId(this.config.store_id, coupon_id);
  }
}
