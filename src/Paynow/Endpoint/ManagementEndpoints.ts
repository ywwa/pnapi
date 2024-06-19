import {
  CustomerEndpoints,
  GameserverEndpoints,
  NavlinkEndpoints,
  ProductEndpoints,
  StoreEndpoints,
  TagEndpoints,
} from ".";
import { BaseEndpoint } from "../../lib";

export class ManagementEndpoints extends BaseEndpoint {
  private readonly __stores: StoreEndpoints;
  private readonly __customers: CustomerEndpoints;
  private readonly __gameservers: GameserverEndpoints;
  private readonly __products: ProductEndpoints;
  private readonly __tags: TagEndpoints;
  private readonly __navlinks: NavlinkEndpoints;

  constructor(store_id: string) {
    super(store_id);
    this.__stores = new StoreEndpoints(this._storeId);
    this.__customers = new CustomerEndpoints(this._storeId);
    this.__gameservers = new GameserverEndpoints(this._storeId);
    this.__products = new ProductEndpoints(this._storeId);
    this.__tags = new TagEndpoints(this._storeId);
    this.__navlinks = new NavlinkEndpoints(this._storeId);
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

  /** Product endpoints */
  public get products(): ProductEndpoints {
    return this.__products;
  }

  /** Tag endpoints */
  public get tags(): TagEndpoints {
    return this.__tags;
  }

  /** Navlink Endpoints */
  public get navlinks(): NavlinkEndpoints {
    return this.__navlinks;
  }
}
