import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { ISubscription } from './ISubscription';
import { IPaypalPlans } from './IPaypalPlans';

export interface IUnsubscribedPage {
  isSubscribed: boolean | undefined;
  setIsSubscribed: Dispatch<SetStateAction<boolean | undefined>>;
  subscriptionData: ISubscription | {};
  setSubscriptionData: React.Dispatch<React.SetStateAction<ISubscription | {}>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  subscriptionPlan: MutableRefObject<TSubscriptionPlan | undefined>;
  paypalPlans: IPaypalPlans;
  price: number;
}
