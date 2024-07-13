import { boolean, object, string, type ZodSchema } from "zod";

export const gameserverCreateSchema: ZodSchema = object({
  name: string().min(1).max(128),
  enabled: boolean(),
});

export const gameserverUpdateSchema: ZodSchema = object({
  name: string().min(1).max(128).optional(),
  enabled: boolean().optional(),
}).refine((data) => data.name === undefined && data.enabled === undefined, {
  message: "At least one of parameters must be provided",
});
