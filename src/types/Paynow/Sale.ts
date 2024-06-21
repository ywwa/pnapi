import { type Product, type Tag } from ".";

/** Sale Object */
export type Sale = {
  id: string;
  store_id: string;
  enabled: boolean;
  name: string;
  apply_to_tags: Omit<Tag, "created_by" | "updated_by" | "enabled">[];
  apply_to_prducts: Pick<
    Product,
    | "id"
    | "store_id"
    | "version_id"
    | "image_url"
    | "slug"
    | "name"
    | "description"
    | "price"
    | "created_at"
    | "updated_at"
  >;
};
