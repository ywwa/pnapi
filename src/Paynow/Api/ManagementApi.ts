import { CustomerApi, GameserverApi, ProductApi, StoreApi } from ".";
import { BaseApi } from "../../lib";
import { type ApiConfig } from "../../types";
import { ManagementEndpoints } from "../Endpoint";

export class ManagementApi extends BaseApi {
  private readonly __ep: ManagementEndpoints;
  private readonly __store_api: StoreApi;
  private readonly __customer_api: CustomerApi;
  private readonly __gameserver_api: GameserverApi;
  private readonly __product_api: ProductApi;

  constructor(config: ApiConfig) {
    super(config);

    this.__ep = new ManagementEndpoints(this._config.store_id);
    this.__store_api = new StoreApi(this._config, this.__ep.stores);
    this.__customer_api = new CustomerApi(this._config, this.__ep.customers);
    this.__gameserver_api = new GameserverApi(
      this._config,
      this.__ep.gameservers,
    );
    this.__product_api = new ProductApi(this._config, this.__ep.products);
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

  /** Product API */
  public get Products(): ProductApi {
    return this.__product_api;
  }
}
