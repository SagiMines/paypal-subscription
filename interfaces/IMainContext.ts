import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { ISubscription } from './ISubscription';
import { IPaypalPlans } from './IPaypalPlans';
import { ISubscriptionPlanDetails } from './ISubscriptionPlanDetails';

export interface IMainContext {
  isSubscribed: boolean | undefined;
  setIsSubscribed: Dispatch<SetStateAction<boolean | undefined>>;
  subscriptionData: ISubscription | {};
  setSubscriptionData: React.Dispatch<React.SetStateAction<ISubscription | {}>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  subscriptionPlan: MutableRefObject<TSubscriptionPlan | undefined>;
  paypalPlans: IPaypalPlans;
  subscriptionPlanDetails: ISubscriptionPlanDetails | undefined;
  setSubscriptionPlanDetails: Dispatch<
    SetStateAction<ISubscriptionPlanDetails | undefined>
  >;
}
