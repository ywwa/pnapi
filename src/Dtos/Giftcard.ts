import { z } from "zod";
import { CodeSchema, DateSchema, ParseError } from "../lib";
import User from "./User";

namespace Giftcard {
  export class Response {
    /** ID of the giftcard (flake) */
    id: string;
    /** ID of the store (flake) */
    store_id: string;
    /** Whether the giftcard is enabled */
    enabled: boolean;
    /** Code */
    code: string;
    /** Note */
    note: string;
    /** Balance of the giftcard */
    balance: number;
    /** Initial balance of the giftcard */
    starting_balance: number;
    /** Date when giftcard becomes usable */
    usable_at: Date;
    /** Date when giftcard expires */
    expires_at: Date | null;
    /** User who created the giftcard */
    created_by: Pick<User.Response, "id" | "first_name" | "last_name"> | null;
    /** Date when giftcard was created */
    created_at: Date;
    /** User who last updated the giftcard */
    updated_by: Pick<User.Response, "id" | "first_name" | "last_name"> | null;
    /** Date when giftcard was last updated */
    updated_at: Date | null;
    /** User who canceled the giftcard */
    canceled_by: Pick<User.Response, "id" | "first_name" | "last_name"> | null;
    /** Date when giftcard was canceled */
    canceled_at: Date | null;

    constructor(payload: unknown) {
      const giftcard = Schema.safeParse(payload);
      if (!giftcard.success) throw new ParseError(giftcard.error);
      Object.assign(this, giftcard.data);
    }
  }

  export const Schema = z.object({
    id: z.string(),
    store_id: z.string(),
    enabled: z.boolean(),
    code: z.string(),
    note: z.string(),
    balance: z.number(),
    starting_balance: z.number(),
    usable_at: DateSchema,
    expires_at: DateSchema.nullable(),
    created_by: User.Schema.pick({
      id: true,
      first_name: true,
      last_name: true,
    }).nullable(),
    created_at: DateSchema,
    updated_by: User.Schema.pick({
      id: true,
      first_name: true,
      last_name: true,
    }).nullable(),
    updated_at: DateSchema.nullable(),
    canceled_by: User.Schema.pick({
      id: true,
      first_name: true,
      last_name: true,
    }).nullable(),
    canceled_at: DateSchema.nullable(),
  });

  export class Search {
    limit?: number;
    after?: string;
    before?: string;
    include_canceled?: boolean;
    code?: string;

    constructor(payload: unknown) {
      const search = SearchSchema.safeParse(payload);
      if (!search.success) throw new ParseError(search.error);
      Object.assign(this, search.data);
      Object.keys(this).forEach((key) => {
        this[key as keyof this] === undefined && delete this[key as keyof this];
      });
    }
  }

  const SearchSchema = z.object({
    limit: z.number().optional(),
    after: z.string().optional(),
    before: z.string().optional(),
    include_canceled: z.boolean().optional(),
    code: z.string().optional(),
  });

  export namespace Create {
    export class Body {
      code: string;
      note: string;
      enabled?: boolean;
      usable_at?: Date | string;
      expires_at?: Date | string;
      balance: number;

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

    const Schema = z.object({
      code: CodeSchema.min(1).max(50),
      note: z.string().min(1).max(200),
      enabled: z.boolean().default(true),
      usable_at: z
        .date()
        .transform((date) => date.toJSON())
        .optional(),
      expires_at: z
        .date()
        .transform((date) => date.toJSON())
        .optional(),
      balance: z.number().min(1).max(100000),
    });
  }

  export namespace Update {
    export class Body {
      code?: string;
      note?: string;
      enabled?: boolean;
      usable_at?: Date | string;
      expires_at?: Date | string;
      balance?: number;

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

    const Schema = z.object({
      code: CodeSchema.min(1).max(50).optional(),
      note: z.string().min(1).max(200).optional(),
      enabled: z.boolean().optional(),
      usable_at: z
        .date()
        .transform((date) => date.toJSON())
        .optional(),
      expires_at: z
        .date()
        .transform((date) => date.toJSON())
        .optional(),
      balance: z.number().min(1).max(100000).optional(),
    });
  }
}

export default Giftcard;
