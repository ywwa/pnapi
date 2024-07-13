export type Cart = {
  store_id: string;
  customer_id: string;
  lines: Line[];
  currency: string;
  total: number;
};

type Line = {
  line_key: string;
  product_id: string;
  selected_gameserver_id?: string;
  selected_gameserver?: string;
  slug: string;
  name: string;
  image_url?: string;
  price: number;
  quantity: number;
};
