import {
  Product,
  type Item,
  type ManagementCustomer,
  type Token,
} from "../../types";

export interface CustomerResponseDTO extends ManagementCustomer {}

export interface CustomerCreateDTO
  extends Partial<Pick<ManagementCustomer, "steam_id" | "name" | "metadata">> {}

export interface CustomerLookupDTO
  extends Partial<Pick<ManagementCustomer, "id" | "steam_id">> {}

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
