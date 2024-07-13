/** User object */
export type User = {
  /** Flake */
  id: string;
  /** First name */
  first_name: string;
  /** Last name */
  last_name: string;
  /** Email */
  email?: string;
  /** The date this user was created */
  created_at: Date;
};
