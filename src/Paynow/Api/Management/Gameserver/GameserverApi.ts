import { z, type ZodSchema } from "zod";
import {
  type GameserverRequestDTO,
  type GameserverResponseDTO,
  type GameserverUpdateRequestDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
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
    const schema: ZodSchema = z.object({
      name: z.string().max(128),
      enabled: z.boolean(),
    });

    const options: RequestOptions = {
      url: this.__ep.base(),
      method: Method.POST,
      data: { schema, content: body },
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
    const schema: ZodSchema = z
      .object({
        name: z.optional(z.string().max(128)),
        enabled: z.optional(z.boolean()),
      })
      .partial()
      .refine((data) => data.name === undefined || data.enabled === undefined, {
        message: "Either name or enabled must be provided",
        path: ["name", "enabled"],
      });

    const options: RequestOptions = {
      url: this.__ep.by_id(gameserver_id),
      method: Method.PATCH,
      data: { schema, content: body },
    };

    return this._execute<GameserverResponseDTO>(options);
  }

  public async resetToken(
    gameserver_id: string,
  ): Promise<GameserverResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.by_id(gameserver_id),
      method: Method.POST,
    };

    return this._execute<GameserverResponseDTO>(options);
  }
}
