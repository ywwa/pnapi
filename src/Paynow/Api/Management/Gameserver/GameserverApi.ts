import {
  type GameserverRequestDTO,
  type GameserverResponseDTO,
  type GameserverUpdateRequestDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { create, update } from "../../../../zschemas/gameserver.zsc";
import { type GameserverEndpoints } from "../../../Endpoint";

export class GameserverApi extends BaseApi {
  private readonly __ep: GameserverEndpoints;

  constructor(config: ApiConfig, endpoints: GameserverEndpoints) {
    super(config);

    this.__ep = endpoints;
  }

  public async create(
    body: GameserverRequestDTO,
  ): Promise<GameserverResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.base(),
      method: "POST",
      data: { schema: create, content: body },
    };

    return this._execute<GameserverResponseDTO>(options);
  }

  public async getAll(): Promise<GameserverResponseDTO[]> {
    const options: RequestOptions = { url: this.__ep.base() };

    return this._execute<GameserverResponseDTO[]>(options);
  }

  public async getById(gameserver_id: string): Promise<GameserverResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(gameserver_id) };

    return this._execute<GameserverResponseDTO>(options);
  }

  public async update(
    gameserver_id: string,
    body: GameserverUpdateRequestDTO,
  ): Promise<GameserverResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.by_id(gameserver_id),
      method: "PATCH",
      data: { schema: update, content: body },
    };

    return this._execute<GameserverResponseDTO>(options);
  }

  public async resetToken(
    gameserver_id: string,
  ): Promise<GameserverResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.by_id(gameserver_id),
      method: "POST",
    };

    return this._execute<GameserverResponseDTO>(options);
  }
}
