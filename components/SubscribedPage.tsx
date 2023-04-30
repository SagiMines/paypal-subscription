import { NextPage } from 'next';
import { ISubscribedPage } from '@/interfaces/ISubscribedPage';
import { Button } from 'react-bootstrap';
import styles from '../styles/SubscribedPage.module.css';

const SubscribedPage: NextPage<ISubscribedPage> = ({
  subscriptionPlanDetails,
  setSubscriptionPlanDetails,
  cancelSubscription,
  setIsSubscribed,
}) => {
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
};

export default SubscribedPage;
