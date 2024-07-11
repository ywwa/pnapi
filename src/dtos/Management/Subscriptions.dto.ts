import { type Subscription } from "../../types";

interface SubscriptionDTO extends Subscription {}

export interface SubscriptionResponseDTO extends SubscriptionDTO {}

export interface SubscriptionLookupDTO {
  customer_id?: string;
  limit?: number;
  after?: string;
  before?: string;
}
