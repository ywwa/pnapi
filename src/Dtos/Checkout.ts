import { z } from "zod";
import { ParseError } from "../lib";
import { PlatformEnum } from "../lib/schemas/enum";
import { Platform } from "../types";

function removeUndefined(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(removeUndefined);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];
      if (value !== undefined) {
        acc[key] = removeUndefined(value);
      }
      return acc;
    }, {} as any);
  }
  return obj;
}

namespace Checkout {
  export class Response {
    id: string;
    token: string;
    url: string;

    constructor(payload: unknown) {
      const checkout = Schema.safeParse(payload);
      if (!checkout.success) throw new ParseError(checkout.error);
      Object.assign(this, checkout.data);
    }
  }

  const Schema = z.object({
    id: z.string(),
    token: z.string(),
    url: z.string(),
  });

  export class Body {
    /** Whether order is a subscription */
    subscription: boolean;
    lines: {
      /** ID of the product (flake) */
      product_id: string;
      /** Quantity of product */
      quantity: number;
      /** id of the customer to gift to (flake) */
      gift_to_customer_id?: string;
      /** gift using a platform */
      gift_to?: {
        /** Platform used to gift */
        platform: Platform;
        /** ID of the customer to gift to */
        id: string;
      };
    }[];

    constructor(payload: unknown) {
      const body = BodySchema.safeParse(payload);
      if (!body.success) throw new ParseError(body.error);
      Object.assign(this, removeUndefined(body.data));
    }
  }

  const BodySchema = z.object({
    subscription: z.boolean(),
    lines: z
      .object({
        product_id: z.string(),
        quantity: z.number(),
        gift_to_customer_id: z.string().optional(),
        gift_to: z
          .object({ platform: PlatformEnum, id: z.string() })
          .optional(),
      })
      .array(),
  });
}

export default Checkout;
