import { type Currency, type Game, type Member, type User } from ".";

/** Store object */
export type Store = {
  /** Flake */
  id: string;
  /** Store owner object */
  owner: Omit<User, "created_at">;
  /** URL safe name of the store */
  slug: string;
  /** Name of the store */
  name: string;
  /** Game assoicated with the store */
  game: Game;
  /** Currency of the store */
  currency: Currency;
  /** Description of the store */
  description: string;
  /** The date this store was created */
  created_at: Date;
  /** URL to the logo of the store */
  logo_url?: string;
  /** URL to the square logo of the store */
  logo_square_url?: string;
  /** The user that last updated this store */
  updated_by?: Omit<User, "created_at">;
  /** The date this store was updated */
  updated_at?: Date;
  /** Members of the store */
  members?: Member[];
};
