import { type Subscription } from "../../types";

export interface SubscriptionResponseDTO extends Subscription {}

export interface SubscriptionRequestDTO {
  limit?: number;
  after?: string;
  before?: string;
  customer_id?: string;
}
