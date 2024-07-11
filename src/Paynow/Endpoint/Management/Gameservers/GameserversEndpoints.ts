import { Endpoint } from "../../../../lib";

export class GameserversEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  get base(): string {
    return this.__build_url(this.__baseUrl, "gameservers");
  }

  byId(gameserverId: string): string {
    this.__validate({ gameserverId });
    return this.__build_url(this.base, gameserverId);
  }

  resetToken(gameserverId: string): string {
    return this.__build_url(this.byId(gameserverId), "reset-token");
  }
}
