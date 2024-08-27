import { CommandQueue } from "../../Dtos";
import { Delivery } from "../../Endpoints";
import { BaseApi } from "../../lib";
import { Method } from "../../types";

export class CommandQueueApi extends BaseApi {
  public async get(
    withOnline?: boolean,
    body?: CommandQueue.Body,
  ): Promise<CommandQueue.Response[]> {
    const queue = await this.request<CommandQueue.Response[]>({
      endpoint: Delivery.CommandQueue.base,
      method: withOnline ? Method.POST : Method.GET,
      ...(withOnline &&
        body && {
          body: new CommandQueue.Body(body),
        }),
    });

    return queue.map((command) => new CommandQueue.Response(command));
  }

  public async bulkMarkExecuted(
    body: CommandQueue.MarkExecuted.Body,
  ): Promise<void> {
    return await this.request<void>({
      endpoint: Delivery.CommandQueue.base,
      method: Method.DELETE,
      body: new CommandQueue.MarkExecuted.Body(body),
    });
  }

  public async markExecutedById(attemptId: string): Promise<void> {
    return await this.request<void>({
      endpoint: Delivery.CommandQueue.byId(attemptId),
      method: Method.DELETE,
    });
  }
}
