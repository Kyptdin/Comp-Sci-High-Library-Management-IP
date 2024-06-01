import { supabase } from "../supabase/supabaseClient.ts";

export const loginWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};
