import { decryptCookieData, encryptCookieData } from '@/DAL/functions';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const requestBody = JSON.parse(req.body);
    const subscriptionPlan = requestBody.subscriptionPlan;
    if (subscriptionPlan) {
      // Sets the cookie expiration date to be in 1 month or 1 year based on the subscription plan
      requestBody.subscriptionPlan =
        subscriptionPlan.indexOf('M') !== -1
          ? 24 * 60 * 60 * 30
          : 24 * 60 * 60 * 365;
      encryptCookieData('sub-id', requestBody, req, res);
    } else {
      encryptCookieData('sub-id', requestBody.subscriptionID, req, res);
    }

    res.status(201).end();
  } else if (req.method === 'GET') {
    const decryptedSubscriptionID = decryptCookieData('sub-id', req, res);
    if (decryptedSubscriptionID) {
      res.status(200).json({ subscriptionID: decryptedSubscriptionID });
    } else {
      res.status(204).end();
    }
  }
}
