// ============================================
// DASHBOARD PAGE (Protected Server Component)
// ============================================
// This page is only accessible to logged-in users
// Customize this to show user-specific content

import { getCurrentUser } from "@/lib/supabase";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  // Check authentication server-side
  const user = await getCurrentUser();

  // If not logged in, redirect to login page
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="bg-gray-100 rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome back!</h2>
          <p className="mb-2">
            Email: <strong>{user.email}</strong>
          </p>
          <p className="mb-0">
            User ID:{" "}
            <code className="bg-white px-2 py-1 rounded text-sm">
              {user.id}
            </code>
          </p>
        </div>

        <div className="bg-gray-100 rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-4">Try a Payment</h3>
          <p className="mb-4">
            Test the Stripe integration with a sample payment
          </p>
          <Link
            href="/payment"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Make a Payment
          </Link>
        </div>

        <div className="bg-gray-100 rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-4">What to Build Here:</h3>
          <ul className="space-y-2">
            <li>User profile information</li>
            <li>Account settings</li>
            <li>Subscription status</li>
            <li>Your app-specific features</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Link
            href="/"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            ← Back to Home
          </Link>
          <Link
            href="/auth/logout"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
