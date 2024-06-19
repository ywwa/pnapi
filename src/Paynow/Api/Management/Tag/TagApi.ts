import { z, type ZodSchema } from "zod";
import {
  type TagRequestDTO,
  type TagResponseDTO,
  type TagUpdateRequestDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type TagEndpoints } from "../../../Endpoint";

export class TagApi extends BaseApi {
  private readonly __ep: TagEndpoints;

  constructor(config: ApiConfig, endpoint: TagEndpoints) {
    super(config);

    this.__ep = endpoint;
  }

  public async create(body: TagRequestDTO): Promise<TagResponseDTO> {
    const schema: ZodSchema = z.object({
      name: z.string().min(1).max(128),
      slug: z.optional(z.string().min(1).max(128)),
      description: z.optional(z.string().max(50_000)),
    });

    const options: RequestOptions = {
      url: this.__ep.base(),
      method: Method.POST,
      data: { schema, content: body },
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
    const schemaType = z.object({
      slug: z.optional(z.string().min(1).max(128)),
      name: z.optional(z.string().min(1).max(128)),
      enabled: z.optional(z.boolean()),
      description: z.optional(z.string().max(50_000)),
    });

    type SchemaType = z.infer<typeof schemaType>;

    const schema: ZodSchema = schemaType.refine(
      (data) => {
        const keys = Object.keys(data) as (keyof SchemaType)[];
        return keys.some((key) => data[key] !== undefined);
      },
      {
        message: "At least one field must be provided",
        path: ["slug", "name", "enabled", "description"],
      },
    );

    const options: RequestOptions = {
      url: this.__ep.by_id(tag_id),
      method: Method.PATCH,
      data: { schema, content: body },
    };

    return this._execute<TagResponseDTO>(options);
  }

  public async delete(tag_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(tag_id),
      method: Method.DELETE,
    };

    return this._execute<void>(options);
  }
}
