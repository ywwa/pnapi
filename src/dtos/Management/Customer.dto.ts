import {
  type Customer,
  type Item,
  type Product,
  type Token,
} from "../../types";

export interface CustomerResponseDTO extends Customer {}

export interface CustomerRequestDTO
  extends Partial<Pick<Customer, "steam_id" | "name" | "metadata">> {}

export interface CustomerLookupRequestDTO
  extends Partial<Pick<Customer, "id" | "steam_id">> {}

export interface TokenResponseDTO extends Token {}

export interface InventoryResponseDTO extends Item {}

export interface InventoryRequestDTO
  extends Partial<{
    product_id: Product["id"];
    product_version_id: Product["version_id"];
  }> {
  quantity?: number;
}
