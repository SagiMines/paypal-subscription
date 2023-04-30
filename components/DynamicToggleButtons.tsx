import { IDynamicToggleButtonsProps } from '@/interfaces/IDynamicToggleButtonsProps';
import { ISubscription } from '@/interfaces/ISubscription';
import { NextPage } from 'next';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { PRICES } from './MainApp';

const DynamicToggleButtons: NextPage<IDynamicToggleButtonsProps> = ({
  button1Name,
  button2Name,
  type,
  subscriptionData,
  setSubscriptionData,
  setPrice,
  subscriptionPlan,
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

  // Calculates the final price of the subscription and sets the name of the chosen plan
  const calculateFinalPrice = (subscriptionCopy: ISubscription) => {
    if ('paymentPlan' in subscriptionCopy && 'type' in subscriptionCopy) {
      let finalPrice: number;

      // If Pro Annually
      if (subscriptionCopy.paymentPlan === 1 && subscriptionCopy.type === 1) {
        finalPrice = PRICES.pro * 10 - 40;
        subscriptionPlan.current = 'proAnnually';
      }
      // If Premium Annually
      else if (
        subscriptionCopy.paymentPlan === 1 &&
        subscriptionCopy.type === 2
      ) {
        finalPrice = PRICES.premium * 10;
        subscriptionPlan.current = 'premiumAnnually';
      }
      // If Pro Monthly
      else if (
        subscriptionCopy.paymentPlan === 2 &&
        subscriptionCopy.type === 1
      ) {
        finalPrice = PRICES.pro;
        subscriptionPlan.current = 'proMonthly';
      }
      // If Premium Monthly
      else {
        finalPrice = PRICES.premium;
        subscriptionPlan.current = 'premiumMonthly';
      }
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
