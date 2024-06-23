import { z, type ZodSchema } from "zod";
import {
  type DashboardRequestDTO,
  type DashboardResponseDTO,
  type OrderRequestDTO,
  type OrderResponseDTO,
  type ProductRequestDTO,
  type ProductResponseDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { type StatEndpoints } from "../../../Endpoint";

export class StatsApi extends BaseApi {
  private readonly __ep: StatEndpoints;

  constructor(config: ApiConfig, endpoints: StatEndpoints) {
    super(config);
    this.__ep = endpoints;
  }

  public async dashboard(
    params: DashboardRequestDTO,
  ): Promise<DashboardResponseDTO> {
    const schema: ZodSchema = z.object({
      tz: z
        .string()
        .refine((value) => Intl.supportedValuesOf("timeZone").includes(value), {
          message: "Invalid Time Zone",
        }),
    });

    const options: RequestOptions = {
      url: this.__ep.dashboard(),
      search: { schema, content: params },
    };

    return this._execute<DashboardResponseDTO>(options);
  }

  public async rangeOrders(
    params: OrderRequestDTO,
  ): Promise<OrderResponseDTO[]> {
    const schema: ZodSchema = z.object({
      start: z.string().datetime(),
      end: z.string().datetime(),
      tz: z.optional(
        z
          .string()
          .refine(
            (value) => Intl.supportedValuesOf("timeZone").includes(value),
            { message: "Invalid Time Zone" },
          ),
      ),
    });

    const options: RequestOptions = {
      url: this.__ep.range_orders(),
      search: { schema, content: { params } },
    };

    return this._execute<OrderResponseDTO[]>(options);
  }

  public async rangeProducts(
    params: ProductRequestDTO,
  ): Promise<ProductResponseDTO[]> {
    const schema: ZodSchema = z.object({
      start: z.string().datetime(),
      end: z.string().datetime(),
      limit: z.optional(z.number().max(100)),
      tz: z.optional(
        z
          .string()
          .refine(
            (value) => Intl.supportedValuesOf("timeZone").includes(value),
            {
              message: "Invalid Time Zone",
            },
          ),
      ),
    });

    const options: RequestOptions = {
      url: this.__ep.range_products(),
      search: { schema, content: { params } },
    };

    return this._execute<ProductResponseDTO[]>(options);
  }
}
