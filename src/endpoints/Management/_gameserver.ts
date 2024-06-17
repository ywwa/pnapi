import { BaseEndpoints } from "../../base";

export default class GameserverEndpoints extends BaseEndpoints {
  constructor() {
    super();
  }

  public base(store_id: string): string {
    this._validate({ store_id });
    return this._buildUrl(this._baseUrl, "stores", store_id, "gameservers");
  }

  public byId(store_id: string, gameserver_id: string): string {
    this._validate({ gameserver_id });
    return this._buildUrl(this.base(store_id), gameserver_id);
  }

  public resetToken(store_id: string, gameserver_id: string): string {
    return this._buildUrl(this.byId(store_id, gameserver_id), "reset-token");
  }
}
