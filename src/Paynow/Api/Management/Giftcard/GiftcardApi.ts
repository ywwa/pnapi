import { z, type ZodSchema } from "zod";
import {
  type GiftcardCreateDTO,
  type GiftcardResponseDTO,
  type GiftcardUpdateDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { Method, type ApiConfig, type RequestOptions } from "../../../../types";
import { type GiftcardEndpoints } from "../../../Endpoint";

export class GiftcardApi extends BaseApi {
  private readonly __ep: GiftcardEndpoints;

  constructor(config: ApiConfig, endpoints: GiftcardEndpoints) {
    super(config);
    this.__ep = endpoints;
  }

  public async create(body: GiftcardCreateDTO): Promise<GiftcardResponseDTO> {
    const schema: ZodSchema = z.object({
      code: z.string().regex(/^(?!-)[a-zA-Z0-9-]{1,50}(?<!-)$/, {
        message:
          "Code must be alphanumeric, may include dashes, cannot start or end with a dash, and must be 1-50 characters long.",
      }),
      note: z.optional(z.string().max(200)),
      enabled: z.boolean(),
      usable_at: z.optional(z.string().datetime()),
      expires_at: z.optional(z.string().datetime()),
      starting_balance: z.number(),
    });

    const options: RequestOptions = {
      url: this.__ep.base(),
      method: Method.POST,
      data: { schema, content: body },
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
    const schemaType = z.object({
      code: z.string().regex(/^(?!-)[a-zA-Z0-9-]{1,50}(?<!-)$/, {
        message:
          "Code must be alphanumeric, may include dashes, cannot start or end with a dash, and must be 1-50 characters long.",
      }),
      note: z.string(),
      enabled: z.boolean(),
      usable_at: z.string().datetime(),
      expires_at: z.string().datetime(),
      balance: z.number(),
    });

    type SchemaType = z.infer<typeof schemaType>;

    const schema: ZodSchema = schemaType.partial().refine(
      (data) => {
        const keys = Object.keys(data) as (keyof SchemaType)[];

        return keys.some((key) => data[key] !== undefined);
      },
      {
        message: "At least one field must be provided",
        path: ["code", "note", "enabled", "usable_at", "expires_at", "balance"],
      },
    );

    const options: RequestOptions = {
      url: this.__ep.by_id(giftcard_id),
      method: Method.PATCH,
      data: { schema, content: body },
    };

    return this._execute<GiftcardResponseDTO>(options);
  }

  public async delete(giftcard_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(giftcard_id),
      method: Method.DELETE,
    };

    return this._execute<void>(options);
  }
}
