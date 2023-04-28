import { ISubscriptionPlanDetails } from './ISubscriptionPlanDetails';

export interface ISubscribedPage {
  subscriptionPlanDetails: ISubscriptionPlanDetails | undefined;
  cancelSubscription: () => Promise<void>;
}
