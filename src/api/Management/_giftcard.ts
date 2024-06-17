import { BaseAPI } from "../../base";
import GiftcardEndpoints from "../../endpoints/Management/_giftcard";
import { ServiceConfig } from "../../types";

export default class GiftcardAPI extends BaseAPI {
  private readonly _endpoints: GiftcardEndpoints;

  constructor(config: ServiceConfig, endpoints: GiftcardEndpoints) {
    super(config);
    this._endpoints = endpoints;
  }

  public async create() {
    return this._endpoints.base(this.config.store_id);
  }

  public async getAll() {
    return this._endpoints.base(this.config.store_id);
  }

  public async getById(giftcard_id: string) {
    return this._endpoints.byId(this.config.store_id, giftcard_id);
  }

  public async update(giftcard_id: string) {
    return this._endpoints.byId(this.config.store_id, giftcard_id);
  }

  public async delete(giftcard_id: string) {
    return this._endpoints.byId(this.config.store_id, giftcard_id);
  }
}
