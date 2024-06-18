import { BaseEndpoint } from "../../../../lib";

export class MemberEndpoints extends BaseEndpoint {
  constructor(store_id: string) {
    super(store_id);
  }

  public base(): string {
    return this._buildUrl(this._baseUrl, "stores", this._storeId, "members");
  }

  public by_id(user_id: string): string {
    this._validate({ user_id });
    return this._buildUrl(this.base(), user_id);
  }

  public set_role(user_id: string): string {
    return this._buildUrl(this.by_id(user_id), "set-role");
  }
}
