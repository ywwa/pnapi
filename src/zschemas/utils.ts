import { z } from "zod";
import { slugRegex } from "../lib/utils";
import {
  Currencies,
  Discounts,
  Games,
  Scales,
  Stages,
  type Currency,
  type Discount,
  type Game,
  type Scale,
  type Stage,
} from "../types";

/**
 * Zod Slug validator
 */
export const Slug = z.string().regex(slugRegex, "Invalid Slug");

/**
 * Zod Currency enum
 */
export const CurrencyEnum = z.enum(
  Object.values(Currencies) as [Currency, ...Currency[]],
);

/**
 * Zod Game enum
 */
export const GameEnum = z.enum(Object.values(Games) as [Game, ...Game[]]);

/**
 * Zod Timezone validator
 */
export const Timezone = z
  .string()
  .refine((v) => Intl.supportedValuesOf("timeZone").includes(v));

/**
 * Zod Scale enum
 */
export const ScaleEnum = z.enum(Object.values(Scales) as [Scale, ...Scale[]]);

/**
 * Zod Stage enum
 */
export const StageEnum = z.enum(Object.values(Stages) as [Stage, ...Stage[]]);

/**
 * Zod Discount enum
 */
export const DiscountEnum = z.enum(
  Object.values(Discounts) as [Discount, ...Discount[]],
);
