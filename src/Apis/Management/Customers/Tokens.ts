import { Token } from "../../../Dtos";
import { Tokens } from "../../../Endpoints/Management";
import { BaseApi } from "../../../lib";
import { Method } from "../../../types";

export class TokensApi extends BaseApi {
  public async create(
    customerId: string,
    storeId?: string,
  ): Promise<Token.Response> {
    const data = await this.request({
      endpoint: Tokens.byId(this.storeId(storeId), customerId),
      method: Method.POST,
    });

    return new Token.Response(data);
  }

  public async invalidate(customerId: string, storeId?: string): Promise<void> {
    return await this.request<void>({
      endpoint: Tokens.byId(this.storeId(storeId), customerId),
      method: Method.DELETE,
    });
  }

  public async invalidateAll(storeId?: string): Promise<void> {
    return await this.request<void>({
      endpoint: Tokens.base(this.storeId(storeId)),
      method: Method.DELETE,
    });
  }
}
