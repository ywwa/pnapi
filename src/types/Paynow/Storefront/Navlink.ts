export type Navlink = {
  node_id: string;
  parent_node_id?: string;
  store_id: string;
  tag_id: string;
  tag_slug: string;
  tag_query: string[];
  name: string;
  order: number;
  children: Navlink[];
};
