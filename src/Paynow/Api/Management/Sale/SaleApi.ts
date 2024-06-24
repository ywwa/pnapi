import {
  SaleUpdateDTO,
  type SaleCreateDTO,
  type SaleResponseDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { create, update } from "../../../../zschemas/sale.zsc";
import { type SaleEndpoints } from "../../../Endpoint";

export class SaleApi extends BaseApi {
  private readonly __ep: SaleEndpoints;

  constructor(config: ApiConfig, endpoints: SaleEndpoints) {
    super(config);
    this.__ep = endpoints;
  }

  public async create(body: SaleCreateDTO): Promise<SaleResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.base(),
      method: "POST",
      data: { schema: create, content: body },
    };

    return this._execute<SaleResponseDTO>(options);
  }

  public async getAll(): Promise<SaleResponseDTO[]> {
    const options: RequestOptions = { url: this.__ep.base() };

    return this._execute<SaleResponseDTO[]>(options);
  }

  public async getById(sale_id: string): Promise<SaleResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(sale_id) };

    return this._execute<SaleResponseDTO>(options);
  }

  public async update(
    sale_id: string,
    body: SaleUpdateDTO,
  ): Promise<SaleResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.by_id(sale_id),
      method: "PATCH",
      data: { schema: update, content: body },
    };

    return this._execute<SaleResponseDTO>(options);
  }

  public async delete(sale_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(sale_id),
      method: "DELETE",
    };

    return this._execute<void>(options);
  }
}
