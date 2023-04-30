import { ISubscription } from '@/interfaces/ISubscription';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { IPaypalPlans } from '@/interfaces/IPaypalPlans';
import {
  cancelSubscription,
  checkForSubscriptions,
  getUserDetails,
} from '@/DAL/functions';
import { ISubscriptionPlanDetails } from '@/interfaces/ISubscriptionPlanDetails';
import LoadingSpinner from './LoadingSpinner';
import UnsubscribedPage from './UnsubscribedPage';
import SubscribedPage from './SubscribedPage';

// The prices for the plans
export const PRICES = {
  pro: 29.0,
  premium: 15.0,
};

const Subscription: NextPage<{ paypalPlans: IPaypalPlans }> = ({
  paypalPlans,
}) => {
  // The chosen subscription plan data
  const [subscriptionData, setSubscriptionData] = useState<ISubscription>({});
  // The final price of the subscription plan
  const [price, setPrice] = useState(0);
  // Checks if there is a subscription already for the user
  const [isSubscribed, setIsSubscribed] = useState<boolean>();
  // The subscription plan details
  const [subscriptionPlanDetails, setSubscriptionPlanDetails] =
    useState<ISubscriptionPlanDetails>();
  // The name of the chosen subscription plan
  const subscriptionPlan = useRef<TSubscriptionPlan>();

  // Checks if the user is already subscribed and updates the state
  const checkIfUserSubscribed = async () => {
    const data = await checkForSubscriptions();
    if (data) {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  };

  // Only activated when isSubscribed changes
  const getPlanDetails = useCallback(async () => {
    const userDetails = await getUserDetails();
    setSubscriptionPlanDetails({ ...userDetails });
  }, [isSubscribed]);

  useEffect(() => {
    checkIfUserSubscribed();
  }, []);

  useEffect(() => {
    if (isSubscribed) {
      getPlanDetails();
    }
  }, [isSubscribed]);

  return (
    <>
      {((!subscriptionPlanDetails && isSubscribed) ||
        isSubscribed === undefined) && <LoadingSpinner />}
      <UnsubscribedPage
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
        subscriptionData={subscriptionData}
        setSubscriptionData={setSubscriptionData}
        setPrice={setPrice}
        subscriptionPlan={subscriptionPlan}
        paypalPlans={paypalPlans}
        price={price}
      />
      <SubscribedPage
        subscriptionPlanDetails={subscriptionPlanDetails}
        setSubscriptionPlanDetails={setSubscriptionPlanDetails}
        cancelSubscription={cancelSubscription}
        setIsSubscribed={setIsSubscribed}
      />
    </>
  );
};

export default Subscription;
