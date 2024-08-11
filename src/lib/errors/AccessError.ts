const message = "Invalid Access";

export class AccessError extends Error {
  constructor() {
    super(message);
    this.name = "AccessError";

    Object.setPrototypeOf(this, AccessError.prototype);
  }
}
