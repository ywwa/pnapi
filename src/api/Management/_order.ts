import { BaseAPI } from "../../base";
import { type OrderRequestDTO, type OrderResponseDTO } from "../../dto";
import type OrderEndpoints from "../../endpoints/Management/_order";
import { type ServiceConfig } from "../../types";

export default class OrderAPI extends BaseAPI {
  private readonly _endpoints: OrderEndpoints;

  constructor(config: ServiceConfig, endpoints: OrderEndpoints) {
    super(config);

    this._endpoints = endpoints;
  }

  /**
   * Get orders in the store
   *
   * @param {OrderRequestDTO} [params] - optional filters
   *
   * @return {Promise<OrderResponseDTO[]>} - list of orders
   */
  public async get(params?: OrderRequestDTO): Promise<OrderResponseDTO[]> {
    const searchParams = new URLSearchParams();

    // TODO: hanlde url search params

    return this.request<OrderResponseDTO[]>({
      url: this._endpoints.base(this.config.store_id),
      searchParams,
    });
  }

  /**
   * Get Order by id
   *
   * @param {string} order_id - id of the order
   *
   * @return {Promise<OrderResponseDTO>} - list of orders
   */
  public async getById(order_id: string): Promise<OrderResponseDTO> {
    return this.request<OrderResponseDTO>({
      url: this._endpoints.byId(this.config.store_id, order_id),
    });
  }
}
