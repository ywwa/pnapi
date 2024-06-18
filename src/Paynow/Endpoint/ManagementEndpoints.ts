import { CustomerEndpoints, GameserverEndpoints, StoreEndpoints } from ".";
import { BaseEndpoint } from "../../lib";

export class ManagementEndpoints extends BaseEndpoint {
  private readonly __stores: StoreEndpoints;
  private readonly __customers: CustomerEndpoints;
  private readonly __gameservers: GameserverEndpoints;

  constructor(store_id: string) {
    super(store_id);
    this.__stores = new StoreEndpoints(this._storeId);
    this.__customers = new CustomerEndpoints(this._storeId);
    this.__gameservers = new GameserverEndpoints(this._storeId);
  }

  /** Store endpoints */
  public get stores(): StoreEndpoints {
    return this.__stores;
  }

  /** Customer endpoints */
  public get customers(): CustomerEndpoints {
    return this.__customers;
  }

  /** Gameserver endpoints */
  public get gameservers(): GameserverEndpoints {
    return this.__gameservers;
  }
}
