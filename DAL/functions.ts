import { ISubscriptionPlanDetails } from '@/interfaces/ISubscriptionPlanDetails';
import { getCookie, setCookie } from 'cookies-next';
import { AES, enc } from 'crypto-js';
import { NextApiRequest, NextApiResponse } from 'next';

// The prices for the plans
export const PRICES = {
  pro: 29.0,
  premium: 15.0,
};

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
    const response = await fetchFromAPI('/api/paypal/subscription/cancel', {
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
  const subscriptionDetails = await getApiDetails('/api/paypal/subscription');
  const planDetails = await getApiDetails('/api/paypal/plan');
  const userDetails: ISubscriptionPlanDetails = {
    userFirstName: subscriptionDetails.subscriber.name['given_name'],
    userLastName: subscriptionDetails.subscriber.name.surname,
    planName: planDetails.name,
    planPrice:
      planDetails['billing_cycles'][0]['pricing_scheme']['fixed_price'].value,
  };
  return userDetails;
};

// Array of the subscriptions plan names
export const getSubscriptionPlansNames = [
  'Premium Monthly',
  'Pro Monthly',
  'Premium Annually',
  'Pro Annually',
];

// Camelize (camel case) any given string
export const camelize = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

// Update the plan's name from the old one
export const changePlan = (product: string): 'Monthly' | 'Annually' => {
  if (product === 'Annually') return 'Monthly';
  return 'Annually';
};
