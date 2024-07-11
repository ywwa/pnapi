import {
  type GameserverCreateDTO,
  type GameserverResponseDTO,
  type GameserverUpdateDTO,
} from "../../../../dtos";
import {
  Api,
  gameserverCreateSchema,
  gameserverUpdateSchema,
} from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type GameserversEndpoints } from "../../../Endpoint";

export class GameserversApi extends Api {
  private readonly __endpoints: GameserversEndpoints;
  constructor(config: ApiConfig, endpoints: GameserversEndpoints) {
    super(config);

    this.__endpoints = endpoints;
  }

  async create(body: GameserverCreateDTO): Promise<GameserverResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.base,
        method: Method.Post,
        data: { schema: gameserverCreateSchema, params: body },
      };

      return this._request<GameserverResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getAll(): Promise<GameserverResponseDTO[]> {
    try {
      const options: RequestOptions = { url: this.__endpoints.base };
      return this._request<GameserverResponseDTO[]>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async getById(gameserverId: string): Promise<GameserverResponseDTO> {
    const options: RequestOptions = {
      url: this.__endpoints.byId(gameserverId),
    };

    return this._request<GameserverResponseDTO>(options);
  }

  async update(
    gameserverId: string,
    body: GameserverUpdateDTO,
  ): Promise<GameserverResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(gameserverId),
        method: Method.Patch,
        data: { schema: gameserverUpdateSchema, params: body },
      };

      return this._request<GameserverResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async resetToken(gameserverId: string): Promise<GameserverResponseDTO> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.resetToken(gameserverId),
        method: Method.Post,
      };
      return this._request<GameserverResponseDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async delete(gameserverId: string): Promise<void> {
    try {
      const options: RequestOptions = {
        url: this.__endpoints.byId(gameserverId),
        method: Method.Delete,
      };
      return this._request<void>(options);
    } catch (error: any) {
      throw error;
    }
  }
}
