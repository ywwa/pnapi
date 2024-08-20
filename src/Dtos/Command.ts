import { z } from "zod";
import { StageEnum } from "../lib/schemas/enum";
import type { Stage } from "../types";

namespace Command {
  export class Response {
    stage: Stage;
    content: string;
    online_only: boolean;
  }

  export const Schema = z.object({
    stage: StageEnum,
    content: z.string(),
    online_only: z.boolean(),
  });
}

export default Command;
