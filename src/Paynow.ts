import { ManagementAPI, ManagementService } from "./api";
import { ClientConfig } from "./types";

export class Paynow {
  private readonly config: ClientConfig;

  private readonly managementService: ManagementService;

  constructor(config: ClientConfig) {
    this.config = config;

    this.managementService = new ManagementService(this.config);
  }

  public get Management(): ManagementAPI {
    return this.managementService.getInstance();
  }
}

export default Paynow;
