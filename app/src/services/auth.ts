import { supabase } from "../supabase/supabaseClient";

export const loginWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
};
