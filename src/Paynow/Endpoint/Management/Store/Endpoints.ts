import { BaseEndpoint } from "../../../../lib";
import { MemberEndpoints } from "./MemberEndpoints";

export class StoreEndpoints extends BaseEndpoint {
  private readonly __member: MemberEndpoints;

  constructor(store_id: string) {
    super(store_id);

    this.__member = new MemberEndpoints(this._storeId);
  }

  public base(): string {
    return this._buildUrl(this._baseUrl, "stores");
  }

  public by_id(): string {
    return this._buildUrl(this.base(), this._storeId);
  }

  public get member(): MemberEndpoints {
    return this.__member;
  }
}
