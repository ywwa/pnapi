import { type Order } from "../../types";

interface OrderDTO extends Order {}

export interface OrderResponseDTO extends OrderDTO {}

export interface OrderLookupDTO {
  order_id?: string;
  subscription_id?: string;
  is_subscription?: boolean;
  limit?: number;
  after?: string;
  before?: string;
}
