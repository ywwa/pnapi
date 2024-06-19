import { z, type ZodSchema } from "zod";
import {
  type NavlinkRequestDTO,
  type NavlinkResponseDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type NavlinkEndpoints } from "../../../Endpoint";

export class NavlinkApi extends BaseApi {
  private readonly __ep: NavlinkEndpoints;

  constructor(config: ApiConfig, endpoints: NavlinkEndpoints) {
    super(config);

    this.__ep = endpoints;
  }

  public async create(tag_id: string): Promise<NavlinkResponseDTO> {
    const schema: ZodSchema = z.object({
      tag_id: z.string(),
    });

    const options: RequestOptions = {
      url: this.__ep.base(),
      method: Method.POST,
      data: { schema, content: { tag_id } },
    };

    return this._execute<NavlinkResponseDTO>(options);
  }

  public async getAll(): Promise<NavlinkResponseDTO[]> {
    const options: RequestOptions = { url: this.__ep.base() };
    return this._execute<NavlinkResponseDTO[]>(options);
  }

  public async getById(node_id: string): Promise<NavlinkResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(node_id) };
    return this._execute<NavlinkResponseDTO>(options);
  }

  public async updateOrder(
    body: NavlinkRequestDTO,
  ): Promise<NavlinkResponseDTO> {
    const schema: ZodSchema = z.object({
      parent_node_id: z.optional(z.string()),
      tag_id: z.string(),
      order: z.number(),
    });

    const options: RequestOptions = {
      url: this.__ep.sort_orders(),
      method: Method.PATCH,
      data: { schema, content: body },
    };
    return this._execute<NavlinkResponseDTO>(options);
  }

  public async delete(node_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(node_id),
      method: Method.DELETE,
    };

    return this._execute<void>(options);
  }
}
