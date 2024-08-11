import axios, { type AxiosRequestConfig } from "axios";
import {
  AccessType,
  Method,
  type ApiConfig,
  type Endpoint,
  type EndpointHeaders,
  type Header,
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
  /** Client Configuration */
  protected readonly config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

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
    headers?: Header[],
    ephd?: EndpointHeaders,
  ): Record<string, string> => {
    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (headers) {
      Object.entries(headers).forEach(([k, v]) => {
        if (
          (ephd?.required?.includes(k as Header) ||
            ephd?.optional?.includes(k as Header)) &&
          v !== undefined &&
          v !== null
        ) {
          reqHeaders[k] = v;
        }
      });
    }

    if (this.config.access.type !== AccessType.Anonymous) {
      reqHeaders["Authorization"] =
        `${this.config.access.type} ${this.config.access.key}`;
    }

    return reqHeaders;
  };

  /** Get search parameters for request */
  private getSearchParams = (search?: RequestSearch, epsp?: Search[]) => {
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
  };

  /** Get Axios Config */
  private axiosConfig = (opts: RequestOptions): AxiosRequestConfig => ({
    baseURL: this.baseUrl,
    url: this.getEndpoint(opts.endpoint),
    method: opts.method ?? Method.GET,
    headers: this.getHeaders(opts.headers),
    params: this.getSearchParams(opts.search, opts.endpoint.search),
    ...(opts.body && { data: opts.body }),
  });

  /** Perform API Request to the endpoint */
  protected request = async <T>(opts: RequestOptions): Promise<T> => {
    this.checkAuthorization(this.config.access.type, opts.endpoint.access);

    const axiosConfig: AxiosRequestConfig = this.axiosConfig(opts);
    try {
      const response = await axios(axiosConfig);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };
}
