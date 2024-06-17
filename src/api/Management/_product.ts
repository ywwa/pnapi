import { BaseAPI } from "../../base";
import { type ProductRequestDTO, type ProductResponseDTO } from "../../dto";
import type ProductEndpoints from "../../endpoints/Management/_product";
import { Optional, RequestMethods, type ServiceConfig } from "../../types";

export default class ProductAPI extends BaseAPI {
  private readonly _endpoints: ProductEndpoints;
  constructor(config: ServiceConfig, endpoints: ProductEndpoints) {
    super(config);

    this._endpoints = endpoints;
  }

  /**
   * Create new product
   *
   * @param {ProductRequestDTO} params - data of the product
   *
   * @return {Promise<ProductResponseDTO>} newly created product
   */
  public async create(params: ProductRequestDTO): Promise<ProductResponseDTO> {
    return this.request<ProductResponseDTO>({
      url: this._endpoints.base(this.config.store_id),
      method: RequestMethods.POST,
      body: params,
    });
  }

  /**
   * Get all products of the store
   *
   * @return {Promise<ProductResponseDTO[]>} list of all products in the store
   */
  public async getAll(): Promise<ProductResponseDTO[]> {
    return this.request<ProductResponseDTO[]>({
      url: this._endpoints.base(this.config.store_id),
    });
  }

  /**
   * Get product by id
   *
   * @param {string} product_id - id of the product
   *
   * @return {Promise<ProductResponseDTO>} product
   */
  public async getById(product_id: string): Promise<ProductResponseDTO> {
    return this.request<ProductResponseDTO>({
      url: this._endpoints.byId(this.config.store_id, product_id),
    });
  }

  /**
   * Update the product
   *
   * @param {string} product_id - id of the product
   * @param {Optional<ProductRequestDTO>} params - data of the product
   *
   * @return {Promise<ProductResponseDTO>} product
   */
  public async update(
    product_id: string,
    params: Optional<ProductRequestDTO>,
  ): Promise<ProductResponseDTO> {
    return this.request<ProductResponseDTO>({
      url: this._endpoints.byId(this.config.store_id, product_id),
      method: RequestMethods.PATCH,
      body: params,
    });
  }

  /**
   * delete the product
   *
   * @param {string} product_id - id of the product
   *
   * @return {void} 204 HTTP Response
   */
  public async delete(product_id: string): Promise<void> {
    return this.request<void>({
      url: this._endpoints.byId(this.config.store_id, product_id),
      method: RequestMethods.DELETE,
    });
  }
}
