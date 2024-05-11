import { supabase } from "../supabase/supabaseClient";

import { useState, useEffect } from "react";

export const loginWithGoogle = async () => {
  const oAuthReponse = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://example.com/auth/callback`,
    },
  });
  console.log(oAuthReponse);
};
