import { Product, type Customer, type Item, type Token } from "../../types";

export interface CustomerResponseDTO extends Customer {}

export interface CustomerCreateDTO
  extends Partial<Pick<Customer, "steam_id" | "name" | "metadata">> {}

export interface CustomerLookupDTO
  extends Partial<Pick<Customer, "id" | "steam_id">> {}

export interface CustomerUpdateDTO extends CustomerCreateDTO {}

export interface TokenResponseDTO extends Token {}

export interface ItemResponseDTO extends Item {}

export interface ItemAssignDTO
  extends Partial<{
    product_id: Product["id"];
    product_version_id: Product["version_id"];
  }> {
  quantity?: number;
}
