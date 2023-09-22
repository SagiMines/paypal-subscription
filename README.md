# Paypal-subscription

<div align='center'>
<a href="https://paypal-subscription.vercel.app/">
<img src="https://lh3.googleusercontent.com/pw/ADCreHe9Xhv0e8goYfIgB0o9Q7UAGAD7xNY1owjU7n7m3PsjT9GmNay6fpRVltB-4vF5UriDkJmdluviTMzSbfC4nGiU7xZ57X9DmQmzgavisIKn6KhAbzkKluoBOnz7p7Aq7dnnbDuWl7Xmo4Vb0itkrXmF=w625-h280-s-no?authuser=3" width=400/>
</a>
</div>

Welcome to Paypal-subscription, an open-source web application that simplifies subscription management and payments. With Paypal-subscription, users can easily subscribe to a plan, calculate the cost, and make payments securely using PayPal's API. Users can also manage their subscriptions by deleting or changing them as needed. This project is built with React using Next.js 13, and data is securely saved in HTTP-only cookies. API calls to the PayPal API are made using the serverless features of Next.js.

#### **[Live Demo](https://paypal-subscription.vercel.app/)**

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

## Overview

Paypal-subscription streamlines the subscription process, making it easy for users to access premium services or content. It leverages PayPal's secure payment gateway to ensure seamless transactions. Users can subscribe, calculate costs, and manage their subscriptions effortlessly.

### Technology Stack

- **Front-end:** Paypal-subscription is developed using React with Next.js 13, providing a responsive, fast, and SEO-friendly user interface.

- **Data Storage:** User subscription data is stored securely in HTTP-only cookies, ensuring data privacy and security.

- **Payment Integration:** PayPal's API is integrated into the application for handling subscription payments.

- **API Calls:** API calls to the PayPal API are made using the serverless features of Next.js, allowing for efficient and dynamic interactions.

### Features

- **Subscription Management:** Users can subscribe to a plan, calculate costs, and make secure payments through PayPal.

- **Subscription Modification:** Users can easily delete or change their subscription plans, with corresponding actions available when subscribed.

## Getting Started

Use the [Live Demo](https://paypal-subscription.vercel.app/)

**Or, install locally:**

To set up Paypal-subscription locally or deploy a similar platform, follow these steps:

1. Clone this repository to your local machine.

```bash
git clone https://github.com/SagiMines/paypal-subscription.git
cd paypal-subscription
```

2. Install the necessary dependencies.

```bash
npm install
```

3. Configure your environment variables for PayPal API integration and other settings using - [Environment Variables Guidence](#environment-variables).

4. Run the application locally.

```bash
npm run dev
```

5. Customize the content, styling, and subscription plans as per your requirements.

## Environment Variables

To run this project, you will need to add an `.env.local` file to the root of the project with the following environment variables included:

**PayPal API:**

`DB_PAYPAL_CLIENT_ID` - Your PayPal developer client ID.  
`DB_PAYPAL_SECRET` - Your PayPal developer secret.
`DB_PAYPAL_PREMIUM_MONTHLY_PLAN_ID` - Your PayPal developer premium monthly subscription plan ID.  
`DB_PAYPAL_PREMIUM_ANNUALLY_PLAN_ID` - Your PayPal developer premium annually subscription plan ID.  
`DB_PAYPAL_PRO_ANNUALLY_PLAN_ID` - Your PayPal developer pro annually subscription plan ID.  
`DB_PAYPAL_PRO_MONTHLY_PLAN_ID` - Your PayPal developer pro monthly subscription plan ID.

**Data Encryption/Decryption:**

`DB_CRYPTO_SECRET` - CryptoJS library secret string for encrypting/decrypting the cookie's data.

## Usage

Once Paypal-subscription is set up, users can:

- Browse and select subscription plans.
- Calculate subscription costs.
- Make secure payments through PayPal.
- Manage their subscriptions, including deletion or modification.

Streamline your subscription management with Paypal-subscription!
