import { type Customer } from "../types";

export * from "./customer.inventory.dto";
export * from "./customer.token.dto";

export interface CustomerLookupRequestDTO {
  id?: string;
  steam_id?: string;
}

export interface CustomerRequestDTO {
  steam_id?: string;
  name?: string;
  metadata?: {
    [key: string]: string;
  };
}

export interface CustomerResponseDTO extends Customer {}
