import { ThingsOrder } from '../enums/things_order.enum';

export type MarkAsDone = {
  identifier: string;
  order: ThingsOrder;
  userIdentifier: string;
};
