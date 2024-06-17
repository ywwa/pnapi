import axios, { AxiosRequestConfig } from "axios";
import { AuthTypes, RequestMethods, ServiceConfig } from "../types";

type Auth = { type: AuthTypes; key?: string };

type HeaderOptions = {
  store_id?: string;
  customer_ip?: string;
  customer_countrycode?: string;
};

interface HeaderDTO {
  auth: Auth;
  options?: HeaderOptions;
}

interface RequestDTO {
  url: string;
  method?: RequestMethods;
  auth?: Auth;
  body?: any;
  options?: HeaderOptions;
  searchParams?: URLSearchParams;
}

interface ApiRequestDTO {
  url: string;
  headers: Record<string, string>;
  method?: RequestMethods;
  body?: any;
  searchParams?: URLSearchParams;
}

export abstract class BaseAPI {
  protected readonly config: ServiceConfig;

  constructor(config: ServiceConfig) {
    this.config = config;
  }

  private _headers({ auth, options }: HeaderDTO): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    switch (auth.type) {
      case AuthTypes.API:
        if (auth.key) headers["Authorization"] = `${AuthTypes.API} ${auth.key}`;
        break;
      case AuthTypes.CUSTOMER:
        if (auth.key)
          headers["Authorization"] = `${AuthTypes.CUSTOMER} ${auth.key}`;
        break;
      case AuthTypes.ANONYMOUS:
        break;
    }

    if (options) {
      if (options.store_id) headers["x-paynow-store-id"] = options.store_id;
      if (auth.type !== AuthTypes.ANONYMOUS) {
        if (options.customer_ip)
          headers["x-paynow-customer-ip"] = options.customer_ip;
        if (options.customer_countrycode)
          headers["x-paynow-customer-countrycode"] =
            options.customer_countrycode;
      }
    }

    return headers;
  }
  private async _apiRequest<T>({
    url,
    method = RequestMethods.GET,
    headers,
    body,
    searchParams,
  }: ApiRequestDTO): Promise<T> {
    const axiosConfig: AxiosRequestConfig = {
      url,
      method,
      headers,
      data: body,
      params: searchParams,
    };

    try {
      const response = await axios(axiosConfig);
      return response.data;
    } catch (error) {
      throw new Error("ERROR");
    }
  }

  protected async request<T>({
    url,
    method = RequestMethods.GET,
    auth = { type: AuthTypes.API, key: this.config.apikey },
    body,
    options,
    searchParams,
  }: RequestDTO): Promise<T> {
    const headers = this._headers({
      auth: { type: auth.type, key: auth.key },
      options,
    });

    return this._apiRequest<T>({ url, method, headers, body, searchParams });
  }
}
