import { type ZodSchema } from "zod";

export type ClientConfig = {
  api_key: string;
  store_id: string;
};

export type ApiConfig = ClientConfig & {
  customer_ip?: string;
  customer_countrycode?: string;
};

export enum Auth {
  API = "apikey",
  CUSTOMER = "customer",
  ANONYMOUS = "anonymous",
  /** UNDOCUMENTED */
  USER = "User",
}

export type AuthOptions = {
  type?: Auth;
  key?: string;
};

export interface HeaderOptions {
  auth: AuthOptions;
  additional?: Record<string, string>;
}

export enum Method {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export interface Options {
  url: string;
  method?: Method;
  headers?: HeaderOptions;
  data?: Record<string, any>;
  search?: Record<string, any>;
  // search?: URLSearchParams | string;
}

export interface RequestOptions extends Omit<Options, "data" | "search"> {
  data?: {
    schema: ZodSchema;
    content: Record<string, any>;
  };
  search?: {
    schema: ZodSchema;
    content: Record<string, any>;
  };
}

export interface ApiRequestOptions extends Omit<Options, "headers"> {
  headers: Record<string, string>;
}
