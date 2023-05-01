import { decryptCookieData, fetchFromAPI } from '@/DAL/functions';
import { hasCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    if (hasCookie('plan-id', { req, res })) {
      const planID = decryptCookieData('plan-id', req, res);
      const response = await fetchFromAPI(
        `https://api-m.sandbox.paypal.com/v1/billing/plans/${planID}`,
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
      res.status(200).json(data);
    } else {
      res.status(204).end();
    }
  }
}
