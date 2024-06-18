import { Member, type Store } from "../../types";

export interface StoreResponseDTO extends Store {}

export interface StoreUpdateRequestDTO
  extends Partial<Pick<Store, "slug" | "name">> {}

export interface MemberResponseDTO extends Member {}
