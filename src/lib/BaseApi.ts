import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { type Schema } from "zod";
import {
  Access,
  Method,
  type ApiConfig,
  type ApiRequestOptions,
  type HeaderOptions,
  type RequestOptions,
} from "..";

/**
 * Represents a base class for making API requests.
 * @abstract
 */
export abstract class Api {
  protected readonly __config: ApiConfig;

  /**
   * Constructs a new instance of BaseApi.
   * @param {ApiConfig} config - Configuration object.
   */
  constructor(config: ApiConfig) {
    this.__config = config;
  }

  /**
   * Helper method to check if the current authentication type matches any of the required types.
   * Throws an error if authentication type does not match any of the required types.
   * @param {Access[]} requiredAuthTypes - Array of required authentication types for the operation.
   * @throws {Error} Throws an error if authentication type does not match any of the required types.
   */
  protected _check_auth(requiredAuthTypes: Access[]): void {
    const currentAuthType = this.__config.auth.type;
    const validAuthType = requiredAuthTypes.some(
      (type) => type === currentAuthType,
    );

    if (!validAuthType) {
      throw new Error(
        `This method requires ${requiredAuthTypes.join(" or ")} Authentication.`,
      );
    }
  }

  /**
   * Creates URL search parameters from object properties.
   * @param {Record<string, any>} params - Object containing parameters for the URL search.
   * @returns {URLSearchParams} The constructed URLSearchParams object.
   */
  private __make_search_params(params: Record<string, any>): URLSearchParams {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    return searchParams;
  }

  /**
   * Creates request headers for the API request.
   * @param {HeaderOptions} headers - Options object containing header configurations.
   * @returns {Record<string, string>} The constructed headers object.
   */
  private __make_headers(headers: HeaderOptions): Record<string, string> {
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const { auth, additional } = headers;

    if (auth.key && auth.type !== Access.Anonymous)
      defaultHeaders["Authorization"] = `${auth.type} ${auth.key}`;

    if (additional) {
      const additionalHeaders: Record<string, string> = {
        "store-id": "x-paynow-store-id",
        "customer-ip": "x-paynow-customer-ip",
        "customer-countrycode": "x-paynow-customer-countrycode",
      };

      Object.keys(additional).forEach((key) => {
        if (additionalHeaders[key])
          defaultHeaders[additionalHeaders[key]] = additional[key];
      });
    }

    return defaultHeaders;
  }

  /**
   * Constructs additional headers required for the API request.
   *
   * This method ensures that the `store_id` is present in the configuration.
   * It also validates that either `customer_ip` or `customer_country_code` is provided.
   * If these conditions are not met, an error is thrown.
   *
   * The constructed headers include the `store-id` and, if available,
   * the `customer-ip` and `customer-countrycode`.
   *
   * @protected
   * @param {ApiConfig} config - The configuration object containing necessary properties.
   * @returns {Record<string, string>} The constructed headers object.
   * @throws {Error} If `store_id` is missing or neither `customer_ip` nor `customer_country_code` is provided.
   */
  protected _construct_additional_headers(
    config: ApiConfig,
  ): Record<string, string> {
    if (!config.store_id) throw new Error("ERROR: Missing store_id");

    if (!config.customer_ip && !config.customer_country_code)
      throw new Error(
        "Error: Either customer ip or country code most be provided",
      );

    const headers: { [key: string]: string } = {
      "store-id": config.store_id,
    };

    if (config.customer_ip) headers["customer-ip"] = config.customer_ip;
    if (config.customer_country_code)
      headers["customer-countrycode"] = config.customer_country_code;

    return headers;
  }

  /**
   * Validates data using Zod schema.
   * @template T - The type of data to validate.
   * @param {Schema<T>} schema - Zod schema for validation.
   * @param {any} data - Data to validate against the schema.
   * @retruns {T} The validated data.
   * @throws {Error} Throws an error if validation fails.
   */
  private __validate = <T>(schema: Schema<T>, data: any): T => {
    const result = schema.safeParse(data);
    if (!result.success) {
      console.debug(result.error.issues);
      throw new Error("Failed to validate: " + result.error.issues.join(","));
    }

    return result.data;
  };

  /**
   * Executes the API Request.
   * @template T - The expected response data type.
   * @param {ApiRequestOptions} options - Options for the API request.
   * @returns {Promise<T>} A promise resolving with the API response data.
   * @throws {Error} Throws an error if the API request fails.
   */
  private async __exec<T>(options: ApiRequestOptions): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        url: options.url,
        method: options.method,
        headers: options.headers,
        ...(options.data && { data: options.data }),
        ...(options.search && {
          params: this.__make_search_params(options.search),
        }),
      };
      // BUG: when using *BUN* sometimes response is "" on
      //      `/stores/{store.id}/products`
      return await axios(config).then((response) => response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        console.error(axiosError);
        throw new Error(
          `API Request Failed: ${axiosError.response?.status}; ${axiosError.message}`,
        );
      } else {
        throw new Error(`API Request Failed: ${error?.message}`);
      }
    }
  }

  /**
   * Performs an API request with specified options.
   * @template T - The expected response data type.
   * @param {RequestOptions} options - Options for the API request including URL, headers, method, data and search parameters.
   * @returns {Promise<T>} a promise resolving with the API response data.
   */
  protected async _request<T>({
    url,
    headers = { auth: this.__config.auth },
    method = Method.Get,
    data,
    search,
    response,
  }: RequestOptions): Promise<T> {
    const config: ApiRequestOptions = {
      url,
      headers: this.__make_headers(headers),
      method,
      data: data ? this.__validate(data.schema, data.params) : undefined,
      search: search
        ? this.__validate(search.schema, search.params)
        : undefined,
    };
    const apiResponse = await this.__exec<T>(config);
    return response ? this.__validate(response, apiResponse) : apiResponse;
  }
}
