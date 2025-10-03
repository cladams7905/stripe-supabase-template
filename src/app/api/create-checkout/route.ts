// ============================================
// STRIPE CHECKOUT API ROUTE (App Router)
// ============================================
// This API endpoint creates a Stripe checkout session
// It's called from the payment page

import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    // Get payment details from request body
    const body = await request.json()
    const { priceInCents, productName } = body

    // Validate inputs
    if (!priceInCents || !productName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get the base URL for redirects
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Create the checkout session
    const { url, error } = await createCheckoutSession({
      priceInCents,
      productName,
      successUrl: `${baseUrl}/success`,
      cancelUrl: `${baseUrl}/cancel`,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    // Return the checkout URL
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Error in create-checkout:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
