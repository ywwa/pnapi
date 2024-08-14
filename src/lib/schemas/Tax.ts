import { z } from "zod";
import { NotTaxedReasonEnum } from "./enum";

export const TaxSchema = z.object({
  tax_name: z.string(),
  taxable_amount: z.string(),
  tax_amount: z.string(),
  tax_rate: z.string(),
});

export const TaxJurisdicationSchema = z.object({
  name: z.string(),
  taxes: TaxSchema.array(),
  not_taxed_reason: NotTaxedReasonEnum.nullable(),
});
