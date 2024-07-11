import { Endpoint } from "../../../../lib";

export class TagsEndpoints extends Endpoint {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  get base(): string {
    return this.__build_url(this.__baseUrl, "tags");
  }

  byId(tagId: string): string {
    this.__validate({ tagId });
    return this.__build_url(this.base, tagId);
  }
}
