import { BaseAPI } from "../../base";
import {
  CustomerLookupRequestDTO,
  type CustomerRequestDTO,
  type CustomerResponseDTO,
} from "../../dto";
import type CustomerEndpoints from "../../endpoints/Management/_customer";
import { RequestMethods, type ServiceConfig } from "../../types";
import CustomerInventoryAPI from "./_customerInventory";
import CustomerTokensAPI from "./_customerTokens";

export default class CustomerAPI extends BaseAPI {
  private readonly _endpoints: CustomerEndpoints;

  private readonly tokensAPI: CustomerTokensAPI;
  private readonly inventoryAPI: CustomerInventoryAPI;

  constructor(config: ServiceConfig, endpoints: CustomerEndpoints) {
    super(config);

    this._endpoints = endpoints;
    this.tokensAPI = new CustomerTokensAPI(this.config, endpoints.Tokens);
    this.inventoryAPI = new CustomerInventoryAPI(
      this.config,
      endpoints.Inventory,
    );
  }

  /**
   * Create new store customer
   *
   * @param {CustomerRequestDTO} params - Data of new customer
   *
   * @return {Promise<CustomerResponseDTO>} Data of newly created customer
   *
   */
  public async create(
    params?: CustomerRequestDTO,
  ): Promise<CustomerResponseDTO> {
    return this.request<CustomerResponseDTO>({
      url: this._endpoints.base(this.config.store_id),
      method: RequestMethods.POST,
      body: params,
    });
  }

  /**
   * Get all customers of the current store
   *
   * @return {Promise<CustomerResponseDTO[]>} List of customers
   */
  public async getAll(): Promise<CustomerResponseDTO[]> {
    return this.request<CustomerResponseDTO[]>({
      url: this._endpoints.base(this.config.store_id),
    });
  }

  /**
   * Get customer by its ID or steam_id
   *
   * @param {CustomerLookupRequestDTO} params - id or steam_id of the customer
   *
   * @return {Promise<CustomerResponseDTO>} Customer Data
   */
  public async lookup(
    params: CustomerLookupRequestDTO,
  ): Promise<CustomerResponseDTO> {
    return this.request<CustomerResponseDTO>({
      url: this._endpoints.lookup(this.config.store_id),
      body: params,
    });
  }

  /**
   * Get customer by its ID
   *
   * @param {string} customer_id - id of the customer
   *
   * @return {Promise<CustomerResponseDTO>} Customer Data
   */
  public async getById(customer_id: string): Promise<CustomerResponseDTO> {
    return this.request<CustomerResponseDTO>({
      url: this._endpoints.byId(this.config.store_id, customer_id),
    });
  }

  /**
   * Update the customer
   *
   * @param {string} customer_id - id of the customer
   * @param {CustomerRequestDTO} params - data that should be updated
   *
   * @return {Promise<CustomerResponseDTO>} Customer Data
   */
  public async update(
    customer_id: string,
    params?: CustomerRequestDTO,
  ): Promise<CustomerResponseDTO> {
    return this.request<CustomerResponseDTO>({
      url: this._endpoints.byId(this.config.store_id, customer_id),
      method: RequestMethods.PATCH,
      body: params,
    });
  }
  /**
   * Token related endpoints
   */
  public get Tokens(): CustomerTokensAPI {
    return this.tokensAPI;
  }

  /**
   * Inventory related endpoints
   */
  public get Inventory(): CustomerInventoryAPI {
    return this.inventoryAPI;
  }
}
