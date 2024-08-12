import type { Stage } from "./enum";

export type CommandAttempt = {
  /** ID of the command attempt (flake) */
  id: string;
  /** ID of the customer inventory item (flake) */
  inventory_item_id: string;
  /** ID of the gameserver (flake) */
  gameserver_id: string;
  /** Steam ID of the customer */
  steam_id: string | null;
  /** Minecraft UUID of the customer */
  minecraft_uuid: string | null;
  /** Name of the customer */
  customer_name: string | null;
  /** When command should be executed */
  command_stage: Stage;
  /** ID of the command that should be executed */
  command: string;
  /** Should customer be online */
  online_only: boolean;
  /** Should command be rerun */
  rerun: boolean;
  /** Date when command was queued */
  queued_at: Date;
  /** Date when command was executed */
  executed_at: Date | null;
};
