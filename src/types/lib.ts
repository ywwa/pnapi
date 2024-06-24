import { type ZodSchema } from "zod";

export type ClientConfig = {
  api_key: string;
  store_id: string;
};

export type ApiConfig = ClientConfig & {
  customer_ip?: string;
  customer_countrycode?: string;
};

export const Auths = {
  /** UNDOCUMENTED */
  User: "User",
  Api: "apikey",
  Customer: "customer",
  Anonymous: "anonymous",
} as const;

export type Auth = (typeof Auths)[keyof typeof Auths];

export type AuthOptions = {
  type?: Auth;
  key?: string;
};

export interface HeaderOptions {
  auth: AuthOptions;
  additional?: Record<string, string>;
}

/** Supported HTTP Methods */
export const Methods = {
  Get: "GET",
  Post: "POST",
  Patch: "PATCH",
  Delete: "DELETE",
} as const;

export type Method = (typeof Methods)[keyof typeof Methods];

export interface Options {
  url: string;
  method?: Method;
  headers?: HeaderOptions;
  data?: Record<string, any>;
  search?: Record<string, any>;
}

type ValidationParams = {
  schema: ZodSchema;
  content: Record<string, any>;
};

export interface RequestOptions extends Omit<Options, "data" | "search"> {
  data?: ValidationParams;
  search?: ValidationParams;
}

export interface ApiRequestOptions extends Omit<Options, "headers"> {
  headers: Record<string, string>;
}
