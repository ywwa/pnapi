import {
  type SaleCreateDTO,
  type SaleResponseDTO,
  type SaleUpdateDTO,
} from "../../../../dtos";
import {
  Api,
  saleCreateSchema,
  saleResponseSchema,
  saleUpdateSchema,
} from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type SalesEndpoints } from "../../../Endpoint";

export class SalesApi extends Api {
  private readonly __endpoints: SalesEndpoints;
  constructor(config: ApiConfig, endpoints: SalesEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async create(body: SaleCreateDTO): Promise<SaleResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        method: Method.Post,
        data: { schema: saleCreateSchema, params: body },
        response: saleResponseSchema,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getAll(): Promise<SaleResponseDTO[]> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        response: saleResponseSchema.array(),
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getById(saleId: string): Promise<SaleResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(saleId),
        response: saleResponseSchema,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }

  async update(saleId: string, body: SaleUpdateDTO): Promise<SaleResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(saleId),
        data: { schema: saleUpdateSchema, params: body },
        method: Method.Patch,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }

  async delete(saleId: string): Promise<void> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(saleId),
        method: Method.Delete,
      };

      return this._request(options);
    } catch (error: any) {
      throw error;
    }
  }
}
