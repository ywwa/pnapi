import { BaseEndpoints } from "../../base";

export default class StoreMembersEndpoints extends BaseEndpoints {
  /**
   * ...
   *
   * @returns {string} {_baseUrl}/stores/{store.id}/members
   */
  public base(store_id: string): string {
    this._validate({ store_id });
    return this._buildUrl(this._baseUrl, "stores", store_id, "members");
  }

  /**
   * ...
   *
   * @returns {string} {_baseUrl}/stores/{store.id}/members/{user.id}
   */
  public byId(store_id: string, user_id: string): string {
    this._validate({ user_id });
    return this._buildUrl(this.base(store_id), user_id);
  }

  /**
   * ...
   *
   * @returns {string} {_baseUrl}/stores/{store.id}/members/{user.id}/set-role
   */
  public setRole(store_id: string, user_id: string): string {
    return this._buildUrl(this.byId(store_id, user_id), "set-role");
  }
}
