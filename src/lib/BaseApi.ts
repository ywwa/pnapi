import axios, { type AxiosRequestConfig } from "axios";
import {
  AccessType,
  Header,
  Method,
  type ApiConfig,
  type CustomerMeta,
  type Endpoint,
  type EndpointHeaders,
  type RequestHeader,
  type RequestOptions,
  type RequestSearch,
  type Search,
} from "../types";
import { AccessError } from "./errors";

const joinPath = (base: string, ...parts: string[]): string =>
  [base, ...parts].join("/");

export class BaseApi {
  /** Base API Url */
  private readonly baseUrl: string = "https://api.paynow.gg";
  /** Api Client Configuration */
  protected readonly config: ApiConfig;
  /** Customer Meta */
  protected customer?: CustomerMeta;

  constructor(config: ApiConfig);
  constructor(config: ApiConfig, meta: CustomerMeta);

  constructor(config: ApiConfig, meta?: CustomerMeta) {
    this.config = config;
    if (meta) this.customer = meta;
  }

  protected storeId = (storeId: string | undefined): string => {
    if (!storeId && !this.config.storeId) throw new Error("Missing store_id");
    return storeId ?? this.config.storeId!;
  };

  /** Check if the client has access to the endpoint */
  private checkAuthorization = (
    current: AccessType,
    accepted?: AccessType[],
  ): void => {
    if (!accepted?.some((type) => type === current)) {
      throw new AccessError();
    }
  };

  /** Build API Endpoint string */
  private getEndpoint = (ep: Endpoint): string =>
    joinPath(`v${ep.version}`, ep.path);

  /** Get headers for request */
  private getHeaders = (
    headers?: RequestHeader,
    ephd?: EndpointHeaders,
    withMeta: boolean = false,
  ): Record<string, string> => {
    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.config.access.type !== AccessType.Anonymous) {
      reqHeaders["Authorization"] =
        `${this.config.access.type} ${this.config.access.key}`;
    }

    if (headers && ephd) {
      const allHeaders = [...(ephd.required ?? []), ...(ephd.optional ?? [])];

      Object.entries(headers).forEach(([key, value]) => {
        if (allHeaders.includes(key as Header) && value !== undefined)
          reqHeaders[key] = value;
      });
    }

    if (withMeta && this.customer) {
      const { ip, country } = this.customer;
      if (ip) reqHeaders[Header.CustomerIp] = ip;
      if (country) reqHeaders[Header.CustomerCountry] = country;
    }

    return reqHeaders;
  };

  /** Get search parameters for request */
  private getSearchParams = (
    search?: RequestSearch,
    epsp?: Search[],
  ): URLSearchParams => {
    const reqParams = new URLSearchParams();

    if (search) {
      Object.entries(search).forEach(([k, v]) => {
        if (
          epsp?.includes(k as Search) &&
          v !== undefined &&
          v !== null &&
          v !== ""
        ) {
          reqParams.append(k, String(v));
        }
      });
    }

    return reqParams;
  };

  /** Get Axios Config */
  private axiosConfig = (
    opts: RequestOptions,
    withMeta: boolean = false,
  ): AxiosRequestConfig => ({
    baseURL: this.baseUrl,
    url: this.getEndpoint(opts.endpoint),
    method: opts.method ?? Method.GET,
    headers: this.getHeaders(opts.headers, opts.endpoint.headers, withMeta),
    ...(opts.search && {
      params: this.getSearchParams(opts.search, opts.endpoint.search),
    }),
    ...(opts.body && { data: opts.body }),
  });

  /** Perform API Request to the endpoint */
  protected request = async <T>(
    opts: RequestOptions,
    withMeta: boolean = false,
  ): Promise<T> => {
    this.checkAuthorization(this.config.access.type, opts.endpoint.access);

    const axiosConfig: AxiosRequestConfig = this.axiosConfig(opts, withMeta);
    try {
      const response = await axios(axiosConfig);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };
}
