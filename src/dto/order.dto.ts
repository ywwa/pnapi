import { type Order } from "../types";

export interface OrderRequestDTO {
  order_id?: string;
  subscription_id?: string;
  is_subscription?: boolean;
  limit?: number;
  after?: string;
  before?: string;
}

export interface OrderResponseDTO extends Order {}
