export abstract class Endpoint {
  protected readonly __baseUrl: string;

  constructor(baseUrl: string) {
    this.__baseUrl = baseUrl.replace(/\/+$/, "");
    this.__baseUrl = baseUrl;
  }

  /**
   * Constructs a URL by concatenating the base URL with additional parts.
   * @param base - The base URL.
   * @param parts - Additional URL segments.
   * @returns The constructed URL.
   */
  protected __build_url(base: string, ...parts: string[]): string {
    if (!base) throw new Error("Base URL is required");

    const normalizedBase = base.replace(/\/+$/, "");
    const normalizedParts = parts.map((part) => part.replace(/^\/+|\/+$/g, ""));
    return [normalizedBase, ...normalizedParts].join("/");
  }

  /**
   * Validates that required parameters are not empty.
   * @param params - An object containing the parameters to validate.
   */
  protected __validate(params: { [key: string]: any }): void {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "")
        throw new Error(`${key} is required`);
    });
  }
}
