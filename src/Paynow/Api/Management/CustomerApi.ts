import { ZodIssueCode, z, type ZodSchema } from "zod";
import { InventoryApi, TokenApi } from ".";
import {
  type CustomerLookupRequestDTO,
  type CustomerRequestDTO,
  type CustomerResponseDTO,
} from "../../../dtos";
import { BaseApi } from "../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../types";
import { type CustomerEndpoints } from "../../Endpoint";

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
    const schema: ZodSchema = z.object({
      steam_id: z.optional(z.string()),
      name: z.optional(z.string().max(50)),
      metadata: z.optional(
        z
          .record(z.string().max(40), z.string().max(500))
          .superRefine((metadata, ctx) => {
            if (Object.keys(metadata).length > 50) {
              ctx.addIssue({
                code: ZodIssueCode.custom,
                message: "Metadata must not exceed 50 key-value pairs",
              });
            }
          }),
      ),
    });

    const options: RequestOptions = {
      url: this.__ep.base(),
      method: Method.POST,
      ...(body && { data: { schema, content: body } }),
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
  public async lookup(
    params: CustomerLookupRequestDTO,
  ): Promise<CustomerResponseDTO> {
    const schema: ZodSchema = z
      .object({
        id: z.string(),
        steam_id: z.string(),
      })
      .partial()
      .refine(
        (data) => !!data.id || !!data.steam_id,
        "Either id or steam_id must be specified",
      );

    const options: RequestOptions = {
      url: this.__ep.lookup(),
      search: { schema, content: params },
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
    const schema: ZodSchema = z.object({
      steam_id: z.optional(z.string()),
      name: z.optional(z.string().max(50)),
      metadata: z.optional(
        z
          .record(z.string().max(40), z.string().max(500))
          .superRefine((metadata, ctx) => {
            if (Object.keys(metadata).length > 50) {
              ctx.addIssue({
                code: ZodIssueCode.custom,
                message: "Metadata must not exceed 50 key-value pairs",
              });
            }
          }),
      ),
    });

    const options: RequestOptions = {
      url: this.__ep.by_id(customer_id),
      method: Method.PATCH,
      ...(body && { data: { schema, content: body } }),
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
