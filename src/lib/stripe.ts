// ============================================
// STRIPE CLIENT SETUP
// ============================================
// This file handles all Stripe payment functionality
// You don't need to modify this unless you want advanced features

import Stripe from 'stripe'

// ============================================
// SERVER-SIDE STRIPE CLIENT
// ============================================
// This is ONLY used on the server (API routes)
// NEVER use this in client-side code (pages/components)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// ============================================
// PAYMENT HELPER FUNCTIONS
// ============================================

/**
 * Create a Stripe Checkout session for one-time payments
 * Use this when you want to accept a payment from a customer
 *
 * @param priceInCents - Amount in cents (e.g., 1000 = $10.00)
 * @param productName - Name of product/service being sold
 * @param successUrl - Where to redirect after successful payment
 * @param cancelUrl - Where to redirect if payment is cancelled
 * @returns Checkout session URL to redirect the customer to
 */
export async function createCheckoutSession({
  priceInCents,
  productName,
  successUrl,
  cancelUrl,
}: {
  priceInCents: number
  productName: string
  successUrl: string
  cancelUrl: string
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    return { url: session.url, error: null }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error creating checkout session:', message)
    return { url: null, error: message }
  }
}

/**
 * Create a Stripe Checkout session for subscription payments
 * Use this when you want to set up recurring payments
 *
 * @param priceId - Your Stripe Price ID (create this in Stripe Dashboard)
 * @param customerEmail - Customer's email address
 * @param successUrl - Where to redirect after successful subscription
 * @param cancelUrl - Where to redirect if subscription is cancelled
 * @returns Checkout session URL to redirect the customer to
 */
export async function createSubscriptionSession({
  priceId,
  customerEmail,
  successUrl,
  cancelUrl,
}: {
  priceId: string
  customerEmail?: string
  successUrl: string
  cancelUrl: string
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer_email: customerEmail,
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    return { url: session.url, error: null }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error creating subscription session:', message)
    return { url: null, error: message }
  }
}

/**
 * Verify a webhook signature from Stripe
 * Use this in your webhook endpoint to ensure requests are from Stripe
 *
 * @param payload - Raw request body
 * @param signature - Stripe signature from request headers
 * @returns Verified event object or null if invalid
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event | null {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    return event
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return null
  }
}

/**
 * Get details about a customer's subscription
 * Use this to check if a user has an active subscription
 *
 * @param subscriptionId - Stripe subscription ID
 * @returns Subscription details or null if not found
 */
export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return { subscription, error: null }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error retrieving subscription:', message)
    return { subscription: null, error: message }
  }
}

/**
 * Cancel a customer's subscription
 * Use this when a user wants to cancel their subscription
 *
 * @param subscriptionId - Stripe subscription ID
 * @returns Cancelled subscription details or error
 */
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
    return { subscription, error: null }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error cancelling subscription:', message)
    return { subscription: null, error: message }
  }
}
