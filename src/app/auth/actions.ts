// ============================================
// AUTHENTICATION SERVER ACTIONS
// ============================================
// Server-side authentication actions
// These run on the server and handle cookies properly

"use server";

import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Sign up a new user
 */
export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate inputs
  if (!email || !password) {
    return { error: "Please fill in all fields" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    return { error: error.message };
  }

  // Revalidate the layout to update the session
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

/**
 * Sign in an existing user
 */
export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate inputs
  if (!email || !password) {
    return { error: "Please fill in all fields" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return { error: error.message };
  }

  // Revalidate the layout to update the session
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

/**
 * Log out a user
 */
export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
