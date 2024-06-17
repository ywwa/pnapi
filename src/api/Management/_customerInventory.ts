import { BaseAPI } from "../../base";
import {
  type CustomerInventoryRequestDTO,
  type CustomerInventoryResponseDTO,
} from "../../dto";
import type CustomerInventoryEndpoints from "../../endpoints/Management/_customerInventory";
import { RequestMethods, type ServiceConfig } from "../../types";

export default class CustomerInventoryAPI extends BaseAPI {
  private readonly _endpoints: CustomerInventoryEndpoints;

  constructor(config: ServiceConfig, endpoints: CustomerInventoryEndpoints) {
    super(config);

    this._endpoints = endpoints;
  }

  /**
   * Get all items in customers inventory
   * @param {string} customer_id - id of the customer
   * @return {Promise<CustomerInventoryResponseDTO[]>} - Items in customer inventory
   */
  public async get(
    customer_id: string,
  ): Promise<CustomerInventoryResponseDTO[]> {
    return this.request<CustomerInventoryResponseDTO[]>({
      url: this._endpoints.base(this.config.store_id, customer_id),
    });
  }

  /**
   * Assign item to customers inventory
   *
   * @param {string} customer_id - id of the customer
   * @param {CustomerInventoryRequestDTO} params - data of the item that should be added
   *
   * @return {Promise<CustomerInventoryResponseDTO[]> - Updated list of items in customers inventory
   */
  public async assign(
    customer_id: string,
    params: CustomerInventoryRequestDTO,
  ): Promise<CustomerInventoryResponseDTO[]> {
    return this.request<CustomerInventoryResponseDTO[]>({
      url: this._endpoints.base(this.config.store_id, customer_id),
      method: RequestMethods.POST,
      body: params,
    });
  }

  /**
   * Revoke item from customers inventory
   *
   * @param {string} customer_id - id of the customer
   * @param {string} item_id - id of the item that should be revoked
   *
   * @return {void} 204 HTTP Response
   */
  public async revoke(customer_id: string, item_id: string): Promise<void> {
    return this.request<void>({
      url: this._endpoints.byId(this.config.store_id, customer_id, item_id),
      method: RequestMethods.DELETE,
    });
  }
}
