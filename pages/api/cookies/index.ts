import { decryptCookieData, encryptCookieData } from '@/DAL/functions';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const requestBody = JSON.parse(req.body);
    encryptCookieData('sub-id', requestBody.subscriptionID, req, res);
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
