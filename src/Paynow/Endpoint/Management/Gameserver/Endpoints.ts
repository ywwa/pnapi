import { BaseEndpoint } from "../../../../lib";

export class GameserverEndpoints extends BaseEndpoint {
  constructor(store_id: string) {
    super(store_id);
  }

  public base(): string {
    return this._buildUrl(
      this._baseUrl,
      "stores",
      this._storeId,
      "gameservers",
    );
  }

  public by_id(gameserver_id: string): string {
    this._validate({ gameserver_id });
    return this._buildUrl(this.base(), gameserver_id);
  }

  public reset_token(gameserver_id: string): string {
    return this._buildUrl(this.by_id(gameserver_id), "reset-token");
  }
}
