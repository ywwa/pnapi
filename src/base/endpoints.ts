import { BaseConstants } from "./constants";

export class BaseEndpoints {
  protected readonly _baseUrl: string = BaseConstants.BASE_URL;

  protected _buildUrl(base: string, ...segments: string[]): string {
    return [base, ...segments].join("/");
  }

  protected _validate = (params: object) => {
    Object.entries(params).forEach(
      ([key, value]) =>
        !value &&
        (() => {
          throw new Error(`${key} is required`);
        })(),
    );
  };
}
