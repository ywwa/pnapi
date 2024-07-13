import { Member, type Dashboard, type ManagementStore } from "../..";

export interface StoreResponseDTO extends ManagementStore {}

export interface StoreCreateDTO
  extends Pick<
    ManagementStore,
    "name" | "slug" | "game" | "currency" | "description"
  > {}

export interface StoreUpdateDTO
  extends Partial<Pick<ManagementStore, "slug" | "name">> {}

export interface StatsDashboardDTO extends Dashboard {}

export interface StatsOrdersDTO {
  date: Date;
  total: number;
  total_orders: number;
}

export interface StatsProductsDTO {
  store_id: string;
  product_id: string;
  total_lines: number;
  sum_quantity: number;
  total_earnings: number;
  net_earnings: number;
}

export interface StatsRequestDTO {
  tz: string;
  start: Date;
  end: Date;
  limit?: number;
}

export interface MemberResponseDTO extends Member {}
