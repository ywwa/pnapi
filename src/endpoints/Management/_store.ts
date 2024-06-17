import { BaseEndpoints } from "../../base";
import StoreMembersEndpoints from "./_storeMembers";

export default class StoreEndpoints extends BaseEndpoints {
  private readonly _membersEndpoints: StoreMembersEndpoints;

  constructor() {
    super();
    this._membersEndpoints = new StoreMembersEndpoints();
  }
  /**
   * Base URL of "Management\Store" endpoints
   *
   * @returns {string} {_baseUrl}/stores
   */
  public base(): string {
    return this._buildUrl(this._baseUrl, "stores");
  }

  /**
   * ...
   *
   * @returns {string} {_baseUrl}/stores/{store.id}
   */
  public byId(store_id: string): string {
    this._validate({ store_id });
    return this._buildUrl(this.base(), store_id);
  }

  public get Members(): StoreMembersEndpoints {
    return this._membersEndpoints;
  }
}
