import { Member, Role } from "../types";

export interface StoreMemberResponseDTO extends Member {
  role: Role;
}
