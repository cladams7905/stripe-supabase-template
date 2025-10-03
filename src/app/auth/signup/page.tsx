// ============================================
// SIGN UP PAGE
// ============================================
// This page lets new users create an account
// Customize the form fields and styling as needed

'use client'

import { useState } from 'react'
import { signUpAction } from '../actions'
import Link from 'next/link'

export default function SignUp() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle form submission
  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')

    const result = await signUpAction(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
    // If successful, the action will redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        <form action={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least 6 characters"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
              minLength={6}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
