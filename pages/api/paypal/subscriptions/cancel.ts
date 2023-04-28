import { fetchFromAPI } from '@/DAL/functions';
import { deleteCookie, hasCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(req.body);
    const requestBody = req.body;
    try {
      await fetchFromAPI(
        `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${requestBody.subscriptionID}/cancel`,
        {
          method: 'POST',
          headers: new Headers({
            Authorization:
              'Basic ' +
              Buffer.from(
                `${process.env.DB_PAYPAL_CLIENT_ID}:${process.env.DB_PAYPAL_SECRET}`
              ).toString('base64'),
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({ reason: 'Not satisfied with the service' }),
        }
      );
      deleteCookie('sub-id', { req, res });
      if (hasCookie('plan-id', { req, res })) {
        deleteCookie('plan-id', { req, res });
      }
      res.status(204).end();
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
