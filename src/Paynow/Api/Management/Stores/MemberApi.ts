import { Method, type ApiConfig, type RequestOptions } from "../../../..";
import { type MemberResponseDTO } from "../../../../dtos";
import {
  Api,
  memberRoleSchema,
  storeMemberResponseSchema,
} from "../../../../lib";
import { type StoresMembersEndpoints } from "../../../Endpoint";

export class StoreMembersApi extends Api {
  private readonly __endpoints: StoresMembersEndpoints;

  constructor(config: ApiConfig, endpoints: StoresMembersEndpoints) {
    super(config);
    this.__endpoints = endpoints;
  }

  async getAll(): Promise<MemberResponseDTO[]> {
    const options: RequestOptions = {
      url: this.__endpoints.base,
      response: storeMemberResponseSchema.array(),
    };

    return this._request<MemberResponseDTO[]>(options);
  }

  async getById(userId: string): Promise<MemberResponseDTO> {
    const options: RequestOptions = {
      url: this.__endpoints.byId(userId),
      response: storeMemberResponseSchema,
    };

    return this._request<MemberResponseDTO>(options);
  }

  async setRole(userId: string, roleId: string): Promise<MemberResponseDTO> {
    const options: RequestOptions = {
      url: this.__endpoints.setRole(userId),
      method: Method.Post,
      data: { schema: memberRoleSchema, params: { role_id: roleId } },
      response: storeMemberResponseSchema,
    };

    return this._request<MemberResponseDTO>(options);
  }
}
