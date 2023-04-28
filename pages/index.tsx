import Subscription from '@/components/Subscription';
import { IPaypalPlans } from '@/interfaces/IPaypalPlans';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NextPage } from 'next';

const Home: NextPage<{ paypalClientId: string; paypalPlans: IPaypalPlans }> = ({
  paypalClientId,
  paypalPlans,
}) => {
  return (
    <>
      <PayPalScriptProvider
        options={{
          'client-id': paypalClientId,
          intent: 'subscription',
          vault: true,
        }}
      >
        <Subscription paypalPlans={paypalPlans} />
      </PayPalScriptProvider>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  return {
    props: {
      paypalClientId: process.env.DB_PAYPAL_CLIENT_ID,
      paypalPlans: {
        premiumMonthly: process.env.DB_PAYPAL_PREMIUM_MONTHLY_PLAN_ID,
        premiumAnnually: process.env.DB_PAYPAL_PREMIUM_ANNUALLY_PLAN_ID,
        proMonthly: process.env.DB_PAYPAL_PRO_MONTHLY_PLAN_ID,
        proAnnually: process.env.DB_PAYPAL_PRO_ANNUALLY_PLAN_ID,
      },
    },
  };
}
