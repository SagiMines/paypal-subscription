import { ISubscriptionPlanDetails } from '@/interfaces/ISubscriptionPlanDetails';
import { getCookie, setCookie } from 'cookies-next';
import { AES, enc } from 'crypto-js';
import { NextApiRequest, NextApiResponse } from 'next';

// Generic fetch function
export const fetchFromAPI: TFetchFromAPI = async (route, options?) => {
  const response = await fetch(route, options);
  return response;
};

// Checks if the user is already in a subscription plan on not
export const checkForSubscriptions = async () => {
  const response = await fetchFromAPI('/api/cookies', {
    credentials: 'include',
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  return false;
};

// Cancels the user subscription
export const cancelSubscription = async () => {
  const subscriptionCookie = await checkForSubscriptions();
  if (subscriptionCookie) {
    const response = await fetchFromAPI('/api/paypal/subscriptions/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionCookie),
    });
    if (response.status === 204) {
      console.log('Canceled successfully');
    } else {
      console.log('Error');
    }
  }
  //Maybe add error when there is nothing to cancel
};

// Returns the JSON body from a generic GET request
export const getApiDetails = async (route: string) => {
  const response = await fetchFromAPI(route);
  const data = await response.json();
  return data;
};

// Encrypts the given data and creates a cookie with that data
export const encryptCookieData = (
  cookieName: string,
  cookieData: string | { subscriptionID: string; subscriptionPlan: number },
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let encryptedCookie: CryptoJS.lib.CipherParams;
  if (process.env.DB_CRYPTO_SECRET) {
    encryptedCookie = AES.encrypt(
      typeof cookieData === 'string' ? cookieData : cookieData.subscriptionID,
      process.env.DB_CRYPTO_SECRET
    );
    setCookie(cookieName, encodeURIComponent(encryptedCookie.toString()), {
      req,
      res,
      httpOnly: true,
      secure: true,
      maxAge:
        typeof cookieData === 'string'
          ? undefined
          : cookieData.subscriptionPlan,
    });
  }
};

// Decrypts the data from a given cookie and returns this data
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

// Returns the subscription details of the user
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
