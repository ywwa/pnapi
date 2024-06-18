import { z, type ZodSchema } from "zod";
import { MemberApi } from ".";
import {
  type StoreResponseDTO,
  type StoreUpdateRequestDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type StoreEndpoints } from "../../../Endpoint";

export class StoreApi extends BaseApi {
  private readonly __ep: StoreEndpoints;
  private readonly __members: MemberApi;

  constructor(config: ApiConfig, endpoints: StoreEndpoints) {
    super(config);

    this.__ep = endpoints;
    this.__members = new MemberApi(this._config, this.__ep.member);
  }

  /**
   * Get the store object.
   *
   * @return {StoreResponseDTO} Store data
   */
  public async get(): Promise<StoreResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id() };

    return this._execute<StoreResponseDTO>(options);
  }

  /**
   * Update the store.
   *
   * @param {StoreUpdateRequestDTO} body - data to update
   * maximum value lenght: 64
   *
   * @return {StoreResponseDTO} Store data
   */
  public async update(body: StoreUpdateRequestDTO): Promise<StoreResponseDTO> {
    const schema: ZodSchema = z.object({
      slug: z.optional(z.string().max(64)),
      name: z.optional(z.string().max(64)),
    });

    const options: RequestOptions = {
      url: this.__ep.by_id(),
      method: Method.PATCH,
      data: { schema, content: body },
    };

    return this._execute<StoreResponseDTO>(options);
  }

  /** Store Member API */
  public get Members(): MemberApi {
    return this.__members;
  }
}
