import { MemberApi, StatsApi } from ".";
import { type StoreResponseDTO, type StoreUpdateDTO } from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { create, update } from "../../../../zschemas/store.zsc";
import { type StoreEndpoints } from "../../../Endpoint";

export class StoreApi extends BaseApi {
  private readonly __ep: StoreEndpoints;
  private readonly __members: MemberApi;
  private readonly __stats: StatsApi;

  constructor(config: ApiConfig, endpoints: StoreEndpoints) {
    super(config);

    this.__ep = endpoints;
    this.__members = new MemberApi(this._config, this.__ep.member);
    this.__stats = new StatsApi(this._config, this.__ep.stats);
  }

  /**
   * Create new Store
   *
   * !!Missing official documentation
   * requires "User" Authentication
   *
   * @param {StoreCreateDTO} body - data of the store
   *
   * @return {StoreResponseDTO} Store data
   *
   */
  public async create(body: any): Promise<StoreResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.base(),
      method: "POST",
      data: { schema: create, content: body },
    };

    return this._execute<StoreResponseDTO>(options);
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
   *
   * @return {StoreResponseDTO} Store data
   */
  public async update(body: StoreUpdateDTO): Promise<StoreResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.by_id(),
      method: "PATCH",
      data: { schema: update, content: body },
    };

    return this._execute<StoreResponseDTO>(options);
  }

  /**
   * Delete the store.
   *
   * @return {void}
   *
   * TODO: rething way of providing store_id
   */
  public async delete(): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(),
      method: "DELETE",
    };

    return this._execute<void>(options);
  }

  /** Store Member API */
  public get Members(): MemberApi {
    return this.__members;
  }

  /** Store Stats API */
  public get Stats(): StatsApi {
    return this.__stats;
  }
}
