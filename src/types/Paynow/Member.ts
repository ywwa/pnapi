import { type User } from ".";

/** Member Object */
export type Member = {
  /** User Object */
  user: User;
  /** Flake of the role user has */
  role_id: string;
  /** The date this member was added */
  added_at: Date;
  /** The user that added this member */
  added_by: User;
};
