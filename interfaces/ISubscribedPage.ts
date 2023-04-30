import { Dispatch, SetStateAction } from 'react';
import { ISubscriptionPlanDetails } from './ISubscriptionPlanDetails';

export interface ISubscribedPage {
  subscriptionPlanDetails: ISubscriptionPlanDetails | undefined;
  setSubscriptionPlanDetails: Dispatch<
    SetStateAction<ISubscriptionPlanDetails | undefined>
  >;
  cancelSubscription: () => Promise<void>;
  setIsSubscribed: Dispatch<SetStateAction<boolean | undefined>>;
}
