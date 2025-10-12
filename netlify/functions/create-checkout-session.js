// Netlify Function for Stripe checkout session
const Stripe = require('stripe');

// Check if Stripe is enabled
const isStripeEnabled = process.env.STRIPE_ENABLED === 'true';

// Early return if Stripe is not enabled
if (!isStripeEnabled) {
  console.warn('Stripe not enabled - payment functionality disabled');
}

let stripe = null;

// Only initialize Stripe if enabled and the key is available
if (isStripeEnabled && process.env.STRIPE_SECRET_KEY) {
  try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  } catch (error) {
    console.warn('Failed to initialize Stripe:', error);
  }
}

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Check if Stripe is available
    if (!isStripeEnabled || !stripe) {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({
          error: 'Payment processing not enabled or configured',
          enabled: isStripeEnabled
        }),
      };
    }

    const { priceId, customerEmail, planName } = JSON.parse(event.body);

    // Create or retrieve customer
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: customerEmail,
        metadata: {
          plan: planName,
        },
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card', 'sepa_debit'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        plan: planName,
        customerEmail,
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ sessionId: session.id }),
    };

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create checkout session' }),
    };
  }
};
