import { type ZodSchema } from "zod";

export type CustomerMeta = {
  customer_ip?: string;
  customer_country_code?: string;
};

export type ClientConfig = { auth: Auth; store_id?: string } & CustomerMeta;

export type ApiConfig = ClientConfig & {};

export const Access = {
  User: "user",
  Api: "apikey",
  Customer: "customer",
  Gameserver: "gameserver",
  Anonymous: "anonymous",
} as const;

export type Access = (typeof Access)[keyof typeof Access];

export type Auth = { type: Access; key?: string };

export type HeaderOptions = {
  auth: Auth;
  additional?: Record<string, string>;
};

/** Supported HTTP Methods */
export const Method = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Patch: "PATCH",
  Delete: "DELETE",
} as const;

export type Method = (typeof Method)[keyof typeof Method];

type Options = {
  url: string;
  method?: Method;
  headers?: HeaderOptions;
  data?: Record<string, any>;
  search?: Record<string, any>;
};

export type ApiRequestOptions = Omit<Options, "headers"> & {
  headers: Record<string, string>;
};

type ValidationOptions = {
  schema: ZodSchema;
  params: Record<string, any>;
};

export type RequestOptions = Omit<Options, "data" | "search"> & {
  data?: ValidationOptions;
  search?: ValidationOptions;
  response?: ZodSchema;
};
