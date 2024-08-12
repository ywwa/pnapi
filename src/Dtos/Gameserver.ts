import { z } from "zod";
import { DateSchema, ParseError } from "../lib";
import User from "./User";

namespace Gameserver {
  export class Response {
    /** ID of the gameserver (flake) */
    id: string;
    /** ID if the store (flake) */
    store_id: string;
    /** Whether command is executed only when customer is online */
    online_only: boolean;
    /** Name of the gameserver */
    name: string;
    /** Whether this gameserver is enabled */
    enabled: boolean;
    /** Access token of the gameserver */
    token: string | null;
    /** Date when access token was last reset */
    token_reset_at: Date | null;
    /** User who created the gameserver (User) */
    created_by: Pick<
      User.Response,
      "id" | "first_name" | "last_name" | "email"
    > | null;
    /** Date when the gameserver was created */
    created_at: Date;
    /** User who last updated the gameserver (User) */
    updated_by: Pick<
      User.Response,
      "id" | "first_name" | "last_name" | "email"
    > | null;
    /** Date when the gameserver was updated */
    updated_at: Date | null;

    constructor(payload: unknown) {
      const gameserver = Schema.safeParse(payload);
      if (!gameserver.success) throw new ParseError(gameserver.error);
      Object.assign(this, gameserver.data);
    }
  }

  export const Schema = z.object({
    id: z.string(),
    store_id: z.string(),
    online_only: z.boolean(),
    name: z.string(),
    enabled: z.boolean(),
    token: z.string().nullable(),
    token_reset_at: DateSchema.nullable(),
    created_by: User.Schema.nullable(),
    created_at: DateSchema,
    updated_by: User.Schema.nullable(),
    updated_at: DateSchema.nullable(),
  });
}

export default Gameserver;
