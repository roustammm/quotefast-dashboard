import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { logger } from '@/lib/logger'

// Check if Stripe is enabled
const isStripeEnabled = process.env.STRIPE_ENABLED === 'true';

const stripe = isStripeEnabled && process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

export async function POST(request: NextRequest) {
  // Return early if Stripe is not enabled or configured
  if (!isStripeEnabled || !stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({
      error: 'Stripe not enabled or not configured',
      enabled: isStripeEnabled
    }, { status: 503 })
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        logger.info(`Payment successful: ${session.id}`, 'stripe')
        
        // Here you would typically:
        // 1. Update user subscription status in your database
        // 2. Send confirmation email
        // 3. Grant access to premium features
        
        break

      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription
        logger.info(`Subscription updated: ${subscription.id}`, 'stripe')
        
        // Handle subscription changes (upgrade/downgrade)
        
        break

      case 'customer.subscription.deleted':
        const canceledSubscription = event.data.object as Stripe.Subscription
        logger.info(`Subscription canceled: ${canceledSubscription.id}`, 'stripe')
        
        // Handle subscription cancellation
        
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        logger.warn(`Payment failed: ${failedInvoice.id}`, 'stripe')
        
        // Handle failed payments
        
        break

      default:
        logger.warn(`Unhandled event type: ${event.type}`, 'stripe')
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
