import type { AccessType, Header, Method, Search } from "./enum";

export type Authorization = {
  type: AccessType;
  key?: string;
};

export type ApiConfig = {
  access: Authorization;
  storeId?: string;
};

export type ClientConfig = ApiConfig & {};

export type EndpointHeaders = {
  required?: Header[];
  optional?: Header[];
};

export interface Endpoint {
  version: number;
  path: string;
  access?: AccessType[];
  search?: Search[];
  headers?: EndpointHeaders;
}

export type RequestSearch = { [key in Search]?: any };

export type RequestOptions = {
  endpoint: Endpoint;
  method?: Method;
  headers?: Header[];
  search?: RequestSearch;
  body?: Record<string, any>;
};
