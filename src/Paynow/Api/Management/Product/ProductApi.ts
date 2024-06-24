import {
  type ProductRequestDTO,
  type ProductResponseDTO,
  type ProductUpdateRequestDTO,
} from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { create, update } from "../../../../zschemas/product.zsc";
import { type ProductEndpoints } from "../../../Endpoint";

export class ProductApi extends BaseApi {
  private readonly __ep: ProductEndpoints;

  constructor(config: ApiConfig, endpoints: ProductEndpoints) {
    super(config);

    this.__ep = endpoints;
  }

  public async create(body: ProductRequestDTO): Promise<ProductResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.base(),
      method: "POST",
      data: { schema: create, content: body },
    };

    return this._execute<ProductResponseDTO>(options);
  }

  public async getAll(): Promise<ProductResponseDTO[]> {
    const options: RequestOptions = { url: this.__ep.base() };

    return this._execute<ProductResponseDTO[]>(options);
  }

  public async getById(product_id: string): Promise<ProductResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(product_id) };

    return this._execute<ProductResponseDTO>(options);
  }

  public async update(
    product_id: string,
    body?: ProductUpdateRequestDTO,
  ): Promise<ProductResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.by_id(product_id),
      method: "PATCH",
      ...(body && { data: { schema: update, content: body } }),
    };

    return this._execute<ProductResponseDTO>(options);
  }

  public async delete(product_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.by_id(product_id),
      method: "DELETE",
    };

    return this._execute<void>(options);
  }
}
