import { type Giftcard } from "../../types";

interface GiftcardDTO extends Giftcard {}

export interface GiftcardResponseDTO extends GiftcardDTO {}

export interface GiftcardCreateDTO
  extends Required<Pick<GiftcardDTO, "code" | "balance" | "enabled" | "note">>,
    Partial<Pick<GiftcardDTO, "expires_at" | "usable_at">> {}

export interface GiftcardLookupDTO {
  limit?: number;
  after?: string;
  before?: string;
  include_canceled?: boolean;
  code?: string;
}

export interface GiftcardUpdateDTO extends Partial<GiftcardCreateDTO> {}
