import { ISubscription } from '@/interfaces/ISubscription';
import { useState } from 'react';
import DynamicToggleButtons from './DynamicToggleButtons';
import { Button } from 'react-bootstrap';

export const PRICES = {
  pro: 9.99,
  premium: 14.99,
};

function Subscription() {
  const [subscriptionData, setSubscriptionData] = useState<ISubscription>({});
  const [price, setPrice] = useState(0);

  return (
    <div>
      <h1>Choose your subscription plan</h1>
      <DynamicToggleButtons
        button1Name="Yearly Plan"
        button2Name="Monthly Plan"
        type="paymentPlan"
        subscriptionData={subscriptionData}
        setSubscriptionData={setSubscriptionData}
        setPrice={setPrice}
      />
      <hr />
      <DynamicToggleButtons
        button1Name="Pro"
        button2Name="Premium"
        type="type"
        subscriptionData={subscriptionData}
        setSubscriptionData={setSubscriptionData}
        setPrice={setPrice}
      />
      <h3>${price}</h3>

      <Button>Confirm</Button>
    </div>
  );
}

export default Subscription;
