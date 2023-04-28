import { MutableRefObject } from 'react';
import { IPaypalPlans } from './IPaypalPlans';

export interface IPaypalSubscription {
  paypalPlans: IPaypalPlans;
  subscriptionPlan: MutableRefObject<TSubscriptionPlan | undefined>;
}
