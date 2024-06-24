import { type TokenResponseDTO } from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { type TokenEndpoints } from "../../../Endpoint";

export class TokenApi extends BaseApi {
  private readonly __ep: TokenEndpoints;

  constructor(config: ApiConfig, endpoints: TokenEndpoints) {
    super(config);

    this.__ep = endpoints;
  }

  public async create(customer_id: string): Promise<TokenResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.base(customer_id),
      method: "POST",
    };

    return this._execute<TokenResponseDTO>(options);
  }

  public async invalidate(customer_id: string): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.base(customer_id),
      method: "DELETE",
    };

    return this._execute<void>(options);
  }

  public async invalidateAll(): Promise<void> {
    const options: RequestOptions = {
      url: this.__ep.global(),
      method: "DELETE",
    };

    return this._execute<void>(options);
  }
}
