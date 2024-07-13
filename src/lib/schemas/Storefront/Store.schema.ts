import { object, string, type ZodSchema } from "zod";
import { CurrencyEnum, GameEnum } from "../shared.schema";

export const storeResponse: ZodSchema = object({
  id: string(),
  slug: string(),
  name: string(),
  game: GameEnum,
  currency: CurrencyEnum,
  logo_url: string().nullable(),
  logo_square_url: string().nullable(),
});
