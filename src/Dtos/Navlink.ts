import { z } from "zod";
import { ParseError } from "../lib";

namespace Navlink {
  export class Response {
    /** ID of the navlink node (flake) */
    node_id: string;
    /** ID of the parent navlink node (flake) */
    parent_node_id: string | null;
    /** ID of the store (flake) */
    store_id: string;
    /** ID of the tag (flake) */
    tag_id: string;
    /** Slug of the tag */
    tag_slug: string;
    /** Name of the navlink */
    name: string;
    /** Sorting order of navlink */
    order: number;

    constructor(payload: unknown) {
      const navlink = Schema.safeParse(payload);
      if (!navlink.success) throw new ParseError(navlink.error);
      Object.assign(this, navlink.data);
    }
  }

  export const Schema = z.object({
    node_id: z.string(),
    parent_node_id: z.string().nullable(),
    store_id: z.string(),
    tag_id: z.string(),
    tag_slug: z.string(),
    name: z.string(),
    order: z.number(),
  });

  export namespace Create {
    export class Body {
      tag_id: string;

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

    const Schema = z.object({ tag_id: z.string() });
  }

  export namespace Update {
    export class Body {
      node_id: string;
      parent_node_id: string | null;
      store_id: string;
      tag_id: string;
      tag_slug: string;
      name: string;
      order: number;

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
      node_id: z.string(),
      parent_node_id: z.string().nullable(),
      store_id: z.string(),
      tag_id: z.string(),
      tag_slug: z.string(),
      name: z.string(),
      order: z.number(),
    });
  }

  export namespace Sort {
    export class Body {
      navlinks: { node_id: string; order: number }[];

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
      navlinks: z.array(
        z.object({
          tag_id: z.string(),
          order: z.number(),
        }),
      ),
    });
  }
}

export default Navlink;
