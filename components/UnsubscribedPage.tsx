import DynamicToggleButtons from './DynamicToggleButtons';
import { NextPage } from 'next';
import { IUnsubscribedPage } from '@/interfaces/IUnsubscribedPage';
import PaypalSubscription from './PaypalSubscription';

const UnsubscribedPage: NextPage<IUnsubscribedPage> = ({
  isSubscribed,
  setIsSubscribed,
  subscriptionData,
  setSubscriptionData,
  setPrice,
  subscriptionPlan,
  paypalPlans,
  price,
}) => {
  return (
    <>
      {isSubscribed === false && (
        <div>
          <h1>Choose your subscription plan</h1>
          <DynamicToggleButtons
            button1Name="Annually Plan"
            button2Name="Monthly Plan"
            type="paymentPlan"
            subscriptionData={subscriptionData}
            setSubscriptionData={setSubscriptionData}
            setPrice={setPrice}
            subscriptionPlan={subscriptionPlan}
          />
          <hr />
          <DynamicToggleButtons
            button1Name="Pro"
            button2Name="Premium"
            type="type"
            subscriptionData={subscriptionData}
            setSubscriptionData={setSubscriptionData}
            setPrice={setPrice}
            subscriptionPlan={subscriptionPlan}
          />
          <h3>${price}</h3>

          {price !== 0 && (
            <PaypalSubscription
              setIsSubscribed={setIsSubscribed}
              paypalPlans={paypalPlans}
              subscriptionPlan={subscriptionPlan}
            />
          )}
        </div>
      )}
    </>
  );
};
export default UnsubscribedPage;
