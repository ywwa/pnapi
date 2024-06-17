import { ServiceConfig } from "../types";

export class BaseService {
  protected readonly config: ServiceConfig;

  constructor(config: ServiceConfig) {
    this.config = config;
  }
}
