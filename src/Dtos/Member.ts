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
}

export default Member;
