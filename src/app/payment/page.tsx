// ============================================
// PAYMENT PAGE
// ============================================
// This page demonstrates how to create a Stripe payment
// Customize the product name and price for your needs

'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Payment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Handle payment button click
  const handlePayment = async () => {
    setLoading(true)
    setError('')

    try {
      // Call your API route to create a checkout session
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceInCents: 1000, // $10.00 - CHANGE THIS to your price
          productName: 'Sample Product', // CHANGE THIS to your product name
        }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setLoading(false)
        return
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setError('Failed to create checkout session')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Sample Payment</h1>

        <div className="bg-gray-100 rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-2">Product Name: Sample Product</h2>
          <p className="text-4xl font-bold text-blue-600 mb-4">$10.00</p>
          <p className="mb-6">
            This is a demo payment page. Click the button below to test Stripe Checkout.
          </p>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 text-lg font-semibold"
          >
            {loading ? 'Loading...' : 'Pay with Stripe'}
          </button>

          <div className="mt-4 bg-blue-50 px-4 py-3 rounded-lg text-sm">
            <strong>Test Mode:</strong> Use card number 4242 4242 4242 4242 with any future
            date and CVC
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-4">How to Customize:</h3>
          <ol className="space-y-2 list-decimal list-inside">
            <li>
              Open <code className="bg-white px-2 py-1 rounded text-sm">app/payment/page.tsx</code>
            </li>
            <li>
              Change the <code className="bg-white px-2 py-1 rounded text-sm">priceInCents</code>{' '}
              value (1000 = $10.00)
            </li>
            <li>
              Change the <code className="bg-white px-2 py-1 rounded text-sm">productName</code> to
              your product
            </li>
            <li>Customize the page design and content</li>
          </ol>
        </div>

        <Link
          href="/dashboard"
          className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
