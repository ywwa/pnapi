import { StorefrontCheckout } from "../../types";

export interface CheckoutCreateDTO {
  subscription: boolean;
  lines: Line[];
}

export interface CheckoutResponseDTO extends StorefrontCheckout {}

type Line = {
  product_id: string;
  gift_to?: GiftTo;
  gift_to_customer?: string;
  quantity: number;
};

type GiftTo = {
  platform: string;
  id: string;
};
