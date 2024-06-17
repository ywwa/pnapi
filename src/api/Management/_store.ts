import { BaseAPI } from "../../base";
import { type StoreRequestDTO, type StoreResponseDTO } from "../../dto";
import StoreEndpoints from "../../endpoints/Management/_store";
import { RequestMethods, type ServiceConfig } from "../../types";
import StoreMembersAPI from "./_storeMembers";

export default class StoreAPI extends BaseAPI {
  private readonly _endpoints: StoreEndpoints;

  private readonly membersAPI: StoreMembersAPI;

  constructor(config: ServiceConfig, endpoints: StoreEndpoints) {
    super(config);

    this._endpoints = endpoints;
    this.membersAPI = new StoreMembersAPI(this.config, endpoints.Members);
  }

  /**
   * Get the store by its id.
   *
   * @return {Promise<StoreResponseDTO>} Store Data
   */
  public async get(): Promise<StoreResponseDTO> {
    return this.request<StoreResponseDTO>({
      url: this._endpoints.byId(this.config.store_id),
    });
  }

  /**
   * Update the store.
   *
   * @param {StoreRequestDTO} [params] - Data that should be updated
   * @todo Add validation that prevents user from trying to use impossible data
   * e.g slug with spaces, special symbols etc.
   *
   * @return {Promise<StoreResponseDTO>} Updated Store Data
   *
   */
  public async update(params?: StoreRequestDTO): Promise<StoreResponseDTO> {
    return this.request<StoreResponseDTO>({
      url: this._endpoints.byId(this.config.store_id),
      method: RequestMethods.PATCH,
      body: params,
    });
  }

  /**
   * Store member related endpoints
   */
  public get Members(): StoreMembersAPI {
    return this.membersAPI;
  }
}
