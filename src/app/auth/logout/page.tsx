// ============================================
// LOGOUT PAGE (Server Component)
// ============================================
// This page signs out the user and redirects home

import { logoutAction } from "../actions";

export default async function Logout() {
  // Execute logout server action immediately
  await logoutAction();
}
