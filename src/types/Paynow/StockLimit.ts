import type { Scale } from "./enum";

export type StockLimit = {
  enabled: boolean;
  quantity: number;
  time_value: number;
  time_scale: Scale;
};
