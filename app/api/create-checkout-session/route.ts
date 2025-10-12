import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Check if Stripe is enabled
const isStripeEnabled = process.env.STRIPE_ENABLED === 'true';

// Early return if Stripe is not enabled
if (!isStripeEnabled) {
  console.warn('Stripe not enabled - payment functionality disabled')
}

let stripe: Stripe | null = null

// Only import and initialize Stripe if enabled and the key is available
if (isStripeEnabled && process.env.STRIPE_SECRET_KEY) {
  try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  } catch (error) {
    console.warn('Failed to initialize Stripe:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is available
    if (!isStripeEnabled || !stripe) {
      return NextResponse.json(
        {
          error: 'Payment processing not enabled or configured',
          enabled: isStripeEnabled
        },
        { status: 503 }
      )
    }
    const { priceId, customerEmail, planName } = await request.json()

    // Create or retrieve customer
    let customer
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    })

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } else {
      customer = await stripe.customers.create({
        email: customerEmail,
        metadata: {
          plan: planName,
        },
      })
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
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
