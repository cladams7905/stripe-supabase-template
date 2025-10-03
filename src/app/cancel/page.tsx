// ============================================
// PAYMENT CANCELLED PAGE
// ============================================
// Users land here if they cancel the payment

import Link from 'next/link'

export default function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-12 text-center max-w-lg">
        <div className="text-6xl text-red-500 mb-4">✕</div>
        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-gray-600 mb-8">
          Your payment was cancelled. No charges were made.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/payment"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
