import { BaseAPI } from "../../base";
import { type CustomerTokenResponseDTO } from "../../dto";
import type CustomerTokensEndpoints from "../../endpoints/Management/_customerTokens";
import { RequestMethods, type ServiceConfig } from "../../types";

export default class CustomerTokensAPI extends BaseAPI {
  private readonly _endpoints: CustomerTokensEndpoints;

  constructor(config: ServiceConfig, endpoints: CustomerTokensEndpoints) {
    super(config);

    this._endpoints = endpoints;
  }

  /**
   * Invalidate all customer tokens for the store
   *
   * @return {void} 204 HTTP Response
   */
  public async invalidateAll(): Promise<void> {
    return this.request<void>({
      url: this._endpoints.global(this.config.store_id),
      method: RequestMethods.DELETE,
    });
  }

  /**
   * Create new access token for a customer
   *
   * @param {string} customer_id - ID of the customer
   *
   * @return {Promise<CustomerTokenResponseDTO>} Newly created customer token
   */
  public async create(customer_id: string): Promise<CustomerTokenResponseDTO> {
    return this.request<CustomerTokenResponseDTO>({
      url: this._endpoints.byId(this.config.store_id, customer_id),
      method: RequestMethods.POST,
    });
  }

  /**
   * Invalidate all tokens of a specific customer
   *
   * @param {string} customer_id - ID of the customer
   * @return {void} 204 HTTP Response
   */
  public async invalidate(customer_id: string): Promise<void> {
    return this.request<void>({
      url: this._endpoints.byId(this.config.store_id, customer_id),
      method: RequestMethods.DELETE,
    });
  }
}
