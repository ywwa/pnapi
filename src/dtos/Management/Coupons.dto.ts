import { type Coupon, type Discount } from "../../types";

interface CouponDTO extends Coupon {}

export interface CouponResponseDTO extends CouponDTO {}

export interface CouponCreateDTO {
  enabled?: boolean;
  code: string;
  note?: string;
  apply_to_tags?: string[];
  apply_to_products?: string[];
  discount_type: Discount;
  discount_amount: number;
  discount_apply_individually?: boolean;
  discount_apply_before_sales?: boolean;
  usable_by_customer_id?: string;
  minimum_order_value?: number;
  redeem_limit_store_enabled?: boolean;
  redeem_limit_store_amount?: number;
  redeem_limit_customer_enabled?: boolean;
  redeem_limit_customer_amount?: number;
  usable_on_one_time_purchase?: boolean;
  usable_on_subscription?: boolean;
  usable_at?: Date;
  expires_at?: Date;
}

export interface CouponUpdateDTO extends Partial<CouponCreateDTO> {}
