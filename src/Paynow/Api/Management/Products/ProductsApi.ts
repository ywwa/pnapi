import {
  type ProductCreateDTO,
  type ProductResponseDTO,
  type ProductUpdateDTO,
} from "../../../../dtos";
import {
  Api,
  productCreateSchema,
  productResponseSchema,
  productUpdateSchema,
} from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type ProductsEndpoints } from "../../../Endpoint";

export class ProductsApi extends Api {
  private readonly __endpoints: ProductsEndpoints;
  constructor(config: ApiConfig, endpoints: ProductsEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async create(body: ProductCreateDTO): Promise<ProductResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        method: Method.Post,
        data: { schema: productCreateSchema, params: body },
        response: productResponseSchema,
      };

      return this._request<ProductResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getAll(): Promise<ProductResponseDTO[]> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        response: productResponseSchema.array(),
      };

      return await this._request<ProductResponseDTO[]>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getById(productId: string): Promise<ProductResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(productId),
        response: productResponseSchema,
      };

      return this._request<ProductResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async update(
    productId: string,
    body: ProductUpdateDTO,
  ): Promise<ProductResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(productId),
        method: Method.Patch,
        data: { schema: productUpdateSchema, params: body },
        response: productResponseSchema,
      };

      return this._request<ProductResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async delete(productId: string): Promise<void> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(productId),
        method: Method.Delete,
      };

      return this._request<void>(options);
    } catch (error: any) {
      throw error;
    }
  }
}
