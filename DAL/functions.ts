import { ISubscriptionPlanDetails } from '@/interfaces/ISubscriptionPlanDetails';
import { getCookie, setCookie } from 'cookies-next';
import { AES, enc } from 'crypto-js';
import { NextApiRequest, NextApiResponse } from 'next';

export const fetchFromAPI: TFetchFromAPI = async (route, options?) => {
  const response = await fetch(route, options);
  console.log(response);
  return response;
};

export const checkForSubscriptions = async () => {
  const response = await fetchFromAPI('/api/cookies', {
    credentials: 'include',
  });
  // console.log(response);
  if (response.status === 200) {
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  }
  return false;
};

export const cancelSubscription = async () => {
  const subscriptionCookie = await checkForSubscriptions();
  console.log(subscriptionCookie);
  if (subscriptionCookie) {
    const response = await fetchFromAPI('/api/paypal/subscriptions/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionCookie),
    });
    console.log(response);
    if (response.status === 204) {
      console.log('Canceled successfully');
    } else {
      console.log('Error');
    }
  }
  //Maybe add error when there is nothing to cancel
};

export const getApiDetails = async (route: string) => {
  const response = await fetchFromAPI(route);
  const data = await response.json();
  return data;
};

export const encryptCookieData = (
  cookieName: string,
  cookieData: string,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let encryptedCookie: CryptoJS.lib.CipherParams;
  if (process.env.DB_CRYPTO_SECRET) {
    encryptedCookie = AES.encrypt(cookieData, process.env.DB_CRYPTO_SECRET);
    setCookie(cookieName, encodeURIComponent(encryptedCookie.toString()), {
      req,
      res,
      httpOnly: true,
      secure: true,
    });
  }
};

export const decryptCookieData = (
  cookieName: string,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let encryptedCookie = getCookie(cookieName, { req, res });
  if (encryptedCookie && process.env.DB_CRYPTO_SECRET) {
    encryptedCookie = decodeURIComponent(encryptedCookie.toString());
    const decreptedCookie = encodeURIComponent(
      AES.decrypt(encryptedCookie, process.env.DB_CRYPTO_SECRET).toString(
        enc.Utf8
      )
    );
    return decreptedCookie;
  }
  return false;
};

export const getUserDetails = async () => {
  const subscriptionDetails = await getApiDetails('/api/paypal/subscriptions');
  const planDetails = await getApiDetails('/api/paypal/plans');
  const userDetails: ISubscriptionPlanDetails = {
    userFirstName: subscriptionDetails.subscriber.name['given_name'],
    userLastName: subscriptionDetails.subscriber.name.surname,
    planName: planDetails.name,
    planPrice: subscriptionDetails['billing_info']['last_payment'].amount.value,
  };
  return userDetails;
};
