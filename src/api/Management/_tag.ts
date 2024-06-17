import { BaseAPI } from "../../base";
import { type TagRequestDTO, type TagResponseDTO } from "../../dto";
import type TagEndpoints from "../../endpoints/Management/_tag";
import { Optional, RequestMethods, type ServiceConfig } from "../../types";

export default class TagAPI extends BaseAPI {
  private readonly _endpoints: TagEndpoints;
  constructor(config: ServiceConfig, endpoints: TagEndpoints) {
    super(config);

    this._endpoints = endpoints;
  }

  /**
   * Create new tag
   *
   * @param {TagRequestDTO} params - Data of the tag
   *
   * @returns {Promise<TagResponseDTO>} newly created tag
   */
  public async create(params: TagRequestDTO): Promise<TagResponseDTO> {
    return this.request<TagResponseDTO>({
      url: this._endpoints.base(this.config.store_id),
      method: RequestMethods.POST,
      body: params,
    });
  }

  /**
   * Get all tags in the store
   *
   * @return {Promise<TagResponseDTO[]>} lits of tags
   */
  public async getAll(): Promise<TagResponseDTO[]> {
    return this.request<TagResponseDTO[]>({
      url: this._endpoints.base(this.config.store_id),
    });
  }

  /**
   * Get tag by id
   *
   * @return {Promise<TagResponseDTO>} Tag
   */
  public async getById(tag_id: string): Promise<TagResponseDTO> {
    return this.request<TagResponseDTO>({
      url: this._endpoints.byId(this.config.store_id, tag_id),
    });
  }

  /**
   * Update the tag
   *
   * @param {string} tag_id - id of the tag
   * @param {Optional<TagRequestDTO> params - data that should be updated
   *
   * @return {Promise<TagResponseDTO>} Tag
   */
  public async update(
    tag_id: string,
    params: Optional<TagRequestDTO>,
  ): Promise<TagResponseDTO> {
    return this.request<TagResponseDTO>({
      url: this._endpoints.byId(this.config.store_id, tag_id),
      method: RequestMethods.PATCH,
      body: params,
    });
  }

  /**
   * Delete the tag
   *
   * @param {string} tag_id - id of the tag
   *
   * @return {void} 204 HTTP Response
   */
  public async delete(tag_id: string): Promise<void> {
    return this.request<void>({
      url: this._endpoints.byId(this.config.store_id, tag_id),
      method: RequestMethods.DELETE,
    });
  }
}
