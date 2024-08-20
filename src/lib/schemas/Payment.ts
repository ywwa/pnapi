import { z } from "zod";
import { DeclineCodeEnum } from "./enum";

export const LastPaymentErrorSchema = z.object({
  decline_code: DeclineCodeEnum,
  message: z.string(),
});
