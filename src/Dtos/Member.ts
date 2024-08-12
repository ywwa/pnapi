import { z } from "zod";
import { DateSchema, ParseError } from "../lib";
import User from "./User";

namespace Member {
  export class Response {
    /** User */
    user: User.Response;
    /** ID of the role (flake) */
    role_id: string;
    /** Date when member was added */
    added_at: Date;
    /** Who added the member (User) */
    added_by: User.Response | null;

    constructor(payload: any) {
      const member = Schema.safeParse(payload);
      if (!member.success) throw new ParseError(member.error);
      Object.assign(this, member.data);
    }
  }
  export const Schema = z.object({
    user: User.Schema,
    role_id: z.string(),
    added_at: DateSchema,
    added_by: User.Schema.nullable(),
  });

  export namespace Role {
    export class Body {
      /** ID of the role (flake) */
      role_id: string;

      constructor(payload: any) {
        const body = Schema.safeParse(payload);
        if (!body.success) throw new ParseError(body.error);
        Object.assign(this, body.data);
        Object.keys(this).forEach((key) => {
          this[key as keyof this] === undefined &&
            delete this[key as keyof this];
        });
      }
    }

    const Schema = z.object({ role_id: z.string() });
  }
}

export default Member;
