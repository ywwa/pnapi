import { BaseAPI } from "../../base";
import {
  type GameserverRequestDTO,
  type GameserverResponseDTO,
} from "../../dto";
import type GameserverEndpoints from "../../endpoints/Management/_gameserver";
import { RequestMethods, type Optional, type ServiceConfig } from "../../types";

export default class GameserverAPI extends BaseAPI {
  private readonly _endpoints: GameserverEndpoints;

  constructor(config: ServiceConfig, endpoints: GameserverEndpoints) {
    super(config);

    this._endpoints = endpoints;
  }

  /**
   * Create new gameserver
   * @param {GameserverRequestDTO} params - data of the gameserver
   *
   * @return {Promise<GameserverResponseDTO>} newly created gameserver
   */
  public async create(
    params: GameserverRequestDTO,
  ): Promise<GameserverResponseDTO> {
    return this.request<GameserverResponseDTO>({
      url: this._endpoints.base(this.config.store_id),
      method: RequestMethods.POST,
      body: params,
    });
  }

  /**
   * Get all gameservers of the store
   * @return {Promise<GameserverResponseDTO[]>} list of all gameservers
   */
  public async getAll(): Promise<GameserverResponseDTO[]> {
    return this.request<GameserverResponseDTO[]>({
      url: this._endpoints.base(this.config.store_id),
    });
  }

  /**
   * Get gameserver by id
   *
   * @param {string} gameserver_id - id of the gameserver
   *
   * @return {Promise<GameserverResponseDTO>} gameserver
   */
  public async getById(gameserver_id: string): Promise<GameserverResponseDTO> {
    return this.request<GameserverResponseDTO>({
      url: this._endpoints.byId(this.config.store_id, gameserver_id),
    });
  }

  /**
   * Update gameserver
   *
   * @param {Optional<GameserverRequestDTO>} params - data that should be updated
   *
   * @return {Promise<GameserverResponseDTO>} gameserver
   */
  public async update(
    gameserver_id: string,
    params: Optional<GameserverRequestDTO>,
  ): Promise<GameserverResponseDTO> {
    return this.request<GameserverResponseDTO>({
      url: this._endpoints.byId(this.config.store_id, gameserver_id),
      method: RequestMethods.PATCH,
      body: params,
    });
  }

  /**
   * Reset token of the gameserver
   *
   * @param {string} gameserver_id - id of the gameserver
   *
   * @return {Promise<GameserverResponseDTO>} gameserver
   */
  public async resetToken(
    gameserver_id: string,
  ): Promise<GameserverResponseDTO> {
    return this.request<GameserverResponseDTO>({
      url: this._endpoints.byId(this.config.store_id, gameserver_id),
      method: RequestMethods.POST,
    });
  }

  /**
   * Delete the gameserver
   *
   * @param {string} gameserver_id - id of the gameserver
   *
   * @return {void} 204 HTTP Response
   */
  public async delete(gameserver_id: string): Promise<void> {
    return this.request<void>({
      url: this._endpoints.byId(this.config.store_id, gameserver_id),
      method: RequestMethods.DELETE,
    });
  }
}
