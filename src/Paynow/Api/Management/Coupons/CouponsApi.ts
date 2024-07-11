import {
  type CouponCreateDTO,
  type CouponResponseDTO,
  type CouponUpdateDTO,
} from "../../../../dtos";
import {
  Api,
  couponCreateSchema,
  couponResponseSchema,
  couponUpdateSchema,
} from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type CouponsEndpoints } from "../../../Endpoint";

export class CouponsApi extends Api {
  private readonly __endpoints: CouponsEndpoints;
  constructor(config: ApiConfig, endpoints: CouponsEndpoints) {
    super(config);

    this.__endpoints = endpoints;
  }

  async create(body: CouponCreateDTO): Promise<CouponResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        method: Method.Post,
        data: { schema: couponCreateSchema, params: body },
      };

      return this._request<CouponResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getAll(): Promise<CouponResponseDTO[]> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        response: couponResponseSchema.array(),
      };

      return this._request<CouponResponseDTO[]>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getById(couponId: string): Promise<CouponResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(couponId),
        response: couponResponseSchema,
      };

      return this._request<CouponResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async update(
    couponId: string,
    body: CouponUpdateDTO,
  ): Promise<CouponResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(couponId),
        method: Method.Patch,
        data: { schema: couponUpdateSchema, params: body },
        response: couponResponseSchema,
      };

      return this._request<CouponResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async delete(couponId: string): Promise<void> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(couponId),
        method: Method.Delete,
      };

      return this._request<void>(options);
    } catch (error: any) {
      throw error;
    }
  }
}
