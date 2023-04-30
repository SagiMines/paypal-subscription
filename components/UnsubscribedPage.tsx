import DynamicToggleButtons from './DynamicToggleButtons';
import PaypalSubscription from './PaypalSubscription';
import { Row } from 'react-bootstrap';
import styles from '../styles/UnsubscribedPage.module.css';
import { useContext } from 'react';
import { MainContext } from '@/DAL/mainContext';

function UnsubscribedPage() {
  const { isSubscribed, price } = useContext(MainContext);

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
            />
          </Row>
          <Row className={styles.toggleButtonsContainer}>
            <DynamicToggleButtons
              button1Name="Pro"
              button2Name="Premium"
              type="type"
            />
          </Row>
          <h3 className={styles.finalPrice}>${price}</h3>

          {price !== 0 && <PaypalSubscription />}
        </div>
      )}
    </>
  );
}
export default UnsubscribedPage;
