/** Navlink Object */
export type Navlink = {
  /** Flake */
  node_id: string;
  /** Flake */
  parent_node_id?: string;
  /** Flake */
  store_id: string;
  /** Flake */
  tag_id: string;
  /** Slug of Tag */
  slug?: string;
  /** Name of Tag */
  name?: string;
  /** Order */
  order: number;
};
