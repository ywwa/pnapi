import { InventoryApi, TokenApi } from ".";
import {
  type CustomerLookupDTO,
  type CustomerRequestDTO,
  type CustomerResponseDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { create_update, lookup } from "../../../../zschemas/customer.zsc";
import { type CustomerEndpoints } from "../../../Endpoint";

export class CustomerApi extends BaseApi {
  private readonly __ep: CustomerEndpoints;
  private readonly __tokens: TokenApi;
  private readonly __inventory: InventoryApi;

  constructor(config: ApiConfig, endpoints: CustomerEndpoints) {
    super(config);

    this.__ep = endpoints;
    this.__tokens = new TokenApi(this._config, this.__ep.tokens);
    this.__inventory = new InventoryApi(this._config, this.__ep.inventory);
  }

  /**
   * Create new customer
   *
   * @param {CustomerRequestDTO} body - Customer data
   *
   * @return {CustomerResponseDTO} Customer
   */
  public async create(body?: CustomerRequestDTO): Promise<CustomerResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.base(),
      method: "POST",
      ...(body && { data: { schema: create_update, content: body } }),
    };

    return this._execute<CustomerResponseDTO>(options);
  }

  /**
   * Get all customers from current store.
   *
   * @return {CustomerResponseDTO[]} Customers
   */
  public async getAll(): Promise<CustomerResponseDTO[]> {
    const options: RequestOptions = { url: this.__ep.base() };

    return this._execute<CustomerResponseDTO[]>(options);
  }

  /**
   * Lookup customer in current store.
   *
   * @param {CustomerLookupRequestDTO} params
   *
   * @return {CustomerResponseDTO} Customer
   */
  public async lookup(params: CustomerLookupDTO): Promise<CustomerResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.lookup(),
      search: { schema: lookup, content: params },
    };

    return this._execute<CustomerResponseDTO>(options);
  }

  /**
   * Get customer in current store by id.
   *
   * @param {string} customer_id - ID of the customer
   *
   * @return {CustomerResponseDTO} Customer
   */
  public async getById(customer_id: string): Promise<CustomerResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(customer_id) };

    return this._execute<CustomerResponseDTO>(options);
  }

  /**
   * Update customer.
   *
   * @param {string} customer_id
   *
   * @param {CustomerRequestDTO} body
   *
   * @return {CustomerResponseDTO} Customer
   */
  public async update(
    customer_id: string,
    body?: CustomerRequestDTO,
  ): Promise<CustomerResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.by_id(customer_id),
      method: "PATCH",
      ...(body && { data: { schema: create_update, content: body } }),
    };

    return this._execute<CustomerResponseDTO>(options);
  }

  /** Customer Token API */
  public get Tokens(): TokenApi {
    return this.__tokens;
  }

  /** Customer Inventory API */
  public get Inventory(): InventoryApi {
    return this.__inventory;
  }
}
