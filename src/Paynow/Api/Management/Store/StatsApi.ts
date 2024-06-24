import {
  type DashboardRequestDTO,
  type DashboardResponseDTO,
  type StatOrderRequestDTO,
  type StatOrderResponseDTO,
  type StatProductRequestDTO,
  type StatProductResponseDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { dashboard, orders, products } from "../../../../zschemas/store.zsc";
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
    const options: RequestOptions = {
      url: this.__ep.dashboard(),
      search: { schema: dashboard, content: params },
    };

    return this._execute<DashboardResponseDTO>(options);
  }

  public async rangeOrders(
    params: StatOrderRequestDTO,
  ): Promise<StatOrderResponseDTO[]> {
    const options: RequestOptions = {
      url: this.__ep.range_orders(),
      search: { schema: orders, content: params },
    };

    return this._execute<StatOrderResponseDTO[]>(options);
  }

  public async rangeProducts(
    params: StatProductRequestDTO,
  ): Promise<StatProductResponseDTO[]> {
    const options: RequestOptions = {
      url: this.__ep.range_products(),
      search: { schema: products, content: params },
    };

    return this._execute<StatProductResponseDTO[]>(options);
  }
}
