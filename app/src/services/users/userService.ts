import { supabase } from "../../supabase/supabaseClient";

/****** CREATE ROUTES ******/
export const signUpUserService = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: "isaacestrella12@gmail.com",
    password: "example-password",
  });
  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
};

/****** READ ROUTES ******/
