import { StoreMembersApi, StoreStatsApi, type StoresEndpoints } from "../../..";
import {
  Access,
  Method,
  type ApiConfig,
  type RequestOptions,
} from "../../../..";
import {
  type StoreCreateDTO,
  type StoreResponseDTO,
  type StoreUpdateDTO,
} from "../../../../dtos";
import {
  Api,
  storeCreateSchema,
  storeResponseSchema,
  storeUpdateSchema,
} from "../../../../lib";

/**
 * Represents an API interface for managing stores.
 * Extends the base Api class with store-specific functionality.
 */
export class StoresApi extends Api {
  private readonly __endpoints: StoresEndpoints;
  private __stats: StoreStatsApi;
  private __members: StoreMembersApi;

  /**
   * Constructs a new StoresApi instance.
   * @param {ApiConfig} config - The configuration object for API settings.
   * @param {StoresEndpoints} endpoints - The endpoints object defining store-related API endpoints.
   */
  constructor(config: ApiConfig, endpoints: StoresEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  /**
   * Creates a new store using the provided data.
   * Requires User authentication.
   * @param {StoreCreateDTO} body - The data representing the store to be created.
   * @returns {Promise<StoreResponseDTO>} A Promise resolving to the created store response data.
   * @throws {Error} Throws an error if authentication type is not User or if there's an API request error.
   */
  async create(body: StoreCreateDTO): Promise<StoreResponseDTO> {
    try {
      this._check_auth([Access.User]);

      const options: RequestOptions = {
        url: this.__endpoints.base,
        method: Method.Post,
        data: { schema: storeCreateSchema, params: body },
        response: storeResponseSchema,
      };

      return this._request<StoreResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Retrieves details of a store by its ID.
   * Requires User authentication.
   * @param {string} [storeId] - Optional. The ID of the store to retrieve. If not provided, uses the configured store ID.
   * @returns {Promise<StoreResponseDTO>} A Promise resolving to the store details.
   * @throws {Error} Throws an error if authentication type is not User, if no store ID is provided, or if there's an API request error.
   */
  async get(storeId?: string): Promise<StoreResponseDTO> {
    try {
      let id: string;

      if (!storeId && !this.__config.store_id)
        throw new Error("No store_id provided.");

      id = storeId || this.__config.store_id!;

      const options: RequestOptions = {
        url: this.__endpoints.byId(id),
        response: storeResponseSchema,
      };
      return await this._request<StoreResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Retrieves details of all stores.
   * Requires User authentication.
   * @returns {Promise<StoreResponseDTO[]>} A Promise resolving to an array of store details.
   * @throws {Error} Throws an error if authentication type is not User or if there's an API request error.
   */
  async getAll(): Promise<StoreResponseDTO[]> {
    try {
      this._check_auth([Access.User]);
      const options: RequestOptions = {
        url: this.__endpoints.base,
        response: storeResponseSchema,
      };
      return this._request<StoreResponseDTO[]>(options);
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Updates details of a store by its ID.
   * Requires User or Api authentication.
   * @param {string} storeId - The ID of the store to update.
   * @param {StoreUpdateDTO} body - The data representing the store updates.
   * @returns {Promise<StoreResponseDTO>} A Promise resolving to the updated store response data.
   * @throws {Error} Throws an error if authentication type is not User or Api, or if there's an API request error.
   */
  async update(
    storeId: string,
    body: StoreUpdateDTO,
  ): Promise<StoreResponseDTO> {
    try {
      this._check_auth([Access.User, Access.Api]);

      const options: RequestOptions = {
        url: this.__endpoints.byId(storeId),
        method: Method.Patch,
        data: { schema: storeUpdateSchema, params: body },
        response: storeResponseSchema,
      };

      return this._request<StoreResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Deletes a store by its ID.
   * Requires User authentication.
   * @param {string} storeId - The ID of the store to delete.
   * @returns {Promise<void>} A Promise indicating the success of the delete operation.
   * @throws {Error} Throws an error if authentication type is not User or if there's an API request error.
   */
  async delete(storeId: string): Promise<void> {
    try {
      this._check_auth([Access.User]);

      const options: RequestOptions = {
        url: this.__endpoints.byId(storeId),
        method: Method.Delete,
      };

      return this._request<void>(options);
    } catch (error: any) {
      throw error;
    }
  }

  Stats(storeId?: string): StoreStatsApi {
    if (!this.__stats) {
      let id: string;
      if (!storeId && !this.__config.store_id)
        throw new Error("No store_id provided.");

      id = storeId || this.__config.store_id!;

      this.__stats = new StoreStatsApi(
        this.__config,
        this.__endpoints.stats(id),
      );
    }

    return this.__stats;
  }

  Members(storeId?: string): StoreMembersApi {
    if (!this.__members) {
      let id: string;
      if (!storeId && !this.__config.store_id)
        throw new Error("No store_id provided.");

      id = storeId || this.__config.store_id!;

      this.__members = new StoreMembersApi(
        this.__config,
        this.__endpoints.members(id),
      );
    }

    return this.__members;
  }
}
