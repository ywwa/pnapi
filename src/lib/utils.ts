import { RefinementCtx } from "zod";
import { DiscountType } from "../types";

export const makePath = (base: string, ...rest: string[]): string =>
  [base, ...rest].join("/");

export const dateToString = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, "0");

  function makeDate(date: Date): string {
    const Y = date.getFullYear();
    const M = pad(date.getMonth() + 1);
    const D = pad(date.getDate());

    return `${Y}-${M}-${D}`;
  }

  function makeTime(date: Date): string {
    const HH = pad(date.getHours());
    const MM = pad(date.getMinutes());
    const SS = pad(date.getSeconds());

    return `${HH}:${MM}:${SS}`;
  }

  return `${makeDate(date)} ${makeTime(date)}`;
};

export function validateSubscription(data: any, ctx: RefinementCtx) {
  if (data.allow_subscription) {
    if (
      !data.subscription_interval_scale ||
      !data.subscription_interval_value
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Subscription requires both interval value and scale",
        path: ["subscription_interval_value", "subscription_interval_scale"],
      });
    }
  }
}

export function validateRemoveAfter(data: any, ctx: RefinementCtx) {
  if (data.remove_after_enabled) {
    if (!data.remove_after_time_value || !data.remove_after_time_scale) {
      ctx.addIssue({
        code: "custom",
        message: "Remove after requires both value and scale",
        path: ["remove_after_time_value", "remove_after_time_scale"],
      });
    }
  }
}

export function validateDiscount(data: any, ctx: RefinementCtx) {
  const { discount_type, discount_amount } = data;

  if (discount_type && discount_amount) {
    switch (discount_type) {
      case DiscountType.Percent:
        if (discount_amount < 1 || discount_amount > 100) {
          ctx.addIssue({
            code: "custom",
            message: "Discount amount must be between 1 and 100",
            path: ["discount_amount"],
          });
        }
        break;

      case DiscountType.Amount:
        if (discount_amount < 1 || discount_amount > 10000000) {
          ctx.addIssue({
            code: "custom",
            message: "Discount amount must be between 1 and 10,000,000",
            path: ["discount_amount"],
          });
        }
        break;
      default:
        break;
    }
  }
}
