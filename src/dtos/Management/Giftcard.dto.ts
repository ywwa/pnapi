import { type Giftcard } from "../../types";

export interface GiftcardResponseDTO extends Giftcard {}

export interface GiftcardCreateDTO {
  code: string;
  note?: string;
  enabled: boolean;
  usable_at?: Date;
  expires_at?: Date;
  starting_balance: number;
}

export interface GiftcardUpdateDTO
  extends Partial<Omit<GiftcardCreateDTO, "starting_balance">> {
  balance?: number;
}
