import { Endpoint } from "../../../../lib";

/**
 * Represents endpoints related to members of a specific store.
 * @extends Endpoint
 */
export class StoresMembersEndpoints extends Endpoint {
  private __storeId: string;

  /**
   * Constructs a new StoresMembersEndpoints instance.
   * @param {string} baseUrl - The base URL for API endpoints.
   * @param {string} storeId - The ID of the store.
   */
  constructor(baseUrl: string, storeId: string) {
    super(baseUrl);
    this.__storeId = storeId;
  }

  /**
   * Constructs the base URL for store members endpoints.
   * @returns {string} The base URL for store members endpoints.
   */
  public get base(): string {
    return this.__build_url(this.__baseUrl, this.__storeId, "members");
  }

  /**
   * Constructs a URL for a specific member by their ID within the store.
   * @param {string} userId - The ID of the user.
   * @returns {string} The URL for the specific member within the store.
   */
  public byId(userId: string): string {
    this.__validate({ userId });
    return this.__build_url(this.base, userId);
  }

  /**
   * Constructs a URL for setting the role of a specific member within the store.
   * @param {string} userId - The ID of the user.
   * @returns {string} The URL for setting the role of the specific member within the store.
   */
  public setRole(userId: string): string {
    return this.__build_url(this.byId(userId), "set-role");
  }
}
