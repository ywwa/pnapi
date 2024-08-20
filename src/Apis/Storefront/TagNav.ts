import { z } from "zod";
import { Navlink, Tag } from "../../Dtos";
import { Storefront } from "../../Endpoints";
import { BaseApi } from "../../lib";

type TTag = Pick<Tag.Response, "id" | "slug" | "name" | "description">;

export class TagNavApi extends BaseApi {
  public async getTags(storeId?: string): Promise<TTag[]> {
    const data = await this.request<TTag[]>({
      endpoint: Storefront.TagNav.tags,
      headers: { "x-paynow-store-id": this.storeId(storeId) },
    });

    return data.map(
      (tag) =>
        new Tag.Response(tag, {
          pick: { id: true, slug: true, name: true, description: true },
        }),
    );
  }

  public async getNavlinks(storeId?: string): Promise<Navlink.Response[]> {
    const data = await this.request<Navlink.Response[]>({
      endpoint: Storefront.TagNav.navlinks,
      headers: { "x-paynow-store-id": this.storeId(storeId) },
    });

    return data.map(
      (navlink) =>
        new Navlink.Response(navlink, {
          extend: {
            tag_query: z.string().array(),
            children: z.lazy(() => Navlink.Schema.array()),
          },
        }),
    );
  }
}
