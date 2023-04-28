import { useEffect, useState } from 'react';
import { CreateSubscriptionActions } from '@paypal/paypal-js';
import { PayPalButtons } from '@paypal/react-paypal-js';
import {
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js/types/components/buttons';
import { NextPage } from 'next';
import { IPaypalSubscription } from '@/interfaces/IPaypalSubscription';
import { Button } from 'react-bootstrap';
import { fetchFromAPI } from '@/DAL/functions';

const PaypalSubscription: NextPage<IPaypalSubscription> = ({
  paypalPlans,
  subscriptionPlan,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onError = (err: Record<string, unknown>) => {
    setErrorMessage('An error occoured with your payment');
  };

  const createSubscription = (
    data: Record<string, unknown>,
    actions: CreateSubscriptionActions
  ) => {
    console.log(paypalPlans);
    console.log('create subscription func!');
    console.log(data);
    console.log(actions);
    return actions.subscription.create({
      plan_id: subscriptionPlan.current
        ? paypalPlans[subscriptionPlan.current]
        : '',
    });
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    //call api to store details of transaction

    console.log('Paypal approved');
    console.log(data);

    const requestBody = {
      subscriptionID: data.subscriptionID,
    };
    const response = await fetchFromAPI('/api/cookies', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
    if (response.status === 201) {
      console.log('Cookie was created');
    }
  };

  return (
    <>
      <PayPalButtons
        fundingSource="paypal"
        createSubscription={createSubscription}
        onApprove={onApprove}
        onError={onError}
      />
    </>
  );
};

export default PaypalSubscription;
