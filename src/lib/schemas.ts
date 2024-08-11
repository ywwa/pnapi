import { z } from "zod";

export const DateSchema = z.string().transform((str) => new Date(str));
