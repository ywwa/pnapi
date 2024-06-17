export * from "./store.member.dto";

import { Currency, Game, Member, User } from "../types";

export interface StoreRequestDTO {
  slug?: string;
  name?: string;
}

export interface StoreResponseDTO {
  id: string;
  owner: User;
  slug: string;
  name: string;
  game: Game;
  currency: Currency;
  description: string;
  created_at: Date;
  logo_url: string;
  logo_square_url: string;
  updated_by: User;
  updated_at: Date;
  members: Member[];
}
