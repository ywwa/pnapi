import { z } from "zod";
import { DateSchema, ParseError, SlugSchema } from "../lib";
import User from "./User";

namespace Tag {
  export class Response {
    /** ID of the tag (flake) */
    id: string;
    /** ID of the store (flake) */
    store_id: string;
    /** URL-safe tag identifier */
    slug: string;
    /** Name of the tag */
    name: string;
    /** Description of the tag */
    description: string | null;
    /** Whether the tag is active */
    enabled: boolean;
    /** User who created the tag (User) */
    created_by: Pick<
      User.Response,
      "id" | "first_name" | "last_name" | "email"
    > | null;
    /** Date when the tag was created */
    created_at: Date;
    /** User who last updated the tag (User) */
    updated_by: Pick<
      User.Response,
      "id" | "first_name" | "last_name" | "email"
    > | null;
    /** Date when the tag was last updated */
    updated_at: Date | null;

    constructor(payload: unknown) {
      const tag = Schema.safeParse(payload);
      if (!tag.success) throw new ParseError(tag.error);
      Object.assign(this, tag.data);
    }
  }

  export const Schema = z.object({
    id: z.string(),
    store_id: z.string(),
    slug: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    enabled: z.boolean(),
    created_by: User.Schema.nullable(),
    created_at: DateSchema,
    updated_by: User.Schema.nullable(),
    updated_at: DateSchema.nullable(),
  });

  export namespace Create {
    export class Body {
      name: string;
      slug?: string;
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

    const Schema = z.object({
      name: z.string().min(1).max(36),
      slug: SlugSchema.max(128).optional(),
      description: z.string().max(50000).optional(),
    });
  }

  export namespace Update {
    export class Body {
      name?: string;
      slug?: string;
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

    const Schema = z.object({
      name: z.string().min(1).max(36).optional(),
      slug: SlugSchema.max(128).optional(),
      description: z.string().max(50000).optional(),
    });
  }
}

export default Tag;
