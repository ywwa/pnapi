import { z } from "zod";
import { DateSchema, dateToString, ParseError } from "../lib";

namespace Stats {
  export namespace Dashboard {
    export class Response {
      store_id: string;
      sales_today: number;
      sales_yesterday: number;
      month_sales: number;
      month_sales_prev: number;
      average_spend_amount: number;
      average_spend_amount_prev: number;
      lifetime_sales: number;
      lifetime_sales_count: number;

      constructor(payload: unknown) {
        const dashboard = Schema.safeParse(payload);
        if (!dashboard.success) throw new ParseError(dashboard.error);
        Object.assign(this, dashboard.data);
      }
    }

    const Schema = z.object({
      store_id: z.string(),
      sales_today: z.number(),
      sales_yesterday: z.number(),
      month_sales: z.number(),
      month_sales_prev: z.number(),
      average_spend_amount: z.number(),
      average_spend_amount_prev: z.number(),
      lifetime_sales: z.number(),
      lifetime_sales_count: z.number(),
    });

    export class Search {
      tz?: string;

      constructor(payload: unknown) {
        const body = z.object({ tz: z.string().optional() }).safeParse(payload);

        if (!body.success) throw new ParseError(body.error);
        Object.assign(this, body.data);
        Object.keys(this).forEach((key) => {
          this[key as keyof this] === undefined &&
            delete this[key as keyof this];
        });
      }
    }
  }

  export namespace Order {
    export class Response {
      day: Date;
      total: number;
      total_orders: number;

      constructor(payload: unknown) {
        const order = Schema.safeParse(payload);
        if (!order.success) throw new ParseError(order.error);
        Object.assign(this, order.data);
      }
    }

    const Schema = z.object({
      day: DateSchema,
      total: z.number(),
      total_orders: z.number(),
    });
  }

  export namespace Product {
    export class Response {
      store_id: string;
      product_id: string;
      total_lines: number;
      sum_quantity: number;
      total_earnings: number;
      net_earnings: number;

      constructor(payload: unknown) {
        const product = Schema.safeParse(payload);
        if (!product.success) throw new ParseError(product.error);
        Object.assign(this, product.data);
      }
    }

    const Schema = z.object({
      store_id: z.string(),
      product_id: z.string(),
      total_lines: z.number(),
      sum_quantity: z.number(),
      total_earnings: z.number(),
      net_earnings: z.number(),
    });
  }

  export class Search {
    tz?: string;
    start: Date | string;
    end: Date | string;
    limit?: number;

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
    tz: z.string().optional(),
    start: z.date().transform(dateToString),
    end: z.date().transform(dateToString),
    limit: z.number().optional(),
  });
}

export default Stats;
