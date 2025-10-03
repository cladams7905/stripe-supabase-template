// ============================================
// SUPABASE SERVER CLIENT
// ============================================
// This file creates server-side Supabase clients
// Use this for Server Components and Server Actions

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Create a Supabase client for Server Components
 * This client can read cookies but cannot modify them
 *
 * Use this in Server Components to fetch data server-side
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

/**
 * Get the currently logged in user (Server Component)
 * @returns User data if logged in, null if not logged in
 */
export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // "Auth session missing!" is expected for users who haven't logged in yet
  // Only log errors that aren't about missing sessions
  if (error && error.message !== 'Auth session missing!') {
    console.error('Error getting current user:', error.message)
  }

  return user
}

/**
 * Check if a user is currently logged in (Server Component)
 * @returns true if logged in, false if not
 */
export async function isAuthenticated() {
  const user = await getCurrentUser()
  return user !== null
}
