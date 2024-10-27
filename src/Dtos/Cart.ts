import { z } from "zod";
import { ParseError } from "../lib";

export type Line = {
  line_key: string;
  product_id: string;
  selected_gameserver_id: string | null;
  selected_gamserver: {} | null;
  slug: string;
  name: string;
  image_url: string | null;
  price: number;
  quantity: number;
};

const LineSchema = z.object({
  line_key: z.string(),
  product_id: z.string(),
  selected_gameserver_id: z.string().nullable(),
  selected_gameserver: z.object({}).nullable(),
  slug: z.string(),
  name: z.string(),
  image_url: z.string().nullable(),
  price: z.number(),
  quantity: z.number(),
});

namespace Cart {
  export class Response {
    /** ID of the store (flake) */
    store_id: string;
    /** ID of the customer (flake) */
    customer_id: string;
    /** Products in the cart */
    lines: Array<Line>;
    /** Currency */
    currency: string;
    /** Total amount */
    total: number;

    constructor(payload: unknown) {
      const cart = Schema.safeParse(payload);
      if (!cart.success) throw new ParseError(cart.error);
      Object.assign(this, cart.data);
    }
  }

  export const Schema = z.object({
    store_id: z.string(),
    customer_id: z.string(),
    lines: LineSchema.array(),
    currency: z.string(),
    total: z.number(),
  });

  export class Search {
    product_id: string;
    quantity: number;

    constructor(payload: unknown) {
      const search = SearchSchema.safeParse(payload);
      if (!search.success) throw new ParseError(search.error);
      Object.assign(this, search.data);
      Object.keys(this).forEach((key) => {
        if (this[key as keyof this] === undefined)
          delete this[key as keyof this];
      });
    }
  }

  const SearchSchema = z.object({
    product_id: z.string(),
    quantity: z.number(),
  });
}

export default Cart;
