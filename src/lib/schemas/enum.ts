import { z } from "zod";
import {
  Currency,
  DeclineCode,
  Game,
  NotTaxedReason,
  Platform,
  RevokeReason,
  Scale,
  Stage,
  State,
  Status,
} from "../../types";

export const GameEnum = z.enum(Object.values(Game) as [Game, ...Game[]]);

export const CurrencyEnum = z.enum(
  Object.values(Currency) as [Currency, ...Currency[]],
);

export const PlatformEnum = z.enum(
  Object.values(Platform) as [Platform, ...Platform[]],
);

export const StateEnum = z.enum(Object.values(State) as [State, ...State[]]);

export const RevokeReasonEnum = z.enum(
  Object.values(RevokeReason) as [RevokeReason, ...RevokeReason[]],
);

export const ScaleEnum = z.enum(Object.values(Scale) as [Scale, ...Scale[]]);

export const StageEnum = z.enum(Object.values(Stage) as [Stage, ...Stage[]]);

export const NotTaxedReasonEnum = z.enum(
  Object.values(NotTaxedReason) as [NotTaxedReason, ...NotTaxedReason[]],
);

export const StatusEnum = z.enum(
  Object.values(Status) as [Status, ...Status[]],
);

export const DeclineCodeEnum = z.enum(
  Object.values(DeclineCode) as [DeclineCode, ...DeclineCode[]],
);
