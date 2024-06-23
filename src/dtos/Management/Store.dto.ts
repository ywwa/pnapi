import { type Dashboard, type Member, type Store } from "../../types";

export interface StoreResponseDTO extends Store {}

export interface StoreUpdateRequestDTO
  extends Partial<Pick<Store, "slug" | "name">> {}

export interface MemberResponseDTO extends Member {}

export interface DashboardResponseDTO extends Dashboard {}
export interface DashboardRequestDTO {
  /** timezone */
  tz: string;
}

export interface OrderRequestDTO {
  start: Date;
  end: Date;
  tz?: string;
}
export interface OrderResponseDTO {
  day: Date;
  total: number;
  total_orders: number;
}

export interface ProductRequestDTO {
  start: Date;
  end: Date;
  tz?: string;
  limit?: number;
}

export interface ProductResponseDTO {
  store_id: string;
  product_id: string;
  total_lines: number;
  sum_quantity: number;
  total_earnings: number;
  net_earnings: number;
}
