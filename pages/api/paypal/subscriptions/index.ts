import {
  decryptCookieData,
  encryptCookieData,
  fetchFromAPI,
} from '@/DAL/functions';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const subscriptionID = decryptCookieData('sub-id', req, res);
    if (subscriptionID && typeof subscriptionID === 'string') {
      const response = await fetchFromAPI(
        `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionID}`,
        {
          headers: new Headers({
            Authorization:
              'Basic ' +
              Buffer.from(
                `${process.env.DB_PAYPAL_CLIENT_ID}:${process.env.DB_PAYPAL_SECRET}`
              ).toString('base64'),
            'Content-Type': 'application/json',
          }),
        }
      );
      const data = await response.json();
      const planID: string = data['plan_id'];
      encryptCookieData('plan-id', planID, req, res);
      res.status(200).json(data);
    } else {
      res.status(204).end();
    }
  }
}
