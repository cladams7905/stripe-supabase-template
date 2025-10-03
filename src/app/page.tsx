// ============================================
// HOME PAGE (Server Component)
// ============================================
// This is your main landing page
// START HERE: Customize this page for your app

import { getCurrentUser } from "@/lib/supabase";
import Link from "next/link";

export default async function Home() {
  // Get the current user server-side (no loading state needed!)
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Next.js + Supabase + Stripe Template
        </h1>

        <div className="bg-gray-100 rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome! 👋</h2>

          {user ? (
            <div>
              <p className="mb-4">
                You are logged in as: <strong>{user.email}</strong>
              </p>
              <div className="flex gap-4">
                <Link
                  href="/dashboard"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/auth/logout"
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-4">
                Get started by creating an account or signing in
              </p>
              <div className="flex gap-4">
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
                <Link
                  href="/auth/login"
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-100 rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-4">What&apos;s Included:</h3>
          <ul className="space-y-2">
            <li>✅ User Authentication (Supabase)</li>
            <li>✅ Payment Processing (Stripe)</li>
            <li>✅ App Router with Server Components</li>
            <li>✅ Tailwind CSS 4.0</li>
            <li>✅ Example Pages with Comments</li>
            <li>✅ TypeScript Support</li>
          </ul>
        </div>

        <div className="bg-gray-100 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4">Next Steps:</h3>
          <ol className="space-y-2 list-decimal list-inside">
            <li>Read the README.md file for setup instructions</li>
            <li>Copy .env.example to .env.local and add your keys</li>
            <li>Customize the pages in the /app directory</li>
            <li>Build your amazing app! 🚀</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
