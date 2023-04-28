import { NextPage } from 'next';
import LoadingSpinner from './LoadingSpinner';
import { ISubscribedPage } from '@/interfaces/ISubscribedPage';
import { Button } from 'react-bootstrap';

const SubscribedPage: NextPage<ISubscribedPage> = ({
  subscriptionPlanDetails,
  cancelSubscription,
}) => {
  return (
    <>
      {/* {!subscriptionPlanDetails && <LoadingSpinner />} */}
      {subscriptionPlanDetails && (
        <div>
          <h1>
            Hello {subscriptionPlanDetails.userFirstName}{' '}
            {subscriptionPlanDetails.userLastName}!
          </h1>
          <h3>You are subscribed to {subscriptionPlanDetails.planName}</h3>
          <h3>Your plan's price is: ${subscriptionPlanDetails.planPrice}</h3>
          <Button onClick={cancelSubscription}>Cancel Subscription</Button>
        </div>
      )}
    </>
  );
};

export default SubscribedPage;
