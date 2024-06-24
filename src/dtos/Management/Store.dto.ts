import { type Dashboard, type Member, type Store } from "../../types";

export interface StoreResponseDTO extends Store {}

export interface StoreCreateDTO
  extends Pick<Store, "name" | "slug" | "game" | "currency" | "description"> {}

export interface StoreUpdateDTO extends Partial<Pick<Store, "slug" | "name">> {}

export interface MemberResponseDTO extends Member {}

export interface DashboardResponseDTO extends Dashboard {}

export interface DashboardRequestDTO {
  /** timezone */
  tz: string;
}

export interface StatOrderRequestDTO {
  start: Date;
  end: Date;
  tz?: string;
}
export interface StatOrderResponseDTO {
  day: Date;
  total: number;
  total_orders: number;
}

export interface StatProductRequestDTO {
  start: Date;
  end: Date;
  tz?: string;
  limit?: number;
}

export interface StatProductResponseDTO {
  store_id: string;
  product_id: string;
  total_lines: number;
  sum_quantity: number;
  total_earnings: number;
  net_earnings: number;
}
