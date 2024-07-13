import { type Stage } from "../enum";

/** Command object */
export type Command = {
  stage: Stage;
  content: string;
  online_only: boolean;
};
