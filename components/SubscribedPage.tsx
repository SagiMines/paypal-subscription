import { Button } from 'react-bootstrap';
import styles from '../styles/SubscribedPage.module.css';
import { cancelSubscription } from '@/DAL/functions';
import { useContext } from 'react';
import { MainContext } from '@/DAL/mainContext';

function SubscribedPage() {
  const {
    subscriptionPlanDetails,
    setSubscriptionPlanDetails,
    setIsSubscribed,
  } = useContext(MainContext);

  //Cancles the subscription and updates the state
  const handleClick = async () => {
    await cancelSubscription();
    setIsSubscribed(false);
    setSubscriptionPlanDetails(undefined);
  };

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
          <Button
            className={styles.cancelSubscriptionButton}
            variant="danger"
            onClick={handleClick}
          >
            Cancel Subscription
          </Button>
        </div>
      )}
    </>
  );
}

export default SubscribedPage;
