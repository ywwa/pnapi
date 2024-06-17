import { BaseAPI } from "../../base";
import { StoreMemberResponseDTO } from "../../dto";
import type StoreMembersEndpoints from "../../endpoints/Management/_storeMembers";
import { RequestMethods, type ServiceConfig } from "../../types";

export default class StoreMembersAPI extends BaseAPI {
  private readonly _endpoints: StoreMembersEndpoints;
  constructor(config: ServiceConfig, endpoints: StoreMembersEndpoints) {
    super(config);

    this._endpoints = endpoints;
  }

  /**
   * Get all members of the current store.
   *
   * @return {Promise<StoreMemberDTO[]>} All members of the current store.
   */
  public async getAll(): Promise<StoreMemberResponseDTO[]> {
    return this.request<StoreMemberResponseDTO[]>({
      url: this._endpoints.base(this.config.store_id),
    });
  }

  /**
   * Get specific member of the current store.
   *
   * @param {string} user_id - ID of the user
   *
   * @return {Promise<StoreMemberDTO[]>} Specific member of the current store.
   */
  public async getById(user_id: string): Promise<StoreMemberResponseDTO> {
    return this.request<StoreMemberResponseDTO>({
      url: this._endpoints.byId(this.config.store_id, user_id),
    });
  }

  /**
   * Update specific member of the current store.
   *
   * @param {string} user_id - ID of the user
   * @param {string} role_id - ID of the role
   *
   * @return {Promise<StoreMemberDTO[]>} Specific member of the current store.
   */
  public async setRole(
    user_id: string,
    role_id: string,
  ): Promise<StoreMemberResponseDTO> {
    return this.request<StoreMemberResponseDTO>({
      url: this._endpoints.setRole(this.config.store_id, user_id),
      method: RequestMethods.POST,
      body: { role_id },
    });
  }
}
