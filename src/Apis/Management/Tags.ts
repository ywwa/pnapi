import { Tag } from "../../Dtos";
import { Tags } from "../../Endpoints/Management";
import { BaseApi } from "../../lib";
import { Method } from "../../types";

export class TagsApi extends BaseApi {
  public async create(
    body: Tag.Create.Body,
    storeId?: string,
  ): Promise<Tag.Response> {
    const data = await this.request({
      endpoint: Tags.base(this.storeId(storeId)),
      method: Method.POST,
      body: new Tag.Create.Body(body),
    });

    return new Tag.Response(data);
  }

  public async getAll(storeId?: string): Promise<Tag.Response[]> {
    const data = await this.request<Tag.Response[]>({
      endpoint: Tags.base(this.storeId(storeId)),
    });

    return data.map((tag) => new Tag.Response(tag));
  }

  public async getById(tagId: string, storeId?: string): Promise<Tag.Response> {
    const data = await this.request({
      endpoint: Tags.byId(this.storeId(storeId), tagId),
    });

    return new Tag.Response(data);
  }

  public async update(
    tagId: string,
    body: Tag.Update.Body,
    storeId?: string,
  ): Promise<Tag.Response> {
    const data = await this.request({
      endpoint: Tags.byId(this.storeId(storeId), tagId),
      method: Method.PATCH,
      body: new Tag.Update.Body(body),
    });

    return new Tag.Response(data);
  }

  public async delete(tagId: string, storeId?: string): Promise<void> {
    return await this.request<void>({
      endpoint: Tags.byId(this.storeId(storeId), tagId),
      method: Method.DELETE,
    });
  }
}
