import {
  type InventoryRequestDTO,
  type InventoryResponseDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { item } from "../../../../zschemas/customer.zsc";
import { type InventoryEndpoints } from "../../../Endpoint";

export class InventoryApi extends BaseApi {
  private readonly __ep: InventoryEndpoints;

  constructor(config: ApiConfig, endpoints: InventoryEndpoints) {
    super(config);

    this.__ep = endpoints;
  }

  public async assign(
    customer_id: string,
    body?: InventoryRequestDTO,
  ): Promise<InventoryResponseDTO[]> {
    const options: RequestOptions = {
      url: this.__ep.base(customer_id),
      method: "POST",
      ...(body && { data: { schema: item, content: body } }),
    };

    return this._execute<InventoryResponseDTO[]>(options);
  }

  public async get(customer_id: string): Promise<InventoryResponseDTO[]> {
    const options: RequestOptions = {
      url: this.__ep.base(customer_id),
    };

    return this._execute<InventoryResponseDTO[]>(options);
  }

  public async revoke(customer_id: string, item_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(customer_id, item_id),
      method: "DELETE",
    };

    return this._execute<void>(options);
  }
}
