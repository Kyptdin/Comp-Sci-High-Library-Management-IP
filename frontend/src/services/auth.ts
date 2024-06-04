import { supabase } from "@/supabase/supabaseClient";

/**
 * Logs the user in using Google OAuth authentication.
 * Uses Supabase's signInWithOAuth method with the "google" provider.
 */
export const loginWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
};

/**
 * Logs the user out by signing them out of the current session.
 * Returns an error if the sign out process encounters any issues.
 *
 * @returns Error message, if any, encountered during sign out.
 */
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};
