export abstract class BaseEndpoint {
  protected readonly _baseUrl: string = "https://api.paynow.gg/v1";
  protected readonly _storeId: string;

  constructor(store_id: string) {
    this._storeId = store_id;
  }

  protected _validate = (params: object): void => {
    Object.entries(params).forEach(([key, value]) => {
      if (!value) throw new Error(`${key} is required`);
    });
  };

  protected _buildUrl = (base: string, ...segments: string[]): string =>
    [base, ...segments].join("/");
}
