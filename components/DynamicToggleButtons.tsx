import { IDynamicToggleButtonsProps } from '@/interfaces/IDynamicToggleButtonsProps';
import { ISubscription } from '@/interfaces/ISubscription';
import { NextPage } from 'next';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { PRICES } from './Subscription';

const DynamicToggleButtons: NextPage<IDynamicToggleButtonsProps> = ({
  button1Name,
  button2Name,
  type,
  subscriptionData,
  setSubscriptionData,
  setPrice,
}) => {
  // Handles the toggle buttons change, updates the state and calls a function to calculate the final price
  const handleChange = (val: 1 | 2) => {
    let subscriptionCopy = { ...subscriptionData };

    if (isButtonsTypePaymentPlan()) {
      subscriptionCopy = { ...subscriptionCopy, paymentPlan: val };
    } else {
      subscriptionCopy = { ...subscriptionCopy, type: val };
    }

    setSubscriptionData({ ...subscriptionCopy });

    calculateFinalPrice(subscriptionCopy);
  };

  // Calculates the final price of the subscription
  const calculateFinalPrice = (subscriptionCopy: ISubscription) => {
    if ('paymentPlan' in subscriptionCopy && 'type' in subscriptionCopy) {
      let finalPrice: number;

      if (subscriptionCopy.paymentPlan === 1 && subscriptionCopy.type === 1) {
        // 10% discount for a yearly plan
        finalPrice = PRICES.pro * 12 - PRICES.pro * 12 * 0.1;
        finalPrice = Number(finalPrice.toFixed(2));
      } else if (
        subscriptionCopy.paymentPlan === 1 &&
        subscriptionCopy.type === 2
      ) {
        // 10% discount for a yearly plan
        finalPrice = PRICES.premium * 12 - PRICES.premium * 12 * 0.1;
        finalPrice = Number(finalPrice.toFixed(2));
      } else if (
        subscriptionCopy.paymentPlan === 2 &&
        subscriptionCopy.type === 1
      ) {
        finalPrice = PRICES.pro;
      } else {
        finalPrice = PRICES.premium;
      }
      console.log(finalPrice);
      setPrice(finalPrice);
    }
  };

  // Checks if the type of the buttons is 'paymentPlan' or 'type'
  const isButtonsTypePaymentPlan = () => {
    return type === 'paymentPlan';
  };

  return (
    <ToggleButtonGroup
      type="radio"
      name={isButtonsTypePaymentPlan() ? 'options1' : 'options2'}
      onChange={handleChange}
    >
      <ToggleButton
        id={`tbg-radio-${isButtonsTypePaymentPlan() ? '1' : '3'}`}
        value={1}
      >
        {button1Name}
      </ToggleButton>
      <ToggleButton
        id={`tbg-radio-${isButtonsTypePaymentPlan() ? '2' : '4'}`}
        value={2}
      >
        {button2Name}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default DynamicToggleButtons;
