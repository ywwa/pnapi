import { type StoresStatsEndpoints } from "../../..";
import { Access, type ApiConfig, type RequestOptions } from "../../../..";
import {
  StatsProductsDTO,
  type StatsDashboardDTO,
  type StatsOrdersDTO,
  type StatsRequestDTO,
} from "../../../../dtos";
import {
  Api,
  dashboardResponseSchema,
  rangeOrdersResponseSchema,
  rangeProductsResponseSchema,
  statsDashboardSchema,
  statsRangeSchema,
} from "../../../../lib";

export class StoreStatsApi extends Api {
  private readonly __endpoints: StoresStatsEndpoints;

  constructor(config: ApiConfig, endpoints: StoresStatsEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async dashboard(
    params: Pick<StatsRequestDTO, "tz">,
  ): Promise<StatsDashboardDTO> {
    try {
      this._check_auth([Access.User, Access.Api]);
      const options: RequestOptions = {
        url: this.__endpoints.dashboard,
        search: { schema: statsDashboardSchema, params },
        response: dashboardResponseSchema,
      };

      return this._request<StatsDashboardDTO>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async orders(params: StatsRequestDTO): Promise<StatsOrdersDTO[]> {
    try {
      this._check_auth([Access.User, Access.Api]);
      const options: RequestOptions = {
        url: this.__endpoints.rangeOrders,
        search: { schema: statsRangeSchema, params },
        response: rangeOrdersResponseSchema,
      };

      return this._request<StatsOrdersDTO[]>(options);
    } catch (error: any) {
      throw error;
    }
  }

  async products(params: StatsRequestDTO): Promise<StatsProductsDTO[]> {
    try {
      this._check_auth([Access.User, Access.Api]);
      const options: RequestOptions = {
        url: this.__endpoints.rangeProducts,
        search: { schema: statsRangeSchema, params },
        response: rangeProductsResponseSchema,
      };

      return this._request<StatsProductsDTO[]>(options);
    } catch (error: any) {
      throw error;
    }
  }
}
