import { Store } from "../../Dtos";
import { Storefront } from "../../Endpoints";
import { BaseApi } from "../../lib";

export class StoreApi extends BaseApi {
  public async get(
    withMeta: boolean = false,
    storeId?: string,
  ): Promise<
    Pick<
      Store.Response,
      | "id"
      | "slug"
      | "name"
      | "game"
      | "currency"
      | "logo_url"
      | "logo_square_logo"
    >
  > {
    const data = await this.request(
      {
        endpoint: Storefront.Store,
        headers: { "x-paynow-store-id": this.storeId(storeId) },
      },
      withMeta,
    );

    return new Store.Response(data, {
      pick: {
        id: true,
        slug: true,
        name: true,
        game: true,
        currency: true,
        logo_url: true,
        logo_square_url: true,
      },
    });
  }
}
