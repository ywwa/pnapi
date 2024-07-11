import { Endpoint } from "../../../../lib";

/**
 * Represents endpoints related to statistics for a specific store.
 * @extends Endpoint
 */
export class StoresStatsEndpoints extends Endpoint {
  private __storeId: string;

  /**
   * Constructs a new StoresStatsEndpoints instance.
   * @param {string} baseUrl - The base URL for API endpoints.
   * @param {string} storeId - The ID of the store.
   */
  constructor(baseUrl: string, storeId: string) {
    super(baseUrl);
    this.__storeId = storeId;
  }

  /**
   * Constructs the base URL for store stats endpoints.
   * @returns {string} The base URL for store stats endpoints.
   */
  public get base(): string {
    return this.__build_url(this.__baseUrl, this.__storeId, "stats");
  }

  /**
   * Constructs a URL for the dashboard statistics of the store.
   * @returns {string} The URL for the dashboard statistics.
   */
  public get dashboard(): string {
    return this.__build_url(this.base, "dashboard");
  }

  /**
   * Constructs a URL for fetching range orders statistics of the store.
   * @returns {string} The URL for range orders statistics.
   */
  public get rangeOrders(): string {
    return this.__build_url(this.base, "range-orders");
  }

  /**
   * Constructs a URL for fetching range products statistics of the store.
   * @returns {string} The URL for range products statistics.
   */
  public get rangeProducts(): string {
    return this.__build_url(this.base, "range-products");
  }
}
