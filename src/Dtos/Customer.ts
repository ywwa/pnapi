import { z } from "zod";
import {
  DateSchema,
  GenericProfileSchema,
  MetadataSchema,
  ParseError,
  ProfileSchema,
} from "../lib";
import { GenericProfile, Profile } from "../types";
import User from "./User";

namespace Customer {
  export class Response {
    /** Customer ID (flake) */
    id: string;
    /** Store ID (flake) */
    store_id: string;
    /** Generic Customer Profile (GenericProfile) */
    profile: GenericProfile | null;
    /** Steam ID */
    steam_id: string | null;
    /** Steam Profile (Profile) */
    steam: Profile | null;
    /** Minecraft UUID */
    minecraft_uuid: string | null;
    /** Minecraft Profile (Profile) */
    minecraft: Profile | null;
    /** Customer Display Name */
    name: string | null;
    /** Metadata */
    metadata: { [key: string]: string } | null;
    /** User who created the customer */
    created_by: Pick<
      User.Response,
      "id" | "first_name" | "last_name" | "email"
    > | null;
    /** Date when customer was created */
    created_at: Date;
    /** User who last updated the customer */
    updated_by: Pick<
      User.Response,
      "id" | "first_name" | "last_name" | "email"
    > | null;
    /** Date when customer was last updated */
    updated_at: Date | null;

    constructor(payload: unknown) {
      const customer = Schema.safeParse(payload);
      if (!customer.success) throw new ParseError(customer.error);
      Object.assign(this, customer.data);
    }
  }

  export const Schema = z.object({
    id: z.string(),
    store_id: z.string(),
    profile: GenericProfileSchema.nullable(),
    steam_id: z.string().nullable(),
    steam: ProfileSchema.nullable(),
    minecraft_uuid: z.string().nullable(),
    minecraft: ProfileSchema.nullable(),
    name: z.string().nullable(),
    metadata: z.record(z.string(), z.string()).nullable(),
    created_by: User.Schema.nullable(),
    created_at: DateSchema,
    updated_by: User.Schema.nullable(),
    updated_at: DateSchema.nullable(),
  });

  export namespace Create {
    export class Body {
      /** Steam ID */
      steam_id?: string;
      /** Minecraft UUID */
      minecraft_uuid?: string;
      /** Name */
      name?: string;
      /** Metadata */
      metadata?: { [key: string]: string };

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
      steam_id: z.string().optional(),
      minecraft_uuid: z.string().optional(),
      name: z.string().optional(),
      metadata: MetadataSchema.optional(),
    });
  }

  export namespace Lookup {
    export class Search {
      /** Customer ID (flake) */
      id?: string;
      /** Steam ID */
      steam_id?: string;
      /** Minecraft UUID */
      minecraft_uuid?: string;
      /** Name */
      name?: string;

      constructor(payload: unknown) {
        const search = Schema.safeParse(payload);
        if (!search.success) throw new ParseError(search.error);
        Object.assign(this, search.data);
        Object.keys(this).forEach((key) => {
          this[key as keyof this] === undefined &&
            delete this[key as keyof this];
        });
      }
    }

    const Schema = z
      .object({
        id: z.string().optional(),
        steam_id: z.string().optional(),
        minecraft_uuid: z.string().optional(),
        name: z.string().optional(),
      })
      .refine(
        (data) =>
          Object.values(data).some(
            (v) => v !== undefined && v !== null && v !== "",
          ),
        { message: "At least one property must be provided" },
      );
  }

  export namespace Update {
    export class Body {
      /** Steam ID */
      steam_id?: string;
      /** Minecraft UUID */
      minecraft_uuid?: string;
      /** Name */
      name?: string;
      /** Metadata */
      metadata?: { [key: string]: string };

      constructor(payload: unknown) {
        const body = Schema.safeParse(payload);
        if (!body.success) throw new ParseError(body.error);
        Object.assign(this, body.data);
        Object.keys(this).forEach((key) => {
          if (this[key as keyof this] === undefined) {
            delete this[key as keyof this];
          }
        });
      }
    }

    const Schema = z.object({
      steam_id: z.string().optional(),
      minecraft_uuid: z.string().optional(),
      name: z.string().optional(),
      metadata: MetadataSchema.optional(),
    });
  }
}

export default Customer;
