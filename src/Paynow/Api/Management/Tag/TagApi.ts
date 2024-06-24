import {
  type TagRequestDTO,
  type TagResponseDTO,
  type TagUpdateRequestDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { create, update } from "../../../../zschemas/tag.zsc";
import { type TagEndpoints } from "../../../Endpoint";

export class TagApi extends BaseApi {
  private readonly __ep: TagEndpoints;

  constructor(config: ApiConfig, endpoint: TagEndpoints) {
    super(config);

    this.__ep = endpoint;
  }

  public async create(body: TagRequestDTO): Promise<TagResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.base(),
      method: "POST",
      data: { schema: create, content: body },
    };

    return this._execute<TagResponseDTO>(options);
  }

  public async getAll(): Promise<TagResponseDTO[]> {
    const options: RequestOptions = { url: this.__ep.base() };

    return this._execute<TagResponseDTO[]>(options);
  }

  public async getById(tag_id: string): Promise<TagResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(tag_id) };

    return this._execute<TagResponseDTO>(options);
  }

  public async update(
    tag_id: string,
    body: TagUpdateRequestDTO,
  ): Promise<TagResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.by_id(tag_id),
      method: "PATCH",
      data: { schema: update, content: body },
    };

    return this._execute<TagResponseDTO>(options);
  }

  public async delete(tag_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(tag_id),
      method: "DELETE",
    };

    return this._execute<void>(options);
  }
}
