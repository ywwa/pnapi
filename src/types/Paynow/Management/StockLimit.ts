import { type Scale } from "../enum";

/** Stock limit */
export type StockLimit = {
  enabled: boolean;
  quantity: number;
  time_value: number;
  time_scale: Scale;
};
