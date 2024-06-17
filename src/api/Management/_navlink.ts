import { BaseAPI } from "../../base";
import {
  type NavlinkRequestDTO,
  type NavlinkResponseDTO,
  type NavlinkSortRequestDTO,
} from "../../dto";
import type NavlinkEndpoints from "../../endpoints/Management/_navlink";
import { RequestMethods, type ServiceConfig } from "../../types";

export default class NavlinkAPI extends BaseAPI {
  private readonly _endpoints: NavlinkEndpoints;
  constructor(config: ServiceConfig, endpoints: NavlinkEndpoints) {
    super(config);

    this._endpoints = endpoints;
  }

  /**
   * Create new navlink
   *
   * @param {NavlinkRequestDTO} params - data of navlink
   *
   * @return {Promise<NavlinkResponseDTO} - newly created navlink
   */
  public async create(params: NavlinkRequestDTO): Promise<NavlinkResponseDTO> {
    return this.request<NavlinkResponseDTO>({
      url: this._endpoints.base(this.config.store_id),
      method: RequestMethods.POST,
      body: params,
    });
  }

  /**
   * Get all navlinks of the store
   *
   * @return {Promise<NavlinkResponseDTO[]} - List of all navlinks
   */
  public async getAll(): Promise<NavlinkResponseDTO[]> {
    return this.request<NavlinkResponseDTO[]>({
      url: this._endpoints.base(this.config.store_id),
    });
  }

  /**
   * Reorder navlinks
   *
   * @param {NavlinkSortRequestDTO} params - data
   *
   * @return {Promise<NavlinkResponseDTO} - List of all navlinks
   */
  public async sortOrders(
    params: NavlinkSortRequestDTO,
  ): Promise<NavlinkResponseDTO> {
    return this.request<NavlinkResponseDTO>({
      url: this._endpoints.sortOrders(this.config.store_id),
      method: RequestMethods.PATCH,
      body: params,
    });
  }

  /**
   * delete the navlink
   *
   * @param {string} node_id - id of the navlink
   *
   * @return {void} 204 HTTP Response
   */
  public async delete(node_id: string): Promise<void> {
    return this.request<void>({
      url: this._endpoints.byId(this.config.store_id, node_id),
      method: RequestMethods.DELETE,
    });
  }
}
