import axios, { type AxiosRequestConfig } from "axios";
import { type Schema } from "zod";
import {
  Auth,
  Method,
  type ApiConfig,
  type ApiRequestOptions,
  type HeaderOptions,
  type RequestOptions,
} from "../types";

export abstract class BaseApi {
  protected readonly _config: ApiConfig;

  constructor(config: ApiConfig) {
    this._config = config;
  }

  /**
   * Make Headers for API Request
   *
   * @param {HeaderOptions} options
   *
   * @return {Record<string, string>} Record<string, string>
   */
  private __make_headers = (options: HeaderOptions): Record<string, string> => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const { auth, additional } = options;

    switch (auth.type) {
      case Auth.API:
        if (auth.key) headers["Authorization"] = `${Auth.API} ${auth.key}`;
        break;
      case Auth.CUSTOMER:
        if (auth.key) headers["Authorization"] = `${Auth.CUSTOMER} ${auth.key}`;
        break;
      case Auth.USER:
        if (auth.key) headers["Authorization"] = `${Auth.USER} ${auth.key}`;
        break;
      case Auth.ANONYMOUS:
        break;
    }

    if (additional) {
      if (additional["store-id"])
        headers["x-paynow-store-id"] = additional["store-id"];
      if (additional["customer-ip"])
        headers["x-paynow-customer-ip"] = additional["customer-ip"];
      if (additional["customer-countrycode"])
        headers["x-paynow-customer-countrycode"] =
          additional["customer-countrycode"];
    }

    return headers;
  };

  /**
   * Make URL Search Parameters for API Request
   *
   * @param {Record<string, any>} params
   *
   * @return {URLSearchParams} URLSearchParams
   */
  private __make_search_params = (
    params: Record<string, any>,
  ): URLSearchParams => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    return searchParams;
  };

  /**
   * Validate data using Zod Library
   *
   * @param {Schema<T>} schema
   * @param {any} data
   *
   * @return {T | Never} T | Never
   */
  private __validate = <T>(schema: Schema<T>, data: any): T | never => {
    const result = schema.safeParse(data);

    if (!result.success)
      throw new Error(
        `Validation FAILED on: ${result.error.issues.join(", ")}`,
      );

    return result.data;
  };

  /**
   * Execute API Request using Axios Library
   *
   * @param {ApiRequestOptions} options
   *
   * @return {Promise<T>} Promise<T>
   */
  private __request = async <T>(options: ApiRequestOptions): Promise<T> => {
    const config: AxiosRequestConfig = {
      url: options.url,
      method: options.method,
      headers: options.headers,
      data: options.data,
      params: options.search
        ? this.__make_search_params(options.search)
        : undefined,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        throw new Error(`Error: [${error.status}] ${error.message}`);
      else throw new Error("Unhandled Error");
    }
  };

  /**
   * Prepare data for executing API Request
   *
   * @param {RequestOptions} options
   *
   * @return {Promise<T>} Promise<T>
   */
  protected async _execute<T>({
    url,
    headers = { auth: { type: Auth.API, key: this._config.api_key } },
    method = Method.GET,
    data,
    search,
  }: RequestOptions): Promise<T> {
    const config: ApiRequestOptions = {
      url,
      headers: this.__make_headers(headers),
      method,
      data: data ? this.__validate(data.schema, data.content) : undefined,
      search: search
        ? this.__validate(search.schema, search.content)
        : undefined,
    };

    return this.__request<T>(config);
  }
}
