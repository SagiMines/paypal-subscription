import { ISubscription } from './ISubscription';

export interface IDynamicToggleButtonsProps {
  button1Name: string;
  button2Name: string;
  type: string;
  subscriptionData: ISubscription | {};
  setSubscriptionData: React.Dispatch<React.SetStateAction<ISubscription | {}>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}
