import { StoresMembersEndpoints, StoresStatsEndpoints } from ".";
import { Endpoint } from "../../../../lib";

export class StoresEndpoints extends Endpoint {
  private __storeMembersEndpoints: {
    [storeId: string]: StoresMembersEndpoints;
  } = {};
  private __storeStatsEndpoints: {
    [storeId: string]: StoresStatsEndpoints;
  } = {};

  constructor(baseUrl: string) {
    super(baseUrl);
  }

  /**
   * Constructs the base URL for store endpoints.
   * @returns The base URL for store endpoints.
   */
  public get base() {
    return this.__build_url(this.__baseUrl, "stores");
  }

  /**
   * Constructs a URL for a specific store by its ID.
   * @param store_id - The ID of the store.
   * @returns The URL for the specific store.
   */
  public byId(storeId: string): string {
    this.__validate({ storeId });
    return this.__build_url(this.base, storeId);
  }

  /**
   * Provides a StoresMembersEndpoints instance for a specific store ID.
   * @param storeId - The ID of the store.
   * @returns The StoresMembersEndpoints instance.
   */
  public members(storeId: string): StoresMembersEndpoints {
    this.__validate({ storeId });

    if (!this.__storeMembersEndpoints[storeId])
      this.__storeMembersEndpoints[storeId] = new StoresMembersEndpoints(
        this.base,
        storeId,
      );

    return this.__storeMembersEndpoints[storeId];
  }

  /**
   * Provides a StoresStatsEndpoints instance for a specific store ID.
   * @param storeId - The ID of the store.
   * @returns The StoresStatsEndpoints instance.
   */
  public stats(storeId: string): StoresStatsEndpoints {
    this.__validate({ storeId });

    if (!this.__storeStatsEndpoints[storeId])
      this.__storeStatsEndpoints[storeId] = new StoresStatsEndpoints(
        this.base,
        storeId,
      );

    return this.__storeStatsEndpoints[storeId];
  }
}
