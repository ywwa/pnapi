import { z, type ZodType } from "zod";
import { ParseError } from "./errors";

export type TResponse<T extends ZodType<any, any>> = z.infer<T>;

export interface SchemaOptions<T> {
  omit?: Partial<Record<keyof T, true>>;
  pick?: Partial<Record<keyof T, true>>;
  extend?: Partial<Record<string, ZodType<any>>>;
}

class BaseResponse {
  // constructor(
  //   payload: unknown,
  //   Schema: z.infer<T>,
  //   options?: SchemaOptions<TResponse<T>>,
  // ) {
  //   const schema = options?.omit
  //     ? Schema.omit(options.omit)
  //     : options?.pick
  //       ? Schema.pick(options.pick)
  //       : Schema;
  //
  //   const data = schema.safeParse(payload);
  //   if (!data.success) throw new ParseError(data.error);
  //   Object.assign(this, data.data);
  // }

  protected _schema<T extends ZodType<any, any>>(
    schema: TResponse<z.infer<T>>,
    options?: SchemaOptions<TResponse<T>>,
  ) {
    return options?.omit
      ? schema.omit(options.omit)
      : options?.pick
        ? schema.pick(options.pick)
        : schema;
  }

  protected _parse<T extends ZodType<any, any>>(
    payload: unknown,
    schema: TResponse<z.infer<T>>,
  ) {
    const data = schema.safeParse(payload);
    if (!data.success) throw new ParseError(data.error);
    return data.data;
  }
}

export default BaseResponse;
