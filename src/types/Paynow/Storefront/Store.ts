import { type Currency, type Game } from "../enum";

/** Store Object */
export type Store = {
  /** Flake */
  id: string;
  /** Slug of the store */
  slug: string;
  /** Name of the store */
  name: string;
  /** Assocated Game with the store */
  game: Game;
  /** Currency of the store */
  currency: Currency;
  /** URL to the logo of the store */
  logo_url?: string;
  /** URL to the square logo of the store */
  logo_square_url?: string;
};
