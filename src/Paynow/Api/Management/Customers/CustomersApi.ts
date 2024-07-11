import { CustomersInventoryApi, CustomersTokensApi } from ".";
import {
  type CustomerCreateDTO,
  type CustomerLookupDTO,
  type CustomerResponseDTO,
  type CustomerUpdateDTO,
} from "../../../../dtos";
import {
  Api,
  customerCreateSchema,
  customerLookupSchema,
  customerResponseSchema,
  customerUpdateSchema,
} from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type CustomersEndpoints } from "../../../Endpoint";

export class CustomersApi extends Api {
  private readonly __endpoints: CustomersEndpoints;
  private __tokensApi: CustomersTokensApi;
  private __inventoryApi: CustomersInventoryApi;

  constructor(config: ApiConfig, endpoints: CustomersEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async create(body: CustomerCreateDTO): Promise<CustomerResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        method: Method.Post,
        data: { schema: customerCreateSchema, params: body },
        response: customerResponseSchema,
      };

      return this._request<CustomerResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getAll(): Promise<CustomerResponseDTO[]> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        response: customerResponseSchema.array(),
      };
      return this._request<CustomerResponseDTO[]>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getById(customerId: string): Promise<CustomerResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(customerId),
        response: customerResponseSchema,
      };
      return this._request<CustomerResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async lookup(params: CustomerLookupDTO): Promise<CustomerResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.lookup,
        search: { schema: customerLookupSchema, params },
        response: customerResponseSchema,
      };
      return this._request<CustomerResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async update(
    customerId: string,
    body: CustomerUpdateDTO,
  ): Promise<CustomerResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(customerId),
        method: Method.Patch,
        data: { schema: customerUpdateSchema, params: body },
        response: customerResponseSchema,
      };
      return this._request<CustomerResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  get Tokens(): CustomersTokensApi {
    if (!this.__tokensApi)
      this.__tokensApi = new CustomersTokensApi(
        this.__config,
        this.__endpoints.tokens,
      );

    return this.__tokensApi;
  }

  get Inventory(): CustomersInventoryApi {
    if (!this.__inventoryApi)
      this.__inventoryApi = new CustomersInventoryApi(
        this.__config,
        this.__endpoints.inventory,
      );

    return this.__inventoryApi;
  }
}
