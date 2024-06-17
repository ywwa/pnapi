import ManagementEndpoints from "./Management";

export default class APIEndpoints {
  public readonly management: ManagementEndpoints;

  constructor() {
    this.management = new ManagementEndpoints();
  }
}
