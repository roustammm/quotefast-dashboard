// Netlify Function for Stripe webhooks
const Stripe = require('stripe');

// Check if Stripe is enabled
const isStripeEnabled = process.env.STRIPE_ENABLED === 'true';

const stripe = isStripeEnabled && process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Return early if Stripe is not enabled or configured
  if (!isStripeEnabled || !stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return {
      statusCode: 503,
      body: JSON.stringify({
        error: 'Stripe not enabled or not configured',
        enabled: isStripeEnabled
      }),
    };
  }

  const body = event.body;
  const signature = event.headers['stripe-signature'];

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid signature' }),
    };
  }

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        const session = stripeEvent.data.object;
        console.log(`Payment successful: ${session.id}`);
        
        // Here you would typically:
        // 1. Update user subscription status in your database
        // 2. Send confirmation email
        // 3. Grant access to premium features
        
        break;

      case 'customer.subscription.updated':
        const subscription = stripeEvent.data.object;
        console.log(`Subscription updated: ${subscription.id}`);
        
        // Handle subscription changes (upgrade/downgrade)
        
        break;

      case 'customer.subscription.deleted':
        const canceledSubscription = stripeEvent.data.object;
        console.log(`Subscription canceled: ${canceledSubscription.id}`);
        
        // Handle subscription cancellation
        
        break;

      case 'invoice.payment_failed':
        const failedInvoice = stripeEvent.data.object;
        console.warn(`Payment failed: ${failedInvoice.id}`);
        
        // Handle failed payments
        
        break;

      default:
        console.warn(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };

  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook processing failed' }),
    };
  }
};
