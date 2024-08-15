import {
  CouponsApi,
  CustomersApi,
  GameserversApi,
  GiftcardsApi,
  NavlinksApi,
  OrdersApi,
  ProductsApi,
  StoresApi,
  TagsApi,
} from "../Apis/Management";
import { BaseApi } from "../lib";

class Management extends BaseApi {
  private storesApi: StoresApi;
  private customersApi: CustomersApi;
  private gameserversApi: GameserversApi;
  private productsApi: ProductsApi;
  private tagsApi: TagsApi;
  private navlinksApi: NavlinksApi;
  private ordersApi: OrdersApi;
  private couponsApi: CouponsApi;
  private giftcardsApi: GiftcardsApi;

  public get Stores(): StoresApi {
    if (!this.storesApi) this.storesApi = new StoresApi(this.config);

    return this.storesApi;
  }

  public get Customers(): CustomersApi {
    if (!this.customersApi) this.customersApi = new CustomersApi(this.config);

    return this.customersApi;
  }

  public get Gameservers(): GameserversApi {
    if (!this.gameserversApi)
      this.gameserversApi = new GameserversApi(this.config);

    return this.gameserversApi;
  }

  public get Products(): ProductsApi {
    if (!this.productsApi) this.productsApi = new ProductsApi(this.config);

    return this.productsApi;
  }

  public get Tags(): TagsApi {
    if (!this.tagsApi) this.tagsApi = new TagsApi(this.config);

    return this.tagsApi;
  }

  public get Navlinks(): NavlinksApi {
    if (!this.navlinksApi) this.navlinksApi = new NavlinksApi(this.config);

    return this.navlinksApi;
  }

  public get Orders(): OrdersApi {
    if (!this.ordersApi) this.ordersApi = new OrdersApi(this.config);

    return this.ordersApi;
  }

  public get Coupons(): CouponsApi {
    if (!this.couponsApi) this.couponsApi = new CouponsApi(this.config);

    return this.couponsApi;
  }

  public get Giftcards(): GiftcardsApi {
    if (!this.giftcardsApi) this.giftcardsApi = new GiftcardsApi(this.config);

    return this.giftcardsApi;
  }
}

export default Management;
