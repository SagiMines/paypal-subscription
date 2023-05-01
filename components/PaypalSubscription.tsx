import { useContext, useState } from 'react';
import { CreateSubscriptionActions } from '@paypal/paypal-js';
import { PayPalButtons } from '@paypal/react-paypal-js';
import {
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js/types/components/buttons';
import { camelize, changePlan, fetchFromAPI } from '@/DAL/functions';
import styles from '../styles/PaypalSubscription.module.css';
import { MainContext } from '@/DAL/mainContext';
import { Row } from 'react-bootstrap';
import { NextPage } from 'next';

const PaypalSubscription: NextPage<{
  action?: string;
  closeModal?: () => void;
}> = ({ action, closeModal }) => {
  const {
    setIsSubscribed,
    paypalPlans,
    subscriptionPlan,
    subscriptionPlanDetails,
    setIsSubscriptionPlanChanged,
  } = useContext(MainContext);

  const [errorMessage, setErrorMessage] = useState('');

  const onError = () => {
    setErrorMessage('An error occoured with your payment');
  };

  const createSubscription = async (
    data: Record<string, unknown>,
    actions: CreateSubscriptionActions
  ) => {
    console.log('create subscription func!');
    if (action === 'change') {
      const planName = subscriptionPlanDetails?.planName;
      if (planName) {
        const planProduct = planName.split(' ')[0];
        const planSubscription = changePlan(planName.split(' ')[1]);
        const plan = planProduct.concat(' ', planSubscription);
        const camelizedNewPlan = camelize(plan);
        const subscriptionIDResponse = await fetchFromAPI('/api/cookies');
        const subscriptionIDData = await subscriptionIDResponse.json();
        return actions.subscription.revise(subscriptionIDData.subscriptionID, {
          plan_id:
            camelizedNewPlan === 'premiumMonthly' ||
            camelizedNewPlan === 'premiumAnnually' ||
            camelizedNewPlan === 'proMonthly' ||
            camelizedNewPlan === 'proAnnually'
              ? paypalPlans[camelizedNewPlan]
              : '',
        });
      }
    }
    return actions.subscription.create({
      plan_id: subscriptionPlan.current
        ? paypalPlans[subscriptionPlan.current]
        : '',
    });
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    //call api to store details of transaction

    console.log('Paypal approved');
    const requestBody = {
      subscriptionID: data.subscriptionID,
      subscriptionPlan: subscriptionPlan.current,
    };
    const response = await fetchFromAPI('/api/cookies', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    if (response.status === 201) {
      console.log('Cookie was created');
      setIsSubscribed(true);
      if (errorMessage) {
        setErrorMessage('');
      }
      if (action === 'change') {
        if (closeModal) {
          closeModal();
        }
        setIsSubscriptionPlanChanged(true);
      }
    }
  };

  return (
    <>
      <PayPalButtons
        className={styles.paypalButton}
        fundingSource="paypal"
        createSubscription={createSubscription}
        onApprove={onApprove}
        onError={onError}
      />
      {errorMessage && (
        <Row>
          <span className={styles.errorMessage}>{errorMessage}</span>
        </Row>
      )}
    </>
  );
};

export default PaypalSubscription;
