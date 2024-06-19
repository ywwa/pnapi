import { type OrderResponseDTO } from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { RequestOptions, type ApiConfig } from "../../../../types";
import { type OrderEndpoints } from "../../../Endpoint";

export class OrderApi extends BaseApi {
  private readonly __ep: OrderEndpoints;

  constructor(config: ApiConfig, endpoint: OrderEndpoints) {
    super(config);
    this.__ep = endpoint;
  }

  public async getAll(): Promise<OrderResponseDTO[]> {
    const options: RequestOptions = { url: this.__ep.base() };

    return this._execute<OrderResponseDTO[]>(options);
  }

  public async getById(order_id: string): Promise<OrderResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(order_id) };

    return this._execute<OrderResponseDTO>(options);
  }
}
