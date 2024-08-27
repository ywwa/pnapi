import { z } from "zod";
import { DateSchema, ParseError } from "../lib";

namespace CommandQueue {
  export class Response {
    /** Attemp ID (flake) */
    attempt_id: string;
    /** Steam ID of the customer */
    steam_id: string | null;
    /** Minecraft UUID of the customer */
    minecraft_uuid: string | null;
    /** Name of the customer */
    customer_name: string | null;
    /** Command to be executed */
    command: string;
    /** Should be customer online */
    online_only: boolean;
    /** Date when command was queued */
    queued_at: Date;

    constructor(payload: unknown) {
      const queue = Schema.safeParse(payload);
      if (!queue.success) throw new ParseError(queue.error);
      Object.assign(this, queue.data);
    }
  }

  const Schema = z.object({
    attempt_id: z.string(),
    steam_id: z.string().nullable(),
    minecraft_uuid: z.string().nullable(),
    customer_name: z.string().nullable(),
    command: z.string(),
    online_only: z.boolean(),
    queued_at: DateSchema,
  });

  export class Body {
    steam_ids: string[];
    constructor(payload: unknown) {
      const body = BodySchema.safeParse(payload);
      if (!body.success) throw new ParseError(body.error);
      Object.assign(this, body.data);
      Object.keys(this).forEach((key) => {
        this[key as keyof this] === undefined && delete this[key as keyof this];
      });
    }
  }

  const BodySchema = z.object({ steam_ids: z.string().array() });

  export namespace MarkExecuted {
    export class Body {
      attempt_id: string;

      constructor(payload: unknown) {
        const body = BodySchema.safeParse(payload);
        if (!body.success) throw new ParseError(body.error);
        Object.assign(this, body.data);
        Object.keys(this).forEach((key) => {
          this[key as keyof this] === undefined &&
            delete this[key as keyof this];
        });
      }
    }

    const BodySchema = z.object({ attempt_id: z.string() });
  }
}

export default CommandQueue;
