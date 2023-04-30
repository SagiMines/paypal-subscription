import DynamicToggleButtons from './DynamicToggleButtons';
import { NextPage } from 'next';
import { IUnsubscribedPage } from '@/interfaces/IUnsubscribedPage';
import PaypalSubscription from './PaypalSubscription';
import { Row } from 'react-bootstrap';
import styles from '../styles/UnsubscribedPage.module.css';

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
        <div className="container-center">
          <h1 className="page-heading">Choose your subscription plan</h1>
          <Row className={styles.toggleButtonsContainer}>
            <DynamicToggleButtons
              button1Name="Annually Plan"
              button2Name="Monthly Plan"
              type="paymentPlan"
              subscriptionData={subscriptionData}
              setSubscriptionData={setSubscriptionData}
              setPrice={setPrice}
              subscriptionPlan={subscriptionPlan}
            />
          </Row>
          <Row className={styles.toggleButtonsContainer}>
            <DynamicToggleButtons
              button1Name="Pro"
              button2Name="Premium"
              type="type"
              subscriptionData={subscriptionData}
              setSubscriptionData={setSubscriptionData}
              setPrice={setPrice}
              subscriptionPlan={subscriptionPlan}
            />
          </Row>
          <h3 className={styles.finalPrice}>${price}</h3>

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
