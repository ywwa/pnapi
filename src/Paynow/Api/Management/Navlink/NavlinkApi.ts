import {
  type NavlinkRequestDTO,
  type NavlinkResponseDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { create, update } from "../../../../zschemas/navlink.zsc";
import { type NavlinkEndpoints } from "../../../Endpoint";

export class NavlinkApi extends BaseApi {
  private readonly __ep: NavlinkEndpoints;

  constructor(config: ApiConfig, endpoints: NavlinkEndpoints) {
    super(config);

    this.__ep = endpoints;
  }

  public async create(tag_id: string): Promise<NavlinkResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.base(),
      method: "POST",
      data: { schema: create, content: { tag_id } },
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
    const options: RequestOptions = {
      url: this.__ep.sort_orders(),
      method: "PATCH",
      data: { schema: update, content: body },
    };
    return this._execute<NavlinkResponseDTO>(options);
  }

  public async delete(node_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(node_id),
      method: "DELETE",
    };

    return this._execute<void>(options);
  }
}
