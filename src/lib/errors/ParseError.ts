import { HttpStatusCode } from "axios";
import type { ZodError, ZodIssueCode } from "zod";

export class ParseError extends Error {
  readonly name = "ZodParseError";
  readonly status: number;
  readonly issues?: {
    message: string;
    path: (string | number)[];
    code: ZodIssueCode;
  }[];

  constructor(error: ZodError) {
    super(error.message);

    this.status = HttpStatusCode.NotAcceptable;
    this.issues = error.issues.map((issue) => ({
      message: issue.message,
      path: issue.path,
      code: issue.code,
    }));

    Object.setPrototypeOf(this, ParseError.prototype);
  }
}
