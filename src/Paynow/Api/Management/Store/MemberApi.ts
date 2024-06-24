import { type MemberResponseDTO } from "../../../../dtos";
import { BaseApi } from "../../../../lib";
import { type ApiConfig, type RequestOptions } from "../../../../types";
import { member_set_role } from "../../../../zschemas/store.zsc";
import { type MemberEndpoints } from "../../../Endpoint";

export class MemberApi extends BaseApi {
  private readonly __ep: MemberEndpoints;

  constructor(config: ApiConfig, endpoints: MemberEndpoints) {
    super(config);

    this.__ep = endpoints;
  }

  /**
   * Get all members of the current store.
   *
   * @return {MemberResponseDTO[]} Members
   */
  public async getAll(): Promise<MemberResponseDTO[]> {
    const options: RequestOptions = { url: this.__ep.base() };

    return this._execute<MemberResponseDTO[]>(options);
  }

  /**
   * Get member from current store by ID.
   *
   * @param {string} user_id ID of the user
   *
   * @return {MemberResponseDTO} Members
   */
  public async getById(user_id: string): Promise<MemberResponseDTO> {
    const options: RequestOptions = { url: this.__ep.by_id(user_id) };

    return this._execute<MemberResponseDTO>(options);
  }

  /**
   * Set role to specific user.
   *
   * @param {string} user_id ID of the user
   * @param {string} role_id ID of the role
   *
   * @return {MemberResponseDTO} Member
   */
  public async setRole(
    user_id: string,
    role_id: string,
  ): Promise<MemberResponseDTO> {
    const options: RequestOptions = {
      url: this.__ep.set_role(user_id),
      method: "POST",
      data: { schema: member_set_role, content: { role_id } },
    };

    return this._execute<MemberResponseDTO>(options);
  }
}
