import { Endpoint } from "../../../../lib";

export class GiftcardsEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  get base(): string {
    return this.__build_url(this.__baseUrl, "giftcards");
  }

  byId(giftcardId: string): string {
    this.__validate({ giftcardId });
    return this.__build_url(this.base, giftcardId);
  }
}
