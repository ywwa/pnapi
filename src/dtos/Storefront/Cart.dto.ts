import { type StorefrontCart } from "../../types";

export interface CartResponseDTO extends StorefrontCart {}

export interface CartUpdateDTO {
  product_id: string;
  quantity: number;
}
