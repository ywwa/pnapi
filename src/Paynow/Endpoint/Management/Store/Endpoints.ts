import { MemberEndpoints, StatEndpoints } from ".";
import { BaseEndpoint } from "../../../../lib";

export class StoreEndpoints extends BaseEndpoint {
  private readonly __member: MemberEndpoints;
  private readonly __stat: StatEndpoints;

  constructor(store_id: string) {
    super(store_id);

    this.__member = new MemberEndpoints(this._storeId);
    this.__stat = new StatEndpoints(this._storeId);
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

  public get stats(): StatEndpoints {
    return this.__stat;
  }
}
