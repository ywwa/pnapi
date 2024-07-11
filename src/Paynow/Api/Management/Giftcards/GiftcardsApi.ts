import {
  type GiftcardCreateDTO,
  type GiftcardLookupDTO,
  type GiftcardResponseDTO,
  type GiftcardUpdateDTO,
} from "../../../../dtos";
import {
  Api,
  giftcardCreateSchema,
  giftcardLookupSchema,
  giftcardResponseSchema,
  giftcardUpdateSchema,
} from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type GiftcardsEndpoints } from "../../../Endpoint";

export class GiftcardsApi extends Api {
  private readonly __endpoints: GiftcardsEndpoints;
  constructor(config: ApiConfig, endpoints: GiftcardsEndpoints) {
    super(config);

    this.__endpoints = endpoints;
  }

  async create(body: GiftcardCreateDTO): Promise<GiftcardResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        method: Method.Post,
        data: { schema: giftcardCreateSchema, params: body },
        response: giftcardResponseSchema,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }

  async get(params?: GiftcardLookupDTO): Promise<GiftcardResponseDTO[]> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        ...(params && { search: { schema: giftcardLookupSchema, params } }),
        response: giftcardResponseSchema.array(),
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }
  async getById(giftcardId: string): Promise<GiftcardResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(giftcardId),
        response: giftcardResponseSchema,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }

  async update(
    giftcardId: string,
    body: GiftcardUpdateDTO,
  ): Promise<GiftcardResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(giftcardId),
        method: Method.Patch,
        data: { schema: giftcardUpdateSchema, params: body },
        response: giftcardResponseSchema,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }

  async delete(giftcardId: string): Promise<void> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(giftcardId),
        method: Method.Delete,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }
}
