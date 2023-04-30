import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { IPaypalPlans } from './IPaypalPlans';

export interface IPaypalSubscription {
  paypalPlans: IPaypalPlans;
  subscriptionPlan: MutableRefObject<TSubscriptionPlan | undefined>;
  setIsSubscribed: Dispatch<SetStateAction<boolean | undefined>>;
}
