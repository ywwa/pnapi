import { z } from "zod";
import { ParseError } from "../lib";

namespace Token {
  export class Response {
    /** Customer Access Token */
    token: string;

    constructor(payload: unknown) {
      const token = Schema.safeParse(payload);
      if (!token.success) throw new ParseError(token.error);
      Object.assign(this, token.data);
    }
  }

  const Schema = z.object({ token: z.string() });
}

export default Token;
