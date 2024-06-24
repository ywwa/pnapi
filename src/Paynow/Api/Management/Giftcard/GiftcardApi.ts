import {
  type GiftcardCreateDTO,
  type GiftcardResponseDTO,
  type GiftcardUpdateDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { create, update } from "../../../../zschemas/giftcard.zsc";
import { type GiftcardEndpoints } from "../../../Endpoint";

export class GiftcardApi extends BaseApi {
  private readonly __ep: GiftcardEndpoints;

  constructor(config: ApiConfig, endpoints: GiftcardEndpoints) {
    super(config);
    this.__ep = endpoints;
  }

  public async create(body: GiftcardCreateDTO): Promise<GiftcardResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.base(),
      method: "POST",
      data: { schema: create, content: body },
    };

    return this._execute<GiftcardResponseDTO>(options);
  }

  public async getAll(): Promise<GiftcardResponseDTO[]> {
    const options: RequestOptions = { url: this.__ep.base() };

    return this._execute<GiftcardResponseDTO[]>(options);
  }

  public async getById(giftcard_id: string): Promise<GiftcardResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(giftcard_id) };

    return this._execute<GiftcardResponseDTO>(options);
  }

  public async update(
    giftcard_id: string,
    body: GiftcardUpdateDTO,
  ): Promise<GiftcardResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.by_id(giftcard_id),
      method: "PATCH",
      data: { schema: update, content: body },
    };

    return this._execute<GiftcardResponseDTO>(options);
  }

  public async delete(giftcard_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(giftcard_id),
      method: "DELETE",
    };

    return this._execute<void>(options);
  }
}
