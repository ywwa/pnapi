import {
  type TagCreateDTO,
  type TagResponseDTO,
  type TagUpdateDTO,
} from "../../../../dtos";
import {
  Api,
  tagCreateSchema,
  tagResponseSchema,
  tagUpdateSchema,
} from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type TagsEndpoints } from "../../../Endpoint";

export class TagsApi extends Api {
  private readonly __endpoints: TagsEndpoints;
  constructor(config: ApiConfig, endpoints: TagsEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async create(body: TagCreateDTO): Promise<TagResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        method: Method.Post,
        response: tagResponseSchema,
        data: { schema: tagCreateSchema, params: body },
      };

      return this._request<TagResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getAll(): Promise<TagResponseDTO[]> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        response: tagResponseSchema.array(),
      };

      return this._request<TagResponseDTO[]>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getById(tagId: string): Promise<TagResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(tagId),
        response: tagResponseSchema,
      };

      return this._request<TagResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async update(tagId: string, body: TagUpdateDTO): Promise<TagResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(tagId),
        method: Method.Patch,
        data: { schema: tagUpdateSchema, params: body },
        response: tagResponseSchema,
      };

      return this._request<TagResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async delete(tagId: string): Promise<void> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(tagId),
        method: Method.Delete,
      };

      return this._request<void>(options);
    } catch (error: any) {
      throw error;
    }
  }
}
