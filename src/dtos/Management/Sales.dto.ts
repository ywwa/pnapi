import { type Sale } from "../../types";

interface SaleDTO extends Sale {}

export interface SaleResponseDTO extends SaleDTO {}

export interface SaleCreateDTO
  extends Pick<Sale, "name" | "discount_amount" | "discount_type">,
    Partial<
      Pick<
        Sale,
        | "begins_at"
        | "ends_at"
        | "apply_to_tags"
        | "apply_to_products"
        | "minimum_order_value"
      >
    > {}

export interface SaleUpdateDTO extends Partial<SaleCreateDTO> {}
