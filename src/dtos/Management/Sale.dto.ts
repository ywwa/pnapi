import { Discount, Sale } from "../../types";

export interface SaleResponseDTO extends Sale {}

export interface SaleCreateDTO {
  name: string;
  enabled?: boolean;
  apply_to_tags?: string[];
  apply_to_products?: string[];
  discount_type: Discount;
  discount_amount: number;
  minimum_order_value?: number;
  begins_at?: Date;
  ends_at?: Date;
}

export interface SaleUpdateDTO extends Partial<SaleCreateDTO> {}
