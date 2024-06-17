import { type Item } from "../types";

export interface CustomerInventoryResponseDTO extends Item {}

export interface CustomerInventoryRequestDTO {
  product_id?: string;
  product_version_id?: string;
  quantity?: number;
}
