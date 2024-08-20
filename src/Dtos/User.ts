import { z } from "zod";
import { DateSchema, ParseError } from "../lib";

namespace User {
  export class Response {
    /** ID of the user (flake) */
    id: string;
    /** First name */
    first_name: string;
    /** Last name */
    last_name: string;
    /** Email */
    email: string | null;
    /** Date when user was created */
    created_at?: string | null;

    constructor(data: unknown) {
      const user = Schema.safeParse(data);
      if (!user.success) throw new ParseError(user.error);
      Object.assign(this, user.data);
    }
  }

  export const Schema = z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().nullable(),
    created_at: DateSchema.optional().nullable(),
  });
}

export default User;
