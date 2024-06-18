import { type Stage } from ".";

/** Command object */
export type Command = {
  stage: Stage;
  content: string;
  online_only: boolean;
};
