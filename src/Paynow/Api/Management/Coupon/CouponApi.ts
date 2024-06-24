import {
  type CouponRequestDTO,
  type CouponResponseDTO,
  type CouponUpdateRequestDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { create, update } from "../../../../zschemas/coupon.zsc";
import { type CouponEndpoints } from "../../../Endpoint";

export class CouponApi extends BaseApi {
  private readonly __ep: CouponEndpoints;

  constructor(config: ApiConfig, endpoints: CouponEndpoints) {
    super(config);
    this.__ep = endpoints;
  }

  public async create(body: CouponRequestDTO): Promise<CouponResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.base(),
      method: "POST",
      data: { schema: create, content: body },
    };

    return this._execute<CouponResponseDTO>(options);
  }

  public async getAll(): Promise<CouponResponseDTO[]> {
    const options: RequestOptions = { url: this.__ep.base() };

    return this._execute<CouponResponseDTO[]>(options);
  }

  public async getById(coupon_id: string): Promise<CouponResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(coupon_id) };

    return this._execute<CouponResponseDTO>(options);
  }

  public async update(
    coupon_id: string,
    body?: CouponUpdateRequestDTO,
  ): Promise<CouponResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.by_id(coupon_id),
      method: "PATCH",
      ...(body && { data: { schema: update, content: body } }),
    };

    return this._execute<CouponResponseDTO>(options);
  }

  public async delete(coupon_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(coupon_id),
      method: "DELETE",
    };

    return this._execute<void>(options);
  }
}
