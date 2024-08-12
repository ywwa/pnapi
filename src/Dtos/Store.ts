import { z } from "zod";
import {
  CurrencyEnum,
  DateSchema,
  GameEnum,
  ParseError,
  SlugSchema,
} from "../lib";
import { type Currency, Game } from "../types";
import Member from "./Member";
import User from "./User";

namespace Store {
  export class Response {
    /** Store ID (flake) */
    id: string;
    /** Owner Object (User) */
    owner: Pick<User.Response, "id" | "first_name" | "last_name" | "email">;
    /** Name of the store */
    name: string;
    /** URL-safe store identifier */
    slug: string;
    /** Game associated with the store */
    game: Game;
    /** Main currency of the store */
    currency: Currency;
    /** Description of the store (required if Game === OTHER) */
    description: string;
    /** URL of store logo */
    logo_url: string | null;
    /** URL of square version of the store logo */
    logo_square_logo: string | null;
    /** Date when store was created */
    created_at: Date;
    /** Date when store was last updated */
    updated_at: Date | null;
    /** User who last updated the store (User) */
    updated_by: User.Response | null;
    /** Array of store members (Member[]) */
    members: Member.Response[] | null;

    constructor(payload: unknown) {
      const parsed = Schema.safeParse(payload);
      if (!parsed.success) throw new ParseError(parsed.error);
      Object.assign(this, parsed.data);
    }
  }

  export const Schema = z.object({
    id: z.string(),
    owner: User.Schema.pick({
      id: true,
      first_name: true,
      last_name: true,
      email: true,
    }),
    name: z.string(),
    slug: z.string(),
    game: GameEnum,
    currency: CurrencyEnum,
    description: z.string(),
    logo_url: z.string().nullable(),
    logo_square_url: z.string().nullable(),
    created_at: DateSchema,
    updated_at: DateSchema.nullable(),
    updated_by: User.Schema.nullable(),
    members: Member.Schema.array().nullable(),
  });

  export namespace Create {
    export class Body {
      name: string;
      slug: string;
      currency: Currency;
      game: Game;
      description?: string;

      constructor(payload: unknown) {
        const body = Schema.safeParse(payload);
        if (!body.success) throw new ParseError(body.error);
        Object.assign(this, body.data);
        Object.keys(this).forEach((key) => {
          this[key as keyof this] === undefined &&
            delete this[key as keyof this];
        });
      }
    }

    const Schema = z
      .object({
        name: z.string().min(2).max(24),
        slug: SlugSchema.min(2).max(24),
        currency: CurrencyEnum,
        game: GameEnum,
        description: z.string().min(20).max(400).optional(),
      })
      .refine(
        (data) => {
          if (data.game === Game.Other) {
            return data.description !== undefined;
          }
          return true;
        },
        {
          message: "Description must be provided when game is Other",
          path: ["description"],
        },
      );
  }

  export namespace Update {
    export class Body {
      name?: string;
      slug?: string;

      constructor(payload: unknown) {
        const body = Schema.safeParse(payload);
        if (!body.success) throw new ParseError(body.error);
        Object.assign(this, body.data);
        Object.keys(this).forEach((key) => {
          this[key as keyof this] === undefined &&
            delete this[key as keyof this];
        });
      }
    }

    const Schema = z
      .object({
        name: z.string().min(2).max(24).optional(),
        slug: z.string().min(2).max(24).optional(),
      })
      .refine((data) => data.name || data.slug, {
        message: "At least one of 'name' or 'slug' must be provided",
        path: ["name", "slug"],
      });
  }
}

export default Store;
