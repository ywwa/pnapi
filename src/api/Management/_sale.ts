import { BaseAPI } from "../../base";
import SaleEndpoints from "../../endpoints/Management/_sale";
import { ServiceConfig } from "../../types";

export default class SaleAPI extends BaseAPI {
  private readonly _endpoints: SaleEndpoints;

  constructor(config: ServiceConfig, endpoints: SaleEndpoints) {
    super(config);
    this._endpoints = endpoints;
  }

  public async create() {
    return this._endpoints.base(this.config.store_id);
  }

  public async getAll() {
    return this._endpoints.base(this.config.store_id);
  }

  public async getById(sale_id: string) {
    return this._endpoints.byId(this.config.store_id, sale_id);
  }

  public async update(sale_id: string) {
    return this._endpoints.byId(this.config.store_id, sale_id);
  }

  public async delete(sale_id: string) {
    return this._endpoints.byId(this.config.store_id, sale_id);
  }
}
