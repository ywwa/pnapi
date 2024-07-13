import { object, record, string, enum as zenum } from "zod";
import {
  Currency,
  Discount,
  Game,
  RevokeReason,
  Scale,
  Stage,
  State,
  Status,
} from "../../types";
import { codeRegex, slugRegex } from "../constants";

export const Slug = string().regex(slugRegex, "Invalid Slug");
export const Code = string().regex(codeRegex, "invalid Code");

export const CurrencyEnum = zenum(
  Object.values(Currency) as [Currency, ...Currency[]],
);

export const GameEnum = zenum(Object.values(Game) as [Game, ...Game[]]);

export const Timezone = string().refine(
  (value) => Intl.supportedValuesOf("timeZone").includes(value),
  {
    message: "Invalid timezone provided",
  },
);

export const Metadata = record(string().max(40), string().max(500)).superRefine(
  (metadata, ctx) => {
    if (Object.keys(metadata).length > 50)
      ctx.addIssue({
        code: "custom",
        message: "Metadata must not exceed 50 key-value pairs",
      });
  },
);

export const StateEnum = zenum(Object.values(State) as [State, ...State[]]);

export const ScaleEnum = zenum(Object.values(Scale) as [Scale, ...Scale[]]);

export const StageEnum = zenum(Object.values(Stage) as [Stage, ...Stage[]]);

export const StatusEnum = zenum(Object.values(Status) as [Status, ...Status[]]);

export const RevokeReasonEnum = zenum(
  Object.values(RevokeReason) as [RevokeReason, ...RevokeReason[]],
);

export const DiscountEnum = zenum(
  Object.values(Discount) as [Discount, ...Discount[]],
);

export const dateSchema = string().transform((str) => new Date(str));

export const userSchema = object({
  id: string(),
  first_name: string(),
  last_name: string(),
  email: string().optional(),
});

export const steamSchema = object({
  id: string(),
  name: string(),
  avatar_url: string(),
});

export const minecraftSchema = object({
  id: string(),
  name: string(),
  avatar_url: string(),
});

export const memberSchema = object({
  user: userSchema,
  role_id: string(),
  added_at: dateSchema,
  added_by: userSchema,
});
