import type { Platform } from "./enum";

export type GenericProfile = {
  /** Steam ID | Minecraft UUID */
  id: string;
  /** Platfor */
  platform: Platform;
  /** Name */
  name: string | null;
  /** URL of avatar image */
  avatar_url: string | null;
};

export type Profile = Pick<GenericProfile, "id" | "name" | "avatar_url">;
