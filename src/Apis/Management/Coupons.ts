import { Coupon } from "../../Dtos";
import { Coupons } from "../../Endpoints/Management";
import { BaseApi } from "../../lib";
import { Method } from "../../types";

export class CouponsApi extends BaseApi {
  public async create(
    body: Coupon.Create.Body,
    storeId?: string,
  ): Promise<Coupon.Response> {
    const data = await this.request({
      endpoint: Coupons.base(this.storeId(storeId)),
      method: Method.POST,
      body: new Coupon.Create.Body(body),
    });

    return new Coupon.Response(data);
  }

  public async getAll(storeId?: string): Promise<Coupon.Response[]> {
    const data = await this.request<Coupon.Response[]>({
      endpoint: Coupons.base(this.storeId(storeId)),
    });

    return data.map((coupon) => new Coupon.Response(coupon));
  }

  public async getById(
    couponId: string,
    storeId?: string,
  ): Promise<Coupon.Response> {
    const data = await this.request({
      endpoint: Coupons.byId(this.storeId(storeId), couponId),
    });

    return new Coupon.Response(data);
  }

  public async update(
    couponId: string,
    body: Coupon.Update.Body,
    storeId?: string,
  ): Promise<Coupon.Response> {
    const data = await this.request({
      endpoint: Coupons.byId(this.storeId(storeId), couponId),
      method: Method.PATCH,
      body: new Coupon.Update.Body(body),
    });

    return new Coupon.Response(data);
  }

  public async delete(couponId: string, storeId?: string): Promise<void> {
    return await this.request<void>({
      endpoint: Coupons.byId(this.storeId(storeId), couponId),
      method: Method.DELETE,
    });
  }
}
