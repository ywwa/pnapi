import { z, ZodRawShape } from "zod";
import type { AccessType, Header, Method, Search } from "./enum";

export type Authorization = { type: AccessType; key?: string };

export type ApiConfig = { access: Authorization; storeId?: string };

export type CustomerMeta = { ip?: string; country?: string };

export type EndpointHeaders = { required?: Header[]; optional?: Header[] };

export interface Endpoint {
  version: number;
  path: string;
  access?: AccessType[];
  search?: Search[];
  headers?: EndpointHeaders;
}

export type RequestSearch = { [key in Search]?: any };

export type RequestHeader = { [key in Header]?: string };

export type RequestOptions = {
  endpoint: Endpoint;
  method?: Method;
  headers?: RequestHeader;
  search?: RequestSearch;
  body?: Record<string, any>;
};

export type TResponse<T extends z.ZodType<any, any>> = z.infer<T>;

export interface SchemaOptions<T> {
  omit?: Partial<Record<keyof T, true>>;
  pick?: Partial<Record<keyof T, true>>;
  extend?: ZodRawShape;
}
