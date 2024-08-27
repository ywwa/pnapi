import { CommandQueueApi } from "../Apis/Delivery";
import { BaseApi } from "../lib";

class Delivery extends BaseApi {
  private commandQueueApi: CommandQueueApi;

  public get CommandQueue(): CommandQueueApi {
    if (!this.commandQueueApi)
      this.commandQueueApi = new CommandQueueApi(this.config);

    return this.commandQueueApi;
  }
}

export default Delivery;
