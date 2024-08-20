import { DeclineCode } from "./enum";

export type LastPaymentError = {
  decline_code: DeclineCode;
  message: string;
};
