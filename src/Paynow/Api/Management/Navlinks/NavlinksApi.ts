import {
  type NavlinkCreateDTO,
  type NavlinkResponseDTO,
  type NavlinkUpdateDTO,
} from "../../../../dtos";
import {
  Api,
  navlinkCreateSchema,
  navlinkResponseSchema,
  navlinkUpdateSchema,
} from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type NavlinksEndpoints } from "../../../Endpoint";

export class NavlinksApi extends Api {
  private readonly __endpoints: NavlinksEndpoints;
  constructor(config: ApiConfig, endpoints: NavlinksEndpoints) {
    super(config);

    this.__endpoints = endpoints;
  }

  async create(body: NavlinkCreateDTO): Promise<NavlinkResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        method: Method.Post,
        data: { schema: navlinkCreateSchema, params: body },
        response: navlinkResponseSchema,
      };

      return this._request<NavlinkResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getAll(): Promise<NavlinkResponseDTO[]> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        response: navlinkResponseSchema.array(),
      };

      return this._request<NavlinkResponseDTO[]>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getById(nodeId: string): Promise<NavlinkResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(nodeId),
        response: navlinkResponseSchema,
      };

      return this._request<NavlinkResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async update(
    nodeId: string,
    body: NavlinkUpdateDTO,
  ): Promise<NavlinkResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(nodeId),
        method: Method.Patch,
        data: { schema: navlinkUpdateSchema, params: body },
        response: navlinkResponseSchema,
      };

      return this._request<NavlinkResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async delete(nodeId: string): Promise<void> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(nodeId),
        method: Method.Delete,
      };

      return this._request<void>(options);
    } catch (error: any) {
      throw error;
    }
  }
}
