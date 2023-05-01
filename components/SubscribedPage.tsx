import { useContext } from 'react';
import { MainContext } from '@/DAL/mainContext';
import GenericModal from './GenericModal';

function SubscribedPage() {
  const { subscriptionPlanDetails } = useContext(MainContext);

  return (
    <>
      {subscriptionPlanDetails && (
        <div className="container-center">
          <h1 className="page-heading">
            Hello {subscriptionPlanDetails.userFirstName}{' '}
            {subscriptionPlanDetails.userLastName}!
          </h1>
          <h3>You are subscribed to {subscriptionPlanDetails.planName}</h3>
          <h3>Your plan's price is: ${subscriptionPlanDetails.planPrice}</h3>
          <GenericModal buttonType="change" />
          <GenericModal buttonType="cancel" />
        </div>
      )}
    </>
  );
}

export default SubscribedPage;
