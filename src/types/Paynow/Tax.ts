import type { NotTaxedReason } from "./enum";

export type Tax = {
  tax_name: string;
  taxable_amount: number;
  tax_amount: number;
  tax_rate: number;
};

export type TaxJurisdication = {
  name: string;
  taxes: Tax[];
  not_taxed_reason: NotTaxedReason | null;
};
