import { z } from "zod";
import { Currency, Game } from "../types";

export const DateSchema = z.string().transform((str) => new Date(str));
export const GameEnum = z.enum(Object.values(Game) as [Game, ...Game[]]);
export const CurrencyEnum = z.enum(
  Object.values(Currency) as [Currency, ...Currency[]],
);
