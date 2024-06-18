import { BaseApi } from "../../lib";
import { type ApiConfig } from "../../types";
import { ManagementEndpoints } from "../Endpoint";
import { CustomerApi, GameserverApi, StoreApi } from "./Management";

export class ManagementApi extends BaseApi {
  private readonly __ep: ManagementEndpoints;
  private readonly __store_api: StoreApi;
  private readonly __customer_api: CustomerApi;
  private readonly __gameserver_api: GameserverApi;

  constructor(config: ApiConfig) {
    super(config);

    this.__ep = new ManagementEndpoints(this._config.store_id);
    this.__store_api = new StoreApi(this._config, this.__ep.stores);
    this.__customer_api = new CustomerApi(this._config, this.__ep.customers);
    this.__gameserver_api = new GameserverApi(
      this._config,
      this.__ep.gameservers,
    );
  }

  /** Store API */
  public get Stores(): StoreApi {
    return this.__store_api;
  }

  /** Customer API */
  public get Customers(): CustomerApi {
    return this.__customer_api;
  }

  /** Gameserver API */
  public get Gameservers(): GameserverApi {
    return this.__gameserver_api;
  }
}
