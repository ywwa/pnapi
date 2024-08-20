import { z } from "zod";
import { PlatformEnum } from "./enum";

export const GenericProfileSchema = z.object({
  id: z.string(),
  platform: PlatformEnum,
  name: z.string().nullable(),
  avatar_url: z.string().nullable(),
});

export const ProfileSchema = GenericProfileSchema.pick({
  id: true,
  name: true,
  avatar_url: true,
});
